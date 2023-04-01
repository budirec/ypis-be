<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class OrderDocDetail
 *
 * @property integer $qty
 * @property integer $sent_qty
 * @property float $price
 *
 * Relationship
 * @property Item $item
 * @property OrderDoc $orderDoc
 */
class OrderDocDetail extends Model
{
    protected $casts = [
        'qty' => 'integer',
    ];

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    public function orderDoc(): BelongsTo
    {
        return $this->belongsTo(OrderDoc::class);
    }

    public function getSubtotalAttribute(): float
    {
        return (float)$this->qty * $this->price;
    }
}
