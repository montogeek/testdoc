<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssistantsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $set_schema_table = 'assistants';

    /**
     * Run the migrations.
     * @table assistants
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable($this->set_schema_table)) return;
        Schema::create($this->set_schema_table, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name', 45)->nullable();
            $table->string('address', 100)->nullable();
            $table->string('city', 45)->nullable();
            $table->string('state', 45)->nullable();
            $table->string('zip', 45)->nullable();
            $table->string('phonenumber', 45)->nullable();
            $table->string('email', 45)->nullable();
            $table->tinyInteger('rsvp')->nullable();
            $table->integer('kids')->nullable();
            $table->integer('adults')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unsignedInteger('event_id');

            $table->index(["event_id"], 'fk_guests_parties1_idx');

            $table->foreign('event_id', 'fk_guests_parties1_idx')
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
