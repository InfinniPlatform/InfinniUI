

SET InfinniUIPath=..

pushd %InfinniUIPath%
call grunt build:{override\:{less\:{'pl-override-platform-variables-path'\:'\"%InfinniUIPath%/../example/styles/platform-variables.less\"','pl-override-bootstrap-variables-path'\:'\"%InfinniUIPath%/../example/styles/bootstrap-variables.less\"','pl-bootstrap-theme-path'\:'\"%InfinniUIPath%/../example/styles/bootstrap-theme.less\"','pl-extension-path'\:'\"%InfinniUIPath%/../example/styles/extensions.less\"'}}}
popd

xcopy %InfinniUIPath%\out\* platform\ /s /y /r

call grunt build
