

SET InfinniUIPath=..

pushd %InfinniUIPath%
call grunt build:{override\:{less\:{'pl-platform-variables-path'\:'\"%InfinniUIPath%/../example/styles/platform-variables\"'}}}
popd

xcopy %InfinniUIPath%\out\* platform\ /s /y /r

call grunt build
