#!/bin/bash

#####################################################################
# Copyright Infinnity Solutions
# Deploying script
#
# Add to ~/.ssh/config
# Host infinni-ui-dist
#     HostName github.com
#     User git
#     IdentityFile ~/.ssh/id_rsa_iui-dist
#
# Use from command line
# :> export CURRENT_BRANCH="release-x.x" [required]
# :> export BOT_TOKEN="123456789:AAAABBBBCCCC" [optional]
# :> export CHAT_ID="-123456789" [optional]
# :> bash deploy_prepare.sh
#####################################################################

#####################################################################
# Check current branch
# Branch name should contains "release-"
#####################################################################

step_start "Check current branch"

if [[ $CURRENT_BRANCH != *"release-"* ]]
then
    echo "Current branch is not release branch"
    _exit 0
fi

echo "Detected release branch"

#####################################################################
# Add github.com to known_hosts file
#####################################################################

ssh-keygen -F github.com > /dev/null || ssh -o StrictHostKeyChecking=no github.com

#####################################################################
# Clone package repository
#####################################################################

step_start "Clone package repository"

if [ ! -d "$SOURCE_PATH" ]
then
    echo "${SOURCE_PATH} is not directory"
    _exit 1
fi

if [ -d "$PACKAGE_NAME" ]
then
    rm -rf $PACKAGE_NAME || _exit $?
fi

git clone "${PACKAGE_URL}" "${PACKAGE_NAME}" || _exit $? "Could not clone package repository from ${PACKAGE_URL}"

#####################################################################
# Checkout on release branch
#####################################################################

_pushd $PACKAGE_NAME
git checkout "$CURRENT_BRANCH" || _exit $? "Could not checkout on ${CURRENT_BRANCH}"
_popd

#####################################################################
# Compare versions
#####################################################################

step_start "Compare versions"

_pushd $SOURCE_PATH
source_version=$(get_version)
_popd

_pushd $PACKAGE_NAME
package_version=$(get_version)
_popd

result_of_comparing=$(compare_versions $source_version $package_version)

if [ "$result_of_comparing" = "equal" ]
then
    echo "Update is not required"
    _exit 0
fi

if [ "$result_of_comparing" = "less" ]
then
    _exit 1 "Source version ${source_version} is less the package version ${package_version}"
fi

#####################################################################
# Update package
#####################################################################

step_start "Update package"

_pushd $PACKAGE_NAME

echo "Removing all files except .git folder"

rm -rf `find | grep -v .git`

files_count=`ls | wc -l`

if [ $files_count != "0" ]
then
    _exit 1 "Error while deleting package files"
fi

_popd

echo "Coping files from source path"

cp -rfv $SOURCE_PATH/* $PACKAGE_NAME

#####################################################################
# Deploy
#####################################################################

step_start "Deploy"

_pushd $PACKAGE_NAME

git_prepare
git_push "Release ${source_version}"

_popd

#####################################################################
# Add git tag and push to GitHub
#####################################################################

step_start "Add git tag and push to GitHub"

_pushd $PACKAGE_NAME

git_prepare
git_push_tags $source_version "Release ${source_version}"

_popd

#####################################################################
# Publish to npmjs.com
#####################################################################

step_start "Publish to npmjs.com"

npm whoami 2> /dev/null || _exit $? "Could not get npm account info"
npm publish $PACKAGE_NAME || _exit $? "Could not publish package to npmjs.com"

#####################################################################
# Finish
#####################################################################

step_start "Finish"

echo "Deploying release v${source_version} finished"
telegram "New InfinniUI release"$'\n'"Version: ${source_version}"

step_end
