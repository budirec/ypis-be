<?php

namespace App\Models\Entities;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Person
 *
 * @property string $id
 * @property string $first_name
 * @property string $middle_name
 * @property string $last_name
 * @property string $dob
 *
 * Relationships
 * @property Address[] $addresses
 * @property Contact[] $contacts
 *
 * Computed
 * @property string $full_name
 * @property Contact[] $flatten_contacts
 */
class Person extends BaseModel
{
    /**
     * Get the addresses associated with the person.
     */
    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class);
    }

    /**
     * Get the contacts associated with the person.
     */
    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    public function getFullNameAttribute(): string
    {
        $nameParts = array_filter([$this->first_name, $this->middle_name, $this->last_name]);
        return implode(' ', $nameParts);
    }

    public function getFlattenContactsAttribute(): array
    {
        $contacts = $this->contacts;
        foreach ($this->addresses as $address) {
            foreach ($address->contacts as $contact) {
                $contact->name = $address->name . ' - ' . $contact->name;
                $contacts[] = $contact;
            }
        }
        return $contacts;
    }
}
