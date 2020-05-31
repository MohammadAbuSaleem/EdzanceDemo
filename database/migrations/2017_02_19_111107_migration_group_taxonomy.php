<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationGroupTaxonomy extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_taxonomy', function (Blueprint $table) {
            $table->integer('group_id')->unsigned()->index();
            $table->integer('taxonomy_id')->unsigned()->index();
            $table->primary(['group_id', 'taxonomy_id']);
            // $table->timestamps();
            $table->foreign('group_id')->references('id')->on('groups')->onDelete('no action');
            $table->foreign('taxonomy_id')->references('id')->on('taxonomys')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('group_taxonomy');
    }
}
