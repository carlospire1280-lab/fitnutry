# ============================================================
#  FitNutri — Regenera fondos/list.json y wallpapers/list.json
#  Ejecutar con doble clic cada vez que agregues o quites fotos.
#  Sirve para subir la app a un hosting estatico (Netlify, GitHub Pages, etc.)
# ============================================================
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$enc = New-Object System.Text.UTF8Encoding($false)
foreach ($dirName in @("fondos", "wallpapers")) {
  $dir = Join-Path $root $dirName
  $files = Get-ChildItem $dir -File -ErrorAction SilentlyContinue |
    Where-Object { $_.Extension -match '^\.(jpe?g|png|webp|gif)$' } |
    ForEach-Object { $_.Name }
  $items = $files | ForEach-Object {
    '"' + ($_ -replace '\\', '\\' -replace '"', '\"') + '"'
  }
  $json = "[`n  " + ($items -join ",`n  ") + "`n]`n"
  [System.IO.File]::WriteAllText((Join-Path $dir "list.json"), $json, $enc)
  Write-Host "$dirName : $($files.Count) imagen(es)"
}
Write-Host "Listo. Ya puedes subir la carpeta a tu hosting."
pause
