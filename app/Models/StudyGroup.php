<?php

namespace App\Models;

use App\Models\Student;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StudyGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'leader',
        'subject',
        'date_and_time',
    ];

    public function students() {
        return $this->belongsToMany(Student::class);
    }
}
