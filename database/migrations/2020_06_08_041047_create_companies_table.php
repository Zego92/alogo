<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->text('description')->nullable();
            $table->string('phone1')->unique()->nullable();
            $table->string('phone2')->unique()->nullable();
            $table->string('phone3')->unique()->nullable();
            $table->string('phone4')->unique()->nullable();
            $table->string('phone5')->unique()->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('address')->nullable();
            $table->string('location')->nullable();
            $table->string('startTimeWork')->nullable();
            $table->string('endTimeWork')->nullable();
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
        Schema::dropIfExists('companies');
    }
}
