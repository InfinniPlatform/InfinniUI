Param ([string]$Version)

$NuspecFilePath = ".\UI.nuspec"
$Stub = "{INFINNI_UI_VERSION}"

(Get-Content $NuspecFilePath) | 
Foreach-Object {$_ -replace $Stub, $Version} | 
Set-Content $NuspecFilePath

Write-Host "InfinniUI $Version is set."