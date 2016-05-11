param (
    [string]$UserName,
    [string]$UserPassword,
    [string]$BuildNumber,
    [string]$ReleaseNumber
)

if (!$UserName)         {throw "Invalid UserName"}
if (!$UserPassword)     {throw "Invalid UserPassword"}
if (!$BuildNumber)      {throw "Invalid BuildNumber"}
if (!$ReleaseNumber)    {throw "Invalid ReleaseNumber"}

$InfinniUI = "InfinniUI"
$TS_URL = "http://teamcity/httpAuth/app/rest/builds/project:" + $InfinniUI + ",number:" + $BuildNumber + ",branch:" + $ReleaseNumber + "/artifacts/children/"

$secpasswd = ConvertTo-SecureString $UserPassword -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential ($UserName, $secpasswd)
$data = Invoke-RestMethod -Uri $TS_URL -Credential $cred
$downloadLink = "http://teamcity" + $data.files.file.content.href
$InfinniUI_ZIP = $data.files.file.name

Invoke-WebRequest $downloadLink -Credential $cred -OutFile $InfinniUI_ZIP