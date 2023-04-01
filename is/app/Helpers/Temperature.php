<?php

namespace App\Helpers;

class Temperature
{
    const CELSIUS = 'C';
    const FAHRENHEIT = 'F';

    public static function convertFahrenheitToCelsius($celsius): float
    {
        return ($celsius * 1.8) + 32;
    }

    public static function convertCelsiusToFahrenheit($fahrenheit): float
    {
        return ($fahrenheit - 32) / 1.8;
    }
}
