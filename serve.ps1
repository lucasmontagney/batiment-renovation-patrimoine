# Mini serveur HTTP statique en PowerShell pur
param([int]$Port = 8765, [string]$Root = $PSScriptRoot)

$mime = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.png'  = 'image/png'
    '.svg'  = 'image/svg+xml'
    '.ico'  = 'image/x-icon'
    '.json' = 'application/json'
    '.mp4'  = 'video/mp4'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()
Write-Host "Serveur demarre sur http://127.0.0.1:$Port/ (root: $Root)"
Write-Host "Ctrl+C pour arreter."

try {
    while ($listener.IsListening) {
        try {
            $ctx = $listener.GetContext()
            $req = $ctx.Request
            $res = $ctx.Response
            $isHead = ($req.HttpMethod -eq 'HEAD')

            $path = [System.Web.HttpUtility]::UrlDecode($req.Url.AbsolutePath)
            if ($path -eq '/' -or $path -eq '') { $path = '/index.html' }
            $file = Join-Path $Root ($path.TrimStart('/'))

            if (Test-Path $file -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($file).ToLower()
                $ct = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
                $info = Get-Item $file
                $res.ContentType = $ct
                $res.ContentLength64 = $info.Length
                $res.StatusCode = 200
                if (-not $isHead) {
                    $bytes = [System.IO.File]::ReadAllBytes($file)
                    $res.OutputStream.Write($bytes, 0, $bytes.Length)
                }
            } else {
                $msg = [System.Text.Encoding]::UTF8.GetBytes("404 - $path introuvable")
                $res.StatusCode = 404
                $res.ContentType = 'text/plain; charset=utf-8'
                $res.ContentLength64 = $msg.Length
                if (-not $isHead) {
                    $res.OutputStream.Write($msg, 0, $msg.Length)
                }
            }
            $res.Close()
            Write-Host "$($req.HttpMethod) $($path) -> $($res.StatusCode)"
        } catch {
            Write-Host "ERR: $($_.Exception.Message)"
            try { $res.Close() } catch {}
        }
    }
} finally {
    $listener.Stop()
}
