#!/bin/sh

# Run linters
# {Array} $1 - file list to lint
function linting {
    FOLDER=`git rev-parse --show-toplevel`;
    FILES=("$@");
    NODE=`command -v node`;
    printf "log: linting...\n";

    for FILE in "${FILES[@]}"; do
        # Getting file extension
        NAME=(${FILE//./ });
        EXIT=0;

        # Linting
        # if [[ ${NAME[-1]} == "cpp" || ${NAME[-1]} == "hpp" ]]; then
        #    `astyle --file="./AStyle.rc"`;
        #    EXIT=$?;
        if [[ $NODE != "" && ${NAME[-1]} == "js" ]]; then
            eval "$FOLDER/node_modules/.bin/eslint --config '$FOLDER/Infra/Linters/ESLint.js' $FILE";
            EXIT=$?;
        fi
    done

    exit $EXIT;
}

if [ "${1}" != "--source-only" ]; then
    if [[ $TRAVIS_PULL_REQUEST_BRANCH == "" ]]; then
        exit 0;
    fi

    # Getting file names with changes
    FILE_LIST=`git diff ${TRAVIS_COMMIT_RANGE[0]} ${TRAVIS_COMMIT_RANGE[-1]} --name-only`;
    IFS=$'\n'
    readarray -t FILES <<<"$FILE_LIST"

    linting "${FILES[@]}";
fi
