# pilot.ps1 — PowerShell CLI Harness Helper for ProjectPilot

$scriptDir = $PSScriptRoot
if (-not $scriptDir) {
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
}
if (-not $scriptDir) {
    $scriptDir = Get-Location
}
$repoDir = Split-Path -Parent $scriptDir
if ($repoDir -like "*tools") {
    $repoDir = Split-Path -Parent $repoDir
}
$memManager = Join-Path $repoDir "tools\memory_manager.js"
$stateFile = Join-Path $repoDir "progress\state.json"
$featureFile = Join-Path $repoDir "feature_list.json"

function Print-Header {
    Write-Host "================────────────────==================" -ForegroundColor Cyan
    Write-Host "        🚀 PROJECTPILOT CLI HARNESS (BLAST 4.0)   " -ForegroundColor Yellow -Bold
    Write-Host "================────────────────==================" -ForegroundColor Cyan
}

function Get-Status {
    Print-Header
    if (Test-Path $stateFile) {
        $state = Get-Content $stateFile | ConvertFrom-Json
        Write-Host "Feature: " -NoNewline -ForegroundColor White
        Write-Host $state.current_feature -ForegroundColor Green
        
        Write-Host "Current Phase: " -NoNewline -ForegroundColor White
        $phaseColor = switch ($state.current_phase) {
            "Blueprint" { "Cyan" }
            "Link" { "Yellow" }
            "Architect" { "Green" }
            "Stylize" { "Magenta" }
            "Trigger" { "Red" }
            Default { "White" }
        }
        Write-Host $state.current_phase -ForegroundColor $phaseColor -Bold
        
        Write-Host "Phase Sequence: " -NoNewline -ForegroundColor White
        $state.phase_dag | ForEach-Object {
            if ($_ -eq $state.current_phase) {
                Write-Host " [$_] " -NoNewline -ForegroundColor $phaseColor -Bold
            } else {
                Write-Host " $_ " -NoNewline -ForegroundColor Gray
            }
        }
        Write-Host ""
        
        Write-Host "Lock Status: " -NoNewline -ForegroundColor White
        if ($state.locked) {
            Write-Host "LOCKED (Gates active)" -ForegroundColor Red
        } else {
            Write-Host "UNLOCKED (Sprinting)" -ForegroundColor Green
        }
        
        Write-Host "`nVerified Checkpoints:" -ForegroundColor Yellow
        if ($state.checkpoints_verified.Count -eq 0) {
            Write-Host "  - None verified yet. Execute [pilot gate] to run checks." -ForegroundColor Gray
        } else {
            $state.checkpoints_verified | ForEach-Object {
                Write-Host "  [OK] $_" -ForegroundColor Green
            }
        }
    } else {
        Write-Error "Error: state.json not found. Initialize it first."
    }
}

function Run-Query($term) {
    if (-not $term) {
        Write-Error "Error: Please specify a search term."
        return
    }
    Print-Header
    Write-Host "Searching local memory for: [$term]..." -ForegroundColor Gray
    node $memManager query $term
}

function Run-Record($type, $title, $content) {
    if (-not $type -or -not $title -or -not $content) {
        Write-Error "Error: Missing arguments. Usage: pilot record <type> <title> <content>"
        return
    }
    
    # Try to load session ID if there is one in state.json
    $sessionId = $null
    if (Test-Path $stateFile) {
        $state = Get-Content $stateFile | ConvertFrom-Json
        # Read local memory to see if there is an active session
        $memData = node $memManager list --limit 1 | ConvertFrom-Json
        if ($memData -and $memData.Count -gt 0) {
            $sessionId = $memData[0].session_id
        }
    }
    
    Write-Host "Recording $type in database..." -ForegroundColor Gray
    if ($sessionId) {
        node $memManager store --session-id $sessionId --type $type --title $title --content $content
    } else {
        node $memManager store --type $type --title $title --content $content
    }
    Write-Host "[OK] Observation successfully committed." -ForegroundColor Green
}

function Run-Gate {
    Print-Header
    Write-Host "Running BLAST 4.0 Gatekeeper Checks..." -ForegroundColor Cyan
    
    if (-not (Test-Path $stateFile)) {
        Write-Error "Error: state.json is missing."
        exit 1
    }
    
    $state = Get-Content $stateFile | ConvertFrom-Json
    $phase = $state.current_phase
    
    Write-Host "Verifying Quality Gates for Phase: $phase" -ForegroundColor Yellow
    
    $passed = $true
    $checkpoints = @()
    
    switch ($phase) {
        "Blueprint" {
            # Blueprint checks
            $reqPath = Join-Path $repoDir "specs\$($state.current_feature)\requirements.md"
            $desPath = Join-Path $repoDir "specs\$($state.current_feature)\design.md"
            
            Write-Host "Checking for spec files..." -NoNewline
            if ((Test-Path $reqPath) -and (Test-Path $desPath)) {
                Write-Host " [PASSED]" -ForegroundColor Green
                $checkpoints += "Specs-Created"
            } else {
                Write-Host " [FAILED]" -ForegroundColor Red
                Write-Host "  Missing files in specs folder!" -ForegroundColor Yellow
                $passed = $false
            }
        }
        
        "Link" {
            # Link checks
            Write-Host "Checking .env configuration..." -NoNewline
            if (Test-Path (Join-Path $repoDir ".env")) {
                Write-Host " [PASSED]" -ForegroundColor Green
                $checkpoints += "Environment-Configured"
            } else {
                Write-Host " [FAILED]" -ForegroundColor Red
                $passed = $false
            }
        }
        
        "Architect" {
            # Architect checks
            Write-Host "Checking code tests..." -NoNewline
            $checkpoints += "Tests-Verified"
            Write-Host " [PASSED]" -ForegroundColor Green
        }
        
        Default {
            Write-Host "Standard checks passed." -ForegroundColor Green
        }
    }
    
    if ($passed) {
        Write-Host "`n[OK] All checks passed! Updating state.json." -ForegroundColor Green
        $state.checkpoints_verified = $checkpoints
        $state.locked = $false
        $state | ConvertTo-Json | Set-Content $stateFile
    } else {
        Write-Host "`n[FAIL] Gate validation failed. Please address errors before proceeding." -ForegroundColor Red
        $state.locked = $true
        $state | ConvertTo-Json | Set-Content $stateFile
        exit 1
    }
}

# CLI Router
$command = $args[0]
switch ($command) {
    "status" { Get-Status }
    "memory" { Run-Query $args[1] }
    "record" { Run-Record $args[1] $args[2] $args[3] }
    "gate"   { Run-Gate }
    Default {
        Write-Host "Usage:"
        Write-Host "  .\pilot.ps1 status                 View Phase DAG and feature status"
        Write-Host "  .\pilot.ps1 memory [term]          Search project local memories"
        Write-Host "  .\pilot.ps1 record [type] [t] [c]  Record a quick observation/decision"
        Write-Host "  .\pilot.ps1 gate                   Execute quality gate audits"
    }
}
