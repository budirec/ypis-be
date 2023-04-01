<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Incubator;
use App\Models\IncubatorSensor;
use App\Models\IncubatorSensorLog;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $incubator = Incubator::factory()->create([
            'name' => 'BCT-4',
        ]);

        $co2IncubatorSensor = IncubatorSensor::factory()->for($incubator)->co2()->create();
        $temperatureHumidityIncubatorSensors = IncubatorSensor::factory()->for($incubator)
            ->temperatureHumidity()->count(6)->create();
        $temperatureProbeIncubatorSensors = IncubatorSensor::factory()->for($incubator)->temperatureProbe()
            ->count(8)->create();

        IncubatorSensorLog::factory()->count(100)->co2()->create([
            'sensor_id' => $co2IncubatorSensor->id,
        ]);
        foreach ($temperatureHumidityIncubatorSensors as $sensor) {
            IncubatorSensorLog::factory()->count(100)->temperatureHumidity()->create([
                'sensor_id' => $sensor->id,
            ]);
        }
        foreach ($temperatureProbeIncubatorSensors as $sensor) {
            IncubatorSensorLog::factory()->count(100)->temperatureProbe()->create([
                'sensor_id' => $sensor->id,
            ]);
        }
    }
}
