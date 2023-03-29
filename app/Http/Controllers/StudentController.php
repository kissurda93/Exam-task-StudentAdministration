<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Services\StudentService;
use App\Http\Requests\NewStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\StudentsByFiltersRequest;
use App\Mail\StudentUpdatedEmail;
use App\Mail\WelcomeEmail;
use App\Services\FiltersService;
use Illuminate\Support\Facades\Mail;

class StudentController extends Controller
{
    public function getStudents(StudentsByFiltersRequest $request, FiltersService $filter)
    {
        $validated = $request->validated();

        $count = Student::all()->count();
        $students = $filter->filtering($validated);

        return response(compact('students', 'count'));
    }

    public function newStudent(NewStudentRequest $request, StudentService $studentService)
    {
        try {
            $validated = $request->validated();
        }
        catch (ValidationException $e) {
            return response($e->errors());
        }

        if(isset($validated['photo'])) {
            $validated['photo'] = $studentService->savePhoto($validated['photo'], $validated['name']);
        } else {
            $validated['photo'] = config('app.url') . '/img/' . 'useravatar.png';
        }

        $student = Student::create($validated);

        if(isset($validated['study_groups'])) {
            $studiesArray = $studentService->prepareStudyGroupsFromRequest($validated['study_groups']);

            if(count($studiesArray) > 4) {
                return response(['message' => 'A student can have a maximum of 4 groups!']);
            }

            $studentService->addStudyGroups($studiesArray, $student);
        }

        Mail::to($student->email)->send(new WelcomeEmail($student->name));

        return response(['message' => "Added $student->name to database!"]);
    }

    public function updateStudent(UpdateStudentRequest $request, Student $student, StudentService $studentService )
    {
        try {
            $validated = $request->validated();
        }
        catch (ValidationException $e) {
            return response($e->errors());
        }

        if(count($validated) === 0) {
            return response(['message' => 'There is no data to update!']);
        }

        list($updateArray, $studentGroupsInRequest, $updatedToEmail) = $studentService->prepareToUpdate($validated, $student->name);

        if(count($updateArray) !== 0) {
            $student->update($updateArray);
        }

        if(count($studentGroupsInRequest) !== 0) {
            $studentService->updateStudyGroups($student, $studentGroupsInRequest);
        }

        Mail::to($student->email)->send(new StudentUpdatedEmail($updatedToEmail, $student->name));
        
        return response(['message' => "Details of $student->name updated successfully!"]);
    }

    public function deleteStudent(Student $student)
    {
        $student->delete();

        return response(["message" => "$student->name deleted!"]);
    }
}
