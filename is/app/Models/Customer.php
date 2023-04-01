<?php

namespace App\Models;

use App\Models\Entities\Address;
use App\Models\Entities\Contact;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * Class Customer
 *
 * @property string $name
 * @property string $code
 *
 * Relationship
 * @property Address[] $addresses
 * @property Contact[] $contacts
 */
class Customer extends BaseModel
{
    public function beforeSaving()
    {
        parent::beforeSaving();

        if (empty($this->code)) {
            //Generat 10 alpahnumeric code
        }
    }

    public function addresses(): MorphMany
    {
        return $this->morphMany(Address::class, 'addressable');
    }

    public function contacts(): MorphMany
    {
        return $this->morphMany(Contact::class, 'contactable');
    }
}
