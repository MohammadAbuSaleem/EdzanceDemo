<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCollegeUniversity extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
public function up()
{
    //
    DB::statement("
        CREATE  VIEW `college_university` AS
            SELECT
              `college`.`id` AS `id`,
              `college`.`mthr_name` AS `mthr_name`,
              `college`.`eng_name` AS `eng_name`,
              `college`.`presidant` AS `presidant`,
              `college`.`created_at` AS `created_at`,
              `college`.`updated_at` AS `updated_at`,
              `college`.`DOB` AS `DOB`,
              `college`.`status` AS `status`,
              `college`.`mthr_address` AS `mthr_address`,
              `college`.`eng_address` AS `eng_address`,
              `college`.`mthr_Description` AS `mthr_Description`,
              `college`.`eng_Description` AS `eng_Description`,
              `college`.`avatar` AS `avatar`,
              `college`.`showcase` AS `showcase`,
              `college`.`university_id` AS `university_id`,
              `college`.`deleted_at` AS `deleted_at`,
              `university`.`id` AS `uni_id`,
              `university`.`mthr_name` AS `uni_name`,
              CONCAT(
                `university`.`mthr_name`,
                ' - ',
                `college`.`mthr_name`
              ) AS `full_name`
            FROM
                `college`
              JOIN
                `university`
              ON
                `college`.`university_id` = `university`.`id`
              ;
    ");
}

/**
* Reverse the migrations.
*
* @return void
*/
public function down()
{
    //
    DB::statement("DROP VIEW IF EXISTS college_university");
}
}
