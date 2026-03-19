#!/bin/bash
# Docker Hub Push Script for Top Tier Transformation
# Usage: ./dockerhub-push.sh <dockerhub-username> [version]
# Example: ./dockerhub-push.sh myusername v1.0.0

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed${NC}"
    exit 1
fi

# Check arguments
if [ -z "$1" ]; then
    echo -e "${RED}Error: Docker Hub username is required${NC}"
    echo "Usage: $0 <dockerhub-username> [version]"
    echo "Example: $0 myusername v1.0.0"
    exit 1
fi

DOCKER_USERNAME=$1
VERSION=${2:-latest}
IMAGE_NAME="top-tier-transformation"
FULL_IMAGE_NAME="$DOCKER_USERNAME/$IMAGE_NAME"

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}Docker Hub Push Script${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""
echo "Docker Hub Username: $DOCKER_USERNAME"
echo "Image Name: $IMAGE_NAME"
echo "Version: $VERSION"
echo ""

# Check if user is logged in to Docker Hub
echo -e "${YELLOW}Checking Docker Hub login status...${NC}"
if ! docker info | grep -q "Username: $DOCKER_USERNAME"; then
    echo -e "${YELLOW}Not logged in. Please login to Docker Hub:${NC}"
    docker login -u "$DOCKER_USERNAME"
    if [ $? -ne 0 ]; then
        echo -e "${RED}Docker Hub login failed${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✓ Docker Hub login verified${NC}"
echo ""

# Build the Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker build -t "$FULL_IMAGE_NAME:$VERSION" .
if [ $? -ne 0 ]; then
    echo -e "${RED}Docker build failed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker image built successfully${NC}"
echo ""

# Tag as latest if version is not already "latest"
if [ "$VERSION" != "latest" ]; then
    echo -e "${YELLOW}Tagging image as 'latest'...${NC}"
    docker tag "$FULL_IMAGE_NAME:$VERSION" "$FULL_IMAGE_NAME:latest"
    echo -e "${GREEN}✓ Image tagged as latest${NC}"
    echo ""
fi

# Push version tag
echo -e "${YELLOW}Pushing $FULL_IMAGE_NAME:$VERSION to Docker Hub...${NC}"
docker push "$FULL_IMAGE_NAME:$VERSION"
if [ $? -ne 0 ]; then
    echo -e "${RED}Docker push failed for version $VERSION${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Version $VERSION pushed successfully${NC}"
echo ""

# Push latest tag if different from version
if [ "$VERSION" != "latest" ]; then
    echo -e "${YELLOW}Pushing $FULL_IMAGE_NAME:latest to Docker Hub...${NC}"
    docker push "$FULL_IMAGE_NAME:latest"
    if [ $? -ne 0 ]; then
        echo -e "${RED}Docker push failed for latest tag${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Latest tag pushed successfully${NC}"
    echo ""
fi

# Summary
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Successfully pushed to Docker Hub!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Images available at:"
echo "  docker pull $FULL_IMAGE_NAME:$VERSION"
if [ "$VERSION" != "latest" ]; then
    echo "  docker pull $FULL_IMAGE_NAME:latest"
fi
echo ""
echo "View on Docker Hub:"
echo "  https://hub.docker.com/r/$FULL_IMAGE_NAME"
echo ""
