<?php

namespace App\Models;

use App\Models\StudyGroup;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;

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

    public function scopeCheckStudyGroups($query, $filters = []){
        foreach($filters as $filter){
            $query = $query->whereHas('studygroups', function (Builder $q) use ( $filter) {
                $q->where('name', $filter);
            });
        }
        return $query;
    }
}
