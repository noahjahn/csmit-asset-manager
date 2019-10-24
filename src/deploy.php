<?php
namespace Deployer;

require 'recipe/codeigniter.php';

// Project name
set('application', 'csmit');

inventory('hosts.yml');
set('writable_use_sudo', true);

// Project repository
set('repository', 'git@github.com:noahjahn/csmit-asset-manager.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true);

add('shared_dirs', ['uploads']);
add('writable_dirs', ['uploads']);

set('allow_anonymous_stats', false);

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

task('deploy:done', function () {
    write('Test!');
    run('mv -f /home/pi/sites/current/src/* /home/pi/sites/current/');
});
