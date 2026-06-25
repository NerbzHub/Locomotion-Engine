# LOCOMOTION.md

> Project collaboration rules for the Locomotion Engine.
>
> This document defines how documentation, planning, and implementation are produced throughout the lifetime of the project.
>
> It is **not** part of the canonical engine architecture. Instead, it defines the workflow used to create and maintain that architecture.

---

# Project Vision

The primary objective of the Locomotion Engine is to build a robust, maintainable game engine that enables the creation of a whimsical procedural pixel art game.

The engine exists to enable games.

Documentation exists to enable the engine.

The documentation is never the end goal.

---

# Primary Objective

The primary objective of the Locomotion Engine project is to produce a working game engine.

The immediate milestone is a playable whimsical procedural pixel art game.

Documentation, architecture, and tooling exist to accelerate this objective.

No activity shall unnecessarily delay measurable progress toward a working engine.

---

# Documentation Philosophy

Documentation should provide long-term architectural clarity while remaining lightweight enough to encourage implementation.

Documentation should explain intent rather than speculate about future implementation.

Implementation is expected to teach the architecture.

Documentation should evolve alongside implementation.

---

# Canonical Books

The architecture is divided into a small number of focused books.

Each book answers one primary architectural question.

## Book 00 — Vision

Why does the engine exist?

Contents:

* Purpose
* Goals
* Scope
* Design Philosophy
* Success Criteria

---

## Book 01 — Constitution

What principles govern the architecture?

Contents:

* Architectural Philosophy
* Design Principles
* Naming Principles
* Evolution Policy
* Documentation Standards

---

## Book 02 — Conceptual Architecture

What fundamentally exists?

Contents:

* Part I — Conceptual Entities
* Part II — Conceptual Relationships
* Part III — Architectural Principles Summary

Book 02 concludes the conceptual foundation of the engine.

---

Subsequent books should only be created when implementation naturally requires them.

Documentation should follow implementation whenever practical.

---

# Planning Workflow

Every new book begins with a planning session.

The planning session shall:

* define the purpose of the book
* establish the complete outline
* verify that every production section comfortably fits within a single ChatGPT response
* lock the outline before production begins

No production begins until the outline is considered stable.

---

# Production Workflow

Production follows the approved outline.

Each production prompt shall generate exactly one complete canonical section.

Every production response shall:

* be complete
* be internally consistent
* require no continuation
* require no subdivision
* be suitable for immediate inclusion in the canonical manuscript

Production prompts are atomic.

One prompt produces one complete canonical section.

---

# Scope Management

If a planned section is too large to fit comfortably within a single ChatGPT response:

The outline shall be revised before production begins.

Approved production prompts shall never be subdivided.

---

# Engineering Philosophy

Whenever possible:

Build first.

Document what has been learned.

Avoid documenting speculative systems that have not yet demonstrated architectural value.

The engine should drive the documentation rather than the documentation driving the engine.

---

# Quality Principles

Documentation should be:

* concise
* technically accurate
* implementation independent where appropriate
* maintainable
* internally consistent
* easy to revisit years later

Favor clarity over completeness.

Favor stability over cleverness.

Favor enduring concepts over temporary details.

---

# Collaboration Rules

ChatGPT acts as:

* Lead Engine Architect
* Technical Director
* Principal Software Engineer
* Technical Writer

The human project owner remains responsible for the creative vision and final architectural decisions.

Recommendations are intended to support—not replace—that vision.

---

# Project Rule

Whenever uncertainty exists between writing more documentation and making measurable progress on the engine, the default decision is:

**Build the engine.**
