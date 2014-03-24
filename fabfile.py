from __future__ import with_statement
from fabric.api import *
env.use_ssh_config = True

env.local = {
    'hostname': 'localhost',
    'webroot': '/path/to/local/webroot',
}

env.prod = {
    'hostname': 'user@host', # <- SSH connection string, ideally from your SSH config file
    'webroot': '/path/to/remote/webroot',
}

def deploy():
    """ Runs "rsync -ravz" from local webroot to remote webroot """
    env.host_string = env.prod['hostname']
    cmd_vars = {
        'local_webroot': env.local['webroot'],
        'remote_host': env.prod['hostname'],
        'remote_webroot': env.prod['webroot'],
    }
    local('rsync -ravz %(local_webroot)s/ %(remote_host)s:%(remote_webroot)s' % cmd_vars)

def test():
    """ Lists local webroot, runs "uname -a" on remote server, then lists remote webroot."""
    local('ls -al' + ' ' + env.local['webroot'])
    env.host_string = env.prod['hostname']
    run('uname -a')
    run('ls -al' + ' ' + env.prod['webroot'])
    print('Test completed.')
