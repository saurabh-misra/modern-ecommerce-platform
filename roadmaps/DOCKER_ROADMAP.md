# Docker Roadmap

## Purpose

This roadmap is for learning Docker specifically for the `modern-ecommerce-platform`.

Docker is one of the **three primary technology priorities**:

1. TypeScript
2. Docker
3. AWS

The developer already has extensive software engineering experience, so the goal is practical production competence rather than learning Docker through a long beginner course.

---

# Learning Philosophy

Use Docker quickly and learn by doing.

    Learn concept
        ↓
    Build/run a container
        ↓
    Observe behavior
        ↓
    Apply to project
        ↓
    Encounter problem
        ↓
    Read Docker documentation
        ↓
    Fix it
        ↓
    Ask AI to review
        ↓
    Understand the tradeoff

Do not spend weeks watching Docker tutorials before using Docker.

---

# Phase 1 — Container Fundamentals

## Learn

Understand:

- image
- container
- Dockerfile
- registry
- image layers
- build context
- ports
- environment variables
- volumes
- networks

Understand the difference between:

> an image

and

> a running container.

Understand the difference between:

> application configuration

and

> container image contents.

---

# Phase 2 — Run Existing Containers

Start with existing images.

Practice:

- pulling an image
- running a container
- mapping ports
- inspecting containers
- viewing logs
- stopping containers
- removing containers
- examining images

Example conceptual workflow:

    Docker image
        ↓
    docker run
        ↓
    Container
        ↓
    Application accessible on host

The goal is to understand what Docker is doing before writing complex Dockerfiles.

---

# Phase 3 — Build a Node.js Container

Take a small Node.js/TypeScript API.

Create a Dockerfile.

Understand:

- base images
- `WORKDIR`
- `COPY`
- dependency installation
- build steps
- application startup
- `EXPOSE`
- `.dockerignore`

Do not blindly copy a Dockerfile from a tutorial.

Be able to explain every instruction.

---

# Phase 4 — Development vs Production

Understand the difference between:

### Development

Priorities:

- fast feedback
- source mounts
- hot reload
- debugging
- convenient tooling

### Production

Priorities:

- small images
- reproducible builds
- security
- non-root execution
- minimal dependencies
- predictable startup
- health checks

Do not assume one Dockerfile/configuration strategy is automatically ideal for both.

---

# Phase 5 — Docker Compose

Learn Docker Compose because the project will eventually need multiple services.

Target local architecture:

    Docker Compose
    │
    ├── Next.js
    ├── NestJS API
    ├── PostgreSQL
    └── Redis

Potential later addition:

    └── Worker

Learn:

- services
- networks
- volumes
- environment variables
- service dependencies
- health checks
- persistent data
- logs

---

# Phase 6 — PostgreSQL + Docker

Run PostgreSQL in Docker for local development.

Understand:

- persistent volumes
- container lifecycle
- database initialization
- connection strings
- networking between containers

Important:

> Container deletion should not accidentally destroy development database data when persistent storage is intended.

---

# Phase 7 — Redis + Docker

Add Redis only when the project reaches the caching phase.

Understand:

- Redis container
- networking
- persistence considerations
- connection configuration
- application-to-Redis communication

Do not add Redis simply because the project is supposed to use Redis eventually.

---

# Phase 8 — Multi-Container Application

Get the local project to run as a coherent stack:

    Docker Compose
          │
     ┌────┼──────────────┐
     ▼    ▼              ▼
    Web   API        PostgreSQL
           │
           ▼
         Redis

The target developer experience should eventually be close to:

    docker compose up

with clear documentation.

---

# Phase 9 — Docker Networking

Understand:

- bridge networks
- service discovery
- container-to-container communication
- host vs container networking
- exposed ports vs internal ports

Be able to explain why:

> the API should connect to PostgreSQL using the Compose service name rather than `localhost`.

---

# Phase 10 — Image Optimization

Learn:

- smaller base images
- `.dockerignore`
- layer caching
- dependency caching
- multi-stage builds
- production dependencies only

Understand why smaller images can improve:

- build time
- deployment time
- storage
- attack surface

Do not optimize prematurely.

---

# Phase 11 — Docker Security

Learn and review:

- non-root containers
- pinned/controlled image versions
- dependency vulnerabilities
- secrets handling
- environment variables
- unnecessary packages
- exposed ports
- minimal images

Never put secrets inside Dockerfiles or committed Compose files.

---

# Phase 12 — Health Checks and Reliability

Learn:

- container health checks
- startup behavior
- graceful shutdown
- restart behavior
- dependency readiness

Important distinction:

> "The container is running"

does not necessarily mean:

> "The application is healthy."

---

# Phase 13 — Production-Oriented Docker

Prepare the application for deployment.

Evaluate:

- deterministic builds
- production configuration
- image size
- startup command
- logging
- health checks
- graceful shutdown
- non-root execution
- secrets/configuration

This phase connects Docker to the AWS roadmap.

---

# Phase 14 — Docker + AWS

Docker becomes especially important when deploying to AWS.

Possible progression:

    Local
      ↓
    Docker Compose
      ↓
    Docker image
      ↓
    Container registry
      ↓
    AWS compute
      ↓
    Running application

Possible AWS destination:

- EC2 initially for understanding
- ECS/Fargate later if appropriate

Potential use of:

- Amazon ECR
- ECS/Fargate
- IAM
- CloudWatch

Do not introduce ECS/Fargate simply because it sounds more advanced.

The architectural reason should be documented.

---

# Phase 15 — CI/CD

Eventually:

    Git push
       ↓
    GitHub Actions
       ↓
    Type check
       ↓
    Tests
       ↓
    Docker build
       ↓
    Image push
       ↓
    Deployment

Understand how Docker fits into the delivery pipeline.

---

# Senior-Level Docker Review

The AI reviewer should challenge:

- unnecessary layers
- huge images
- `latest` tags where reproducibility matters
- running as root unnecessarily
- secrets in images
- poor caching
- development dependencies in production
- missing health checks
- incorrect networking assumptions
- persistent-data mistakes
- overly complicated Compose files
- unnecessary containers
- environment configuration problems

## AI review prompt

> Review this Docker setup as a senior production engineer. Do not rewrite it. Explain security, reproducibility, image-size, networking, caching, environment configuration, and deployment concerns. Distinguish real problems from optional improvements.

---

# Docker Portfolio Milestone

The project should eventually demonstrate:

- Dockerfiles
- Docker Compose
- multi-container development
- persistent volumes
- service networking
- environment configuration
- production-oriented images
- multi-stage builds where appropriate
- health checks
- non-root execution
- reproducible builds
- Docker-based CI/CD
- AWS container deployment

## Definition of Done

The developer should be able to explain:

1. What a Docker image is.
2. What a container is.
3. How Docker networking works.
4. Why containers should not contain secrets.
5. Why production images differ from development images.
6. Why multi-stage builds can help.
7. How Docker Compose services communicate.
8. How persistent storage works.
9. How a Docker image gets from GitHub to AWS.
10. What security and operational concerns exist around containers.

---

# Recommended Resources

Use Docker's official documentation and hands-on labs.

Start with:

- Docker Getting Started
- Dockerfile fundamentals
- Docker Compose documentation
- Docker networking
- Docker storage
- Docker security
- Docker multi-stage builds

Use tutorials only when they help clarify a specific concept.

---

# Priority

**PRIMARY**

Docker is one of the three main learning goals of the overall project.

The objective is not merely to have a Dockerfile.

The objective is to demonstrate practical containerization knowledge that can support a production application and a cloud deployment.
