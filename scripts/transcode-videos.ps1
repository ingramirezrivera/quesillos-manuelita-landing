param(
  [int]$HeroCrf = 24,
  [int]$ProductCrf = 23,
  [int]$HeroWidth = 1280,
  [int]$ProductWidth = 960
)

$ErrorActionPreference = "Stop"

function Test-Command($name) {
  return [bool](Get-Command $name -ErrorAction SilentlyContinue)
}

if (-not (Test-Command "ffmpeg")) {
  Write-Error "ffmpeg no esta instalado o no esta en PATH. Instala ffmpeg y vuelve a ejecutar este script."
}

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$inputDir = Join-Path $root "src/assets/videos"
$outputDir = Join-Path $root "public/videos"

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

function Convert-Video {
  param(
    [string]$InputFile,
    [string]$OutputBase,
    [int]$Width,
    [int]$Crf
  )

  $inputPath = Join-Path $inputDir $InputFile
  if (-not (Test-Path $inputPath)) {
    Write-Warning "No existe el archivo: $inputPath"
    return
  }

  $outputMp4 = Join-Path $outputDir "$OutputBase.optimized.mp4"
  $outputWebm = Join-Path $outputDir "$OutputBase.optimized.webm"

  Write-Host "Procesando $InputFile ..."

  ffmpeg -y -i $inputPath `
    -vf "scale='min($Width,iw)':-2" `
    -c:v libx264 -preset slow -crf $Crf -movflags +faststart `
    -pix_fmt yuv420p -an $outputMp4

  ffmpeg -y -i $inputPath `
    -vf "scale='min($Width,iw)':-2" `
    -c:v libvpx-vp9 -b:v 0 -crf ($Crf + 6) `
    -row-mt 1 -deadline good -cpu-used 2 -an $outputWebm

  $srcSize = (Get-Item $inputPath).Length
  $mp4Size = (Get-Item $outputMp4).Length
  $webmSize = (Get-Item $outputWebm).Length

  $mp4Pct = [math]::Round((1 - ($mp4Size / [double]$srcSize)) * 100, 1)
  $webmPct = [math]::Round((1 - ($webmSize / [double]$srcSize)) * 100, 1)

  Write-Host "  MP4:  $([math]::Round($mp4Size / 1MB, 2)) MB (ahorro $mp4Pct%)"
  Write-Host "  WEBM: $([math]::Round($webmSize / 1MB, 2)) MB (ahorro $webmPct%)"
}

Convert-Video -InputFile "hero-intro.mp4" -OutputBase "hero-intro" -Width $HeroWidth -Crf $HeroCrf
Convert-Video -InputFile "video-bano-maria.mp4" -OutputBase "video-bano-maria" -Width $ProductWidth -Crf $ProductCrf

Write-Host ""
Write-Host "Listo. Archivos optimizados en: $outputDir"
Write-Host "El frontend ya intenta cargar:"
Write-Host "  /videos/hero-intro.optimized.webm"
Write-Host "  /videos/hero-intro.optimized.mp4"
Write-Host "  /videos/video-bano-maria.optimized.webm"
Write-Host "  /videos/video-bano-maria.optimized.mp4"
