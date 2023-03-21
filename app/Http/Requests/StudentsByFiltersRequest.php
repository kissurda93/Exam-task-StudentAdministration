<?php

namespace App\Http\Requests;

use App\Models\StudyGroup;
use Illuminate\Foundation\Http\FormRequest;

class StudentsByFiltersRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $studyGroups = StudyGroup::all();
        
        $validationArray = [];
        foreach ($studyGroups as $group) {
            $validationArray[$group['name']] = 'string';
        }

        $validationArray['name'] = 'string';

        return $validationArray;
    }
}
