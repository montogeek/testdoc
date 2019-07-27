<?php

namespace Deployer;

after('artisan:db:seed', 'deploy_backend');

desc('Deploy backend');
task('deploy_backend', function () {
  $passportKeys = run("php artisan passport:keys");
  run("echo $passportKeys");

  $passportClient = run("php passport:client --password --name='Frontend'");
  run("echo $passportClient");

  writeln("Backend deployed");
});
