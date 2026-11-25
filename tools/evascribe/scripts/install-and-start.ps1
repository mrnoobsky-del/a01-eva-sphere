$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

Write-Host "EvaScribe — установка локальной среды" -ForegroundColor Green
$PythonLauncher = Get-Command py -ErrorAction SilentlyContinue
if (-not $PythonLauncher) {
    throw "Не найден Python Launcher. Установите Python 3.11 x64 с python.org и включите Python Launcher."
}

& py -3.11 --version | Out-Null
if ($LASTEXITCODE -ne 0) {
    throw "Требуется Python 3.11 x64. Установите его с https://www.python.org/downloads/windows/"
}

if (-not (Test-Path ".venv\Scripts\python.exe")) {
    & py -3.11 -m venv .venv
}
$VenvPython = Join-Path $ProjectRoot ".venv\Scripts\python.exe"
& $VenvPython -m pip install --upgrade pip
& $VenvPython -m pip install -r requirements.txt

if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Создан .env с настройками по умолчанию." -ForegroundColor DarkGray
}

Write-Host "EvaScribe запускается локально. После сообщения Uvicorn откройте http://127.0.0.1:8765" -ForegroundColor Green
& $VenvPython -m uvicorn app.main:app --host 127.0.0.1 --port 8765
