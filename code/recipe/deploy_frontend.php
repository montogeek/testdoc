<?php

namespace Deployer;

after('hook:ready', 'deploy_client');

desc('Deploy client');
task('deploy_client', function () {
  run("pwd");
  run("ls -alh .");
});