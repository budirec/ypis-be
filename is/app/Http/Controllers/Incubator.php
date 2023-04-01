<?php

namespace App\Http\Controllers;

use App\Models\IncubatorSensor;
use Inertia\Inertia;

class Incubator extends Controller
{
    public function incubator(\App\Models\Incubator $incubator)
    {
        return Inertia::render('Incubator', [
            'incubator' => $incubator,
            'sensors' => $incubator->sensors
        ]);
    }

    public function sensors(\App\Models\Incubator $incubator)
    {
        return $incubator->sensors();
    }

    public function sensor(Incubator $incubator, IncubatorSensor $sensor)
    {
        return $sensor;
    }
}
