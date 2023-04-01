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
        Schema::create('incubator_sensors', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('incubator_id');
            $table->foreign('incubator_id')->references('id')->on('incubators');
            $table->unsignedBigInteger('type_id');
            $table->foreign('type_id')->references('id')->on('constants');

            $table->string('name')->nullable(false);
            $table->json('current_reading')->nullable();

            $table->unique(['incubator_id', 'name']);

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
        Schema::dropIfExists('incubator_sensors');
    }
};
