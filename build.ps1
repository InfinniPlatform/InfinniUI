
# Название будущего архива (папки)
$BundleName = "ParentCommittee"
# Список файлов, которые будем копировать в архив (папку)
$BundleFiles = @("launcher", "out", "extensions", "index.html", "app")


$FileName  = "$(Get-Location)\$(Get-Date -Format "yyyy-MM-dd-HH-mm-ss")-$BundleName-bundle.zip"

$BundleDir="$(Get-Location)\$BundleName-Bundle"

# Создаём пустую папку, в которую будем копировать всё нужное
If (Test-Path $BundleDir) {Remove-Item -Recurse -Force $BundleDir}
New-Item -ItemType directory -Path $BundleDir | Out-Null

# Копируем всё нужное в созданную папку

ForEach ($File in $BundleFiles) {
    If (Test-Path -Path "$(Get-Location)\$File" ) {
        Copy-Item -Recurse -Path "$(Get-Location)\$File" -Destination $BundleDir -ErrorAction SilentlyContinue
    } Else {
        Write "Path $(Get-Location)\$File not found, skipping it."
    }
}
 
# Архивируем и убираем за собой
$7ZPath = "$($env:ProgramFiles)\7-Zip\7z.exe"
If (Test-Path -PathType Leaf -Path "$7ZPath" ) {
    Write "7-Zip found, using it."
    $Arguments = @("a", "-tzip", "$FileName", "$BundleDir", "-r")
    If (Test-path $FileName) {Remove-item $FileName}
    & $7ZPath $Arguments | Out-Null
    Write "Bundle $FileName Created!"
    Remove-Item -Recurse -Force $BundleDir
} ElseIf (Get-ChildItem 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP' -recurse | Get-ItemProperty -name Version -EA 0 | Where { $_.PSChildName -match '^(?!S)\p{L}'} | Where {$_.Version -ge '4.5' } ) {
# .Net Framework версии 4.5 и выше имеет встроенные механизмы сжатия. Если 7-Zip найти не удалось, используем их.
    Write "7-Zip not found, using native .Net 4.5 and above compression modules."
    If (Test-path "$FileName") {Remove-item "$FileName.zip"}
    Add-Type -assembly "system.io.compression.filesystem"
    [io.compression.zipfile]::CreateFromDirectory($BundleDir, "$FileName", "Optimal", $true)
    Remove-Item -Recurse -Force $BundleDir
    Write "Bundle $FileName Created!"
} else {
    Write "Archiver not found, so leaving $BundleDir unarchived."
    Write "Bundle directory $BundleDir created!"
}