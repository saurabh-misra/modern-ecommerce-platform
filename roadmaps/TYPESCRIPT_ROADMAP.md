# TypeScript Roadmap

## Purpose

This roadmap is for a senior software engineer with strong JavaScript experience who is transitioning from a long-term ColdFusion/SQL Server background into a modern TypeScript/Node.js ecosystem.

TypeScript is one of the **three primary technology priorities** for the `modern-ecommerce-platform` project.

The goal is not to become a TypeScript type-system expert. The goal is to become strong enough to design, implement, review, and defend a production-quality TypeScript codebase at a senior engineering level.

## Learning Philosophy

Use this loop throughout the roadmap:

    Learn a concept
        ↓
    Do a small exercise
        ↓
    Apply it in a real project
        ↓
    Get stuck
        ↓
    Read official documentation
        ↓
    Implement the solution yourself
        ↓
    Ask AI to review/challenge the implementation
        ↓
    Fix and understand the reasoning

Do not spend months completing courses before building.

The developer already knows JavaScript and software engineering. The objective is to learn how TypeScript changes the way code and domain models are designed.

---

# Phase 1 — TypeScript Fundamentals

## Goal

Become comfortable reading and writing ordinary TypeScript without constantly relying on the compiler or AI to explain basic syntax.

## Topics

### Basic types

Learn:

- string
- number
- boolean
- null
- undefined
- arrays
- tuples
- objects
- `unknown`
- `any`
- `never`
- `void`

Understand when each is appropriate.

Pay particular attention to the difference between:

- `any`
- `unknown`
- `never`

Do not use `any` merely to make compiler errors disappear.

### Type aliases

Understand:

```text
type User = ...
type Product = ...
```

Know when a type alias is appropriate.

### Interfaces

Understand:

```text
interface User { ... }
```

Learn the practical differences between interfaces and type aliases.

### Functions

Learn to type:

- parameters
- return values
- optional parameters
- default parameters
- callbacks
- function types

### Optional properties

Understand:

```text
name?: string
```

and how optional values affect type safety.

---

# Phase 2 — Union Types and Type Narrowing

This is a particularly important area.

Learn:

- union types
- literal types
- narrowing
- `typeof`
- `instanceof`
- `in`
- custom type guards
- discriminated unions

Example conceptual model:

    Payment
       │
       ├── card
       ├── bank_transfer
       └── wallet

The goal is to model domain states safely rather than relying on loosely typed objects.

## Senior-level expectation

Do not simply ask:

> "How do I make TypeScript accept this?"

Ask:

> "What does the type actually guarantee about this value?"

---

# Phase 3 — Generics

Learn:

- generic functions
- generic interfaces
- generic types
- generic classes
- constraints
- default generic parameters

Understand why generics exist and when they improve reuse.

Do not introduce generics simply to make code look sophisticated.

Senior-level expectation:

> Use generics when they provide meaningful type safety or reusable abstractions.

---

# Phase 4 — Utility Types

Learn the commonly useful built-in utilities:

- Partial
- Required
- Pick
- Omit
- Record
- Readonly
- ReturnType
- Parameters
- Awaited

Understand how these can help model DTOs, API responses, configuration, and domain objects.

Do not memorize every TypeScript utility type.

Focus on the ones that solve real problems.

---

# Phase 5 — Advanced Type-System Concepts

Learn these after the fundamentals are comfortable:

- `keyof`
- `typeof` in type positions
- indexed access types
- mapped types
- conditional types
- `infer`
- template literal types

These are useful but should not become the center of the project.

The goal is practical fluency, not type-level programming for its own sake.

---

# Phase 6 — Strict TypeScript Configuration

This is a major project requirement.

Learn:

- `tsconfig.json`
- `strict`
- `strictNullChecks`
- `noImplicitAny`
- module configuration
- module resolution
- target
- source maps
- declaration settings where relevant

The project should use strict TypeScript.

Do not weaken compiler settings merely to make existing code compile.

---

# Phase 7 — TypeScript + Node.js

Create a small TypeScript Node.js project before starting the main e-commerce implementation.

Suggested learning project:

    TypeScript
       ↓
    Node.js
       ↓
    Express
       ↓
    PostgreSQL

Keep this small.

Possible domain:

- users
- products
- orders
- payments

The goal is to practice TypeScript in a real application rather than isolated exercises.

---

# Phase 8 — Domain Modeling

This is where TypeScript becomes especially valuable for the e-commerce project.

Practice modeling:

- User
- Product
- Cart
- CartItem
- Order
- OrderItem
- Payment
- Inventory
- Shipment

Think carefully about:

- required vs optional fields
- valid states
- state transitions
- IDs
- money
- dates
- external identifiers
- nullable database fields
- external API responses

The AI reviewer should challenge weak domain models.

---

# Phase 9 — TypeScript + NestJS

Once TypeScript fundamentals are solid, use NestJS for the main backend.

Learn how TypeScript interacts with:

- controllers
- services
- modules
- dependency injection
- DTOs
- validation
- guards
- interceptors
- decorators
- providers

Do not memorize NestJS decorators without understanding the underlying concepts.

---

# Phase 10 — Type-Safe APIs

Apply TypeScript to API design.

Review:

- request DTOs
- response types
- validation
- error types
- pagination
- API contracts
- external service responses

Important distinction:

> TypeScript provides compile-time safety. It does not validate untrusted runtime input.

External data still needs runtime validation.

---

# Phase 11 — TypeScript Testing

Use TypeScript in:

- unit tests
- integration tests
- API tests
- E2E tests

Learn to type test fixtures and test helpers without making the tests unnecessarily complicated.

---

# Phase 12 — Senior-Level TypeScript Review

Before considering TypeScript "learned", the codebase should be reviewed for:

- excessive `any`
- unsafe type assertions
- weak domain types
- incorrect null handling
- unnecessary generics
- overly complicated types
- duplicated types
- leaking infrastructure types into business logic
- poor API typing
- unclear discriminated unions
- inappropriate classes/interfaces
- weak error modeling
- TypeScript compiler configuration

## AI review prompt

Use the AI agent with prompts such as:

> Review this code as a senior TypeScript engineer. Do not rewrite it. Identify weak type design, unsafe assumptions, unnecessary `any`, excessive type assertions, poor domain modeling, and abstractions that are either missing or unnecessarily complex.

---

# Phase 13 — TypeScript Portfolio Milestone

The project should eventually demonstrate:

- strict TypeScript
- strong domain modeling
- meaningful interfaces/types
- appropriate generics
- useful utility types
- runtime validation
- typed APIs
- type-safe error handling
- maintainable abstractions
- minimal unjustified `any`
- readable code

## Definition of Done

The developer should be able to explain:

1. Why TypeScript is being used.
2. Where compile-time safety helps.
3. Where runtime validation is still required.
4. Why a particular domain type was designed the way it was.
5. Why an interface/type/class was chosen.
6. Why a generic was or was not introduced.
7. How strict compiler settings improve the project.
8. How TypeScript affects API and domain design.

---

# Recommended Resources

Start with official documentation rather than a large course.

Primary:

- TypeScript Handbook
- Everyday Types
- Generics
- Narrowing
- Utility Types
- TypeScript TSConfig Reference

Use tutorials only when a concept is difficult to understand from the documentation.

---

# Priority

**PRIMARY**

TypeScript is one of the three main learning goals of the overall project.

The objective is not merely to have `.ts` files.

The objective is to demonstrate that the developer can use TypeScript to produce safer, clearer, and more maintainable production software.
