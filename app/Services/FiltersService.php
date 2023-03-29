<?php

namespace App\Services;

use App\Models\Student;

class FiltersService
{
  public function filtering($validated)
  {
    $filters = [];
    foreach ($validated as $filter => $value) {
      if($value === "true" && $filter !== 'name')
        array_push($filters, $filter);
    }

    if (isset($validated['name']) && count($filters) !== 0) {
      return Student::checkStudyGroups($filters)
        ->where('name', 'LIKE', '%'.$validated['name'].'%')
        ->with('studygroups:name')
        ->orderBy('name')
        ->paginate(10);
    }

    if(isset($validated['name'])) {
      return Student::where('name', 'LIKE', '%'.$validated['name'].'%')
        ->with('studygroups:name')
        ->orderBy('name')
        ->paginate(10);
    }

    if(count($filters) !== 0) {
      return Student::checkStudyGroups($filters)
        ->with('studygroups:name')
        ->orderBy('name')
        ->paginate(10);
    }

    return Student::with('studygroups:name')
      ->orderBy('name')
      ->paginate(10);
  }
}