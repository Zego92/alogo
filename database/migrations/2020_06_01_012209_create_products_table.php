<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id');
            $table->string('name')->index()->unique();
            $table->string('brand')->index();
            $table->string('product_number')->unique();
            $table->string('article')->index();
            $table->string('slug')->unique();
            $table->float('price');
            $table->string('status');
            $table->string('keywords');
            $table->text('description')->nullable();
            $table->text('image')->default('no_image.jpg');
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
