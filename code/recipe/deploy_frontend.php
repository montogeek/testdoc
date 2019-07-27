<?php

namespace Deployer;

set('my_custom_message', 'hello world!');

desc('My task');
task('my_task', function () {
    run("cd {{release_path}} && echo '{{my_custom_message}}'");
});


after('hook:ready', 'my_task');