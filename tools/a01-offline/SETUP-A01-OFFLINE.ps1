$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Repo = 'https://raw.githubusercontent.com/mrnoobsky-del/a01-eva-sphere/fix/mainline-v320-offline-engine/'

function Get-LocalAsset([string]$RelativePath, [string]$RepoPath, [int]$MinBytes, [string]$Marker) {
    $Target = Join-Path $Root $RelativePath
    $Folder = Split-Path -Parent $Target
    if (!(Test-Path $Folder)) { New-Item -ItemType Directory -Path $Folder -Force | Out-Null }
    if (Test-Path $Target) {
        $Info = Get-Item $Target
        if ($Info.Length -ge $MinBytes) {
            $Sample = [IO.File]::ReadAllText($Target)
            if ($Sample.Contains($Marker)) {
                Write-Host ('[OK] ' + $RelativePath + ' already present')
                return $Target
            }
        }
    }
    $Temp = $Target + '.download'
    Write-Host ('[GET] ' + $RelativePath)
    Invoke-WebRequest -Uri ($Repo + $RepoPath) -OutFile $Temp -UseBasicParsing -TimeoutSec 90
    $Downloaded = Get-Item $Temp
    if ($Downloaded.Length -lt $MinBytes) { Remove-Item $Temp -Force; throw ('Downloaded file is too small: ' + $RelativePath) }
    $Content = [IO.File]::ReadAllText($Temp)
    if (!$Content.Contains($Marker)) { Remove-Item $Temp -Force; throw ('Unexpected content in: ' + $RelativePath) }
    Move-Item $Temp $Target -Force
    Write-Host ('[SAVED] ' + $RelativePath + ' (' + $Downloaded.Length + ' bytes)')
    return $Target
}

$null = Get-LocalAsset 'vendor/three/build/three.module.js' 'vendor/three/build/three.module.js' 100000 'three.core.js'
$null = Get-LocalAsset 'vendor/three/examples/jsm/controls/OrbitControls.js' 'vendor/three/examples/jsm/controls/OrbitControls.js' 10000 'class OrbitControls'
$null = Get-LocalAsset 'vendor/three/LICENSE.txt' 'vendor/three/LICENSE.txt' 500 'The MIT License'

$Core = Join-Path $Root 'vendor/three/build/three.core.js'
$CoreValid = $false
if (Test-Path $Core) {
    $CoreText = [IO.File]::ReadAllText($Core)
    $CoreValid = $CoreText.Contains("const REVISION = '185'")
}
if (!$CoreValid) {
    $Part1 = Get-LocalAsset 'vendor/three/bootstrap/three.core.part1.js' 'vendor/three/bootstrap/three.core.part1.js' 100000 'const REVISION'
    $Part2 = Get-LocalAsset 'vendor/three/bootstrap/three.core.part2.js' 'vendor/three/bootstrap/three.core.part2.js' 100000 'export'
    $Bytes1 = [IO.File]::ReadAllBytes($Part1)
    $Bytes2 = [IO.File]::ReadAllBytes($Part2)
    $Combined = New-Object byte[] ($Bytes1.Length + $Bytes2.Length)
    [Buffer]::BlockCopy($Bytes1, 0, $Combined, 0, $Bytes1.Length)
    [Buffer]::BlockCopy($Bytes2, 0, $Combined, $Bytes1.Length, $Bytes2.Length)
    [IO.File]::WriteAllBytes($Core, $Combined)
    $Check = [IO.File]::ReadAllText($Core)
    if (!$Check.Contains("const REVISION = '185'") -or !$Check.Contains('export')) { throw 'Assembled three.core.js did not pass validation.' }
    Write-Host ('[SAVED] vendor/three/build/three.core.js (' + $Combined.Length + ' bytes)')
} else {
    Write-Host '[OK] vendor/three/build/three.core.js already present'
}
Write-Host ''
Write-Host 'Three.js r185 is installed locally. The 3D runtime no longer contacts a CDN.' -ForegroundColor Green
