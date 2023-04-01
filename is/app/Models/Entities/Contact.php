<?php

namespace App\Models\Entities;

use App\Helpers\Phone;
use App\Models\BaseModel;
use App\Models\Helpers\Constant;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * Class Contact
 *
 * @property string $type_id
 * @property string $value
 * @property string $name
 * @property int $contactable_id
 * @property string $contactable_type
 *
 * Relationships
 * @property-read Address|Person $contactable
 * @property-read Constant $type
 */
class Contact extends BaseModel
{
    const TYPE_PHONE = 'phone';
    const TYPE_EMAIL = 'email';

    /**
     * Get all the owning contactable models.
     */
    public function contactable(): MorphTo
    {
        return $this->morphTo();
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(Constant::class, 'type_id');
    }

    public function getFormattedAttribute(): string
    {
        if ($this->type_id === self::TYPE_PHONE) {
            return Phone::formatPhoneNumber($this->value);
        }

        return $this->value;
    }

}
