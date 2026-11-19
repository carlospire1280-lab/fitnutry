$f = Join-Path $PSScriptRoot 'sw.js'
$c = [IO.File]::ReadAllText($f)
$m = [regex]::Match($c, 'fitnutri-v(\d+)')
if ($m.Success) {
  $v = [int]$m.Groups[1].Value + 1
  $c = $c -replace 'fitnutri-v\d+', "fitnutri-v$v"
  [IO.File]::WriteAllText($f, $c)
  Write-Host "Cache subido a fitnutri-v$v"
} else {
  Write-Host "No encontre la version en sw.js"
}
