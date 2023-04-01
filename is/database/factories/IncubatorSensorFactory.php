<?php

namespace Database\Factories;

use App\Models\Helpers\Constant;
use App\Models\Incubator;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Incubator>
 */
class IncubatorSensorFactory extends Factory
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

    public function co2()
    {
        return $this->state(function (array $attribute) {
            return [
                'type_id' => Constant::getBySlug(Constant::SENSOR_CO2)->id,
            ];
        });
    }

    public function temperatureHumidity()
    {
        return $this->state(function (array $attribute) {
            return [
                'type_id' => Constant::getBySlug(Constant::SENSOR_TEMPERATURE_HUMIDITY)->id,
            ];
        });
    }

    public function temperatureProbe()
    {
        return $this->state(function (array $attribute) {
            return [
                'type_id' => Constant::getBySlug(Constant::SENSOR_TEMPERATURE_PROBE)->id,
            ];
        });
    }
}
