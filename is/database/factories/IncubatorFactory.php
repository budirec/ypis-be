<?php

namespace Database\Factories;

use App\Models\Incubator;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Incubator>
 */
class IncubatorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
        ];
    }
}
