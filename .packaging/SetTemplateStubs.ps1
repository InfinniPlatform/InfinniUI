Param ([string]$Version)
$Hash=git rev-parse HEAD

$NuspecFilePath = ".\UI.nuspec"
$VersionStub = "{INFINNI_UI_VERSION}"
$HashStub = "{COMMIT_HASH}"

(Get-Content ".\Templates\UI.Template.nuspec") | 
Foreach-Object {$_ -replace $VersionStub, $Version} |
Foreach-Object {$_ -replace $HashStub, $Hash} |
Set-Content ".\UI.nuspec"

Write-Host "InfinniUI version ($Version) is set."
Write-Host "InfinniUI commit hash ($Hash) is set."