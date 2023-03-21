<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\StudyGroup;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class StudentAndStudySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $studies = ['biology', 'math', 'history', 'grammar', 'programming'];
        $genders = ['male', 'female'];

        $groups = [];
        for ($i = 0; $i <= 4 ; $i++) { 
            $study = StudyGroup::create([
                'name' => $studies[$i],
                'leader' => fake()->name(),
                'subject' => $studies[$i],
                'date_and_time' => fake()->dateTime(),
            ]);
            array_push($groups, $study);
        }

        for ($i = 0; $i < 125; $i++) {
            $randomGender = $genders[rand(0, 1)];

            $student = Student::create([
                'name' => $randomGender === 'male' ? 
                fake()->firstNameMale() . ' ' . fake()->lastName() : 
                fake()->firstNameFemale() . ' ' . fake()->lastName(),
                'sex' => $randomGender === 'male' ? 'male' : 'female',
                'place_of_birth' => fake()->city(),
                'date_of_birth' => fake()->dateTime(),
                'email' => fake()->unique()->safeEmail(),
                'photo' => config('app.url') . '/img/useravatar.png',
            ]);

            $randomStudyCount = rand(1, 4);
            $randomStudiesArray = [];
            for ($j = 1; $j <= $randomStudyCount; $j++) { 
                $randomGroup = $groups[rand(0, 4)];
                if(!in_array($randomGroup, $randomStudiesArray)){
                    array_push($randomStudiesArray, $randomGroup);
                }
            }

            foreach ($randomStudiesArray as $study) {
                $student->studygroups()->attach($study);
            }
        }
    }
}
