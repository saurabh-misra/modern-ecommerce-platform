# TypeScript Roadmap

## Purpose

This roadmap is for the `modern-ecommerce-platform` project.

TypeScript is one of the **three primary technology priorities** of the project:

1. TypeScript
2. Docker
3. AWS

The developer already has substantial JavaScript and software-engineering experience. Therefore, this roadmap should **not** be approached like a beginner programming course.

The goal is to become strong enough to:

- write production-quality TypeScript
- understand TypeScript's type system deeply enough to reason about it
- model business domains safely
- design maintainable APIs and application boundaries
- understand compiler behavior and strict configuration
- review TypeScript code at a senior engineering level
- explain TypeScript decisions during technical interviews

The goal is **not** to master every advanced type-system feature.

---

# 1. Learning Philosophy

Use this loop throughout the roadmap:

```text
Learn a concept
      ↓
Read the official documentation
      ↓
Experiment with it
      ↓
Write a small exercise
      ↓
Apply it to a realistic domain
      ↓
Get stuck
      ↓
Research the problem
      ↓
Implement the solution yourself
      ↓
Ask AI to review/challenge it
      ↓
Fix the weaknesses
      ↓
Understand why the solution is appropriate
```

Do **not** spend months completing a TypeScript course before writing real code.

The preferred learning cycle is:

> **Read → Experiment → Build → Review → Repeat**

---

# 2. Primary Learning Resource

Use the official TypeScript documentation as the primary source.

The current TypeScript Handbook recommends starting with one of its introductory guides and then proceeding to **The Basics**. The documentation explicitly provides a guide for programmers who already know JavaScript. citeturn0search0turn0search11

Recommended starting sequence:

```text
TypeScript for JavaScript Programmers
                ↓
The Basics
                ↓
Everyday Types
                ↓
Narrowing
                ↓
More on Functions
                ↓
Object Types
                ↓
Generics
                ↓
Creating Types from Types
                ↓
Classes
                ↓
Modules
```

Official resources:

- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- TypeScript for JavaScript Programmers: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- The Basics: https://www.typescriptlang.org/docs/handbook/2/basic-types.html
- Everyday Types: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- Narrowing: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
- Generics: https://www.typescriptlang.org/docs/handbook/2/generics.html

The Handbook is intended to give everyday programmers a strong understanding of TypeScript concepts and important compiler behavior. It is not intended to be a complete language specification. citeturn0search0

---

# 3. Important Principle: TypeScript Is Not a New Runtime

Keep this mental model throughout the roadmap:

```text
JavaScript
    +
TypeScript type system
    ↓
Compile-time checking
    ↓
JavaScript output
    ↓
JavaScript runtime
```

TypeScript is a static type checker for JavaScript programs. It does not replace JavaScript's runtime behavior. citeturn0search0turn0search11

This distinction is extremely important.

For example:

> TypeScript can tell you at compile time that a value is expected to be a `Product`.

It does **not** mean that arbitrary JSON received over HTTP is automatically a valid `Product` at runtime.

Therefore:

```text
Compile-time type safety
        ≠
Runtime validation
```

This distinction should eventually appear throughout the e-commerce application's API design.

---

# 4. Phase 1 — TypeScript for JavaScript Programmers

## Goal

Understand what TypeScript adds to JavaScript without relearning JavaScript itself.

Start with the official:

**TypeScript for JavaScript Programmers**

Focus on:

- type inference
- type annotations
- basic type checking
- how TypeScript relates to JavaScript
- structural typing
- how TypeScript identifies type errors
- what TypeScript does and does not check

The official introduction emphasizes that existing JavaScript knowledge carries directly into TypeScript because TypeScript shares JavaScript's syntax and runtime behavior. citeturn0search11

## Exercise

Take several small JavaScript examples you already understand and convert them to TypeScript.

Do not focus on frameworks yet.

---

# 5. Phase 2 — The Basics

## Goal

Understand how the TypeScript compiler reasons about values and types.

Study:

- primitive types
- type annotations
- type inference
- object types
- functions
- arrays
- unions
- type aliases
- interfaces
- type assertions
- literal types
- `null`
- `undefined`
- `any`
- `never`
- `unknown`

The current Handbook begins with **The Basics** and then moves into more detailed everyday TypeScript concepts. citeturn0search0turn0search6

## Important principle

Prefer inference when TypeScript can already infer the correct type.

Do not add type annotations everywhere simply because the language allows it.

The official documentation explicitly notes that TypeScript often infers types automatically and that fewer explicit annotations may be preferable when inference is sufficient. citeturn0search1

---

# 6. Phase 3 — Everyday Types

## Goal

Become comfortable with the types used in normal application development.

Study:

- `string`
- `number`
- `boolean`
- arrays
- tuples
- objects
- optional properties
- function parameters
- function return types
- unions
- type aliases
- interfaces
- literal types
- `null`
- `undefined`
- `any`
- type assertions

The official Everyday Types documentation covers these concepts as the core building blocks for more advanced TypeScript. citeturn0search1

## Practice with e-commerce concepts

Model:

```text
User
Product
Category
Cart
CartItem
Order
OrderItem
Payment
Inventory
```

Focus on the difference between:

```text
What data exists?
```

and:

```text
What data is actually valid?
```

---

# 7. Phase 4 — `any`, `unknown`, `never`, Nullability

This deserves special attention.

Understand:

### `any`

`any` effectively disables type checking for a value.

Do not use it merely to make compiler errors disappear.

The official TypeScript guidance explicitly discourages unnecessary `any`. citeturn0search10

### `unknown`

Understand why `unknown` is safer than `any` when receiving data whose type has not yet been established.

### `never`

Understand `never` as representing impossible values/paths and where it can help with exhaustive reasoning.

### `null` and `undefined`

Understand:

- optional properties
- nullable database values
- strict null checking
- safe access
- narrowing

The official documentation recommends `strictNullChecks` because unchecked null/undefined behavior is a significant source of bugs. citeturn0search1

---

# 8. Phase 5 — Narrowing

## Goal

Understand one of the most important TypeScript concepts for real application development.

Study:

- `typeof`
- `instanceof`
- `in`
- equality checks
- truthiness narrowing
- control-flow analysis
- discriminated unions
- user-defined type guards
- type predicates

The TypeScript compiler analyzes JavaScript control flow and can refine a broad type into a more specific type based on runtime checks. This process is called **narrowing**. citeturn0search5

## Practice with domain states

For example:

```text
Payment
    ├── CardPayment
    ├── BankTransferPayment
    └── WalletPayment
```

and:

```text
OrderStatus
    ├── Pending
    ├── Confirmed
    ├── Paid
    ├── Shipped
    ├── Delivered
    └── Cancelled
```

The objective is to model valid states rather than passing around loosely typed objects.

---

# 9. Phase 6 — Functions

Study:

- parameter types
- return types
- optional parameters
- default parameters
- function types
- callbacks
- contextual typing
- overloads where appropriate
- rest parameters

Focus on designing clear function contracts.

Ask:

> What does this function accept?

> What does it guarantee?

> Can it fail?

> How is failure represented?

> Is the return type communicating something meaningful?

---

# 10. Phase 7 — Object Types

Study:

- object types
- optional properties
- readonly properties
- index signatures
- interfaces
- type aliases
- intersections
- extending types
- structural typing

Understand the practical relationship between:

```text
interface
```

and:

```text
type
```

Do not turn this into a philosophical debate.

The important question is:

> Which representation communicates the domain model clearly and maintainably?

---

# 11. Phase 8 — Type Aliases, Interfaces, and Domain Modeling

This is where TypeScript becomes especially valuable for the project.

Practice modeling:

```text
Product
ProductVariant
Money
Address
Order
OrderItem
Payment
InventoryReservation
```

Think carefully about:

- required fields
- optional fields
- nullable fields
- identifiers
- state
- immutable values
- external IDs
- database representations
- API representations
- domain representations

Do not automatically use one type for every layer.

Consider whether these should be different:

```text
Database model
      ↓
Domain model
      ↓
API request/response model
```

The correct answer depends on the actual architecture.

---

# 12. Phase 9 — Generics

## Goal

Understand generics as a tool for reusable, type-safe abstractions.

Study:

- generic functions
- generic interfaces
- generic types
- generic classes
- generic constraints
- type parameters
- generic defaults
- generic relationships

The official documentation describes generics as a mechanism for building reusable components that work across a range of types while preserving meaningful type relationships. citeturn0search2turn0search3

## Practice

Use generics for realistic abstractions such as:

```text
PaginatedResult<T>
ApiResponse<T>
Repository<T>
Result<T>
```

But do not create generic abstractions merely because they are possible.

Senior-level question:

> Does the generic preserve a useful relationship between types?

If not, the abstraction may not be justified.

---

# 13. Phase 10 — Utility Types

Study the commonly useful built-in utilities:

- `Partial`
- `Required`
- `Pick`
- `Omit`
- `Record`
- `Readonly`
- `ReturnType`
- `Parameters`
- `Awaited`

Apply them to realistic scenarios such as:

```text
UpdateProductInput
CreateProductInput
ProductResponse
Pagination metadata
Configuration
```

Do not attempt to memorize every TypeScript utility type.

The objective is to recognize when a utility type solves a real problem.

---

# 14. Phase 11 — Creating Types from Types

Once the fundamentals are comfortable, learn:

- `keyof`
- `typeof` in type positions
- indexed access types
- mapped types
- conditional types
- `infer`
- template literal types

These features are powerful but should not dominate the early learning process.

## Rule

> Learn advanced type manipulation when you encounter a real problem that benefits from it.

Do not build elaborate type-level programming exercises simply to demonstrate TypeScript knowledge.

---

# 15. Phase 12 — Classes and Object-Oriented TypeScript

Study:

- classes
- constructors
- properties
- access modifiers
- inheritance
- abstract classes
- implements
- static members
- class types

Also understand when **not** to use classes.

Since the main backend will use NestJS, classes will appear naturally in:

- DTOs
- services
- providers
- domain/application components
- dependency injection

The goal is to understand the JavaScript/TypeScript class model rather than blindly following framework conventions.

---

# 16. Phase 13 — Modules

Study:

- imports
- exports
- default exports
- named exports
- module boundaries
- module resolution
- circular dependencies

Apply this to the eventual modular monolith.

The AI should pay particular attention to whether module boundaries remain clean.

---

# 17. Phase 14 — Strict TypeScript Configuration

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
- build configuration

The project should use strict TypeScript.

Do not weaken compiler settings simply to make errors disappear.

The goal is to understand what the compiler is protecting you from.

---

# 18. Phase 15 — First Hands-On TypeScript Project

Do **not** wait until the entire Handbook is complete.

Once the fundamentals are comfortable, create a small standalone project.

Suggested stack:

```text
TypeScript
    ↓
Node.js
    ↓
Express
    ↓
PostgreSQL
```

Keep it deliberately small.

Possible domain:

```text
Products
Users
Orders
```

The purpose is to practice:

- TypeScript
- Node.js
- HTTP
- REST
- validation
- database access
- error handling
- testing

This is a learning project, not the main portfolio application.

---

# 19. Phase 16 — Runtime Validation

This is a critical senior-level concept.

Understand:

```text
Compile-time type
        ≠
Runtime data validation
```

For example:

```text
HTTP request
    ↓
Untrusted JSON
    ↓
Runtime validation
    ↓
Validated data
    ↓
TypeScript application logic
```

Study an appropriate runtime validation library when the project reaches this point.

The exact library is less important than understanding the architectural boundary.

The AI should challenge code that assumes external data is trustworthy merely because a TypeScript type was assigned to it.

---

# 20. Phase 17 — TypeScript + NestJS

After the TypeScript fundamentals and small project are comfortable, move into NestJS.

Learn how TypeScript interacts with:

- modules
- controllers
- providers
- dependency injection
- services
- DTOs
- validation
- guards
- interceptors
- decorators
- testing

Do not memorize NestJS decorators without understanding the underlying TypeScript and Node.js concepts.

---

# 21. Phase 18 — TypeScript + API Design

Apply TypeScript to:

- request DTOs
- response types
- pagination
- validation
- errors
- API contracts
- external service responses

Think carefully about whether API types should expose internal domain or database structures.

Important questions:

```text
What does the API promise?

What does the domain require?

What does the database store?

Where should transformations happen?
```

---

# 22. Phase 19 — TypeScript + Database

Apply TypeScript to:

- database entities/models
- query results
- repositories
- transactions
- nullable columns
- database errors
- persistence boundaries

Do not blindly make database models equal to domain models.

Consider the responsibilities of each layer.

---

# 23. Phase 20 — TypeScript Testing

Use TypeScript in:

- unit tests
- integration tests
- API tests
- E2E tests

Learn to type:

- test fixtures
- factories
- mocks
- test helpers

Avoid making test code unnecessarily complex just to satisfy the type system.

---

# 24. Phase 21 — Apply TypeScript to the E-Commerce Platform

At this point, TypeScript becomes part of the main project.

Start modeling the actual domain:

```text
Identity
Catalog
Cart
Orders
Payments
Inventory
Notifications
Administration
```

Focus on meaningful domain types.

Examples of questions to consider:

> Can an order be shipped before payment?

> Can a cancelled order become paid?

> Can inventory become negative?

> What happens if a payment provider returns an unknown status?

> What happens if an external API sends unexpected data?

TypeScript should help make invalid states harder to represent, but business rules still require runtime logic and validation.

---

# 25. Phase 22 — Senior-Level TypeScript Review

Periodically review the codebase for:

## Type safety

- excessive `any`
- unsafe assertions
- unnecessary casts
- weak types
- incorrect null handling

## Domain modeling

- ambiguous types
- invalid states
- duplicated domain definitions
- database types leaking everywhere
- API types leaking into business logic

## Abstractions

- unnecessary generics
- unnecessary interfaces
- overly clever types
- premature abstractions
- excessive indirection

## Compiler configuration

- strict mode
- null checking
- implicit any
- build configuration

## API boundaries

- runtime validation
- external data
- error handling
- request/response contracts

---

# 26. AI Code Review Prompt

Use the AI agent with prompts such as:

> Review this code as a senior TypeScript engineer. Do not rewrite it. Identify unsafe type assumptions, excessive `any`, unnecessary type assertions, weak domain modeling, incorrect null handling, inappropriate abstractions, and places where the type system is either being underused or overused.

Another useful prompt:

> Review this TypeScript design from a senior engineer's perspective. Which types communicate business rules well? Which types are too weak? Which abstractions are unnecessary? Which advanced TypeScript features are justified, and which are merely clever?

---

# 27. TypeScript Interview Preparation

You should eventually be able to explain, in your own words:

### Fundamentals

- What TypeScript adds to JavaScript
- Type inference
- Type annotations
- Structural typing
- Interfaces vs type aliases
- Union types
- Intersection types
- Literal types
- `any`
- `unknown`
- `never`
- `null` and `undefined`

### Type system

- Narrowing
- Type guards
- Discriminated unions
- Generics
- Generic constraints
- Utility types
- `keyof`
- `typeof`
- mapped types
- conditional types

### Runtime

- TypeScript vs runtime validation
- Compilation/transpilation
- JavaScript runtime behavior

### Engineering

- strict mode
- TypeScript configuration
- API contracts
- domain modeling
- type-safe error handling
- testing

The objective is not memorized definitions.

You should be able to explain:

> **Why would I use this feature here?**

---

# 28. What NOT to Optimize For

Do not optimize for:

- knowing every TypeScript feature
- writing complicated generic types
- minimizing every explicit type annotation
- maximizing type-level cleverness
- using interfaces everywhere
- avoiding classes at all costs
- achieving zero compiler warnings through unsafe casts
- making code "look TypeScript-y"

Optimize for:

```text
Correctness
    ↓
Clarity
    ↓
Type safety
    ↓
Maintainability
    ↓
Good domain modeling
    ↓
Appropriate abstraction
```

---

# 29. Recommended Progression

The complete learning progression should look like:

```text
Phase 1
TypeScript for JavaScript Programmers
        ↓
Phase 2
The Basics
        ↓
Phase 3
Everyday Types
        ↓
Phase 4
any / unknown / never / nullability
        ↓
Phase 5
Narrowing
        ↓
Phase 6
Functions
        ↓
Phase 7
Object Types
        ↓
Phase 8
Domain Modeling
        ↓
Phase 9
Generics
        ↓
Phase 10
Utility Types
        ↓
Phase 11
Advanced Type Manipulation
        ↓
Phase 12
Classes
        ↓
Phase 13
Modules
        ↓
Phase 14
Strict TypeScript Configuration
        ↓
Phase 15
Small TypeScript + Node + Express Project
        ↓
Phase 16
Runtime Validation
        ↓
Phase 17
NestJS
        ↓
Phase 18
Type-safe API Design
        ↓
Phase 19
TypeScript + Database
        ↓
Phase 20
Testing
        ↓
Phase 21
Main E-Commerce Application
        ↓
Phase 22
Senior-Level TypeScript Review
```

This is a **progression**, not a rigid schedule.

If a concept becomes relevant to the application earlier, learn it earlier.

---

# 30. Definition of Done

TypeScript should be considered sufficiently learned for the purposes of this project when the developer can:

1. Write TypeScript comfortably without constantly looking up basic syntax.
2. Explain type inference.
3. Use unions and narrowing confidently.
4. Model domain states using appropriate types.
5. Use generics when they provide meaningful value.
6. Use utility types appropriately.
7. Understand advanced type manipulation at a practical level.
8. Explain `any`, `unknown`, and `never`.
9. Handle nullability correctly.
10. Configure TypeScript using strict settings.
11. Distinguish compile-time types from runtime validation.
12. Design type-safe API boundaries.
13. Identify weak or unsafe TypeScript in a code review.
14. Explain TypeScript tradeoffs during an interview.
15. Write maintainable TypeScript without relying on unnecessary type-level cleverness.

---

# 31. Portfolio Quality Bar

The final e-commerce project should demonstrate:

- strict TypeScript
- meaningful domain models
- appropriate interfaces/types
- useful generics
- appropriate utility types
- runtime validation
- typed API contracts
- maintainable module boundaries
- type-safe error handling
- minimal unjustified `any`
- minimal unsafe assertions
- readable and understandable code

The project should demonstrate:

> **Strong practical TypeScript, not TypeScript tricks.**

---

# 32. Relationship to the Other Roadmaps

TypeScript should be learned first and then continuously applied while learning Docker and AWS.

```text
TypeScript
    ↓
Application
    ↓
Docker
    ↓
AWS
```

The technologies reinforce one another.

For example:

```text
TypeScript application
        ↓
Dockerized application
        ↓
AWS deployment
```

Do not wait until TypeScript is "perfect" before beginning Docker or AWS.

The roadmaps can overlap once the fundamentals are solid.

---

# 33. Final Guiding Principle

The most important TypeScript question is not:

> "How do I type this?"

It is:

> **"What does this type communicate about the software and what does it guarantee?"**

Use TypeScript to make the system:

- safer
- clearer
- easier to refactor
- easier to understand
- easier to review
- harder to misuse

The goal is to demonstrate that TypeScript is being used as an **engineering tool for modeling and maintaining a real system**, not simply as a replacement extension for JavaScript.
