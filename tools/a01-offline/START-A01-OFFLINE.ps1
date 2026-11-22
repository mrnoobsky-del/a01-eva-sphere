$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
& (Join-Path $Root 'SETUP-A01-OFFLINE.ps1')
if (-not $?) { throw 'Local 3D engine setup failed.' }
$Entry = 'eva-sphere-a01-v320-offline-engine.html'
$Port = 8765
$Listener = $null
while ($Port -le 8785 -and $null -eq $Listener) {
    try {
        $Candidate = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
        $Candidate.Start()
        $Listener = $Candidate
    } catch { $Port++ }
}
if ($null -eq $Listener) { throw 'No free local port between 8765 and 8785.' }
$Url = 'http://127.0.0.1:' + $Port + '/' + $Entry
Write-Host ('A-01 local server: ' + $Url) -ForegroundColor Green
Write-Host 'Close this window to stop the local server.'
Start-Process $Url
$Mime = @{
    '.html'='text/html; charset=utf-8'; '.js'='text/javascript; charset=utf-8'; '.mjs'='text/javascript; charset=utf-8';
    '.css'='text/css; charset=utf-8'; '.json'='application/json; charset=utf-8'; '.svg'='image/svg+xml';
    '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.webp'='image/webp'; '.woff2'='font/woff2'
}
try {
    while ($true) {
        $Client = $Listener.AcceptTcpClient()
        try {
            $Stream = $Client.GetStream()
            $Reader = [IO.StreamReader]::new($Stream, [Text.Encoding]::ASCII, $false, 1024, $true)
            $Request = $Reader.ReadLine()
            if (!$Request) { $Client.Close(); continue }
            while ($true) { $HeaderLine = $Reader.ReadLine(); if ($null -eq $HeaderLine -or $HeaderLine -eq '') { break } }
            $Parts = $Request.Split(' ')
            $Method = $Parts[0]
            $Path = [Uri]::UnescapeDataString(([Uri]('http://127.0.0.1' + $Parts[1])).AbsolutePath.TrimStart('/'))
            if ([string]::IsNullOrWhiteSpace($Path)) { $Path = $Entry }
            $File = [IO.Path]::GetFullPath((Join-Path $Root $Path))
            $RootPrefix = [IO.Path]::GetFullPath($Root) + [IO.Path]::DirectorySeparatorChar
            if (!$File.StartsWith($RootPrefix, [StringComparison]::OrdinalIgnoreCase) -and $File -ne [IO.Path]::GetFullPath((Join-Path $Root $Entry))) {
                $Code = 403; $Bytes = [Text.Encoding]::UTF8.GetBytes('Forbidden'); $Type = 'text/plain; charset=utf-8'
            } elseif (!(Test-Path -LiteralPath $File -PathType Leaf)) {
                $Code = 404; $Bytes = [Text.Encoding]::UTF8.GetBytes('Not Found'); $Type = 'text/plain; charset=utf-8'
            } else {
                $Code = 200; $Bytes = [IO.File]::ReadAllBytes($File); $Ext = [IO.Path]::GetExtension($File).ToLowerInvariant()
                $Type = $Mime[$Ext]; if (!$Type) { $Type = 'application/octet-stream' }
            }
            $Status = if ($Code -eq 200) { 'OK' } elseif ($Code -eq 403) { 'Forbidden' } else { 'Not Found' }
            $Header = "HTTP/1.1 $Code $Status`r`nContent-Type: $Type`r`nContent-Length: $($Bytes.Length)`r`nCache-Control: no-store`r`nConnection: close`r`nAccess-Control-Allow-Origin: *`r`n`r`n"
            $HeaderBytes = [Text.Encoding]::ASCII.GetBytes($Header)
            $Stream.Write($HeaderBytes, 0, $HeaderBytes.Length)
            if ($Method -ne 'HEAD' -and $Bytes.Length -gt 0) { $Stream.Write($Bytes, 0, $Bytes.Length) }
            $Stream.Flush()
        } catch { }
        finally { $Client.Close() }
    }
} finally { $Listener.Stop() }
