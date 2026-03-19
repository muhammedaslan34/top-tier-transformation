# Docker Hub Push Script for Top Tier Transformation (PowerShell)
# Usage: .\dockerhub-push.ps1 -Username <dockerhub-username> [-Version <version>]
# Example: .\dockerhub-push.ps1 -Username myusername -Version v1.0.0

param(
    [Parameter(Mandatory=$true)]
    [string]$Username,

    [Parameter(Mandatory=$false)]
    [string]$Version = "latest"
)

# Error handling
$ErrorActionPreference = "Stop"

# Configuration
$ImageName = "top-tier-transformation"
$FullImageName = "$Username/$ImageName"

# Color output functions
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

# Check if Docker is installed
Write-ColorOutput Yellow "========================================"
Write-ColorOutput Yellow "Docker Hub Push Script"
Write-ColorOutput Yellow "========================================"
Write-Output ""

try {
    $null = docker --version
    Write-ColorOutput Green "✓ Docker is installed"
} catch {
    Write-ColorOutput Red "Error: Docker is not installed or not in PATH"
    exit 1
}

Write-Output ""
Write-Output "Docker Hub Username: $Username"
Write-Output "Image Name: $ImageName"
Write-Output "Version: $Version"
Write-Output ""

# Check Docker login status
Write-ColorOutput Yellow "Checking Docker Hub login status..."
try {
    $dockerInfo = docker info 2>&1 | Out-String
    if ($dockerInfo -notmatch "Username: $Username") {
        Write-ColorOutput Yellow "Not logged in. Please login to Docker Hub:"
        docker login -u $Username
        if ($LASTEXITCODE -ne 0) {
            Write-ColorOutput Red "Docker Hub login failed"
            exit 1
        }
    }
    Write-ColorOutput Green "✓ Docker Hub login verified"
    Write-Output ""
} catch {
    Write-ColorOutput Red "Error checking Docker login status"
    exit 1
}

# Build the Docker image
Write-ColorOutput Yellow "Building Docker image..."
try {
    docker build -t "${FullImageName}:${Version}" .
    if ($LASTEXITCODE -ne 0) {
        throw "Docker build failed"
    }
    Write-ColorOutput Green "✓ Docker image built successfully"
    Write-Output ""
} catch {
    Write-ColorOutput Red "Docker build failed"
    Write-ColorOutput Red $_.Exception.Message
    exit 1
}

# Tag as latest if version is not already "latest"
if ($Version -ne "latest") {
    Write-ColorOutput Yellow "Tagging image as 'latest'..."
    try {
        docker tag "${FullImageName}:${Version}" "${FullImageName}:latest"
        if ($LASTEXITCODE -ne 0) {
            throw "Docker tag failed"
        }
        Write-ColorOutput Green "✓ Image tagged as latest"
        Write-Output ""
    } catch {
        Write-ColorOutput Red "Failed to tag image as latest"
        exit 1
    }
}

# Push version tag
Write-ColorOutput Yellow "Pushing ${FullImageName}:${Version} to Docker Hub..."
try {
    docker push "${FullImageName}:${Version}"
    if ($LASTEXITCODE -ne 0) {
        throw "Docker push failed for version $Version"
    }
    Write-ColorOutput Green "✓ Version $Version pushed successfully"
    Write-Output ""
} catch {
    Write-ColorOutput Red "Docker push failed for version $Version"
    Write-ColorOutput Red $_.Exception.Message
    exit 1
}

# Push latest tag if different from version
if ($Version -ne "latest") {
    Write-ColorOutput Yellow "Pushing ${FullImageName}:latest to Docker Hub..."
    try {
        docker push "${FullImageName}:latest"
        if ($LASTEXITCODE -ne 0) {
            throw "Docker push failed for latest tag"
        }
        Write-ColorOutput Green "✓ Latest tag pushed successfully"
        Write-Output ""
    } catch {
        Write-ColorOutput Red "Docker push failed for latest tag"
        exit 1
    }
}

# Summary
Write-ColorOutput Green "========================================"
Write-ColorOutput Green "Successfully pushed to Docker Hub!"
Write-ColorOutput Green "========================================"
Write-Output ""
Write-Output "Images available at:"
Write-Output "  docker pull ${FullImageName}:${Version}"
if ($Version -ne "latest") {
    Write-Output "  docker pull ${FullImageName}:latest"
}
Write-Output ""
Write-Output "View on Docker Hub:"
Write-Output "  https://hub.docker.com/r/$FullImageName"
Write-Output ""
