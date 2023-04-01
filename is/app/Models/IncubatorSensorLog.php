<?php

namespace App\Models;

use App\Casts\IncubatorSensorLogData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * Class IncubatorSensorLog
 *
 * @property string $id
 *
 * @property string $incubator_sensor_id
 *
 * @property array $data
 * @property Carbon $log_time
 *
 * Relationships:
 * @property IncubatorSensor $sensor
 */
class IncubatorSensorLog extends UuidModel
{
    use HasFactory;

    public function sensor(): BelongsTo
    {
        return $this->belongsTo(IncubatorSensor::class);
    }

    protected $casts = [
        'data' => IncubatorSensorLogData::class,
    ];
}
