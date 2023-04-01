<?php

namespace App\Models\Helpers;

use App\Helpers\SensorData\CO2;
use App\Helpers\SensorData\TemperatureHumidity;
use App\Helpers\SensorData\TemperatureProbe;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

/**
 * Class Constant
 *
 * @property string $id
 *
 * @property string $slug
 * @property string $label
 * @property array $args
 */
class Constant extends Model
{
    const SENSOR_TEMPERATURE_PROBE = TemperatureProbe::class;
    const SENSOR_TEMPERATURE_HUMIDITY = TemperatureHumidity::class;
    const SENSOR_CO2 = CO2::class;

    public static function getBySlug($slug)
    {
        return Cache::rememberForever('constant_' . $slug, function () use ($slug) {
            return self::where('slug', $slug)->firstOrFail();
        });
    }
}
