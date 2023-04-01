<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * Class Documents
 *
 * @property string $type
 * @property array $args
 *
 * Relationship
 * @property User $user
 * @property OrderDoc|ProductionDoc $documentable
 */
class Document extends Model
{
    protected $casts = [
        'args' => 'json',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function documentable(): MorphTo
    {
        return $this->morphTo();
    }
}
