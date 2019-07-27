<?php

namespace Deployer;

after('artisan:db:seed', 'deploy_backend');

desc('Deploy backend');
task('deploy_backend', function () {
  artisan("passport:keys", ["showOutput"]);
  artisan("passport:client --password --name='Frontend'", ["showOutput"]);
  writeln("Backend deployed");
});
