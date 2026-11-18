$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "FitNutri en http://localhost:8080  (Ctrl+C para parar)"
$mime = @{ ".html" = "text/html"; ".css" = "text/css"; ".js" = "application/javascript"; ".json" = "application/json"; ".svg" = "image/svg+xml"; ".png" = "image/png" }
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $path = $ctx.Request.Url.LocalPath
  if ($path -eq "/") { $path = "/index.html" }
  # Lista dinámica de imágenes de fondos/ y wallpapers/ (JSON para la app)
  if ($path -eq "/fondos/list.json" -or $path -eq "/wallpapers/list.json") {
    $dirName = ($path -split "/")[1]
    $files = Get-ChildItem (Join-Path $root $dirName) -File -ErrorAction SilentlyContinue |
      Where-Object { $_.Extension -match '^\.(jpe?g|png|webp|gif)$' } |
      ForEach-Object { $_.Name }
    $json = "[" + (($files | ForEach-Object { '"' + $_ + '"' }) -join ",") + "]"
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
    $ctx.Response.ContentType = "application/json; charset=utf-8"
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $ctx.Response.Close()
    continue
  }
  $file = Join-Path $root ($path.TrimStart("/") -replace "/", "\")
  if (Test-Path $file -PathType Leaf) {
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $ext = [System.IO.Path]::GetExtension($file)
    $ctx.Response.ContentType = $mime[$ext]
    if (-not $ctx.Response.ContentType) { $ctx.Response.ContentType = "application/octet-stream" }
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $ctx.Response.StatusCode = 404
  }
  $ctx.Response.Close()
}
