<?php

namespace App\Helpers\SensorData;

use App\Helpers\Temperature;

/**
 * Trait HasTemperature
 *
 * @property float $temperature
 * @property string $temperatureScale
 */
trait HasTemperature
{
    public float $temperature;
    public string $temperatureScale;

    public function temperatureInCelsius(): float
    {
        return $this->temperatureScale === Temperature::CELSIUS ? $this->temperature :
            Temperature::convertFahrenheitToCelsius(
                $this->temperature
            );
    }

    public function temperatureInFahrenheit(): float
    {
        return $this->temperatureScale === Temperature::FAHRENHEIT ? $this->temperature :
            Temperature::convertCelsiusToFahrenheit(
                $this->temperature
            );
    }
}
