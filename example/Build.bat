

SET InfinniUIPath=..
SET LauncherPath=example.

pushd %InfinniUIPath%
call grunt build:{override\:{less\:{'pl-override-platform-variables-path'\:'\"%InfinniUIPath%/../%LauncherPath%/styles/platform-variables.less\"','pl-override-bootstrap-variables-path'\:'\"%InfinniUIPath%/../%LauncherPath%/styles/bootstrap-variables.less\"','pl-bootstrap-theme-path'\:'\"%InfinniUIPath%/../%LauncherPath%/styles/bootstrap-theme.less\"','pl-extension-path'\:'\"%InfinniUIPath%/../%LauncherPath%/styles/extensions.less\"'}}}
popd

xcopy %InfinniUIPath%\out\* platform\ /s /y /r

call grunt build
