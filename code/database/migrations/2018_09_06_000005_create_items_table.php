<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $set_schema_table = 'items';

    /**
     * Run the migrations.
     * @table items
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
            $table->float('cost')->nullable();
            $table->float('shareKid')->nullable();
            $table->float('shareAdult')->nullable();
            $table->string('notes', 45)->nullable();
            $table->tinyInteger('bought')->nullable();
            $table->unsignedInteger('event_id');
            $table->json('extras')->nullable();
            $table->unsignedInteger('quantity')->nullable();
            $table->unsignedInteger('categories_id');

            $table->index(["categories_id"], 'fk_items_categories1_idx');

            $table->index(["event_id"], 'fk_menus_parties1_idx');


            $table->foreign('event_id', 'fk_menus_parties1_idx')
                ->references('id')->on('events')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreign('categories_id', 'fk_items_categories1_idx')
                ->references('id')->on('categories')
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
