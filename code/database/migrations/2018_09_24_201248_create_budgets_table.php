<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBudgetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('budgets', function (Blueprint $table) {
            $table->unsignedInteger('event_id');
            $table->unsignedInteger('category_id');
            $table->timestamps();
            $table->softDeletes();
            $table->unsignedDecimal('budget')->default(0);
            $table->json('extras');

            $table->primary(['event_id', 'category_id']);
            $table->foreign('event_id')->references('id')->on('events')
                ->onDelete('no action')
                ->onUpdate('no action');
            $table->foreign('category_id')->references('id')->on('categories')
                ->onDelete('no action')
                ->onUpdate('no action');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('budgets');
    }
}
