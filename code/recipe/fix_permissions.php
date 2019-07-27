<?php

namespace Deployer;

after('hook:done', 'fix_permissions');

desc('Fix permissions');
task('fix_permissions', function () {
  within('{{release_path}}', function () {
    run('sudo chmod -R 777 bootstrap/cache/');
    run('sudo chmod -R 777 storage/*');
    writeln("Permission fixed");
  });
});
