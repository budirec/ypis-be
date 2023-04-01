<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

/**
 * Class Incubator
 *
 * @property string $id
 *
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
abstract class UuidModel extends BaseModel
{
    use HasUuids;
}
