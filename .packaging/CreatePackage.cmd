::@powershell -NoProfile -ExecutionPolicy Bypass -Command "& '%~dp0\build.ps1' %*"
pushd ..
call bower install
call grunt build
popd