# CyberPunk 2019
Small web tool to track, display and predict cyber attacks rate from supplier website.


## Table of contents
- [Terminology](#terms)
- [Installation](#install)
- [Dev environment](#dev)
- [Contributing](#contrib)
- [Furthure reading](#furthure)


## <a name="terms"></a> Terminology
`data`, `value` - variable (number of attacks) we tracking, displaying and predicting.  
`client files` - files being sent to client (`html`, `js`, `css`, etc.).  

## <a name="install"></a> Installation

### Build dependances
- bash with `g++` (on widows Cygwin is useful)
- nodejs with npm (we use `v10.16.3`)
- make

### Building
Clone this repo with `git clone https://github.com/echo-team/CyberPunk.git`.  
Enter repo folder `cd CyberPunk`.  
Build project with `make build`.  

To build separate part of application see page in our wiki:  
[Developer building guide](https://github.com/echo-team/CyberPunk/wiki/Building)


## <a name="dev"></a> Dev environment

### Dev dependances
In addition to build dependances you must have:
- git version with hooks support (pre-commit, pre-push)

### Setting up environment
Enter the local repo foder and type `make install` in terminal. This will do following:
- install hooks
- install dev npm packages


## <a name="contrib"></a> Contributing

### Commiting
Commit name starts with upper case letter, ends with issue index. It should contain briethly description of what was done in commit. Notice, that you will not be able to merge into master if commit messages style will not match this rules.  
Example: `Contributing rules in README.md (issue #1).`.  
To update your branch with current `master` use `git rebase remote_name/master` or `git pull --rebase remote_name master`. To publish your commits after update use `git push remote_name +HEAD`.

### Pull requests
Name should be same with issue name. In body should be reference to issue and copied task description (last is optional). You pull-request will be reviewed by project member after all CI tasks passed successfully.

### Branches
Branch name should contain your nickname, issue number and one-word description (last is optional), divided as in expression: `nickname.issue-description.issue-id`. If you want more than one word - use `-` as a word divider. Notice, that you will not be able to merge into master if branch name style will not match this rules.  
Example: `gigafiga21.frontend.13`


## <a name="furthure"></a> Furthure reading
 - [File structure](https://github.com/echo-team/CyberPunk/wiki/File-structure)
 - [How it works](https://github.com/echo-team/CyberPunk/wiki/How-it-works)
