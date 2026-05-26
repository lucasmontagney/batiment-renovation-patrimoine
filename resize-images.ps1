# Redimensionne toutes les images JPG du dossier oeuvres
# Max 1600px de large, qualite JPEG 82
Add-Type -AssemblyName System.Drawing

$root = Join-Path $PSScriptRoot "assets\images\oeuvres"
$maxWidth = 1600
$quality = 82L

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)

$total = 0
$reduced = 0
$totalBefore = 0L
$totalAfter = 0L

Get-ChildItem $root -Recurse -Filter "*.jpg" | ForEach-Object {
    $total++
    $file = $_.FullName
    $sizeBefore = $_.Length
    $totalBefore += $sizeBefore

    try {
        $img = [System.Drawing.Image]::FromFile($file)
        $w = $img.Width
        $h = $img.Height

        if ($w -gt $maxWidth) {
            $ratio = $maxWidth / $w
            $newW = $maxWidth
            $newH = [int]($h * $ratio)

            $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $g.DrawImage($img, 0, 0, $newW, $newH)
            $img.Dispose()
            $g.Dispose()

            # Sauvegarde temporaire puis remplace
            $tempPath = "$file.tmp"
            $bmp.Save($tempPath, $encoder, $encoderParams)
            $bmp.Dispose()
            Move-Item -Path $tempPath -Destination $file -Force
            $reduced++
        } else {
            # Recompresser uniquement (qualite 82) sans changer la taille
            $bmp = New-Object System.Drawing.Bitmap($img)
            $img.Dispose()
            $tempPath = "$file.tmp"
            $bmp.Save($tempPath, $encoder, $encoderParams)
            $bmp.Dispose()
            Move-Item -Path $tempPath -Destination $file -Force
        }

        $newSize = (Get-Item $file).Length
        $totalAfter += $newSize
        $pct = [math]::Round((1 - $newSize / $sizeBefore) * 100, 0)
        Write-Host ("{0,-50} {1,8:N0}->{2,8:N0} ({3}%)" -f $_.Name, $sizeBefore, $newSize, "-$pct")
    } catch {
        Write-Host "FAIL : $($_.Name) - $($_.Exception.Message)"
        $totalAfter += $sizeBefore
    }
}

$reductionPct = [math]::Round((1 - $totalAfter / $totalBefore) * 100, 1)
Write-Host ""
Write-Host "Termine. $reduced/$total fichiers redimensionnes."
Write-Host ("Total avant : {0:N0} octets ({1:N1} Mo)" -f $totalBefore, ($totalBefore / 1MB))
Write-Host ("Total apres : {0:N0} octets ({1:N1} Mo)" -f $totalAfter, ($totalAfter / 1MB))
Write-Host ("Reduction   : $reductionPct %")
