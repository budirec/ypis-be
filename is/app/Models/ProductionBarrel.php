//A class that has number and totalDryBeans
// Path: app/Models/ProductionBarrel.php

<?php

/**
 * Class ProductionBarrel
 *
 * @property int $total_dry_beans
 *
 * Relationships:
 * @property-read Production $production
 */
class ProductionBarrel extends Model
{
    protected $casts = [
        'total_dry_beans' => 'integer',
    ];
}
