<?php

use App\Models\Helpers\Constant;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $co2 = new Constant();
        $co2->slug = Constant::SENSOR_CO2;
        $co2->label = 'CO 2';
        $co2->saveOrFail();

        $temperatureHumidity = new Constant();
        $temperatureHumidity->slug = Constant::SENSOR_TEMPERATURE_HUMIDITY;
        $temperatureHumidity->label = 'Temperature Humidity';
        $temperatureHumidity->saveOrFail();

        $temperatureProbe = new Constant();
        $temperatureProbe->slug = Constant::SENSOR_TEMPERATURE_PROBE;
        $temperatureProbe->label = 'Temperature Probe';
        $temperatureProbe->saveOrFail();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
};
