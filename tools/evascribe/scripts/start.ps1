$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot
$VenvPython = Join-Path $ProjectRoot ".venv\Scripts\python.exe"
if (-not (Test-Path $VenvPython)) {
    throw "EvaScribe ещё не установлен. Сначала запустите scripts\\install-and-start.ps1."
}
Write-Host "Откройте http://127.0.0.1:8765 после запуска сервера." -ForegroundColor Green
& $VenvPython -m uvicorn app.main:app --host 127.0.0.1 --port 8765
