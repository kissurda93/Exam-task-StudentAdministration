<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->firstNameMale() . fake()->lastName(),
            'sex' => 'male',
            'place_of_birth' => fake()->city(),
            'date_of_birth' => fake()->dateTime(),
            'email' => fake()->unique()->safeEmail(),
        ];
    }
}
