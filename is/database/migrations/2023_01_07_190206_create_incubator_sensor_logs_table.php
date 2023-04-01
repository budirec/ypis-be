<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incubator_sensor_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('sensor_id');
            $table->foreign('sensor_id')->references('id')->on('incubator_sensors');

            $table->jsonb('data');
            $table->timestamp('log_time');

            $table->unique(['sensor_id', 'log_time']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('incubator_sensor_logs');
    }
};
