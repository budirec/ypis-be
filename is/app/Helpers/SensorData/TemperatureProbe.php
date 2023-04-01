<?php

namespace App\Helpers\SensorData;

use App\Helpers\Temperature;
use Illuminate\Contracts\Support\Arrayable;

class TemperatureProbe implements Arrayable, \JsonSerializable
{
    use HasTemperature;

    public function toArray(): array
    {
        return [
            'temperature' => $this->temperatureInCelsius(),
            'temperatureScale' => Temperature::CELSIUS,
        ];
    }

    public function jsonSerialize(): string
    {
        return json_encode($this->toArray());
    }
}
