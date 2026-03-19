# Docker Setup Guide

This guide explains how to run the Top Tier Transformation application using Docker.

## Prerequisites

- Docker Engine 20.10 or higher
- Docker Compose 2.0 or higher
- At least 2GB of free disk space

## Quick Start

### 1. Configure Environment Variables

Create a local copy of the environment template:

```bash
cp .env.docker .env.docker.local
```

Edit `.env.docker.local` and fill in the required values:

```bash
# REQUIRED: Get from https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxx

# REQUIRED: Generate bcrypt hash of your admin password
ADMIN_PASSWORD_HASH=$2a$10$...your.hash.here...

# REQUIRED: Generate random 32+ character string
ADMIN_SESSION_SECRET=your_random_secret_here
```

### 2. Build and Start Services

```bash
# Build the Docker image
docker-compose build

# Start all services (app + PostgreSQL)
docker-compose up -d

# View logs
docker-compose logs -f app
```

### 3. Access the Application

- **Application**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login
- **Database**: localhost:5432 (postgres/postgres)

## Docker Commands Reference

### Basic Operations

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f app
docker-compose logs -f postgres
```

### Database Operations

```bash
# Run Prisma migrations
docker-compose exec app npx prisma migrate deploy

# Access PostgreSQL shell
docker-compose exec postgres psql -U postgres -d toptier

# Seed the database
docker-compose exec app npm run db:seed

# View database tables
docker-compose exec postgres psql -U postgres -d toptier -c "\dt"
```

### Maintenance

```bash
# Rebuild after code changes
docker-compose build --no-cache app
docker-compose up -d

# Remove all containers and volumes (DESTRUCTIVE)
docker-compose down -v

# View container status
docker-compose ps

# Check resource usage
docker stats
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `RESEND_API_KEY` | Resend email service API key | `re_xxxxxxxxxxxx` |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of admin password | `$2a$10$...` |
| `ADMIN_SESSION_SECRET` | Random secret for sessions | Min 32 characters |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_TURNSTILE_SITEKEY` | Cloudflare Turnstile site key | - |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret | - |
| `RESEND_RECIPIENT_EMAIL` | Test email recipient | - |

### Auto-Configured Variables

| Variable | Description | Value |
|----------|-------------|-------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@postgres:5432/toptier` |
| `NODE_ENV` | Node environment | `production` |

## Generating Required Secrets

### Admin Password Hash

Using Node.js:
```javascript
const bcrypt = require('bcryptjs');
console.log(bcrypt.hashSync('your-password', 10));
```

Using online tool:
- Visit: https://bcrypt-generator.com/
- Enter your password
- Use rounds: 10
- Copy the hash

### Session Secret

Using Node.js:
```javascript
require('crypto').randomBytes(32).toString('hex')
```

Using OpenSSL (Linux/Mac):
```bash
openssl rand -hex 32
```

Using PowerShell (Windows):
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

## Optional: pgAdmin Database Management

To access pgAdmin for visual database management:

```bash
# Start with pgAdmin
docker-compose --profile tools up -d

# Access pgAdmin
# URL: http://localhost:5050
# Email: admin@toptier.com
# Password: admin
```

Connect to PostgreSQL in pgAdmin:
- Host: postgres
- Port: 5432
- Database: toptier
- Username: postgres
- Password: postgres

## Troubleshooting

### Application won't start

```bash
# Check logs
docker-compose logs app

# Common issues:
# 1. Missing environment variables
# 2. Database not ready - wait for postgres health check
# 3. Port 3000 already in use
```

### Database connection errors

```bash
# Verify PostgreSQL is running
docker-compose ps postgres

# Check database health
docker-compose exec postgres pg_isready -U postgres

# Restart database
docker-compose restart postgres
```

### Migrations failing

```bash
# Check migration status
docker-compose exec app npx prisma migrate status

# Reset database (DESTRUCTIVE - deletes all data)
docker-compose down -v
docker-compose up -d
```

### Build errors

```bash
# Clean rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Port conflicts

```bash
# Check what's using port 3000
# Linux/Mac:
lsof -i :3000

# Windows:
netstat -ano | findstr :3000

# Change port in docker-compose.yml:
ports:
  - "3001:3000"  # Use port 3001 instead
```

## Production Deployment

### Using Docker Compose

1. Create production environment file:
```bash
cp .env.docker .env.production
# Edit .env.production with production values
```

2. Update docker-compose.yml for production:
```yaml
env_file:
  - .env.production
```

3. Deploy:
```bash
docker-compose -f docker-compose.yml up -d
```

### Using Standalone Docker

Build production image:
```bash
docker build -t top-tier-transformation:latest .
```

Run with environment file:
```bash
docker run -d \
  --name toptier-app \
  -p 3000:3000 \
  --env-file .env.production \
  top-tier-transformation:latest
```

Run with external PostgreSQL:
```bash
docker run -d \
  --name toptier-app \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  -e RESEND_API_KEY="re_xxx" \
  -e ADMIN_PASSWORD_HASH="$2a$10$xxx" \
  -e ADMIN_SESSION_SECRET="secret" \
  top-tier-transformation:latest
```

## Architecture

### Multi-Stage Build

The Dockerfile uses a 3-stage build process:

1. **deps**: Installs dependencies
2. **builder**: Builds the application
3. **runner**: Minimal production image

This reduces the final image size significantly.

### Services

- **app**: Next.js application (port 3000)
- **postgres**: PostgreSQL 16 database (port 5432)
- **pgadmin**: Database management UI (port 5050, optional)

### Volumes

- `postgres_data`: Persists database data
- `pgadmin_data`: Persists pgAdmin configuration

### Network

All services communicate on the `toptier-network` bridge network.

## Security Notes

1. **Change default passwords**: The default PostgreSQL password is `postgres` - change this in production
2. **Secure secrets**: Never commit `.env.docker.local` or `.env.production` to version control
3. **Non-root user**: The application runs as user `nextjs` (UID 1001) for security
4. **Network isolation**: Services communicate on an isolated Docker network

## Performance Optimization

### Build Cache

Docker caches layers. To optimize builds:
- Dependencies are installed before copying source code
- This allows faster rebuilds when only code changes

### Resource Limits

Add resource limits in docker-compose.yml:
```yaml
deploy:
  resources:
    limits:
      cpus: '1'
      memory: 1G
    reservations:
      memory: 512M
```

## Backup and Restore

### Backup Database

```bash
# Create backup
docker-compose exec postgres pg_dump -U postgres toptier > backup.sql

# With timestamp
docker-compose exec postgres pg_dump -U postgres toptier > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore Database

```bash
# Restore from backup
cat backup.sql | docker-compose exec -T postgres psql -U postgres toptier
```

## Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Prisma Production Deployment](https://www.prisma.io/docs/guides/deployment/deployment-guides)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)

## Support

For issues specific to this setup, check:
1. Application logs: `docker-compose logs app`
2. Database logs: `docker-compose logs postgres`
3. Container status: `docker-compose ps`
4. Resource usage: `docker stats`
