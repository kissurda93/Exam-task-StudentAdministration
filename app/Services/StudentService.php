<?php

namespace App\Services;

use App\Models\StudyGroup;
use Illuminate\Support\Str;

class StudentService
{
  public function prepareToUpdate($validated, $studentName)
  {
    $updateArray = [];
    $updatedToEmail = [
      'updatedName' => false,
      'updatedEmail' => false,
      'updatedPhoto' => false,
      'updatedGroups' => false,
    ];

    if(isset($validated['name'])) {
        $updateArray['name'] = $validated['name'];
        $updatedToEmail['updatedName'] = $validated['name'];
    }

    if(isset($validated['email'])) {
        $updateArray['email'] = $validated['email'];
        $updatedToEmail['updatedEmail'] = $validated['email'];
    }

    if(isset($validated['photo'])) {
        $updateArray['photo'] = $this->savePhoto($validated['photo'], $studentName);
        $updatedToEmail['updatedPhoto'] = true;
    }

    if(isset($validated['study_groups'])) {
      $studentGroupsInRequest = $this->prepareStudyGroupsFromRequest($validated['study_groups']);
      $updatedToEmail['updatedGroups'] = Str::upper($validated['study_groups']);
    } else {
      $studentGroupsInRequest = [];
    }

    return [$updateArray, $studentGroupsInRequest, $updatedToEmail];
  }

  public function updateStudyGroups($student, $studentGroupsInRequest)
  {
    $studyGroups = StudyGroup::get();

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

  public function savePhoto($photo, $name)
  {
    $file = $photo;
    $imageName = time() . '-' . $name . "." . $file->extension();
    $file->move(public_path('img'), $imageName);
    $path = "img/$imageName";
    return $path;
  }

  public function addStudyGroups($studiesArray, $student)
  {
    $studyGroups = StudyGroup::get();
            
    if(count($studiesArray) > 4)
        return response(['message' => 'Study Group limit per students is 4!'], 422);

    $studyGroups->each(function($group) use($studiesArray, $student) {
        if(in_array($group['name'], $studiesArray)) {
            $student->studygroups()->attach($group);
        }
    });
  }

  public function prepareStudyGroupsFromRequest($studyGroupsInRequest)
  {
    if($studyGroupsInRequest !== "") {
      $studyGroupsInRequest = trim($studyGroupsInRequest, ",");
      $returnArray = explode(', ', $studyGroupsInRequest);
    } else {
      $returnArray = [];
    }

    return $returnArray;
  }
}