#!/bin/bash

#####################################################################
# Constants
#####################################################################

export PACKAGE_NAME="infinni-ui-dist"
export PACKAGE_URL="git@infinni-ui-dist:InfinniPlatform/InfinniUI-dist.git"
export SOURCE_PATH="InfinniUI"
export GIT_USER="Teamcity"
export GIT_EMAIL="info@infinnity.ru"

#####################################################################
# Functions
#####################################################################

step_start() {
    if [ "${step_name}" != "" ]
    then
        step_end
    fi

    step_name=$1

    echo "##teamcity[blockOpened name='${step_name}']"
}

step_end() {
    echo "##teamcity[blockClosed name='${step_name}']"
    step_name=""
}

_exit() {
    step_end

    if [ $1 = "0" ]
    then
        exit 0
    fi

    if [ "$2" != "" ]
    then
        echo "Deploy failed: $2"
        telegram "Deploy failed: $2"
    fi

    exit $1
}

telegram() {
    telegram_message=$1

    if [ "${BOT_TOKEN}" != "" ]
    then
        echo "Try to send telegram notification"
        curl -s -X POST \
            "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
            -d chat_id="${CHAT_ID}" \
            -d text="${telegram_message}"
        echo .
    else
        echo "Telegram message: ${telegram_message}"
    fi
}

_pushd() {
    pushd $1 > /dev/null
}

_popd() {
    popd > /dev/null
}

get_version() {
    echo `node -e "console.log(require('./package.json').version);"`
}

git_prepare() {
    git config user.name "${GIT_USER}" || _exit $? "Could not set github user.name"
    git config user.email "${GIT_EMAIL}" || _exit $? "Could not set github user.email"
}

git_push() {
    git add --all || _exit $? "Could not add files to index"
    git commit -m "$1" || _exit $? "Could not commit changes"
    git push || _exit $? "Could not push changes"
}

git_push_tags() {
    git tag -a "$1" -m "$2" || _exit $? "Could not create git tag"
    git push --tags || _exit $? "Could not push git tag to GitHub"
}

compare_versions() {
    # http://stackoverflow.com/questions/4023830/how-compare-two-strings-in-dot-separated-version-format-in-bash
    if [[ $1 == $2 ]]
    then
        echo "equal"
        return
    fi
    local IFS=.
    local i ver1=($1) ver2=($2)
    # fill empty fields in ver1 with zeros
    for ((i=${#ver1[@]}; i<${#ver2[@]}; i++))
    do
        ver1[i]=0
    done
    for ((i=0; i<${#ver1[@]}; i++))
    do
        if [[ -z ${ver2[i]} ]]
        then
            # fill empty fields in ver2 with zeros
            ver2[i]=0
        fi
        if ((10#${ver1[i]} > 10#${ver2[i]}))
        then
            echo "more"
            return
        fi
        if ((10#${ver1[i]} < 10#${ver2[i]}))
        then
            echo "less"
            return
        fi
    done
    echo 0
}

#####################################################################
# Export functions
#####################################################################

export -f step_start
export -f step_end

export -f telegram

export -f _pushd
export -f _popd
export -f _exit

export -f get_version
export -f compare_versions

export -f git_prepare
export -f git_push
export -f git_push_tags

#####################################################################
# Running deploy script
#####################################################################

bash deploy.sh
