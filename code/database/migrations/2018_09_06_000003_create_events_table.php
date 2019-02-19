<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $set_schema_table = 'events';

    /**
     * Run the migrations.
     * @table events
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable($this->set_schema_table)) return;
        Schema::create($this->set_schema_table, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name', 100);
            $table->dateTime('startDate');
            $table->dateTime('endDate');
            $table->string('location', 45)->nullable();
            $table->json('extras')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unsignedInteger('user_id');

            $table->index(["user_id"], 'fk_events_user1_idx');

            $table->foreign('user_id', 'fk_events_user1_idx')
                ->references('id')->on('users')
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
