# Locomotion Engine

## Engineering Standards

**Status:** Canonical

**Editorial Edition**

---

## Table of Contents

- Locomotion Engine
  - Engineering Standards
  - About This Document
- Part II — The Locomotion Style
- Part II — The Locomotion Style
  - The Code Should Feel Calm
- Readability Is a Feature
- Consistency Builds Confidence
- Simplicity Wins
- Engineering Over Ego
- Future You Is Another Developer
- Good Engineering Is Usually Quiet
- Leave It Better Than You Found It
- Decision Making
- The Locomotion Standard
- Graceful Degradation
- Instrumentation
  - Measure Before Optimising
  - Measure Consistently
  - Prefer Counters Over Estimates
  - Sample Long-Running Behaviour
  - Instrumentation Should Be Easy to Remove From Mental Load
- Temporary Debug Code
  - Temporary Means Temporary
  - Replace Repeated Temporary Code With Permanent Diagnostics
  - Use Feature Flags When Appropriate
  - Avoid Permanent Debug Clutter
- Investigating Bugs
  - Begin With Evidence
  - Ask What Changed
  - Test Assumptions Individually
  - Resist Random Experimentation
  - Verify the Fix
- Error Messages
  - State What Happened
  - Identify Where It Happened
  - Explain Why, If Known
  - Suggest the Next Step
  - Include Relevant Data
  - Avoid Cryptic Messages
- The Cost of Silence
  - Silent Failures Hide Information
  - Ignored Return Values
  - Suppressed Validation
  - Missing Diagnostics
  - Visible Software Is Maintainable Software
- Engineering Confidence
- Part VIII — Development Workflow
  - Purpose
- Build Vertically
- Keep the Engine Working
- Finish Before Expanding
- Small Commits
- Refactor As You Go
- Documentation Follows Understanding
- Engineering Decisions
- Milestone Thinking
- Definition of Done
- Managing Change
- Sustainable Development
- Long-Term Thinking
- The Workflow Test
- Part X — Reviewing Code Quality
  - 10.1 Purpose
    - Readability
    - Consistency
    - Maintainability
- Part X — Reviewing Code Quality
  - 10.2 Readability Review
  - Reviewing for Understanding
    - Would someone unfamiliar with this code understand it?
  - Can Anything Be Simplified?
  - Does This Read Naturally?
  - Are Responsibilities Obvious?
  - Does the Code Explain Itself?
  - Are Unnecessary Mental Jumps Required?
  - Reading at Different Levels
  - Reading Aloud
  - Readability as an Engineering Practice
- Part XII — Collaborative Engineering Review
  - Purpose
- Recognising Review Triggers
- Receiving Feedback
- Giving Feedback
- Building Shared Understanding
- Closing Thoughts

---


## About This Document

This document defines the engineering standards used throughout the Locomotion Engine project. It is intended to be read alongside the Vision, Constitution, Conceptual Architecture, and Implementation Roadmap.

---

Engineering Part I — Foundations of Engineering
Engineering Part II — The Locomotion Style
Engineering Part III — Naming & Vocabulary
Engineering Part IV — Organising the Engine
Engineering Part V — Writing Good Code
Engineering Part VI — Debugging & Diagnostics
Engineering Part VII — Performance & Refactoring
Engineering Part VIII — Development Workflow
Engineering Part IX — Foundations of Engineering Review
Engineering Part X — Reviewing Code Quality
Engineering Part XI — Reviewing Engineering Decisions
Engineering Part XII — Collaborative Engineering Review
Engineering Part XIII — Engineering Acceptance

Part I — Purpose & Engineering Philosophy

The quality of a software project is determined long before individual functions are written or systems begin to emerge. It is shaped by the habits, priorities, and judgement that guide thousands of small decisions made throughout its lifetime. Those decisions are rarely dramatic. Most are ordinary. Yet together they determine whether a project becomes easier to understand with time or slowly collapses beneath its own weight.

These Engineering Standards exist to guide those decisions.

They define the engineering practices, values, and mindset expected throughout the implementation of the Locomotion Engine. Where the canonical architecture explains what the engine should be, this document explains how it should be built.

Good architecture deserves equally good engineering.

The purpose of these standards is to ensure that the implementation reflects the architectural intent as faithfully as possible while remaining approachable, maintainable, and enjoyable to evolve for many years.

Engineering is ultimately an act of stewardship.

Every contributor inherits the work of those who came before and leaves something behind for those who follow. The responsibility is not simply to make software work, but to leave the engine stronger than it was found.

These standards exist to support that responsibility.

Purpose

The Locomotion Engine is guided by four complementary documents, each serving a distinct purpose.

The Vision explains why the engine exists.

The Constitution establishes the enduring principles that govern its architecture.

The Conceptual Architecture defines what fundamentally exists within the engine and how those concepts relate to one another.

The Implementation Roadmap describes a practical sequence through which that architecture may be realised.

Together they answer the questions of purpose, principle, structure, and progression.

This document answers a different question.

How should the implementation itself be approached?

Architecture and engineering are closely related, but they are not the same discipline.

Architecture defines enduring concepts.

Engineering transforms those concepts into working software.

Architecture decides what should exist.

Engineering decides how to realise it while preserving the architectural intent.

An elegant architecture can still produce an unmaintainable codebase if the implementation lacks discipline. Likewise, excellent engineering cannot compensate for weak architectural foundations. Both are required, and each strengthens the other.

The role of these standards is therefore not to redefine the architecture, introduce new concepts, or establish additional constitutional principles. Those responsibilities belong to the canonical books.

Instead, this document exists to help every engineering decision reinforce the architecture rather than gradually drift away from it.

The architecture should remain recognisable within the implementation.

When someone unfamiliar with the project explores the code years from now, they should be able to see the architectural principles expressed naturally throughout the implementation rather than hidden beneath unnecessary complexity or inconsistent decisions.

This document also recognises an important reality of software development.

No architecture survives first contact with implementation unchanged.

Implementation reveals assumptions.

It uncovers awkward edges.

It exposes ideas that looked convincing on paper but become cumbersome in practice.

That is not failure.

It is how good software is built.

Implementation is one of the most valuable forms of architectural feedback available. Working software has a way of asking questions that documentation never considered. When those questions arise, they should lead to better understanding rather than quiet compromise.

If implementation demonstrates that the architecture can be improved, the architecture should evolve through the established process. The implementation should never quietly diverge until the documentation becomes a historical record of an engine that no longer exists.

The implementation and the architecture should continually strengthen one another.

This document exists to encourage exactly that relationship.

Engineering Philosophy

Software is ultimately judged by what it enables people to do.

For the Locomotion Engine, that means creating games.

The engine is the product.

Everything else exists to support it.

Documentation matters because it preserves understanding.

Planning matters because it provides direction.

Architecture matters because it establishes stable foundations.

But none of those things are the destination.

The engine itself is.

A beautifully documented engine that never materialises remains an idea.

A working engine teaches something new every time it grows.

For that reason, working software is always the primary measure of progress.

Features that exist only in plans, diagrams, or conversations are possibilities rather than capabilities.

Until an idea has been implemented, exercised, and understood through use, its strengths and weaknesses remain largely theoretical.

Implementation provides clarity that speculation cannot.

This philosophy naturally leads to a simple preference.

Build first.

Learn from what has been built.

Then improve both the implementation and the understanding that surrounds it.

This does not diminish the value of documentation.

Quite the opposite.

Documentation becomes significantly more valuable when it captures knowledge that has been earned through experience rather than assumptions about how a system might eventually behave.

The best documentation often explains lessons that could only have been learned by building the software.

Implementation and documentation should therefore move together.

Neither should race far ahead of the other.

When implementation advances, documentation should preserve the understanding that has been gained.

When documentation identifies a clearer direction, implementation should benefit from that clarity.

Neither should become disconnected from reality.

This philosophy also shapes how complexity is introduced.

Software has a remarkable tendency to become more complicated over time without any conscious effort. Every feature adds another decision. Every system introduces another interaction. Every abstraction creates another concept that someone must understand.

Complexity accumulates naturally.

Simplicity requires intention.

Whenever multiple solutions satisfy the same problem, preference should be given to the one that is easiest to understand, easiest to explain, and easiest to maintain.

Simple does not mean simplistic.

It means removing everything that does not contribute meaningful value.

The simplest solution is often the one that leaves the fewest permanent questions behind.

Readability follows the same principle.

Code is read far more often than it is written.

Every implementation decision should acknowledge this imbalance.

A clever solution that requires careful study every time it is encountered creates an ongoing cost that continues long after the satisfaction of writing it has faded.

Clear software asks very little of its reader.

It allows attention to remain focused on solving problems rather than deciphering intent.

Consistency deserves equal attention.

Individual developers naturally develop personal preferences.

Over the lifetime of a project, those preferences become surprisingly expensive when they appear throughout the codebase as competing styles and patterns.

Consistency reduces decision making.

It allows readers to recognise familiar structures instead of continually adapting to new approaches.

Predictability is one of the quiet strengths of a mature codebase.

It rarely attracts attention when it is present.

Its absence is immediately noticeable.

Engineering is also an exercise in accumulation.

Few individual changes transform a project overnight.

Instead, quality emerges through thousands of small improvements made consistently over long periods of time.

Removing a little duplication.

Clarifying an awkward design.

Simplifying a difficult section.

Strengthening a fragile idea.

None of these changes appear remarkable in isolation.

Together they define the trajectory of the project.

The same is true in the opposite direction.

Small compromises accumulate just as effectively.

An unnecessary shortcut here.

A temporary workaround there.

A slightly confusing decision that will be fixed later.

Individually they seem harmless.

Collectively they become technical debt that future contributors inherit without ever seeing the decisions that created it.

The healthiest projects rarely avoid mistakes altogether.

They simply correct them while they are still small.

Refactoring should therefore be regarded as a normal engineering activity rather than an exceptional event.

It is not an admission that previous work was poor.

It is recognition that understanding improves over time.

As understanding grows, the implementation should become a clearer expression of that understanding.

Continuous refinement is considerably less disruptive than periodic reinvention.

Large rewrites are often symptoms of many small improvements that were postponed for too long.

Good engineering favours steady evolution instead.

Perhaps the most important principle of all is patience.

The Locomotion Engine is intended to exist for many years.

The code written today should not merely solve today's problems.

It should make tomorrow's work easier.

Engineering decisions should therefore be evaluated over years rather than days.

A solution that saves an hour today but costs dozens of hours over the lifetime of the engine is rarely an improvement.

Time changes the perspective from which software is judged.

Many decisions that appear efficient in the short term become burdens once the project matures.

Likewise, many investments that seem unnecessary early in development quietly repay themselves countless times as the engine grows.

Long-lived software rewards long-term thinking.

The Locomotion Engine should be engineered with that horizon in mind.

Engineering Values

Every project develops its own culture, whether intentionally or by accident.

The Locomotion Engine chooses to define that culture deliberately.

The values described here are not aspirations reserved for ideal circumstances. They are practical principles intended to guide everyday engineering decisions, from the smallest refinement to the largest system.

Clarity

Clarity is one of the highest forms of engineering quality.

Software should communicate its intent as naturally as possible. Understanding should come from reading the implementation itself rather than reconstructing the reasoning behind it.

Clear engineering shortens onboarding, reduces mistakes, and makes change feel safer because contributors can confidently understand what already exists.

Clarity is rarely achieved by adding more.

More often, it emerges by removing distractions until only the essential idea remains.

Simplicity

Simplicity is not the absence of capability.

It is the absence of unnecessary complication.

Every additional concept introduced into the engine becomes something that every future contributor must learn, remember, and reason about. That cost continues for the lifetime of the project.

Simple systems tend to be more robust because they present fewer opportunities for misunderstanding and fewer places for hidden interactions to emerge.

Whenever complexity cannot be justified by enduring value, it should be removed.

Maintainability

Software is never truly finished.

It is read, extended, refined, corrected, and adapted throughout its lifetime. The ease with which those changes can be made is one of the most important measures of engineering quality.

Maintainability is not something added after implementation.

It is a consequence of the decisions made during implementation.

Every decision should leave the next one a little easier.

Every improvement should reduce the effort required to understand, modify, and extend the engine.

When maintainability is treated as a first-class engineering concern, progress becomes sustainable because improvements build upon one another instead of constantly fighting against the past.

Predictability

Predictable software is easier to trust.

When similar situations produce similar outcomes, developers gain confidence in the behaviour of the engine. They spend less time wondering how a system behaves and more time building upon it.

Surprises should be intentional, not accidental.

Consistency of behaviour allows understanding to accumulate naturally. Once a contributor learns one part of the engine, that knowledge should transfer smoothly into the next.

Predictability also reduces the fear of change.

Developers are far more willing to improve a system when they can reasonably anticipate the consequences of their work.

Determinism

Where practical, identical circumstances should produce identical results.

Deterministic behaviour makes reasoning easier, debugging more reliable, and engineering decisions more confident.

When behaviour changes unexpectedly between executions, understanding becomes difficult because the implementation itself becomes an unreliable source of truth.

The Locomotion Engine places significant value on procedural generation, simulation, and long-term maintainability. In each of these areas, deterministic behaviour provides an essential foundation for confidence.

When non-deterministic behaviour is genuinely required, it should always be deliberate.

Unexpected randomness is rarely interesting.

Expected randomness often is.

The distinction matters.

Reusability

The engine exists to support more than a single game.

Its value grows as capabilities become useful in increasingly diverse situations.

Reusability does not mean designing every system to solve every conceivable problem.

It means identifying solutions that naturally apply beyond the immediate task and expressing them in a way that preserves that broader usefulness.

A reusable solution often feels remarkably ordinary.

It solves one problem well without unnecessarily depending upon the circumstances that first inspired it.

That quiet generality is one of the defining characteristics of mature engineering.

Extensibility

No engine remains static.

New ideas appear.

Requirements evolve.

Understanding deepens.

The implementation should welcome that reality rather than resist it.

Extensibility is the ability to grow without repeatedly disturbing existing foundations.

Growth should feel additive rather than disruptive.

When new capability consistently requires dismantling existing systems, the implementation is signalling that its foundations deserve attention.

An extensible engine is not one that predicts every future requirement.

It is one that can accommodate future understanding without losing its coherence.

Incremental Improvement

Large improvements are almost always built from small ones.

Engineering rarely advances through isolated moments of brilliance.

It advances through steady refinement.

A clearer idea.

A simpler design.

A stronger abstraction.

A small inconsistency resolved before it spreads.

These improvements may seem insignificant on the day they are made.

Years later they become the reason the engine remained healthy while other projects became increasingly difficult to maintain.

The direction of a project is determined far more by the consistency of its improvements than by the size of its milestones.

Small improvements compound.

That is one of the greatest advantages available to any long-term software project.

Respect for Future Contributors

Every contributor deserves to inherit a codebase that is understandable.

Most of those contributors have not arrived yet.

Some of them will be the original author returning after months or years away.

Time has an interesting way of making strangers of us all.

The implementation should never assume that future readers remember why a particular decision seemed obvious at the time.

Good engineering acknowledges that memory fades while software remains.

Respect is expressed through consideration.

It is visible in decisions that reduce unnecessary complexity, preserve consistency, and leave clear paths for future improvement.

The goal is not to impress future contributors.

It is to help them succeed.

When they spend less time deciphering yesterday's decisions, they have more time to solve tomorrow's problems.

That is one of the greatest gifts a developer can leave behind.

The Locomotion Mindset

Every software project develops habits.

Over time those habits become culture.

Culture influences engineering far more than any individual rule because it shapes the thousands of decisions made when no explicit guidance exists.

The Locomotion Engine should cultivate a culture of deliberate craftsmanship.

Not perfection.

Not endless optimisation.

Simply thoughtful engineering performed consistently over a long period of time.

The engine should always feel as though someone cared about the next person who would work on it.

That next person is often future-you.

One of the easiest mistakes in software development is assuming that future-you will remember everything about today's work.

Experience suggests otherwise.

A few months is often enough for perfectly reasonable decisions to become difficult to reconstruct.

A few years can make your own code feel as though it was written by someone else entirely.

That perspective changes the way software should be written.

Future-you is another developer.

Treat them with the same consideration you would offer anyone joining the project for the first time.

Leave them an implementation that explains itself through its structure, consistency, and restraint.

They should spend their time improving the engine rather than rediscovering it.

Every line of code becomes part of the engine's future.

Some lines will survive for weeks.

Others may survive for decades.

Very few feel permanent when they are first written.

Many quietly become permanent anyway.

This is why seemingly small engineering decisions deserve care.

They have a habit of lasting much longer than expected.

Software accumulates history one decision at a time.

Every contribution slightly changes the character of the codebase.

The goal should always be to leave that character a little stronger than before.

Good engineering often goes unnoticed.

The best systems rarely announce how clever they are.

They simply make sense.

They behave consistently.

They remain dependable.

They allow developers to work without constantly thinking about the implementation itself.

There is a quiet confidence in software that does exactly what it needs to do and nothing more.

That confidence is earned through discipline rather than spectacle.

Clever solutions are often satisfying to create.

Unfortunately, they frequently become expensive to maintain.

An implementation that depends upon ingenuity every time it is read places an unnecessary burden on everyone who follows.

The most elegant solution is usually the one that becomes almost invisible because it feels so natural.

If a solution can be made simpler without losing capability, it almost always should be.

Simplicity ages remarkably well.

Novelty rarely does.

Engineering is also an exercise in reducing cognitive load.

Every unnecessary concept, exception, assumption, or inconsistency occupies a small amount of mental space.

One or two rarely matter.

Hundreds eventually define the experience of working within the engine.

A healthy codebase allows contributors to think about the problems they are solving rather than the structure they are navigating.

Reducing cognitive load is therefore not merely an act of tidiness.

It is an act of respect.

The strongest engineering decisions are often those that quietly disappear into the background because they no longer demand attention.

Finally, approach the engine with the mindset of continuous stewardship.

Do not wait for the perfect opportunity to improve something.

Small improvements made consistently are both more achievable and more sustainable than ambitious rewrites postponed indefinitely.

If something can be made a little clearer, make it clearer.

If something can become a little simpler, simplify it.

If something can become a little more consistent, make it consistent.

None of these changes need to be dramatic.

Their value lies in their accumulation.

The Locomotion Engine will not become an enduring project because of one exceptional piece of engineering.

It will become an enduring project because thousands of ordinary engineering decisions were made with care.

That is the mindset these standards seek to encourage.

Not engineering for today.

Not engineering for the next milestone.

Engineering for an engine that will still be understandable, maintainable, and enjoyable to build many years from now.

# Part II — The Locomotion Style

# Part II — The Locomotion Style

## The Code Should Feel Calm

Every codebase has a personality.

Some feel chaotic. Every file is slightly different. Every system solves familiar problems in unfamiliar ways. Reading one part of the project teaches very little about the next. Progress slows not because the problems are difficult, but because understanding the code requires constant mental effort.

Other codebases feel calm.

The Locomotion Engine should always strive to be the latter.

Calm code is not defined by its size, nor by the complexity of the problems it solves. Complex software can still feel calm when it has been engineered with care. Calmness is the result of deliberate decisions that reduce unnecessary friction for the reader.

A calm codebase presents itself honestly. Responsibilities are easy to recognise. Concepts appear where they are expected. Similar problems are solved in similar ways. Names describe intent without forcing the reader to decode hidden meaning. Structure supports understanding instead of competing with it.

Nothing should feel like a surprise.

Surprises are exciting in games. They are expensive in software.

Every unexpected pattern forces the reader to stop, reconsider their assumptions, and rebuild their understanding before they can continue. One surprise may only cost a few seconds. Hundreds of small surprises become hours of unnecessary work spread across the lifetime of a project.

Good engineering removes those moments.

This does not mean every solution must be obvious at first glance. Some problems are inherently difficult. Instead, it means the difficulty should come from the problem itself, not from the way the solution has been expressed.

A contributor should spend their time understanding the engine, not deciphering the author's thought process.

Calm code also respects attention.

Every additional concept competes for the reader's limited working memory. Every unnecessary exception increases cognitive load. Every inconsistent pattern demands another mental adjustment.

Over time these costs accumulate.

The Locomotion Engine should therefore prefer engineering that allows the reader to settle into the code rather than constantly adapt to it. After working within the project for a while, contributors should develop an intuition for how the engine is organised and how new work is likely to fit within it.

That familiarity is valuable.

When the code feels calm, engineers stop thinking about the codebase itself and begin thinking about the problems they are trying to solve.

That is exactly where their attention belongs.

---

# Readability Is a Feature

Readable code is often mistaken for a matter of style.

It is not.

Readability is an engineering feature, every bit as important as correctness, performance, or reliability. It directly affects how quickly defects are found, how safely changes are made, how confidently systems evolve, and how long the software remains maintainable.

Computers do not care whether code is readable.

People do.

The compiler will execute software regardless of whether another engineer can understand it six months later. The project, however, will eventually pay for every unnecessary moment of confusion.

The majority of software engineering is not writing new code.

It is reading existing code.

Engineers spend far more time understanding systems than creating them. Every improvement in readability therefore compounds throughout the lifetime of the project. A decision that saves one minute every time a system is revisited may ultimately save days of engineering effort.

Readability also improves decision-making.

When code is easy to understand, it becomes easier to recognise duplication, identify architectural weaknesses, evaluate potential improvements, and predict the consequences of change. Clear code reveals opportunities that confusing code tends to hide.

Poor readability creates uncertainty.

Uncertainty makes engineers hesitant.

Hesitant engineers make smaller changes, avoid useful refactoring, duplicate existing behaviour rather than modifying it, and slowly accumulate technical debt simply because the safest option appears to be leaving confusing code untouched.

The opposite is equally true.

When code is understandable, engineers become confident enough to improve it. They recognise patterns. They identify relationships. They see opportunities to simplify rather than merely preserve.

This confidence is one of the greatest assets a project can possess.

The Locomotion Engine therefore treats readability as a core engineering objective rather than an aesthetic preference. Every decision should contribute to making the engine easier to understand, easier to extend, and easier to maintain over time.

Software is written for people first.

The computer is simply the final reader.

---

# Consistency Builds Confidence

Consistency is one of the least glamorous qualities of a software project.

It rarely appears in demonstrations. It seldom attracts attention in code reviews. Few people celebrate it because, when it is working well, it almost disappears.

Its value becomes obvious only when it is missing.

Inconsistent code forces contributors to continually question their assumptions.

Does this system work differently?

Is there a special case here?

Should this be implemented another way?

Why is this area organised differently from everything else?

Each question interrupts progress.

Each interruption increases cognitive load.

Consistency removes those interruptions by allowing engineers to build trust in the codebase itself.

When similar problems are approached consistently, experience transfers naturally from one part of the engine to another. Learning accelerates because every new system reinforces understanding instead of demanding entirely new ways of thinking.

This predictability is one of the defining characteristics of mature software.

Contributors should rarely wonder where new functionality belongs because the existing structure naturally suggests the answer. Decisions become easier because previous engineering has already established sensible patterns.

Consistency also reduces unnecessary discussion.

Many engineering debates exist only because comparable problems have been solved differently in different parts of the project. Once inconsistency appears, every future contribution must decide which precedent to follow.

A consistent codebase avoids creating those questions in the first place.

This does not imply rigidity.

Consistency should never preserve a poor decision simply because it already exists. Better approaches should absolutely replace weaker ones when they provide lasting benefit.

The important distinction is that improvement should become the new standard rather than another isolated exception.

The project should evolve as a single coherent system.

Not as a collection of individual preferences.

There is a quiet satisfaction in working within a codebase that behaves predictably. Nothing feels experimental. Nothing feels arbitrary. Every decision appears to belong alongside every other.

Some people describe such codebases as boring.

That is often intended as criticism.

Within the Locomotion Engine, it should be regarded as praise.

The best engineering often feels boring because it allows the engineer to focus on solving meaningful problems instead of navigating unnecessary variation.

Boring code is frequently dependable code.

Dependable code earns confidence.

Confidence allows the engine to continue growing without losing its coherence.

---

# Simplicity Wins

Simplicity is frequently misunderstood.

It is sometimes mistaken for minimalism, as though the goal were simply to write less software. Other times it is confused with avoiding difficult problems altogether.

Neither interpretation is correct.

Simple engineering does not ignore complexity.

It manages complexity.

The distinction between *simple* and *simplistic* is important.

A simplistic solution ignores important requirements in pursuit of convenience. It appears elegant only because it leaves difficult problems unsolved.

A simple solution, by contrast, fully addresses the problem while removing everything that does not genuinely contribute to the answer.

That is considerably harder to achieve.

Complexity often arrives naturally.

Every new abstraction, every additional concept, every special case, every optional pathway can usually be justified in isolation. Each one appears reasonable at the moment it is introduced.

Years later the project inherits all of them.

This is why simplicity requires discipline.

Removing concepts is generally more difficult than introducing them. Reducing a design until only the essential ideas remain demands a deeper understanding of the problem than simply adding another layer to accommodate it.

The most experienced engineers are often those who remove the most code.

Not because they enjoy deleting work, but because they recognise that every permanent concept carries a permanent maintenance cost.

The Locomotion Engine should therefore treat complexity as something that must earn its place.

When a simpler solution satisfies the same architectural goals, it should be preferred.

When two concepts can become one, they should become one.

When an existing idea can solve a new problem, introducing another idea should be questioned carefully.

Good engineering is often an exercise in reduction rather than expansion.

It asks not, "What else do we need?"

It asks, "What can we remove and still solve the problem well?"

Simplicity is not the absence of capability.

It is the absence of unnecessary burden.

A simple system is easier to understand.

Easier to maintain.

Easier to extend.

And, more often than not, easier to trust.

# Engineering Over Ego

Every engineer leaves fingerprints on a codebase.

The question is whether those fingerprints make the project stronger or merely make it more personal.

The Locomotion Engine is intended to outlive any single implementation, any individual feature, and ultimately any individual contributor. That perspective should shape every engineering decision.

The engine is the product.

Not the programmer.

It is easy to become attached to our own work. Every solution represents time, thought, and effort. Naturally, we want those decisions to be correct.

Good engineering requires the humility to accept that sometimes they are not.

The best engineers are not those who never rewrite code.

They are the ones who recognise when rewriting it is the better decision.

There should never be embarrassment in replacing yesterday's solution with a better one discovered today. Experience changes. Understanding improves. The engine evolves because its contributors are willing to improve it, including improving their own work.

Holding onto a design simply because it is familiar is rarely an act of engineering.

It is often an act of pride.

The same humility applies during collaboration.

No engineer owns a section of the engine in the long term. Individuals may introduce systems, nurture them, and understand them deeply, but those systems ultimately belong to the project. Every contributor should feel both welcome and responsible to improve any part of the codebase when genuine improvement is possible.

Ownership should mean stewardship.

Not territory.

Healthy collaboration depends upon the assumption that everyone is trying to improve the same engine.

Disagreements will inevitably occur.

Different engineers will approach problems differently. Different experiences will suggest different solutions. These conversations should always be grounded in the quality of the engine rather than the preferences of the individuals involved.

The strongest argument is not, "I like this approach."

It is, "This leaves the engine in a better place."

Sometimes that argument will support your own idea.

Sometimes it will support someone else's.

Both outcomes are equally valuable if the engine improves.

There is also wisdom in recognising that cleverness is rarely the objective.

An engineer may occasionally produce an ingenious solution that demonstrates impressive technical ability.

If another engineer struggles to understand it, the achievement is incomplete.

The greatest compliment a piece of engineering can receive is not that it is brilliant.

It is that it feels inevitable.

As though, after seeing it, nobody would reasonably choose another approach.

That kind of engineering rarely seeks attention.

It quietly removes problems instead.

The culture of the Locomotion Engine should therefore reward clarity over cleverness, cooperation over individual expression, and stewardship over ownership.

Engineers contribute their best ideas.

The engine keeps the best ones.

---

# Future You Is Another Developer

One of the easiest mistakes in software engineering is believing that today's understanding will still exist tomorrow.

It will not.

The details that seem unforgettable while implementing a feature become surprisingly difficult to reconstruct months later. Context fades. Assumptions disappear. Decisions that once felt obvious become puzzles waiting to be solved again.

Future you is not the same person writing today's code.

Future you has forgotten most of today's reasoning.

That is why good engineering treats the future as a different contributor rather than an improved memory.

Every decision made today becomes a conversation with someone who does not possess the same context.

Sometimes that person will be a teammate.

Often it will simply be yourself.

The responsibility remains the same.

Leave enough understanding behind that the next engineer can continue the journey without first repeating it.

This way of thinking changes the way engineering decisions are made.

Instead of asking whether something works today, ask whether someone encountering it for the first time next year would understand why it exists.

Instead of assuming the surrounding context explains the decision, assume the surrounding context has changed.

Instead of relying upon memory, rely upon clarity.

Maintenance is fundamentally an exercise in rediscovery.

Every hour spent rediscovering old decisions is an hour not spent improving the engine.

Reducing that future effort is one of the quiet responsibilities of professional engineering.

The best software often feels as though previous contributors anticipated the questions you were about to ask.

Not because they predicted the future perfectly, but because they understood that uncertainty itself could be reduced.

Engineering is communication across time.

Every decision explains something.

Every structure teaches something.

Every design choice tells future contributors what matters.

The Locomotion Engine should always strive to make those conversations as clear as possible.

The goal is not simply to leave working software behind.

The goal is to leave understanding behind.

---

# Good Engineering Is Usually Quiet

There is a common misconception that impressive engineering should look impressive.

In practice, the opposite is often true.

The strongest systems rarely draw attention to themselves because the difficult work has already been completed. Complexity has been reduced before anyone else arrives. Friction has been removed before it becomes visible. Decisions that might have confused future contributors have already been resolved.

The remaining result feels almost ordinary.

That ordinariness is frequently a sign of excellent engineering.

Elegant software often appears obvious in hindsight.

Once a difficult problem has been reduced to a clear solution, it becomes easy to underestimate the amount of thought required to arrive there. The simplicity of the outcome conceals the effort invested in achieving it.

This is one of the reasons good engineering often goes unnoticed.

Users notice failures.

Engineers notice instability.

Poor organisation demands constant attention.

Good engineering quietly allows everyone else to focus on their own work.

The Locomotion Engine should aspire to remove decisions wherever possible.

If contributors repeatedly face the same uncertainty, the project should ask why that uncertainty exists in the first place.

If understanding requires excessive explanation, perhaps the design itself should become clearer.

If navigating the engine feels difficult, perhaps the structure should improve rather than the documentation becoming longer.

Reducing unnecessary decisions is an act of engineering.

Every decision eliminated is one that never has to be made incorrectly.

Over time these small reductions produce remarkable improvements in the experience of working within the codebase.

Engineers spend less time navigating.

Less time second-guessing.

Less time recovering from accidental complexity.

More time solving meaningful problems.

Quiet engineering is not invisible because it lacks value.

It is invisible because its value has already been absorbed into the quality of the system.

That is a standard worth pursuing.

---

# Leave It Better Than You Found It

Large improvements are memorable.

Small improvements are transformative.

Most software projects do not become difficult to maintain because of one catastrophic decision. They become difficult because hundreds of tiny opportunities for improvement were ignored.

A confusing section remained confusing.

An unnecessary concept survived one more release.

A slightly awkward design became accepted simply because it already existed.

Technical debt often accumulates quietly.

Fortunately, improvement can happen the same way.

The Locomotion Engine encourages contributors to leave the codebase slightly better than they found it.

That improvement does not need to be dramatic.

Perhaps a piece of logic becomes easier to follow.

Perhaps an unnecessary concept disappears.

Perhaps a relationship becomes clearer.

Perhaps duplication is reduced.

Small improvements require little effort individually.

Over months and years they fundamentally change the character of a project.

This philosophy also changes how refactoring is viewed.

Refactoring is not an admission of failure.

It is evidence that understanding has improved.

As engineers learn more about the engine, better ways of expressing its ideas naturally emerge. The project should embrace that refinement rather than resisting it.

Continuous improvement prevents stagnation.

More importantly, it prevents fear.

When contributors believe that existing code cannot be improved, the project slowly becomes trapped by its own history. Every imperfect decision becomes permanent simply because changing it feels too expensive.

A healthy codebase never reaches that point.

It remains open to refinement while preserving the stability of its underlying principles.

Every contribution should therefore be viewed as an opportunity to improve not only the feature being developed, but the quality of the engine as a whole.

Great software is rarely created in one extraordinary effort.

It is built through thousands of thoughtful improvements that, over time, become impossible to separate from the project itself.

# Decision Making

Every engineer makes decisions continuously.

Some are small.

Some shape the direction of the project for years.

The quality of a software system is determined not only by the correctness of those decisions, but by the quality of the thinking that precedes them.

The Locomotion Engine encourages contributors to pause before reaching for a solution.

The first answer is not always the best answer.

The most obvious implementation is not always the simplest implementation.

The fastest path is not always the one that best serves the long-term health of the engine.

Professional engineering is often less about having immediate answers than it is about asking useful questions.

Good questions expose unnecessary complexity.

They reveal assumptions that have gone unnoticed.

They distinguish genuine requirements from convenient habits.

More importantly, they encourage deliberate engineering rather than reactive programming.

Whenever uncertainty exists, contributors should take a moment to ask themselves a small set of questions.

Can this become simpler?

If the solution feels larger than the problem, it probably is. Simplicity should always be considered before additional complexity becomes permanent.

Can this become data?

The Locomotion Engine is intentionally designed around data-driven thinking. Whenever behaviour appears to be hard-coded unnecessarily, consider whether the engine would become more flexible if the same knowledge were represented as data instead.

Does this belong in the engine?

The engine should provide reusable capability rather than application-specific behaviour. Before expanding the engine, consider whether the proposed addition genuinely strengthens the engine as a whole or merely serves one immediate need.

Does this belong in the game?

Not every useful idea belongs inside the engine. Many ideas are valuable precisely because they remain specific to a particular game. Allowing the game to own its own ideas keeps the engine focused and broadly reusable.

Will this still make sense next year?

Temporary convenience has a habit of becoming permanent architecture. Decisions should be evaluated not only for today's implementation, but for how understandable they will remain after the surrounding context has changed.

Am I solving today's problem, or inventing tomorrow's?

Engineers naturally enjoy anticipating future requirements.

Sometimes that foresight produces excellent architecture.

More often, it produces complexity that solves problems which never actually arrive.

The engine should evolve from demonstrated need rather than imagined possibility.

None of these questions exist to slow development.

They exist to improve it.

A few moments spent considering the shape of a solution can prevent months of unnecessary maintenance later. Thoughtful engineering almost always costs less than corrective engineering.

Over time these questions become instinctive.

Experienced engineers often appear to make good decisions quickly, but that speed usually comes from years of repeatedly asking themselves the same questions until those questions become second nature.

The Locomotion Engine should cultivate that habit.

Not because there is a checklist to complete before writing software, but because disciplined thinking consistently produces better software than hurried certainty.

---

# The Locomotion Standard

The quality of the Locomotion Engine will not ultimately be measured by the number of systems it contains, the sophistication of its algorithms, or the novelty of its ideas.

It will be measured by how well the engine endures.

An engineer encountering the project for the first time should feel welcomed rather than intimidated.

The structure should feel understandable.

The responsibilities should feel deliberate.

The relationships between systems should feel cohesive.

Growth should feel natural rather than forced.

Nothing should appear to exist simply because history happened to leave it there.

Locomotion-quality code is code that earns trust.

It is understandable because understanding should never depend upon institutional memory.

It is deliberate because every permanent concept should exist for a reason.

It is cohesive because individual systems should strengthen one another instead of competing with one another.

It is maintainable because software spends far longer being changed than being written.

It is consistent because predictability allows engineers to spend their effort solving real problems instead of navigating unnecessary variation.

It is extensible because the future is expected to bring new ideas, and the engine should welcome them without demanding reinvention.

It is approachable because a healthy project should invite contribution rather than discourage it.

These qualities reinforce one another.

As understanding improves, consistency becomes easier to maintain.

As consistency improves, simplicity becomes easier to recognise.

As simplicity improves, maintainability naturally follows.

Over time the codebase develops a character of its own.

That character should reflect the values of the engineers who built it.

Not through stylistic signatures or personal preferences, but through shared craftsmanship.

There will always be opportunities to write more software.

There will be fewer opportunities to build software that remains a pleasure to work with years after it was first created.

The Locomotion Engine chooses the second goal.

Every contribution should strengthen the engine not only for the feature it delivers today, but for every feature that will be built upon it tomorrow.

If contributors consistently leave the engine a little clearer, a little simpler, and a little easier to understand than they found it, the project will steadily become something greater than the sum of its individual changes.

That is the Locomotion standard.

Not perfection.

Not cleverness.

Not complexity.

Simply a quiet commitment to building software with care, so that years from now the engine still feels coherent, dependable, and welcoming to the next engineer who opens it.

And if that engineer can focus on creating great games instead of untangling yesterday's decisions, then this document has achieved exactly what it set out to do.

Part III — Naming & Vocabulary

Part III — Naming & Vocabulary
loadDefinitions()

createInstances()

Good function names make code read almost like prose.

world.createEntity();

eventQueue.dispatch(event);

renderer.renderWorld(world);

The intent is immediately obvious without requiring additional explanation.

Variable Naming

Variables are encountered more frequently than almost any other element of a codebase.

A developer may read thousands of variable names in a single day. Small improvements to variable naming therefore have a disproportionate impact on readability.

All variables use camelCase.

entity
entityId
entityDefinition
currentWorld
activeBehaviours
pendingEvents
resourceAmount
simulationTime

Variable names should describe the meaning of the value they contain rather than its type.

Prefer:

activeEntities

instead of:

entityArray

The fact that the value happens to be an array is an implementation detail.

Likewise:

worldLookup

is preferable to:

worldMap

if the responsibility is lookup rather than the underlying data structure.

Avoid encoding implementation into the name.

A developer should be able to change:

Map

to

Array

without renaming every variable.

Descriptive Names

Choose names that answer one simple question:

"What does this value represent?"

Good:

entityDefinition
currentFrame
elapsedTime
spawnLocation
remainingHealth
selectedEntity
visibleEntities

Poor:

value
data
temp
item
object
thing
info
stuff

These names communicate almost nothing.

Every time they appear, the reader must rediscover their meaning from surrounding code.

Good variable names eliminate that repeated work.

Avoid Single-Letter Variables

Single-letter variables should be treated as the exception rather than the rule.

Poor:

const e = createEntity();

Better:

const entity = createEntity();

Poor:

const d = loadDefinition();

Better:

const definition = loadDefinition();

The extra characters are insignificant compared to the clarity gained.

Avoid Unnecessary Abbreviations

Abbreviations increase cognitive load.

Avoid:

entDef
evtQueue
behMgr
cfg
ctx
tmpRes

Prefer:

entityDefinition
eventQueue
behaviourScheduler
configuration
context
temporaryResource

If the complete word remains readable, prefer the complete word.

When Short Names Are Acceptable

There are situations where short names improve readability rather than reduce it.

The most common example is a simple loop variable.

for (let i = 0; i < entities.length; i++)

or

for (const entity of entities)

Both are perfectly reasonable.

Likewise:

for (const x of points)

may be appropriate in a mathematical algorithm where x has a universally understood meaning.

The key distinction is scope.

The shorter the name, the shorter its lifetime should generally be.

Variables that exist for only one or two lines can often be concise.

Variables that persist across an entire function should usually be descriptive.

As a rough guideline:

Small scope permits shorter names.
Large scope demands clearer names.
Avoid Redundant Context

Do not repeat information already provided by the surrounding code.

Instead of:

class EntityRegistry {

    private entityRegistryDefinitions = [];

}

prefer:

class EntityRegistry {

    private definitions = [];

}

The class already establishes the context.

The variable only needs to describe its role within that context.

Constant Naming

Constants represent stable values that carry meaning.

Unlike ordinary variables, they communicate facts about the engine rather than temporary state.

All constants use SCREAMING_SNAKE_CASE.

MAX_ENTITY_COUNT

DEFAULT_WORLD_SIZE

FRAME_RATE

DEFAULT_CAMERA_ZOOM

INVALID_ENTITY_ID

Consistency is more important than personal preference.

Mixing styles quickly makes constants difficult to recognise.

Meaning Over Implementation

A constant should describe what the value represents.

Not how it happens to be used.

Good:

MAX_VISIBLE_ENTITIES

Poor:

ENTITY_ARRAY_LIMIT

The first expresses an architectural constraint.

The second exposes an implementation detail.

Likewise:

DEFAULT_RENDER_SCALE

is preferable to:

INITIAL_CANVAS_MULTIPLIER

if the concept being expressed is the default rendering scale.

Eliminate Magic Numbers

Numeric literals scattered throughout the code force readers to repeatedly ask:

"Why this value?"

Instead of:

if (distance > 250)

introduce meaning:

const MAX_INTERACTION_DISTANCE = 250;

if (distance > MAX_INTERACTION_DISTANCE)

The number has not changed.

Its meaning has become explicit.

Even well-known values benefit from explanation when they carry architectural significance.

Group Related Constants

Related constants should share consistent prefixes.

For example:

DEFAULT_WORLD_WIDTH

DEFAULT_WORLD_HEIGHT

DEFAULT_WORLD_SEED

or

MAX_ENTITY_COUNT

MAX_EVENT_QUEUE_SIZE

MAX_RESOURCE_STACK

Grouping creates predictable vocabulary.

Developers quickly learn where similar concepts are likely to appear.

Avoid unrelated collections of constants that gradually become dumping grounds for miscellaneous values.

If a group of constants has no obvious shared purpose, reconsider whether they belong together.

Boolean Naming

Boolean variables deserve more attention than they often receive.

Unlike other variables, a boolean answers a yes-or-no question.

Its name should therefore naturally read as a question whose answer is either true or false.

Poor boolean names force the reader to mentally translate the meaning every time they appear.

Good boolean names make conditionals read like plain English.

Compare:

if (visible)

with:

if (isVisible)

The second is immediately clearer.

It reads naturally:

Is visible?

rather than requiring interpretation.

Preferred Prefixes

The engine standardises on a small set of prefixes.

is

Represents a current state.

isVisible

isLoaded

isActive

isAlive

isPaused

isDirty
has

Represents possession or existence.

hasDefinition

hasBehaviour

hasChildren

hasIdentity

hasResources
can

Represents capability.

canMove

canRender

canSpawn

canUpdate

canInteract
should

Represents intention, policy, or a recommended action.

shouldRender

shouldRespawn

shouldUpdatePhysics

shouldDispatchEvent
was

Represents historical state.

wasLoaded

wasDestroyed

wasGenerated

wasModified
will

Represents expected future state.

willSpawn

willExpire

willRetry

willBeDestroyed

Each prefix communicates a different kind of meaning.

Using them consistently makes code substantially easier to scan.

Avoid Ambiguous Boolean Names

Poor examples include:

visible

enabled

player

ready

success

complete

render

loading

These require interpretation.

Better:

isVisible

isEnabled

hasPlayer

isReady

wasSuccessful

isComplete

shouldRender

isLoading

The goal is not simply grammatical correctness.

The goal is immediate comprehension.

Avoid Negatives Where Practical

Negative names often produce awkward conditionals.

Instead of:

if (!isNotReady)

prefer:

if (isReady)

Likewise:

if (!hasNoDefinition)

is significantly harder to read than:

if (hasDefinition)

Positive names reduce mental overhead.

Booleans Should Read Naturally

A useful test is to place the variable after the word if.

Good:

if (isVisible)

if (canSpawn)

if (hasDefinition)

if (shouldRender)

Poor:

if (visibility)

if (spawn)

if (definition)

if (render)

If the conditional sounds unnatural when read aloud, the boolean probably needs a better name.

Collection Naming

Collections represent groups of related objects.

Their names should clearly communicate both what they contain and whether they represent one or many.

Singular names represent one object.

Plural names represent multiple objects.

For example:

entity

entities
definition

definitions
behaviour

behaviours
resource

resources

This may seem obvious, but inconsistent pluralisation quickly makes code difficult to reason about.

Compare:

const entity = [];

with:

const entities = [];

The second communicates the collection immediately.

Developers should never need to inspect the type simply to determine whether something represents one item or many.

Collections should also describe the relationship between their members where appropriate.

Good examples include:

activeWorlds

visibleEntities

loadedDefinitions

pendingEvents

eventQueue

resourceDefinitions

Each name conveys both the contents and the reason those contents are grouped together.

Avoid vague collection names such as:

list

items

objects

collection

array

values

These describe the container rather than the meaning of its contents.

The type system already tells us whether something is an array, set, map, or queue.

The name should explain what the collection represents.

Enumeration Naming

Enumerations define a closed set of related values.

They should represent concepts rather than implementation details.

A well-named enumeration makes invalid states impossible while clearly communicating the available choices.

Enumeration names use PascalCase.

enum EntityState
enum ResourceType
enum EventPriority
enum CameraMode

The enumeration itself should describe the category.

The individual values should describe the members of that category.

Good:

enum EventPriority {

    Low,
    Normal,
    High,
    Critical

}

Reading the code is straightforward:

event.priority = EventPriority.High;

Likewise:

enum CameraMode {

    Free,
    Follow,
    Fixed

}

Avoid repeating the enumeration name within every value.

Poor:

enum CameraMode {

    CameraModeFree,
    CameraModeFollow,
    CameraModeFixed

}

The surrounding type already provides that context.

Likewise:

enum ResourceType {

    ResourceTypeHealth,
    ResourceTypeEnergy,
    ResourceTypeMana

}

should simply become:

enum ResourceType {

    Health,
    Energy,
    Mana

}

Redundant prefixes add noise without adding meaning.

Enumeration values should also avoid abbreviations.

Prefer:

NorthWest

instead of:

NW

Prefer:

VeryHigh

instead of:

VH

If a value requires explanation to understand its meaning, the name should usually be improved rather than documented elsewhere.

Finally, enumeration values should represent concepts rather than implementation.

Avoid:

enum StorageType {

    HashMap,
    Array,
    LinkedList

}

unless the implementation strategy itself genuinely forms part of the domain.

Prefer names that remain correct if the implementation changes.

Event Naming

Events communicate that something meaningful has occurred.

Their names should clearly describe that occurrence.

An event should never require the reader to inspect the dispatcher before understanding what happened.

Good event names describe completed facts.

Examples include:

EntityCreated

EntityDestroyed

BehaviourAdded

BehaviourRemoved

WorldLoaded

WorldUnloaded

DefinitionRegistered

ResourceConsumed

ResourceTransferred

RuleValidated

These names answer a simple question:

"What happened?"

They do not describe who handled the event or what should happen next.

Events represent occurrences.

They are not commands.

Compare:

Good:

EntityDestroyed

Poor:

DestroyEntity

The first describes something that already happened.

The second is an instruction.

Likewise:

Good:

ResourceConsumed

Poor:

ConsumeResource

The distinction becomes especially important when events are dispatched across multiple systems.

Every subscriber should receive the same understanding:

"This has already happened."

Prefer Past Tense

Completed events should generally use the past tense.

EntitySpawned

DefinitionLoaded

RuleEvaluated

WorldGenerated

StateChanged

Past tense communicates certainty.

The event records history rather than requesting action.

Name the Meaningful Outcome

Avoid naming events after low-level implementation details.

Poor:

ArrayUpdated

MapInserted

DictionaryChanged

These reveal how the system currently works rather than what actually occurred.

Instead:

EntityRegistered

DefinitionLoaded

ResourceAdded

EventQueued

The implementation is free to evolve.

The meaning remains stable.

Avoid Generic Event Names

Poor:

Changed

Updated

Modified

Processed

Handled

Finished

Without surrounding context these communicate almost nothing.

Compare:

Changed

versus

EntityStateChanged

The second immediately tells the reader what actually changed.

A useful guideline is that an event name should still be understandable when read completely in isolation.

File Naming

File names should describe the primary responsibility contained within the file.

A developer browsing the project should be able to locate code through names alone without needing to open each file.

Where a file contains one primary class, the file should generally share its name.

For example:

Entity.ts

contains:

class Entity

Likewise:

World.ts

contains:

class World

and

EventQueue.ts

contains:

class EventQueue

This one-to-one relationship makes navigation almost effortless.

Searching for a class naturally finds the corresponding file.

Avoid vague file names such as:

Helpers.ts

Utilities.ts

Common.ts

General.ts

Misc.ts

Functions.ts

Code.ts

These communicate almost nothing about their contents.

Over time they tend to become repositories for unrelated code.

A file should represent a coherent responsibility.

If a suitable file name cannot be chosen, that often indicates the contents themselves lack a clear responsibility.

Likewise, avoid implementation-driven file names.

Poor:

EntityMap.ts

Better:

EntityRegistry.ts

The second remains correct regardless of how entities are stored internally.

Files should also avoid unnecessary numbering.

Poor:

System1.ts

System2.ts

Utilities2.ts

RendererNew.ts

Names that depend upon chronology rarely survive long.

Instead, choose names that describe purpose.

Good examples include:

WorldRenderer.ts

ResourceDefinition.ts

BehaviourScheduler.ts

DefinitionLibrary.ts

EventDispatcher.ts

A file name should answer the same question as every other name in the engine:

"What responsibility lives here?"

Avoiding Bad Names

Some names appear in almost every codebase.

Most of them begin life as temporary placeholders.

Many survive for years.

These names are not always wrong, but they should be treated with suspicion because they often conceal responsibilities that have not yet been properly understood.

Manager

Perhaps no suffix is overused more than Manager.

EntityManager

WorldManager

BehaviourManager

What exactly does a manager do?

Does it create?

Destroy?

Update?

Schedule?

Store?

Validate?

Coordinate?

The name provides almost no useful information.

Replace it with the actual responsibility.

Instead of:

EntityManager

consider:

EntityRegistry

EntityFactory

EntitySpawner

EntityRepository

EntityScheduler

Each describes a specific purpose.

There are situations where manager genuinely represents the domain language.

Those situations are rare.

It should never become the default suffix for "a class that does things."

Handler

Handler often indicates that responsibility has not yet been identified.

Instead of:

InputHandler

ask:

Does it read input?

Translate input?

Dispatch input?

Buffer input?

Validate input?

A more precise name almost always exists.

Examples:

InputDispatcher

InputTranslator

InputReader

InputRouter

Each communicates substantially more information.

Util / Utility

Utility classes deserve particular scrutiny.

A file named:

Utilities

usually means:

"We didn't know where else to put this."

Large utility classes gradually become collections of unrelated functions.

This increases coupling and makes code difficult to discover.

Instead of creating a utility, ask:

What responsibility actually owns this behaviour?

The correct location often becomes obvious.

Misc

No production file should ever be named:

Misc

or

Miscellaneous

These names explicitly communicate that the contents have no coherent responsibility.

That is an architectural smell.

Helper

Helper suffers from the same problem.

Helping is not a responsibility.

It describes a relationship.

Poor:

RenderHelper

Better:

SpriteRenderer

CanvasRenderer

ColourConverter

TextureGenerator

Describe what the class actually does.

Data

Appending Data rarely adds meaning.

Compare:

EntityData

versus

EntityState

The second immediately communicates architectural intent.

Likewise:

DefinitionData

is usually weaker than:

Definition

The reader already understands that a definition contains data.

The suffix contributes little.

Temp

Temporary names have a remarkable ability to become permanent.

Avoid:

temp

temporaryThing

newEntity

oldDefinition

latestStuff

Choose the correct name immediately whenever practical.

Future refactoring often never happens.

Thing, Stuff, Item and Object

These words communicate almost nothing.

thing

stuff

item

object

are placeholders, not meaningful names.

Replace them with the concept they actually represent.

Instead of:

item

consider:

entity

resource

definition

event

instance

Precision almost always improves readability.

When Generic Names Are Appropriate

Generic names are not universally forbidden.

They simply need genuine domain meaning.

For example:

Event

Entity

Resource

Definition

Instance

are intentionally generic because they represent foundational architectural concepts.

Likewise:

value

index

key

can be perfectly appropriate within a small local scope where their meaning is obvious.

The problem is not generic language.

The problem is generic language that hides responsibility.

Consistency Over Preference

Every developer has naming preferences.

Some prefer shorter names.

Some prefer longer names.

Some prefer one term over another simply because it feels more familiar.

Individual preference is inevitable.

Project consistency is more valuable.

A perfectly reasonable name may still be changed if it conflicts with the vocabulary already established elsewhere in the engine.

For example, both of these may be technically acceptable:

Blueprint

and

Definition

However, if the architecture has already adopted Definition, introducing Blueprint creates unnecessary translation.

Developers now have to remember whether the two terms are interchangeable.

The architecture has already answered that question.

There should be one term.

The same principle applies throughout the codebase.

Once a pattern has become established, prefer extending that pattern over introducing an equally valid alternative.

Consistency reduces decisions.

Fewer decisions reduce cognitive load.

Reduced cognitive load makes the engine easier to understand.

The objective is not to choose the perfect name every time.

The objective is to make the entire codebase feel like it was written by one careful engineer rather than dozens of independent authors.

The Naming Test

Before introducing any new name, pause for a moment and ask a few simple questions.

Does the name describe the responsibility rather than the implementation?
Would another developer understand it immediately?
Is it consistent with the existing architectural vocabulary?
Does it still make sense without knowing how it is implemented?
Will it still make sense five years from now?
Is there already an established architectural term for this concept?
Does the name reveal its purpose without requiring additional explanation?
Would changing the implementation force the name to change?

If any answer gives pause, spend another minute exploring alternatives.

That minute is almost always a worthwhile investment.

Names are read far more often than they are written.

Every improvement made today will be encountered thousands of times throughout the lifetime of the engine.

Good naming is therefore not an exercise in style.

It is an investment in clarity.

Every well-chosen name reduces friction.

Every consistent term strengthens the architecture.

Every precise piece of vocabulary makes the codebase easier to navigate, easier to maintain, and easier to evolve.

The Locomotion Engine should feel coherent at every level of implementation.

That coherence begins with the words chosen to describe it.

Part IV

Part IV — Organising the Engine
Purpose

The organisation of a codebase is one of its most important architectural assets.

Good organisation allows engineers to spend their time solving problems instead of searching for solutions that already exist. It reduces uncertainty, encourages consistency, and makes the structure of the engine understandable long before any individual implementation is examined.

Poor organisation has the opposite effect.

Every misplaced system introduces uncertainty.

Every duplicated responsibility creates confusion.

Every ambiguous location forces contributors to stop and ask where something belongs.

Individually these decisions seem insignificant. Collectively they become one of the largest long-term costs of software development.

As a project grows, implementation becomes increasingly dependent upon navigation. Contributors spend far more time reading existing code than writing new code. A well-organised engine makes that reading effortless by creating clear expectations about where responsibilities live and how systems relate to one another.

Organisation therefore serves two purposes.

First, it reduces maintenance effort by ensuring that related systems evolve together rather than drifting apart.

Second, it improves discoverability by allowing contributors to predict where code should exist before they begin searching.

The result is a codebase that becomes easier to understand as familiarity grows instead of requiring constant rediscovery.

Organisation is also one of the primary tools used to control complexity.

Complexity cannot always be eliminated. Modern game engines inevitably contain many interacting systems, each with its own responsibilities and behaviours. What can be controlled is how that complexity is presented.

A well-organised engine presents complexity in manageable pieces.

Responsibilities are grouped logically.

Relationships are clear.

Boundaries are visible.

The overall system remains understandable because no single part attempts to explain everything.

This chapter establishes the organisational principles that govern the Locomotion Engine. Its purpose is not to prescribe specific implementations, but to ensure that every responsibility has an obvious place within the engine and that the structure remains coherent as the project evolves over many years.

The Principle of One Obvious Home

Every responsibility should have one obvious home.

This is the central organisational principle of the Locomotion Engine.

When a contributor encounters a new responsibility, there should be one natural location where it belongs. Likewise, when another contributor needs to find that responsibility months or years later, they should arrive at the same location without uncertainty.

Organisation succeeds when prediction becomes possible.

If finding code requires guessing between several plausible locations, the organisation has already begun to fail.

For example, if functionality relating to resource management might reasonably exist within a resource system, a world system, a utility collection, or a general helper module, then none of those locations truly owns the responsibility. The architecture has become ambiguous.

Ambiguity is expensive.

It encourages duplicate implementations because engineers cannot confidently determine whether a solution already exists.

It slows development because contributors spend increasing amounts of time searching rather than building.

It also weakens consistency, as different engineers naturally choose different locations for similar work.

The preferred solution is almost always to strengthen organisational boundaries rather than introduce another location.

Every responsibility should have a recognised owner.

Every concept should have a recognised home.

Every system should have clearly understood boundaries.

This principle applies equally to small and large responsibilities.

A mathematical operation belongs with mathematical responsibilities.

Rendering capability belongs with rendering.

Input processing belongs with input.

Procedural generation belongs with procedural systems.

The location should feel inevitable rather than merely acceptable.

There will occasionally be responsibilities that appear to span multiple systems.

Rather than allowing shared ownership, the engine should determine which responsibility is primary. Supporting systems may collaborate, but ownership remains singular.

The objective is not rigid categorisation for its own sake.

The objective is removing doubt.

Every decision that eliminates organisational ambiguity makes the engine easier to understand, easier to maintain, and significantly easier to evolve.

Organising by Responsibility

The Locomotion Engine is organised according to responsibility rather than implementation technique.

Responsibilities tend to remain remarkably stable over time.

Rendering remains rendering regardless of whether pixels are drawn using one browser API or another.

Input remains input regardless of how hardware events are delivered.

Resource management remains resource management regardless of how resources are stored internally.

Implementation techniques evolve.

Responsibilities endure.

For this reason, the organisational structure of the engine should reflect what systems are responsible for rather than how they currently achieve those responsibilities.

This distinction is subtle but important.

An implementation-oriented organisation often begins by grouping code according to language features, programming techniques, or temporary technical choices.

Examples include structures such as:

Helpers
Managers
Services
Implementations
Adapters
Utilities

While these names may describe how something currently works, they rarely explain why the responsibility exists.

As implementations evolve, these categories gradually lose meaning.

Responsibilities, however, remain understandable.

A rendering system is responsible for presentation.

An input system is responsible for interpreting user interaction.

A procedural system is responsible for generation.

These responsibilities continue to make sense even if every line of implementation is eventually rewritten.

Organising around responsibility therefore produces a structure that survives technological change.

For example, imagine that the engine initially renders everything using one graphics approach and later adopts an entirely different rendering strategy.

If the organisation is based upon rendering responsibility, almost nothing changes structurally.

Only the implementation evolves.

Conversely, if the organisation reflects the original implementation technique, a technological improvement may require widespread reorganisation despite the architectural responsibilities remaining identical.

Technology should fit within the organisation.

The organisation should never be rebuilt around the technology.

Responsibility provides the stable framework within which implementation is free to evolve.

Engine Before Game

One of the most important organisational boundaries within the Locomotion Engine is the separation between the engine and the game.

This boundary is constitutional rather than optional.

The engine exists to provide reusable capability.

The game exists to apply that capability toward a specific creative experience.

Although both are developed together, they remain fundamentally different responsibilities.

When introducing new functionality, contributors should first ask a simple question:

Is this solving a general engineering problem, or is it solving a problem unique to this game?

If the capability could reasonably support many different games, it most likely belongs within the engine.

If the functionality exists solely because of the rules, mechanics, or content of the current game, it belongs within the game.

For example:

A camera capable of following any entity is an engine capability.

A camera that permanently knows how to follow the player's companion creature is game behaviour.

A generic inventory framework belongs within the engine.

Knowledge that a whimsical mushroom occupies one inventory slot belongs within the game.

A procedural terrain generator capable of generating many environments belongs within the engine.

Knowledge of a specific enchanted forest used by the first game belongs within the game.

The distinction is not based upon complexity.

It is based upon responsibility.

The engine provides possibilities.

The game chooses how those possibilities are used.

This separation protects both projects.

The engine remains reusable because it accumulates only general capabilities.

The game remains flexible because it can evolve independently without forcing unrelated architectural changes into the engine.

Whenever uncertainty exists, contributors should favour keeping knowledge within the game until a genuinely reusable capability becomes apparent.

Generalisation should arise from demonstrated reuse rather than anticipation.

A capability that has proven useful across multiple situations is usually ready to become part of the engine.

One that exists solely to satisfy a single mechanic rarely is.

Protecting this boundary prevents the gradual accumulation of gameplay assumptions inside engine systems.

Once those assumptions become embedded, they become increasingly difficult to remove.

Maintaining a strict separation preserves the long-term independence of both the engine and every game built upon it.

Layering the Engine

Although the engine is composed of many systems, those systems do not all occupy the same level of responsibility.

Some provide fundamental capabilities upon which everything else depends.

Others combine those capabilities into increasingly specialised behaviour.

Organising the engine into layers provides a clear direction for these relationships.

Each layer builds upon more fundamental responsibilities without reversing that dependency.

A conceptual layering of the engine might resemble the following progression:

Core
Utilities
Math
Simulation
Rendering
Input
Resources
Procedural
Debug
Game

These layers should be understood as responsibilities rather than rigid implementation packages.

Their purpose is to clarify the general direction of the architecture.

Core

The Core layer contains the most fundamental engine responsibilities.

It establishes the foundation upon which every other part of the engine depends.

Core systems should possess minimal knowledge of higher-level concepts and remain broadly useful throughout the entire engine.

Because of their foundational nature, changes to the Core layer should be made deliberately and infrequently.

Utilities

Utilities provide small, broadly reusable capabilities that support many parts of the engine without becoming responsible for higher-level behaviour.

Utility code should remain focused, cohesive, and genuinely general.

Utilities are not an alternative home for uncertain responsibilities.

They exist only for capabilities whose primary purpose is broad reuse across otherwise unrelated systems.

Math

The Math layer provides the mathematical concepts required throughout the engine.

Geometry, vectors, matrices, interpolation, and other mathematical responsibilities belong here because they represent enduring foundations rather than gameplay features.

Mathematics should remain independent of simulation, rendering, and gameplay knowledge.

Simulation

The Simulation layer is responsible for the evolving state of the world.

It governs the progression of the engine's conceptual model through time without concerning itself with how that state is presented to the player.

Simulation describes reality.

Rendering describes appearance.

Maintaining this distinction preserves architectural clarity.

Rendering

Rendering is responsible for presenting the current state of the engine.

It observes simulation rather than controlling it.

Its purpose is to transform conceptual state into visible output while remaining independent of gameplay decisions.

Rendering should understand how to display information.

It should not determine what that information means.

Input

Input is responsible for interpreting interaction originating outside the engine.

Its responsibility ends once meaningful engine input has been established.

What those inputs ultimately accomplish belongs elsewhere.

An input system should recognise that a particular action has occurred.

It should not decide that pressing a key means attacking an enemy, opening a menu, or interacting with an object.

Those interpretations belong to higher-level responsibilities.

Resources

The Resources layer manages reusable conceptual resources required by the engine.

Its responsibility is the acquisition, storage, lifetime, and accessibility of those resources rather than the gameplay meaning attached to them.

It should remain broadly applicable across different games.

Procedural

The Procedural layer is responsible for generating rather than storing.

World generation, procedural assets, deterministic randomness, and reusable generation systems naturally belong here because they share a common responsibility regardless of the specific content being generated.

Debug

The Debug layer exists to improve understanding of the engine during development.

Its responsibilities support engineering rather than gameplay.

Whenever practical, debug systems should observe existing behaviour rather than altering it.

Game

The Game layer sits above the reusable engine.

It combines engine capabilities into one specific application.

This is where gameplay rules, mechanics, progression, content, and creative decisions naturally belong.

The Game depends upon the engine.

The engine does not depend upon the Game.

This direction of dependency is fundamental.

Lower layers should never require knowledge of higher layers in order to perform their responsibilities.

A mathematical system should never depend upon gameplay.

Rendering should not depend upon specific mechanics.

Core systems should remain completely unaware of the game built upon them.

This one-directional flow produces an architecture that remains stable as the engine expands.

Each layer strengthens the foundation for the layers above it without becoming coupled to responsibilities beyond its own scope.

Cohesion Over Convenience

Every system should contain responsibilities that naturally belong together.

Cohesion is the measure of how closely related those responsibilities are.

A highly cohesive system feels focused.

Its purpose can be described clearly in a single sentence.

Its contents naturally reinforce one another.

Its boundaries are easy to recognise.

Low cohesion usually develops gradually.

A contributor needs somewhere to place a small piece of functionality, notices an existing system that is "close enough," and adds it there for convenience.

The next contributor does the same.

Over time, the system accumulates responsibilities that happen to coexist without actually belonging together.

Eventually no one can clearly explain what the system is responsible for.

This pattern often creates what engineers informally describe as a dumping ground.

The file or system continues to grow because it already contains "a little bit of everything."

Convenience slowly replaces design.

A common example is a system that begins life managing world state but gradually acquires unrelated helper routines, rendering support, procedural generation shortcuts, content loading, and miscellaneous calculations simply because those responsibilities were nearby.

At that point the system no longer possesses a coherent identity.

It has become a container for convenience rather than responsibility.

The correct response is not to continue expanding the system.

The correct response is to restore cohesion.

Responsibilities that naturally belong elsewhere should be moved.

New responsibilities should be introduced where they strengthen the organisational structure rather than weaken it.

A cohesive engine is easier to understand because each system has a clear purpose.

Contributors learn to associate responsibilities with predictable locations instead of memorising historical accidents.

Organisation becomes intuitive rather than arbitrary.

Separation of Concerns

A well-organised engine is composed of systems that understand their own responsibilities without needing to understand everyone else's.

This is the essence of separation of concerns.

Each system should focus on one coherent area of responsibility while relying upon clearly defined relationships with neighbouring systems. The objective is not isolation for its own sake, but independence where independence provides long-term value.

When responsibilities become intertwined, every change becomes more expensive.

A modification intended for one system unexpectedly affects another.

A new feature requires understanding multiple unrelated areas of the engine.

Simple refactoring becomes risky because boundaries have become blurred.

These costs rarely appear immediately.

They accumulate gradually until the engine becomes difficult to reason about.

Good organisational boundaries prevent this accumulation.

Each system should expose only the responsibilities that naturally belong to it.

Internal decisions should remain internal.

Neighbouring systems should depend upon stable responsibilities rather than incidental implementation details.

This allows systems to evolve independently without forcing widespread structural change.

Coupling should therefore be deliberate rather than accidental.

Some degree of collaboration is inevitable.

Rendering requires simulation state.

Gameplay reacts to input.

Procedural systems produce data that other systems consume.

These relationships are natural because they reflect genuine architectural responsibilities.

What should be avoided are hidden dependencies.

Hidden dependencies occur when a system quietly assumes knowledge that is owned elsewhere.

Perhaps a rendering system silently relies upon gameplay state that is not part of its responsibility.

Perhaps a utility function assumes details about world simulation.

Perhaps procedural generation reaches directly into unrelated systems to obtain information it should not require.

These assumptions are dangerous because they are invisible.

Nothing in the organisational structure communicates that the dependency exists.

Contributors discover it only when making changes that unexpectedly break unrelated behaviour.

The organisational structure should therefore make important relationships obvious.

If two systems depend heavily upon one another, that dependency should be visible through their responsibilities rather than concealed inside implementation.

Circular relationships deserve particular attention.

If System A cannot exist without System B, while System B cannot function without System A, the architecture should be questioned.

Circular dependencies often indicate that one responsibility has been divided incorrectly or that two systems should be reorganised into a more coherent structure.

Breaking these cycles improves flexibility.

Independent systems are easier to replace.

They are easier to extend.

They are easier to understand because each can be reasoned about largely on its own.

Clear separation of concerns does not eliminate collaboration.

It ensures that collaboration occurs through well-understood architectural boundaries rather than through accidental entanglement.

Growth Without Chaos

Every successful engine grows.

New systems are introduced.

Existing capabilities expand.

Additional games place new demands upon the architecture.

Growth is expected.

Chaos is optional.

The difference lies in how new responsibilities are incorporated into the existing organisation.

The preferred approach is always to extend the current structure before introducing an entirely new one.

If a responsibility naturally belongs within an existing organisational area, that area should evolve to accommodate it.

Growth strengthens the existing architecture rather than creating competing alternatives.

Parallel structures should be regarded with suspicion.

For example, if one procedural generation system already exists, introducing a second independent procedural framework simply because it appears more convenient is rarely the correct solution.

The result is not additional capability.

The result is duplicated responsibility.

Future contributors are forced to determine which framework should be used.

Both evolve independently.

Consistency begins to erode.

The same principle applies to any organisational responsibility.

One event system is easier to understand than two.

One resource management approach is easier to maintain than several partially overlapping ones.

One rendering architecture is preferable to competing rendering paths unless the architecture intentionally supports distinct responsibilities.

Growth should therefore reinforce established patterns rather than compete with them.

Occasionally the existing organisation genuinely no longer reflects the responsibilities of the engine.

Perhaps a subsystem has grown beyond its original purpose.

Perhaps a previously unified responsibility has matured into several distinct areas.

In these situations, expansion is not always the correct answer.

Reorganisation may provide a better long-term outcome.

Thoughtful reorganisation strengthens clarity.

Uncontrolled expansion weakens it.

Contributors should therefore be willing to improve the structure itself rather than continually adding new layers around existing problems.

Refactoring the organisation is often less expensive than permanently maintaining an awkward structure created to avoid temporary inconvenience.

Healthy growth preserves coherence.

As the engine becomes larger, it should also become more predictable.

Each new capability should feel like a natural extension of the architecture that already exists rather than the beginning of an entirely new organisational philosophy.

Temporary Code

Every long-lived project contains temporary work.

Experiments are performed.

Ideas are explored.

Alternative approaches are evaluated.

Early implementations are created to answer engineering questions before permanent solutions are justified.

Temporary code is not a problem.

Forgetting that it is temporary is.

Prototype implementations should exist with a clear understanding of their purpose.

Their objective is to learn.

They are not architectural commitments.

Likewise, experimental systems should remain recognisable as experiments.

They should not quietly evolve into permanent engine foundations simply because they happen to function.

The longer temporary code survives, the more difficult it becomes to replace.

Other systems begin depending upon it.

Assumptions accumulate.

Eventually removing the temporary implementation appears more expensive than keeping it.

At that point the engine has unintentionally accepted a permanent architectural decision without ever consciously making one.

The Locomotion Engine should avoid this pattern.

Temporary solutions should have an expected destination.

They should become one of three things:

A permanent implementation.
A redesigned implementation informed by what was learned.
Deleted code.

Remaining indefinitely in a temporary state is not an acceptable outcome.

The same principle applies to feature branches and experimental development.

Experiments should teach the engine something.

Once that learning has been incorporated, the temporary work should either be integrated appropriately or discarded.

TODOs deserve similar discipline.

A TODO is not documentation.

It is a promise that the current implementation is incomplete.

Every TODO therefore represents engineering debt.

Some debt is entirely reasonable.

Large projects occasionally defer work deliberately in order to maintain momentum.

What should never happen is allowing TODOs to become permanent landmarks that every contributor simply learns to ignore.

A TODO should eventually become completed work or removed because it no longer reflects reality.

There should be no third category.

Temporary work is valuable because it accelerates learning.

It becomes harmful only when it quietly becomes permanent through neglect rather than deliberate engineering judgement.

The Cost of Convenience

Many organisational problems begin with decisions that appear entirely reasonable at the time.

A contributor needs somewhere to place a small helper.

A miscellaneous folder already exists.

Another engineer copies an existing implementation because modifying the original appears risky.

Someone creates a temporary folder while reorganising a subsystem.

Each decision saves a few minutes.

Collectively they cost years.

Convenience is rarely dangerous in isolation.

Its danger lies in repetition.

One miscellaneous folder becomes two.

Utility collections begin accepting unrelated functionality because they are easy to find.

Large source files continue expanding because adding another few hundred lines appears easier than introducing a new responsibility.

Eventually the organisation reflects history instead of design.

Several patterns deserve particular caution.

Utility classes becoming dumping grounds.

A utility should exist because a capability is genuinely general.

It should not become the default destination for anything that lacks an obvious home.

If a utility collection continually grows, the more likely explanation is not that every responsibility is universally useful, but that organisational boundaries need strengthening.

Miscellaneous folders.

"Misc" does not describe responsibility.

It describes uncertainty.

If a responsibility cannot be classified more precisely, the correct response is usually to improve the organisational model rather than create a permanent location for uncategorised code.

Temporary folders becoming permanent.

Structures created to support short-lived work should disappear once that work is complete.

If they remain indefinitely, they gradually become accepted parts of the architecture despite never being intentionally designed.

Large files with unrelated responsibilities.

File size alone is not a problem.

A large file that remains highly cohesive may be entirely appropriate.

A smaller file containing several unrelated responsibilities is considerably more harmful because contributors cannot predict what belongs there.

Organisation should follow responsibility, not line count.

Copy-and-paste solutions.

Duplicated implementations create multiple organisational homes for the same responsibility.

The first copy may appear harmless.

The fifth guarantees inconsistency.

Changes must now be repeated everywhere, and contributors cannot know which version represents the intended behaviour.

Parallel implementations.

Two systems performing substantially the same responsibility inevitably diverge.

Different engineers improve different versions.

Documentation becomes ambiguous.

Maintenance effort doubles while clarity decreases.

These patterns rarely announce themselves dramatically.

They emerge gradually through repeated acts of convenience.

Architectural clarity is therefore not lost in one large decision.

It is eroded through hundreds of small ones.

Protecting the organisation requires recognising these patterns early and correcting them before they become accepted parts of the engine's structure.

Reducing Cognitive Load

One of the most valuable qualities of a well-organised engine is that it reduces the amount of information contributors must actively remember.

Human attention is limited.

Every moment spent searching for code, questioning where a responsibility belongs, or attempting to understand an inconsistent structure is attention that cannot be spent solving engineering problems.

The organisation of the engine should therefore minimise unnecessary mental effort.

Navigation should feel predictable.

When a contributor looks for a rendering system, they should know where to begin.

When introducing procedural functionality, its destination should already be apparent.

Finding code should rely on architectural understanding rather than historical knowledge.

Consistency plays a central role in achieving this.

Once contributors learn how one area of the engine is organised, that knowledge should transfer naturally to other areas.

Patterns should repeat because repeating patterns reduce the amount of new information that must be learned.

Discoverability is equally important.

A system should not merely exist.

Its existence should be obvious.

Its responsibility should be understandable from its surrounding context.

Its relationship to neighbouring systems should make intuitive sense.

Good organisation creates confidence.

Contributors become increasingly willing to improve existing systems because they understand how the pieces fit together.

Poor organisation creates hesitation.

Even experienced engineers become reluctant to make changes when they cannot confidently predict the consequences.

The ideal organisational structure eventually becomes invisible.

Engineers stop thinking about where things are located because the answer is consistently obvious.

Their attention shifts entirely toward designing better systems, solving more interesting problems, and improving the engine itself.

That is the true objective of organisation.

Not complexity hidden behind folders.

Not hierarchy for its own sake.

Simply an environment in which engineering thought is directed toward creation rather than navigation.

The Organisation Test

Every organisational decision is an investment.

Unlike many implementation details, organisational choices influence every future contributor who must navigate, understand, modify, or extend the engine.

A few minutes spent making a thoughtful organisational decision can save hundreds of hours over the lifetime of the project.

Before introducing a new system, contributors should pause and ask a small number of practical questions.

Does this already have a natural home?
Am I creating a duplicate responsibility?
Would another engineer know where to find this?
Does this belong in the engine or the game?
Is this improving organisation or merely avoiding refactoring?
Will this structure still make sense several years from now?

None of these questions require perfect foresight.

They simply encourage deliberate engineering rather than reactive growth.

If the answer to several of these questions is uncertain, the organisation probably deserves further thought before new code is introduced.

Conversely, when every answer feels obvious, the organisational structure is likely serving its purpose well.

The objective is not to create an elaborate taxonomy or a rigid set of rules that discourages progress.

The objective is to make good decisions easy.

A contributor should rarely wonder where new work belongs because the existing structure should already provide the answer.

Over time, these small decisions accumulate.

Each responsibility placed in its natural home strengthens the architecture.

Each unnecessary duplication weakens it.

Each thoughtful reorganisation improves the engine's ability to accommodate future growth.

Organisation is therefore not administrative work performed around engineering.

It is engineering.

A well-organised engine is easier to understand, easier to extend, easier to maintain, and more resilient to change than one whose structure evolved through convenience alone.

The Locomotion Engine should strive for an organisation that feels inevitable.

Every responsibility should have one obvious home.

Every system should have a clear purpose.

Every contributor should be able to navigate the engine with confidence.

When that becomes true, the structure itself begins to disappear, leaving only the engineering problems that genuinely deserve attention.

Part V — Writing Good Code

Part V — Writing Good Code
Purpose

Code is one of the longest-lived assets within a software project.

While individual features may come and go, the code that enables them often remains for years, evolving alongside the engine through hundreds or thousands of modifications. Every line written today becomes part of the environment in which future work will occur.

For that reason, code should never be written solely to solve today's problem.

It should also help solve tomorrow's.

Poorly written code rarely announces itself immediately. It compiles. It runs. It may even perform well. Its true cost appears later, when a bug needs to be fixed, a feature must be added, or another engineer attempts to understand how the system works.

At that point, every unnecessary complication becomes interest on technical debt.

Simple changes become risky.

Small fixes require extensive investigation.

Confidence decreases.

Development slows.

Over the lifetime of a project, the cost of maintaining code almost always exceeds the cost of writing it. A function that takes five minutes to create may be read hundreds of times, modified dozens of times, and relied upon for many years.

Code is therefore read far more often than it is written.

This simple observation should influence every engineering decision.

When writing code, the primary audience is not the compiler.

It is the next person who must understand it.

Very often, that person is yourself.

The objective of the Locomotion Engine is not merely to produce working software.

It is to produce software that remains understandable, adaptable, and enjoyable to maintain throughout the lifetime of the engine.

Maintainability is therefore treated as a primary engineering quality rather than a desirable side effect.

Every engineering decision should ask the same question:

Will this make the engine easier to understand and evolve five years from now?

If the answer is no, a better solution should be sought.

Readability First

Computers are remarkably good at understanding complicated code.

People are not.

Modern JavaScript engines and TypeScript transpilers perform sophisticated optimisation. They analyse control flow, eliminate unnecessary work, inline functions, and optimise execution in ways that would be impractical to perform manually.

Engineers should not attempt to compete with decades of compiler research.

Instead, they should optimise for the thing compilers cannot optimise:

Human understanding.

Readable code reduces cognitive load.

Instead of spending mental effort deciphering how something works, the reader can focus on why it exists and whether it is correct.

This improves development speed, debugging, refactoring, and long-term maintenance.

Whenever two implementations are functionally equivalent, preference should be given to the one that is easier to understand.

Consider the following.

Poor:

const r = entities.filter(e => e.active).map(e => e.position).reduce((a, b) => ({
    x: a.x + b.x,
    y: a.y + b.y
}));

Although compact, the reader must mentally evaluate several transformations before understanding the outcome.

A more readable implementation separates each idea.

Better:

const activeEntities = entities.filter(entity => entity.active);

const positions = activeEntities.map(entity => entity.position);

const totalPosition = positions.reduce((total, position) => ({
    x: total.x + position.x,
    y: total.y + position.y
}));

It occupies more lines.

It requires significantly less thought.

The additional whitespace is not waste.

It is clarity.

Likewise, descriptive variables often communicate intent better than complex expressions.

Poor:

if (!player || player.health <= 0 || !player.isAlive) {
    return;
}

Better:

const playerCannotAct =
    player === null ||
    player.health <= 0 ||
    !player.isAlive;

if (playerCannotAct) {
    return;
}

The condition now has a name.

Future modifications become safer.

Readers immediately understand what the condition represents instead of repeatedly interpreting its individual components.

Readable code should also follow natural flow.

Avoid forcing readers to jump backwards through a function simply to understand the current line.

Whenever practical:

Declare values before they are used.
Keep related logic together.
Minimise unnecessary indirection.
Prefer straightforward control flow.

The objective is not cleverness.

It is effortless understanding.

When another engineer opens a file for the first time, they should feel as though the code is introducing itself.

Nothing should require solving.

One Responsibility

Every piece of code should have one clear reason to exist.

Functions, objects, and systems naturally become more complicated over time. New requirements appear. Edge cases emerge. Small additions accumulate until something that originally solved one problem is quietly solving five.

This rarely happens intentionally.

Complexity grows one small change at a time.

The best defence is continually asking a simple question:

What is this code responsible for?

If the answer requires the word "and" several times, the responsibility has probably become too broad.

Consider a function responsible for updating an entity.

Poor:

function updateEntity(entity: Entity): void {
    updateMovement(entity);
    updateAnimation(entity);
    detectCollisions(entity);
    playFootstepAudio(entity);
    saveEntityStatistics(entity);
    updateAchievements(entity);
    displayDebugInformation(entity);
}

The function no longer has a single responsibility.

It has become a collection of unrelated tasks that merely happen to occur together.

Each additional responsibility increases the likelihood that future changes will affect unrelated behaviour.

A better approach separates concerns into clearly defined responsibilities.

function updateEntity(entity: Entity): void {
    updateMovement(entity);
    updateAnimation(entity);
    detectCollisions(entity);
}

Other systems remain responsible for audio, analytics, debugging, or achievement tracking.

Each system evolves independently.

Responsibilities should also remain conceptually coherent.

A function responsible for validating input should not quietly modify world state.

A function responsible for creating an entity should not also register UI elements.

A function responsible for loading definitions should not perform rendering.

The more predictable a responsibility becomes, the easier it is to understand where future changes belong.

One responsibility does not necessarily mean one line of code.

Nor does it mean artificially splitting every function into tiny pieces.

It means that every piece of code should answer one question well.

As understanding improves, responsibilities often become clearer.

Experienced engineers regularly recognise code that has gradually expanded beyond its original purpose and deliberately restore its focus.

Good software is not produced by writing perfect code once.

It is produced by repeatedly refining responsibilities until they become obvious.

Keep Functions Small

Large functions are difficult to understand because they ask the reader to hold too much information in their head at once.

The problem is rarely the number of lines.

It is the number of ideas.

A function that spans two hundred lines while performing one coherent task may be easier to understand than a fifty-line function performing six unrelated tasks.

The goal is therefore not to satisfy an arbitrary line limit.

The goal is to minimise mental context.

Readers should be able to understand a function without continually scrolling, searching for variables, or remembering decisions made hundreds of lines earlier.

Small functions naturally encourage this.

Consider the following.

Poor:

function spawnEnemy(definition: EnemyDefinition): Enemy {
    if (!definition.enabled) {
        throw new Error("Enemy definition is disabled.");
    }

    const enemy = createEnemy(definition);

    if (definition.generateEquipment) {
        generateEquipment(enemy);
    }

    if (definition.generateAbilities) {
        generateAbilities(enemy);
    }

    if (definition.generateInventory) {
        generateInventory(enemy);
    }

    if (definition.applyDifficultyScaling) {
        applyDifficultyScaling(enemy);
    }

    if (definition.registerEvents) {
        registerEnemyEvents(enemy);
    }

    if (definition.startAI) {
        initialiseEnemyAI(enemy);
    }

    return enemy;
}

The function gradually accumulates responsibilities.

Although individually reasonable, together they become increasingly difficult to scan.

Extracting meaningful operations produces code that reads naturally.

Better:

function spawnEnemy(definition: EnemyDefinition): Enemy {
    validateDefinition(definition);

    const enemy = createEnemy(definition);

    configureEnemy(enemy, definition);

    return enemy;
}

The implementation of configureEnemy() may itself call several smaller functions.

Each level of abstraction communicates one idea.

Small functions also encourage early returns.

Instead of wrapping an entire function in nested conditions:

Poor:

function updatePlayer(player: Player): void {
    if (player !== null) {
        if (player.isAlive) {
            if (!player.isPaused) {
                updateMovement(player);
            }
        }
    }
}

Prefer reducing indentation.

Better:

function updatePlayer(player: Player): void {
    if (player === null) {
        return;
    }

    if (!player.isAlive) {
        return;
    }

    if (player.isPaused) {
        return;
    }

    updateMovement(player);
}

Guard clauses keep the primary behaviour aligned with the left margin.

The reader immediately sees the normal execution path.

Deep nesting has the opposite effect.

Each additional level increases indentation, obscures intent, and forces readers to remember every enclosing condition before understanding the current line.

Whenever a function begins to feel difficult to explain verbally, that is often a sign that it should be divided into smaller responsibilities.

A useful guideline is this:

If you cannot describe what a function does in one simple sentence, it is probably doing too much.

Write Code That Reads Like Prose

The best code often feels less like programming and more like reading instructions.

Every identifier, function, and expression should contribute toward communicating intent as naturally as possible.

A reader should be able to scan a function from top to bottom and understand what it accomplishes without mentally translating terse variable names, obscure language features, or compressed expressions into plain English.

Instead of asking the reader to decode the implementation, allow the implementation to tell its own story.

Consider this.

Poor:

if (!e.d || e.h <= 0) {
    return;
}

e.p.x += e.v.x * dt;
e.p.y += e.v.y * dt;

The code may be technically correct, but every identifier requires interpretation.

The reader must continually ask:

What is d?
What is h?
What is p?
What is v?

Those questions consume attention that should instead be focused on the behaviour of the engine.

A clearer implementation communicates its intent immediately.

function updateEntityPosition(entity: Entity, deltaTime: number): void {
    if (!entity.isActive) {
        return;
    }

    if (entity.health <= 0) {
        return;
    }

    entity.position.x += entity.velocity.x * deltaTime;
    entity.position.y += entity.velocity.y * deltaTime;
}

The reader no longer translates abbreviations.

They simply read.

Natural language is inherently descriptive.

Good code should strive for the same quality.

Compare the following.

Poor:

if (entity.isVisible && !entity.isDestroyed && entity.opacity > 0) {
    render(entity);
}

Better:

function canRender(entity: Entity): boolean {
    return entity.isVisible &&
           !entity.isDestroyed &&
           entity.opacity > 0;
}

if (canRender(entity)) {
    render(entity);
}

The condition has become part of the vocabulary of the engine.

Instead of repeatedly interpreting implementation details, readers now understand intent.

Code should also favour directness over novelty.

Poor:

const state = isPaused
    ? previousState
    : shouldUpdate
        ? currentState
        : defaultState;

Better:

let state = defaultState;

if (isPaused) {
    state = previousState;
} else if (shouldUpdate) {
    state = currentState;
}

The second version occupies more vertical space.

It requires less mental effort.

That is a worthwhile trade.

Predictability is one of the most valuable qualities code can possess.

When every file follows similar patterns, every function tells a coherent story, and every engineer writes with the same philosophy, understanding becomes significantly easier.

The objective is not elegant syntax.

It is obvious intent.

Avoid Clever Code

There is a temptation, particularly when becoming familiar with a language, to demonstrate how much of the language can be used.

Modern JavaScript and TypeScript provide an enormous number of expressive features.

Some are genuinely valuable.

Others are best used sparingly.

The presence of a language feature does not imply that it improves readability.

The Locomotion Engine deliberately favours code that is unsurprising.

Code should communicate its purpose immediately rather than rewarding careful study.

If another engineer must stop and decipher a line before understanding it, the code has already become more complicated than necessary.

One common example is code golf.

Poor:

const alive = entities.filter(e => e.a).map(e => e.p).sort((a, b) => a.x - b.x);

Every abbreviation saves a few characters while increasing the effort required to understand the expression.

Clear names are preferable.

Better:

const aliveEntities = entities.filter(entity => entity.isAlive);

const positions = aliveEntities.map(entity => entity.position);

positions.sort((left, right) => left.x - right.x);

Likewise, avoid compressing multiple operations into a single expression simply because the language allows it.

Poor:

const position = player?.target?.parent?.transform?.position ?? defaultPosition;

Although optional chaining is useful, excessive chaining makes failures difficult to reason about.

Breaking intermediate concepts into named variables often improves clarity.

Better:

const target = player?.target;

if (target === undefined) {
    return defaultPosition;
}

const parent = target.parent;

if (parent === undefined) {
    return defaultPosition;
}

return parent.transform.position;

The behaviour is now explicit.

The reader knows exactly which condition caused the default value to be used.

Avoid hidden behaviour.

Poor:

initialiseWorld(world) &&
loadDefinitions(world) &&
startSimulation(world);

This relies upon short-circuit evaluation as a control-flow mechanism.

Although technically valid, it obscures intent.

Better:

initialiseWorld(world);

loadDefinitions(world);

startSimulation(world);

Likewise, avoid surprising control flow.

Poor:

while (true) {
    if (finished) {
        break;
    }

    if (failed) {
        return;
    }

    if (retry) {
        continue;
    }

    processNextItem();
}

Better:

while (!finished) {
    if (failed) {
        return;
    }

    if (retry) {
        continue;
    }

    processNextItem();
}

The loop condition now communicates the primary purpose of the loop.

Readers spend less time reconstructing its behaviour.

Good engineering is not measured by how sophisticated the code appears.

It is measured by how little effort another engineer must invest before understanding it.

The most impressive code is often the code that appears almost ordinary.

Explicit Over Implicit

Hidden behaviour creates hidden bugs.

Whenever behaviour is implicit, readers must infer what the code is doing instead of observing it directly.

Inference is error-prone.

Explicit code reduces uncertainty.

It tells the reader exactly what happens, when it happens, and why.

Consider object mutation.

Poor:

function applyDamage(entity: Entity, amount: number): void {
    updateHealth(entity, amount);
}

Nothing in the function communicates whether health increases, decreases, or whether other state changes occur.

A clearer implementation makes the behaviour obvious.

Better:

function applyDamage(entity: Entity, damage: number): void {
    entity.health -= damage;
}

If additional behaviour is required, it should remain equally explicit.

function applyDamage(entity: Entity, damage: number): void {
    entity.health -= damage;

    if (entity.health <= 0) {
        destroyEntity(entity);
    }
}

Readers can now understand the entire sequence without investigating unrelated functions.

Avoid hidden side effects whenever practical.

Poor:

const entity = getEntity(id);

Does this create an entity?

Cache one?

Load one?

Modify internal state?

The name provides no indication.

Prefer names that communicate behaviour.

const entity = findEntity(id);

or

const entity = createEntity(id);

or

const entity = loadEntity(id);

Each communicates different expectations.

Likewise, avoid functions that secretly modify arguments.

Poor:

function updatePosition(position: Vector2): void {
    position.x += velocity.x;
    position.y += velocity.y;
}

Unless mutation is clearly expected, readers may reasonably assume the function returns a new value.

Being explicit avoids surprises.

function translatePosition(
    position: Vector2,
    velocity: Vector2
): Vector2 {
    return {
        x: position.x + velocity.x,
        y: position.y + velocity.y
    };
}

Whether the engine prefers mutable or immutable structures in a given situation, the behaviour should always be obvious from the surrounding code.

Predictable code is easier to trust.

Trusted code is easier to maintain.

Comments

Comments are among the most misunderstood tools in software engineering.

Some codebases are buried beneath comments.

Others forbid comments almost entirely.

Neither extreme is desirable.

Comments are valuable when they communicate information that cannot be easily expressed through code itself.

The guiding philosophy of the Locomotion Engine is simple:

Code explains what.
Comments explain why.

The implementation already describes what the computer will do.

Repeating that information rarely helps anyone.

Poor:

// Increment index
index++;

The comment contributes nothing.

The code already communicates the operation perfectly.

Likewise:

// Check if the player is alive
if (player.isAlive) {

Or:

// Return the entity
return entity;

These comments simply narrate the code.

They increase visual noise while adding no understanding.

Good comments explain reasoning.

// Skip the first element because it contains metadata
// generated during procedural world creation.
for (let index = 1; index < cells.length; index++) {
    processCell(cells[index]);
}

The reader now understands why iteration begins at one.

Without the comment, changing the starting index later might introduce subtle bugs.

Comments are particularly valuable when documenting architectural intent.

// Definitions remain immutable after loading so that every
// runtime instance observes identical shared data.

This comment communicates a design decision rather than an implementation detail.

Future contributors immediately understand that mutability is not merely absent—it is intentionally prohibited.

Comments should also document assumptions.

// World generation guarantees that every region contains at
// least one valid spawn location before this function executes.

Without that knowledge, defensive code might later be added unnecessarily.

Likewise, comments should record trade-offs.

// A linear search is sufficient here because this collection
// contains fewer than twenty entries and is constructed only
// during startup.

The reader no longer "optimises" the code prematurely.

Instead, they understand that the decision was deliberate.

Comments become especially valuable when preserving context that would otherwise disappear over time.

Future-you is one of the primary audiences for comments.

Months or years after writing a system, you may remember what it does.

You are far less likely to remember why you chose this particular approach over several alternatives.

A short comment can preserve hours of future investigation.

Good comments often answer questions such as:

Why is this algorithm necessary?
Why is this special case required?
Why does this seemingly unusual implementation exist?
What assumption does this code rely upon?
What architectural principle is being preserved?
What trade-off was accepted?

If a comment answers one of those questions, it is usually providing genuine value.

A useful comment often documents decisions that cannot be recovered simply by reading the code.

For example:

// Collision resolution intentionally occurs before movement so
// that entities cannot tunnel through thin geometry during a
// single simulation step.

Without this explanation, a future refactor might reverse the order because it appears more logical.

The resulting bug would be difficult to diagnose because the original reasoning had been lost.

Comments should also explain unusual code.

Most code should be straightforward.

When it is not, explain why.

// This calculation intentionally uses floor() rather than round()
// because neighbouring chunks share boundary coordinates.
const chunkX = Math.floor(worldX / CHUNK_SIZE);

The implementation may look unusual.

The comment prevents someone from "fixing" something that is already correct.

Comments Should Not Fight the Code

Comments are not permanent documentation.

They are part of the source code.

That means they carry exactly the same maintenance responsibility as the implementation itself.

A stale comment is worse than no comment.

Consider this.

// Maximum of 100 entities.
const MAX_ENTITIES = 250;

Which is correct?

The comment?

Or the code?

Readers are now forced to investigate further because the documentation has become untrustworthy.

Once comments become unreliable, engineers stop believing any of them.

That is an enormous loss.

Comments should therefore evolve alongside the code.

Whenever implementation changes, ask:

Is this comment still correct?
Does it still explain something valuable?
Has the original reason disappeared?

If the answer is no, update the comment.

Or delete it.

Delete Comments That No Longer Matter

Not every comment deserves to survive.

Many comments exist only because the code used to be more complicated.

After refactoring, they become redundant.

Before:

// Convert degrees into radians because the renderer expects
// angular values in radians.
const angle = degrees * DEGREES_TO_RADIANS;

Suppose the renderer later changes to use degrees directly.

The conversion disappears.

The comment should disappear too.

Leaving obsolete explanations behind only creates confusion.

Likewise, comments that describe temporary workarounds should not become permanent fixtures.

Poor:

// Temporary hack.

Temporary for how long?

Why?

What should replace it?

A better comment provides context.

// Temporary workaround until terrain generation no longer
// produces overlapping boundary cells.

Even better, remove the workaround entirely as soon as it is no longer required.

Comments are valuable.

But only when they remain true.

The best comments are concise, accurate, intentional, and maintained with the same care as the code they describe.

Self-Documenting Code

The best comment is often the one that never needed to be written.

Well-written code naturally communicates its purpose through clear structure, meaningful names, and thoughtful decomposition.

When readers understand the code immediately, comments become supplementary rather than essential.

This is known as self-documenting code.

Compare the following.

Poor:

const d = Date.now() - t;

The reader must infer the meaning of every identifier.

A better implementation communicates the idea directly.

const elapsedTime = Date.now() - startTime;

The code now explains itself.

The same principle applies to boolean values.

Poor:

if (x) {

Better:

if (playerHasEnoughEnergy) {

The condition now reads almost like English.

Functions can also become part of the documentation.

Poor:

if (
    entity.health <= 0 &&
    entity.isVisible &&
    !entity.isDestroyed &&
    entity.opacity > 0
) {
    ...
}

Better:

if (shouldRenderEntity(entity)) {
    ...
}

The implementation of shouldRenderEntity() contains the details.

The calling code communicates the intent.

Likewise, avoid long expressions that require interpretation.

Poor:

const result =
    width * tileSize +
    padding * 2 +
    borderSize;

Better:

const contentWidth = width * tileSize;

const horizontalPadding = padding * 2;

const totalWidth =
    contentWidth +
    horizontalPadding +
    borderSize;

Each intermediate value becomes part of the explanation.

Readers no longer need to mentally evaluate arithmetic.

Meaningful extraction often removes the need for comments entirely.

Poor:

// Remove dead entities.
entities = entities.filter(entity => entity.health > 0);

Better:

entities = removeDestroyedEntities(entities);

The function name replaces the comment.

This is almost always preferable.

Self-documenting code is not achieved through exceptionally long names.

Names should remain descriptive without becoming sentences.

Poor:

const playerHealthValueAfterReceivingDamageFromEnemyAttack;

Better:

const remainingHealth;

Clarity should never become verbosity.

The objective is not to eliminate comments.

The objective is to ensure that comments are reserved for information the code itself cannot communicate.

The more naturally the code explains itself, the more valuable the remaining comments become.

Magic Numbers

Unexplained numeric literals make code difficult to understand.

Consider this.

if (distance < 48) {

Why forty-eight?

Pixels?

Tiles?

Metres?

Half a sprite?

A debugging value?

Nothing in the code provides the answer.

Named constants communicate intent.

const INTERACTION_RANGE = 48;

if (distance < INTERACTION_RANGE) {

The meaning immediately becomes clearer.

Constants also centralise knowledge.

If the interaction distance later changes, only one definition requires modification.

The same principle applies to timing.

Poor:

setTimeout(updateWorld, 16);

Better:

const TARGET_FRAME_TIME_MS = 16;

setTimeout(updateWorld, TARGET_FRAME_TIME_MS);

Or better still:

const TARGET_FRAMES_PER_SECOND = 60;

const FRAME_TIME_MS = 1000 / TARGET_FRAMES_PER_SECOND;

Now the code documents the underlying intent rather than merely exposing the resulting value.

Constants are equally valuable for mathematical relationships.

Poor:

sprite.x += tileSize * 0.5;

Better:

const HALF_TILE = tileSize * 0.5;

sprite.x += HALF_TILE;

Readers no longer need to interpret the calculation.

The concept has been named.

Not every literal requires a constant.

Some values are universally understood.

array[index + 1]

counter++

if (health <= 0)

Values such as zero, one, and simple arithmetic often remain clearer as literals than through artificial constants.

Likewise, mathematical formulae sometimes benefit from using literal values where they are immediately recognisable.

Good engineering requires judgement.

Avoid replacing obvious code with unnecessary indirection.

The goal is not to eliminate numeric literals.

The goal is to eliminate unexplained ones.

Whenever a number carries meaning beyond its numerical value, give that meaning a name.

Conditionals

Conditionals determine how readers reason about control flow.

When they are simple, code becomes easy to follow.

When they become deeply nested or densely packed with boolean logic, understanding quickly deteriorates.

Prefer expressing conditions positively whenever practical.

Poor:

if (!(entity === null || !entity.isActive)) {
    updateEntity(entity);
}

Better:

if (entity !== null && entity.isActive) {
    updateEntity(entity);
}

The second version communicates intent directly.

Likewise, avoid deeply nested conditionals.

Poor:

function updateEntity(entity: Entity): void {
    if (entity !== null) {
        if (entity.isActive) {
            if (!entity.isPaused) {
                if (entity.health > 0) {
                    updateMovement(entity);
                }
            }
        }
    }
}

Guard clauses dramatically improve readability.

function updateEntity(entity: Entity): void {
    if (entity === null) {
        return;
    }

    if (!entity.isActive) {
        return;
    }

    if (entity.isPaused) {
        return;
    }

    if (entity.health <= 0) {
        return;
    }

    updateMovement(entity);
}

The normal execution path remains obvious.

Avoid boolean expressions that require significant mental evaluation.

Poor:

if (
    (!entity.isDestroyed || allowDestroyed) &&
    (!entity.isHidden || debugMode) &&
    (entity.health > 0 || ignoreHealth)
) {

The reader must mentally simplify several interacting conditions before understanding the outcome.

Instead, introduce names that communicate intent.

const canIgnoreDestroyedEntities = allowDestroyed || !entity.isDestroyed;

const canRenderHiddenEntities = debugMode || !entity.isHidden;

const entityIsAlive = entity.health > 0 || ignoreHealth;

if (
    canIgnoreDestroyedEntities &&
    canRenderHiddenEntities &&
    entityIsAlive
) {
    renderEntity(entity);
}

Each condition now describes an idea rather than an expression.

The code becomes easier to modify because each concept exists independently.

Good conditionals reduce thinking.

They allow readers to focus on behaviour rather than logic.

Duplication

Every engineer eventually hears the phrase:

"Don't Repeat Yourself."

Like many engineering principles, it is valuable when applied thoughtfully and harmful when applied mechanically.

Duplication is not the enemy.

Harmful duplication is.

Two pieces of code that merely happen to look similar are not necessarily the same responsibility.

Removing duplication too early often creates abstractions that are more complicated than the original code.

Consider two functions.

function createPlayer(): Player {
    ...
}

function createMerchant(): Merchant {
    ...
}

They may currently share several implementation steps.

That does not automatically justify combining them into a generic factory.

At present, they represent different responsibilities.

Keeping them separate preserves clarity.

If both functions evolve identically over time, a meaningful abstraction may naturally emerge.

Refactoring should follow understanding.

Not precede it.

Over time, however, some duplication clearly represents the same idea expressed repeatedly.

For example:

Poor:

player.position.x += player.velocity.x * deltaTime;
player.position.y += player.velocity.y * deltaTime;

enemy.position.x += enemy.velocity.x * deltaTime;
enemy.position.y += enemy.velocity.y * deltaTime;

projectile.position.x += projectile.velocity.x * deltaTime;
projectile.position.y += projectile.velocity.y * deltaTime;

Each block performs exactly the same operation.

This duplication increases maintenance cost because every future change must be repeated in multiple locations.

A shared function communicates the common behaviour.

Better:

function integratePosition(
    position: Vector2,
    velocity: Vector2,
    deltaTime: number
): void {
    position.x += velocity.x * deltaTime;
    position.y += velocity.y * deltaTime;
}

integratePosition(
    player.position,
    player.velocity,
    deltaTime
);

integratePosition(
    enemy.position,
    enemy.velocity,
    deltaTime
);

integratePosition(
    projectile.position,
    projectile.velocity,
    deltaTime
);

The shared behaviour now exists in one place.

Future improvements require one modification rather than three.

A useful question is:

Is this duplication accidental, or is it communicating separate responsibilities?

If the responsibilities are genuinely different, duplication may be entirely acceptable.

If they are identical, duplication should eventually be removed.

Equally important is avoiding premature abstraction.

Suppose two systems currently share almost identical code.

Resist the temptation to immediately create a complex generic framework.

Wait.

Allow both implementations to evolve.

Patterns become clearer through experience.

Refactoring based on proven patterns usually produces simpler abstractions than those designed from speculation.

Duplication should therefore be treated as information.

It often reveals opportunities for improvement.

But it should never force abstraction before understanding exists.

Abstraction

Abstraction is one of the most powerful tools available to an engineer.

It is also one of the easiest to misuse.

Good abstraction reduces complexity.

Bad abstraction hides complexity without removing it.

The purpose of abstraction is not to make code appear sophisticated.

Its purpose is to make code easier to understand.

Whenever a reader encounters an abstraction, they should gain clarity rather than lose it.

Poor abstractions often emerge from trying to predict the future.

Engineers imagine several possible requirements, build an elaborate framework capable of handling all of them, and then discover that only one scenario ever occurs.

The abstraction survives.

The simplicity disappears.

Consider the following.

Poor:

interface EntityProcessor<T> {
    process(
        entity: T,
        options: ProcessingOptions,
        strategy: ProcessingStrategy,
        context: ProcessingContext
    ): ProcessingResult;
}

At first glance, this appears flexible.

In practice, it may exist only because future requirements were anticipated rather than demonstrated.

A simpler implementation is often preferable.

function updateEntity(entity: Entity): void {
    ...
}

Simple code should remain simple until experience proves that greater abstraction is genuinely beneficial.

Another common mistake is creating abstractions solely to eliminate small amounts of duplication.

Suppose two functions currently share three identical lines.

That alone does not justify introducing a complicated inheritance hierarchy, configurable strategy system, or generic processing pipeline.

The abstraction may become harder to understand than the duplicated code it replaced.

A useful principle is:

Wrong abstraction is often worse than duplication.

Incorrect abstractions spread misunderstanding throughout a codebase.

Every new feature must work around them.

Every future engineer inherits their limitations.

Removing them later becomes increasingly difficult because other systems begin depending upon them.

Instead, allow patterns to emerge naturally.

Write the straightforward implementation.

Observe how it evolves.

When multiple systems repeatedly solve the same problem in the same way, a clear abstraction often reveals itself.

At that point, refactoring becomes significantly easier because the abstraction is based on evidence rather than prediction.

Good abstractions possess several characteristics.

They hide implementation details without hiding behaviour.

They reduce concepts rather than introducing them.

They improve readability.

They make future changes easier.

Most importantly, they feel inevitable.

When reading a well-designed abstraction, the natural reaction is:

"Of course that's how this should be organised."

That is usually a sign that the abstraction was discovered rather than invented.

Error Messages

Errors are part of the developer experience.

When something goes wrong, the error message often becomes the first—and sometimes only—piece of information available to diagnose the problem.

For that reason, error messages should be written with the same care as any other part of the engine.

A poor error merely announces failure.

A good error helps explain it.

Poor:

throw new Error("Invalid.");

Or:

throw new Error("Failed.");

Neither message provides useful information.

The engineer must begin investigating without context.

Instead, describe the problem.

throw new Error(
    "Entity definition 'GoblinWarrior' does not exist."
);

Even better, include relevant context where appropriate.

throw new Error(
    `Unable to create entity '${definitionId}' because no matching definition was found.`
);

The reader immediately knows:

what failed
which object caused the failure
why the failure occurred

Avoid vague wording.

Poor:

throw new Error("Invalid input.");

Better:

throw new Error(
    `Expected a positive world size. Received ${worldSize}.`
);

The error itself now explains the problem.

Good messages also avoid blame.

An error message is not a punishment.

It is a diagnostic tool.

The objective is to reduce investigation time.

Whenever practical, answer the questions an engineer will naturally ask.

What happened?
Where did it happen?
Why did it happen?
What value caused it?

The more precisely an error communicates these answers, the faster the underlying problem can be understood.

Defensive Programming

Software should assume that mistakes will eventually occur.

Incorrect assumptions, unexpected inputs, incomplete data, and programming errors are inevitable over the lifetime of a project.

Defensive programming is the practice of detecting these situations early, clearly, and predictably.

Its purpose is not to hide problems.

Its purpose is to expose them.

Consider the following.

Poor:

function updateEntity(entity: Entity): void {
    entity.position.x += entity.velocity.x;
}

If entity is unexpectedly null or undefined, the resulting error may occur far from the code that introduced the mistake.

Instead, validate important assumptions.

function updateEntity(entity: Entity): void {
    if (entity === null) {
        throw new Error(
            "updateEntity() requires a valid entity."
        );
    }

    entity.position.x += entity.velocity.x;
}

The problem is now detected immediately.

Failures that occur close to their cause are almost always easier to diagnose.

Assertions serve a similar purpose.

An assertion documents assumptions that should never be violated.

assert(world !== null, "World must exist before updating entities.");

If the assertion fails, it reveals a defect elsewhere in the program.

It should not be ignored.

Equally important is recognising the difference between hiding problems and detecting them.

Poor:

try {
    updateWorld();
} catch {
}

The failure disappears.

The underlying defect remains.

Silent failures rarely solve problems.

They simply postpone them.

Instead, allow failures to surface where they can be understood and corrected.

Defensive programming is not about wrapping every line in validation.

It is about protecting important assumptions.

Validate inputs.

Verify invariants.

Fail early.

Fail clearly.

A visible problem is usually straightforward to fix.

An invisible one may remain hidden for months.

TODOs

TODO comments are promises.

Every TODO acknowledges that the current implementation is incomplete and that future work remains.

Because they represent unfinished engineering, they should be written deliberately.

Poor:

// TODO

Or:

// Fix later.

Neither explains what remains to be done or why.

A useful TODO provides context.

// TODO:
// Replace the temporary spawn selection algorithm with the
// deterministic region-based generator once world generation
// has been implemented.

Anyone reading the code now understands the remaining work.

They also understand when the TODO is expected to disappear.

Avoid leaving TODOs indefinitely.

Old TODOs gradually become invisible.

Eventually, nobody notices them.

Regularly review existing TODOs.

Complete them.

Remove them.

Or decide that they are no longer relevant.

A forgotten TODO is simply stale documentation.

Before adding a TODO, ask:

Is this genuinely temporary?
Will someone reasonably know when this should be addressed?
Would creating an issue or planning task be more appropriate?

TODOs should remain rare, intentional, and actionable.

They should never become permanent decoration within the source code.

Dead Code

Dead code is code that no longer contributes to the behaviour of the engine.

It may once have solved a genuine problem.

It may have been replaced by a better implementation.

It may simply have survived a refactor.

Regardless of how it arrived, dead code increases the cost of maintaining the project.

Every line of code carries a maintenance cost.

Someone must read it.

Someone must understand it.

Someone must determine whether it is still relevant.

Dead code provides none of the benefits of working code while preserving all of the costs.

One of the most common forms of dead code is commented-out implementations.

Poor:

// Old implementation.
//
// for (const entity of entities) {
//     updateEntity(entity);
// }
//
// New implementation.
updateEntities();

The previous implementation no longer belongs in the source file.

Modern version control exists specifically to preserve history.

If the old code is ever required, it can be recovered from the project's history.

Keeping obsolete implementations in the file only creates uncertainty.

Readers naturally begin asking questions.

Which implementation is correct?

Why was the old one removed?

Is it still needed?

Has something been lost?

Those questions consume attention that should instead be focused on the current implementation.

Likewise, avoid leaving disabled code behind.

Poor:

if (false) {
    experimentalRenderer.render(world);
}

Or:

const USE_NEW_SYSTEM = false;

if the intention is simply to preserve an abandoned implementation.

Temporary feature switches have legitimate uses in some contexts, but obsolete implementations should eventually be removed once they are no longer required.

Dead code also includes unused variables.

const worldWidth = world.width;

const player = getPlayer();

updateEntities();

If worldWidth is never used, it should not exist.

Unused parameters, helper functions, constants, and data structures all contribute unnecessary noise.

Good engineering continually removes these small sources of friction.

Deleting code can feel uncomfortable.

There is often a temptation to keep something "just in case."

Fortunately, version control already provides that safety net.

Keeping obsolete code in the working source rarely provides additional value.

Instead, it increases uncertainty.

Healthy codebases become smaller as well as larger.

Refactoring is not only about adding better abstractions.

Sometimes the greatest improvement is simply removing what is no longer needed.

Code that no longer serves the engine should be deleted.

Not hidden.

Not commented out.

Deleted.

Consistency Over Preference

Every engineer develops personal preferences.

Preferred formatting.

Favourite language features.

Individual naming habits.

Ways of organising control flow.

None of these are inherently wrong.

The problem arises when every engineer applies their own preferences independently.

A codebase constructed from individual preferences gradually loses its identity.

Every file feels different.

Every function follows different conventions.

Understanding becomes slower because readers must continually adapt to a new style.

Consistency removes that burden.

When similar problems are solved in similar ways throughout the engine, engineers spend less time learning local conventions and more time understanding the behaviour itself.

Consistency therefore has practical value.

It reduces cognitive load.

Suppose one part of the engine performs validation like this.

if (entity === null) {
    return;
}

Another uses:

if (!entity) {
    return;
}

A third writes:

if (entity == null) {
    return;
}

Each version may behave acceptably.

The important question is not which one is individually preferable.

It is which one the engine has already established as its standard.

Following existing patterns preserves continuity.

The same principle applies to function naming.

If the engine consistently uses verbs such as:

createEntity()
findEntity()
destroyEntity()

then introducing:

makeEntity()
fetchEntity()
eraseEntity()

adds unnecessary variation.

Readers must now remember multiple vocabularies for identical concepts.

Consistency is not about suppressing creativity.

It is about preserving predictability.

Whenever writing new code, look at the surrounding code first.

Ask:

How is this idea normally expressed?
What naming pattern already exists?
How are similar problems solved elsewhere?

The best contribution is often the one that blends seamlessly into the existing codebase.

Good engineering is rarely recognisable by individual style.

It is recognisable by the absence of stylistic distractions.

The Craft of Refactoring

Refactoring is the continuous process of improving code without changing its behaviour.

It is one of the primary mechanisms through which software remains healthy over long periods of time.

Very little code is written perfectly the first time.

Nor should it be.

The first implementation often teaches the problem.

Subsequent revisions teach the solution.

Good engineers recognise this.

They do not become attached to their first implementation simply because it works.

Instead, they continually look for opportunities to improve clarity, reduce complexity, and strengthen the overall quality of the codebase.

Most refactorings are surprisingly small.

Renaming a variable.

Extracting a function.

Removing duplication.

Clarifying a conditional.

Replacing a confusing loop.

Deleting obsolete code.

None of these changes are dramatic.

Together, they gradually transform a codebase into something significantly easier to maintain.

Refactoring should also remain purposeful.

Avoid rewriting code simply because another implementation seems more elegant.

Every refactoring should produce a measurable improvement in readability, maintainability, or simplicity.

If the behaviour remains unchanged but understanding improves, the refactoring has succeeded.

One of the healthiest engineering habits is leaving code slightly better than it was found.

Perhaps a variable name becomes clearer.

A confusing comment is rewritten.

An unnecessary conditional disappears.

A duplicated calculation becomes a shared helper.

These small improvements accumulate.

Large improvements are often nothing more than years of careful incremental refinement.

Refactoring should therefore become a normal part of engineering rather than a special event.

It is not something reserved for major rewrites.

It is something practiced continually.

The Locomotion Engine should improve every time it is touched.

Even if only slightly.

The Final Read

Writing code is only part of engineering.

Reading it is equally important.

Before considering a piece of work complete, pause and read the code from beginning to end.

Not as its author.

As its next maintainer.

Read slowly.

Resist the temptation to skim.

Many improvements become obvious only when experiencing the code as a reader rather than as its creator.

Ask simple questions.

Does this read naturally?
Would another engineer immediately understand this?
Is every name still the best name?
Is every comment still accurate and useful?
Can any section be simplified?
Is there unnecessary duplication?
Does every function have one clear responsibility?
Am I solving today's problem well?
Would I be happy maintaining this code in five years?

These questions rarely require extensive work.

Often they reveal small improvements.

A variable can be renamed.

A function can be extracted.

A redundant comment can be deleted.

An awkward conditional can become clearer.

Individually, these changes seem insignificant.

Collectively, they have an enormous effect on the quality of the engine.

The final read is the last opportunity to improve the code before it becomes part of the project's history.

Never rush it.

A few thoughtful minutes spent reading your own work often prevent hours of future confusion.

The objective is not perfection.

Perfection is unattainable.

The objective is something much more practical.

Leave behind code that is a little clearer than it was yesterday.

If every contribution follows that principle, the Locomotion Engine will become progressively easier to understand, easier to extend, and more enjoyable to maintain throughout its lifetime.

That is the standard to which every line of code in the engine should aspire.

Part VI — Debugging & Diagnostics

Assertions

Assertions are one of the simplest and most effective debugging tools available to an engineer.

They exist to validate assumptions.

Every piece of software contains assumptions about the state of the system.

An entity assumes it belongs to a valid world.

A renderer assumes a render target exists.

An event assumes it contains the data required by its subscribers.

A resource manager assumes resource identifiers are unique.

Most of these assumptions are never explicitly written down.

Assertions make them visible.

Rather than silently trusting an assumption to remain true, the software actively verifies it.

When the assumption proves false, execution stops immediately and the investigation begins exactly where the incorrect assumption was discovered.

An assertion is therefore a statement that says:

"This condition must always be true."

If that statement becomes false, something has already gone wrong.

Assertions Are Not Error Handling

A common mistake is using assertions to validate expected runtime conditions.

Assertions are not intended for ordinary control flow.

Consider the following example.

// Poor

assert(fileExists(filename));

const file = loadFile(filename);

Files may legitimately not exist.

Missing files are an expected runtime condition.

The correct behaviour is to report the problem appropriately.

// Better

if (!fileExists(filename)) {
    throw new Error(`Configuration file not found: ${filename}`);
}

const file = loadFile(filename);

Now consider a different situation.

assert(world !== null);

If the engine has successfully completed initialization, the world should always exist.

Its absence indicates a programming error rather than a normal runtime condition.

This is an excellent use of an assertion.

The distinction can be summarized simply.

Expected failures should be handled.

Impossible situations should be asserted.

Assertions Document Assumptions

Assertions improve software even when they never fail.

Consider this function.

function updateEntity(entity: Entity): void {
    entity.update();
}

Nothing explains the assumptions.

Now compare it to this version.

function updateEntity(entity: Entity): void {
    assert(entity.isAlive());
    assert(entity.world !== null);

    entity.update();
}

Future contributors immediately understand the expectations.

The assertions become executable documentation.

Unlike comments, they cannot quietly become incorrect.

If the assumptions stop being true, the software immediately reveals the problem.

Assert Close to the Assumption

Assertions should appear where the assumption is made.

Avoid validating everything at the top of the program.

Instead, verify conditions immediately before they become important.

// Better

assert(texture.isLoaded());

renderer.draw(texture);

If the assertion fails, the investigation begins exactly where the invalid state became significant.

This dramatically reduces the amount of code that must be examined.

Assert Internal Consistency

Assertions are particularly valuable for validating relationships between multiple pieces of state.

assert(entityCount >= 0);

assert(activeEntities.size <= totalEntities.size);

assert(currentFrame >= previousFrame);

assert(camera.zoom > 0);

assert(world.entities.has(entity.id));

assert(renderQueue.length === visibleEntityCount);

Each assertion expresses an invariant that should always remain true.

Violating these invariants usually indicates corruption that should be investigated immediately.

Avoid Excessive Assertions

Assertions should communicate meaningful assumptions.

Adding assertions everywhere eventually reduces their value.

This contributes little.

// Poor

assert(x !== undefined);
assert(y !== undefined);
assert(z !== undefined);
assert(speed >= 0);
assert(rotation !== null);
assert(sprite !== undefined);

Instead, assert higher-level conditions that reflect meaningful engineering intent.

// Better

assert(entity.isInitialized());

assert(world.contains(entity));

assert(resource.isLoaded());

assert(simulation.isRunning());

These communicate concepts rather than implementation details.

Assertions Should Never Replace Correct Design

Assertions are safeguards.

They are not substitutes for sound implementation.

If every function begins with dozens of assertions checking the same conditions repeatedly, the design itself may need improvement.

Good architecture naturally reduces invalid states.

Assertions protect those states.

They should not become the primary mechanism by which correctness is achieved.

Assertions in Production

Assertions exist primarily to assist development.

They identify programming mistakes, violated invariants, and impossible situations while the software is being built.

Because they often terminate execution, many projects disable them in production builds.

This is entirely appropriate provided two conditions remain true.

First, disabling assertions must not change the observable behaviour of correctly functioning software.

Second, assertions must never be relied upon to perform essential runtime validation.

If removing assertions changes program correctness, they were being used for the wrong purpose.

Assertions verify assumptions.

They should not implement application logic.

Error Handling

Not every problem represents a bug.

Some conditions are entirely expected.

Configuration files may be missing.

Resources may fail to load.

Network connections may be interrupted.

Users may provide invalid input.

These situations should be anticipated and handled deliberately.

Programming errors are different.

Attempting to continue after an internal inconsistency often produces behaviour that is far more difficult to diagnose than the original mistake.

Good error handling therefore begins by distinguishing between recoverable and unrecoverable situations.

Recoverable Errors

A recoverable error is one from which meaningful execution can continue.

For example:

A texture fails to load and a placeholder texture can be substituted.
A save file is missing and a new world can be created.
Optional configuration values are absent and sensible defaults exist.
An unsupported controller is disconnected.

The engine continues operating while informing the developer of what occurred.

function loadTexture(path: string): Texture {
    if (!fileExists(path)) {
        logger.warning(
            `Texture "${path}" not found. Using placeholder texture.`
        );

        return placeholderTexture;
    }

    return readTexture(path);
}

The software remains usable while preserving visibility into the problem.

Unrecoverable Errors

Some failures invalidate the assumptions upon which the engine operates.

Continuing execution simply delays the inevitable.

if (world === null) {
    throw new Error(
        "Engine attempted to update without an active world."
    );
}

Attempting to continue without a world would only generate secondary failures.

Terminating immediately is the correct behaviour.

Preserve Context

One of the greatest frustrations during debugging is receiving an error that explains almost nothing.

Error.

Technically accurate.

Practically useless.

Compare it to this.

Failed to create entity.

Definition: GoblinWarrior
World: Forest01
Requested position: (145, 83)
Reason: Definition not registered.

The second message immediately answers several important questions.

What failed?
Which object was involved?
Where did it occur?
Why did it fail?

Every additional piece of useful context reduces investigation time.

Error messages should therefore communicate enough information that another engineer can begin investigating without reproducing the entire situation.

Never Swallow Exceptions

One of the most damaging debugging practices is silently ignoring errors.

// Very poor

try {
    loadDefinitions();
}
catch {
}

The exception disappears.

The engine continues.

Later, dozens of unrelated systems begin failing because the definitions were never loaded.

The original cause has been lost.

At minimum, unexpected exceptions should be logged.

try {
    loadDefinitions();
}
catch (error) {
    logger.error(
        "Failed to load engine definitions.",
        error
    );

    throw error;
}

Even better, allow the exception to propagate naturally unless meaningful recovery is possible.

Avoid Empty Catch Blocks

An empty catch block almost always represents hidden technical debt.

// Poor

try {
    initializeRenderer();
}
catch {
    // Ignore.
}

Questions immediately arise.

Why was the exception ignored?

Was the failure expected?

Is the renderer now partially initialized?

Can rendering continue safely?

Silence answers none of these.

If an exception truly may be ignored, explain why.

try {
    deleteTemporaryCache();
}
catch (error) {
    logger.debug(
        "Temporary cache did not exist. Continuing startup."
    );
}

Now the decision is intentional rather than mysterious.

Error Handling Should Improve Understanding

Every error handler should leave the system easier to understand than before the error occurred.

A useful question is:

"If another engineer received this error six months from now, would they know what to investigate next?"

If the answer is no, the error handling probably needs improvement.

Good error handling is therefore not measured by how many exceptions are caught.

It is measured by how effectively it reduces uncertainty.

Every error should either be resolved, propagated, or explained.

It should never simply disappear.

Logging Philosophy

Logs are among the most valuable diagnostic tools in a software system.

They preserve information that no longer exists.

By the time a bug is investigated, the execution that produced it has often already finished. Variables have changed, memory has been reused, and the exact sequence of events has been lost.

Logs allow engineers to reconstruct that sequence.

They provide a history of what the software believed to be true while it was executing.

For this reason, logs should do more than report isolated events.

They should tell a coherent story.

An engineer reading the logs should be able to answer questions such as:

What happened?
What happened immediately before it?
What happened afterwards?
Which systems were involved?
Why did the software make the decisions it did?

Every log entry should contribute to that narrative.

Logs that merely repeat obvious information add noise without improving understanding.

Log With Purpose

Every log message should exist because someone is expected to benefit from reading it.

Avoid logging simply because something happened.

Instead, log events that improve understanding of the system.

Useful examples include:

Engine startup
World creation
Resource loading
Configuration changes
Significant state transitions
Validation failures
Unexpected behaviour
Recoverable errors
Performance anomalies

The following provides little value.

logger.info("Update called.");

The message communicates almost nothing.

Instead:

logger.info(
    `Loaded ${definitions.length} entity definitions.`
);

Or:

logger.info(
    `Created world "${world.name}" with seed ${world.seed}.`
);

These messages communicate meaningful progress.

Logging Levels

Different information deserves different levels of visibility.

Using consistent logging levels allows engineers to filter information according to the investigation being performed.

DEBUG

Debug messages exist primarily for developers.

They describe detailed internal behaviour that would normally be too verbose for ordinary operation.

Examples include:

Individual entity creation
System initialization order
Resource lookup details
State transitions
Diagnostic counters
Internal decision making
logger.debug(
    `Entity ${entity.id} entered visibility partition ${partitionId}.`
);

Debug logging should be rich enough to explain complex behaviour without overwhelming routine execution.

INFO

Information messages describe significant normal events.

They explain what the engine is doing under expected circumstances.

Examples include:

Engine startup
Successful initialization
World loading
Asset loading
Save completion
Configuration selection
logger.info(
    `Engine initialized successfully.`
);

logger.info(
    `Loaded ${resourceCount} resources.`
);

Information logs should provide confidence that major operations completed successfully.

WARNING

Warnings indicate behaviour that is unexpected but not immediately fatal.

Execution may continue, but the situation deserves attention.

Examples include:

Missing optional assets
Deprecated configuration
Invalid user data replaced with defaults
Performance thresholds exceeded
Recoverable resource failures
logger.warning(
    `Sprite "${spriteName}" not found. Using placeholder sprite.`
);

Warnings should never become normal.

If thousands of warnings appear during routine execution, engineers quickly stop reading them.

Warnings represent unusual situations.

They should remain unusual.

ERROR

Errors indicate failures that prevented an operation from completing correctly.

Examples include:

Failed initialization
Corrupted data
Unrecoverable resource failures
Invalid engine state
Fatal runtime exceptions
logger.error(
    `Failed to initialize renderer.`,
    error
);

Errors should provide sufficient context for immediate investigation.

A developer should not need to guess what operation failed.

Write Messages for Humans

Log messages are read far more often than they are written.

Optimize for the person investigating the problem.

Avoid abbreviations.

Avoid internal jargon.

Avoid messages that assume intimate knowledge of the implementation.

Poor:

logger.error("Load failed.");

Better:

logger.error(
    `Failed to load texture "${path}". File does not exist.`
);

Better still:

logger.error(
    `Failed to load texture "${path}" while creating entity definition "${definition.name}".`
);

Every additional piece of relevant context reduces investigation time.

Avoid Meaningless Logging

More logging does not necessarily improve diagnostics.

Poor logging often creates the opposite effect.

Consider this example.

logger.debug("Entering update.");

updateEntities();

logger.debug("Leaving update.");

logger.debug("Entering render.");

render();

logger.debug("Leaving render.");

Thousands of nearly identical messages quickly become impossible to interpret.

The truly important information disappears into the noise.

Instead, log changes in understanding.

logger.debug(
    `Updated ${updatedEntities} entities in ${updateTime.toFixed(2)} ms.`
);

This communicates measurable information.

Avoid Duplicate Logging

One failure should normally be logged once.

Repeatedly logging the same exception as it propagates through multiple layers produces overwhelming output.

// Poor

logger.error("Entity creation failed.");

throw error;

// ...

logger.error("World creation failed.");

throw error;

// ...

logger.error("Engine startup failed.");

throw error;

The logs now contain three nearly identical failures.

Instead, either add genuinely new context or allow the exception to propagate naturally.

try {
    createWorld();
}
catch (error) {
    logger.error(
        "Engine startup failed while creating the initial world.",
        error
    );

    throw error;
}

The additional context justifies the log entry.

Temporary Logging

Temporary diagnostic logging is an entirely legitimate development technique.

When investigating an unfamiliar problem, adding short-lived logging is often faster than attaching a debugger or repeatedly stepping through execution.

For example:

logger.debug(
    `Current entity count: ${entityManager.getEntityCount()}`
);

Such logging serves an immediate purpose.

However, temporary logging should remain temporary.

Before completing the work, remove any logging that no longer contributes to the long-term maintainability of the engine.

Permanent logging should exist because future engineers will benefit from it.

Not because it once helped solve a single bug.

When temporary logging proves consistently useful across multiple investigations, consider replacing it with a proper diagnostic system rather than leaving scattered log statements throughout the codebase.

Logs Should Explain Behaviour

The best logs do more than record events.

They explain behaviour.

Compare these two examples.

Loading complete.

Versus:

Loaded 1,428 entity definitions in 37.6 ms.
Registered 84 behaviour definitions.
Validated all definitions successfully.
World initialization may now begin.

The second log tells a story.

An engineer can immediately understand what occurred, how long it took, whether validation succeeded, and what the engine intends to do next.

That narrative is invaluable when diagnosing complex behaviour.

The objective of logging is therefore not to produce output.

The objective is to preserve understanding.

Diagnostics

Logging explains what happened.

Diagnostics explain what is happening.

The distinction is important.

Logs describe history.

Diagnostics expose the current state of the engine while it is running.

Both are valuable.

Together they provide a complete picture of system behaviour.

A mature engine should make its internal state visible without requiring contributors to inspect memory manually or modify implementation simply to answer routine questions.

Whenever a developer asks,

"I wonder what the engine is doing right now?"

there should ideally already be a diagnostic capable of answering that question.

Diagnostics Are Engineering Tools

Diagnostics exist for engineers rather than players.

They provide visibility into the behaviour of the engine while it is being developed.

Unlike gameplay features, diagnostics are judged by how effectively they reduce uncertainty.

Useful diagnostics often include:

Current frame number
Simulation time
Frame duration
Update duration
Render duration
Active entity count
Active behaviour count
Resource counts
Memory usage
Event queue size
Pending resource loads
Active worlds
Visible objects
Camera information

None of these alter the simulation.

They simply expose it.

Measure What Matters

Every subsystem should expose information that helps answer practical engineering questions.

For example, an entity manager might expose:

interface EntityDiagnostics {
    totalEntities: number;
    activeEntities: number;
    destroyedThisFrame: number;
}

A renderer might expose:

interface RendererDiagnostics {
    drawCalls: number;
    visibleEntities: number;
    culledEntities: number;
    renderedPixels: number;
}

These numbers immediately communicate whether the subsystem is behaving as expected.

If performance suddenly drops after introducing a new feature, these diagnostics often identify the cause long before a profiler is required.

A subsystem that reports its own behaviour is far easier to maintain than one whose internal state must be inferred indirectly.

Diagnostics Should Be Inexpensive

Diagnostic information should be easy to obtain.

If gathering simple runtime statistics significantly alters engine behaviour, contributors become reluctant to use them.

Whenever practical, collect useful metrics as part of normal execution rather than requiring expensive secondary analysis.

Counters, timers, and summary statistics usually have negligible overhead while providing substantial long-term value.

The best diagnostics become part of everyday development rather than tools reserved only for emergencies.

# Graceful Degradation

Not every failure requires complete shutdown.

Some capabilities are optional.

If an optional subsystem becomes unavailable, the engine should continue operating where doing so preserves correctness.

For example:

* A missing optional font may fall back to a default font.
* Missing editor-only assets may be replaced with placeholders.
* Optional diagnostic services may disable themselves while leaving the simulation unaffected.

```typescript
const font = resourceManager.tryLoadFont(path);

if (!font) {
    logger.warning(
        `Unable to load "${path}". Using default font.`
    );

    return defaultFont;
}
```

Notice that the engine does not pretend the problem never occurred.

The fallback is explicit.

The warning remains visible.

The behaviour remains understandable.

Graceful degradation is therefore about preserving useful behaviour without concealing failure.

The software should continue only when it can do so honestly.

---

# Instrumentation

Engineers frequently ask questions such as:

* Why is this frame slower?
* Which system allocates the most memory?
* How many entities currently exist?
* Which subsystem consumes the most update time?
* How often is this function called?

None of these questions should be answered by guessing.

They should be answered by measurement.

Instrumentation is the collection of runtime measurements that describe how the engine behaves while it executes.

Unlike logs, which describe events, or diagnostics, which expose current state, instrumentation measures behaviour over time.

Good instrumentation allows engineers to replace opinions with evidence.

## Measure Before Optimising

Performance problems often appear obvious.

They rarely are.

A contributor may believe rendering is responsible for a slow frame when the actual cause is entity management.

Likewise, an apparently expensive algorithm may consume almost no measurable time.

Before attempting to improve performance, first determine where time is actually being spent.

Simple timing instrumentation often reveals surprising results.

```typescript
const start = performance.now();

simulation.update(deltaTime);

const duration = performance.now() - start;

performanceMetrics.simulationTime = duration;
```

This measurement provides a factual basis for future decisions.

Without it, optimisation becomes speculation.

## Measure Consistently

Instrumentation should be gathered consistently across comparable systems.

For example:

```typescript
interface FrameMetrics {
    updateTime: number;
    renderTime: number;
    totalFrameTime: number;
}
```

Likewise:

```typescript
interface ResourceMetrics {
    loadedTextures: number;
    loadedDefinitions: number;
    memoryUsage: number;
}
```

Consistent measurements make trends easy to recognise.

They also simplify comparisons between revisions of the engine.

If every subsystem measures time differently, the resulting numbers become difficult to interpret.

Consistency makes metrics trustworthy.

## Prefer Counters Over Estimates

Whenever possible, expose exact values rather than approximate descriptions.

Poor:

```text
Lots of entities exist.
```

Better:

```text
Entities: 12,487
```

Poor:

```text
Rendering appears slow.
```

Better:

```text
Average render time: 5.82 ms
Peak render time: 8.11 ms
```

Numbers provide clarity.

Descriptions provide interpretation.

Diagnostics should begin with measurement.

Interpretation comes afterwards.

## Sample Long-Running Behaviour

Some problems only emerge over time.

Memory growth.

Gradually increasing frame times.

Resource leaks.

Accumulating event queues.

Monitoring values over long execution periods often reveals problems that remain invisible during short testing sessions.

Instrumentation should therefore support continuous observation rather than isolated snapshots.

Historical trends frequently explain behaviour that instantaneous measurements cannot.

## Instrumentation Should Be Easy to Remove From Mental Load

The purpose of instrumentation is not to burden contributors with additional information.

It is to make important information immediately available when required.

An engineer should not need to modify engine code simply to answer questions like:

* How many worlds currently exist?
* How many events were processed this frame?
* How many entities are visible?

Those answers should already exist.

The best instrumentation quietly collects useful information until someone needs it.

---

# Temporary Debug Code

Temporary debugging code is an entirely legitimate engineering tool.

During investigation, contributors often need additional visibility into a system that was never expected to require inspection.

Adding temporary logging.

Drawing additional overlays.

Capturing intermediate values.

Introducing small validation checks.

These techniques frequently shorten investigations dramatically.

The problem is not temporary debug code.

The problem is temporary debug code that quietly becomes permanent.

## Temporary Means Temporary

When a defect has been understood and resolved, temporary debugging code should normally be removed.

Consider this example.

```typescript
logger.debug(
    `Current velocity: ${entity.velocity}`
);

logger.debug(
    `Current acceleration: ${entity.acceleration}`
);

logger.debug(
    `Current friction: ${entity.friction}`
);
```

These messages may have been invaluable while investigating movement.

Months later, they merely produce noise.

Future contributors now have to determine whether the logging still serves a purpose or is simply historical residue.

Code should not accumulate archaeological layers of previous investigations.

Once the investigation concludes, unnecessary instrumentation should leave with it.

## Replace Repeated Temporary Code With Permanent Diagnostics

Sometimes temporary debugging appears repeatedly.

An engineer adds the same logging.

Removes it.

Several weeks later another engineer adds almost identical logging.

This is a useful signal.

It usually indicates that the engine lacks an important diagnostic.

Rather than repeatedly recreating the same debugging code, build a permanent diagnostic facility.

For example:

Instead of repeatedly logging entity counts:

```typescript
logger.debug(
    `Entities: ${entityManager.getEntityCount()}`
);
```

Expose the count through a permanent diagnostics interface.

```typescript
debugOverlay.showEntityCount = true;
```

The investigation becomes easier for every future contributor.

Repeated temporary debugging often identifies opportunities for permanent engineering improvements.

## Use Feature Flags When Appropriate

Some debugging facilities are genuinely useful over long periods but should not always remain active.

Feature flags provide a clean solution.

```typescript
if (DebugFlags.showWorldBounds) {
    debugRenderer.drawWorldBounds(world);
}

if (DebugFlags.logEventDispatch) {
    logger.debug(event.name);
}
```

The code remains available without affecting normal development.

Feature flags are particularly valuable for expensive visualisations, verbose logging, and experimental diagnostics.

However, they should remain organised.

Hundreds of unrelated debug flags scattered throughout the engine become difficult to maintain.

Centralised management keeps debugging capabilities discoverable and consistent.

## Avoid Permanent Debug Clutter

A mature engine should feel intentionally engineered.

Debugging facilities should improve clarity rather than obscure it.

Temporary comments explaining investigations.

Unused helper functions.

Disabled logging.

Abandoned breakpoints.

Old validation code.

These all contribute to unnecessary complexity if left behind.

Before considering work complete, contributors should ask:

> "If another engineer reads this code in two years, will they understand why this still exists?"

If the answer is no, it probably should not remain.

Good debugging leaves behind better software.

Not more software.

---

# Investigating Bugs

The quality of an investigation is usually determined long before the first line of code is changed.

Experienced engineers rarely solve difficult problems by immediately editing implementation.

Instead, they gather evidence.

They form hypotheses.

They test those hypotheses.

They eliminate incorrect explanations until only the most likely cause remains.

Debugging therefore resembles scientific investigation far more than trial and error.

The objective is not to make the symptoms disappear.

The objective is to understand why they appeared.

## Begin With Evidence

When confronted with unexpected behaviour, the first response should be observation rather than modification.

Useful questions include:

* What actually happened?
* What should have happened?
* What evidence supports each conclusion?
* Which assumptions am I making?
* What information is missing?

These questions naturally guide the investigation toward understanding rather than speculation.

Evidence should always take precedence over intuition.

Intuition is valuable.

Evidence is verifiable.

## Ask What Changed

Software that behaved correctly yesterday but fails today rarely changes without reason.

A useful starting point is therefore:

> What changed?

The answer may involve:

* New code.
* New data.
* Different configuration.
* Different input.
* Different execution order.
* Different timing.
* Different assumptions.

Identifying change often narrows the investigation dramatically.

Even when the apparent change is unrelated, it frequently reveals where understanding first diverged from reality.

## Test Assumptions Individually

Complex bugs often involve multiple incorrect assumptions.

Avoid attempting to verify everything simultaneously.

Instead, isolate individual assumptions.

For example:

* Is the entity actually created?
* Does it receive updates?
* Is it visible?
* Is it rendered?
* Is it immediately destroyed?

Each answer removes uncertainty.

Eventually, only the incorrect assumption remains.

That assumption usually points directly toward the underlying defect.

## Resist Random Experimentation

One of the least effective debugging techniques is changing multiple pieces of code in rapid succession simply to "see what happens."

Unfortunately, this often introduces additional uncertainty.

Suppose three unrelated changes are made.

The behaviour changes.

Which modification caused the difference?

The investigation has become harder rather than easier.

Prefer small, deliberate experiments.

Each change should answer one question.

Every experiment should either confirm or reject a hypothesis.

Random experimentation produces accidental knowledge.

Systematic investigation produces reliable understanding.

## Verify the Fix

Successfully reproducing the bug is only half of the investigation.

Successfully preventing it is the other half.

After implementing a solution, contributors should deliberately repeat the original reproduction steps.

If the bug cannot be reproduced under the same conditions, confidence increases that the solution is correct.

However, verification should not stop there.

Ask additional questions.

* Does the fix introduce new behaviour?
* Does it affect unrelated systems?
* Does it violate existing assumptions?
* Does it remain correct under edge cases?
* Can the original conditions still be explained?

A fix that merely prevents the observed symptom may still leave the underlying defect intact.

The objective is not simply to make the bug disappear.

The objective is to understand why it can no longer occur.

A bug that is understood is significantly less likely to return.

---

# Error Messages

An error message is often the first—and sometimes only—communication between the software and the engineer attempting to understand it.

A poor error message creates confusion.

A good error message immediately reduces uncertainty.

The difference between the two is often measured in hours of engineering time.

Every error should answer the questions an engineer is most likely to ask.

* What happened?
* Where did it happen?
* Why did it happen?
* What information is available?
* What should be investigated next?

The more quickly these questions are answered, the more quickly the investigation can begin.

## State What Happened

Avoid vague messages that merely announce failure.

Poor:

```text
Operation failed.
```

Slightly better:

```text
Failed to load resource.
```

Better:

```text
Failed to load texture "player_idle.png".
```

Better still:

```text
Failed to load texture "player_idle.png".

Reason:
The file does not exist.

Requested by:
PlayerDefinition

Search path:
assets/sprites/player/
```

The message now provides immediate direction.

The engineer does not need to begin by discovering what resource failed.

The software already explains it.

## Identify Where It Happened

Context is often as important as the failure itself.

Consider these two examples.

```text
Duplicate entity identifier.
```

Versus:

```text
Duplicate entity identifier detected.

World:
Forest01

Entity:
GoblinWarrior

Identifier:
2748

During:
World generation
```

The second message immediately narrows the investigation.

Rather than searching the entire engine, the contributor knows exactly where to begin.

## Explain Why, If Known

Software should never invent explanations.

If the exact cause is unknown, state only what is known.

However, when the engine genuinely understands why an operation failed, communicate that information.

For example:

```text
Definition validation failed.

Property:
Health

Expected:
Value greater than or equal to zero.

Received:
-25
```

This message explains both the failure and the violated rule.

No further interpretation is required.

## Suggest the Next Step

Sometimes the most valuable part of an error message is explaining what to do next.

For example:

```text
Unable to locate configuration file.

Expected location:
config/settings.json

Create the file or restore the default configuration before restarting the engine.
```

Or:

```text
Definition validation failed.

Check the generated definition data for duplicate identifiers.
```

These suggestions shorten investigations considerably.

The objective is not to prescribe every solution.

The objective is simply to eliminate unnecessary uncertainty.

## Include Relevant Data

When reporting failures, include the information that is most likely to matter.

Useful examples include:

* Resource names
* Entity identifiers
* Definition names
* World names
* Seeds
* Coordinates
* Expected values
* Actual values
* File paths
* Operation names

For example:

```typescript
throw new Error(
    `Failed to spawn entity.

Definition: ${definition.name}
World: ${world.name}
Position: (${position.x}, ${position.y})

Reason:
Entity definition is not registered.`
);
```

Notice that the error contains only information directly related to the failure.

Avoid overwhelming contributors with unrelated implementation details.

Useful context improves understanding.

Irrelevant context becomes noise.

## Avoid Cryptic Messages

Engineers often write messages for themselves while implementing a feature.

Years later, someone else reads them.

Poor:

```text
Unexpected state.
```

Or:

```text
Invalid value.
```

Or:

```text
Assertion failed.
```

These messages communicate almost nothing.

Instead, explain the violated assumption.

```text
Assertion failed.

Expected the active world to exist after engine initialization completed.
```

Or:

```text
Renderer attempted to draw an unloaded texture.
```

The second message immediately identifies both the expectation and the failure.

Engineers should never need to decode the meaning of an error message.

The message should already contain that meaning.

---

# The Cost of Silence

Silence is one of the most expensive behaviours a software system can exhibit.

A visible failure is inconvenient.

An invisible failure is dangerous.

When software quietly ignores problems, engineers lose the opportunity to investigate the original cause.

Instead, they encounter secondary symptoms that appear disconnected from the real defect.

By the time investigation begins, the information required to explain the original failure has often disappeared.

The result is unnecessary complexity.

## Silent Failures Hide Information

Consider the following example.

```typescript
// Very poor

try {
    updateSimulation();
}
catch {
    // Continue.
}
```

The simulation may now be partially updated.

Internal state may be inconsistent.

Subsequent systems continue executing.

The original exception has vanished.

Hours later, rendering begins behaving strangely.

The investigation starts in the renderer even though the renderer was never responsible.

The software created confusion by remaining silent.

## Ignored Return Values

Silence is not limited to exceptions.

Ignoring the result of an operation can be equally damaging.

```typescript
// Poor

resourceManager.loadTexture(path);
```

Did the operation succeed?

Was the texture loaded?

Did a placeholder replace it?

Was an error reported?

The caller never asks.

Instead:

```typescript
const texture = resourceManager.loadTexture(path);

if (!texture.success) {
    logger.error(texture.reason);
    return;
}
```

The software explicitly acknowledges the possibility of failure.

Visibility improves.

Assumptions become deliberate.

## Suppressed Validation

Validation exists to identify invalid data before it becomes a larger problem.

Suppressing validation simply postpones failure.

```typescript
// Poor

if (!definition.isValid()) {
    return;
}
```

The invalid definition silently disappears.

Future systems now behave unpredictably because expected data is missing.

Instead:

```typescript
if (!definition.isValid()) {
    throw new Error(
        `Definition "${definition.name}" failed validation.`
    );
}
```

The engine immediately communicates both the failure and its cause.

## Missing Diagnostics

Silence also occurs when software provides no way to understand itself.

Suppose a contributor asks:

* How many entities exist?
* Which systems updated this frame?
* How long did world generation take?
* Which resources remain unloaded?

If the engine cannot answer these questions without modifying code, then valuable diagnostics are missing.

The absence of information is itself a form of silence.

Every investigation becomes more expensive than necessary.

## Visible Software Is Maintainable Software

Visibility is one of the defining characteristics of maintainable software.

When engineers can observe behaviour directly:

* Bugs become easier to reproduce.
* Investigations become shorter.
* Assumptions become testable.
* Confidence increases.
* Maintenance becomes less stressful.

Software should therefore prefer communication over silence whenever practical.

A visible failure is usually a solvable failure.

An invisible failure often becomes a mystery.

---

# Engineering Confidence

Confidence is one of the most valuable qualities an engineering team can possess.

It allows contributors to improve systems without constantly fearing unintended consequences.

It encourages refactoring.

It encourages experimentation.

It encourages steady evolution rather than defensive maintenance.

This confidence does not come from optimism.

It comes from understanding.

Engineers become confident when they know that incorrect assumptions will be detected quickly.

When failures are reported clearly.

When diagnostics explain what the engine is doing.

When logs preserve the story of execution.

When assertions identify impossible situations.

When instrumentation measures behaviour instead of relying on intuition.

When visual debugging reveals relationships that would otherwise remain hidden.

Each of these practices reduces uncertainty.

Together, they transform debugging from an emergency activity into an ordinary engineering workflow.

The Locomotion Engine therefore treats debugging as something that is deliberately designed into software rather than added only after problems appear.

Every subsystem should strive to explain itself.

Every validation should protect understanding.

Every assertion should reinforce important assumptions.

Every log should preserve useful history.

Every diagnostic should expose meaningful behaviour.

Every error message should help the next engineer begin their investigation with confidence rather than confusion.

Ultimately, the goal is not merely to make bugs easier to fix.

It is to build an engine whose behaviour remains understandable throughout its lifetime.

Understanding creates confidence.

Confidence enables progress.

And software that actively assists its own investigation will remain easier to build, maintain, and evolve for many years to come.

Part VII Engineering Standards

Part VII — Performance & Refactoring
Purpose

Software quality is measured in more than one dimension.

A program that executes quickly but is difficult to understand will eventually become expensive to maintain. Likewise, beautifully structured code that performs poorly in critical areas will eventually limit what the engine is capable of achieving.

The purpose of this chapter is to define how the Locomotion Engine approaches both performance and long-term code quality. These disciplines are closely related because they both seek the same objective: reducing unnecessary cost.

Sometimes that cost is measured in milliseconds.

Sometimes it is measured in engineering time.

Sometimes it is measured in the difficulty of understanding a system years after it was first written.

The objective is therefore not simply to make the engine faster.

The objective is to make the engine better.

Good engineering recognises that software evolves continuously. Every feature, every optimisation, every simplification and every refactoring becomes another step in a process that may continue for decades.

The engine will never reach a point where improvement is no longer possible.

Instead, it should become progressively easier to improve.

Performance work and refactoring should therefore be viewed as complementary disciplines.

Performance removes unnecessary computational work.

Refactoring removes unnecessary conceptual work.

One improves execution.

The other improves understanding.

Both increase the long-term value of the engine.

Neither should be performed in isolation.

Optimising poorly structured code often locks unnecessary complexity into place.

Refactoring without understanding runtime behaviour can accidentally make critical systems slower.

The strongest engineering decisions improve both.

This chapter therefore encourages a disciplined approach to continuous refinement.

Performance should be driven by evidence.

Refactoring should be driven by understanding.

Every change should leave the engine slightly easier to reason about than it was before.

Over thousands of small improvements, this philosophy produces software that not only performs well, but remains enjoyable to maintain.

Measure Before You Optimise

One of the most expensive mistakes in software engineering is solving a performance problem that does not actually exist.

Humans are surprisingly poor at estimating where software spends its time.

Code that appears expensive may execute only once during startup.

Code that appears trivial may execute millions of times every second.

Instinct is useful for forming hypotheses.

It is not sufficient for making optimisation decisions.

Performance work should therefore begin with measurement rather than modification.

Before changing code, engineers should understand:

where execution time is being spent
how often code executes
what resources are consumed
whether the observed behaviour actually affects the user
whether the proposed optimisation addresses the real bottleneck

Without this information, optimisation becomes guesswork.

Guesswork rarely produces meaningful improvements.

It frequently introduces unnecessary complexity.

Profiling

Profiling identifies where the engine spends its time while running real workloads.

Rather than asking:

"Which code looks slow?"

Profiling asks:

"Which code is actually slow?"

This distinction matters.

Consider the following example.

// Assumption:
// "This loop must be our performance problem."

for (const entity of entities) {
    entity.update(deltaTime);
}

Without measurement there is no evidence that this loop is responsible for any noticeable cost.

Perhaps the update itself is inexpensive.

Perhaps rendering dominates frame time.

Perhaps garbage collection is responsible.

Perhaps loading assets is causing visible pauses instead.

Profiling removes speculation.

It directs engineering effort toward the areas that actually matter.

Benchmarking

Profiling identifies where time is spent.

Benchmarking compares different implementations under controlled conditions.

Suppose two algorithms both produce identical behaviour.

function findEntityLinear(id: number): Entity | undefined {
    for (const entity of entities) {
        if (entity.id === id) {
            return entity;
        }
    }

    return undefined;
}

A benchmark might compare this implementation with an alternative data structure.

Only after measurement should one be preferred over the other.

The faster implementation may also consume more memory.

The simpler implementation may already be sufficiently fast.

Engineering is rarely about maximising a single metric.

It is about choosing the best balance for the engine as a whole.

Measure Real Workloads

Artificial tests are useful.

Real workloads are essential.

An optimisation that improves an empty scene by fifty percent may provide no measurable improvement once hundreds of entities are active.

Likewise, optimising synthetic benchmarks can produce code that performs worse under genuine gameplay conditions.

Measure the workloads the engine actually performs.

Not the workloads that happen to be convenient to test.

Identify Bottlenecks

Every optimisation should answer one simple question:

What is currently limiting performance?

If the renderer consumes 80% of frame time, optimising an infrequently executed utility function will produce almost no observable improvement.

Likewise, reducing a startup routine from twenty milliseconds to five milliseconds is unlikely to matter if startup already completes in under a second.

Engineering effort should target constraints that meaningfully affect the engine.

Everything else can wait.

Evidence Over Assumption

The fastest route to poor optimisation is confidence unsupported by evidence.

Statements such as:

"This feels expensive."

"Arrays are probably too slow."

"Objects always allocate too much memory."

should be treated as hypotheses rather than conclusions.

Good engineers replace assumptions with measurements.

Better engineers continue measuring after the optimisation has been completed.

Verification is just as important as diagnosis.

An optimisation that fails to improve measurable performance is not an optimisation.

It is simply different code.

Readability Before Micro-Optimisation

Performance matters.

Readability matters more.

This statement often surprises inexperienced developers, but it reflects the reality of maintaining large software systems.

Most code is read far more often than it is written.

Every engineer who touches the engine must first understand it before they can safely improve it.

Readable code therefore provides long-term value that frequently outweighs tiny execution improvements.

Consider the following implementation.

function calculateDistance(a: Vector2, b: Vector2): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;

    return Math.sqrt(dx * dx + dy * dy);
}

Its intent is immediately obvious.

Now compare it with a version that attempts to be clever.

function d(a: Vector2, b: Vector2): number {
    return ((b.x - a.x) ** 2 + (b.y - a.y) ** 2) ** 0.5;
}

Both produce identical behaviour.

Neither is meaningfully faster.

One is considerably easier to understand.

Future optimisation is also easier because the first implementation exposes intermediate values that can be inspected, reused or modified without rewriting the entire expression.

Clarity creates opportunities for future improvement.

Obscurity removes them.

Avoid Clever Code

Micro-optimisations often encourage increasingly cryptic code.

// Difficult to understand.

index = value < limit ? value : limit;

versus

const clampedValue = Math.min(value, limit);

index = clampedValue;

The second version communicates intent immediately.

The first requires the reader to mentally evaluate the expression before understanding its purpose.

Saving a handful of characters is rarely an engineering improvement.

Optimise Where It Matters

There are circumstances where specialised code is justified.

An inner rendering loop executed millions of times every second deserves careful optimisation.

A configuration parser executed once during startup probably does not.

The more frequently code executes, the stronger the justification for accepting additional complexity.

Outside these situations, readability should remain the default priority.

Clear code is easier to verify.

Easier to profile.

Easier to optimise.

Easier to refactor.

And much easier to trust.

When performance improvements eventually become necessary, engineers begin from a foundation they can actually understand.

Premature Optimisation

One of the most frequently quoted principles in software engineering is:

"Premature optimisation is the root of all evil."

Like many famous quotations, it is often repeated more than it is understood.

The principle does not suggest that performance is unimportant.

It suggests that optimisation performed before sufficient understanding usually produces poor engineering decisions.

Early in the life of a system, the architecture is still evolving.

Requirements change.

Interfaces change.

Responsibilities move.

Data structures mature.

At this stage, aggressively optimising every function often creates unnecessary complexity around code that may later disappear entirely.

The result is wasted effort and software that is more difficult to modify.

Allow the Architecture to Mature

Simple code evolves more easily.

Complex optimised code resists change.

Suppose the engine begins with a straightforward implementation.

function updateWorld(world: World, deltaTime: number): void {
    for (const entity of world.entities) {
        entity.update(deltaTime);
    }
}

Months later, profiling reveals that entity updates dominate frame time.

Only then is there enough information to ask meaningful questions.

Would batching improve performance?

Would spatial partitioning help?

Would inactive entities benefit from sleeping?

Would different scheduling reduce unnecessary work?

These decisions are now informed by real experience rather than speculation.

If the original implementation had been heavily optimised from day one, much of that work may have needed to be discarded once the architecture became better understood.

Solve Demonstrated Problems

Optimisation should answer an existing problem.

Not a hypothetical one.

Poor reasoning often sounds like this:

"One day we might have 500,000 entities."

The better question is:

"How many entities do we have today?"

If the engine comfortably supports current workloads, additional complexity provides little value.

Future requirements can be addressed when they become real.

This does not mean ignoring scalability.

It means designing for evolution instead of attempting to predict every possible future.

Complexity Has a Cost

Every optimisation introduces maintenance cost.

Additional caches.

Additional invalidation rules.

Additional state.

Additional assumptions.

Additional opportunities for bugs.

These costs persist long after the performance gain has been forgotten.

Engineers should therefore ask whether an optimisation earns its permanent place in the codebase.

If the answer is uncertain, simplicity is usually the better investment.

Optimise the Design Before the Code

Many performance problems disappear through better architecture rather than faster implementation.

Consider these two approaches.

// Poor approach.
// Search every entity every frame.

for (const entity of world.entities) {
    if (entity.id === targetId) {
        return entity;
    }
}

Later, the design evolves.

// Better architecture.

return world.entityRegistry.get(targetId);

The improvement did not come from writing more complicated code.

It came from choosing a better representation of the problem.

This pattern appears repeatedly throughout mature software.

Large performance gains often result from better design rather than more clever implementation.

Understanding Cost

Performance is not a single number.

Software consumes many different kinds of resources, and improving one often increases another.

Good engineering requires understanding these trade-offs rather than chasing one metric in isolation.

CPU

CPU time represents computational work.

Heavy calculations, complex algorithms and repeated processing all consume processor time.

Reducing unnecessary computation is one of the most direct ways to improve performance.

However, replacing readable code with obscure optimisations simply to reduce a few instructions is rarely worthwhile unless the code exists on a demonstrably hot execution path.

Memory

Memory allows information to remain available.

Using additional memory can dramatically reduce computation.

Likewise, reducing memory usage may require additional computation.

Neither choice is inherently correct.

For example:

// Recalculate every request.

function getLength(v: Vector2): number {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

versus

class Vector2 {
    public length = 0;

    public recalculateLength(): void {
        this.length = Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

The second implementation trades memory and maintenance complexity for reduced computation.

Whether this is beneficial depends entirely on how frequently the value is used and how often it changes.

Allocations

Creating new objects is inexpensive.

Creating millions of unnecessary objects every frame is not.

Frequent allocations increase pressure on memory management and often lead to additional garbage collection.

For example:

// Allocates a new object every update.

function getPosition(): Vector2 {
    return {
        x: player.x,
        y: player.y
    };
}

Where appropriate:

// Reuses an existing object.

function getPosition(out: Vector2): Vector2 {
    out.x = player.x;
    out.y = player.y;

    return out;
}

This approach is justified only where allocations become a measured performance concern.

Outside performance-critical systems, the simpler implementation may remain preferable.

Garbage Collection

Automatic memory management removes a large class of programming errors.

It does not remove the cost of allocating memory.

Garbage collection pauses often arise because unnecessary temporary objects are continually created.

The most effective optimisation is frequently not making allocation faster.

It is avoiding unnecessary allocation altogether.

Bandwidth

Moving data also has a cost.

Whether transferring information between systems, copying large arrays or moving data to the GPU, bandwidth eventually becomes a limiting factor.

Reducing unnecessary data movement often improves performance more effectively than optimising individual calculations.

Disk Access

Storage is dramatically slower than memory.

Loading data repeatedly from disk when it could remain in memory may dominate startup and loading performance.

Conversely, loading everything eagerly increases memory usage.

These are engineering trade-offs rather than universal rules.

Rendering

Rendering frequently dominates frame time.

Reducing unnecessary draw calls, avoiding redundant state changes and preventing invisible objects from being rendered often produces larger gains than micro-optimising mathematical calculations.

Removing unnecessary rendering work is usually more valuable than making existing rendering work marginally faster.

Simulation

Simulation cost grows with the amount of work performed each update.

Inactive systems should not continue performing active computation.

Objects that cannot affect the current frame should not consume significant processing time.

The best simulation is often the one that simply performs less work.

Loading

Fast runtime performance means little if the engine spends excessive time loading.

Loading should therefore be considered another aspect of overall performance.

Caching, preprocessing and efficient resource management can significantly improve the user's experience before gameplay even begins.

Engineering Is Trade-Offs

Optimisation is fundamentally an exercise in balancing competing costs.

Reducing CPU usage may increase memory consumption.

Reducing memory usage may increase computation.

Caching improves speed while increasing complexity.

Compression reduces storage while increasing decompression cost.

There are very few universally correct decisions.

Instead, engineers continually balance competing constraints to produce the most practical overall solution.

The objective is not to eliminate every cost.

It is to spend resources where they provide the greatest value.

Optimising the Right Thing

Not every piece of code deserves the same attention.

Some functions execute once during startup.

Others execute once every frame.

Some run only when loading a saved game.

Others are responsible for every visible object on screen.

Engineering effort should reflect this difference.

Hot Paths

A hot path is code that executes frequently enough for small inefficiencies to accumulate into measurable cost.

Examples include:

entity updates
rendering loops
collision detection
animation systems
procedural generation running during gameplay

Because these systems execute repeatedly, even modest improvements may produce significant gains.

Optimisation effort is therefore justified once profiling demonstrates that they meaningfully contribute to runtime cost.

Cold Paths

Cold paths execute infrequently.

Configuration loading.

Developer tooling.

Editor utilities.

Startup validation.

These systems should prioritise simplicity and readability unless they become a demonstrated source of user-facing delays.

An elegant startup parser that takes ten milliseconds instead of five is almost never worth sacrificing maintainability for.

Critical Systems

Some systems are critical not because they execute frequently, but because delays are highly visible.

Examples include:

frame scheduling
input processing
asset streaming
save and load operations

These deserve careful engineering because their behaviour directly affects the user's experience.

Performance work should therefore consider impact as well as frequency.

Prioritise Engineering Time

Engineering time is itself a limited resource.

Spending two weeks improving a function that contributes 0.1% of total frame time is rarely a wise investment.

Spending a day eliminating a bottleneck responsible for 40% of execution time almost always is.

The objective is not simply to optimise code.

It is to optimise the value produced by engineering effort.

Mature software improves because engineers consistently work on the problems that matter most.

Refactoring Philosophy

Refactoring is one of the most valuable engineering activities performed throughout the lifetime of a software project.

Unfortunately, it is also one of the most misunderstood.

Refactoring is often treated as a luxury reserved for periods of low workload.

In reality, it is one of the primary mechanisms through which software remains healthy.

Without regular refactoring, complexity accumulates gradually.

Small compromises become accepted patterns.

Temporary solutions become permanent architecture.

Understanding becomes increasingly expensive.

Eventually, every future change requires more effort than the last.

Refactoring exists to prevent this gradual decline.

It is the continuous process of improving the structure of software while preserving its observable behaviour.

Nothing new is added.

Nothing existing should break.

The software simply becomes easier to understand, easier to extend and easier to maintain.

Refactoring Improves Understanding

Every engineer eventually encounters code that works but is difficult to explain.

Perhaps responsibilities have become blurred.

Perhaps a function performs too many unrelated tasks.

Perhaps variable names no longer describe what the code actually does.

These situations rarely require new functionality.

They require clearer expression.

Consider the following example.

function update(entity: Entity): void {

    if (entity.health > 0) {

        if (!entity.isFrozen) {

            if (!entity.isSleeping) {

                entity.position.x += entity.velocity.x;
                entity.position.y += entity.velocity.y;

            }

        }

    }

}

The behaviour is correct.

The structure is difficult to read.

A small refactoring improves understanding without altering behaviour.

function update(entity: Entity): void {

    if (!canMove(entity)) {
        return;
    }

    applyMovement(entity);

}

function canMove(entity: Entity): boolean {
    return (
        entity.health > 0 &&
        !entity.isFrozen &&
        !entity.isSleeping
    );
}

function applyMovement(entity: Entity): void {
    entity.position.x += entity.velocity.x;
    entity.position.y += entity.velocity.y;
}

The second version communicates intent instead of implementation.

Future engineers can understand what the code does before worrying about how it does it.

Understanding is often the greatest improvement refactoring provides.

Refactoring Preserves Behaviour

A defining characteristic of refactoring is that behaviour does not intentionally change.

If behaviour changes, the work is no longer purely refactoring.

It has become feature development, bug fixing or architectural redesign.

This distinction is important.

Keeping behavioural changes separate from structural improvements makes both easier to review, verify and reason about.

Whenever possible:

improve structure first
verify behaviour remains unchanged
introduce new behaviour afterwards

Separating these activities reduces uncertainty and makes future problems significantly easier to diagnose.

Refactoring Reduces Complexity

Complexity is rarely removed by deleting large amounts of code.

More often it disappears through small structural improvements.

Responsibilities become clearer.

Relationships become simpler.

Unnecessary duplication disappears.

Special cases become general solutions.

The objective is not fewer lines of code.

The objective is fewer ideas that must exist simultaneously in the reader's mind.

Software becomes easier when it asks engineers to understand fewer concepts at once.

Refactoring Is Continuous

Healthy software is rarely produced through occasional cleanup projects.

Instead, it improves through hundreds of small refinements made during normal development.

Every feature provides an opportunity to improve the surrounding code.

Every bug fix provides an opportunity to simplify a nearby function.

Every optimisation provides an opportunity to remove unnecessary complexity introduced by previous implementations.

Waiting for a dedicated "refactoring phase" usually means the code has already become more complicated than necessary.

Continuous improvement prevents this accumulation.

Refactoring Is Not Rewriting

One of the greatest dangers in long-lived software projects is confusing refactoring with rewriting.

Refactoring improves existing software.

Rewriting replaces it.

These are fundamentally different activities.

A rewrite often begins with good intentions.

"The old code is messy."

"We understand the problem better now."

"It would be faster to start again."

Occasionally these statements are true.

Far more often they underestimate the knowledge embedded within the existing implementation.

Years of bug fixes.

Edge cases.

Performance improvements.

Production experience.

All of this knowledge is easy to discard accidentally.

Large rewrites also postpone value.

While engineers rebuild existing functionality, little new capability reaches the engine.

Progress becomes difficult to measure.

Risk increases.

Whenever practical, prefer improving an existing system over replacing it.

If replacement truly becomes necessary, it should be supported by clear technical evidence rather than frustration with the current implementation.

The objective is not to create new code.

The objective is to create better software.

Small Refactorings

The healthiest codebases rarely undergo dramatic transformation.

Instead, they improve through thousands of small changes that individually appear insignificant but collectively produce remarkable results.

These improvements require little planning.

They introduce little risk.

They preserve momentum.

Most importantly, they encourage engineers to treat quality as part of everyday development rather than a separate activity.

Extract Functions

Large blocks of code often contain natural units of responsibility.

Extracting these responsibilities into well-named functions improves readability immediately.

Before:

function updateEnemy(enemy: Enemy): void {

    enemy.velocity.y += GRAVITY;

    enemy.position.x += enemy.velocity.x;
    enemy.position.y += enemy.velocity.y;

    if (enemy.position.y > FLOOR_Y) {
        enemy.position.y = FLOOR_Y;
        enemy.velocity.y = 0;
    }

}

After:

function updateEnemy(enemy: Enemy): void {

    applyGravity(enemy);
    integrateMovement(enemy);
    resolveGroundCollision(enemy);

}

The implementation has not changed.

Only the organisation has.

The reader now understands the update process before examining its details.

Improve Names

Names often become outdated as software evolves.

Renaming variables and functions is one of the simplest and highest-value refactorings available.

Poor:

const t = calculate(delta);

Better:

const frameDuration = calculateFrameDuration(delta);

Longer names are acceptable when they significantly improve understanding.

The objective is communication rather than brevity.

Reduce Duplication

Duplicated logic creates duplicated maintenance.

Suppose collision checks appear repeatedly.

if (player.x < wall.x + wall.width &&
    player.x + player.width > wall.x &&
    player.y < wall.y + wall.height &&
    player.y + player.height > wall.y) {

    // ...
}

Eventually this appears dozens of times.

Extracting the behaviour reduces future maintenance.

if (intersects(player, wall)) {
    // ...
}

One improvement now benefits every caller.

Clarify Intent

Sometimes code is technically correct but mentally exhausting.

Small structural improvements often communicate intent much more effectively.

Instead of:

if (!(entity.health <= 0)) {

Prefer:

if (entity.isAlive()) {

Or:

if (entity.health > 0) {

Reducing mental effort is a legitimate engineering improvement.

Simplify Logic

Complex branching frequently hides surprisingly simple behaviour.

Before:

if (enabled) {

    if (loaded) {

        run();

    }

}

After:

if (!enabled || !loaded) {
    return;
}

run();

Early exits reduce indentation and make the primary execution path immediately visible.

Improve Organisation

Related responsibilities should remain close together.

Unrelated responsibilities should be separated.

This may involve moving helper functions nearer to their callers, grouping related logic or reorganising code to reflect how engineers naturally think about the problem.

Organisation is not cosmetic.

It directly influences how quickly engineers build accurate mental models of the system.

Small Improvements Compound

No individual refactoring transforms a codebase.

A hundred small improvements do.

Over months and years these incremental refinements create software that feels significantly cleaner despite never undergoing dramatic reinvention.

This gradual improvement is one of the defining characteristics of mature engineering.

Small changes are easier to understand.

Easier to verify.

Easier to review mentally.

And far less likely to introduce unintended consequences.

The cumulative effect is far greater than the effort required to produce it.

Recognising Code Smells

Every software system develops imperfections.

This is not evidence of poor engineering.

It is evidence that the software has evolved.

Requirements change.

Understanding improves.

Features accumulate.

Ideas that once appeared elegant eventually reveal limitations.

Recognising these situations early allows the engine to improve before complexity becomes deeply embedded.

A code smell is not necessarily a bug.

It is not proof that code is incorrect.

Instead, it is an indication that the surrounding design deserves closer examination.

The presence of a code smell should prompt curiosity rather than criticism.

The question is not:

"Who wrote this?"

The better question is:

"Why has the code become difficult to understand?"

That question almost always produces more valuable engineering decisions.

Long Functions

Functions naturally grow over time.

New requirements are added.

Edge cases appear.

Temporary workarounds survive longer than expected.

Eventually a function performs several responsibilities at once.

For example:

function updateGame(): void {

    handleInput();

    updatePlayer();

    updateEnemies();

    updateProjectiles();

    updateParticles();

    updatePhysics();

    updateAudio();

    updateAnimations();

    updateUserInterface();

    saveGameIfNecessary();

    render();

}

Nothing here is necessarily incorrect.

The problem is that the function has become responsible for almost every subsystem.

Future modification now requires understanding all of them simultaneously.

A better approach separates responsibilities.

function updateGame(): void {

    updateSimulation();

    updatePresentation();

}

function updateSimulation(): void {

    handleInput();

    updateWorld();

    updateAudio();

}

function updatePresentation(): void {

    updateUserInterface();

    render();

}

Breaking work into coherent units makes the overall system easier to understand without changing its behaviour.

Large Classes

Classes often become convenient places to add "just one more responsibility."

Eventually they know far more than they should.

class Game {

    // Input

    // Audio

    // Rendering

    // Saving

    // Physics

    // UI

    // Networking

    // AI

}

This type of class gradually becomes impossible to reason about because every change risks affecting unrelated systems.

Large classes usually indicate missing concepts rather than insufficient code.

The solution is rarely adding more methods.

It is identifying responsibilities that deserve their own home.

Deep Nesting

Deep indentation forces readers to remember numerous conditions before reaching the code that actually matters.

if (player) {

    if (player.isAlive()) {

        if (!player.isFrozen()) {

            if (player.hasWeapon()) {

                attack();

            }

        }

    }

}

Flattening the structure often improves readability dramatically.

if (!player) {
    return;
}

if (!player.isAlive()) {
    return;
}

if (player.isFrozen()) {
    return;
}

if (!player.hasWeapon()) {
    return;
}

attack();

The behaviour remains identical.

The intent becomes significantly clearer.

Duplicated Logic

Repeated code rarely stays identical forever.

One copy receives a bug fix.

Another receives a new feature.

Eventually similar code behaves differently for reasons nobody remembers.

Suppose collision handling appears throughout the engine.

if (intersects(a, b)) {

    resolveCollision(a, b);

}

The collision test itself should not exist in twenty different places.

Shared behaviour should exist once.

The fewer copies that exist, the fewer opportunities there are for inconsistent behaviour to emerge.

Hidden State

Software becomes difficult to reason about when important behaviour depends upon state that is invisible to the reader.

Consider:

function update(): void {

    process();

}

Nothing here explains why process() behaves differently every frame.

If process() silently depends upon global variables, hidden caches or external mutable state, understanding quickly becomes difficult.

Prefer explicit dependencies.

function update(world: World): void {

    process(world);

}

The reader can now see where information originates.

Explicit relationships are almost always easier to maintain than hidden ones.

Excessive Parameters

Long parameter lists often indicate that a function is performing multiple responsibilities.

function createEnemy(

    x: number,
    y: number,
    health: number,
    speed: number,
    sprite: Sprite,
    weapon: Weapon,
    faction: Faction,
    level: number,
    difficulty: Difficulty

): Enemy {

    // ...

}

When parameter lists continue growing, it is worth asking whether the function is modelling the problem correctly.

Sometimes introducing a higher-level concept communicates intent more effectively.

function createEnemy(definition: EnemyDefinition): Enemy {

    // ...

}

The function signature now reflects the conceptual model rather than a collection of unrelated values.

Boolean Flags Controlling Behaviour

Boolean parameters frequently indicate that one function performs two different jobs.

function renderEntity(entity: Entity, debug: boolean): void {

    if (debug) {
        renderDebug(entity);
    } else {
        renderNormal(entity);
    }

}

The caller must now understand what the flag means.

Separate functions often express intent more clearly.

renderEntity(entity);

renderEntityDebug(entity);

The function name now communicates behaviour directly.

Large Switch Statements

Large switch statements are not inherently wrong.

Sometimes they are the simplest correct solution.

However, extremely large switches that continually grow often indicate that responsibilities are becoming centralised unnecessarily.

switch (enemy.type) {

    case EnemyType.Goblin:
        ...
        break;

    case EnemyType.Skeleton:
        ...
        break;

    case EnemyType.Orc:
        ...
        break;

    case EnemyType.Wizard:
        ...
        break;

    // dozens more...

}

As more cases appear, maintenance becomes increasingly difficult.

The question is not whether switches are allowed.

The question is whether the design still communicates responsibilities clearly.

Repeated Conditionals

Repeated business rules scattered throughout the engine increase the likelihood of inconsistent behaviour.

if (entity.health > 0) {

    // ...

}

If this condition appears throughout dozens of systems, the engine now has dozens of places that define what "alive" means.

Encapsulating this knowledge reduces duplication.

if (entity.isAlive()) {

    // ...

}

The rule now exists in one place.

Future changes require one modification instead of many.

Magic Values

Numbers without explanation force readers to guess their meaning.

player.speed *= 0.85;

Why 0.85?

A named value communicates intent.

const MOVEMENT_SLOWDOWN = 0.85;

player.speed *= MOVEMENT_SLOWDOWN;

The behaviour has not changed.

Understanding has.

Circular Dependencies

When two systems depend upon one another, modifying either becomes increasingly risky.

Circular relationships make software harder to test, harder to reason about and harder to evolve.

Healthy systems generally form clear directional relationships.

When circular dependencies appear, they often indicate that responsibilities have become blurred.

Rather than introducing another workaround, examine whether the conceptual boundaries should be clarified.

Temporary Solutions That Become Permanent

Almost every engineer has written code intended to exist "just until next week."

Occasionally it remains for years.

Temporary solutions are not failures.

Ignoring them is.

If a deliberate compromise has been made, document it.

Track it.

Revisit it.

Temporary code should remain visibly temporary.

Otherwise it slowly becomes indistinguishable from deliberate architecture.

Code Smells Are Opportunities

Code smells should never be treated as reasons for blame.

They are indicators.

Signals that the software has reached a point where additional understanding may be valuable.

Every mature codebase contains them.

The difference between healthy and unhealthy projects is not whether code smells exist.

It is whether engineers recognise them and steadily improve them over time.

A code smell is therefore not an accusation.

It is an invitation to make the engine slightly better than it was yesterday.

Abstraction

Abstraction is one of the most powerful tools available to a software engineer.

It is also one of the easiest to misuse.

Well-designed abstractions simplify systems.

Poor abstractions spread complexity throughout an entire codebase.

The goal is therefore not to maximise abstraction.

The goal is to introduce it only when it genuinely reduces complexity.

Abstraction Is a Tool, Not a Goal

It is tempting to abstract code as soon as duplication appears.

This instinct is understandable.

However, two similar pieces of code are not necessarily the same problem.

Premature abstraction often combines unrelated ideas simply because they currently look alike.

Over time, those differences become increasingly difficult to accommodate.

The abstraction becomes more complicated than either original implementation.

Sometimes duplication is simply evidence that understanding has not yet matured.

Waiting allows patterns to reveal themselves naturally.

Wait for Patterns to Emerge

One occurrence teaches very little.

Two occurrences suggest a possibility.

Three or more similar implementations often reveal a genuine pattern.

Instead of abstracting immediately:

movePlayer();

moveEnemy();

Allow the design to evolve.

Only after understanding the shared behaviour should a common abstraction be considered.

The objective is not to eliminate duplication at the earliest opportunity.

It is to eliminate the right duplication.

A good abstraction removes complexity.

A poor abstraction hides it.

This distinction is easy to overlook.

Consider two independent systems.

function updatePlayer(player: Player): void {
    // Player-specific behaviour.
}

function updateEnemy(enemy: Enemy): void {
    // Enemy-specific behaviour.
}

Both functions happen to begin with the word update.

That alone is not sufficient reason to create a common abstraction.

// Premature abstraction.

function updateCharacter(character: Character): void {

    if (character.type === "player") {
        // ...
    }

    if (character.type === "enemy") {
        // ...
    }

}

The duplication has disappeared.

The complexity has not.

Instead, the complexity has merely moved into one larger function that now understands multiple responsibilities.

An abstraction should reduce the number of concepts an engineer must understand.

If it increases them, it has failed.

Avoid Speculative Frameworks

One of the most common sources of unnecessary complexity is solving problems that have not yet appeared.

Engineers often imagine future requirements.

Perhaps there will be multiple rendering backends.

Perhaps networking will eventually be required.

Perhaps the engine will one day support plug-in scripting.

These are all reasonable possibilities.

They are poor reasons to introduce abstraction today.

Consider this simple renderer.

class Renderer {

    render(world: World): void {
        // Draw the world.
    }

}

Contrast this with an implementation designed for several hypothetical futures.

interface IRenderer {

    render(world: World): void;

}

class CanvasRenderer implements IRenderer {

    render(world: World): void {
        // ...
    }

}

class RendererFactory {

    createRenderer(): IRenderer {
        // ...
    }

}

If the engine genuinely requires multiple rendering implementations, this structure may eventually become appropriate.

Until then, it introduces additional concepts, additional files and additional maintenance without solving an existing problem.

Abstraction should emerge from demonstrated need.

Not from imagination.

Duplicate Until You Understand

This idea often feels uncomfortable.

Developers are taught to avoid duplication.

That advice is generally correct.

However, removing duplication too early frequently produces abstractions that are difficult to evolve.

Temporary duplication provides valuable information.

It allows independent implementations to develop naturally.

Only after their similarities and differences become well understood should they be combined.

A small amount of duplication is usually less expensive than a poor abstraction.

Duplicated code is easy to recognise.

Incorrect abstraction is much harder to remove because other systems gradually become dependent upon it.

Abstractions Should Disappear

The best abstractions become almost invisible.

Engineers use them without constantly thinking about how they work.

They simplify conversations.

They simplify implementation.

They simplify maintenance.

When explaining an abstraction requires significantly more effort than explaining the code it replaces, it is probably the wrong abstraction.

A useful rule is surprisingly simple:

Every abstraction should make the engine easier to understand than it was before.

If it does not, it deserves reconsideration.

Technical Debt

Every long-lived software project accumulates technical debt.

This is not unusual.

It is unavoidable.

Technical debt is simply the collection of engineering compromises made while balancing time, knowledge, risk and delivery.

The objective is therefore not to eliminate all technical debt.

The objective is to manage it deliberately.

Debt becomes dangerous only when it accumulates unnoticed or is ignored for too long.

Intentional Debt

Sometimes the correct engineering decision is knowingly accepting a temporary compromise.

Perhaps a feature must be completed before a milestone.

Perhaps implementation experience is still limited.

Perhaps the architecture is expected to evolve shortly.

In these situations, a temporary solution may be entirely reasonable.

The important distinction is awareness.

Engineers should recognise that the compromise exists.

They should understand why it was made.

They should record what remains to be improved.

Intentional debt is a conscious investment.

Like financial debt, it should exist because the expected return justifies the cost.

Accidental Debt

Not all debt is deliberate.

Sometimes understanding simply improves.

A design that once appeared sensible gradually reveals weaknesses.

Requirements evolve.

Assumptions become outdated.

Systems grow beyond their original scope.

This type of debt is nobody's fault.

It reflects learning.

As the engine matures, yesterday's good decisions occasionally become today's opportunities for improvement.

Recognising this without assigning blame encourages healthier engineering discussions.

Neglected Debt

The most expensive technical debt is neither intentional nor accidental.

It is neglected.

This occurs when engineers repeatedly postpone improvements despite understanding that the existing implementation has become unnecessarily costly.

Temporary workarounds accumulate.

Code becomes increasingly fragile.

Fear of change begins replacing confidence.

Eventually, even simple features become expensive because every modification risks unexpected consequences.

Neglected debt compounds over time.

Like interest, the longer it remains unpaid, the more expensive it becomes.

Document Deliberate Compromises

If an engineer intentionally introduces technical debt, future engineers should not be required to rediscover it.

A simple explanation is often sufficient.

For example:

// Temporary implementation.
//
// Current collision system performs a linear search.
// Replace with spatial partitioning if profiling shows
// collision detection becoming a measurable bottleneck.

This comment communicates:

why the current approach exists
why it is acceptable today
under what circumstances it should change

Future work is now guided by evidence rather than speculation.

Pay Down Debt Regularly

Technical debt rarely disappears on its own.

Small improvements made consistently are usually far less disruptive than occasional large cleanup projects.

Whenever a system is modified, consider whether a nearby compromise can also be improved.

Perhaps a confusing variable can be renamed.

Perhaps a duplicated helper can be extracted.

Perhaps an outdated workaround is no longer necessary.

These improvements are often inexpensive because the engineer already understands the surrounding code.

Regular maintenance prevents debt from becoming overwhelming.

Debt Is Not Failure

Technical debt is frequently discussed negatively.

This is unfortunate.

Every mature software project contains debt.

The important question is not:

"Does technical debt exist?"

It is:

"Is the project actively managing it?"

A healthy codebase is not one without debt.

It is one where engineers continually recognise, evaluate and reduce debt as part of normal development.

Large Refactors

Most refactoring should be small.

Occasionally, however, a system reaches the point where incremental improvement is no longer sufficient.

Responsibilities have become intertwined.

Architecture has significantly evolved.

Fundamental assumptions have changed.

At this point, a larger refactoring may become appropriate.

Large refactors should remain uncommon.

They introduce greater risk, require broader understanding and affect more of the engine simultaneously.

When undertaken, they should be approached deliberately.

Prepare Before Changing

Large refactors begin with understanding.

Before changing code, engineers should answer questions such as:

What problem is being solved?
Which systems are affected?
Which behaviours must remain unchanged?
What evidence demonstrates that refactoring is justified?

Understanding reduces risk more effectively than writing code.

Planning is therefore an engineering activity, not administrative overhead.

Measure the Impact

A successful refactor should improve the engine in measurable ways.

Perhaps the code becomes significantly easier to understand.

Perhaps duplication disappears.

Perhaps performance improves.

Perhaps maintenance becomes simpler.

The expected benefit should be understood before work begins.

Otherwise it becomes difficult to determine whether the refactor has actually succeeded.

Preserve Behaviour

The defining characteristic of a refactor remains unchanged regardless of its size.

Behaviour should be preserved.

Users should not notice that a refactor has occurred.

The engine should simply become easier to understand, easier to maintain or easier to extend.

If behaviour must change as part of the work, separate those changes wherever practical.

For example:

Refactor the existing implementation.
Verify that behaviour remains identical.
Introduce the new feature or behavioural change.

Separating structural and behavioural changes reduces uncertainty and makes future regressions significantly easier to identify.

Test Continuously

Large refactors should not be treated as a single enormous task completed weeks later.

Instead, they should progress through a series of small, verifiable steps.

Each completed step should leave the engine in a working state.

This approach provides several advantages.

Problems are discovered earlier.

Unexpected consequences remain localised.

Progress remains measurable.

Confidence increases because every intermediate stage has been exercised rather than assumed to be correct.

Incremental verification is considerably safer than hoping a massive change works at the end.

Reduce Risk

Large refactors fail most often because they attempt to solve too many problems simultaneously.

For example:

reorganising architecture
replacing algorithms
introducing new abstractions
adding features
changing data structures

Each of these activities carries risk independently.

Combining them makes failures significantly harder to diagnose.

Instead, isolate changes whenever practical.

One improvement should solve one primary problem.

Smaller objectives make better engineering.

Avoid the "Rewrite Everything" Mentality

Every experienced engineer eventually encounters a system that appears beyond repair.

The temptation is understandable.

"If we started again, we could design it properly."

Occasionally this is true.

Far more often it is not.

Existing systems contain years of accumulated understanding.

Subtle edge cases.

Unexpected production behaviour.

Performance improvements.

Lessons that are rarely documented anywhere else.

A complete rewrite discards this knowledge as easily as it discards poor code.

Rewrites also create an illusion of progress.

For months, engineers may reproduce functionality that already existed while delivering little additional capability.

Incremental improvement is usually a better investment.

The engine continues evolving.

Existing functionality continues providing value.

Understanding grows continuously rather than being abandoned.

Large refactors should therefore remain exceptional.

The default strategy should always be:

Improve what already exists.

Performance Mindset

Performance is not a collection of isolated optimisation techniques.

It is a way of thinking about work.

Every frame, every allocation and every calculation represents work performed by the engine.

The most effective optimisation is often not making work faster.

It is avoiding unnecessary work altogether.

Avoid Unnecessary Allocations

Object creation is inexpensive.

Excessive object creation is not.

Temporary objects created repeatedly inside hot execution paths increase memory pressure and eventually require garbage collection.

For example:

function update(entity: Entity): void {

    const position = {
        x: entity.position.x,
        y: entity.position.y
    };

    process(position);

}

If profiling demonstrates that this allocation occurs frequently enough to matter, reuse becomes appropriate.

const scratchPosition = {
    x: 0,
    y: 0
};

function update(entity: Entity): void {

    scratchPosition.x = entity.position.x;
    scratchPosition.y = entity.position.y;

    process(scratchPosition);

}

This optimisation should be driven by evidence.

Outside performance-critical paths, the simpler implementation often remains preferable.

Cache Only When Justified

Caching can dramatically improve performance.

It can also become one of the largest sources of hidden complexity.

Every cache introduces questions.

When is it updated?

When is it invalidated?

Who owns it?

What happens if the cached value becomes stale?

Consider this example.

function worldBounds(): Rectangle {

    return calculateWorldBounds();

}

If calculating bounds becomes a measurable bottleneck, caching may become appropriate.

private cachedBounds: Rectangle;
private boundsDirty = true;

function worldBounds(): Rectangle {

    if (this.boundsDirty) {

        this.cachedBounds = calculateWorldBounds();
        this.boundsDirty = false;

    }

    return this.cachedBounds;

}

Performance improves.

Complexity also increases.

The additional maintenance cost must therefore be justified by measurable benefit.

A cache that saves insignificant work is simply another source of potential bugs.

Reuse Objects Where Appropriate

Long-lived objects that perform repeated work often benefit from reuse.

This reduces allocation pressure and allows frequently accessed data to remain available.

However, object reuse should never make ownership ambiguous.

Clear lifetime management is more valuable than avoiding a handful of allocations.

Optimisation should not compromise correctness.

Avoid Hidden Work

One of the easiest ways to create performance problems is performing work that nobody realises is occurring.

Examples include:

recalculating unchanged values
repeatedly sorting identical collections
loading resources multiple times
updating invisible objects
traversing data that has not changed

Hidden work is dangerous because engineers rarely think to measure it.

Making work explicit frequently reveals opportunities for substantial simplification.

Prefer Simple Algorithms

The fastest implementation is not always the most complicated.

Simple algorithms are:

easier to understand
easier to profile
easier to optimise
easier to replace when necessary

Complex algorithms should solve demonstrated problems rather than anticipated ones.

The simplest correct algorithm is often the strongest starting point.

Understand Algorithmic Complexity

Performance is influenced not only by implementation but also by growth.

An algorithm that performs well for ten entities may struggle with ten thousand.

Understanding broad complexity is therefore more valuable than memorising individual optimisations.

For example:

for (const entity of entities) {

    update(entity);

}

A single pass through a collection scales predictably.

Now compare:

for (const entityA of entities) {

    for (const entityB of entities) {

        compare(entityA, entityB);

    }

}

The second implementation may be entirely correct.

It may also become dramatically more expensive as the number of entities grows.

Understanding how work scales allows engineers to recognise potential bottlenecks before they become production problems.

This understanding should inform design.

It should not replace measurement.

Remove Work Instead of Accelerating It

The largest performance improvements frequently come from eliminating unnecessary work altogether.

Do not update entities that are inactive.

Do not render objects that cannot be seen.

Do not recalculate values that have not changed.

Do not allocate objects that already exist.

The best optimisation is often making the engine perform less work rather than making existing work execute marginally faster.

This mindset consistently produces simpler, faster and more maintainable software.

Continuous Improvement

Healthy software evolves continuously.

It does not wait for scheduled cleanup phases or dedicated quality initiatives.

Instead, every engineer contributes to the gradual improvement of the engine simply by interacting with it.

Each modification represents an opportunity to leave the surrounding code in a slightly better state than it was found.

This improvement does not need to be dramatic.

Rename an unclear variable.

Extract a helper function.

Simplify a conditional.

Remove duplication.

Clarify intent.

Delete unnecessary code.

These changes often require only a few minutes.

Over the lifetime of the project they accumulate into thousands of meaningful improvements.

Leave the Code Better Than You Found It

One of the simplest engineering habits is also one of the most effective.

Whenever modifying a file, ask:

"Can I improve one small thing while I'm here?"

The improvement should remain proportional to the work being performed.

A small bug fix should not become a week-long architectural redesign.

Likewise, ignoring obvious improvements because they were not part of the original task allows unnecessary complexity to accumulate indefinitely.

Steady improvement keeps the engine healthy without disrupting development.

Build Momentum Through Small Wins

Large improvements are motivating.

Small improvements are sustainable.

An engineer who simplifies one function every day contributes more long-term value than one who waits six months for a perfect refactoring opportunity.

Momentum matters.

Healthy engineering cultures improve software continuously because improvement has become routine rather than exceptional.

Over time, these small changes compound.

The engine becomes easier to understand.

Future features become easier to implement.

Maintenance becomes less expensive.

Quality becomes the natural consequence of consistent behaviour rather than occasional heroics.

Knowing When To Stop

Software can always be improved.

There is always another optimisation.

Another refactoring.

Another abstraction.

Another simplification.

Recognising this is important.

So is recognising when enough has been achieved.

Perfection is not an engineering objective.

Delivering valuable, maintainable software is.

Diminishing Returns

Early improvements often provide substantial benefit.

Later improvements become progressively smaller.

Reducing frame time from twenty milliseconds to fifteen may transform the user experience.

Reducing it from 14.95 milliseconds to 14.93 milliseconds probably does not.

The same principle applies to refactoring.

Eventually additional effort produces very little practical improvement.

Good engineers recognise this point and move on to more valuable work.

Balance Benefit Against Cost

Every engineering decision consumes time.

Time spent pursuing tiny improvements cannot be spent implementing new capabilities, strengthening architecture or improving other systems.

The objective is therefore not maximum optimisation.

It is maximum value.

Sometimes the correct decision is continuing to improve.

Sometimes the correct decision is declaring the implementation good enough for the current stage of the engine.

Knowing the difference is a valuable engineering skill.

Software Is Never Finished

No software project reaches perfection.

Requirements evolve.

Understanding improves.

Better ideas emerge.

New constraints appear.

The engine will therefore never be finished in an absolute sense.

It will simply continue improving throughout its lifetime.

This should be viewed positively.

The objective is not to produce immutable software.

The objective is to create software that remains capable of healthy evolution for many years.

When an implementation is correct, understandable, maintainable and sufficiently performant for its current responsibilities, it is acceptable to stop improving it—for now.

Future understanding will always provide another opportunity.

The Engineering Test

Before optimising or refactoring any part of the Locomotion Engine, every contributor should pause and ask a small number of deliberate questions.

These questions are intentionally simple.

They exist to encourage understanding before action.

Have I measured the problem?
Do I understand why this is slow?
Am I improving clarity or merely changing code?
Is this abstraction solving a real problem?
Will another engineer find this easier to understand?
Am I reducing complexity or simply moving it somewhere else?
Is this optimisation justified by evidence?
Does this refactoring preserve behaviour?
Am I solving today's problem or an imagined future problem?
Is this the simplest solution that satisfies the current requirement?

These questions are more valuable than any optimisation technique or refactoring pattern.

They encourage curiosity over assumption.

Evidence over instinct.

Deliberate engineering over reactive programming.

The Locomotion Engine is intended to evolve over many years.

Its long-term success will not be determined by isolated moments of brilliance, nor by heroic optimisation efforts undertaken late in development.

It will be determined by thousands of thoughtful decisions made consistently throughout the lifetime of the project.

Every optimisation should make the engine measurably better.

Every refactoring should make the engine easier to understand.

Every improvement should leave a stronger foundation for the engineer who comes next.

That is how software remains fast without becoming fragile.

That is how complexity is reduced without sacrificing capability.

And that is how a mature engine continues to improve long after its first version begins to run.

Part VIII — Performance & Refactoring

# Part VIII — Development Workflow

## Purpose

Writing good code is only part of building good software.

Equally important is the process by which that code is developed, refined, integrated, and maintained over time. A consistent engineering workflow reduces uncertainty, encourages deliberate decision-making, and enables contributors to make progress without continually reinventing how work should be performed.

Projects rarely become difficult because individual engineers lack technical ability. More often, they become difficult because development becomes unpredictable. Features are started without being finished. Systems evolve in conflicting directions. Changes accumulate faster than understanding. Eventually, even simple modifications require unnecessary effort because no one is confident about the state of the project.

A well-defined workflow prevents this gradual loss of confidence.

Every contributor should know how work begins, how it progresses, and what constitutes completion. Decisions should become easier because the process itself removes much of the uncertainty surrounding development.

Reducing friction is one of the primary objectives of these standards.

Friction appears whenever developers must repeatedly decide how to organise their work, when to commit changes, whether something is complete, or how much refactoring is appropriate. By establishing consistent expectations, these questions require less conscious effort, allowing attention to remain focused on solving engineering problems rather than managing process.

A predictable workflow also creates momentum.

Small, consistent improvements accumulate into substantial progress over time. Completed work reinforces confidence, while unfinished work creates hesitation. The more frequently contributors experience successful completion, the easier it becomes to maintain steady forward progress.

Perhaps most importantly, consistent process produces consistent software.

The engine should not feel like a collection of unrelated contributions made under different philosophies. It should feel as though every improvement naturally follows from the work that came before it.

Engineering workflow exists to make that possible.

---

# Build Vertically

The preferred method of development within the Locomotion Engine is vertical development.

Rather than constructing large portions of unrelated infrastructure before producing visible results, contributors should complete narrow slices of functionality that extend through the engine from foundation to demonstrable behaviour.

A vertical slice is a complete piece of capability.

It may involve multiple systems, but it results in something that can be observed, exercised, and validated.

For example, instead of spending weeks building every conceivable aspect of an animation framework, a vertical approach might implement:

- Basic animation data.
- Playback.
- Rendering integration.
- A simple demonstration.

The feature is complete, even if it remains intentionally limited.

This approach offers several advantages.

First, working software provides immediate architectural feedback.

Designs that appear elegant on paper often reveal weaknesses during implementation. Building complete slices exposes these weaknesses early, while they remain inexpensive to address.

Second, vertical development keeps the engine usable.

Contributors can observe progress directly instead of trusting that numerous partially implemented systems will eventually integrate correctly.

Third, vertical progress naturally validates architectural decisions.

Each completed feature proves that the surrounding architecture supports real implementation rather than theoretical possibility.

A milestone should therefore represent completed capability, not accumulated effort.

It is better to complete one feature entirely than to partially construct five different systems.

Working software teaches more than unfinished infrastructure ever can.

---

# Keep the Engine Working

The engine should remain runnable throughout development.

There will inevitably be short periods during active implementation where a feature is incomplete or behaviour is temporarily unstable. These periods should remain brief and should not become the normal state of the project.

A contributor should avoid ending a development session with the engine in a broken condition whenever reasonably possible.

Maintaining a working engine provides several long-term benefits.

It encourages frequent testing.

It allows completed work to be demonstrated immediately.

It makes regressions easier to identify because the range of recent changes remains small.

Most importantly, it builds confidence.

When contributors expect the engine to start successfully every time they launch it, they become more willing to experiment, refactor, and improve existing systems because they trust the surrounding foundation.

Long-lived instability has the opposite effect.

Once the engine frequently fails to run, developers begin making assumptions instead of verifying behaviour. Testing becomes less frequent. Bugs become intertwined. Confidence gradually disappears.

For this reason, implementation should favour short development cycles.

Implement a small change.

Run the engine.

Verify the behaviour.

Repeat.

Frequent validation is considerably less expensive than repairing the accumulated consequences of many unchecked changes.

A working engine is not merely a convenience.

It is an essential engineering asset.

---

# Finish Before Expanding

There is a strong temptation during software development to begin solving the next interesting problem before completing the current one.

Resist that temptation.

Partially completed systems accumulate faster than most developers realise.

Each unfinished feature occupies mental space, creates uncertainty, and increases the number of active responsibilities competing for attention.

Over time, the project becomes filled with promising ideas that never quite reached completion.

Finished work compounds.

Unfinished work accumulates.

Whenever practical, complete one responsibility before introducing another.

This does not mean every feature must become perfect before development continues.

It means the intended scope of the current task should be complete, understandable, and integrated before attention moves elsewhere.

For example, if the objective is to implement entity creation, then entity creation should function correctly, integrate with the existing engine, and satisfy its intended purpose before beginning work on unrelated systems such as input handling or procedural generation.

Reducing context switching has measurable benefits.

Developers remain familiar with the code they are actively changing.

Design decisions remain consistent because the surrounding implementation is still fresh in memory.

Testing becomes simpler because the area of change remains focused.

Most importantly, contributors experience regular completion rather than perpetual progress.

Software grows stronger through completed foundations.

Each finished responsibility becomes a reliable platform upon which future work can confidently build.

---

# Small Commits

A commit represents a single logical change to the project.

It is not simply a snapshot of whatever happened to exist at a particular moment.

Good commit history becomes part of the project's long-term documentation.

Months or years later, contributors should be able to understand how the engine evolved by reading its history.

This is only possible when commits remain focused.

Each commit should introduce one logical idea.

Examples include:

- Implement entity creation.
- Add fixed timestep update loop.
- Simplify resource registration.
- Remove obsolete initialization path.

Avoid combining unrelated changes into a single commit.

For example, implementing a new rendering feature while simultaneously reorganising unrelated utility functions creates unnecessary complexity. Future contributors attempting to understand either change must now understand both.

Small commits also improve safety.

Atomic changes are easier to review.

They are easier to understand.

They are easier to test.

Most importantly, they are easier to reverse when necessary.

A clean history allows development to move forward with confidence because mistakes remain isolated rather than intertwined.

Commit messages should describe what changed rather than narrate the development process.

Good examples:

```text
Implement entity lifecycle management

Add fixed timestep simulation loop

Introduce generic event dispatcher

Refactor world initialization sequence

Remove obsolete bootstrap helper

Document milestone completion criteria
```

Poor examples:

```text
Stuff

Changes

More work

Update

Fix things

Misc

Almost done

Hopefully works now

Big update
```

A commit message should still make sense years later.

Someone unfamiliar with the surrounding context should understand the purpose of the change simply by reading its description.

If that cannot be achieved, the commit probably represents more than one logical change.

---

# Refactor As You Go

Refactoring is not a separate phase of development.

It is a normal part of engineering.

Every time a contributor works within an area of the engine, there is an opportunity to leave that area slightly clearer, simpler, or easier to understand than it was before.

Small improvements performed continuously are significantly less disruptive than large-scale cleanup efforts postponed for months or years.

The phrase "I'll clean it up later" should be treated with caution.

Later often becomes much later.

Eventually the original reasoning has been forgotten, surrounding systems have evolved, and even straightforward refactoring becomes considerably more expensive than it would have been when the implementation was still fresh.

This does not imply that contributors should interrupt every task to pursue unrelated improvements.

Refactoring should remain proportional to the work being performed.

Examples of appropriate continuous refactoring include:

- Simplifying an unnecessarily complicated function.
- Improving the structure of recently modified code.
- Removing obsolete logic introduced by an earlier implementation.
- Clarifying an interface that has become confusing through normal evolution.
- Eliminating duplication revealed during implementation.

These improvements require little additional effort because the contributor already possesses the necessary context.

Conversely, avoid allowing a refactoring session to expand indefinitely.

The objective is not to continually redesign the engine while implementing unrelated features.

Improve what you touch.

Leave unrelated systems alone unless there is a compelling reason to modify them.

Technical debt is most effectively managed through continuous reduction rather than occasional large-scale cleanup projects.

A codebase that receives steady, incremental refinement rarely requires dramatic intervention.

The engine should gradually become cleaner simply because development continues.

---

# Documentation Follows Understanding

Documentation should describe reality.

It should not describe intentions that no longer exist or aspirations that implementation has disproved.

As development progresses, contributors inevitably gain a better understanding of the systems they build.

Sometimes an implementation confirms the original design.

Sometimes it reveals a simpler approach.

Occasionally it exposes assumptions that proved incorrect.

When understanding improves, documentation should improve with it.

Accurate documentation builds trust.

Engineers should be able to read documentation with confidence that it reflects the engine as it actually exists rather than as someone once imagined it might become.

Documentation that consistently falls behind implementation gradually loses authority.

Eventually contributors stop consulting it altogether because they no longer believe it represents reality.

At that point, the documentation has failed its purpose.

Documentation updates do not need to be large.

Small improvements performed regularly are often more valuable than infrequent attempts to rewrite entire sections.

Correct terminology.

Clarify intent.

Remove obsolete information.

Explain newly discovered behaviour where appropriate.

These modest changes preserve the quality of the documentation without introducing unnecessary maintenance effort.

The objective is not to document every implementation detail.

The objective is to preserve understanding.

Documentation should evolve alongside the engine so that future contributors inherit both working software and reliable knowledge.

---

# Engineering Decisions

Every change to the engine represents a decision.

Some decisions are small.

Others influence the direction of the project for years.

Regardless of size, each should be made deliberately rather than reactively.

Before introducing a new abstraction, subsystem, or architectural refinement, contributors should pause long enough to ask a few straightforward questions.

Is this solving today's problem?

Or is it solving a problem that may never actually exist?

Does this change simplify the engine?

Or does it merely relocate complexity into another form?

Does this capability genuinely belong within the engine?

Or is it specific to one application that should remain outside the engine itself?

Can this decision wait until a real requirement appears?

Or is immediate implementation justified by demonstrated need?

These questions are intentionally simple.

Their purpose is not to discourage improvement.

Their purpose is to discourage unnecessary improvement.

Speculative engineering often appears productive because it produces code.

In reality, it frequently produces responsibilities that must be maintained long before they deliver any practical value.

Every permanent addition increases the cost of understanding the engine.

New concepts require documentation.

New abstractions require maintenance.

New interfaces require future compatibility.

These costs should always be justified by genuine benefit.

The simplest successful decision is usually the strongest one.

Complexity should enter the engine only after experience demonstrates that it belongs there.

---

# Milestone Thinking

Development should progress through meaningful milestones rather than indefinite streams of activity.

A milestone represents completed capability.

It marks a point at which the engine has become measurably stronger than it was before.

Good milestones share several characteristics.

They have a clearly defined objective.

They produce visible or demonstrable results.

They leave the engine in a working state.

They provide a stable foundation for whatever follows.

Milestones should be large enough to represent genuine progress, yet small enough to be completed within a reasonable period of focused effort.

Excessively large milestones delay feedback.

Excessively small milestones risk fragmenting development into changes that provide little independent value.

Finding the appropriate scale is largely a matter of engineering judgement.

When uncertainty exists, favour milestones that produce complete slices of functionality rather than isolated technical components.

Completion deserves recognition.

Not because the project is finished, but because each completed milestone reduces uncertainty and increases confidence.

Every completed milestone proves something.

It demonstrates that the architecture supports implementation.

It validates engineering decisions.

It provides a new platform from which future work can proceed.

Over time, milestones become the history of the engine's evolution.

Looking back should reveal a sequence of completed capabilities rather than a collection of abandoned experiments.

Progress should always be measurable.

A contributor should be able to answer the question:

"What is the engine capable of now that it could not do before?"

If that question cannot be answered clearly, the work may not yet represent a completed milestone.

---

# Definition of Done

Completion is one of the most misunderstood concepts in software development.

"It works" is an important milestone.

It is not the definition of finished.

Working software may still contain temporary debugging code, confusing structure, outdated documentation, inconsistent implementation, or unnecessary complexity.

None of these prevent execution.

All of them reduce long-term quality.

Within the Locomotion Engine, work is considered complete only when it satisfies a broader definition.

The feature works correctly.

Its intended behaviour has been verified.

The implementation is understandable.

Another engineer should be able to read the code and reasonably understand its purpose without reconstructing the author's thought process.

The code is readable.

Its structure reflects the engineering standards established throughout this document.

Temporary experimentation has been removed.

Debug statements, provisional workarounds, abandoned code paths, and other temporary scaffolding should not become permanent residents of the engine simply because the feature now functions.

Documentation has been updated where appropriate.

Where implementation has improved understanding, that knowledge should be preserved.

The engine continues to execute correctly.

New functionality should strengthen the project without destabilising existing capability.

Finally, the completed work should improve the engine as a whole.

A feature that functions while reducing clarity, increasing unnecessary complexity, or weakening consistency cannot truly be considered finished.

Completion is therefore a measure of quality rather than effort.

The final stage of development is often the least visible but the most valuable.

It is the stage where rough implementation becomes maintainable engineering.

A useful question to ask before considering work complete is:

"If another engineer inherited this change tomorrow, would I feel confident handing it over exactly as it is?"

If the answer is no, there is probably still work to do.

A disciplined definition of done ensures that completed work remains an asset instead of becoming future maintenance.

---

# Managing Change

Change is inevitable.

Growth is expected.

Improvement is encouraged.

None of these require constant reinvention.

The healthiest software projects evolve gradually.

Each change strengthens what already exists rather than replacing large portions of the project without compelling justification.

This principle applies regardless of the size of the feature being developed.

When modifying an existing system, the first question should rarely be, "How can this be rewritten?"

A better question is:

"How can this system be improved while preserving the work that already provides value?"

Incremental evolution offers significant advantages.

Smaller changes are easier to understand.

They are easier to validate.

They are less likely to introduce unintended consequences.

If problems do occur, identifying their source becomes considerably simpler because the scope of recent change remains limited.

Large rewrites, by comparison, often discard valuable knowledge along with outdated implementation.

Existing edge cases may be forgotten.

Previously solved problems may quietly reappear.

Months of engineering effort can be spent returning to a level of stability that already existed before the rewrite began.

This does not imply that rewrites are never appropriate.

Occasionally a subsystem becomes sufficiently constrained, inconsistent, or fundamentally flawed that replacement genuinely represents the best long-term decision.

Such situations should be uncommon.

A rewrite should be the conclusion reached after careful evaluation, not the default response to dissatisfaction with existing code.

Respect the architecture that already exists.

Earlier contributors made decisions based upon the understanding available at the time.

Some of those decisions may no longer represent the best approach.

Others may contain valuable constraints that are not immediately obvious.

Seek first to understand before seeking to replace.

Every change should leave the engine slightly better than it was before.

Small improvements accumulate into substantial architectural progress over the lifetime of a project.

Steady evolution is more sustainable than continual reinvention.

---

# Sustainable Development

The Locomotion Engine is intended to exist for many years.

Its engineering practices should therefore be sustainable over many years as well.

Software projects rarely fail because developers lack periods of extraordinary productivity.

More often, they struggle because those periods cannot be maintained.

Long hours, rushed implementation, and continual urgency may produce short-term progress, but they also increase mistakes, reduce judgement, and eventually exhaust the people responsible for maintaining the project.

A sustainable pace produces better engineering.

It allows contributors to think clearly.

It encourages careful decisions instead of reactive ones.

It creates opportunities for reflection, refinement, and steady improvement.

Consistency is considerably more valuable than occasional bursts of intensity.

An engineer who contributes thoughtful progress every week will almost always strengthen the project more than one who alternates between extraordinary effort and prolonged absence.

Avoid heroics.

The objective should never be to rescue the project through exceptional effort.

Instead, develop processes that make exceptional effort unnecessary.

A healthy workflow enables ordinary engineering to produce extraordinary results over time.

Likewise, avoid unnecessary rushing.

Few engineering decisions become stronger because they were made in haste.

When additional thought improves understanding, take the time to think.

When implementation reveals uncertainty, investigate before continuing.

When a simpler solution appears, allow it to replace a more complicated one.

Time invested in thoughtful engineering is rarely wasted.

Finally, remember that building the engine should remain an enjoyable process.

Curiosity, craftsmanship, and steady learning are important parts of long-term software development.

An enjoyable project attracts continued attention.

A frustrating one gradually loses it.

The objective is not merely to finish the engine.

The objective is to continue building it with enthusiasm long after its first version exists.

---

# Long-Term Thinking

Every line of code written today becomes part of tomorrow's maintenance.

Future contributors—including your future self—will inherit every decision made during development.

Good engineering recognises this responsibility.

Short-term convenience should always be weighed against long-term consequence.

A solution that saves an hour today but introduces years of unnecessary complexity is rarely a worthwhile trade.

Conversely, a small investment that significantly improves clarity or maintainability often repays itself many times over.

Whenever implementing a change, imagine returning to it several years from now.

Would its structure still make sense?

Would its intent still be obvious?

Would its design naturally support future extension?

If the answer to these questions is uncertain, the implementation may deserve another iteration before being considered complete.

Software quality is cumulative.

Good decisions reinforce one another.

Clear interfaces encourage clearer implementations.

Completed milestones encourage disciplined planning.

Consistent workflow encourages consistent engineering.

Likewise, poor decisions also accumulate.

Small compromises that appear harmless in isolation gradually become architectural debt when repeated often enough.

The objective is therefore not perfection.

The objective is continuous improvement.

Every contribution should make future development slightly easier than it would otherwise have been.

The greatest compliment an engineer can receive is often invisible.

A future contributor works within the engine without encountering unnecessary confusion, unexpected obstacles, or avoidable complexity because someone earlier chose to build with care.

That is the lasting value of long-term thinking.

---

# The Workflow Test

Before considering any piece of work complete, contributors should pause and evaluate the change as a whole.

This final review is not intended to delay progress.

It exists to ensure that progress has genuinely been made.

A useful checklist includes questions such as:

- Does the engine still run?
- Would I be comfortable committing this exactly as it is?
- Does this genuinely improve the engine?
- Is this the smallest complete change I could reasonably make?
- Have I finished this work properly rather than merely stopping?
- Would another engineer immediately understand what changed?
- Have I removed temporary implementation that no longer belongs?
- Have I updated documentation where understanding has improved?
- Am I leaving the project in a better state than I found it?

These questions deliberately encourage reflection rather than inspection.

They ask contributors to evaluate the quality of their work, not simply whether it executes successfully.

Passing the workflow test should inspire confidence.

A contributor should feel comfortable placing the completed change into the permanent history of the project, knowing that it reflects the engineering standards expected throughout the Locomotion Engine.

Disciplined workflow is rarely dramatic.

Most of the time it consists of small habits repeated consistently.

Completing one responsibility before beginning another.

Keeping the engine runnable.

Making deliberate decisions.

Refactoring while understanding is fresh.

Documenting what has been learned.

Committing small, coherent improvements.

Thinking beyond the immediate task.

Individually, these practices appear modest.

Collectively, they determine whether a project remains maintainable after thousands of changes spread across many years.

Software built through bursts of unstructured activity may occasionally progress quickly, but it rarely remains healthy for long.

Software built through disciplined, repeatable workflow develops differently.

It grows steadily.

It remains understandable.

It invites confident change instead of discouraging it.

Most importantly, it continues to improve because every contributor inherits not only a capable engine, but also a development process that consistently produces capable engineering.

A successful workflow is therefore more than a sequence of activities.

It is a culture of deliberate craftsmanship.

When consistently applied, that culture becomes one of the Locomotion Engine's most valuable engineering assets, ensuring that the project remains sustainable, comprehensible, and enjoyable to develop throughout its lifetime.

Part IX — Foundations of Engineering Review

Part IX.1 — Foundations of Engineering Review
Purpose

Engineering review exists to improve the long-term quality of the Locomotion Engine.

Every change made to the engine has the potential to become part of a codebase that may live for many years. Small mistakes that remain unnoticed today often become assumptions tomorrow, dependencies next month, and architectural constraints years later. Engineering review exists to identify those mistakes while they are still inexpensive to correct.

Its purpose is not to slow development.

Its purpose is to ensure that development continues in the right direction.

A good review protects the engine from accidental complexity, unnecessary coupling, unclear design, and avoidable technical debt before those problems become embedded in the implementation.

Review also improves understanding.

The process of examining a design or implementation carefully often reveals assumptions that were invisible during development. Engineers frequently discover simpler approaches, clearer abstractions, or architectural improvements simply because they were forced to explain their own reasoning.

For this reason, review should never be viewed solely as an activity that improves code.

It improves engineers.

Learning to evaluate decisions critically is one of the most valuable engineering skills that can be developed. Every thoughtful review strengthens judgement, reinforces architectural understanding, and builds the habit of making deliberate rather than reactive decisions.

Engineering review is therefore an engineering discipline rather than an administrative process.

It is not performed because a workflow requires approval.

It is performed because good software rarely emerges from the first idea without careful examination.

The Locomotion Engine is intended to remain understandable, maintainable, and extensible throughout its lifetime. That objective cannot be achieved through implementation alone.

It requires continuous evaluation of the decisions that shape the engine.

Engineering review is one of the primary mechanisms by which the long-term quality of the engine is preserved.

Review Your Own Work First

The first reviewer should always be yourself.

Before considering any piece of work complete, pause long enough to review it deliberately. Distance, even if measured in minutes rather than days, allows you to approach your own work with a clearer perspective than you had while writing it.

While implementing a feature, your attention is naturally focused on making it work.

During review, your attention shifts to whether it should work that way at all.

These are different modes of thinking.

Self-review begins by reading your work as though someone else had written it.

Do not remember what you intended.

Read only what is actually present.

Ask yourself whether every decision still appears reasonable without relying on the context that existed while writing it.

This small change in perspective frequently exposes issues that were previously invisible.

Common problems discovered during self-review include:

Logic that is more complicated than necessary.
Assumptions that were never explicitly stated.
Duplicate behaviour that could have been shared.
Inconsistent naming introduced during implementation.
Forgotten edge cases.
Temporary debugging code that was never removed.
Small shortcuts that quietly became permanent.

None of these mistakes are unusual.

They are a natural consequence of concentrating on solving a problem.

Self-review provides the opportunity to recognise them before they become part of the engine.

It is often surprising how many improvements become obvious once the pressure of implementation has passed. A function that felt perfectly reasonable while writing it may suddenly appear unnecessarily complicated. An abstraction that seemed elegant may reveal itself to be solving a problem that does not actually exist.

This is not evidence of poor engineering.

It is evidence that careful review changes perspective.

Self-review should therefore become instinctive rather than optional.

Finishing an implementation should naturally lead to reviewing it.

Over time, experienced engineers begin performing small reviews continuously as they work. They become accustomed to questioning decisions before they become permanent, making formal self-review a confirmation of quality rather than the first time the work has been examined critically.

The habit begins by deliberately reviewing your own work every time.

Eventually, it becomes part of how you think.

Review the Design, Not Just the Code

Engineering review should begin with design.

Implementation details matter, but they should never distract from the more important question of whether the underlying decision belongs in the engine at all.

A perfectly implemented solution to the wrong problem remains the wrong solution.

Before examining individual functions, variables, or algorithms, step back and evaluate the design itself.

Ask questions such as:

Does this belong in the engine?
Does this fit the conceptual architecture?
Does this introduce unnecessary coupling?
Does this simplify or complicate the project?
Could this problem be solved more generally?
Am I solving today's problem or building tomorrow's maintenance burden?

These questions often reveal issues that cannot be corrected through refactoring alone.

For example, imagine introducing a feature that directly references the mechanics of a specific game because it is the quickest way to make progress.

The implementation may be clean.

The functions may be well organised.

The naming may be consistent.

The performance may be excellent.

Yet the design still weakens the engine because it violates the separation between reusable engine capability and game-specific behaviour.

No amount of implementation quality can compensate for that architectural mistake.

Good engineering begins by solving the correct problem.

Only then does implementation determine how well that solution is realised.

Reviewing design first also protects the conceptual integrity of the engine.

The architecture described by the Vision, Constitution, and Conceptual Architecture exists to provide stable foundations for many years of development. Every implementation decision should reinforce those foundations rather than gradually replacing them with exceptions and shortcuts.

Architectural erosion rarely begins with a dramatic mistake.

More often, it begins with a series of individually reasonable decisions that were never evaluated together.

Each shortcut appears harmless.

Each exception seems justified.

Eventually, the architecture no longer resembles the one that was originally designed.

Engineering review exists to prevent this gradual drift.

Protecting architectural integrity is one of the highest responsibilities of engineering review because architecture becomes increasingly difficult to repair once implementation has spread throughout the engine.

A design decision questioned today may prevent months of unnecessary complexity in the future.

Engineering Review as Continuous Practice

Engineering review is not an event that occurs after implementation.

It is a continuous practice that accompanies engineering from the first design decision until the work is considered complete.

Review begins while thinking about a problem.

It continues while designing a solution.

It continues again while implementing that design.

Finally, it concludes with a deliberate examination of the finished work.

Waiting until the end of development to review important decisions often means those decisions have already become expensive to change.

By reviewing continuously, engineers identify problems while they are still easy to correct.

This approach also reduces the emotional difficulty of changing direction.

When review happens throughout development, changing a design is simply another engineering decision.

It is not an admission that previous work was wasted.

Experienced engineers naturally perform small reviews throughout their work.

They ask themselves questions while writing a function.

They reconsider a design after implementing its first version.

They simplify an abstraction before another system begins to depend upon it.

These reviews are often brief, but they occur repeatedly.

Over time they become almost invisible because they are woven into the engineering process itself.

Quality rarely appears because of one final inspection.

Instead, it emerges from hundreds of small decisions made thoughtfully throughout development.

Every time an engineer chooses a simpler design, removes an unnecessary abstraction, questions an assumption, or reconsiders a dependency, the quality of the engine improves slightly.

These improvements accumulate.

By the time a feature is complete, much of its quality has already been established through continuous review.

The final review confirms that quality.

It does not create it.

Closing Thoughts

Engineering review is sometimes misunderstood as an exercise in finding mistakes.

That is far too narrow a view.

Its real purpose is to improve the engine, strengthen engineering judgement, and protect the quality of decisions before they become permanent.

Every thoughtful review represents an investment in the future of the project.

A design questioned today may prevent years of unnecessary maintenance.

A simplification made before implementation may eliminate entire categories of future problems.

A few minutes spent reviewing a decision can save countless hours that would otherwise be spent correcting its consequences.

Just as importantly, every review leaves the engine in a better state for the next contributor.

Whether that contributor is another engineer or your future self, they inherit not only the code that exists, but also the quality of the decisions that produced it.

Engineering review is therefore an act of stewardship.

It recognises that software intended to survive for decades deserves more than solutions that merely work.

It deserves solutions that have been questioned, refined, and deliberately chosen.

That is the essence of professional engineering.

Not writing the first solution.

Writing the solution that still feels like the right one after it has been thoughtfully reviewed.

Part IX.2 — Reviewing Readability
Purpose

Readable code is easier to understand, easier to modify, and easier to trust.

The purpose of a readability review is not to judge personal coding style or enforce subjective preferences. It is to determine whether another engineer can understand the implementation accurately, efficiently, and with minimal effort.

Every engineer spends far more time reading code than writing it.

The implementation written today may be read dozens or hundreds of times over its lifetime. It will be revisited during debugging, extended by new features, examined during refactoring, and studied by future contributors trying to understand how the engine works.

The cost of poor readability is therefore paid repeatedly.

The cost of improving readability is usually paid only once.

A readability review asks a simple question:

Can another engineer understand this implementation without unnecessary effort?

If the answer is no, the implementation should be improved before it becomes part of the engine.

Readability is not about making code shorter.

It is about making intent obvious.

The reader should spend their time understanding the problem being solved, not deciphering how the implementation works.

Whenever those two activities become the same, readability has already begun to decline.

Review for Understanding

The primary objective of a readability review is to verify that the implementation communicates its intent clearly.

A reviewer should never assume knowledge that exists only in the author's mind.

Instead, review the implementation exactly as it appears.

Ask questions such as:

Can I immediately understand what this code is trying to achieve?
Is the overall flow obvious?
Does each section naturally lead to the next?
Are responsibilities clearly separated?
Is there anything I had to read twice?

The final question is often the most revealing.

Whenever a section requires repeated reading, it deserves closer attention.

Sometimes the implementation is genuinely solving a difficult problem.

More often, the presentation can be improved.

For example, compare these two approaches:

The first performs several unrelated operations inside one large function.

The second separates each responsibility into small, clearly named functions.

Both may produce identical behaviour.

The second is usually easier to understand because the reader follows a sequence of ideas instead of a sequence of instructions.

Readability improves when understanding becomes progressive.

Each line should build naturally upon the one before it.

Each function should communicate one coherent idea.

Each level of abstraction should remain consistent.

The objective is not merely that the code can be understood.

It should be understood comfortably.

Review for Intent

Good code explains why it exists through its structure.

The reviewer should be able to identify the purpose of an implementation without mentally simulating every instruction.

When reviewing, ask:

Does the structure communicate the purpose?
Is the solution obvious from the organisation?
Are important decisions visible?
Does the implementation express intent more clearly than mechanics?

For example, consider two implementations that validate engine configuration.

One performs every validation directly inside a large conditional block.

The other separates validation into clearly named operations such as:

Validate required fields.
Validate value ranges.
Validate dependencies.
Report failures.

Both implementations perform the same work.

The second communicates intent through organisation.

The reader understands the process before understanding the individual checks.

This distinction becomes increasingly valuable as systems grow.

Engine code should explain itself through deliberate structure rather than requiring readers to reconstruct the author's reasoning.

Whenever the implementation exposes intention clearly, understanding follows naturally.

Review for Simplicity

Complexity is often introduced gradually.

Each individual decision appears reasonable.

Together they create an implementation that feels unnecessarily difficult to understand.

A readability review should actively search for opportunities to simplify.

Ask questions such as:

Is this solution more complicated than necessary?
Can two concepts become one?
Can this logic be expressed more directly?
Would removing code improve understanding?
Is every level of abstraction providing genuine value?

One of the most effective improvements to readability is reduction.

Removing unnecessary branches.

Removing redundant variables.

Removing duplicated logic.

Removing abstractions that exist only to support hypothetical future requirements.

Simplification rarely makes code less capable.

It usually makes its purpose easier to see.

A useful habit is to imagine explaining the implementation to another engineer.

If the explanation feels significantly simpler than the code itself, the code probably has room to improve.

The implementation should communicate with approximately the same clarity as its explanation.

Review for Cognitive Load

Readable code minimises the amount of information a reader must remember at any given moment.

The reviewer should pay close attention to cognitive load.

Reading one function should not require remembering the details of five others.

Understanding one decision should not depend upon information introduced hundreds of lines earlier.

High cognitive load often appears through patterns such as:

Excessive nesting.
Long functions.
Multiple responsibilities within one block.
Variables remaining in scope long after they are needed.
Frequent jumps between unrelated concepts.
Several levels of abstraction mixed together.

None of these automatically indicate poor engineering.

Together, however, they often make understanding unnecessarily difficult.

For example, a function that validates data, updates runtime state, performs rendering calculations, and generates diagnostic output forces the reader to think about several different concerns simultaneously.

Separating those responsibilities reduces the amount of information the reader must hold in memory.

The implementation becomes easier to reason about because each section has a narrower purpose.

Good readability reduces mental effort.

The engineer should spend their attention solving engineering problems rather than decoding the implementation.

Review from the Perspective of a Future Engineer

Perhaps the most valuable readability review is performed from the perspective of someone encountering the implementation for the first time.

Imagine opening the file a year from now.

The details of today's implementation have long been forgotten.

Would the design still make sense?

Would the names still communicate intent?

Would the overall structure naturally guide understanding?

Or would significant effort be required simply to rediscover how the implementation works?

This perspective changes the purpose of the review.

Instead of asking whether the implementation is currently understandable, ask whether it will remain understandable after time has erased the original context.

Future engineers rarely struggle because code is technically incorrect.

They struggle because the reasoning behind correct code has become difficult to recover.

Readable implementations preserve that reasoning through clear organisation, deliberate naming, and straightforward structure.

Every improvement made during a readability review is therefore an investment in future engineering.

Closing Thoughts

Readability is one of the most enduring qualities of good software.

Performance may change.

Algorithms may evolve.

Entire systems may eventually be replaced.

Yet throughout those changes, engineers will continue reading the implementation to understand what exists before deciding what should change.

A readability review protects that understanding.

It ensures that the implementation communicates clearly, expresses intent openly, and avoids unnecessary complexity.

The objective is not to write code that impresses other engineers.

It is to write code that helps them succeed.

When future contributors can understand an implementation quickly and confidently, they are free to focus on improving the engine instead of deciphering it.

That is the lasting value of readable engineering.

Part IX.3 — Reviewing Consistency
Purpose

Consistency is one of the defining characteristics of a maintainable engine.

When similar problems are solved in similar ways, the engine becomes easier to understand, easier to extend, and easier to reason about. Engineers begin to recognise familiar patterns instead of continually learning new ones.

The purpose of a consistency review is not to eliminate creativity.

It is to preserve predictability.

Every unnecessary variation introduces another decision that future engineers must understand. One different naming convention, one unique architectural pattern, or one isolated implementation style may appear insignificant on its own. Across an engine that evolves for years, however, these small inconsistencies accumulate into unnecessary complexity.

Consistency reduces that complexity.

It allows engineers to spend their effort solving new problems instead of adapting to different ways of expressing the same ideas.

A consistency review therefore asks questions such as:

Does this implementation follow established patterns?
Does it behave as similar systems behave?
Would an engineer familiar with the engine find this implementation unsurprising?

If the answer is yes, the engine becomes more coherent.

If the answer is no, the difference should be justified by a genuine engineering need rather than personal preference.

Review Against Existing Patterns

Every mature codebase develops patterns that have proven effective through experience.

Some patterns emerge from architectural principles.

Others evolve naturally because they repeatedly solve common problems well.

A consistency review should begin by asking whether the implementation follows those established patterns.

For example:

Does it organise responsibilities in the same way as comparable systems?
Does it separate concerns consistently?
Does it manage state in the same manner as neighbouring components?
Does it follow the engine's established lifecycle?

When similar systems behave similarly, understanding transfers naturally.

An engineer who understands one subsystem can often understand another with very little additional effort.

This reuse of knowledge is one of the greatest advantages of consistency.

Whenever a new implementation introduces a different pattern, the reviewer should ask why.

Sometimes a different solution is genuinely better.

More often, the existing pattern remains the stronger choice because it preserves coherence across the engine.

Consistency should never prevent improvement.

Neither should novelty replace established practice without good reason.

Review Architectural Alignment

Consistency extends beyond implementation details.

It also applies to architectural thinking.

Every change should reinforce the conceptual foundations established by the engine rather than gradually introducing competing ideas.

During review, ask questions such as:

Does this implementation reinforce the architecture?
Does it respect established boundaries?
Does it introduce concepts that already exist elsewhere?
Is it solving a problem using the same architectural principles applied throughout the engine?

Architectural inconsistency often begins with good intentions.

An engineer encounters a problem that appears slightly different from previous examples and introduces a specialised solution.

Later, another engineer encounters a similar problem and introduces another variation.

Eventually, several different approaches coexist despite solving fundamentally the same class of problem.

The result is not flexibility.

It is fragmentation.

A consistency review helps prevent this gradual divergence by encouraging engineers to build upon existing architectural ideas rather than creating parallel ones.

The engine should evolve through refinement.

It should not evolve through competing philosophies.

Review for Uniform Behaviour

Consistency also includes behaviour.

Engine systems that perform comparable responsibilities should behave in comparable ways.

This does not mean every system should be identical.

It means similar expectations should produce similar outcomes.

For example, if one subsystem reports validation failures clearly, another subsystem performing comparable validation should communicate in a similarly predictable manner.

If one lifecycle follows a defined sequence of initialisation, execution, and cleanup, equivalent lifecycles should follow the same progression unless a meaningful architectural distinction exists.

Uniform behaviour creates confidence.

Engineers begin to predict how unfamiliar systems will behave because those systems follow established conventions.

Unexpected behaviour should therefore attract careful attention during review.

The question is not simply:

"Does this work?"

It is also:

"Does this behave the way an engineer familiar with the engine would reasonably expect?"

Predictability is one of the most valuable outcomes of consistency.

Review for Appropriate Differences

Not every difference is a problem.

Some differences exist because the underlying problems are genuinely different.

The purpose of a consistency review is therefore not to remove all variation.

It is to distinguish necessary variation from accidental variation.

When encountering something unusual, ask:

Is this solving a fundamentally different problem?
Does the difference improve clarity?
Does it simplify the architecture?
Is the variation required by the engine's responsibilities?
Or is it simply another way of achieving the same result?

Differences that exist solely because different engineers prefer different approaches rarely strengthen the engine.

Differences that arise from genuine architectural requirements often do.

The distinction is important.

Consistency should never become rigidity.

Likewise, flexibility should never become inconsistency.

Good engineering recognises when established patterns should be preserved and when they should evolve.

A thoughtful review ensures that any departure from existing practice is both deliberate and justified.

Review the Engine as a Whole

One of the easiest mistakes during review is to evaluate an implementation in isolation.

An individual class, function, or subsystem may appear well designed when viewed alone while still weakening the overall engine.

A consistency review should therefore consider the broader context.

Ask questions such as:

How does this fit with neighbouring systems?
Would this approach still make sense if adopted throughout the engine?
Does this introduce another way of solving an already solved problem?
Does it strengthen the engine's overall identity?

Thinking at the scale of the entire engine often changes the outcome of a review.

A solution that appears elegant locally may create unnecessary inconsistency globally.

Conversely, a solution that seems slightly less convenient in isolation may prove far more valuable because it reinforces patterns that already exist elsewhere.

The objective is not to optimise individual implementations independently.

It is to strengthen the coherence of the engine as a complete system.

Closing Thoughts

Consistency is often invisible.

Engineers rarely notice it when it exists.

They notice it immediately when it does not.

An engine built from consistent decisions feels predictable.

Its patterns become familiar.

Its behaviour becomes understandable.

Its architecture becomes easier to extend because new work naturally follows established ideas instead of inventing new ones.

A consistency review protects that experience.

It asks whether a change contributes to the engine that already exists rather than quietly becoming an exception to it.

Over many years of development, these reviews preserve something far more valuable than uniform code.

They preserve a coherent engineering language.

When every part of the engine speaks that language consistently, future contributors spend less time learning how the engine works and more time making it better.

Part IX.4 — Reviewing Maintainability
Purpose

Maintainability is the measure of how easily the engine can continue to evolve.

Every implementation is only one point in the lifetime of the software. Features will be extended, bugs will be corrected, systems will be refactored, and assumptions will inevitably change as the engine matures. A maintainability review exists to determine whether today's implementation will continue to support tomorrow's engineering.

The objective is not to predict every future requirement.

No engineer can.

Instead, the objective is to avoid making future change unnecessarily difficult.

A maintainability review asks questions such as:

Will this be easy to modify?
Are responsibilities clearly defined?
Does this implementation encourage future improvement?
Or will future engineers hesitate to change it because its behaviour has become difficult to reason about?

Well-maintained software is rarely software that never changes.

It is software that remains approachable when change becomes necessary.

Engineering should produce systems that welcome refinement rather than resist it.

Review for Clear Responsibilities

Maintainable systems begin with clear responsibilities.

Every component should have a purpose that is both well defined and easy to explain.

During review, ask questions such as:

What is this responsible for?
Is that responsibility immediately obvious?
Does it perform more than one distinct role?
Could another engineer describe its purpose in a single sentence?

When responsibilities become blurred, maintenance becomes uncertain.

Changes intended for one concern often affect another.

Engineers become reluctant to modify the implementation because they cannot confidently predict the consequences.

For example, a system responsible for managing entities should not gradually become responsible for rendering, diagnostics, configuration management, and resource loading simply because those features happened to be convenient to place nearby.

Each additional responsibility increases coupling between otherwise independent concerns.

Clear responsibilities reduce that coupling.

They create natural boundaries within which change can occur safely.

The easier it is to explain why something exists, the easier it usually is to maintain.

Review for Ease of Change

Maintainable engineering assumes that change is normal.

The reviewer should therefore evaluate how easily the implementation can accommodate future modification without requiring widespread disruption.

Consider questions such as:

Can this behaviour be extended without rewriting it?
Does changing one area require changes elsewhere?
Are dependencies limited to what is genuinely necessary?
Does the implementation support refinement without encouraging replacement?

The best designs rarely eliminate future work.

Instead, they ensure that future work remains localised.

Adding a capability should not require understanding unrelated systems.

Correcting a defect should not require navigating half the engine.

Refining an abstraction should not introduce uncertainty throughout the codebase.

When modifications remain predictable and contained, maintenance becomes significantly less expensive over the lifetime of the engine.

Maintainability is therefore not measured by how difficult the implementation was to create.

It is measured by how confidently it can be changed.

Review for Unnecessary Complexity

Complexity is one of the greatest threats to long-term maintainability.

Some complexity is unavoidable because certain problems are inherently difficult.

Much of it, however, is accidental.

Accidental complexity often appears through:

Abstractions that solve no current problem.
Generalisation without demonstrated need.
Deep dependency chains.
Multiple solutions to the same problem.
Layers that exist only because previous layers already existed.

A maintainability review should actively question this complexity.

Ask:

Does every abstraction justify its existence?
Is this flexibility genuinely required?
Would a simpler solution be easier to maintain?
Have we introduced permanent complexity to solve a temporary problem?

The Locomotion Engine is expected to evolve over many years.

Every permanent concept introduced today becomes something future engineers must understand before making informed decisions.

Reducing unnecessary complexity therefore reduces the long-term cost of every future change.

Simplicity is not merely easier to read.

It is easier to preserve.

Review for Long-Term Evolution

Every implementation should be evaluated from the perspective of the engine's continued growth.

A solution that appears appropriate today may become increasingly restrictive as additional systems are built upon it.

During review, consider questions such as:

Does this encourage future extension?
Does it preserve architectural flexibility?
Could this implementation become an obstacle later?
Does it strengthen the existing foundation or quietly work around it?

One useful exercise is to imagine returning to the implementation after several years of development.

Numerous features have been added.

The engine has grown considerably.

Would this design still appear sensible?

Or would it seem tightly coupled to assumptions that no longer exist?

Maintainable systems are rarely those that attempt to anticipate every future requirement.

They are those that avoid making unnecessary assumptions in the present.

The goal is not to build for every possible future.

The goal is to avoid limiting the futures that remain available.

Review for Technical Debt

Technical debt is not created only by large architectural compromises.

It is often accumulated through a series of small decisions that individually appear harmless.

A shortcut taken to meet an immediate objective.

A temporary solution that quietly becomes permanent.

A duplicated implementation intended to be revisited later.

A dependency introduced because it was convenient at the time.

None of these decisions automatically represent poor engineering.

Sometimes they are entirely appropriate.

A maintainability review exists to ensure they are recognised consciously rather than accepted accidentally.

Ask questions such as:

Is this compromise intentional?
Do we understand its long-term cost?
Is there a simpler alternative?
Are we creating work that future engineers will inevitably need to undo?

The objective is not to eliminate every compromise.

Engineering often requires practical decisions.

The objective is to ensure that compromises remain deliberate, proportionate, and well understood.

Debt acknowledged is easier to manage than debt discovered years later.

Closing Thoughts

Maintainability is one of the defining qualities of professional engineering.

Software that survives for decades does so because it continues to accommodate change without losing clarity, stability, or architectural coherence.

A maintainability review protects that future.

It encourages engineers to think beyond the immediate implementation and consider the lifetime of the decisions they are making.

Every simplification reduces future effort.

Every clear responsibility makes future modification safer.

Every unnecessary dependency removed today prevents future complexity from spreading tomorrow.

The Locomotion Engine is intended to grow through steady refinement rather than continual reinvention.

That objective depends upon engineering decisions that remain easy to revisit, easy to understand, and easy to improve.

A maintainability review ensures that each contribution strengthens not only the engine that exists today, but also the engine that future engineers will inherit.

Good engineering is measured not only by what it creates.

It is equally measured by how well it enables what comes next.

Part IX.5 — Review Completion & Acceptance
Purpose

Engineering review is complete only when the implementation is ready to become part of the engine.

The objective of review is not to complete a process.

It is to increase confidence that the work strengthens the engine rather than weakens it.

A completed review represents the point at which an engineer can reasonably say:

"This implementation reflects the best engineering judgement currently available."

That does not imply perfection.

No meaningful software is ever perfect.

Instead, it means that the implementation has been examined carefully, obvious improvements have been made, architectural concerns have been addressed, and the remaining decisions are understood and accepted consciously.

Acceptance is therefore an engineering decision rather than an administrative milestone.

The implementation becomes part of the engine because it has earned confidence through thoughtful review.

Accept Engineering, Not Effort

Engineering should be accepted because of its quality, not because of the effort invested in producing it.

Large amounts of work do not automatically justify keeping an implementation unchanged.

Likewise, discovering a better solution near the end of development should not be resisted simply because significant time has already been invested.

Review should remain independent of sunk cost.

Ask questions such as:

If this implementation were presented today for the first time, would it still seem like the right solution?
Does the current design deserve to become part of the engine?
Are we accepting it because it is good, or because changing it feels inconvenient?

The answers should always favour the long-term health of the engine.

Time already spent cannot improve a design.

Only engineering decisions can.

Know When the Work Is Ready

One of the most valuable engineering skills is recognising when additional refinement no longer provides meaningful benefit.

Review should improve the implementation.

It should not become an excuse for endless adjustment.

Eventually, every review reaches a point where the remaining observations become increasingly minor while the overall design remains sound.

At that point, further revision often produces diminishing returns.

Perfection is not the objective.

Deliberate quality is.

An implementation is generally ready when:

Its purpose is clear.
Its design aligns with the architecture.
Its responsibilities are well defined.
Obvious improvements have been made.
Remaining trade-offs are understood rather than accidental.

Waiting indefinitely for an ideal implementation delays progress without necessarily improving the engine.

Professional engineering requires judgement about when refinement has achieved sufficient value.

That judgement improves through experience.

Accept Trade-Offs Consciously

Every engineering decision involves trade-offs.

A solution may be simpler but slightly less flexible.

Another may be more extensible while introducing additional complexity.

A third may improve clarity at the cost of a modest increase in implementation effort.

Review should not attempt to eliminate trade-offs.

It should ensure they have been made consciously.

Ask:

What are we gaining?
What are we giving up?
Is that exchange appropriate for the engine?
Would we make the same decision again knowing these consequences?

Trade-offs become dangerous only when they remain invisible.

Once they are recognised and evaluated deliberately, they become part of responsible engineering judgement.

Acceptance should therefore reflect informed decisions rather than unexamined assumptions.

Leave the Engine Better Than You Found It

Every accepted change should strengthen the engine in some meaningful way.

That improvement may be substantial, such as introducing an important new capability.

It may also be modest, such as simplifying an existing design, removing unnecessary complexity, or clarifying an implementation.

The scale of improvement is less important than its direction.

A useful question during review is:

"Is the engine healthier after this change than it was before?"

If the answer is consistently yes, the engine steadily improves throughout its lifetime.

This perspective also encourages incremental progress.

Not every contribution needs to transform the architecture.

Small improvements accumulate.

One simplified function.

One clearer abstraction.

One unnecessary dependency removed.

Over months and years, these individual decisions produce an engine that is noticeably stronger than one built solely through large, infrequent changes.

Engineering excellence is often the result of thousands of careful improvements rather than a handful of dramatic ones.

Acceptance as a Commitment

Accepting an implementation is more than acknowledging that it functions correctly.

It is a commitment to the quality of the decision it represents.

Once incorporated into the engine, that implementation becomes part of the foundation upon which future work will be built.

Other engineers will depend upon it.

Future systems will extend it.

Design decisions made today will influence engineering decisions for years to come.

Acceptance should therefore be approached with an appropriate sense of responsibility.

Not because mistakes are unacceptable.

Mistakes are inevitable.

Rather, because accepted work becomes part of the engine's history.

Each accepted implementation contributes to the character of the codebase.

Over time, those individual contributions collectively define the quality, consistency, and maintainability of the engine itself.

Review ensures that this history is shaped deliberately instead of accidentally.

Closing Thoughts

Engineering review reaches its conclusion not when every possible improvement has been explored, but when the implementation reflects sound engineering judgement.

Acceptance is the moment an engineer decides that the work is ready to become part of the long-term foundation of the Locomotion Engine.

That decision should always be made with care.

The engine is intended to survive many years of continuous evolution.

Future contributors will inherit every accepted design, every architectural decision, and every implementation that remains within the codebase.

A thoughtful acceptance process recognises that responsibility.

It values steady progress without sacrificing engineering quality.

It accepts practical trade-offs without abandoning long-term thinking.

And it understands that every accepted contribution becomes another piece of the engine's enduring foundation.

Professional engineering is not defined by never making mistakes.

It is defined by making careful decisions, reviewing them honestly, improving them where necessary, and accepting them only when they genuinely strengthen the engine.

That discipline, practised consistently over many years, is what transforms individual implementations into an enduring software system.

Part X — Reviewing Code Quality

# Part X — Reviewing Code Quality

## 10.1 Purpose

A code review is not an exercise in proving that software works.

Correctness matters, but it is only one measure of quality. Code that behaves exactly as intended today may still become expensive to understand, difficult to extend, or frustrating to maintain tomorrow. The purpose of reviewing code quality is to determine whether an implementation deserves to become a permanent part of the Locomotion Engine.

Every change introduced into the engine becomes part of its long-term maintenance burden. Future contributors will read it, modify it, debug it, and build upon it. The quality of today's implementation directly influences the ease with which tomorrow's work can be completed.

For that reason, engineering review extends beyond asking, "Does this work?" It also asks questions such as:

* Is this implementation easy to understand?
* Does it fit naturally within the rest of the engine?
* Is the intent immediately obvious?
* Will future contributors be comfortable modifying it?
* Does it make the engine simpler or more complicated?

These questions recognise that software spends far more of its lifetime being read than being written. Every unnecessary moment spent deciphering confusing code represents time that cannot be spent improving the engine.

A review focused solely on correctness may approve an implementation that technically satisfies its requirements while quietly introducing unnecessary complexity. Such code often survives because it appears to solve the immediate problem, even though it increases the cost of every future change. Over time, these small compromises accumulate into an engine that becomes increasingly difficult to evolve.

A quality review exists to prevent that gradual erosion.

The objective is not to pursue perfection or enforce arbitrary stylistic preferences. Instead, it is to preserve the characteristics that allow the engine to remain understandable, predictable, and maintainable throughout its lifetime.

Three qualities deserve particular attention during every review.

### Readability

Code should communicate its purpose clearly.

A contributor unfamiliar with the implementation should be able to understand what the code is doing, why it exists, and how its major responsibilities are organised without mentally reconstructing the author's intentions.

Readable code reduces mistakes because it leaves less room for misunderstanding. It also accelerates future development by allowing contributors to build upon existing work with confidence.

### Consistency

Individual pieces of excellent code do not automatically produce an excellent codebase.

A collection of solutions that all solve similar problems in different ways creates uncertainty. Contributors must continually learn new conventions, different structures, and competing patterns before making even small changes.

Consistency transforms many individual implementations into a coherent engineering system. It allows contributors to develop expectations about how the engine is organised and how similar problems are typically solved.

Predictability is one of the most valuable qualities a mature codebase can possess.

### Maintainability

Every implementation should be evaluated with the expectation that it will still exist years from now.

Future contributors should be able to modify existing code without fear of introducing unintended behaviour. Responsibilities should remain clear, dependencies should remain understandable, and changes should remain local whenever practical.

Maintainability is rarely created by accident. It emerges from deliberate engineering decisions that favour clarity over cleverness, simplicity over unnecessary sophistication, and long-term understanding over short-term convenience.

A maintainable implementation does more than solve today's problem. It leaves the engine in a better position to solve tomorrow's.

Throughout this chapter, these qualities form the basis for evaluating implementation quality. They encourage contributors to look beyond immediate functionality and instead consider whether a change strengthens the long-term health of the engine.

The Locomotion Engine is intended to evolve over many years. Code review therefore exists not merely to protect the present implementation, but to safeguard the quality of every implementation that will follow.

A successful review concludes with more than confidence that the code works.

It concludes with confidence that the code belongs.

# Part X — Reviewing Code Quality

## 10.2 Readability Review

Readable code is one of the greatest long-term investments an engineer can make.

Unlike performance improvements or new features, readability continues to provide value every time someone opens a file. It reduces misunderstandings, shortens debugging sessions, simplifies refactoring, and allows contributors to spend their effort solving problems rather than deciphering existing implementations.

A readability review is therefore conducted independently of correctness. Even if code functions perfectly, it should still be evaluated according to how easily another engineer can understand it.

The objective is not to determine whether the original author can explain the code. The objective is to determine whether the code explains itself.

## Reviewing for Understanding

When reviewing readability, imagine approaching the implementation for the first time.

Set aside any knowledge gained during development and evaluate the code as though it belongs to someone else. The most valuable perspective is often that of the future maintainer who has no historical context beyond what appears on the screen.

Several questions help guide this review.

### Would someone unfamiliar with this code understand it?

A contributor should be able to understand the purpose of a function, the role of its variables, and the overall flow of execution without repeatedly referring to other parts of the code.

Understanding should emerge naturally as the code is read.

If the reviewer must continually stop to infer intent or mentally reconstruct missing information, the implementation is communicating poorly.

Good code introduces ideas gradually and logically. It does not require the reader to solve a puzzle before understanding the solution.

## Can Anything Be Simplified?

Many implementations become more complicated than necessary through incremental additions.

Extra variables, deeply nested conditions, unnecessary helper functions, or duplicated decision paths often appear reasonable when introduced individually. Together, they create code that demands far more attention than the underlying problem deserves.

During review, continually ask whether each part of the implementation is earning its place.

Could several conditions become one?

Could a temporary variable be removed?

Could multiple branches be expressed more clearly?

Could an entire section disappear without reducing clarity?

Simplification should never sacrifice understanding, but whenever equivalent behaviour can be expressed more directly, the simpler implementation is usually preferable.

Removing unnecessary code often improves readability more than adding explanatory comments.

## Does This Read Naturally?

Well-written code has a natural rhythm.

Names introduce concepts before they are used.

Control flow progresses in an expected order.

Responsibilities appear where readers naturally expect to find them.

The implementation tells a coherent story from beginning to end.

Readers should rarely need to jump backwards through a function to understand why something happened earlier.

For example, compare these approaches.

Less readable:

```text
Validate input.

Update internal state.

Perform calculations.

Check whether validation failed.
```

More readable:

```text
Validate input.

If validation succeeds:

    Perform calculations.

    Update internal state.
```

Both implementations may produce identical behaviour, but the second follows the sequence readers naturally expect. Important decisions occur before dependent work, making the overall flow significantly easier to understand.

Readability is often improved simply by arranging logic in the order people think about the problem.

## Are Responsibilities Obvious?

Each function, method, or section of code should have an immediately recognisable purpose.

A reviewer should be able to summarise its responsibility in a single sentence.

For example:

> "This function validates entity definitions."

or

> "This function updates active behaviours."

If a reviewer struggles to describe what a piece of code is responsible for, the implementation may be attempting to perform too many tasks simultaneously.

Blended responsibilities increase cognitive load because readers must continually switch between different concerns.

Clear responsibilities reduce that burden by allowing each section of code to be understood independently.

## Does the Code Explain Itself?

Self-explanatory code communicates intent through its structure rather than through extensive commentary.

Meaningful names.

Logical organisation.

Clear control flow.

Well-defined responsibilities.

These characteristics reduce the need for explanation because the implementation already expresses its purpose.

Comments remain valuable when describing intent, constraints, or reasoning that cannot reasonably be expressed through code alone. They should not exist solely to translate confusing implementations into plain language.

If a comment is required to explain what straightforward code is doing, the implementation itself should be reconsidered first.

Whenever possible, improve the code before adding more words around it.

## Are Unnecessary Mental Jumps Required?

Every time readers must hold several unrelated ideas in memory, readability suffers.

Common examples include:

* Variables introduced long before they are used.
* Important conditions hidden deep within nested logic.
* State modified in unexpected locations.
* Functions whose outcomes depend upon information established far away.
* Execution paths that continually move between unrelated responsibilities.

These unnecessary mental jumps increase cognitive load because readers must remember information that is no longer visible.

A readable implementation keeps related concepts close together.

Inputs appear near their validation.

Decisions appear before consequences.

State changes occur where readers expect them.

Related operations remain grouped.

The less information a reader must remember while progressing through the code, the easier that code becomes to understand.

## Reading at Different Levels

Good implementations remain understandable at multiple levels of detail.

At a high level, readers should quickly recognise the overall purpose of the code.

At a detailed level, each individual statement should support that purpose without introducing unnecessary surprises.

For example, someone skimming a file should understand its responsibilities within seconds.

Someone studying an individual function should understand each decision without repeatedly questioning why it exists.

Readable code rewards both forms of reading.

## Reading Aloud

A surprisingly effective review technique is to read the implementation as though explaining it to another engineer.

If the explanation flows naturally, the structure is usually sound.

If the explanation repeatedly includes phrases such as:

> "This part is a little unusual..."

or

> "Ignore this for now..."

or

> "It only makes sense after you reach the end..."

the implementation is often signalling opportunities for simplification.

Code should rarely require an accompanying narrative to become understandable.

## Readability as an Engineering Practice

Readability is sometimes mistaken for aesthetics.

It is not.

Readable code is easier to review, easier to debug, easier to extend, and easier to trust. It reduces the likelihood of introducing defects because engineers spend less effort understanding existing behaviour before making changes.

Over the lifetime of a long-lived engine, these small improvements compound into significant engineering advantages.

Every readability review should therefore ask a simple question:

**Would another contributor understand this implementation without needing its original author?**

If the answer is uncertain, the implementation can almost always be improved.

Readable code is not merely pleasant to work with.

It is one of the foundations upon which maintainable software is built.

Part X — Reviewing Code Quality
10.3 Consistency Review

Consistency is one of the defining characteristics of a mature codebase.

Individual pieces of code may each be technically correct, well structured, and thoughtfully designed, yet still reduce the overall quality of the engine if they introduce new conventions without good reason. A contributor should not have to learn a different style of engineering every time they open a new file.

A consistency review asks a simple question:

Does this implementation feel like it belongs here?

If the answer is yes, contributors can focus on understanding the problem being solved rather than adapting to a different way of writing software.

Consistency is therefore not about suppressing creativity or enforcing arbitrary rules. It exists because predictable software is easier to understand, easier to maintain, and easier to extend.

Reviewing Against the Existing Codebase

Every implementation becomes part of a larger system.

Rather than judging code in isolation, review it in the context of the surrounding engine.

Ask questions such as:

Does this follow the established naming conventions?
Is it organised in the same way as similar code?
Does it use familiar patterns?
Does it handle errors consistently?
Does it log information in the same style?
Would someone recognise this as Locomotion Engine code?

Consistency allows knowledge gained in one part of the engine to transfer naturally to another.

When similar problems are solved in similar ways, contributors spend less time learning and more time building.

Naming Consistency

Names form the vocabulary of the engine.

A review should ensure that new names fit naturally alongside existing terminology rather than introducing competing language.

For example, if the engine consistently uses Entity, Definition, and Behaviour, introducing an unrelated term such as Object for the same concept creates unnecessary ambiguity.

Likewise, if existing code consistently describes actions using verbs such as:

createEntity()
destroyEntity()
updateEntity()

then introducing:

spawnEntity()
removeEntity()
tickEntity()

without a meaningful distinction weakens the shared language of the codebase.

The goal is not rigid uniformity for its own sake.

The goal is to preserve a vocabulary that contributors can rely upon.

Every unnecessary synonym increases the effort required to understand the engine.

Structural Consistency

Code should be organised in familiar ways.

When contributors move between similar systems, they should encounter similar structures.

For example:

Similar functions should appear in similar orders.
Related responsibilities should be grouped consistently.
Files with comparable purposes should follow comparable layouts.
Similar workflows should follow similar sequences.

Suppose two systems both perform initialization.

Less consistent:

System A

Initialise
Validate
Configure
Start
System B

Configure
Start
Validate
Initialise

Both implementations may work perfectly, but the differing structure forces contributors to continually reorient themselves.

More consistent implementations reduce this friction by presenting familiar patterns wherever practical.

Predictable organisation allows engineers to locate information quickly because they know where to expect it.

Established Patterns

Every long-lived codebase develops patterns that have proven effective.

These patterns may involve:

Resource management
State updates
Object creation
Validation
Event handling
Lifecycle management

A review should identify whether new code follows these established approaches.

Introducing a completely different pattern simply because it appears slightly more elegant in isolation often increases overall complexity.

An individually superior solution is not necessarily the better engineering decision if it makes the surrounding codebase less coherent.

Consistency across hundreds of files usually provides greater long-term value than isolated improvements that only exist in one place.

Error Handling

Error handling should feel predictable throughout the engine.

Review whether similar failures are handled in similar ways.

Consider questions such as:

Are failures detected consistently?
Are errors reported at the appropriate level?
Are exceptional situations treated similarly across related systems?
Does this implementation follow existing conventions for recovery or failure?

Unexpected differences in error handling create uncertainty because contributors cannot confidently predict how failures behave.

Consistency makes failures easier to understand because the engine reacts in familiar ways regardless of where an error occurs.

Logging

Logging should communicate information consistently throughout the engine.

Review not only what is logged, but how it is logged.

Messages should follow the same general style, terminology, and level of detail as the surrounding code.

For example, an engine that normally produces concise diagnostic messages should not suddenly introduce verbose narrative logging for one subsystem alone.

Likewise, terminology used within log messages should match the terminology used throughout the rest of the engine.

Consistent logging makes diagnostics significantly easier because contributors quickly learn how to interpret the information presented.

Formatting

Formatting is often the most visible aspect of consistency, but it is also the least important.

Indentation, spacing, line breaks, and layout should remain consistent because inconsistent formatting distracts readers from understanding the implementation itself.

A reviewer should avoid treating formatting as an end in itself.

Neatly formatted code that is poorly structured remains poor code.

Formatting should support readability rather than replace it.

The objective is to minimise visual noise so that the engineering decisions receive the reader's attention.

Engineering Style

Beyond individual conventions lies a broader engineering style.

The Locomotion Engine should feel as though it has one engineering voice rather than many competing ones.

Contributors should gradually develop an intuition for how the engine solves problems.

When encountering a new requirement, they should already have reasonable expectations about:

how responsibilities are divided,
how state is managed,
how validation is performed,
how control flow is organised, and
how similar problems have previously been approached.

This shared style is one of the greatest advantages of a mature codebase.

It reduces uncertainty because contributors are rarely surprised by familiar systems.

Consistency Before Personal Preference

Every engineer develops personal preferences over time.

Some prefer compact code.

Others prefer explicit code.

Some favour one naming style.

Others prefer another.

A consistency review deliberately places these preferences behind the needs of the project.

A contributor may genuinely believe an alternative approach is superior.

However, introducing isolated exceptions simply because they reflect individual taste often makes the engine less coherent.

Whenever an established pattern already solves the problem effectively, following that pattern is usually the better decision.

This does not mean consistency should become dogma.

If an established practice demonstrably reduces clarity, increases complexity, or has become an obstacle to good engineering, improving the standard may be appropriate.

The important distinction is that improvements should raise the quality of the engine as a whole rather than create isolated islands of different engineering styles.

Building Confidence Through Predictability

Consistency builds trust.

When contributors recognise familiar patterns, they gain confidence that they understand the behaviour of the surrounding code. They spend less time questioning implementation details and more time solving meaningful problems.

Over years of development, this predictability becomes one of the engine's greatest strengths.

Well-written code should not constantly surprise its readers.

It should feel familiar, even when they are encountering it for the first time.

A successful consistency review therefore asks more than whether the implementation is technically sound.

It asks whether the code strengthens the shared engineering language of the Locomotion Engine.

If every contributor writes code that feels as though it belongs alongside everything that came before it, the engine becomes not only easier to maintain, but increasingly easier to understand as it grows.

Part X — Reviewing Code Quality
10.4 Maintainability Review

Code is written once but maintained many times.

The implementation that appears straightforward today will eventually be revisited by someone fixing a defect, adding a feature, improving performance, or adapting the engine to new requirements. That person may be the original author, but more often it will be another contributor approaching the code with little or no knowledge of why it was originally written.

A maintainability review exists to evaluate how well the implementation supports that inevitable future work.

The question is not whether the code is easy to write.

The question is whether it will remain easy to change.

Maintainability is one of the defining qualities of long-lived software. It is created through deliberate engineering decisions that reduce friction for future contributors and preserve the clarity of the codebase as it evolves.

Thinking Beyond Today

Every implementation should be reviewed with a long-term perspective.

Instead of evaluating only the immediate requirements, imagine revisiting the same code years from now.

Ask questions such as:

Will this still make sense in five years?
Would I immediately understand why this exists?
Does the structure encourage safe modification?
Is the intent likely to remain clear as the engine grows?

Time changes the context in which software is understood.

Details that seem obvious during implementation are quickly forgotten. Future contributors should not be expected to reconstruct decisions from memory or historical knowledge.

Well-maintained software remains understandable even after the original context has disappeared.

Will This Still Make Sense in Five Years?

Long-lived code should not depend upon temporary assumptions.

Avoid solutions that only appear obvious because of current project knowledge, today's feature set, or the order in which systems happened to be implemented.

Instead, review whether the implementation communicates enduring ideas.

For example, compare these approaches.

Less maintainable:

// Temporary workaround until the new update system exists.

More maintainable:

// Ensures entities complete validation before entering the update pipeline.

The second comment explains why the code exists rather than when it was written. Even years later, the reasoning remains valuable.

Maintainable code preserves intent rather than history.

Is Future Maintenance Easier or Harder?

Every change either reduces or increases the effort required for future work.

During review, consider whether the implementation leaves the surrounding codebase in a healthier state.

For example:

Are responsibilities clearer than before?
Have confusing structures been simplified?
Are future extension points obvious?
Have dependencies become easier to understand?

A successful implementation often improves existing code while solving the immediate problem.

If future changes appear simpler after the implementation than before it, maintainability has likely improved.

Has Complexity Been Reduced or Merely Moved?

One of the most common maintenance traps is relocating complexity rather than removing it.

For example, extracting fifty lines of logic into a helper function may shorten the current function, but if the helper now requires readers to constantly switch between files to understand a simple workflow, overall complexity has not decreased.

Similarly, replacing explicit logic with several layers of abstraction may produce shorter code while making behaviour significantly harder to follow.

A maintainability review should ask whether the implementation genuinely became simpler or whether the complexity merely changed location.

True simplification reduces the total effort required to understand the system.

It does not simply rearrange that effort.

Would Another Contributor Feel Comfortable Extending This?

Good software invites modification.

Poorly maintained software discourages it.

Imagine another contributor receiving a task to extend the implementation.

Would they know where to begin?

Would they feel confident making changes?

Would the structure guide them toward the correct solution?

Or would they hesitate because every modification appears likely to introduce unintended consequences?

Maintainable code clearly communicates where responsibilities belong and where future changes should occur.

When contributors understand the structure, they are far less likely to create accidental duplication or introduce inconsistent behaviour.

Is This Solution Likely to Age Well?

Not every implementation that solves today's problem remains suitable tomorrow.

Review whether the solution is based upon enduring engineering principles rather than temporary circumstances.

For example, consider whether it:

separates responsibilities clearly,
avoids unnecessary assumptions,
remains independent of current implementation details,
supports future extension without major restructuring, and
avoids introducing concepts that only solve one isolated problem.

Solutions built upon clear responsibilities and simple structures tend to remain valuable even as surrounding systems evolve.

Solutions built around temporary conditions often require continual revision.

Designing for Safe Change

Maintainability is closely related to confidence.

Contributors should feel that they can make changes without unexpectedly breaking unrelated behaviour.

Review whether the implementation naturally supports safe modification.

Characteristics that encourage safe change include:

clearly defined responsibilities,
localised changes,
predictable control flow,
understandable dependencies, and
minimal interaction between unrelated concerns.

When changes remain isolated, contributors can reason about their effects more confidently.

When every modification requires understanding half the engine, maintenance becomes increasingly risky.

Good design limits the scope of change.

Avoiding Hidden Maintenance Costs

Some implementations appear simple because they postpone complexity rather than eliminating it.

Examples include:

duplicated knowledge that must later be updated in multiple places,
tightly coupled systems that cannot evolve independently,
ambiguous responsibilities that encourage inconsistent extensions,
implicit assumptions that future contributors may not recognise.

These hidden costs often remain invisible until months or years later, when routine modifications become unexpectedly difficult.

A maintainability review attempts to identify these issues before they become permanent parts of the engine.

The cheapest time to reduce future maintenance costs is before the code is accepted.

Longevity Through Deliberate Design

Maintainable software rarely emerges by accident.

It is the result of repeated decisions that favour clarity over cleverness, stability over novelty, and deliberate design over short-term convenience.

Engineers often focus on making code work.

A maintainability review asks whether the implementation will continue working for the people who must maintain it.

That distinction is important.

Software is not finished when it first behaves correctly.

Its real life begins when other engineers start relying upon it.

Maintaining the Engine, Not Just the Feature

Every implementation contributes to the long-term character of the engine.

A feature may solve one problem.

Maintainable code improves the environment in which every future problem will be solved.

The Locomotion Engine is intended to evolve over decades rather than development cycles. Decisions made today should therefore reduce future engineering effort rather than quietly increasing it.

A successful maintainability review concludes with confidence that the implementation is more than functional.

It concludes with confidence that future contributors will understand it, trust it, and feel comfortable extending it without first needing to unravel the decisions that came before.

Part X — Reviewing Code Quality
10.5 Looking for Unnecessary Complexity

Complexity is one of the greatest long-term costs in software engineering.

Every additional concept, abstraction, dependency, or layer of indirection increases the effort required to understand the engine. Some complexity is unavoidable because real problems are often complex. However, much of the complexity found in software is not created by the problem itself—it is created by the implementation.

A quality review should distinguish between these two forms.

Necessary complexity reflects the nature of the problem.

Unnecessary complexity reflects engineering decisions that make the solution harder to understand than it needs to be.

The purpose of this review is to identify and remove that unnecessary complexity before it becomes part of the engine.

Often, the most valuable improvement a reviewer can suggest is not adding another feature, but removing an unnecessary idea.

Complexity Is a Cost

Every piece of code carries a maintenance cost.

Every additional function must be understood.

Every abstraction must be learned.

Every dependency must be remembered.

Every branch must be reasoned about.

Individually, these costs appear small.

Collectively, they determine how difficult the engine becomes to maintain.

A review should therefore ask not only whether a piece of code is useful, but whether it justifies the additional complexity it introduces.

The simplest correct implementation is usually the one that provides the greatest long-term value.

Looking for Duplicate Logic

Duplicate logic is one of the easiest forms of unnecessary complexity to overlook.

Two pieces of code may initially appear independent, but as the engine evolves they often require the same modifications. Eventually they drift apart, introducing subtle inconsistencies that become increasingly difficult to detect.

During review, ask:

Does similar logic already exist elsewhere?
Is this solving a problem that has already been solved?
Could both implementations share a common solution?
Are identical decisions being made in multiple places?

For example:

Less maintainable:

Validate entity name.

...

Validate entity name again elsewhere using slightly different rules.

More maintainable:

Use one shared validation routine.

Apply the same validation wherever entity names are checked.

The objective is not to eliminate every repeated line of code.

Sometimes small amounts of duplication are clearer than forcing unrelated systems to share an abstraction.

Instead, look for duplicated knowledge.

If changing one rule requires modifying several different implementations, the engine now possesses multiple sources of truth.

That situation should be viewed with caution.

Recognising Overly Clever Solutions

Some implementations are technically impressive.

They minimise lines of code.

They demonstrate sophisticated language features.

They compress complex behaviour into remarkably concise expressions.

Unfortunately, these characteristics often make the implementation significantly harder to understand.

Engineering quality should never be confused with cleverness.

Reviewers should be cautious whenever they encounter code that requires careful study simply to determine what it does.

If an implementation causes experienced contributors to pause and mentally decode its behaviour, it is worth asking whether a simpler approach would communicate the same intent more clearly.

The best implementation is rarely the one that demonstrates the author's ingenuity.

It is usually the one that allows future contributors to understand the solution immediately.

Readable code ages far better than clever code.

Challenging Premature Abstraction

Abstraction is one of the most powerful tools available to an engineer.

It is also one of the easiest tools to misuse.

A common mistake is introducing abstraction before the engine has demonstrated a genuine need for it.

For example:

Generic systems created to support hypothetical future requirements.
Interfaces with only one implementation.
Reusable frameworks that are used exactly once.
Extension points added before any extensions exist.

These designs often appear flexible, but they increase the conceptual burden of the engine without providing corresponding value.

A review should ask:

What concrete problem does this abstraction solve today?
Has this duplication actually occurred yet?
Would a simpler implementation be easier to evolve?
Is this abstraction reducing complexity or merely relocating it?

Good abstractions emerge from repeated experience.

Premature abstractions are often based on speculation.

The difference becomes increasingly important as the engine grows.

Avoiding Unnecessary Indirection

Indirection separates one piece of code from another.

Used appropriately, it improves modularity and reduces coupling.

Used excessively, it forces contributors to navigate multiple layers before understanding straightforward behaviour.

Consider a simple operation that passes through several helper functions before reaching the actual implementation.

Each individual function may appear small and well organised, yet understanding the behaviour now requires following a chain of calls spread across multiple locations.

During review, consider whether each level of indirection contributes meaningful clarity.

If removing a layer makes the implementation easier to understand without reducing flexibility, the additional abstraction was probably unnecessary.

The shortest path between understanding and implementation is often the most maintainable.

Resisting "Just in Case" Features

One of the most common sources of accidental complexity is preparing for futures that never arrive.

Examples include:

Configuration options that are never used.
Extension mechanisms with no anticipated extensions.
General-purpose systems created for hypothetical requirements.
Parameters included solely because they might become useful later.

These additions usually feel harmless during implementation.

Over time, however, they accumulate into a codebase filled with concepts that contributors must understand despite providing no practical value.

The engine should grow in response to demonstrated need rather than imagined possibilities.

A review should therefore challenge every feature that exists solely "just in case."

The future will provide plenty of opportunities to introduce new capabilities when they are genuinely required.

There is little value in maintaining them before that point.

The Value of Deleting Code

Many people associate engineering progress with writing more code.

Experienced engineers often recognise that some of their most valuable work involves deleting it.

Removing obsolete logic.

Eliminating duplicated behaviour.

Simplifying complicated control flow.

Discarding unnecessary abstractions.

These changes frequently improve the engine more than adding new functionality.

Deletion reduces maintenance cost immediately.

There is less code to understand.

Less code to debug.

Less code to refactor.

Less code to accidentally break.

A review should actively look for opportunities where removing code produces a simpler, clearer implementation.

Deletion should be viewed as an engineering improvement, not as lost effort.

Favouring Simplicity

Simplicity is sometimes mistaken for minimalism.

The objective is not to produce the smallest possible implementation.

The objective is to produce the implementation that communicates the solution most clearly while introducing the fewest permanent concepts.

Sometimes this requires additional structure.

Sometimes it requires removing existing structure.

The important question is always the same:

Does this make the engine easier to understand?

If the answer is no, the added complexity should be carefully justified.

Complexity Should Earn Its Place

Every additional idea introduced into the engine should provide lasting value.

Complexity that simplifies genuinely difficult problems is worthwhile.

Complexity introduced merely because it is possible rarely is.

A reviewer should never hesitate to ask:

Can this be simpler?
Do we actually need this?
What happens if we remove it?
Is the problem truly this complicated, or have we made it so?

These questions are not signs of scepticism.

They are signs of stewardship.

The long-term quality of the Locomotion Engine will not be determined by how much code it contains, but by how much unnecessary complexity it successfully avoids.

The most maintainable engine is not the one with the greatest number of features or abstractions.

It is the one whose solutions remain as simple as the problem allows, and no more complicated than necessary.

10.6 Closing Thoughts

A successful code review concludes with more than confidence that the software functions correctly.

It concludes with confidence that the implementation improves the engine.

Correctness is essential, but it is only the beginning. Software that is difficult to understand, inconsistent with the surrounding codebase, or unnecessarily complex continues to impose costs long after it has been committed. Every future modification becomes slower, every review becomes more demanding, and every contributor spends more time understanding existing code before they can build upon it.

Well-written code produces the opposite effect.

It welcomes change.

It communicates its intent clearly.

It behaves predictably.

It allows future contributors to concentrate on solving new problems instead of untangling old ones.

These qualities are not accidental. They emerge from deliberate engineering decisions made before code becomes a permanent part of the engine.

For this reason, implementation quality should always be evaluated from the perspective of the future maintainer.

That person may have no knowledge of the feature being developed.

They may not know why particular decisions were made.

They may be working months or years after the original implementation.

The only guidance they will have is the code itself.

A review should therefore ask whether the implementation leaves that future engineer in a better position than before.

Will they understand the purpose of the code?

Will they recognise its responsibilities?

Will they know where to make changes?

Will they trust that modifying one part of the implementation is unlikely to produce unexpected consequences elsewhere?

If the answer to these questions is yes, the implementation has achieved something more valuable than simply satisfying its current requirements.

It has become a dependable part of the engine.

This perspective also encourages humility.

Every contributor, regardless of experience, writes code that will one day be revisited. Time removes context, memories fade, and seemingly obvious decisions become surprisingly difficult to interpret. The objective is not to write code that depends upon remembering today's reasoning, but to write code that continues explaining itself long after that reasoning has been forgotten.

Good engineering is an investment in future understanding.

Every clear name, every well-defined responsibility, every unnecessary abstraction removed, and every simplification made during review contributes to an engine that becomes easier—not harder—to evolve.

These improvements may appear small in isolation, yet they accumulate over years into one of the defining characteristics of mature software.

The Locomotion Engine is intended to remain useful for decades.

That ambition cannot be achieved through architecture alone, nor through implementation alone. It depends upon consistently accepting code that strengthens the long-term health of the engine while refusing changes that quietly increase its maintenance burden.

Every review is therefore an opportunity to shape the future character of the codebase.

Features will continue to evolve.

Systems will be refined.

Implementations will be replaced.

The quality of those changes will always depend upon the foundation they inherit.

Review every implementation with that responsibility in mind.

Write code that another engineer can understand without explanation.

Prefer clarity over cleverness.

Prefer consistency over individual preference.

Prefer simplicity over unnecessary sophistication.

Most importantly, remember that the true measure of well-written software is not merely that it works today.

It is that years from now, someone can confidently read it, trust it, improve it, and enjoy maintaining it.

Part XI — Reviewing Engineering Decisions

Part XI — Reviewing Engineering Decisions
11.1 Purpose

Every implementation is the result of a series of engineering decisions.

The code itself is simply the final expression of those decisions. Long before a function is written, an interface is designed, or a system is implemented, an engineer has already made numerous choices about how the problem should be understood and solved.

Traditional code review often focuses on the visible outcome. It examines correctness, structure, maintainability, and compliance with established engineering practices. These are valuable activities, but they address only the implementation that exists.

Reviewing engineering decisions asks a different question.

Was this the right solution in the first place?

A well-written implementation can still represent a poor engineering decision. Likewise, an implementation that initially appears unconventional may prove to be the strongest choice once its reasoning is understood. For this reason, contributors should learn to evaluate the thinking behind their work, not simply the quality of the code they produce.

Engineering decisions shape the engine long before they become permanent implementation. Every choice influences future development by determining which concepts are introduced, which responsibilities are created, and which assumptions become embedded within the system. Once implemented, these decisions often become increasingly difficult to change as other systems begin to depend upon them.

Thoughtful review helps identify issues that implementation review alone may not reveal.

For example, an implementation may correctly solve a problem while unnecessarily increasing the number of permanent concepts within the engine. It may successfully support a use case while introducing assumptions about future requirements that have never been validated. It may provide impressive flexibility for scenarios that are unlikely to exist, adding complexity without delivering corresponding value.

None of these concerns necessarily indicate poor code. They indicate decisions that deserve closer examination before they become part of the engine's foundation.

Reviewing engineering decisions also encourages intentional design. Rather than accepting the first workable solution, contributors develop the habit of considering why a particular approach was chosen and whether a different solution would better serve the long-term health of the engine.

This process should not become an exercise in endless doubt. Every engineering decision is made with incomplete information, limited time, and evolving understanding. The objective is not to eliminate uncertainty, but to ensure that important decisions have been considered deliberately rather than accepted automatically.

As experience grows, engineers often discover that their first instinct is not always their best one. Initial solutions frequently reflect the most obvious path rather than the simplest, clearest, or most maintainable one. Taking time to examine the reasoning behind those solutions often uncovers opportunities for refinement before unnecessary complexity becomes embedded in the architecture.

Good engineering is therefore not defined solely by the ability to write correct software.

It also depends upon the ability to recognise weak assumptions, question familiar patterns, reconsider earlier conclusions, and make decisions that continue to serve the engine long after the immediate problem has been solved.

Excellent software begins with excellent thinking.

The quality of an implementation can never consistently exceed the quality of the decisions that produced it. By learning to review engineering judgement as carefully as implementation itself, contributors strengthen not only the code they write today, but the long-term integrity, clarity, and maintainability of the Locomotion Engine.

11.2 Testing Your Thinking

The quality of an engineering solution depends upon the quality of the thinking that produced it.

Before implementation becomes permanent, contributors should deliberately examine the reasoning behind their decisions. This practice is not about proving a solution correct. It is about discovering whether a better solution exists before the engine must live with the consequences.

Questioning one's own work is one of the most valuable engineering habits that can be developed.

It is easy to become attached to the first solution that works. Once an implementation begins to take shape, it naturally feels increasingly correct simply because time and effort have already been invested in it. Unfortunately, familiarity can easily be mistaken for confidence.

Effective engineers recognise this tendency and actively resist it.

Rather than defending an idea simply because it has been implemented, they pause and ask whether they would still make the same decision if they were starting again.

A useful way to do this is by asking a small number of deliberate questions before considering the work complete.

Why did I choose this solution?

Every significant implementation should have a reason beyond "it works."

Perhaps the solution is the simplest available.

Perhaps it aligns naturally with existing architectural patterns.

Perhaps it removes duplication or improves conceptual clarity.

Whatever the reason, it should be possible to explain it clearly.

If the only justification is that it was the first approach that came to mind, there is value in considering whether other approaches deserve exploration before the decision becomes permanent.

Is there a simpler alternative?

Complexity often enters a design gradually.

An engineer solves one problem, then another, then introduces an additional layer to accommodate an edge case. Individually, each decision appears reasonable. Collectively, they may produce a solution far more complicated than the original problem required.

Whenever a design grows in complexity, it is worth asking whether the same outcome could be achieved with fewer concepts, fewer responsibilities, or fewer assumptions.

For example, imagine introducing a configurable rule engine to support three validation rules that are unlikely to change.

The implementation may be technically impressive, but if three straightforward validations would solve the problem just as effectively, the additional abstraction has increased complexity without increasing value.

Simple solutions deserve preference not because they are easier to write, but because they are easier to understand, maintain, and evolve.

Am I solving the correct problem?

Engineers occasionally become so focused on removing a symptom that they lose sight of the underlying issue.

A system may appear to require new functionality when the real problem is an unclear responsibility elsewhere in the design.

Similarly, repeated fixes in one area of the engine may indicate that the conceptual model itself should be reconsidered rather than extended.

For example, suppose multiple systems require special-case logic to determine whether an entity should be updated.

The immediate response might be to add another filtering mechanism.

A better question is whether the existing update responsibilities have been defined correctly in the first place.

Solving the right problem is often more valuable than solving the apparent one.

Did I introduce unnecessary abstraction?

Abstraction is a powerful engineering tool, but it carries a permanent maintenance cost.

Every abstraction introduces another concept that future contributors must understand.

Good abstractions reduce duplication, simplify reasoning, and represent genuinely shared ideas.

Poor abstractions exist only because they might become useful one day.

Before introducing an abstraction, contributors should ask whether it represents knowledge that truly belongs at a higher level or whether it merely postpones a decision that has not yet become necessary.

If an abstraction has only one consumer, one implementation, and no demonstrated need for variation, it may simply be another name for existing code.

Have I mistaken flexibility for complexity?

The desire to build flexible systems is understandable.

The Locomotion Engine is intended to evolve over many years, and contributors naturally wish to avoid future limitations.

However, flexibility is not measured by the number of options a system provides.

It is measured by how easily the system can accommodate genuine change.

A design that supports dozens of hypothetical scenarios at the cost of increased complexity is often less flexible than a simple design that can be extended when new requirements actually appear.

For example, implementing a highly configurable plugin architecture for a subsystem that has only one foreseeable implementation may appear future-proof, but it also introduces additional concepts, interfaces, and responsibilities that every contributor must now understand.

The simpler implementation may provide greater long-term flexibility precisely because it remains easier to change.

What assumptions am I making?

Every engineering decision is built upon assumptions, whether they are recognised or not.

Some assumptions concern future requirements.

Others concern expected usage, architectural constraints, performance characteristics, or implementation behaviour.

The most dangerous assumptions are often the invisible ones.

By identifying assumptions explicitly, contributors gain the opportunity to verify them before they become embedded within the engine.

An assumption that survives examination becomes evidence supporting the design.

An assumption that cannot be justified may reveal an opportunity to simplify the solution or rethink the problem entirely.

Deliberately Challenging Your Own Conclusions

Testing your thinking is not an exercise in self-criticism.

It is an exercise in intellectual discipline.

Experienced engineers regularly challenge their own conclusions, even after years of solving similar problems. Familiarity with a domain does not eliminate the possibility of overlooking a simpler idea, carrying forward an outdated assumption, or solving yesterday's problem instead of today's.

In practice, many of the strongest engineering improvements occur before a single line of code changes.

An engineer pauses, asks a difficult question about their own reasoning, and realises that the implementation can be simplified, responsibilities can be clarified, or the problem itself has been misunderstood.

These moments rarely occur by accident.

They occur because the engineer deliberately tested their own thinking.

The objective is not to become hesitant or indecisive. Decisions must still be made, and progress must continue. Instead, contributors should develop the habit of briefly stepping outside their own solution, examining it as though it were someone else's work, and asking whether they would confidently recommend the same approach today.

Over time, this habit produces more than better implementations.

It produces better engineers.

11.3 Validating Assumptions

Every engineering decision rests upon assumptions.

Some are explicit and carefully considered. Others remain hidden beneath the surface, quietly influencing design choices without ever being questioned. Whether recognised or not, assumptions shape implementations long before they become permanent parts of the engine.

The purpose of reviewing engineering decisions is not merely to identify assumptions, but to validate them before they become architectural debt.

An assumption should never be mistaken for a fact simply because it feels reasonable.

Instead, contributors should treat assumptions as hypotheses that deserve evidence before they influence the long-term design of the engine.

Recognising Assumptions

Assumptions often appear as statements that begin with words such as probably, eventually, likely, or we might need.

While these thoughts are natural during engineering, they should not automatically determine implementation.

Instead, they should prompt a simple question:

What evidence supports this assumption?

Sometimes the answer is clear.

The assumption may be based on existing architectural requirements, demonstrated implementation experience, or well-understood constraints.

Other times, the only answer is intuition.

Intuition has value. Experience allows engineers to recognise patterns that are difficult to articulate immediately. However, intuition should begin an investigation rather than conclude one.

When important design decisions depend entirely upon intuition, there is often value in seeking additional evidence before committing the solution to the engine.

Assuming Future Requirements

One of the most common engineering assumptions concerns the future.

Contributors frequently attempt to predict capabilities that may eventually be required and design systems around those predictions.

Occasionally this proves valuable.

More often, it introduces complexity that serves problems the engine never actually encounters.

For example, imagine implementing a configuration system capable of supporting dozens of storage formats because additional formats may be required in the future.

If the engine currently requires only one format and there is no evidence that others will be needed, the additional abstraction represents an investment without a demonstrated return.

Future requirements should influence thinking, but they should not dominate implementation.

The engine should remain easy to extend when new requirements appear rather than becoming difficult to understand because of requirements that never did.

Assuming Performance Problems

Performance is another area where assumptions frequently shape design.

It is tempting to optimise a system before measurements indicate that optimisation is necessary.

This often results in implementations that are significantly more complicated than the straightforward solution they replaced.

For example, an engineer might introduce multiple layers of caching, object pooling, or specialised data structures because they expect a subsystem to become a performance bottleneck.

If no evidence suggests that performance is currently inadequate, these additions increase complexity while solving a problem that may not exist.

Performance concerns should be supported by observation whenever practical.

Measured problems deserve measured solutions.

Predicted problems deserve investigation before implementation.

Assuming Reuse

Reuse is a worthwhile engineering goal, but it is frequently overestimated.

A contributor may design a highly generic system because they believe many future features will depend upon it.

Sometimes that prediction proves correct.

Sometimes the abstraction remains permanently used by only one part of the engine.

For example, extracting a reusable framework after observing several genuinely similar implementations often produces a strong abstraction.

Creating that same framework before any shared behaviour exists frequently results in an abstraction that exists only because it was expected to become useful.

Meaningful reuse is usually discovered rather than predicted.

When uncertainty exists, it is often better to allow common patterns to emerge naturally before introducing permanent abstractions.

Assuming Complexity Is Necessary

Some problems appear complicated simply because they have not yet been fully understood.

An engineer may conclude that a sophisticated solution is unavoidable when, in reality, the complexity lies in the way the problem has been framed.

Before accepting a complex design, contributors should ask whether they have explored the simplest interpretation of the problem.

For example, suppose a subsystem appears to require multiple specialised execution paths.

After further investigation, it may become clear that all of those paths represent variations of the same underlying behaviour, allowing them to be unified into a single, simpler model.

Complexity should be accepted only after simpler explanations have been genuinely exhausted.

Assuming Existing Patterns Must Be Repeated

Consistency is an important engineering principle, but consistency should never become imitation.

A pattern that works well in one part of the engine may not be appropriate elsewhere.

Blindly reproducing an existing design simply because it already exists can gradually spread unnecessary complexity throughout the codebase.

Instead, contributors should understand why a pattern exists before applying it again.

If the original reasoning remains valid, consistency strengthens the engine.

If the circumstances differ, the correct decision may be to adopt a different approach while remaining consistent with the underlying engineering principles rather than the implementation itself.

Patterns should be repeated because they solve similar problems, not because they are familiar.

Seeking Evidence

Engineering confidence should increase with evidence.

Evidence may come from many sources.

It may come from a working prototype.

It may come from repeated implementation experience.

It may come from observed behaviour during development.

It may come from measurable data collected while building the engine.

The important distinction is that evidence reduces uncertainty.

When evidence supports an assumption, confidence in the resulting design naturally grows.

When evidence contradicts an assumption, contributors have the opportunity to improve the design before unnecessary complexity becomes permanent.

Not every engineering decision can wait for perfect information.

Progress requires making decisions with incomplete knowledge.

However, contributors should distinguish clearly between what they know and what they merely expect.

That distinction often determines whether a design remains adaptable or becomes increasingly difficult to evolve.

Treat Assumptions as Temporary

Assumptions should never become permanent simply because they have existed for a long time.

As the engine evolves, implementation experience continually replaces speculation with understanding.

An assumption that guided an early design may later prove unnecessary.

Another may become strongly supported through repeated use.

Both outcomes are valuable.

Responsible engineering means being willing to update decisions as understanding improves.

The goal is not to eliminate assumptions altogether—that would make engineering impossible.

The goal is to recognise them, validate them whenever practical, and prevent untested beliefs from quietly becoming permanent features of the engine.

The healthiest long-lived software is built by engineers who are willing to change their minds when new evidence justifies a better decision.

11.4 Considering Alternatives

One of the easiest ways to improve an engineering decision is to avoid becoming committed to the first solution that appears to work.

The first workable solution often represents the shortest path to a functioning implementation, but it is not necessarily the strongest solution for the long-term health of the engine. It reflects an initial understanding of the problem, and that understanding frequently evolves as the problem becomes clearer.

For this reason, contributors should deliberately consider alternative approaches before accepting an implementation as complete.

This does not require exhaustive analysis or endless experimentation.

Instead, it encourages a brief, deliberate comparison of plausible solutions to ensure that the chosen approach is preferred for sound engineering reasons rather than because it happened to be implemented first.

The First Solution Is a Starting Point

Finding a working solution is an important milestone.

It demonstrates that the problem is understood well enough to produce a correct implementation.

However, correctness alone does not determine quality.

Once a solution exists, contributors have an opportunity to step back and ask whether a different approach would better serve the engine over time.

In many cases, the answer will be no.

The original implementation may already be the simplest, clearest, and most maintainable solution available.

When this happens, considering alternatives still provides value because it increases confidence that the chosen approach is genuinely the best available rather than merely the first discovered.

Exploring Multiple Approaches

For significant engineering decisions, it is often worthwhile to think through at least two or three reasonable alternatives before committing to one.

These alternatives do not need to be fully implemented.

Often, a brief mental comparison is sufficient to reveal important trade-offs.

For example, when designing a new subsystem, a contributor might consider:

Extending an existing system.
Introducing a new independent component.
Simplifying the problem so that no additional subsystem is required.

Each approach may satisfy the immediate requirements, but each will influence the engine differently over time.

The objective is not to discover every possible solution.

The objective is to avoid overlooking a stronger one simply because the first implementation appeared adequate.

Comparing Solutions

When evaluating alternatives, contributors should compare them using qualities that support the long-term health of the engine rather than short-term implementation convenience.

Simplicity

Does one solution introduce fewer permanent concepts?

Can it be understood more quickly by someone unfamiliar with the implementation?

Does it reduce rather than redistribute complexity?

A solution that solves the same problem with fewer responsibilities, fewer abstractions, or fewer assumptions is often the stronger choice.

Clarity

Can the reasoning behind the design be explained easily?

Do the responsibilities remain obvious?

Will future contributors understand why the solution exists?

A design that requires extensive explanation to justify itself may indicate unnecessary complexity or unclear responsibilities.

Clear solutions reduce future maintenance because they communicate their intent naturally.

Architectural Fit

Does the solution align with the existing engineering direction of the engine?

Does it reinforce established responsibilities rather than introducing competing ideas?

Strong engineering decisions integrate naturally with what already exists.

Poorly aligned solutions often require surrounding systems to adapt to them instead of allowing the new work to fit comfortably within the existing design.

Good engineering extends the engine.

It should not distort it.

Maintainability

How easy will the solution be to modify if understanding improves?

Can future contributors extend or simplify it without replacing large portions of the implementation?

Engineering decisions should not optimise only for today's requirements.

They should preserve the ability to adapt as new knowledge emerges.

A maintainable design welcomes future change rather than resisting it.

Long-Term Flexibility

True flexibility is measured by adaptability, not configurability.

A flexible solution allows the engine to evolve without unnecessary disruption.

This does not necessarily mean providing every possible extension point today.

Instead, it means avoiding decisions that unnecessarily restrict future improvements while resisting the temptation to prepare for every hypothetical possibility.

Simple systems often prove remarkably flexible precisely because they remain easy to understand and modify.

Recognising Diminishing Returns

There is a point where searching for additional alternatives no longer improves the decision.

Once several credible approaches have been considered, further exploration may reveal only minor variations of ideas already evaluated.

At this stage, continuing to search for a perfect solution often delays progress without meaningfully improving the outcome.

Engineering is an exercise in making informed decisions with the knowledge available at the time.

Once a solution has been compared thoughtfully against reasonable alternatives and no clearly stronger option emerges, implementation should proceed with confidence.

The goal is not to prove that no better solution could ever exist.

The goal is to ensure that the chosen solution represents a deliberate and well-considered decision.

Building Confidence Through Comparison

Considering alternatives is not about creating doubt.

It is about creating confidence.

A solution that has never been challenged is difficult to trust completely because its strengths have never been compared against realistic alternatives.

By deliberately asking, "What else could we do?", contributors expose hidden trade-offs, clarify their priorities, and strengthen their understanding of the problem itself.

Sometimes this process confirms the original design.

Sometimes it reveals a simpler implementation.

Sometimes it uncovers an entirely different way of thinking about the problem.

All three outcomes are valuable.

The strongest engineering decisions are rarely those that happened to work first.

They are the ones that remained the best choice after other reasonable possibilities had been given fair consideration.

11.5 The Second-Day Test

Some engineering decisions appear obvious while they are being made.

Hours of concentrated effort create familiarity with the implementation, making each new addition seem like a natural consequence of the last. During this process it becomes increasingly difficult to distinguish between complexity that is genuinely necessary and complexity that has simply become familiar.

For significant engineering decisions, there is value in creating a small amount of distance before deciding that the design is complete.

This is the purpose of the Second-Day Test.

The idea is simple.

Where practical, step away from an important engineering decision and return to it later with fresh perspective.

The interval does not need to be exactly one day. It may be an afternoon, overnight, or after working on an unrelated part of the engine. The important point is to allow enough distance that the implementation is no longer occupying every detail of your attention.

Fresh perspective often reveals things that focused implementation hides.

Why Distance Improves Judgement

While solving a problem, an engineer naturally becomes immersed in the chosen approach.

Each decision is made in the context of the previous one, making the overall design feel increasingly inevitable.

This creates a subtle form of confirmation bias.

Because the solution has already been built, the mind begins to justify its existence rather than question whether a simpler approach was possible.

Time weakens that attachment.

Returning later allows the implementation to be viewed more objectively, making it easier to recognise unnecessary complexity, hidden assumptions, or opportunities for simplification.

Many experienced engineers have had the same experience.

A design that seemed elegant yesterday suddenly appears overly complicated today.

Conversely, a decision that initially felt uncertain may become obviously correct after a period of reflection.

Both outcomes strengthen the quality of the final implementation.

Reading the Implementation as a Stranger

One useful exercise is to approach the implementation as though it had been written by someone else.

Instead of remembering why each decision was made, ask whether those decisions are evident from the design itself.

Can the overall structure be understood without mentally replaying the development process?

Do the responsibilities appear obvious?

Does each part of the implementation justify its existence?

If understanding depends upon remembering every intermediate decision made during development, the design may be carrying more complexity than necessary.

Good engineering should communicate its intent through its structure rather than through the author's memory.

Looking for Simplification

The Second-Day Test is not primarily about finding mistakes.

It is about finding opportunities to simplify.

After some distance, contributors should ask questions such as:

Would I still design this system the same way today?
Can any responsibilities be combined or removed?
Are there concepts that exist only because of earlier implementation decisions?
Is every abstraction still justified?
Have I solved more than the problem actually required?

These questions often reveal opportunities to reduce the number of moving parts without reducing capability.

In many cases, the implementation becomes easier to understand simply because unnecessary decisions are removed rather than improved.

Practical Examples

Consider a contributor implementing a new event handling mechanism.

After several hours of development, the solution includes multiple interfaces, configurable routing behaviour, and extension points for future capabilities.

At the time, each addition seemed reasonable.

Returning the following day, the contributor realises that the engine currently has only a handful of event types and that every routing path follows the same behaviour.

Most of the flexibility exists solely to support situations that have not yet occurred.

The implementation is simplified to a straightforward dispatcher with clearly defined responsibilities.

Nothing important has been lost.

Instead, the engine has become easier to understand and easier to evolve.

In another example, a contributor designs a subsystem using several small helper objects because separating responsibilities seemed appropriate during implementation.

After revisiting the design later, it becomes clear that those objects never vary independently and are always created, used, and destroyed together.

Merging them into a single coherent component reduces indirection without sacrificing clarity.

The design becomes smaller while expressing exactly the same behaviour.

These improvements are not the result of discovering errors.

They are the result of allowing time to improve perspective.

Not Every Decision Requires Delay

The Second-Day Test should be applied with judgement.

Small changes, routine maintenance, and straightforward bug fixes rarely benefit from extended reflection.

The practice is most valuable when making decisions that introduce new concepts, establish long-lived responsibilities, or influence the future direction of the engine.

In these situations, spending a little more time thinking often saves considerably more time maintaining the implementation later.

Knowing when a decision deserves additional reflection is itself an engineering skill that develops through experience.

Clarity Improves with Time

The purpose of the Second-Day Test is not to encourage hesitation.

The engine must continue to evolve, and contributors should avoid delaying progress unnecessarily.

Instead, the practice recognises a simple reality of engineering.

Understanding often improves after implementation has paused.

Distance provides perspective.

Perspective reveals simplicity.

And simplicity, more often than not, leads to stronger engineering decisions.

Some of the most valuable improvements to a long-lived codebase are not made by writing additional code.

They are made by returning with fresh eyes and realising that less code, fewer concepts, and clearer responsibilities were sufficient all along.

11.6 Knowing When to Reconsider

Good engineering decisions are not defined by how stubbornly they are defended.

They are defined by how well they continue to serve the engine as understanding grows.

Every implementation begins with the best information available at the time. As development progresses, new requirements emerge, assumptions are validated or disproven, and the behaviour of the system becomes better understood. A decision that was entirely reasonable yesterday may no longer be the strongest choice today.

Recognising this is not a weakness.

It is a normal part of engineering.

One of the most valuable skills an engineer can develop is knowing when a decision deserves to be reconsidered.

Complexity Continues to Increase

A useful warning sign is when an implementation becomes progressively more complicated simply to preserve its original design.

Small additions are expected as software evolves.

However, if every new requirement requires another special case, another conditional path, or another supporting abstraction, the implementation may be resisting change rather than accommodating it.

At some point, the question changes from:

"How can I extend this design?"

to:

"Is this still the right design?"

For example, imagine a subsystem that initially required only two execution paths.

As development continues, a third path is added, followed by a fourth, each requiring additional branching and increasingly specialised behaviour.

Eventually, the implementation becomes dominated by exceptions rather than its primary responsibility.

Rather than continuing to extend the existing structure, it may be more appropriate to reconsider whether the underlying model still reflects the problem accurately.

Exceptions Become the Rule

Exceptional behaviour should remain exceptional.

When a design begins accumulating numerous exceptions, it often indicates that the general solution no longer represents the common case.

For instance, a generic processing pipeline may gradually acquire special handling for specific entity types, unusual states, or unique execution orders.

Individually, each exception appears justified.

Collectively, they may reveal that the abstraction itself no longer matches the reality of the system.

A design should not require constant explanation for why its rules do not apply.

When exceptions become more common than the behaviour they modify, reconsideration is usually warranted.

The Solution Becomes Difficult to Explain

One of the simplest indicators of engineering quality is whether the reasoning behind a solution can be explained clearly.

If describing an implementation requires lengthy justifications, numerous historical details, or repeated qualifications, there is a good chance that the design has become more complicated than necessary.

This does not mean every system should be trivial.

Some engineering problems are genuinely complex.

However, even complex systems should have a clear central idea.

If contributors struggle to explain that idea concisely, they should ask whether the implementation has drifted away from its original purpose.

Clear explanations often reflect clear thinking.

Confusing explanations frequently reveal confusing design.

Temporary Fixes Become Permanent

Every project occasionally requires a temporary solution.

A practical workaround can be entirely appropriate when time is limited or understanding is still developing.

The danger arises when temporary decisions quietly become permanent architecture.

An implementation that was originally intended as a short-term measure may remain unchanged simply because other work takes priority.

Over time, additional systems begin to depend upon it.

Eventually, replacing the temporary solution becomes far more difficult than addressing it when it was first introduced.

Contributors should periodically identify implementations that still carry the label of temporary—whether explicitly or implicitly—and ask whether they remain justified.

If a workaround has become an established part of the engine, it deserves the same level of engineering consideration as every other permanent system.

Confidence Continues to Decrease

Engineering uncertainty usually decreases as implementation progresses.

As the design matures, contributors should gain confidence that the chosen approach is appropriate.

When the opposite occurs, it deserves attention.

If each new change increases uncertainty rather than reducing it, the implementation may be signalling that its underlying assumptions were incomplete or incorrect.

An engineer might notice recurring thoughts such as:

"I'm not entirely sure this still makes sense."

"Every new feature seems harder than expected."

"I hope nothing else depends on this behaviour."

These are not signs of failure.

They are valuable observations.

Ignoring them often allows uncertainty to become permanent complexity.

Listening to them provides an opportunity to improve the design while change remains manageable.

Reconsidering Is Responsible Engineering

There is sometimes a misconception that revisiting a previous decision represents wasted effort.

In reality, refusing to reconsider a weakening design often creates far more work than changing direction at the appropriate time.

Responsible engineers are willing to acknowledge when new understanding has changed the problem.

They recognise that preserving a flawed approach simply because effort has already been invested is rarely beneficial to the long-term health of the engine.

Engineering decisions should earn their continued existence.

Past effort alone is not sufficient justification for preserving them.

Improve the Decision, Not Your Pride

Every engineer makes decisions that later prove imperfect.

This is inevitable in any long-lived project.

The objective is not to predict every future requirement or to produce flawless designs on the first attempt.

The objective is to respond thoughtfully as understanding improves.

When evidence suggests that a decision should be revisited, contributors should view that opportunity positively.

A design that is refined before it becomes deeply embedded strengthens the engine.

A decision that is questioned before it becomes architectural debt is far easier to improve than one that remains unchallenged for years.

The willingness to reconsider is therefore not evidence of uncertainty.

It is evidence of engineering maturity.

The healthiest long-lived software is built by engineers who understand that changing a decision in light of better understanding is not admitting defeat.

It is fulfilling their responsibility as stewards of the engine.

11.7 Closing Thoughts

Engineering is often viewed as the discipline of building software.

In reality, it is the discipline of making decisions.

Every system, every interface, every abstraction, and every line of implementation exists because someone decided that it was the appropriate way to solve a problem. The quality of the engine therefore depends not only upon technical ability, but upon the quality of the judgement exercised throughout its development.

The Locomotion Engine is intended to remain useful for many years.

Achieving that goal requires more than correct implementations. It requires engineers who are willing to think carefully before introducing permanent concepts, who recognise assumptions before they become constraints, and who understand that every decision influences the future evolution of the engine.

Thoughtful engineering is rarely the result of inspiration.

It is the result of disciplined habits.

Questioning assumptions.

Comparing alternatives.

Seeking evidence.

Revisiting important decisions.

Simplifying wherever possible.

These habits rarely produce dramatic moments, but they consistently produce stronger software over time.

Contributors should resist the temptation to measure progress solely by the amount of code they write.

Some of the most valuable engineering work leaves the implementation smaller than it was before.

Removing an unnecessary abstraction.

Discarding an incorrect assumption.

Replacing a complicated design with a simpler one.

Choosing not to introduce a new concept because the existing architecture already provides the right solution.

These decisions may leave little visible evidence, yet they often improve the engine more than adding another feature ever could.

Engineering should also remain humble.

No contributor, regardless of experience, consistently makes perfect decisions.

Understanding evolves through implementation, and even well-reasoned designs occasionally prove incomplete when confronted with real-world use.

The strength of an engineer is therefore not measured by never being wrong.

It is measured by recognising when better understanding has emerged and responding to it thoughtfully.

The healthiest long-lived software is built by engineers who remain curious about their own work.

They continue asking whether a solution is still appropriate.

They continue looking for opportunities to simplify.

They remain willing to replace confidence with evidence and familiarity with deliberate reasoning.

They understand that today's implementation is only one step in the lifetime of the engine, not its final destination.

Before asking others to review an implementation, contributors should first review their own thinking.

Ask whether the problem has been understood correctly.

Ask whether the chosen solution remains the simplest one that satisfies the need.

Ask whether assumptions have been tested rather than accepted.

Ask whether another approach would leave the engine clearer, smaller, or easier to evolve.

These questions are not obstacles to progress.

They are investments in the future of the project.

Ultimately, the long-term quality of the Locomotion Engine will not be determined solely by the sophistication of its systems or the elegance of its implementations.

It will be determined by the judgement of the engineers who build it.

The strongest software is rarely created by engineers who never question themselves.

It is created by engineers who are willing to question their own ideas before asking anyone else to review them.

Part XII — Collaborative Engineering Review

# Part XII — Collaborative Engineering Review

## Purpose

Engineering is rarely a solitary activity, even when only one person is writing code.

Every implementation is influenced by previous decisions, future maintenance, architectural constraints, and the expectations of those who will eventually work with the code. Collaborative engineering review exists to bring additional perspectives into that process before those decisions become permanent.

No engineer, regardless of experience, sees every consequence of a change.

One contributor may recognise an architectural inconsistency. Another may identify an unnecessary abstraction. Someone else may notice an assumption that only becomes visible from a different area of the engine. Individually these observations may seem small. Collectively they improve the quality, consistency, and longevity of the software.

Review is therefore not an approval ceremony.

Its purpose is to improve engineering decisions.

The best reviews strengthen an implementation regardless of who originally wrote it.

Collaborative review also spreads knowledge throughout the project.

Every discussion exposes contributors to systems they may not have written themselves. Architectural intent, implementation patterns, and design rationale become shared understanding rather than private knowledge held by a single individual.

Over time this creates a healthier engine.

It also creates stronger engineers.

Most importantly, collaborative review protects the long-term health of the engine.

Individual implementations eventually change.

Contributors come and go.

The architecture endures.

Review exists to help ensure that every meaningful change leaves the engine in a better state than it was before.

---

# Recognising Review Triggers

Not every change carries the same level of architectural risk.

Small, isolated improvements can often be understood within the scope of a single implementation. Other changes reach far beyond the files being modified and deserve broader discussion before they become established.

Additional review is particularly valuable when work affects areas such as:

* Large refactors.
* Architectural changes.
* Performance-sensitive systems.
* New engine subsystems.
* Complex algorithms.
* Public APIs.
* Persistence.
* Simulation.
* Procedural generation.
* Engine infrastructure.

These changes influence far more than their immediate implementation.

A new public API, for example, may become a dependency for dozens of future systems.

A modification to the simulation model may subtly affect determinism throughout the engine.

A procedural generation algorithm may influence debugging, reproducibility, balancing, and future extensibility in ways that are not immediately obvious.

The significance of a change should therefore be measured by its consequences rather than its size.

A small modification to an architectural foundation may deserve more discussion than hundreds of lines of isolated implementation.

Good engineers learn to ask a simple question before completing significant work:

**What else does this decision affect?**

If the answer extends beyond the immediate implementation, additional review is usually worthwhile.

The broader the impact, the broader the conversation should become.

Collaborative review is not a sign that a contributor lacks confidence.

It is recognition that important engineering decisions benefit from multiple perspectives.

---

# Receiving Feedback

Receiving engineering feedback requires a particular kind of humility.

Every contributor invests thought, effort, and care into their work. It is natural to feel attached to an implementation that required time to understand and construct.

Good engineering, however, requires separating personal investment from technical decisions.

A review is not an evaluation of the person who wrote the code.

It is an examination of the ideas represented by that code.

Those ideas are expected to evolve.

When feedback is received, the first objective should be understanding rather than defence.

Instead of immediately explaining why a decision was made, first understand why someone believes it should be reconsidered.

Questions such as these often lead to productive discussion:

* What problem are you concerned about?
* Which architectural principle does this affect?
* Can you explain the trade-off you're seeing?
* Is there an alternative that avoids both issues?

Curiosity produces better engineering than defensiveness.

Sometimes the original implementation will prove correct.

Sometimes the reviewer will identify a genuine weakness.

Sometimes both perspectives reveal a better solution than either contributor initially proposed.

Changing your mind after hearing stronger reasoning is not a failure.

It is evidence that engineering judgement has improved.

The objective is not to defend previous decisions.

The objective is to make the engine better.

Engineers who consistently improve their own thinking become far more valuable than engineers who simply protect their own ideas.

---

# Giving Feedback

Thoughtful review requires the same professionalism expected of thoughtful implementation.

Feedback should always address the engineering rather than the engineer.

Comments such as:

> This design introduces unnecessary coupling.

are constructive.

Comments such as:

> You designed this badly.

are not.

The distinction is important.

One discusses the implementation.

The other judges the individual.

Effective feedback explains reasoning.

Simply identifying a problem rarely helps another engineer understand why the problem matters.

Consider the difference between these observations:

> This should be changed.

and

> This creates a second source of truth. If these structures diverge, future maintenance becomes more difficult. Could this information be owned in a single location instead?

The second comment teaches.

It provides context.

It allows the recipient to evaluate the reasoning rather than simply accepting an opinion.

Whenever practical, suggestions should be framed as improvements instead of corrections.

For example:

> Would this be simpler if the World owned these objects directly?

is often more productive than:

> This ownership model is wrong.

Likewise:

> I think this abstraction may become difficult to extend because...

encourages discussion.

Statements presented as unquestionable fact often discourage it.

Constructive review also recognises successful decisions.

Engineering is strengthened not only by identifying weaknesses, but by reinforcing patterns worth repeating.

Comments such as:

> This separation makes the responsibility much clearer.

or

> The implementation matches the architectural intent well.

help establish shared understanding of quality just as effectively as critical feedback.

Balanced review encourages continual improvement without turning every discussion into a search for faults.

The strongest reviewers explain their reasoning clearly enough that contributors can apply the lesson long after the specific review has been forgotten.

---

# Building Shared Understanding

Collaborative review gradually shapes the engineering culture of a project.

Every discussion reinforces what quality looks like.

Every explanation clarifies architectural expectations.

Every thoughtful conversation strengthens the collective understanding of the engine.

Over time, contributors begin recognising the same patterns, asking similar questions, and making increasingly consistent engineering decisions.

This consistency is not produced through rigid enforcement.

It emerges through repeated exposure to good reasoning.

Review also transfers architectural knowledge.

A contributor reviewing procedural generation today may later work on persistence.

Someone reviewing engine infrastructure may eventually contribute to simulation.

Because review exposes engineers to systems outside their immediate responsibilities, knowledge spreads naturally throughout the project.

This reduces dependence on individual experts.

It also makes future collaboration significantly easier because contributors develop a common architectural vocabulary and shared expectations.

The result is an engine that reflects consistent engineering judgement rather than isolated individual preferences.

Every thoughtful review strengthens two things simultaneously:

The implementation being reviewed.

The engineers participating in the review.

Both outcomes are equally valuable.

---

# Closing Thoughts

Collaborative engineering review exists to improve software, strengthen engineering judgement, and preserve the architectural quality of the Locomotion Engine.

It is one of the primary mechanisms by which good engineering becomes repeatable.

Every review represents an opportunity to discover a better idea, clarify an architectural principle, or deepen collective understanding of the engine.

Approach each review with the expectation that there is something worth learning.

Sometimes that lesson will improve the implementation.

Sometimes it will improve your own thinking.

Often it will do both.

The strongest engineering teams are not those that avoid mistakes.

They are the teams that make it safe to discuss them, normal to question assumptions, and routine to share knowledge openly.

When contributors challenge ideas with respect, explain their reasoning clearly, remain willing to change their minds, and work toward better solutions together, review becomes far more than a quality check.

It becomes one of the engine's most valuable tools for ensuring that both the software and the engineers responsible for it continue to improve for years to come.

Part XIII — Engineering Acceptance

Part XIII — Engineering Acceptance
13.1 Purpose

Engineering acceptance is the point at which work ceases to belong solely to the person who implemented it and becomes part of the Locomotion Engine itself.

Every accepted change becomes part of the engine's permanent history. It influences future features, future refactoring, future contributors, and future architectural decisions. A change that appears small today may become a foundation upon which hundreds of later decisions are built. Acceptance exists to ensure that those foundations are worthy of carrying that weight.

For this reason, engineering acceptance is not concerned with whether code merely works. Correct behaviour is essential, but it is only one measure of engineering quality. Code that functions today while introducing unnecessary complexity, obscuring architectural intent, or increasing the burden of future maintenance has not fully satisfied its responsibility to the engine.

Acceptance therefore represents the final engineering review before a change becomes part of the engine's enduring implementation. It asks a simple but important question:

Is this work something we want to build upon for years to come?

This perspective changes how engineering decisions are evaluated. Instead of asking whether a solution is good enough to merge, acceptance asks whether it improves the engine as a whole. The objective is not to reward clever implementations or rapid feature delivery, but to preserve the long-term quality of a codebase intended to evolve over decades.

Engineering acceptance should never become an exercise in bureaucracy. It is not intended to create unnecessary checkpoints, lengthy approval processes, or artificial barriers to progress. The purpose of acceptance is to encourage thoughtful reflection before permanent decisions are made.

A brief, deliberate review often prevents problems that would otherwise require extensive effort to correct later. An engineer who spends a few additional minutes questioning an assumption, simplifying an implementation, or improving the clarity of an interface may save many hours for future contributors. Acceptance recognises that the cost of thoughtful review is almost always less than the cost of accumulated technical debt.

Quality is rarely achieved through a single exceptional decision.

Instead, it emerges from hundreds of small, deliberate choices made throughout the implementation process.

Choosing a clearer abstraction.

Removing unnecessary code.

Improving a misleading name.

Clarifying documentation.

Eliminating an assumption.

Simplifying a design.

Each decision may appear insignificant in isolation, yet together they determine whether a codebase remains approachable after years of continued evolution.

This cumulative view of quality reflects the broader philosophy of the Locomotion Engine. The engine is expected to grow steadily through careful refinement rather than dramatic reinvention. Engineering acceptance exists to reinforce that philosophy by ensuring each completed contribution leaves the engine in a stronger position than before.

Acceptance should therefore be viewed as an act of stewardship rather than inspection.

The engineer performing the review is not acting as a gatekeeper whose purpose is to reject work. Instead, they are acting as a temporary guardian of the engine's future. Their responsibility is to ensure that today's implementation supports tomorrow's development without introducing unnecessary complexity, confusion, or architectural drift.

Over time, this mindset becomes less about following a documented process and more about developing professional instinct. Experienced engineers begin asking acceptance questions continuously while designing, implementing, and refining their work. By the time a change reaches formal acceptance, most of the important decisions have already been considered because thoughtful engineering has become habitual rather than procedural.

Ultimately, engineering acceptance exists because software has a long memory.

Every accepted implementation influences what becomes easy, what becomes difficult, and what becomes possible in the future. Treating acceptance as a deliberate confirmation of engineering quality helps ensure that each contribution strengthens the engine instead of quietly compromising it.

The objective is not to slow development.

The objective is to ensure that every accepted change deserves to become part of the Locomotion Engine's future.

13.2 The Final Engineering Checklist

Every engineering discipline develops habits that help maintain quality over time.

Pilots use pre-flight checklists before every departure, regardless of experience. Surgeons follow established procedures before every operation, regardless of how many similar procedures they have previously performed. These practices are not signs of inexperience. They exist because even capable professionals can overlook something when working within complex systems.

Software engineering is no different.

The purpose of an engineering checklist is not to replace judgement. It is to support judgement by encouraging deliberate reflection before work becomes part of the engine.

A checklist should never become a mechanical exercise in ticking boxes. Simply answering every question with "yes" does not guarantee that a solution is good, nor does answering "no" automatically imply that work is unacceptable. The questions exist to encourage engineers to pause, reconsider their assumptions, and view their implementation from the perspective of someone who will inherit it in the future.

With experience, these questions become increasingly natural. Many will be answered continuously throughout development rather than only at the end of an implementation. That is a sign that the checklist has become part of an engineer's way of thinking rather than an external process.

The following questions represent the standard expected before work is accepted into the Locomotion Engine.

Does the code solve the intended problem?

Engineering begins with solving the correct problem.

A technically impressive implementation that addresses the wrong requirement still represents an unsuccessful outcome. Before considering quality, ensure the implementation achieves its intended objective completely and correctly.

Is the solution as simple as practical?

Complexity should only exist where it provides genuine value.

Ask whether the same outcome could be achieved with fewer concepts, fewer assumptions, or less code. Simplicity is not measured by how little code exists, but by how easily the solution can be understood and maintained.

Does this belong in the engine?

Not every useful piece of code belongs within the engine itself.

Consider whether the implementation provides a reusable engine capability or merely supports a specific application. The engine should grow through general improvements rather than the accumulation of special cases.

Is it consistent with the architecture?

Every accepted implementation should reinforce the architectural principles established elsewhere in the project rather than quietly introducing competing ideas.

When implementation and architecture appear to disagree, the correct response is to resolve the disagreement—not ignore it.

Is it readable?

Future engineers should understand the implementation without requiring historical context or verbal explanation.

Readability is achieved through clear structure, logical flow, and straightforward reasoning. Code that requires careful interpretation every time it is read imposes an ongoing maintenance cost.

Is it maintainable?

Consider how easily the implementation can evolve.

Will future modifications require extensive changes?

Are responsibilities clearly separated?

Will future contributors be able to extend the implementation without first rewriting it?

Maintainability is measured over years rather than days.

Is it well named?

Names communicate intent long after implementation details have faded from memory.

Every identifier should accurately describe its responsibility. Clear names reduce the need for explanation and allow engineers to understand the structure of a system at a glance.

Are comments still accurate?

Comments should explain information that cannot be communicated clearly through the implementation itself.

Outdated comments are often more harmful than no comments at all. During acceptance, verify that every retained comment remains truthful, relevant, and helpful.

If a comment no longer reflects reality, update it or remove it.

Is the documentation consistent with the implementation?

Documentation and implementation should describe the same system.

Whenever implementation changes invalidate documentation, both should be updated together. Engineers should never be forced to determine which source is correct.

Consistency preserves trust.

Can anything be removed?

Good engineering is often an exercise in thoughtful reduction.

Look for unnecessary abstractions, redundant variables, duplicated logic, defensive complexity that is no longer required, or features introduced "just in case."

Removing unnecessary code frequently improves the engine more than adding new code.

Does the engine still behave correctly?

A successful implementation should improve the engine without compromising existing behaviour.

Acceptance should include consideration of the engine as a complete system rather than focusing solely on the newly introduced changes.

Every improvement should strengthen the whole.

Have unnecessary assumptions been eliminated?

Assumptions become future constraints.

Question whether decisions rely upon conditions that may later change unnecessarily. Where assumptions cannot be avoided, they should be explicit, deliberate, and justified rather than accidental.

Reducing assumptions increases flexibility and resilience.

Would I be comfortable maintaining this several years from now?

Time changes the perspective of every engineer.

Imagine returning to this implementation after several years without having thought about it in the meantime.

Would its design still make sense?

Would its intent still be obvious?

Would you feel confident modifying it without first unravelling unnecessary complexity?

If the answer is no, further refinement may be worthwhile.

Would another contributor understand this without explanation?

The engine should never depend upon institutional memory.

A contributor unfamiliar with the implementation should be able to understand its purpose and structure through the code, documentation, and established engineering practices.

If knowledge exists only in the mind of its original author, the implementation is incomplete.

Does this improve the engine rather than merely change it?

Not every change represents progress.

Some modifications simply move complexity from one location to another.

Others add features while weakening clarity.

The final question asks whether the engine is genuinely better because of the work that has been completed.

If the answer is uncertain, additional reflection is warranted.

From Checklist to Habit

The value of this checklist is not found in formal review meetings or approval documents.

Its greatest value lies in shaping the way engineers think.

Experienced contributors gradually stop consulting the checklist because its questions become instinctive. They begin asking them while designing solutions, while writing code, while reviewing changes, and while refining implementations. The checklist evolves from a written reference into professional judgement.

That transformation represents the true objective.

Engineering acceptance is not a gate that must be passed at the end of development.

It is a mindset that accompanies every engineering decision.

When these questions become habitual, quality ceases to be something verified after the work is complete. It becomes something built into the work from the very beginning.

13.3 Knowing When Work Is Ready

One of the most difficult skills in software engineering is recognising when work is ready to be accepted.

Beginning an implementation is rarely the challenge. Most engineers can identify opportunities for improvement long after a feature is functional. The greater challenge lies in knowing when further refinement continues to add meaningful value and when it merely delays progress.

There is no universal formula for answering this question.

Engineering judgement develops through experience, reflection, and repeated exposure to the consequences of both premature completion and unnecessary perfectionism. Over time, engineers learn that quality is not measured by how long something has been refined, but by whether additional effort continues to improve the engine in meaningful ways.

Acceptance therefore requires balance.

The objective is neither to finish as quickly as possible nor to continue refining indefinitely. Instead, it is to reach the point where the implementation represents a thoughtful, maintainable, and appropriate solution to the problem it was intended to solve.

Software Is Rarely Perfect

Every implementation represents a snapshot of current understanding.

As the engine evolves, new requirements will emerge, better ideas will be discovered, and earlier assumptions may no longer hold. This is a normal consequence of building software over many years.

For this reason, waiting for perfection before accepting work is neither practical nor desirable.

An implementation can be correct, well designed, and thoroughly considered while still leaving room for future improvement. Accepting this reality allows the engine to continue evolving without becoming trapped by unrealistic expectations.

The purpose of engineering acceptance is not to certify perfection.

It is to confirm that the work is sufficiently sound to become a reliable foundation for whatever comes next.

Distinguishing Meaningful Improvement from Cosmetic Change

As work approaches completion, the nature of improvements begins to change.

Early refinements often simplify the design, clarify responsibilities, eliminate defects, or improve maintainability. These changes strengthen the implementation in lasting ways.

Later refinements are frequently smaller.

A variable might be renamed several times despite already being clear.

A function may be reorganised without improving its readability.

Logic may be rewritten in a different style while producing identical behaviour.

None of these changes are inherently wrong, but they should be evaluated honestly.

Ask whether the modification genuinely improves the engine or merely reflects personal preference.

For example, simplifying an interface so future contributors can understand it more quickly is a meaningful improvement.

Rearranging already understandable code because it "feels nicer" may not justify delaying acceptance.

Engineering maturity involves recognising this distinction.

Time spent polishing details that no longer improve the engine is time that cannot be invested in solving new problems.

Avoiding Endless Refinement

Every engineer has experienced the temptation to make "just one more improvement."

Sometimes that final improvement uncovers another possible refinement, which reveals another opportunity, until completion gradually moves further away.

This cycle is rarely intentional.

It often begins with genuine care for quality.

Without discipline, however, the pursuit of improvement can become an obstacle to progress.

An implementation that is never accepted provides no value to the engine, regardless of how elegant it might eventually become.

Good engineering requires the discipline to recognise diminishing returns.

When further effort produces only marginal improvements while delaying meaningful progress, it is often time to accept the work and continue building the engine.

Future improvements remain possible.

Acceptance is not a declaration that the implementation can never change.

It is simply an acknowledgement that the current solution satisfies the standard expected of the engine today.

Confidence, Not Certainty

Engineering acceptance should be based on confidence rather than certainty.

Absolute certainty is rarely achievable in complex software systems.

There will always be unknowns.

There will always be future scenarios that were impossible to predict.

Rather than attempting to eliminate every uncertainty, engineers should seek reasonable confidence that the implementation is correct, understandable, maintainable, and consistent with the broader architecture.

Confidence is earned through thoughtful design, careful review, deliberate testing, and honest evaluation of the solution's strengths and limitations.

When that confidence exists, acceptance becomes an informed engineering decision rather than a hopeful guess.

Progress Is Part of Quality

The Locomotion Engine is intended to grow through steady, deliberate evolution.

That evolution depends upon completed work.

An engine that continually accumulates unfinished improvements eventually becomes difficult to reason about because priorities shift, assumptions change, and partially completed ideas begin to overlap.

Thoughtful acceptance creates stable foundations upon which future work can confidently build.

Each completed contribution becomes another dependable part of the engine's structure, allowing development to move forward without repeatedly revisiting decisions that have already been carefully considered.

Progress, therefore, is not separate from quality.

Progress built upon sound engineering is one of the ways quality is achieved.

Knowing When to Stop

Before accepting an implementation, it is worth asking a final set of questions:

Have the important engineering concerns been addressed?
Does the implementation remain clear and maintainable?
Does further work provide meaningful long-term benefit?
Am I improving the engine, or am I simply postponing completion?

If those questions can be answered with confidence, the implementation has likely reached an appropriate level of maturity.

Knowing when to stop refining is not a compromise in engineering standards.

It is an expression of engineering judgement.

The goal is not to produce work that cannot be improved.

The goal is to produce work that is worthy of becoming part of the Locomotion Engine while leaving room for the engine—as well as the engineers who build it—to continue learning, improving, and evolving.

13.4 Accepting Imperfection

Every engineering decision involves compromise.

This is not a sign of weakness in the engineering process, nor is it evidence that better solutions do not exist. It is simply the reality of building software. Every implementation must balance competing concerns such as simplicity, flexibility, maintainability, clarity, performance, effort, and future adaptability. Improving one characteristic often requires accepting trade-offs in another.

Engineering acceptance recognises this reality.

Its purpose is not to identify flawless implementations, because flawless implementations do not exist. Instead, it seeks confidence that the compromises made were thoughtful, deliberate, and appropriate for the problem being solved.

An implementation should not be judged by whether every trade-off has disappeared, but by whether the remaining trade-offs are understood and justified.

There Is Always Another Improvement

It is almost always possible to imagine a better implementation.

A design could be more flexible.

An interface could be more elegant.

An abstraction could support additional future scenarios.

A subsystem could be generalised further.

None of these observations are necessarily incorrect.

The question is whether addressing them would produce meaningful value today or merely postpone progress in pursuit of an increasingly theoretical ideal.

Experienced engineers understand that improvement has diminishing returns.

Early refinements often remove genuine weaknesses.

Later refinements frequently pursue possibilities that may never become relevant.

The objective is not to eliminate every conceivable future limitation before accepting work. It is to produce an implementation that serves the engine well while remaining capable of evolving when genuine needs arise.

A solution should be accepted because it is sound—not because every imaginable improvement has been exhausted.

Practical Solutions Outlast Perfect Plans

Software has a remarkable ability to teach its engineers.

Ideas that appear convincing in theory often change when confronted by real implementation. Conversely, simple solutions sometimes prove far more resilient than originally expected.

For this reason, a well-reasoned implementation that exists is often more valuable than a theoretically perfect design that remains unfinished.

Practical experience provides evidence.

Speculation provides possibilities.

The Locomotion Engine values evidence.

An implementation built upon clear reasoning, careful review, and thoughtful acceptance creates a stable foundation that can be refined through future experience. An implementation delayed indefinitely while searching for perfection provides no such foundation.

Shipping thoughtful work allows the engine to learn.

Waiting forever prevents that learning from ever occurring.

Imperfection Is Not an Excuse

Accepting imperfection must never become permission to lower standards.

There is an important distinction between acknowledging unavoidable compromise and accepting avoidable shortcomings.

Choosing a simpler solution because it satisfies the requirements while remaining clear and maintainable is good engineering.

Ignoring known defects because they are inconvenient is not.

Accepting a measured limitation after careful consideration is responsible.

Leaving unnecessary complexity because reviewing it would require additional effort is not.

Engineering judgement requires honesty.

Engineers should be able to explain why a compromise exists, what alternatives were considered, and why the chosen approach represents the best practical decision under the circumstances.

When compromises are made consciously, they remain engineering decisions.

When they occur accidentally, they become technical debt.

Thoughtful Decisions Build Strong Foundations

Every accepted implementation reflects the understanding available at the time it was created.

Future engineers may discover better approaches.

New requirements may justify different abstractions.

Experience may reveal assumptions that deserve reconsideration.

This should not diminish the value of earlier work.

Good engineering decisions are judged according to the information that was reasonably available when they were made, not according to knowledge acquired years later.

The responsibility of today's engineer is therefore not to predict every future possibility.

It is to make the most thoughtful decision possible using current understanding while preserving the engine's ability to evolve.

An implementation that remains understandable, maintainable, and adaptable has succeeded even if it is eventually improved.

Evolution is expected.

Negligence is not.

Choosing Progress Without Complacency

There is a healthy tension between striving for better software and recognising when work is ready.

Losing either side of that balance is harmful.

An engineer who accepts work too quickly risks leaving avoidable problems for future contributors.

An engineer who refuses to accept anything less than perfection risks preventing the engine from moving forward.

Professional engineering requires resisting both extremes.

Strive for excellence.

Question assumptions.

Refine where refinement genuinely improves the engine.

But recognise the point at which continued effort produces increasingly smaller gains while delaying meaningful progress.

That moment is not a failure of ambition.

It is the point at which thoughtful engineering gives way to thoughtful stewardship.

Confidence in the Decision

Ultimately, accepting imperfection is an act of confidence.

Not confidence that the implementation can never be improved, but confidence that it represents the best practical solution supported by sound engineering judgement.

The Locomotion Engine is expected to evolve over many years.

No individual contribution will be the final word on any system.

Each accepted implementation is simply the next carefully considered step in that journey.

The responsibility of the engineer is not to deliver perfection.

It is to deliver work that deserves to become part of the foundation upon which future improvements can confidently be built.

13.5 Protecting the Future

Software is built in the present but lived in the future.

Every decision made today becomes part of the environment in which future engineers will design, implement, debug, and extend the engine. Whether those future engineers are new contributors, experienced maintainers, or even the original author returning years later, they will inherit the consequences of today's work.

Engineering acceptance exists, in part, to recognise this responsibility.

Before an implementation becomes part of the Locomotion Engine, it should be evaluated not only for what it achieves today, but also for the foundation it creates for tomorrow.

The question is no longer simply, "Does this solve the problem?"

It becomes, "What kind of future does this solution create?"

Today's Code Becomes Tomorrow's Foundation

Every accepted contribution becomes something that other work will eventually depend upon.

A clear interface encourages confident extension.

A simple abstraction enables future reuse.

A well-considered implementation reduces the effort required to add new capabilities.

Conversely, unnecessary complexity rarely remains isolated.

When confusing designs are accepted, future contributors often adapt their own work to fit those designs. Complexity begins to spread, assumptions become embedded throughout the engine, and improvements become increasingly expensive because so many other systems now depend upon earlier decisions.

Technical debt rarely appears all at once.

More often, it accumulates quietly through a long sequence of individually reasonable decisions that were never examined from a long-term perspective.

Engineering acceptance provides an opportunity to interrupt that process before it begins.

Building for Engineers You Will Never Meet

Most long-lived software outlasts the people who first created it.

New contributors join.

Others move on.

Knowledge fades.

The engine continues.

Good engineering recognises this from the beginning.

Every implementation should be understandable without relying on conversations, personal memory, or historical context that may no longer exist. The work itself should communicate its purpose through clear structure, thoughtful design, and consistent engineering practices.

Imagine a contributor opening the engine for the first time several years from now.

They know nothing about why a particular decision was made.

They were not present during the discussion.

They cannot ask the original author for clarification.

Everything they understand must come from the engine itself.

Acceptance should encourage engineers to build with that future contributor in mind.

If an implementation requires its original author to explain how it works, it has not yet fully become part of the engine.

Preventing Technical Debt Before It Exists

Technical debt is often described as something that accumulates after software has been written.

In reality, it usually begins the moment unnecessary complexity is accepted.

A duplicated responsibility.

An unexplained assumption.

An avoidable exception.

A temporary solution that quietly becomes permanent.

None of these decisions appear catastrophic on their own.

Their impact emerges gradually as they interact with future changes.

The most effective way to manage technical debt is therefore not to schedule periodic clean-up efforts.

It is to prevent avoidable debt from entering the engine in the first place.

Engineering acceptance should ask whether today's convenience creates tomorrow's burden.

If a problem can be solved now with a modest amount of additional thought, it is often far less expensive than asking future contributors to untangle it after other systems have grown around it.

Leave the Engine Better Than You Found It

Every contribution represents an opportunity to improve the engine beyond the immediate task at hand.

Sometimes that improvement is significant.

More often, it is modest.

Removing an unnecessary abstraction.

Clarifying a confusing interface.

Improving an explanation.

Eliminating obsolete logic.

Correcting an inaccurate comment.

Simplifying a decision that had gradually become more complicated than necessary.

These improvements may seem small, yet over the lifetime of a project they accumulate into something substantial.

An engine that becomes slightly clearer with every accepted contribution remains healthy even as it grows.

An engine that accepts "good enough" without occasional refinement gradually becomes more difficult to understand and evolve.

This principle should always be applied with judgement.

Acceptance is not an invitation to perform unrelated refactoring or continually expand the scope of a change. Improvements should remain appropriate to the work being undertaken.

The objective is not to leave the engine different.

It is to leave it better.

Stewardship Over Ownership

Engineers often speak of their code.

While this may describe who implemented a particular feature, it should never describe who owns it.

Once work has been accepted into the Locomotion Engine, it becomes part of a shared engineering foundation.

Future contributors should feel comfortable improving it.

Current contributors should welcome thoughtful refinement.

Acceptance marks the transition from personal implementation to collective responsibility.

This perspective encourages decisions that prioritise the health of the engine rather than attachment to individual solutions.

The measure of successful engineering is not how long an implementation remains unchanged.

It is how well it continues to serve the engine as the project evolves.

Engineering for the Long Term

The Locomotion Engine is intended to endure.

Its architecture, documentation, and engineering practices have all been designed with long-term evolution in mind.

Protecting that future requires more than writing functional code.

It requires accepting only those changes that strengthen the engine's ability to continue evolving.

Every accepted contribution becomes another layer upon which future work will depend.

Every thoughtful review protects engineers who have not yet joined the project.

Every deliberate decision makes the next decision a little easier.

This is the enduring purpose of engineering acceptance.

Not simply to approve today's work.

But to ensure that tomorrow begins with an engine that is stronger, clearer, and more capable than the one that existed yesterday.

13.6 The Standard of Acceptance

Every engineering project, whether explicitly stated or not, operates according to a standard of acceptance.

That standard determines what becomes part of the software and what does not. It shapes the character of the codebase, influences the habits of its contributors, and ultimately defines the quality of the software itself.

The Locomotion Engine adopts a deliberate standard.

Work is accepted not because it is complete, nor because it satisfies the minimum requirements of a feature request, but because it improves the engine in a way that is consistent with its long-term purpose.

Acceptance is therefore a declaration of confidence.

It states that the implementation represents sound engineering judgement and is worthy of becoming part of the engine's enduring foundation.

Improve the Engine

Every accepted contribution should leave the engine in a better state than before.

Sometimes that improvement is obvious.

A new capability expands what the engine can do.

A defect is corrected.

A limitation is removed.

At other times the improvement is quieter but equally valuable.

An implementation becomes easier to understand.

An unnecessary dependency is removed.

A confusing interface is simplified.

A concept becomes clearer.

The measure of acceptance is not the size of the change but its contribution to the long-term quality of the engine.

A change that merely replaces one implementation with another of equal quality may still be worthwhile, but acceptance should always ask whether the engine has genuinely benefited from the work.

Respect the Architecture

The architecture provides the enduring direction of the engine.

Engineering exists to realise that architecture, not to redefine it through individual implementations.

Accepted work should reinforce the architectural principles that govern the project. It should fit naturally within the existing conceptual model and contribute to a coherent whole rather than introducing isolated patterns or competing ideas.

If an implementation appears to require architectural compromise, that should prompt architectural discussion rather than quiet deviation.

The engine remains strongest when implementation and architecture evolve together.

Be Understandable

An accepted implementation should communicate its purpose clearly.

Future contributors should be able to understand what the implementation does and why it exists without depending upon conversations, historical context, or personal familiarity with the original author.

Understanding is achieved through thoughtful structure, clear intent, and consistency with the engineering practices established throughout the project.

Code that repeatedly requires explanation has not yet reached the standard expected of the engine.

The best implementations often appear straightforward—not because they were easy to create, but because unnecessary complexity has already been removed.

Be Maintainable

The value of software is measured over its lifetime rather than at the moment it is written.

Accepted work should therefore support future change rather than resist it.

Maintaining the engine should not require deciphering obscure decisions or carefully avoiding fragile assumptions. Instead, future engineers should feel confident extending and improving the implementation because its responsibilities are clear and its behaviour is predictable.

Maintainability is not achieved by anticipating every future requirement.

It is achieved by creating implementations that can adapt when new requirements eventually appear.

Be Thoughtfully Reviewed

Engineering acceptance is founded upon deliberate review.

Every accepted implementation should reflect evidence that important decisions have been questioned rather than assumed.

Review should challenge complexity.

It should examine assumptions.

It should look for opportunities to simplify.

It should confirm that the implementation strengthens the engine rather than merely satisfying an immediate objective.

A thoughtful review is not adversarial.

Its purpose is to improve the work before it becomes permanent.

The strongest engineering teams view review as collaboration in service of the engine rather than evaluation of the individual engineer.

Demonstrate Sound Engineering Judgement

No checklist can replace professional judgement.

Many engineering decisions involve balancing competing priorities where no universally correct answer exists.

The standard of acceptance therefore values the reasoning behind a decision as much as the decision itself.

Engineers should be able to explain why a solution was chosen, what alternatives were considered, and why the selected approach best serves the long-term interests of the engine.

Sound judgement is demonstrated through thoughtful reasoning, measured decisions, and a willingness to refine ideas when better understanding emerges.

Confidence should come from careful consideration rather than certainty.

Leave Future Contributors in a Better Position

Perhaps the simplest measure of engineering acceptance is this:

Has the work made life easier for the engineers who will come next?

Future contributors should inherit an engine that is clearer than before.

More consistent than before.

More maintainable than before.

More capable than before.

Every accepted contribution should reduce uncertainty rather than increase it.

When this principle is followed consistently, the engine grows without gradually becoming more difficult to understand.

Its complexity increases only where genuine capability requires it, while clarity continues to improve alongside functionality.

Quality Before Speed

Delivering features quickly is valuable.

Delivering thoughtful engineering is indispensable.

A feature completed rapidly but accepted without sufficient care may create maintenance costs that persist for years. The apparent time saved during implementation is often repaid many times over through future debugging, refactoring, or unnecessary complexity.

Conversely, thoughtful engineering creates momentum.

Clear implementations are easier to extend.

Maintainable systems encourage confident development.

Well-considered decisions reduce the likelihood of future rework.

The Locomotion Engine therefore measures progress by the lasting value of completed work rather than the volume of features delivered.

Speed remains important, but it must never become the measure by which engineering quality is judged.

A Standard Worth Preserving

The standard of acceptance exists to protect the engine's future.

It establishes a shared expectation that every accepted contribution should strengthen the software, respect the architecture, and demonstrate the care expected of an engine intended to endure for decades.

Meeting this standard is not about achieving perfection.

It is about consistently producing work that future engineers will be grateful to inherit.

When contributors repeatedly choose clarity over confusion, simplicity over unnecessary complexity, thoughtful judgement over convenience, and long-term stewardship over short-term expedience, they do more than complete features.

They preserve the character of the Locomotion Engine itself.

That is the true standard of acceptance.

13.7 Closing Thoughts

Every long-lived software project eventually reflects the habits of the engineers who built it.

Not only in its architecture or its features, but in the countless small decisions that shaped its evolution over time. The clarity of its interfaces, the consistency of its design, the quality of its documentation, and the confidence with which new work can be added are all the accumulated result of thousands of individual engineering choices.

No single contribution creates engineering excellence.

Likewise, no single imperfect decision condemns a project to failure.

The character of an engine emerges gradually through the standards that its contributors choose to uphold every day.

This has been the central theme of the Engineering Standards.

Engineering is not defined by isolated moments of brilliance.

Exceptional ideas are valuable, but they are rare.

What sustains a software project over decades is something far less dramatic and far more dependable: consistency.

The discipline to write clear implementations.

The patience to simplify rather than complicate.

The judgement to question assumptions before they become permanent.

The humility to refine one's own work.

The willingness to review another engineer's implementation with the shared objective of improving the engine rather than proving a point.

These habits rarely attract attention in the moment.

Taken together, however, they determine whether an engine becomes easier or harder to evolve with each passing year.

The Locomotion Engine is intended to be more than a collection of systems.

It is intended to become a dependable foundation for creating games, learning through implementation, and evolving through practical experience. Achieving that ambition requires more than sound architecture and capable engineering. It requires a shared commitment to protecting the quality of the work that enters the engine.

That responsibility belongs to every contributor.

Regardless of experience, every engineer influences the future of the project through the decisions they make before their work is accepted. Each implementation becomes another part of the foundation that future engineers will inherit. Each review contributes to the standards that future contributors will learn. Every accepted change quietly shapes the direction of the engine.

For that reason, software craftsmanship should never be understood as perfectionism.

Craftsmanship is the consistent application of care.

It is demonstrated by thoughtful decisions repeated over many years.

It is choosing clarity when complexity would be easier to justify.

It is choosing maintainability over cleverness.

It is recognising when something can be simplified.

It is accepting responsibility not only for making software work, but for making it understandable, reliable, and worthy of future trust.

The most valuable contributions to the engine will not necessarily be the largest.

A carefully designed abstraction.

A simplified implementation.

A clearer explanation.

A removed assumption.

An unnecessary piece of code that no longer exists.

These quiet improvements accumulate.

Over time they become indistinguishable from the character of the engine itself.

The Locomotion Engine will continue to evolve.

New ideas will emerge.

Existing systems will mature.

Earlier decisions will occasionally be refined as experience provides better understanding.

That evolution is both expected and welcomed.

What must remain constant is the commitment to making those changes thoughtfully, deliberately, and with respect for the engineers who will continue the work long after today's implementation has become familiar history.

Every accepted contribution becomes part of the engine's story.

Some chapters will introduce new capabilities.

Others will simplify what already exists.

Many will be small enough to pass unnoticed except by the person who created them.

Yet every one of them becomes part of the foundation upon which the future is built.

Protecting the quality of that story is one of the highest responsibilities of an engineer.

Not because perfection is possible.

But because software that is built with consistency, discipline, and care can continue to serve those who create it for many years to come.

That is the standard these Engineering Standards seek to establish.

And that is the standard worthy of the Locomotion Engine.
