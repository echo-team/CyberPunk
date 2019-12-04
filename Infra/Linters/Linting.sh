#!/bin/sh

# Run linters
# {String} $1 - file list to lint
function linting {
    FOLDER=`git rev-parse --show-toplevel`;
    EXIT=0;
    printf "log: linting...\n";

    FILES=$(echo "$1" | grep -i ".*\.js$" | tr "\n" " ");
    if [[ $FILES != "" ]]; then
        eval "$FOLDER/node_modules/.bin/eslint --config '$FOLDER/Infra/Linters/ESLint.js' $FILES";
        EXIT=$?;
    fi

    exit $EXIT;
}

if [ "${1}" != "--source-only" ]; then
    if [[ $TRAVIS_PULL_REQUEST_BRANCH == "" ]]; then
        exit 0;
    fi

    # Getting file names with changes
    FILE_LIST=$(git diff ${TRAVIS_COMMIT_RANGE[0]} HEAD --name-only);

    linting "$FILE_LIST";
fi
