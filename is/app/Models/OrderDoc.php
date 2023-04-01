<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class OrderDoc
 *
 * @property string $id
 * @property string $readable_number
 * @property string $desired_date
 *
 * Relationship
 * @property-read Document $document
 * @property-read Customer $customer
 * @property-read OrderDocDetail[]|Collection $details
 *
 * Computed
 * @property-read int $total_qty
 * @property-read float $total_amount
 */
class OrderDoc extends Model
{
    use HasFactory;

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function details(): HasMany
    {
        return $this->hasMany(OrderDocDetail::class);
    }

    public function getTotalQtyAttribute(): int
    {
        return $this->details->sum('qty');
    }

    public function getTotalAmountAttribute(): float
    {
        return $this->details->sum(function (OrderDocDetail $detail) {
            return $detail->qty * $detail->item->price;
        });
    }
}
