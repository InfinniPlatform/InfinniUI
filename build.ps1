
$BundleName = "ParentCommittee"
$BundleFiles = @("launcher", "out", "extensions", "index.html")

$FileName  = "$(Get-Location)\$(Get-Date -Format "yyyy-MM-dd-HH-mm-ss")-$BundleName-bundle.zip"

$BundleDir="$(Get-Location)\$BundleName-Bundle"

# Создаём пустую папку, в которую будем копировать всё нужное
If (Test-Path $BundleDir) {Remove-Item -Recurse -Force $BundleDir}
New-Item -ItemType directory -Path $BundleDir | Out-Null

# Копируем всё нужное в созданную папку
# Copy-Item -Recurse -Path "$(Get-Location)\build.bat" -Destination $BundleDir
ForEach ($File in $BundleFiles) {
    If (Test-Path -PathType Container -Path "$(Get-Location)\$File" ) {
        Copy-Item -Recurse -Path "$(Get-Location)\$File" -Destination $BundleDir -ErrorAction SilentlyContinue
    } Else {
        Write "Path $(Get-Location)\$File not found, skipping it."
    }
}

# Архивируем и убираем за собой
# If (Test-path $FileName) {Remove-item $FileName}
# Add-Type -assembly "system.io.compression.filesystem"
#[io.compression.zipfile]::CreateFromDirectory($BundleDir, $FileName, "Optimal", $true)
# Remove-Item -Recurse -Force $BundleDir
#Write "Bundle $FileName Created!"

Write "Bundle $BundleDir Created!"