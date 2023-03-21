<?php

namespace App\Http\Controllers;

use App\Models\StudyGroup;
use Illuminate\Http\Request;

class StudyGroupController extends Controller
{
    public function getStudyGroups() {
        $studyGroups = StudyGroup::get();

        return response($studyGroups);
    }
}
