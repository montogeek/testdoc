<?php

namespace Deployer;

after('hook:ready', 'deploy_client');

desc('Deploy client');
task('deploy_client', function () {
  upload('client/build/', '{{release_path}}/frontend');
  writeln("Client build uploaded");
});