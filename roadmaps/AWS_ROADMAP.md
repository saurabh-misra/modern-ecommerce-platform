# AWS Roadmap

## Purpose

This roadmap is for learning AWS specifically for the `modern-ecommerce-platform`.

AWS is one of the **three primary technology priorities**:

1. TypeScript
2. Docker
3. AWS

The developer has extensive software engineering and architecture experience but does not yet have substantial professional AWS experience.

The goal is therefore to develop **practical cloud architecture and deployment competence**, not to memorize dozens of AWS services.

---

# Learning Philosophy

Learn AWS through architecture and hands-on deployment.

    Learn cloud concept
        ↓
    Learn relevant AWS service
        ↓
    Build a small experiment
        ↓
    Apply it to the project
        ↓
    Encounter operational problem
        ↓
    Read AWS documentation
        ↓
    Improve the design
        ↓
    Ask AI to challenge the architecture
        ↓
    Understand the tradeoffs

Do not learn AWS as a list of services.

Instead:

    Requirement
        ↓
    Architectural problem
        ↓
    Options
        ↓
    AWS service
        ↓
    Tradeoffs
        ↓
    Decision

---

# Phase 1 — Cloud Fundamentals

Before going deep into individual services, understand:

- Region
- Availability Zone
- VPC
- subnet
- public vs private networking
- security groups
- compute
- storage
- managed databases
- load balancers
- DNS
- IAM
- monitoring

The objective is to understand how the major pieces of a cloud environment fit together.

---

# Phase 2 — IAM

IAM should be one of the first AWS services learned.

Learn:

- users
- roles
- policies
- permissions
- least privilege
- service roles
- application credentials
- temporary credentials

Understand the difference between:

> who/what is making the request

and

> what that identity is allowed to do.

## Senior-level expectation

Do not give an application broad permissions simply because it makes setup easier.

Always ask:

> What exact resources and actions does this component need?

---

# Phase 3 — EC2

Use EC2 as an initial hands-on cloud exercise.

Deploy a small Node.js application.

Learn:

- EC2 instance
- AMI
- instance types
- SSH
- security groups
- ports
- Linux processes
- environment configuration
- logs
- storage
- instance lifecycle

The goal is to understand:

> "I can run my application on a remote cloud machine."

Do not immediately optimize for a sophisticated architecture.

---

# Phase 4 — Docker on EC2

Connect the Docker and AWS learning paths.

Deploy:

    Docker image
        ↓
    EC2
        ↓
    Running application

Learn:

- how the image reaches the server
- environment configuration
- networking
- port exposure
- logs
- container restart behavior

This provides the first realistic cloud/container deployment experience.

---

# Phase 5 — VPC and Networking

Deepen understanding of:

- VPC
- subnets
- route tables
- internet gateway
- NAT concepts
- security groups
- public/private resources

The goal is not to memorize networking terminology.

Be able to explain:

> Why should a database generally not be directly exposed to the public internet?

And:

> How does an application in one part of the network securely communicate with the database?

---

# Phase 6 — S3

Use S3 for object storage.

Potential e-commerce use cases:

- product images
- documents
- generated exports
- other application assets

Learn:

- bucket
- object
- key
- permissions
- IAM
- private vs public access
- presigned URLs
- lifecycle considerations

Avoid making sensitive objects publicly accessible merely because it is easier.

---

# Phase 7 — RDS PostgreSQL

Move the application's PostgreSQL database toward AWS.

Architecture:

    NestJS
       ↓
    PostgreSQL
       ↓
    AWS RDS

Learn:

- managed databases
- database instances
- security groups
- connection configuration
- backups
- maintenance
- monitoring
- migrations
- credentials
- availability

Understand the tradeoff:

> Running PostgreSQL yourself vs using managed RDS.

---

# Phase 8 — CloudWatch

Learn observability early enough that the application is not simply deployed and forgotten.

Learn:

- logs
- metrics
- alarms
- dashboards
- application monitoring

Senior-level question:

> If checkout starts failing in production, how would you know and how would you investigate it?

The architecture should eventually provide a credible answer.

---

# Phase 9 — SQS

Introduce asynchronous processing when the application has a real use case.

Potential workflows:

    Checkout
       ↓
    Order created
       ↓
    SQS
       ↓
    Worker
       ├── email notification
       ├── inventory processing
       └── external-system synchronization

Learn:

- queues
- producers
- consumers
- visibility timeout
- retries
- dead-letter queues
- message ordering considerations
- idempotent consumers
- failure handling

Do not use SQS merely to demonstrate that SQS was used.

---

# Phase 10 — Application Architecture on AWS

At this stage the architecture may begin to look like:

    Users
       |
       v
    CloudFront / Load Balancer
       |
       v
    Dockerized Application
       |
       +------------+
       |            |
       v            v
      RDS          Redis
       |
       |
      SQS
       |
       v
     Worker

    S3
    CloudWatch
    IAM

This is an evolving target architecture, not a requirement to implement everything at once.

---

# Phase 11 — ECS/Fargate

After becoming comfortable with EC2 + Docker, evaluate ECS/Fargate.

Learn:

- ECS cluster
- task definition
- service
- task
- container
- ECR
- IAM roles
- networking
- load balancing
- scaling

The architectural question is more important than the service syntax:

> Why would I choose ECS/Fargate over running Docker directly on EC2?

Potential considerations:

- operational overhead
- scaling
- deployment
- availability
- infrastructure management
- cost
- team expertise

Do not use ECS simply because it is more "modern."

---

# Phase 12 — ECR

If using ECS/Fargate, learn ECR.

Workflow:

    Developer
       ↓
    GitHub
       ↓
    GitHub Actions
       ↓
    Docker build
       ↓
    ECR
       ↓
    ECS/Fargate

Understand image versioning and deployment traceability.

Avoid relying blindly on mutable `latest` tags for production deployments.

---

# Phase 13 — Secrets and Configuration

Learn appropriate AWS mechanisms for application secrets/configuration.

Potential tools:

- Secrets Manager
- Systems Manager Parameter Store

Understand:

- secrets vs normal configuration
- rotation
- access control
- IAM permissions
- environment injection

Never commit:

- AWS access keys
- database passwords
- JWT secrets
- payment credentials
- production connection strings

---

# Phase 14 — CI/CD

Connect GitHub, Docker, and AWS.

Target workflow:

    Pull Request
       ↓
    Type check
       ↓
    Tests
       ↓
    Build
       ↓
    Docker image
       ↓
    Push to ECR
       ↓
    Deploy
       ↓
    Health verification

Learn how deployment failures are detected and rolled back or recovered.

---

# Phase 15 — Security

Perform an AWS security review.

Evaluate:

- IAM least privilege
- security groups
- network exposure
- database exposure
- secrets
- encryption
- logging
- public S3 access
- application credentials
- container permissions

The goal is not simply:

> "It works."

The goal is:

> "It is reasonably secure for the scope of this portfolio system."

---

# Phase 16 — Reliability and Failure Handling

Review what happens when:

- EC2/container fails
- database becomes unavailable
- Redis becomes unavailable
- SQS has a backlog
- worker crashes
- payment provider times out
- external API fails
- deployment fails
- application receives a traffic spike

For each important dependency, understand:

- timeout
- retry
- backoff
- circuit-breaking considerations
- idempotency
- fallback behavior
- monitoring

Do not blindly add every resilience pattern.

Use them where justified.

---

# Phase 17 — Scalability

Evaluate:

- horizontal scaling
- load balancing
- stateless application servers
- database bottlenecks
- Redis
- queue workers
- S3
- CDN
- connection pooling

The goal is not to claim:

> "This architecture scales to millions of users."

Instead, be able to explain:

> "Here is where the current architecture would bottleneck, and here is how I would evolve it."

That is a much more credible senior-level answer.

---

# Phase 18 — Cost Awareness

AWS architecture should consider cost.

Learn the basic cost implications of:

- EC2
- RDS
- S3
- SQS
- CloudWatch
- ECS/Fargate
- load balancers
- data transfer

Do not optimize prematurely.

But do not design an unnecessarily expensive architecture merely to demonstrate AWS services.

A strong architecture balances:

    Requirements
        +
    Reliability
        +
    Performance
        +
    Security
        +
    Operational complexity
        +
    Cost

---

# Phase 19 — Final AWS Architecture Review

Before calling the AWS portion complete, review:

## Security

- IAM least privilege
- network security
- secrets
- encryption
- public exposure

## Reliability

- availability
- backups
- failure handling
- retries
- health checks

## Scalability

- compute scaling
- database limitations
- queues
- caching
- CDN

## Observability

- logs
- metrics
- alarms
- incident diagnosis

## Deployment

- repeatability
- Docker images
- CI/CD
- rollback strategy

## Cost

- unnecessary services
- oversized resources
- data transfer
- managed service costs

---

# AI Architecture Review Prompt

Use the AI agent with prompts such as:

> Review this AWS architecture as a senior cloud architect. Do not redesign it immediately. First identify security, reliability, scalability, operational, networking, and cost concerns. Challenge every AWS service that does not have a clear requirement behind it. Explain tradeoffs and distinguish mandatory fixes from optional improvements.

Another useful prompt:

> I am intentionally learning AWS rather than trying to build a perfect production system. Review this design for senior-level engineering judgment. Push back where I am overengineering, but also identify places where my design is dangerously simplistic.

---

# AWS Portfolio Milestone

The project should eventually demonstrate practical knowledge of a focused AWS stack.

Primary services:

- IAM
- EC2 and/or ECS/Fargate
- RDS
- S3
- SQS
- CloudWatch

Potential supporting services:

- ECR
- CloudFront
- Secrets Manager
- Parameter Store
- Application Load Balancer

Do not attempt to demonstrate every AWS service.

---

# Definition of Done

The developer should be able to explain:

1. Why the application uses AWS.
2. Why each selected AWS service exists.
3. Why a particular compute option was chosen.
4. How the application communicates with the database.
5. How AWS IAM protects resources.
6. How secrets are handled.
7. How Docker images reach AWS.
8. How asynchronous processing works.
9. How failures are handled.
10. How the application is monitored.
11. How the architecture could scale.
12. What the major AWS costs are.
13. What the current architecture cannot handle.
14. How the architecture would evolve if requirements changed.

---

# Recommended AWS Learning Strategy

Do not start with a giant AWS course and attempt to memorize the entire platform.

Use:

1. AWS cloud fundamentals
2. Official AWS documentation
3. AWS hands-on tutorials
4. Small experiments
5. Progressive deployment of the project
6. Architecture reviews with the AI agent

The project should drive which AWS services are learned.

---

# Priority

**PRIMARY**

AWS is one of the three main learning goals of the overall project.

The objective is not to collect AWS service names.

The objective is to demonstrate that the developer can design, deploy, secure, monitor, and reason about a real application running in the cloud.
