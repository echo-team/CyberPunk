#!/bin/sh

# Checks git commit naming style
# {String} $1 - commit message to check
function checkCommitStyle {
    # Checking commit syntax 
    TEST=`echo "$MESSAGE" | sed -n '/^[A-Z].* (issue #[0-9]*)\.$/p'`;

    if [[ $TEST == "" ]]; then
        printf "\nerror: invalid commit syntax."
        printf "\n\n  Valid syntax is \"Commit message (issue #[issue id]).\" \n\n"
        return 1;
    fi

    return 0;
}

if [ "${1}" != "--source-only" ]; then
    if [[ $TRAVIS_PULL_REQUEST_BRANCH == "" ]]; then
        exit 0;
    fi

    # Getting commit messages
    COMMITS=`git log --format='%B' "$TRAVIS_COMMIT_RANGE"`;
    IFS=$'\n'
    readarray -t MESSAGES <<<"$COMMITS"

    printf "log: checking...\n\n";

    for MESSAGE in ${MESSAGES[@]}; do
        printf "  "$MESSAGE"\n";
        checkCommitStyle $MESSAGE;

        ERROR=$?
        if [[ $ERROR -ne 0 ]]; then
            exit $ERROR;
        fi
    done

    printf "\n"
fi
