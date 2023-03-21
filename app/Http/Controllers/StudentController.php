<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Requests\StudentsByFiltersRequest;

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
}
