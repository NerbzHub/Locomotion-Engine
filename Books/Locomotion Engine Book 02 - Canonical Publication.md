# Locomotion Engine
## Book 02 — Conceptual Architecture

---

## Section 1 — Conceptual Entities
### 1.1 Purpose

The Locomotion Engine is composed of a small set of enduring conceptual entities. These entities describe what fundamentally exists within the architecture, independent of any implementation or technology.

Each entity represents a distinct architectural concept with a clearly defined purpose. Together they establish the vocabulary from which all higher-level architectural reasoning is derived.

Only concepts expected to remain stable throughout the lifetime of the engine are defined here.

### 1.2 Engine

The Engine is the complete architectural system that enables interactive worlds to exist.

It provides the universal capabilities required for games while remaining independent of any particular game, genre, or content.

The Engine is the architectural foundation upon which every other conceptual entity exists.

The Engine is not itself a game. It is the environment within which games are defined.

### 1.3 World

A World is a coherent domain in which existence is defined.

It establishes the complete conceptual space occupied by all entities, their state, and their interactions.

A World represents a single, self-contained reality.

The World exists to provide context. Without a World, individual entities possess no shared environment in which they can meaningfully coexist.

### 1.4 Entity

An Entity is an identifiable thing that exists within a World.

An Entity represents existence itself rather than behaviour, appearance, or purpose.

Entities serve as the fundamental subjects of the architecture. Every object that may participate in the World exists as an Entity.

An Entity is distinguished from its characteristics. The Entity answers the question "what exists?" rather than "what is it like?" or "what can it do?"

### 1.5 Identity

Identity is the property that distinguishes one Entity from every other Entity.

Identity allows an Entity to remain recognisable throughout its existence regardless of how its characteristics may change over time.

Identity exists independently of appearance, behaviour, location, or state.

It provides architectural continuity, ensuring that existence is preserved even as other properties evolve.

### 1.6 State

State is the complete description of an Entity at a particular point in time.

State represents the current condition of existence without implying how that condition was reached or how it may later change.

An Entity persists through time because of its Identity, while its State may change repeatedly throughout its existence.

State therefore describes the present condition of an Entity rather than the Entity itself.

### 1.7 Property

A Property is an individual characteristic that contributes to State.

Properties describe observable or meaningful aspects of an Entity.

Each Property represents one distinct piece of information describing the current condition of existence.

Properties exist to express what is true about an Entity without defining what the Entity fundamentally is.

### 1.8 Behaviour

A Behaviour is a defined capability that an Entity may exhibit.

Behaviour represents what an Entity is capable of doing rather than what it currently is.

Behaviours define possible forms of participation within the World while remaining conceptually distinct from the State that exists at any particular moment.

An Entity may possess Behaviour even when that Behaviour is not presently being exhibited.

### 1.9 Event

An Event is a meaningful occurrence within a World.

Events represent changes, observations, or significant happenings that are recognised by the conceptual model.

An Event exists as an occurrence rather than an enduring object.

Unlike Entities, Events are transient. Their purpose is to represent that something has happened rather than something that permanently exists.

### 1.10 Rule

A Rule is a declarative statement that constrains or governs the World.

Rules define what is considered valid, permissible, or required within the conceptual model.

Rules exist independently of the specific situations in which they apply.

They establish architectural consistency by ensuring that the World behaves according to coherent principles rather than arbitrary circumstance.

### 1.11 Definition

A Definition is a reusable conceptual description from which multiple instances of the same kind may exist.

A Definition captures enduring characteristics that are intended to be shared.

Definitions exist to separate common conceptual knowledge from individual existence.

Where an Entity represents one specific existence, a Definition represents the shared concept from which similar existences may be understood.

### 1.12 Instance

An Instance is a concrete existence realised from a Definition.

Each Instance possesses its own Identity and State while remaining conceptually associated with the Definition from which it derives its common characteristics.

Instances exist to allow many individual Entities to share common conceptual descriptions without becoming the same Entity.

### 1.13 Resource

A Resource is a finite conceptual asset that may exist within a World.

Resources represent quantities that possess meaning because they may be acquired, consumed, transferred, reserved, or exhausted.

A Resource is distinguished from a Property by its independent conceptual significance. While a Property describes an Entity, a Resource represents something that may itself become the subject of interaction.

### 1.14 Action

An Action is a discrete expression of Behaviour performed by an Entity.

An Action represents the occurrence of capability rather than the capability itself.

Behaviour defines what is possible.

Action represents one specific realisation of that possibility.

This distinction separates enduring capability from individual occurrence.

### 1.15 Time

Time is the conceptual progression through which existence changes.

Time provides the ordering required to distinguish persistence, change, and occurrence.

Without Time, Identity could not persist, State could not evolve, and Events could not meaningfully occur.

Time exists as a fundamental dimension of the conceptual model rather than as a measurable implementation mechanism.

### 1.16 Summary

The conceptual entities defined in this section establish the enduring architectural vocabulary of the Locomotion Engine.

They identify the fundamental concepts that exist within the architecture while intentionally avoiding implementation concerns, structural relationships, conceptual boundaries, formal terminology, or behavioural mechanisms.

Subsequent sections build upon these entities by defining how they relate, where their conceptual boundaries lie, and how they collectively form a coherent architectural model.

## Section 2 — Conceptual Relationships

### 2.0 Purpose

The conceptual entities defined in the preceding section do not exist in isolation. Together they form a coherent conceptual model whose relationships remain stable regardless of implementation, technology, or execution environment.

This section defines those enduring relationships.


---

### 2.1 Composition

Complex concepts are composed from simpler concepts.

Composition expresses structural meaning rather than physical containment.

A composed concept derives its significance from the relationships between its constituent concepts as much as from the constituents themselves.

Composition is recursive.

A conceptual entity may itself participate as a component within another conceptual entity without changing its own identity.


---

### 2.2 Ownership

Some conceptual entities own others.

Ownership establishes responsibility for existence rather than physical storage or implementation.

An owned concept cannot exist independently of the concept that owns it.

Ownership therefore defines conceptual lifetime association.

Ownership does not imply exclusivity unless explicitly established elsewhere within the architecture.


---

### 2.3 Participation

Conceptual entities participate within larger conceptual structures.

Participation describes membership within a broader conceptual context while preserving the participant's own identity.

A participant may simultaneously contribute to multiple conceptual structures where such participation remains architecturally valid.

Participation represents association rather than possession.


---

### 2.4 Dependency

Certain concepts depend upon the prior existence or definition of other concepts.

Dependency expresses conceptual necessity.

A dependent concept cannot be fully understood without reference to the concepts upon which it depends.

Dependency does not imply temporal ordering, implementation sequence, or operational execution.

It defines only architectural meaning.


---

### 2.5 Representation

Concepts may represent other concepts without becoming those concepts.

Representation provides an alternate expression of conceptual meaning while preserving the identity of the represented concept.

Multiple representations may coexist for the same underlying concept.

No representation becomes architecturally authoritative solely through its existence.

The represented concept remains primary.


---

### 2.6 Identity

Every conceptual entity possesses a stable conceptual identity.

Identity distinguishes one conceptual entity from another regardless of its relationships, representations, or contextual use.

Relationships may evolve without altering conceptual identity.

Likewise, identical relationships do not imply identical identities.

Identity is therefore independent of participation, ownership, composition, or representation.


---

### 2.7 Association

Conceptual entities may associate with one another without implying composition, ownership, or dependency.

Association expresses meaningful architectural connection while preserving the independence of each participating concept.

Associations exist only where they contribute enduring architectural meaning.

Temporary operational relationships are outside the scope of the conceptual architecture.


---

### 2.8 Transformation

A concept may transform into another conceptual state while preserving its underlying identity.

Transformation represents legitimate architectural evolution rather than replacement.

The transformed concept remains recognisably the same conceptual entity despite differences in form, properties, or interpretation.

Transformation therefore describes continuity rather than substitution.


---

### 2.9 Lifecycle Association

Conceptual entities possess relationships to existence that are defined independently of implementation.

Some concepts originate through other concepts.

Some cease to exist when their owning concepts cease to exist.

Others persist independently.

Lifecycle association defines these enduring conceptual dependencies without prescribing how they are realised.


---

### 2.10 Stability of Relationships

The relationships defined within this section are themselves considered enduring architectural concepts.

Future evolution of the engine may introduce additional conceptual entities or refine existing concepts, but such evolution should preserve these fundamental relationship categories wherever possible.

New concepts should integrate into the existing conceptual relationship model rather than establish incompatible alternatives.

Consistency of relationships is essential to preserving long-term architectural coherence.

The conceptual model therefore derives its stability not only from its entities, but equally from the enduring relationships that bind those entities into a unified architectural foundation.
## Section 3 — Conceptual Boundaries
### 3.1 Purpose

The conceptual architecture establishes not only what exists, but also where each concept begins and ends.

Clear conceptual boundaries ensure that every concept has a distinct responsibility, a well-defined identity, and an unambiguous place within the architecture. These boundaries reduce overlap, prevent conceptual ambiguity, and enable the architecture to evolve without eroding its coherence.

The boundaries defined in this section are conceptual rather than technical. They describe enduring distinctions that remain valid regardless of implementation.

### 3.2 Engine and Game

The engine and the game are distinct conceptual domains.

The engine defines the universal concepts from which games may be constructed.

The game defines a particular realization of those concepts.

The engine provides capability.

The game provides content.

The engine remains independent of any individual game, while every game depends upon the engine.

No concept belonging to a specific game shall become part of the engine unless it represents a general architectural capability.

### 3.3 Definition and Instance

A definition describes what something is.

An instance represents a particular realization of that definition.

Definitions exist independently of any individual instance.

Multiple instances may arise from a single definition.

Changes to an instance do not redefine the underlying definition.

Likewise, modification of a definition does not retroactively alter the conceptual identity of previously existing instances.

Definitions describe possibility.

Instances describe actuality.

### 3.4 Identity and Representation

Identity and representation are separate concepts.

Identity distinguishes one conceptual entity from another.

Representation describes how that entity may be perceived or expressed.

An entity retains its identity regardless of changes to its representation.

Likewise, identical representations do not imply identical identities.

Representation may vary without altering the underlying conceptual entity.

Identity remains stable even when representation evolves.

### 3.5 Data and Behaviour

Data and behaviour occupy different conceptual roles.

Data describes the characteristics of a concept.

Behaviour describes the actions or transformations associated with that concept.

Neither replaces the other.

Data does not inherently perform actions.

Behaviour does not inherently define identity.

Together they describe a complete concept while remaining conceptually distinct.

### 3.6 State and Process

State describes a condition that exists at a particular moment.

Process describes change occurring over time.

State answers what currently is.

Process answers how change occurs.

Processes operate upon state but are not themselves state.

Likewise, state records outcomes without describing the processes that produced them.

This distinction separates enduring conditions from the activities that create, modify, or remove them.

### 3.7 Resource and Asset

Resources represent conceptual capabilities that may be consumed, accumulated, exchanged, or otherwise managed within the world.

Assets represent conceptual content that contributes to the construction or expression of the world.

Resources participate in systems of availability and use.

Assets participate in systems of composition and representation.

An asset may influence resources, and resources may determine access to assets, but neither concept subsumes the other.

### 3.8 Persistent and Transient Concepts

Some concepts exist independently of any particular moment.

Others exist only while a particular circumstance remains valid.

Persistent concepts retain their conceptual identity across the lifetime of the world.

Transient concepts exist only for the duration of the conditions that create them.

Persistence is a conceptual property rather than a measure of longevity.

A concept may endure briefly yet still be conceptually persistent within its intended lifetime.

Likewise, a concept may recur repeatedly without representing the same persistent identity.

### 3.9 Ownership and Participation

Ownership and participation describe different forms of association.

Ownership identifies the concept responsible for possessing or governing another concept within the architectural model.

Participation identifies involvement without implying possession or control.

Participation may exist without ownership.

Ownership does not require continuous participation.

These concepts remain distinct regardless of how they may coincide within particular situations.

### 3.10 Composition and Association

Composition describes a conceptual whole formed from constituent concepts.

The composed whole derives meaning from the existence and arrangement of its constituent parts.

Association describes a conceptual relationship between otherwise independent concepts.

Associated concepts remain conceptually complete without requiring the existence of the association.

Composition establishes structural unity.

Association establishes conceptual connection.

The two forms of relationship shall not be treated as interchangeable.

### 3.11 Capability and Realization

Capability describes what may be achieved.

Realization describes what has been achieved.

Capabilities define potential.

Realizations define outcomes.

The existence of a capability does not imply its realization.

Likewise, every realization presupposes the existence of an appropriate capability.

Maintaining this distinction allows possibility and actuality to evolve independently.

### 3.12 World and Content

The world provides the conceptual context within which all other concepts exist and interact.

Content comprises the concepts that inhabit, modify, or contribute to that world.

The world establishes context.

Content provides substance.

Neither concept replaces the other.

A world without content remains conceptually valid.

Content without a world lacks contextual meaning.

### 3.13 Generality and Specialization

General concepts define architectural capabilities intended for broad applicability.

Specialized concepts refine or constrain those capabilities for particular purposes.

Specialization shall not redefine the meaning of the general concept from which it derives.

Likewise, general concepts shall remain independent of any particular specialization.

This distinction preserves extensibility while maintaining conceptual consistency.

### 3.14 Boundary Integrity

Each conceptual entity shall possess a single primary responsibility within the conceptual architecture.

Concepts may collaborate, influence one another, or participate in shared relationships, but their conceptual responsibilities shall remain distinct.

When uncertainty arises regarding conceptual ownership, responsibilities should be clarified by refining boundaries rather than introducing overlapping concepts.

Stable conceptual boundaries provide the foundation upon which future architectural evolution may occur without compromising conceptual coherence.
## Section 4 — Architectural Vocabulary
### 4.1 Purpose

This section defines the canonical vocabulary of the Locomotion Engine.

The definitions contained herein establish the authoritative meaning of the architectural terminology used throughout the engine documentation.

Unless explicitly superseded by a future constitutional revision, these definitions shall remain stable and normative.

### 4.2 Definitions
Architecture

The complete conceptual organisation of the engine, including its fundamental entities, their relationships, and the governing principles that define them.

Architecture describes what exists and how those concepts relate independently of implementation.

Boundary

A conceptual separation that defines where the responsibilities, meaning, or ownership of one concept end and another begins.

Boundaries exist to preserve clarity, consistency, and architectural independence.

Capability

A function or behaviour that may be exhibited by a conceptual entity.

A capability describes what an entity is able to do, not how that ability is realised.

Component

A conceptual part of a larger entity that contributes to the identity or behaviour of that entity.

A component does not possess independent architectural identity outside the entity to which it belongs.

Concept

A fundamental architectural idea recognised by the engine.

Concepts exist independently of their representation and form the vocabulary from which the architecture is described.

Constraint

A rule that limits or governs the valid state, behaviour, or relationship of one or more conceptual entities.

Constraints define what is architecturally permissible.

Context

The collection of surrounding conceptual circumstances within which an entity, relationship, or behaviour is interpreted.

The meaning of a concept may depend upon its context without changing its identity.

Definition

The precise and authoritative meaning assigned to a conceptual term.

Definitions remove ambiguity by establishing a single canonical interpretation.

Entity

A distinct conceptual element recognised by the architecture as having its own identity.

An entity exists independently of any particular implementation.

Identity

The enduring conceptual distinction that allows one entity to be recognised as separate from every other entity.

Identity persists regardless of changes to state or behaviour.

Ownership

The exclusive conceptual responsibility for defining, maintaining, or governing another concept.

Ownership establishes authority rather than physical possession.

Principle

A foundational architectural rule that guides interpretation, decision-making, and future evolution.

Principles define enduring direction rather than specific outcomes.

Relationship

A meaningful conceptual association between two or more entities.

Relationships describe how concepts are connected without implying implementation.

Responsibility

The conceptual obligation assigned to an entity within the architecture.

Responsibilities define what an entity is accountable for and distinguish it from neighbouring concepts.

Role

The purpose fulfilled by an entity within a particular conceptual context.

A role describes function within a relationship rather than intrinsic identity.

Scope

The extent of conceptual responsibility assigned to an entity or principle.

Scope defines what is included and, by implication, what lies outside its authority.

State

The conceptual condition of an entity at a particular point in its existence.

State may change over time without altering the entity's identity.

Structure

The conceptual arrangement of entities and their relationships.

Structure describes organisation rather than behaviour.

System

A coherent collection of related conceptual entities that together fulfil a broader architectural purpose.

A system is defined by the organisation of its constituent concepts rather than by implementation.

Terminology

The controlled vocabulary used to describe the architecture.

Terminology exists to ensure that every architectural concept is expressed consistently and without ambiguity.

Value

A conceptual piece of information that may characterise, describe, or distinguish an entity.

A value has meaning but does not possess independent architectural identity.

### 4.3 Normative Interpretation

The definitions contained within this section constitute the canonical vocabulary of the Locomotion Engine.

Future architectural documentation shall use these terms consistently with their defined meanings.

Where a term has both a general-language meaning and a definition within this section, the architectural definition shall take precedence within the context of the Locomotion Engine.

## Section 5 — Conceptual Model Summary

### 5.1 Purpose

The conceptual architecture defines the complete conceptual model of the Locomotion Engine.

It establishes what fundamentally exists, how those concepts relate to one another, where their responsibilities begin and end, and the language used to describe them. Together, these form a stable architectural foundation that is independent of any particular implementation.

The purpose of this model is not to prescribe construction, but to provide a consistent understanding of the domain upon which all future work may be based.


---

### 5.2 A Unified Conceptual System

The conceptual model is composed of four complementary elements.

The conceptual entities establish the complete set of architectural concepts that exist within the engine's domain. They define the architectural vocabulary of existence without prescribing behaviour or implementation.

The conceptual relationships organise those entities into a coherent system. Individual concepts acquire meaning not only through their own identity, but through their relationships with other concepts. The architecture therefore derives its coherence from both the concepts themselves and the structure connecting them.

Conceptual boundaries preserve the integrity of this system. They ensure that each concept remains responsible only for its own concerns while preventing conceptual overlap, ambiguity, and unnecessary coupling. As the architecture evolves, these boundaries maintain clarity without restricting future extension.

The canonical vocabulary provides the shared language through which the architecture is understood, discussed, and documented. Consistent terminology ensures that architectural intent remains stable regardless of how the engine evolves over time.

Together, these four elements form a single conceptual system rather than a collection of independent definitions.


---

### 5.3 Architectural Integrity

The conceptual model is intentionally complete at the level of abstraction it defines.

Every architectural concept should be understood through the conceptual entities already established.

Every interaction between concepts should be understood through the defined conceptual relationships.

Every responsibility should remain within its conceptual boundary.

Every architectural discussion should employ the canonical vocabulary.

Because these elements reinforce one another, the conceptual model remains internally consistent even as future documentation expands upon it.

New architectural material should elaborate existing concepts rather than redefine them. Growth therefore occurs through refinement and extension while preserving the stability of the conceptual foundation.


---

### 5.4 Foundation for Future Architecture

Book 02 establishes the conceptual reality of the Locomotion Engine.

It defines the architectural landscape within which all subsequent documentation operates. Future architectural work may describe behaviour, responsibilities, organisation, processes, or implementation-oriented concerns, but each must remain consistent with the conceptual model established here.

This separation preserves a clear progression throughout the architecture.

The conceptual model answers what fundamentally exists.

Subsequent architectural documentation may explain how those concepts are organised, realised, and evolved without altering the conceptual foundation itself.

By establishing a stable conceptual framework before introducing implementation-oriented concerns, the architecture maintains clarity, consistency, and long-term maintainability.


---

### 5.5 Conclusion

The conceptual architecture provides a complete and coherent description of the engine's fundamental concepts.

Its entities define existence.

Its relationships define meaning.

Its boundaries preserve responsibility.

Its vocabulary preserves understanding.

Together they form a stable conceptual foundation upon which all future architectural and implementation-oriented work may confidently build.

Book 02 therefore completes the conceptual foundation of the Locomotion Engine by answering its defining architectural question:

**What fundamentally exists?**