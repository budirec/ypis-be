<?php

namespace App\Helpers\SensorData;

class CO2 implements \JsonSerializable
{
    public float $co2;

    public function jsonSerialize()
    {
        return [
            'co2' => $this->co2,
        ];
    }
}
