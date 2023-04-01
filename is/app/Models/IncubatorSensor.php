<?php

namespace App\Models;

use App\Casts\IncubatorSensorCurrentReading;
use App\Helpers\SensorData\CO2;
use App\Helpers\SensorData\TemperatureHumidity;
use App\Helpers\SensorData\TemperatureProbe;
use App\Models\Helpers\Constant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class IncubatorSensor
 *
 * @property string $id
 *
 * @property string $incubator_id
 * @property int $type_id
 *
 * @property string $name
 * @property CO2|TemperatureHumidity|TemperatureProbe|null $current_reading
 *
 * Relationships
 * @property Incubator $incubator
 * @property IncubatorSensorLog[] $logs
 * @property Constant $type
 */
class IncubatorSensor extends UuidModel
{
    use HasFactory;

    public function incubator(): BelongsTo
    {
        return $this->belongsTo(Incubator::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(IncubatorSensorLog::class);
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(Constant::class);
    }

    protected $casts = [
        'current_reading' => IncubatorSensorCurrentReading::class,
    ];
}
