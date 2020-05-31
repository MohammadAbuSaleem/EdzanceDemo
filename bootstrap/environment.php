<?php
/*
|--------------------------------------------------------------------------
| Detect The Application Environment
|--------------------------------------------------------------------------
|
| Laravel takes a dead simple approach to your application environments
| so you can just specify a machine name for the host that matches a
| given environment, then we will automatically detect it for you.
|
*/
$env = $app->detectEnvironment(function(){
// $environmentPath = __DIR__.'/../.env';
// $setEnv = trim(file_get_contents($environmentPath));

//   putenv('APP_ENV='.$setEnv);
  // dd(getenv('APP_ENV'));
if (!getenv('APP_ENV')) {
	  putenv('APP_ENV=production');
}

  // LARAVEL 5.2  - use this below..
  $dotenv = new Dotenv\Dotenv(__DIR__ . '/../', '.' . getenv('APP_ENV') . '.env');
  $dotenv->overload(); //this is important
// }
});