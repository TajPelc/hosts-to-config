# Hosts to SSH config

Tiny script for converting hosts file entries to SSH config.

# Installation
- `git clone git@github.com:TajPelc/hosts-to-config.git`
- `cd hosts-to-config`
- `npm install -g`

## Usage
```sh
$ hosts2config --prefix localhost --user f.bar --identity /Users/foo/.ssh/id_rsa
```
Finds all hosts entries that have *localhost* in the name such as `127.0.0.1 localhost` and converts it to:
```
Host localhost
    HostName 127.0.0.1
    User f.bar
    IdentityFile /Users/foo/.ssh/id_rsa
```
