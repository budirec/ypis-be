<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

abstract class BaseModel extends Model
{
    protected static function booted()
    {
        static::retrieved(function ($model) {
            $model->afterRetrieved();
        });

        static::saving(function ($model) {
            $model->beforeSaving();
        });
    }

    public function afterRetrieved()
    {
    }

    public function beforeSaving()
    {
    }
}
