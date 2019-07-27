<?php

namespace Deployer;

after('artisan:db:seed', 'deploy_backend');

desc('Deploy backend');
task('deploy_backend', function () {
  within('{{release_path}}', function () {
    $passportKeys = run("php artisan passport:keys");
    writeln("<info>$passportKeys</info>");

    $passportClient = run("php artisan passport:client --password --name='Frontend'");
    writeln("<info>$passportClient</info>");

    writeln("Backend deployed");
  });
});
