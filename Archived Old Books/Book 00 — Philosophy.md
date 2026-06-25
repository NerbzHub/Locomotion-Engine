# 📘 Book 00 — Philosophy

> *To everyone who has ever wanted to build worlds.*

---

# Book 00 — Philosophy

**Library of Locomotion**

**First Edition**

---

> *"Tools shape the work that follows."*

Every game engine is ultimately a collection of decisions.

Some decisions are technical.
Some are architectural.
Some are cultural.

Most outlive the people who originally made them.

Locomotion Engine exists because we believe those decisions deserve to be made deliberately.

This book exists to explain **why**.

Not how.

The implementation will evolve.

The philosophy must endure.

---

# Table of Contents

1. Purpose
2. Why Locomotion Exists
3. The Problem We Are Solving
4. The Kind of Engine We Are Building
5. The Kind of Engine We Are Not Building
6. Core Engineering Values
7. Principles for Contributors
8. The Measure of Success
9. The Measure of Failure
10. The Philosophy That Must Survive Every Rewrite
11. Summary of Guiding Principles
12. Questions Intentionally Left Open
13. Continue Reading
14. Edition Information

---

# 1. Purpose

Locomotion Engine exists to make building 2D games feel clear, enjoyable, and sustainable.

Not merely possible.

Not merely powerful.

Enjoyable.

Software engineering often drifts toward unnecessary complexity. Small systems become tangled. Features accumulate faster than understanding. Eventually the architecture serves itself instead of the people using it.

Locomotion exists as a deliberate response to that pattern.

It seeks balance between simplicity and capability.

Between discipline and creativity.

Between engineering excellence and the joy of making games.

---

# 2. Why Locomotion Exists

Many engines attempt to solve every problem.

In doing so they often become difficult to understand, difficult to extend, and difficult to own.

Locomotion begins from the opposite assumption.

An engine should solve a specific class of problems exceptionally well.

Its architecture should remain understandable by a single developer while still scaling to larger teams.

A contributor should be able to open the repository years later and understand not only *what* the engine does, but *why* it was designed that way.

The engine should encourage confidence rather than dependence.

The best engine is not one that hides complexity.

It is one that organises complexity so it can be understood.

---

# 3. The Problem We Are Solving

Modern game development often faces competing pressures.

Developers want:

* fast iteration
* reliable architecture
* reusable systems
* predictable behaviour
* approachable codebases
* long-term maintainability

These goals are frequently treated as trade-offs.

Locomotion rejects that assumption.

Good architecture should improve iteration speed.

Clear systems should reduce bugs.

Consistency should increase creativity rather than restrict it.

The objective is not to remove complexity from games.

The objective is to remove accidental complexity from the engine.

Games are already difficult enough.

The engine should not become an additional obstacle.

---

# 4. The Kind of Engine We Are Building

Locomotion is a professional-quality, browser-first, reusable 2D engine.

It is intended to become a foundation upon which many games may be built.

Dungeon Defense is simply the first proof that the architecture succeeds.

The engine values:

* clarity over cleverness
* composition over inheritance
* consistency over novelty
* determinism over unpredictability
* maintainability over shortcuts
* iteration over perfection

Every system should feel like it belongs.

Nothing should exist merely because another engine has it.

Every feature must justify its place.

---

## Browser First

The web is one of the most accessible software platforms ever created.

No installation.

Immediate iteration.

Cross-platform by default.

Locomotion embraces the browser not as a limitation but as a strength.

The browser becomes the development environment.

The engine becomes instantly shareable.

Games become immediately playable.

Accessibility is a feature.

---

## Engine Before Game

Every decision must first ask:

> "Does this improve the engine?"

Only then should we ask:

> "Does this improve the game?"

Games validate the engine.

They should not dictate it.

When a game requires a feature, that feature should become a reusable engine capability whenever reasonable.

The engine grows through generalisation, not special cases.

---

# 5. The Kind of Engine We Are Not Building

Understanding what we reject is as important as understanding what we pursue.

Locomotion is not attempting to become:

* a replacement for every game engine
* a visual editor first
* an engine that supports every genre equally
* a collection of experimental programming techniques
* an academic research project
* an architecture built around trends

It is not trying to impress readers.

It is trying to help developers build games.

We choose focus over ambition without direction.

We choose coherence over feature count.

We choose depth over breadth.

---

# 6. Core Engineering Values

## Simplicity is Strength

Simple does not mean simplistic.

Simple means understandable.

When presented with two solutions of equal capability, choose the one that requires less explanation.

Complexity should emerge only where reality demands it.

Never because cleverness is satisfying.

---

## Consistency Builds Confidence

Developers learn patterns.

Every unnecessary exception creates uncertainty.

A predictable engine becomes an intuitive engine.

Consistency reduces documentation because behaviour becomes expected.

---

## Readability Outlives Performance Tricks

Machines become faster.

People remain human.

Most software spends far more time being read than written.

Optimisations that permanently reduce readability require extraordinary justification.

Performance matters.

Unnecessary obscurity does not.

---

## Architecture Should Disappear

The best architecture becomes invisible.

Developers should spend their attention creating gameplay.

Not navigating the engine.

When architecture constantly demands attention, it has become part of the problem.

---

## Every System Has a Single Responsibility

Each component should have a clear reason to exist.

Boundaries create confidence.

Confidence enables change.

Change extends lifespan.

---

## Reuse Through Good Design

Reusable systems are not created by making everything generic.

They become reusable because their responsibilities are clearly defined.

Abstractions should emerge naturally from repeated needs.

Not imagined needs.

---

## Optimise When Evidence Exists

Premature optimisation creates permanent complexity.

Measure first.

Understand second.

Improve third.

Performance decisions should be supported by evidence rather than assumption.

---

## Documentation Serves Development

Documentation is not the product.

The engine is.

Documentation exists because future developers deserve context.

Once enough understanding exists to build confidently, the correct action is to build.

Software teaches lessons that documents cannot.

---

# 7. Principles for Contributors

If you contribute to Locomotion, remember:

You are not merely adding code.

You are shaping an environment other developers will inhabit.

Leave the engine easier to understand than you found it.

Ask:

* Will this still make sense in five years?
* Can another developer explain this without me?
* Does this improve the engine rather than merely solving today's task?
* Have I reduced complexity or simply moved it?

Technical excellence is not measured by sophistication.

It is measured by clarity.

---

## Before Adding Anything

Ask four questions.

```
            Need
             │
             ▼
      Does it solve
      a real problem?
             │
         Yes │ No
             ▼
 Can existing systems
 solve it already?
             │
         Yes │ No
             ▼
 Improve existing   Add new
    systems         capability
```

New systems should be rare.

Improving existing systems is usually better.

---

# 8. The Measure of Success

Locomotion succeeds when:

A developer can understand the engine quickly.

Features compose naturally.

Architecture remains coherent after years of growth.

Refactoring feels safe.

New contributors feel welcomed rather than intimidated.

Games built on the engine become increasingly ambitious without requiring architectural rewrites.

Most importantly:

The engine remains enjoyable to work on.

If maintaining the engine becomes exhausting, something has gone wrong.

---

# 9. The Measure of Failure

Failure is not the absence of features.

Failure is losing clarity.

Warning signs include:

* duplicated concepts
* inconsistent architecture
* systems that nobody fully understands
* documentation explaining exceptions instead of principles
* adding abstractions before problems exist
* building features because other engines have them
* fear of changing code

The greatest architectural debt is not technical debt.

It is conceptual debt.

When developers no longer understand the engine's ideas, every future change becomes more expensive.

---

# 10. The Philosophy That Must Survive Every Rewrite

Languages will change.

Frameworks will change.

Browsers will change.

Hardware will change.

Rendering techniques will evolve.

Entire subsystems may one day be replaced.

None of these changes should alter the philosophy.

If Locomotion is rewritten ten years from now, it should still believe:

* clarity creates speed
* architecture enables creativity
* maintainability is a feature
* simplicity requires discipline
* documentation supports development
* the engine exists to empower games, not overshadow them

The implementation is temporary.

The philosophy is the engine's identity.

---

# Summary of Guiding Principles

* Build the engine before the game.
* Solve real problems.
* Prefer clarity over cleverness.
* Prefer consistency over novelty.
* Keep architecture understandable.
* Let abstractions emerge naturally.
* Measure before optimising.
* Document the reasoning, not every detail.
* Reduce accidental complexity.
* Leave the engine better than you found it.
* Never sacrifice long-term maintainability for short-term convenience.
* Never sacrifice enjoyment in pursuit of perfection.

---

# Questions Intentionally Left Open

Some questions should remain unanswered until experience provides evidence.

Among them:

* How large should the engine ultimately become?
* Which genres beyond tower defence naturally fit the architecture?
* What tooling belongs inside the engine, and what belongs outside it?
* How should the engine evolve without losing coherence?
* Which future technologies genuinely improve the developer experience rather than merely following industry trends?

These are engineering questions.

They deserve engineering answers earned through building.

---

# Continue Reading

The philosophy explains *why* Locomotion exists.

The next book defines the commitments that follow from those beliefs.

**Recommended Next Book**

**📕 Book 01 — Constitution**

---

# Edition Information

**Title:** Book 00 — Philosophy

**Library:** Library of Locomotion

**Edition:** First Edition

**Status:** Canonical

This document establishes the enduring philosophy of Locomotion Engine.

Future editions may refine language for clarity but should preserve the principles described here unless a deliberate architectural decision supersedes them.

---

> *"Great engines are not remembered because they contained every feature. They are remembered because they made it easier for people to build worlds."*

---

# Canonical Status

**This Book is ready to become part of the canonical Library of Locomotion.**
