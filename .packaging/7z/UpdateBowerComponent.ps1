param (
    [string]$BuildNumber,
    [string]$ReleaseNumber,
    [string]$ComponentPath
)

Add-Type -AssemblyName System.IO.Compression.FileSystem

if (!$BuildNumber)      {throw "Invalid BuildNumber"}
if (!$ReleaseNumber)    {throw "Invalid ReleaseNumber"}

$cred = Get-Credential -Message "Input your Teamcity username and password"

if(!$ComponentPath) 
{
    $ComponentPath = "C:\Projects\InfinniUI-dist\"
}

if($ComponentPath.Substring($ComponentPath.Length - 1) -ne "\")
{
    $ComponentPath = $ComponentPath + "\"
}

$InfinniUI = "InfinniUI"
$TS_URL = "http://teamcity/httpAuth/app/rest/builds/project:" + $InfinniUI + ",number:" + $BuildNumber + ",branch:" + $ReleaseNumber + "/artifacts/children/"

$data = Invoke-RestMethod -Uri $TS_URL -Credential $cred

foreach ($file in $data.files.file) 
{
    if($file.name.IndexOf($InfinniUI) -ne -1)
    {
        $InfinniUI_File = $file
    }
}

$downloadLink = "http://teamcity" + $InfinniUI_File.content.href
$InfinniUI_ZIP = $InfinniUI_File.name

Invoke-WebRequest $downloadLink -Credential $cred -OutFile $InfinniUI_ZIP
Remove-Item ($ComponentPath + "*") -Include "*" -Exclude (".git", "LICENSE", "bower.json") -Recurse -Force
[System.IO.Compression.ZipFile]::ExtractToDirectory($InfinniUI_ZIP, $ComponentPath)
Remove-Item $InfinniUI_ZIP