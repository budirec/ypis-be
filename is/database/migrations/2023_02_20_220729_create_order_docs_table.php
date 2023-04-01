<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_docs', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('document_id')->index()->constrained('documents');
            $table->string('readable_number', 16)->unique(); // SO-FB/23/02/0001
            $table->foreignUuid('customer_id')->index()->constrained('customers');
            $table->date('desired_date')->nullable();

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
        Schema::dropIfExists('order_docs');
    }
};
