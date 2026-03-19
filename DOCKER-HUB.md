# Docker Hub Guide

Complete guide for pushing and deploying the Top Tier Transformation application to/from Docker Hub.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Docker Hub Setup](#docker-hub-setup)
3. [Manual Push](#manual-push)
4. [Automated Push with Scripts](#automated-push-with-scripts)
5. [CI/CD with GitHub Actions](#cicd-with-github-actions)
6. [Pulling and Deploying](#pulling-and-deploying)
7. [Versioning Strategy](#versioning-strategy)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Tools

- Docker Engine 20.10 or higher
- Git (for version tagging)
- Docker Hub account

### Create Docker Hub Account

1. Visit [Docker Hub](https://hub.docker.com)
2. Click **Sign Up** and create an account
3. Verify your email address
4. (Recommended) Enable two-factor authentication in account settings

### Create Access Token

**Important:** Use access tokens instead of passwords for security.

1. Log in to [Docker Hub](https://hub.docker.com)
2. Click your username → **Account Settings**
3. Go to **Security** → **Access Tokens**
4. Click **New Access Token**
5. Name: `github-actions` (or your preferred name)
6. Permissions: **Read, Write, Delete**
7. Click **Generate** and **copy the token immediately**
8. Save it securely (you won't see it again)

### Create Docker Hub Repository

1. Log in to Docker Hub
2. Click **Create Repository**
3. Repository name: `top-tier-transformation`
4. Visibility: Choose **Public** or **Private**
5. Click **Create**

Your repository will be at: `https://hub.docker.com/r/YOUR_USERNAME/top-tier-transformation`

## Manual Push

### Step-by-Step Guide

#### 1. Login to Docker Hub

```bash
docker login -u YOUR_USERNAME
```

Enter your Docker Hub password or access token when prompted.

#### 2. Build the Docker Image

```bash
docker build -t YOUR_USERNAME/top-tier-transformation:v1.0.0 .
```

Replace `YOUR_USERNAME` with your Docker Hub username and `v1.0.0` with your desired version.

#### 3. Tag as Latest (Optional)

```bash
docker tag YOUR_USERNAME/top-tier-transformation:v1.0.0 YOUR_USERNAME/top-tier-transformation:latest
```

#### 4. Push to Docker Hub

```bash
# Push specific version
docker push YOUR_USERNAME/top-tier-transformation:v1.0.0

# Push latest tag
docker push YOUR_USERNAME/top-tier-transformation:latest
```

#### 5. Verify on Docker Hub

Visit `https://hub.docker.com/r/YOUR_USERNAME/top-tier-transformation` to see your image.

## Automated Push with Scripts

We provide scripts for both Linux/Mac and Windows to automate the build and push process.

### Linux / Mac / WSL

#### Make Script Executable

```bash
chmod +x dockerhub-push.sh
```

#### Run the Script

```bash
# Push with specific version
./dockerhub-push.sh YOUR_USERNAME v1.0.0

# Push as latest only
./dockerhub-push.sh YOUR_USERNAME latest
```

The script will:
- ✓ Check if Docker is installed
- ✓ Verify Docker Hub login (prompt if needed)
- ✓ Build the Docker image
- ✓ Tag with version and latest
- ✓ Push both tags to Docker Hub
- ✓ Display pull commands and Docker Hub URL

### Windows PowerShell

#### Run the Script

```powershell
# Push with specific version
.\dockerhub-push.ps1 -Username YOUR_USERNAME -Version v1.0.0

# Push as latest only
.\dockerhub-push.ps1 -Username YOUR_USERNAME
```

The PowerShell script provides the same functionality as the bash script with colored output.

## CI/CD with GitHub Actions

Automatically build and push Docker images when you create version tags.

### Setup GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

Add these two secrets:

**DOCKERHUB_USERNAME**
- Value: Your Docker Hub username

**DOCKERHUB_TOKEN**
- Value: Your Docker Hub access token (from Prerequisites step)

### Workflow Configuration

The workflow is already configured in [`.github/workflows/docker-publish.yml`](.github/workflows/docker-publish.yml).

It will automatically:
- Trigger on version tags (v1.0.0, v2.1.3, etc.)
- Build the Docker image
- Push to Docker Hub with version tag and latest
- Use build caching for faster builds

### Trigger Automated Build

#### Create and Push a Version Tag

```bash
# Create a version tag
git tag v1.0.0

# Push the tag to GitHub
git push origin v1.0.0
```

#### Watch the Build

1. Go to your GitHub repository
2. Click **Actions** tab
3. See the "Build and Push Docker Image" workflow running
4. Click on the workflow to see detailed logs

#### Verify Success

After the workflow completes:
- Check the Actions summary for pull commands
- Visit your Docker Hub repository to see the new tags

### Manual Workflow Trigger

You can also trigger the workflow manually from GitHub:

1. Go to **Actions** tab
2. Select "Build and Push Docker Image"
3. Click **Run workflow**
4. Select branch and click **Run**

## Pulling and Deploying

### Pull the Image

```bash
# Pull latest version
docker pull YOUR_USERNAME/top-tier-transformation:latest

# Pull specific version
docker pull YOUR_USERNAME/top-tier-transformation:v1.0.0
```

### Run Standalone Container

```bash
docker run -d \
  --name toptier-app \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  -e RESEND_API_KEY="your_api_key" \
  -e ADMIN_PASSWORD_HASH="your_hash" \
  -e ADMIN_SESSION_SECRET="your_secret" \
  YOUR_USERNAME/top-tier-transformation:latest
```

### Deploy with Docker Compose

Update your `docker-compose.yml` to use the Docker Hub image:

```yaml
services:
  app:
    image: YOUR_USERNAME/top-tier-transformation:latest
    # Remove the 'build:' section
    ports:
      - "3000:3000"
    environment:
      # ... your environment variables
```

Then run:

```bash
docker-compose pull
docker-compose up -d
```

### Deploy to Cloud Platforms

#### AWS ECS

```bash
# Create task definition using your Docker Hub image
aws ecs register-task-definition \
  --family toptier-app \
  --container-definitions '[{
    "name": "app",
    "image": "YOUR_USERNAME/top-tier-transformation:latest",
    "portMappings": [{"containerPort": 3000}]
  }]'
```

#### Google Cloud Run

```bash
gcloud run deploy toptier-app \
  --image YOUR_USERNAME/top-tier-transformation:latest \
  --platform managed \
  --port 3000 \
  --allow-unauthenticated
```

#### Azure Container Instances

```bash
az container create \
  --resource-group myResourceGroup \
  --name toptier-app \
  --image YOUR_USERNAME/top-tier-transformation:latest \
  --ip-address public \
  --ports 3000
```

#### DigitalOcean App Platform

1. Create new app
2. Select "Docker Hub"
3. Enter image: `YOUR_USERNAME/top-tier-transformation:latest`
4. Configure environment variables
5. Deploy

## Versioning Strategy

### Semantic Versioning (Recommended)

Use semantic versioning for production releases:

- `v1.0.0` - Major version (breaking changes)
- `v1.1.0` - Minor version (new features)
- `v1.1.1` - Patch version (bug fixes)

### Tag Types

- `latest` - Most recent stable version (auto-updated)
- `v1.0.0` - Specific semantic version
- `v1.0.0-beta` - Pre-release versions (optional)
- `dev` - Development builds (manual only)

### Version Workflow

```bash
# Development
git checkout -b feature/new-feature
# ... make changes ...
git commit -am "Add new feature"

# When ready for release
git checkout main
git merge feature/new-feature
git tag v1.1.0
git push origin main
git push origin v1.1.0
```

The GitHub Actions workflow will automatically build and push `v1.1.0` and update `latest`.

## Troubleshooting

### Login Issues

**Problem:** `unauthorized: incorrect username or password`

**Solutions:**
```bash
# Use access token instead of password
docker logout
docker login -u YOUR_USERNAME
# When prompted, paste your access token, not password

# Or use stdin for automation
echo "YOUR_ACCESS_TOKEN" | docker login -u YOUR_USERNAME --password-stdin
```

### Build Failures

**Problem:** Build fails during `npm install` or `npm run build`

**Solutions:**
```bash
# Clear Docker cache and rebuild
docker builder prune
docker build --no-cache -t YOUR_USERNAME/top-tier-transformation:latest .

# Check if package-lock.json is present
ls -la package-lock.json

# Verify Node.js version in Dockerfile matches your local version
node --version
```

### Push Failures

**Problem:** `denied: requested access to the resource is denied`

**Solutions:**
- Verify repository exists on Docker Hub
- Check repository name matches exactly (case-sensitive)
- Ensure you're logged in to the correct account
- Verify access token has write permissions

### Image Size Too Large

**Problem:** Image is over 1GB

**Solutions:**
```bash
# Check image size
docker images | grep top-tier-transformation

# The Dockerfile already uses multi-stage builds
# Verify .dockerignore is excluding unnecessary files
cat .dockerignore

# Remove unused dependencies from package.json
```

### GitHub Actions Fails

**Problem:** Workflow fails with authentication error

**Solutions:**
1. Verify secrets are set correctly:
   - Go to Settings → Secrets → Actions
   - Check `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` exist
2. Regenerate Docker Hub access token if needed
3. Update the secret in GitHub
4. Re-run the workflow

**Problem:** Workflow doesn't trigger

**Solutions:**
```bash
# Ensure tag follows semantic versioning
git tag v1.0.0  # ✓ Correct
git tag 1.0.0   # ✗ Wrong (missing 'v' prefix)

# Check tag was pushed
git ls-remote --tags origin

# Manually trigger workflow
# Go to Actions → Build and Push Docker Image → Run workflow
```

## Security Best Practices

1. **Use Access Tokens**
   - Never use your password in scripts or CI/CD
   - Rotate tokens periodically
   - Use minimum required permissions

2. **Private Repositories**
   - Consider private repositories for production images
   - Docker Hub free tier includes 1 private repo

3. **Image Scanning**
   - Enable Docker Hub vulnerability scanning
   - Review security recommendations regularly

4. **Secrets Management**
   - Never commit access tokens to Git
   - Use GitHub Secrets for CI/CD credentials
   - Use environment variables for runtime secrets

5. **Multi-Factor Authentication**
   - Enable 2FA on Docker Hub account
   - Use GitHub's security features

## Docker Hub Features

### Automated Builds (Deprecated)

Docker Hub automated builds are deprecated. Use GitHub Actions instead (already configured).

### Webhooks

Configure webhooks to trigger deployments when new images are pushed:

1. Go to your Docker Hub repository
2. Click **Webhooks** tab
3. Add webhook URL (e.g., your deployment service)

### Vulnerability Scanning

Enable security scanning:

1. Go to your repository settings
2. Enable **Vulnerability Scanning**
3. Review scan results in repository tags

### Build Cache

The GitHub Actions workflow uses build cache to speed up builds:

```yaml
cache-from: type=registry,ref=YOUR_USERNAME/top-tier-transformation:buildcache
cache-to: type=registry,ref=YOUR_USERNAME/top-tier-transformation:buildcache,mode=max
```

This significantly reduces build time on subsequent runs.

## Additional Resources

- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)
- [GitHub Actions Docker Documentation](https://docs.github.com/en/actions/publishing-packages/publishing-docker-images)
- [Semantic Versioning](https://semver.org/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## Support

For issues related to:
- **Docker Hub**: [Docker Support](https://www.docker.com/support/)
- **GitHub Actions**: [GitHub Support](https://support.github.com/)
- **This Project**: [Create an Issue](https://github.com/YOUR_USERNAME/top-tier-transformation/issues)
