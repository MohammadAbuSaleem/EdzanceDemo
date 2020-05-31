<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
 */

$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    return [
        'name'     => $faker->name,
        'email'    => $faker->safeEmail,
        //use bcrypt('password') if you want to assert for a specific password, but it might slow down your tests
        'password' => str_random(10),
    ];
});

$factory->define(App\Models\PasswordReset::class, function (Faker\Generator $faker) {
    return [
        'email' => $faker->safeEmail,
        'token' => str_random(10),
    ];
});

$factory->define(App\Models\language::class, function (Faker\Generator $faker) {
    $lang      = 'ar';
    $lang_name = 'Arabic';
    //$lang = $faker->languageCode ;$lang_name = $faker->languageCode;
    return [
        'name'       => $lang_name,
        'shortname'  => $lang,
        'created_at' => $faker->dateTime($max = 'now')->format('Y-m-d H:i:s'),
        'updated_at' => $faker->dateTime($max = 'now')->format('Y-m-d H:i:s'),
    ];
});

////////////////////////////////////////////////

$factory->define(App\Models\translate::class, function (Faker\Generator $faker) {
    $lang = $faker->languageCode;
    return [
        'lang_id'    => 1,
        'vocabulary' => $faker->word,
        'created_at' => $faker->dateTime($max = 'now')->format('Y-m-d H:i:s'),
        'updated_at' => $faker->dateTime($max = 'now')->format('Y-m-d H:i:s'),
    ];
});
////////////////////////////////////////////////

$factory->define(App\Models\university::class, function (Faker\Generator $faker) {
    $lang = $faker->languageCode;
    return [
        'name'            => $faker->numberBetween($min = 1, $max = 10000),
        'presidant'       => $faker->name($gender = 'male'),
        'pobox'           => $faker->postcode,
        'telephone'       => $faker->tollFreePhoneNumber,
        'email'           => $faker->email,
        'fax'             => $faker->tollFreePhoneNumber,
        'costavg'         => $faker->numberBetween($min = 5000, $max = 20000),
        'studentscount'   => $faker->numberBetween($min = 1000, $max = 40000),
        'instructorcount' => $faker->numberBetween($min = 50, $max = 200),
        'DOB'             => $faker->dateTimeBetween($startDate = '-30 years', $endDate = '-03 years', $timezone = date_default_timezone_get())->format('Y-m-d H:i:s'),
        'place'           => $faker->city,
        'status'          => $faker->randomElement($array = [1, 2, 3]),
        'type'            => $faker->randomElement($array = [1, 2, 3]),
        'URL'             => $faker->url,
        'Description'     => $faker->numberBetween($min = 1, $max = 10000),
        'rating'          => $faker->numberBetween($min = 0, $max = 1000),
        'globalrating'    => $faker->numberBetween($min = 0, $max = 1000),
        'longitude'       => $faker->longitude($min = -90, $max = 90),
        'latittude'       => $faker->latitude($min = -180, $max = 180),
        'avatar'          => $faker->imageUrl($width = 150, $height = 150, 'city', true),
        'showcase'        => $faker->imageUrl($width = 900, $height = 350, 'city', true),
        'Country'         => $faker->numberBetween($min = 0, $max = 500),
        'created_at'      => $faker->dateTime($max = 'now')->format('Y-m-d H:i:s'),
        'updated_at'      => $faker->dateTime($max = 'now')->format('Y-m-d H:i:s'),
    ];
});
////////////////////////////////////////////////

$factory->define(App\Models\college::class, function (Faker\Generator $faker) {
    return [
        'name'          => $faker->numberBetween($min = 1, $max = 10000),
        'presidant'     => (string) $faker->name($gender = 'male'),
        'DOB'           => (string) $faker->dateTimeBetween($startDate = '-30 years', $endDate = '-03 years', $timezone = date_default_timezone_get())->format('Y-m-d H:i:s'),
        'status'        => $faker->randomElement($array = [1, 2, 3]),
        'address'       => $faker->numberBetween($min = 1, $max = 10000),
        'Description'   => $faker->numberBetween($min = 1, $max = 10000),
        'avatar'        => (string) $faker->imageUrl($width = 150, $height = 150, 'city', true),
        'showcase'      => (string) $faker->imageUrl($width = 900, $height = 350, 'city', true),
        'university_id' => $faker->numberBetween($min = 1, $max = 50),
        'created_at'    => (string) $faker->dateTime($max = 'now')->format('Y-m-d H:i:s'),
        'updated_at'    => (string) $faker->dateTime($max = 'now')->format('Y-m-d H:i:s'),
    ];
});
////////////////////////////////////////////////

$factory->define(App\Models\specialition::class, function (Faker\Generator $faker) {
    $lang = $faker->languageCode;
    return [
        'name'        => $faker->numberBetween($min = 1, $max = 10000),
        'DOB'         => $faker->dateTimeBetween($startDate = '-30 years', $endDate = '-03 years', $timezone = date_default_timezone_get())->format('Y-m-d H:i:s'),
        'status'      => $faker->randomElement($array = [1, 2, 3]),
        'Description' => $faker->numberBetween($min = 1, $max = 10000),
        'college_id'  => $faker->numberBetween($min = 1, $max = 500),
        'created_at'  => $faker->dateTime($max = 'now')->format('Y-m-d H:i:s'),
        'updated_at'  => $faker->dateTime($max = 'now')->format('Y-m-d H:i:s'),
    ];
});
////////////////////////////////////////////////

$factory->define(App\Models\users::class, function (Faker\Generator $faker) {
    $email = $faker->unique()->email;
    return [
        'first_name'          => $faker->firstName($gender = 'male' | 'female'),
        'mid_name'            => $faker->firstNameMale,
        'last_name'           => $faker->lastName,
        'telephone'           => $faker->unique()->e164PhoneNumber,
        'email'               => $email,
        'password'            => bcrypt($email),
        'permissions'         => $faker->randomElement($array = [1, 2, 3]),
        'activated'           => 1,
        'activated_at'        => $faker->dateTimeThisDecade($max = 'now'),
        'last_login'          => $faker->dateTimeThisMonth($max = 'now'),
        'persist_code'        => $faker->md5,
        'reset_password_code' => $faker->md5,
        'avatar'              => $faker->imageUrl($width = 150, $height = 150, 'people', true),
        'showcase'            => $faker->imageUrl($width = 900, $height = 350, 'people', true),
        'viewers'             => $faker->numerify('###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###'),
        'views'               => $faker->numberBetween($min = 0, $max = 10000),
        'acctype'             => 1,
        'university_id'       => $faker->numberBetween($min = 1, $max = 50),
        'college_id'          => $faker->numberBetween($min = 1, $max = 500),
        'facebook'            => $faker->lexify('?????@facebook.com'),
        'google'              => $faker->lexify('?????@gmail.com'),
        'linkedin'            => $faker->lexify('?????@linkedin.com'),
        'twitter'             => $faker->lexify('?????@twitter.com'),
        'url'                 => $faker->url,
        'status'              => $faker->randomElement($array = [1, 2, 3]),
        'sex'                 => $faker->randomElement($array = [1, 2]),
        'rating'              => $faker->numberBetween($min = 0, $max = 1000),
        'specialition_id'     => $faker->numberBetween($min = 1, $max = 2999),
        'created_at'          => $faker->dateTime($max = 'now'),
        'updated_at'          => $faker->dateTime($max = 'now'),
    ];
});

////////////////////////////////////////////////

$factory->define(App\Models\friends::class, function (Faker\Generator $faker) {
    $lang = $faker->languageCode;
    return [
        'main_users_id' => $faker->numberBetween($min = 1, $max = 100000),
        'friend_id'     => $faker->numberBetween($min = 1, $max = 100000),
        'created_at'    => $faker->dateTime($max = 'now'),
        'updated_at'    => $faker->dateTime($max = 'now'),
    ];
});
////////////////////////////////////////////////

$factory->define(App\Models\post::class, function (Faker\Generator $faker) {
    $lang = $faker->languageCode;
    return [
        'title'      => $faker->realText($maxNbChars = 50, $indexSize = 1),
        'users_id'   => $faker->$faker->numberBetween($min = 1, $max = 100000),
        'status'     => $faker->randomElement($array = [1, 2, 3]),
        'tag'        => $faker->word,
        'body'       => $faker->realText($maxNbChars = 500, $indexSize = 1),
        'type'       => $faker->randomElement($array = [1, 2, 3, 4, 5]),
        'place'      => $faker->city,
        'happy'      => $faker->numerify('###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###'),
        'normal'     => $faker->numerify('###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###'),
        'sad'        => $faker->numerify('###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###'),
        'viewers'    => $faker->numerify('###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###'),
        'views'      => $faker->numberBetween($min = 1, $max = 10000),
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
////////////////////////////////////////////////

$factory->define(App\Models\tags::class, function (Faker\Generator $faker) {
    $lang = $faker->languageCode;
    return [
        'tag'        => $faker->word,
        'number'     => $faker->randomDigitNotNull,
        'uses'       => $faker->numerify('###,###,###,###,###,###,###,###,###,###'),
        'views'      => $faker->numberBetween($min = 1, $max = 10000),
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
////////////////////////////////////////////////

$factory->define(App\Models\comment::class, function (Faker\Generator $faker) {
    $lang = $faker->languageCode;
    return [
        'body'         => $faker->text($maxNbChars = 300),
        'post_id'      => $faker->numberBetween($min = 1, $max = 10000),
        'status'       => $faker->randomElement($array = [1, 2, 3]),
        'intrested'    => $faker->numerify('###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###'),
        'notintrested' => $faker->numerify('###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###'),
        'created_at'   => $faker->dateTime($max = 'now'),
        'updated_at'   => $faker->dateTime($max = 'now'),
    ];
});
////////////////////////////////////////////////

$factory->define(App\Models\virtualclass::class, function (Faker\Generator $faker) {
    $lang = $faker->languageCode;
    return [
        'name'         => $faker->realText($maxNbChars = 20, $indexSize = 1),
        'class_code'   => $faker->unique()->numberBetween($min = 1000, $max = 90000000),
        'instructor'   => $faker->numberBetween($min = 1, $max = 5000),
        'from'         => $faker->time($format = 'H:i:s', $max = 'now'),
        'to'           => $faker->time($format = 'H:i:s', $max = 'now'),
        'days'         => $faker->randomElement($array = ['1,3', '1,2,3', '2,4', '1,3,5', '2,4,5']),
        'viewers'      => $faker->numerify('###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###'),
        'views'        => $faker->numberBetween($min = 1, $max = 5000),
        'season'       => $faker->randomElement($array = ['first', 'second', 'summer']),
        'Hours'        => $faker->randomElement($array = ['1', '2', '3', '4', '5', '6']),
        'Privacy'      => $faker->randomElement($array = ['private', 'public', 'custom']),
        'class_number' => $faker->numberBetween($min = 1, $max = 300),
        'class_hall'   => $faker->name,
        'created_at'   => $faker->dateTime($max = 'now'),
        'updated_at'   => $faker->dateTime($max = 'now'),
    ];
});
////////////////////////////////////////////////

$factory->define(App\Models\classusers::class, function (Faker\Generator $faker) {
    $lang = $faker->languageCode;
    return [
        'user_id'    => $faker->numberBetween($min = 1, $max = 100000),
        'class_id'   => $faker->numberBetween($min = 1, $max = 13000),
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
////////////////////////////////////////////////

$factory->define(App\Models\classpost::class, function (Faker\Generator $faker) {
    $lang = $faker->languageCode;
    return [
        'title'      => $faker->realText($maxNbChars = 50, $indexSize = 1),
        'users_id'   => $faker->$faker->numberBetween($min = 1, $max = 100000),
        'class_id'   => $faker->$faker->numberBetween($min = 1, $max = 100000),
        'status'     => $faker->randomElement($array = [1, 2, 3]),
        'tag'        => $faker->word,
        'body'       => $faker->realText($maxNbChars = 500, $indexSize = 1),
        'type'       => $faker->randomElement($array = [1, 2, 3, 4, 5]),
        'place'      => $faker->city,
        'happy'      => $faker->numerify('###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###'),
        'normal'     => $faker->numerify('###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###'),
        'sad'        => $faker->numerify('###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###'),
        'viewers'    => $faker->numerify('###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###', '###,###,###,###,###,###,###,###,###,###'),
        'views'      => $faker->numberBetween($min = 1, $max = 10000),
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
////////////////////////////////////////////////

$factory->define(App\Models\messages::class, function (Faker\Generator $faker) {
    $lang = $faker->languageCode;
    return [
        'sender_id'   => $faker->numberBetween($min = 1, $max = 100000),
        'reciever_id' => $faker->numberBetween($min = 1, $max = 100000),
        'title'       => $faker->$faker->realText($maxNbChars = 40, $indexSize = 1),
        'body'        => $faker->$faker->realText($maxNbChars = 200, $indexSize = 1),
        'seen'        => $faker->numberBetween($min = 1, $max = 2),
        'created_at'  => $faker->dateTime($max = 'now'),
        'updated_at'  => $faker->dateTime($max = 'now'),
    ];
});
////////////////////////////////////////////////

$factory->define(App\Models\chat::class, function (Faker\Generator $faker) {
    $lang = $faker->languageCode;
    return [
        'sender_id'   => $faker->numberBetween($min = 1, $max = 100000),
        'reciever_id' => $faker->numberBetween($min = 1, $max = 100000),
        'title'       => $faker->$faker->realText($maxNbChars = 40, $indexSize = 1),
        'body'        => $faker->$faker->realText($maxNbChars = 200, $indexSize = 1),
        'seen'        => $faker->numberBetween($min = 1, $max = 2),
        'created_at'  => $faker->dateTime($max = 'now')->format('Y-m-d H:i:s'),
        'updated_at'  => $faker->dateTime($max = 'now')->format('Y-m-d H:i:s'),
    ];
});
////////////////////////////////////////////////
