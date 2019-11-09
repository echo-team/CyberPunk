# CyberPunk 2019
Small web tool to track, display and predict cyber attacks rate from supplier website.


## Table of contents
- [Terminology](terms)
- [Contributing](contrib)
- [Furthure reading](furthure)


## <a name="terms"></a> Terminology
`data`, `value` - variable (number of attacks) we tracking, displaying and predicting.  
`client files` - files being sent to client (`html`, `js`, `css`, etc.).  


## <a name="contrib"></a> Contributing

### Commiting
Commit name starts with upper case letter, ends with issue index. It should contain briethly description of what was done in commit.  
Example: `Contributing rules in README.md (issue #1).`.  
To update your branch with current `master` use `git rebase remote_name/master` or `git pull --rebase remote_name master`. To publish your commits after update use `git push remote_name +HEAD`.

### Pull requests
Name should be same with issue name. In body should be reference to issue and copied task description (last is optional). You pull-request will be reviewed by project member after all CI tasks passed successfully.

### Branches
Branch name should contain your nickname, issue number and one-word description (last is optional), divided as in expression: `nickname.issue-description.issue-number`. If you want more than one word - use `-` as a word divider.  
Example: `gigafiga21.frontend.13`


## <a name="furthure"></a> Furthure reading
 - [File structure](https://github.com/echo-team/CyberPunk/wiki/File-structure)
 - [How it works](https://github.com/echo-team/CyberPunk/wiki/How-it-works)