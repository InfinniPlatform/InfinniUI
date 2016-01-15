

SET InfinniUIPath=..

pushd %InfinniUIPath%
call grunt build:{override\:{less\:{'pl-platform-variables-path'\:'\"../../example/styles/platform-variables\"'}}}
popd

call grunt build
