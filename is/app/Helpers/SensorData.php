<?php

namespace App\Helpers;

use App\Helpers\SensorData\CO2;
use App\Helpers\SensorData\TemperatureHumidity;
use App\Helpers\SensorData\TemperatureProbe;
use App\Models\Helpers\Constant;

class SensorData
{
    public static function getSensorDataObject($type, $value)
    {
        switch ($type) {
            case Constant::SENSOR_CO2:
                $sensorDataObject = new CO2();
                $sensorDataObject->co2 = $value->co2 ?? 0;
                break;
            case Constant::SENSOR_TEMPERATURE_HUMIDITY:
                $sensorDataObject = new TemperatureHumidity();
                $sensorDataObject->humidity = $value->humidity ?? 0;
                $sensorDataObject->temperature = $value->temperature ?? 0;
                $sensorDataObject->temperatureScale = $value->temperatureScale ?? 0;
                break;
            case Constant::SENSOR_TEMPERATURE_PROBE:
                $sensorDataObject = new TemperatureProbe();
                $sensorDataObject->temperature = $value->temperature ?? 0;
                $sensorDataObject->temperatureScale = $value->temperatureScale ?? 0;
                break;
            default:
                return null;
        }
        return $sensorDataObject;
    }
}
