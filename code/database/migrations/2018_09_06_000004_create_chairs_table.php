<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChairsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $set_schema_table = 'chairs';

    /**
     * Run the migrations.
     * @table chairs
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable($this->set_schema_table)) return;
        Schema::create($this->set_schema_table, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->json('layout')->nullable();
            $table->string('notes', 45)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unsignedInteger('event_id');

            $table->index(["event_id"], 'fk_chairs_parties1_idx');

            $table->foreign('event_id', 'fk_chairs_parties1_idx')
                ->references('id')->on('events')
                ->onDelete('no action')
                ->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
     public function down()
     {
       Schema::dropIfExists($this->set_schema_table);
     }
}
