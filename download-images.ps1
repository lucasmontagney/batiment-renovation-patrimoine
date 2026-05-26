# Telecharge toutes les images du site existant en parallele
$ErrorActionPreference = 'Continue'
$ProgressPreference = 'SilentlyContinue'

$base = "https://batiment-renovation-patrimoine.fr/components/com_eventgallery/helpers/image.php?width=1600"
$outRoot = "$PSScriptRoot\assets\images\realisations"

$downloads = @()

# Buffet d'eau (2 photos)
1..2 | ForEach-Object {
    $n = "{0:D2}" -f $_
    $downloads += @{ url = "$base&folder=buffet_eau&file=Newsletter-$n.jpg"; out = "$outRoot\buffet-eau\$n.jpg" }
}

# Calades de galets (23 photos numerotees + 1 nommee)
1..23 | ForEach-Object {
    $n = "{0:D2}" -f $_
    $downloads += @{ url = "$base&folder=caladesgalets&file=maconnerie-calades-de-galets-$n.jpg"; out = "$outRoot\calades\$n.jpg" }
}
$downloads += @{ url = "$base&folder=caladesgalets&file=Resized_20180913_162745.jpg"; out = "$outRoot\calades\24.jpg" }

# Terrasses & plage piscine (24 photos)
1..24 | ForEach-Object {
    $n = "{0:D2}" -f $_
    $downloads += @{ url = "$base&folder=Terrassepiscine&file=terrasses-plage-piscine-$n.jpg"; out = "$outRoot\terrasses\$n.jpg" }
}

# Salle de bains (8 photos)
1..8 | ForEach-Object {
    $n = "{0:D2}" -f $_
    $downloads += @{ url = "$base&folder=sallebains&file=salle-de-bains-$n.jpg"; out = "$outRoot\salle-de-bains\$n.jpg" }
}

# Maconnerie pierre (8 photos)
1..8 | ForEach-Object {
    $n = "{0:D2}" -f $_
    $downloads += @{ url = "$base&folder=maconneriepierre&file=maconnerie-pierre-$n.jpg"; out = "$outRoot\pierre\$n.jpg" }
}

# Enduits chaux facades (11 photos)
1..11 | ForEach-Object {
    $n = "{0:D2}" -f $_
    $downloads += @{ url = "$base&folder=enduits&file=enduits-chaux-facades-$n.jpg"; out = "$outRoot\enduits\$n.jpg" }
}

# Construction sur elevation (29 max, certaines peuvent manquer)
1..29 | ForEach-Object {
    $n = "{0:D2}" -f $_
    $downloads += @{ url = "$base&folder=Constructionlvation&file=construction-sur-elevation-$n.jpg"; out = "$outRoot\construction-elevation\$n.jpg" }
}

# Restauration (7 max, on essaie 01-07)
1..7 | ForEach-Object {
    $n = "{0:D2}" -f $_
    $downloads += @{ url = "$base&folder=restauration&file=restauration-patrimoine-$n.jpg"; out = "$outRoot\restauration\$n.jpg" }
}

# Logo
$logoOut = "$PSScriptRoot\assets\images\brand\logo-original.png"
try {
    Invoke-WebRequest -Uri "https://batiment-renovation-patrimoine.fr/images/logo-batiment.png" -OutFile $logoOut -UseBasicParsing -TimeoutSec 30
    Write-Host "OK: logo"
} catch {
    Write-Host "FAIL: logo - $($_.Exception.Message)"
}

# Telechargement avec jobs (parallelisme limite a 8)
$jobs = @()
$maxParallel = 8
$succeeded = 0
$failed = 0

foreach ($d in $downloads) {
    while ((Get-Job -State Running).Count -ge $maxParallel) {
        Start-Sleep -Milliseconds 100
    }

    $jobs += Start-Job -ScriptBlock {
        param($url, $out)
        try {
            Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -TimeoutSec 30
            # Verifier que le fichier n'est pas une page d'erreur HTML (taille trop petite)
            if ((Get-Item $out).Length -lt 1024) {
                Remove-Item $out -Force
                return "SKIP: $out (file too small)"
            }
            return "OK: $out"
        } catch {
            if (Test-Path $out) { Remove-Item $out -Force }
            return "FAIL: $out - $($_.Exception.Message)"
        }
    } -ArgumentList $d.url, $d.out
}

# Attendre la fin de tous les jobs
Write-Host "Attente de la fin des telechargements..."
$jobs | Wait-Job | Out-Null

foreach ($j in $jobs) {
    $result = Receive-Job -Job $j
    if ($result -like "OK:*") { $succeeded++ }
    else { $failed++; Write-Host $result }
    Remove-Job -Job $j
}

Write-Host ""
Write-Host "Termine: $succeeded reussis, $failed echoues sur $($downloads.Count) tentatives"
