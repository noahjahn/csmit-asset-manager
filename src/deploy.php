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

after('deploy', 'merge-src');
task('merge-src', function () {
    run('rsync -abviuzP /var/www/html/csmit.noahjahn.dev/current/src/ /var/www/html/csmit.noahjahn.dev/current/');
});

after('merge-src', 'update-database');
task('update-database', function () {
    
});
