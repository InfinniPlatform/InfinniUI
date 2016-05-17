param 
(
    [ValidateSet('Teamcity', 'Manual')]
    [string]$Type,
    [string]$ReleaseNumber,
    [string]$BuildNumber,
    [string]$ComponentPath,
    [string]$ArchivePath
)

$DEFAULT_ComponentPath = "C:\Projects\InfinniUI-dist\"
$DEFAULT_TeamcityUrl = "http://tc.infinnity.local"
$DEFAULT_Type = "Teamcity"

Add-Type -AssemblyName System.IO.Compression.FileSystem

if(!$ComponentPath) 
{
    $ComponentPath = $DEFAULT_ComponentPath
}

if(!$Type)
{
    $Type = $DEFAULT_Type
}

if($ComponentPath.Substring($ComponentPath.Length - 1) -ne "\")
{
    $ComponentPath = $ComponentPath + "\"
}

if(!(Test-Path $ComponentPath))
{
    throw $ComponentPath + " Not found"
}

if($Type -eq "Teamcity")
{
    if(!$ReleaseNumber) 
    {
        throw "Invalid ReleaseNumber"
    }
    
    $cred = Get-Credential -Message "Input your Teamcity username and password"
    
    if(!$cred)
    {
        throw "Invalid Credential"
    }
    
    $InfinniUI = "InfinniUI"
    $TS_URL = $DEFAULT_TeamcityUrl + "/httpAuth/app/rest/builds/project:" + $InfinniUI + ",branch:" + $ReleaseNumber
    
    if($BuildNumber)
    {
        $TS_URL = $TS_URL + ",number:" + $BuildNumber
    }
    
    $TS_URL = $TS_URL + "/artifacts/children/"

    $data = Invoke-RestMethod -Uri $TS_URL -Credential $cred
    
    if(!$data)
    {
        throw "Invalid username or password"
    }

    foreach ($file in $data.files.file) 
    {
        if($file.name.IndexOf($InfinniUI) -ne -1)
        {
            $InfinniUI_File = $file
        }
    }

    $downloadLink = $DEFAULT_TeamcityUrl + $InfinniUI_File.content.href
    $InfinniUI_ZIP = $InfinniUI_File.name
    
    Write-Host "Starting download" $InfinniUI_ZIP
    
    Invoke-WebRequest $downloadLink -Credential $cred -OutFile $InfinniUI_ZIP
    Remove-Item ($ComponentPath + "*") -Include "*" -Exclude (".git", "LICENSE", "bower.json") -Recurse -Force
    
    Write-Host "Starting update"
    
    [System.IO.Compression.ZipFile]::ExtractToDirectory($InfinniUI_ZIP, $ComponentPath)
    Remove-Item $InfinniUI_ZIP
    
    Write-Host "Success"
}

if($Type -eq "Manual")
{
    if(!$ArchivePath)
    {
        throw "Invalid ArchivePath"
    }
    
    if(!(Test-Path $ArchivePath))
    {
        throw $ArchivePath + " Not found"
    }
    
    Remove-Item ($ComponentPath + "*") -Include "*" -Exclude (".git", "LICENSE", "bower.json") -Recurse -Force
    
    Write-Host "Starting update"
    
    [System.IO.Compression.ZipFile]::ExtractToDirectory($ArchivePath, $ComponentPath)
    
    Write-Host "Success"
}