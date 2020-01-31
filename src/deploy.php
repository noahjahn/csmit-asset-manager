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

after('deploy:update_code', 'deploy:merge_src');

task('deploy:merge_src', function () {
    run('rsync -abviuzP {{deploy_path}}/release/src/ {{deploy_path}}/release/');
});

after('deploy:merge_src', 'deploy:npm_install');
task('deploy:npm_install', function () {
    run('cd {{deploy_path}}/release/ && npm install');
});


after('deploy:merge_src', 'update_database');
task('update_database', function () {

});
