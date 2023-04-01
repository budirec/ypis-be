<?php

namespace App\Helpers\SensorData;

use App\Helpers\Temperature;
use Illuminate\Contracts\Support\Arrayable;

class TemperatureHumidity implements Arrayable, \JsonSerializable
{
    use HasTemperature;

    public float $humidity;

    public function toArray(): array
    {
        return [
            'humidity' => $this->humidity,
            'temperature' => $this->temperatureInCelsius(),
            'temperatureScale' => Temperature::CELSIUS,
        ];
    }

    public function jsonSerialize(): string
    {
        return json_encode($this->toArray());
    }
}
