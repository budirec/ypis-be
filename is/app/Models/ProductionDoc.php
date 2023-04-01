<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ProductionDoc
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
 *
 */
class ProductionDoc extends Model
{
    use HasFactory;
}
