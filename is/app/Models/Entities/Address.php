<?php

namespace App\Models\Entities;

use App\Models\BaseModel;
use App\Models\Customer;
use App\Models\Helpers\Country;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * Class Address
 *
 * @property int $id
 * @property string $street
 * @property string $city
 * @property string $zip
 * @property string $state
 * @property string $name
 *
 * Relationships
 * @property-read Country $country
 * @property-read Contact[] $contacts
 * @property-read Customer|Person $addressable
 *
 * Computed
 * @property-read string $full_address
 */
class Address extends BaseModel
{
    /**
     * Get the country associated with the address.
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    /**
     * Get the contacts associated with the address.
     */
    public function contacts(): MorphMany
    {
        return $this->morphMany(Contact::class, 'contactable');
    }

    /**
     * Get all the owning addressable models.
     */
    public function addressable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the full address.
     */
    public function getFullAddressAttribute(): string
    {
        return "{$this->street}\n {$this->city}, {$this->state} {$this->zip}\n {$this->country}";
    }
}
