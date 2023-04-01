<?php

namespace Database\Factories;

use App\Helpers\SensorData\CO2;
use App\Helpers\SensorData\TemperatureHumidity;
use App\Helpers\SensorData\TemperatureProbe;
use App\Helpers\Temperature;
use App\Models\Incubator;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends Factory<Incubator>
 */
class IncubatorSensorLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'log_time' => fake()->dateTimeThisMonth,
        ];
    }

    public function co2()
    {
        return $this->state(function (array $attribute) {
            $sensorData = new CO2();
            $sensorData->co2 = fake()->randomFloat();
            return [
                'data' => $sensorData,
            ];
        });
    }

    public function temperatureHumidity()
    {
        return $this->state(function (array $attribute) {
            $sensorData = new TemperatureHumidity();
            $sensorData->humidity = fake()->randomFloat();
            $sensorData->temperature = fake()->randomFloat();
            $sensorData->temperatureScale = fake()->randomElement([Temperature::CELSIUS, Temperature::FAHRENHEIT]);
            return [
                'data' => $sensorData,
            ];
        });
    }

    public function temperatureProbe()
    {
        return $this->state(function (array $attribute) {
            $sensorData = new TemperatureProbe();
            $sensorData->temperature = fake()->randomFloat();
            $sensorData->temperatureScale = fake()->randomElement([Temperature::CELSIUS, Temperature::FAHRENHEIT]);
            return [
                'data' => $sensorData,
            ];
        });
    }
}
