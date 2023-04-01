<?php

namespace App\Casts;

use App\Helpers\SensorData;
use App\Models\IncubatorSensor;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

class IncubatorSensorCurrentReading implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param IncubatorSensor $model
     * @param string $key
     * @param mixed $value
     * @param array $attributes
     * @return mixed
     */
    public function get($model, string $key, $value, array $attributes)
    {
        $data = json_decode($value);
        return SensorData::getSensorDataObject($model->type->slug, $data);
    }

    /**
     * Prepare the given value for storage.
     *
     * @param IncubatorSensor $model
     * @param string $key
     * @param mixed $value
     * @param array $attributes
     * @return mixed
     */
    public function set($model, string $key, $value, array $attributes)
    {
        return json_encode($value);
    }
}
