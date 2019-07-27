<?php

namespace Deployer;

after('hook:ready', 'fix_permissions');

desc('Fix permissions');
task('fix_permissions', function () {
  within('{{release_path}}', function () {
    run('sudo chmod -R 755 bootstrap/');
    run('sudo chmod -R 777 storage/*');
    writeln("Permission fixed");
  });
});
