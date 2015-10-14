::Check versions
IF [%1] == [] (
	echo "Set UI version as parameter!"
	EXIT /B
)

::Set package version in files
powershell -NoProfile -ExecutionPolicy Bypass -Command ".\SetVersion.ps1 %1"

pushd ..
::Clear build artifacts
rd /S /Q out\

::Build project
call bower install
call grunt build
popd

::Create packages
nuget Pack UI.nuspec