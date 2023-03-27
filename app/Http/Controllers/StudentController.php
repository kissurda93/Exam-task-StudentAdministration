<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Requests\NewStudentRequest;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\StudentsByFiltersRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\StudyGroup;

class StudentController extends Controller
{
    public function getStudents(StudentsByFiltersRequest $request) {
        $request = $request->validated();
        $count = Student::all()->count();

        $filters = [];
        foreach ($request as $filter => $value) {
            if($value === "true" && $filter !== 'name')
                array_push($filters, $filter);
        }

        if (isset($request['name']) && count($filters) !== 0) {
            $students = Student::checkStudyGroups($filters)->where('name', 'LIKE', '%'.$request['name'].'%')->paginate(10);

            return response(compact('students', 'count'));
        }

        if(isset($request['name'])) {
            $students = Student::where('name', 'LIKE', '%'.$request['name'].'%')->with('studygroups:name')->paginate(10);
            $count = Student::all()->count();

            return response(compact('students', 'count'));
        }

        if(count($filters) !== 0) {
            $students = Student::checkStudyGroups($filters)->paginate(10);
            
            return response(compact('students', 'count'));
        }

        $students = Student::with('studygroups:name')->paginate(10);

        return response(compact('students', 'count'));
    }

    public function newStudent(NewStudentRequest $request) {
        try {
            $validated = $request->validated();
        }
        catch (ValidationException $e) {
            return response($e->errors());
        }

        if(isset($validated['photo'])) {
            $file = $validated['photo'];
            $imageName = time() . '-' . $validated['name'] . "." . $file->extension();
            $file->move(public_path('img'), $imageName);
            $path = config('app.url') . '/img/' . $imageName;
            $validated['photo'] = $path;
        } else {
            $validated['photo'] = config('app.url') . '/img/' . 'useravatar.png';
        }

        $student = Student::create($validated);

        if(isset($validated['study_groups'])) {
            $studyGroups = StudyGroup::get();
            
            $validated['study_groups'] = trim($validated['study_groups'], ",");
            $studiesArray = explode(', ', $validated['study_groups']);

            if(count($studiesArray) > 4)
                return response(['message' => 'Study Group limit per students is 4!'], 422);

            $studyGroups->each(function($group) use($studiesArray, $student) {
                if(in_array($group['name'], $studiesArray)) {
                    $student->studygroups()->attach($group);
                }
            });
        }

        return response($student);
    }

    public function updateStudent(UpdateStudentRequest $request) {
        try {
            $validated = $request->validated();
        }
        catch (ValidationException $e) {
            return response($e->errors());
        }

        $updateArray = [];

        $student = Student::find($validated['id']);

        if(isset($validated['name'])) {
            $updateArray['name'] = $validated['name'];
        }

        if(isset($validated['email'])) {
            $updateArray['email'] = $validated['email'];
        }

        if(isset($validated['photo'])) {
            $file = $validated['photo'];
            $imageName = time() . '-' . $student['name'] . "." . $file->extension();
            $file->move(public_path('img'), $imageName);
            $path = config('app.url') . '/img/' . $imageName;
            $updateArray['photo'] = $path;
        }

        $student->update($updateArray);

        if(isset($validated['study_groups'])) {
            $studyGroups = StudyGroup::get();

            $validated['study_groups'] = trim($validated['study_groups'], ",");
            $studentGroupsInRequest = explode(', ', $validated['study_groups']);

            $studentGroupsInDb = $student->studygroups()->get();

            $studentGroupsInDb->each(function($group) use ($studentGroupsInRequest, $student) {
                if(!in_array($group->name, $studentGroupsInRequest)) {
                    $student->studygroups()->detach($group);
                }
            });

            $transformedGroupsInDb = [];
            $studentGroupsInDb->each(function($group) use (&$transformedGroupsInDb) {
                array_push($transformedGroupsInDb, $group->name);
            });

            $diff = array_diff($studentGroupsInRequest, $transformedGroupsInDb);

            if(count($diff) !== 0) {
                $studyGroups->each(function($group) use ($diff, $student) {
                    if(in_array($group->name, $diff)) {
                        $student->studygroups()->attach($group);
                    }
                });
            }
            
        }

        $student = Student::with('studygroups')->find($validated['id']);
        
        return response($student);
    }

    public function deleteStudent() {}
}
