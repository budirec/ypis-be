<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Incubator
 *
 * @property string $id
 *
 * @property string $name
 *
 * Relationships:
 * @property IncubatorSensor[] $sensors
 */
class Incubator extends UuidModel
{
    use HasFactory;

    public function sensors(): HasMany
    {
        return $this->hasMany(IncubatorSensor::class);
    }
}
