Param ([string]$Version)

$NuspecFilePath = ".\UI.nuspec"
$Stub = "{INFINNI_UI_VERSION}"

(Get-Content ".\Templates\UI.Template.nuspec") | 
Foreach-Object {$_ -replace $Stub, $Version} | 
Set-Content ".\UI.nuspec"

Write-Host "InfinniUI $Version is set."