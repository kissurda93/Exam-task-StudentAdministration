<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function getStudents() {
        $paginated = Student::with('studygroups:name')->paginate(10);
        $count = Student::all()->count();

        return response(compact('paginated', 'count'));
    }
}
