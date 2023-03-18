<?php

namespace App\Models;

use App\Models\StudyGroup;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'sex',
        'place_of_birth',
        'date_of_birth',
        'email',
        'photo',
    ];

    public function studygroups() {
        return $this->belongsToMany(StudyGroup::class);
    }
}
