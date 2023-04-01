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
        Schema::create('order_doc_details', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('item_id')->index()->constrained('items');
            $table->foreignUuid('order_doc_id')->index()->constrained('order_docs');
            $table->integer('qty')->default(0);
            $table->decimal('price', 12)->default(0);
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
