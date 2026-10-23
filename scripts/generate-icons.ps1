Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "..\public\images\qdelta-favicon-master.png"
if (-not (Test-Path $srcPath)) {
    $srcPath = Join-Path $PSScriptRoot "..\public\images\qdelta-icon.png"
}

$srcImg = [System.Drawing.Image]::FromFile($srcPath)

function Resize-Image($source, $targetPath, $width, $height) {
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
    $destImg = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    $graphics = [System.Drawing.Graphics]::FromImage($destImg)
    $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $graphics.DrawImage($source, $destRect, 0, 0, $source.Width, $source.Height, [System.Drawing.GraphicsUnit]::Pixel)
    $graphics.Dispose()

    $destImg.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destImg.Dispose()
    Write-Host "Generated: $targetPath ($($width)x$($height))"
}

$sizes = @(
    @{ Path = "..\public\images\icon-48.png"; W = 48; H = 48 },
    @{ Path = "..\public\images\icon-96.png"; W = 96; H = 96 },
    @{ Path = "..\public\images\icon-192.png"; W = 192; H = 192 },
    @{ Path = "..\public\images\icon-512.png"; W = 512; H = 512 },
    @{ Path = "..\public\apple-touch-icon.png"; W = 180; H = 180 },
    @{ Path = "..\src\app\icon.png"; W = 192; H = 192 },
    @{ Path = "..\src\app\apple-icon.png"; W = 180; H = 180 }
)

foreach ($s in $sizes) {
    $fullPath = Join-Path $PSScriptRoot $s.Path
    Resize-Image $srcImg $fullPath $s.W $s.H
}

$srcImg.Dispose()

# Copy favicon.ico into src/app as well
$favSrc = Join-Path $PSScriptRoot "..\public\favicon.ico"
$favDest = Join-Path $PSScriptRoot "..\src\app\favicon.ico"
Copy-Item -Path $favSrc -Destination $favDest -Force
Write-Host "Copied favicon.ico to src/app/favicon.ico"
