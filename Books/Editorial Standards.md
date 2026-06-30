# Editorial Standards

## Part I — Introduction

# 1. Purpose

The Editorial Standards define the official editorial conventions governing all permanent documentation produced for the Locomotion Engine project.

Their purpose is to ensure every document presents a consistent editorial identity regardless of author, publication date, or subject matter.

These standards exist to improve:

* readability;
* consistency;
* maintainability;
* discoverability;
* long-term documentation quality; and
* editorial stability throughout the lifetime of the project.

Editorial Standards govern presentation only.

They do not define engineering decisions, architectural design, implementation details, construction sequencing, or project governance.

---

# 2. Scope

These standards apply to every official Locomotion Engine document, including but not limited to:

* Books;
* Supporting Documents;
* Engineering Standards;
* Editorial Standards;
* Construction Schedule;
* Implementation Roadmap;
* Review Documents;
* Engineering Reports;
* Checklists;
* Appendices; and
* Future project documentation.

These standards shall be applied to:

* newly created documents;
* revised documents;
* reviewed documents; and
* editorial normalisation of existing documents.

Temporary working notes, brainstorming material, and informal discussion are outside the scope of this document unless explicitly incorporated into official project documentation.

---

# 3. Editorial Philosophy

The Locomotion Engine documentation shall be written as though it were produced by a single professional software engineering organisation over many years.

Documentation shall prioritise clarity over style.

Documentation shall prioritise precision over verbosity.

Documentation shall prioritise consistency over individual preference.

Every editorial decision should improve one or more of the following:

* comprehension;
* consistency;
* maintainability;
* traceability;
* editorial longevity.

Documentation should never draw attention to its author.

The documentation itself should become effectively invisible, allowing engineering content to remain the primary focus.

Every document should exhibit:

* consistent terminology;
* predictable organisation;
* consistent formatting;
* objective language;
* unambiguous structure; and
* professional presentation.

Editorial style shall remain stable throughout the entire project regardless of future contributors.

---

# 4. Relationship to Other Project Documents

Editorial Standards are subordinate to the project's engineering documentation.

Where editorial guidance conflicts with an authoritative engineering document, the engineering document shall prevail.

The order of precedence is:

1. Book 01 — Constitution
2. Book 02 — Conceptual Architecture
3. Engineering Standards
4. Editorial Standards

Editorial Standards shall never:

* reinterpret engineering intent;
* introduce engineering requirements;
* redefine architecture;
* modify implementation decisions;
* alter construction sequencing; or
* resolve engineering ambiguity.

Where engineering wording appears inconsistent, editorial revision shall preserve engineering meaning without modification.

Editorial improvements shall never change technical intent.

---

## Part II — Naming Standards

# 1. General Principles

Names shall be:

* unique;
* descriptive;
* stable;
* human-readable; and
* consistently applied throughout the project.

Naming conventions shall favour long-term clarity over brevity.

Abbreviations shall only be used where they are already established within the project vocabulary.

Naming conventions become part of the project's permanent documentation contract and shall remain stable once published.

---

# 2. Book Naming

Official books shall use the following format:

> **Book NN — Title**

Examples:

* Book 00 — Vision
* Book 01 — Constitution
* Book 02 — Conceptual Architecture
* Book 03 — Construction Schedule

Book numbers shall:

* use two digits;
* remain permanent;
* never be renumbered after publication.

Book titles shall use Title Case.

---

# 3. Supporting Document Naming

Supporting documents shall use concise descriptive titles.

Supporting documents shall not use book numbering.

Examples include:

* Engineering Standards
* Editorial Standards
* Implementation Roadmap

Document names shall avoid unnecessary qualifiers such as:

* Final
* Latest
* New
* Revised
* Updated

Version control is managed separately from document titles.

---

# 4. Part Naming

Major document divisions shall be identified as:

> **Part I — Name**

Roman numerals shall be used for all parts.

Part names shall:

* describe the engineering domain or editorial subject;
* remain concise;
* avoid sentence-style titles.

Examples:

* Part I — Project Foundations
* Part II — Core Infrastructure
* Part III — Data Architecture

---

# 5. Chapter Naming

Chapters shall use the following format:

> **Chapter N — Name**

Arabic numerals shall be used.

Chapter numbering restarts within each book.

Chapter titles shall:

* describe a single subject;
* remain concise;
* avoid unnecessary punctuation.

Examples:

* Chapter 7 — Core Types
* Chapter 18 — Canvas
* Chapter 27 — Audio

---

# 6. Sprint Naming

Construction sprints shall follow one canonical identifier format.

The official sprint identifier is:

> **B03-PX-SYYY**

where:

* **B03** identifies the originating book;
* **PX** identifies the part;
* **SYYY** identifies the sprint using three digits.

Examples:

* B03-P1-S001
* B03-P2-S014
* B03-P7-S183

Sprint identifiers shall:

* be globally unique;
* never be reused;
* never be renumbered after publication;
* remain immutable once approved.

Sprint names shall be descriptive rather than procedural.

Examples:

* Repository Initialization
* Runtime Bootstrap
* Diagnostics Foundation

Sprint names shall use Title Case.

---

# 7. Review Naming

Formal reviews shall use one of the following suffixes:

* Review
* Assessment
* Verification
* Validation
* Approval

Examples:

* Foundation Review
* Engineering Readiness Assessment
* Documentation Consistency Review
* Serialization Review

Review titles shall describe the object under review rather than the review process itself.

---

# 8. Report Naming

Reports shall use concise descriptive titles ending with **Report** where appropriate.

Examples:

* Engineering Review Report
* Dependency Validation Report
* Completion Report
* Verification Report

Reports shall avoid informal naming.

---

# 9. Standards Naming

Project standards shall end with:

> **Standards**

Examples:

* Engineering Standards
* Editorial Standards

Individual standards shall not be numbered unless incorporated into a numbered book.

---

# 10. Appendix Naming

Appendices shall use uppercase letters.

Format:

> **Appendix A — Name**

Appendices shall be referenced by letter rather than chapter number.

Example:

* Appendix A — Editorial Review Checklist

Appendices shall contain supporting material only and shall not introduce primary project requirements.

## Part III — Document Structure

# 1. General Principles

Every official Locomotion Engine document shall follow a consistent structural hierarchy.

Readers should be able to locate equivalent information in different documents without learning a new document structure.

Structure shall prioritise:

* predictability;
* consistency;
* logical progression;
* ease of navigation; and
* long-term maintainability.

Document structures shall remain stable once established.

---

# 2. Book Structure

Every book shall use the following hierarchy:

```
Book
    Part
        Chapter
            Section
                Subsection
```

No structural level shall be omitted where a lower level is used.

For example, a chapter shall not exist outside a part unless the entire book intentionally contains no parts.

---

# 3. Mandatory Book Layout

Every official book shall contain, where applicable:

1. Title
2. Purpose
3. Scope
4. Table of Contents
5. Parts
6. Chapters
7. Appendices
8. Revision History (if maintained separately)

Engineering content shall begin only after introductory material.

---

# 4. Part Layout

Each part shall begin with:

* Part Number
* Part Title
* Purpose
* Scope
* Summary of Included Chapters (where appropriate)

The opening text shall briefly explain why the part exists before introducing individual chapters.

---

# 5. Chapter Layout

Each chapter shall begin with the following sections:

1. Chapter Title
2. Chapter Overview
3. Purpose
4. Scope (where required)

The overview shall provide sufficient context for understanding the remainder of the chapter.

Chapter introductions shall not duplicate previous chapters.

---

# 6. Section Layout

Sections shall introduce one clearly defined subject.

Each section shall:

* address one topic only;
* progress logically from general concepts to specific rules;
* avoid unnecessary nesting.

Large sections should be divided into subsections rather than becoming excessively long.

---

# 7. Sprint Structure

Construction Schedule sprints shall follow one mandatory structure.

Unless explicitly exempted by Book 03, every sprint shall appear in the following order.

---

## Sprint ID

Mandatory.

Provides the unique permanent sprint identifier.

---

## Sprint Name

Mandatory.

Provides the descriptive name of the sprint.

---

## Objective

Mandatory.

Defines the single engineering objective achieved by the sprint.

Objectives shall be concise.

Each sprint shall have exactly one objective.

---

## Purpose

Mandatory.

Explains why the sprint exists.

Purpose shall describe engineering intent rather than implementation detail.

---

## Prerequisites

Mandatory.

Lists every prerequisite required before the sprint may commence.

Prerequisites shall reference only approved documents or completed sprints.

Forward references shall not appear.

---

## Engineering Tasks

Mandatory.

Engineering Tasks define the work performed during the sprint.

Tasks shall:

* appear in logical order;
* be independently understandable;
* avoid implementation detail beyond the scope of the sprint;
* collectively satisfy the sprint objective.

Tasks should use consistent numbering.

---

## Expected Deliverables

Mandatory.

Expected Deliverables describe the measurable outputs produced by successful completion of the sprint.

Deliverables shall:

* describe completed outcomes;
* remain objective;
* avoid implementation instructions.

---

## Acceptance Criteria

Mandatory.

Acceptance Criteria define the conditions required for sprint completion.

Acceptance Criteria shall:

* be objectively verifiable;
* avoid subjective judgement;
* describe observable outcomes.

Acceptance Criteria shall not introduce new engineering requirements.

---

## Dependencies

Mandatory.

Dependencies shall identify:

* required predecessor work; and
* engineering work enabled by completion.

Dependency descriptions shall remain concise.

---

## Engineering Notes

Optional.

Engineering Notes may provide contextual information that assists interpretation.

Engineering Notes shall not:

* redefine objectives;
* introduce new requirements;
* contradict previous sections.

---

## Completion Criteria

Mandatory.

Completion Criteria define the final condition that indicates successful sprint completion.

Completion Criteria should summarise successful completion using one concise statement.

---

## Next Sprint

Mandatory.

The Next Sprint section identifies the immediate successor sprint.

Only one next sprint shall be listed unless branching has been explicitly authorised elsewhere.

---

# 8. Mandatory Sections

The following sections are mandatory within every construction sprint:

* Sprint ID
* Sprint Name
* Objective
* Purpose
* Prerequisites
* Engineering Tasks
* Expected Deliverables
* Acceptance Criteria
* Dependencies
* Completion Criteria
* Next Sprint

Omission of any mandatory section constitutes an editorial defect.

---

# 9. Optional Sections

The following sections may be included where appropriate:

* Chapter Overview
* Scope
* Engineering Notes
* Examples
* Editorial Notes
* Appendices

Optional sections shall never interrupt the mandatory sprint structure.

---

# 10. Prohibited Sections

The following sections shall not appear within official construction sprints unless explicitly authorised by another authoritative document:

* Personal Commentary
* Historical Discussion
* Lessons Learned
* Future Ideas
* Brainstorming
* Open Questions
* Editorial Opinions
* Implementation Diary
* Author Notes
* Revision Commentary

Such material belongs in supporting documentation rather than authoritative engineering specifications.

---

# 11. Structural Consistency

Equivalent document types shall always use identical section ordering.

For example:

* every sprint shall follow the same structure;
* every review shall follow the same structure;
* every report shall follow the same structure.

Readers should never need to determine where information has been placed in one document compared with another.

Structural consistency is mandatory across the entire documentation library.

---

## Part IV — Formatting Standards

# 1. General Principles

Formatting exists to improve readability rather than visual decoration.

Formatting shall:

* reinforce document structure;
* improve navigation;
* reduce ambiguity; and
* remain consistent across every project document.

Visual style shall remain restrained and professional.

---

# 2. Heading Hierarchy

The following Markdown heading hierarchy shall be used consistently.

```
#     Book, Part, or major divisions
##    Primary sections
###   Secondary sections
####  Tertiary sections
```

Heading levels shall not be skipped.

For example:

```
#
##
####
```

is prohibited.

Each heading level shall represent a meaningful structural level.

---

# 3. Heading Style

Headings shall:

* use Title Case;
* avoid terminal punctuation;
* remain concise;
* describe content accurately.

Examples:

Correct

```
## Chapter Overview
## Acceptance Criteria
## Engineering Tasks
```

Incorrect

```
## acceptance criteria
## Acceptance Criteria:
## About Acceptance Criteria
```

---

# 4. Markdown Usage

Markdown shall be used conservatively.

The following elements are permitted:

* headings;
* bullet lists;
* numbered lists;
* tables;
* code blocks;
* horizontal rules;
* bold emphasis;
* italic emphasis where appropriate.

Markdown features not required for documentation clarity should be avoided.

---

# 5. Lists

Bullet lists shall be used where ordering is unimportant.

Numbered lists shall be used where sequence matters.

List items shall:

* follow consistent grammatical structure;
* use parallel wording;
* avoid excessive nesting.

Nested lists should be avoided unless they materially improve readability.

---

# 6. Tables

Tables shall be used when information benefits from structured comparison.

Tables should not be used solely for visual appearance.

Tables shall:

* contain descriptive column headings;
* maintain consistent alignment;
* avoid excessive width.

Very large tables should be divided into logical sections.

---

# 7. Code Blocks

Code blocks shall be reserved exclusively for:

* source code;
* command examples;
* configuration examples;
* structured text examples.

Narrative content shall never appear inside code blocks.

Programming language identifiers should be supplied where appropriate.

---

# 8. Notes

Notes shall communicate supplementary information.

Notes shall:

* remain concise;
* provide clarification only;
* avoid introducing mandatory requirements.

Notes shall not contradict the surrounding text.

---

# 9. Warnings

Warnings shall be used sparingly.

Warnings shall identify situations that could result in:

* misunderstanding;
* documentation misuse;
* editorial inconsistency.

Warnings shall never be used for emphasis alone.

---

# 10. Examples

Examples shall illustrate application of a rule.

Examples shall:

* remain concise;
* clearly distinguish example content from normative requirements;
* avoid introducing additional standards.

Examples shall never replace formal requirements.

---

# 11. Emphasis

Bold text shall identify:

* important terminology;
* mandatory identifiers;
* document names where appropriate.

Italic text shall be used only for:

* first introduction of specialised terminology;
* brief emphasis where necessary.

Underlining shall not be used.

Excessive emphasis reduces readability and shall be avoided.

---

# 12. Whitespace

Whitespace shall be used consistently.

There shall be:

* one blank line between major sections;
* one blank line before and after lists;
* one blank line surrounding code blocks;
* no unnecessary consecutive blank lines.

Whitespace should improve readability without increasing document length unnecessarily.

---

# 13. Page Rhythm

Documents shall maintain a consistent visual rhythm.

Editors should avoid:

* excessively long uninterrupted paragraphs;
* isolated single-sentence sections where unnecessary;
* uneven section lengths caused by inconsistent organisation.

Where practical:

* paragraphs should remain concise;
* lists should group related information;
* headings should appear at consistent intervals.

A reader should perceive every Locomotion Engine document as visually consistent regardless of subject matter.

## Part V — Writing Standards

# 1. General Principles

All official Locomotion Engine documentation shall be written using formal Australian English.

Writing shall prioritise:

* precision;
* clarity;
* consistency;
* objectivity; and
* long-term readability.

The writing style shall resemble that of a professional engineering specification rather than instructional material, marketing material, or conversational prose.

Every sentence should contribute meaningful information.

Redundant wording shall be removed.

---

# 2. Grammar

Documentation shall follow standard Australian English grammar.

Sentences shall be:

* grammatically complete;
* unambiguous;
* internally consistent.

Editors shall favour simple sentence construction over unnecessarily complex phrasing.

Grammar shall remain consistent throughout a document.

---

# 3. Voice

Official documentation shall use an objective voice.

Engineering requirements shall be expressed using normative language where appropriate.

Preferred forms include:

* shall;
* shall not;
* must;
* must not;
* should;
* should not;
* may.

Personal language shall not appear.

The following forms are prohibited:

* I
* we
* you
* our
* let's
* obviously
* clearly
* simply

The documentation shall describe requirements rather than address the reader directly.

---

# 4. Tense

Documentation shall use present tense wherever practical.

Examples:

Correct

* The engine shall initialise the runtime.
* The subsystem owns configuration.
* The registry maintains asset metadata.

Incorrect

* The engine will initialise the runtime.
* The subsystem has owned configuration.
* The registry was responsible for metadata.

Future tense shall only be used when referring to future work explicitly identified within the Construction Schedule.

---

# 5. Sentence Structure

Sentences shall be:

* concise;
* direct;
* technically precise.

Editors should avoid unnecessarily long compound sentences.

Where complex information is required, it should be divided into multiple sentences.

Sentences should normally communicate one primary idea.

---

# 6. Capitalisation

Title Case shall be used for:

* book titles;
* chapter titles;
* part titles;
* sprint names;
* document titles.

Sentence case shall be used throughout normal body text.

Project-defined entities shall retain their approved capitalisation.

Examples:

* Engine Services
* Core Types
* Construction Schedule
* Engineering Standards

Generic descriptions shall remain lowercase.

Examples:

* rendering system
* validation process
* engineering task
* runtime service

---

# 7. Australian English

Official spelling shall follow Australian English.

Examples include:

| Preferred      | Prohibited     |
| -------------- | -------------- |
| organisation   | organization   |
| behaviour      | behavior       |
| initialise     | initialize     |
| optimisation   | optimization   |
| colour         | color          |
| analyse        | analyze        |
| licence (noun) | license (noun) |

Consistency is mandatory.

American spelling shall not appear within official documentation unless quoted verbatim.

---

# 8. Numbers

Whole numbers below ten should normally be written as words in narrative text.

Examples:

* one subsystem
* three reviews
* seven chapters

Numbers shall remain numeric when:

* used within identifiers;
* expressing measurements;
* used in tables;
* representing versions;
* expressing counts requiring precision.

Examples:

* Sprint B03-P1-S001
* 64-bit
* 120 FPS
* Version 2.1

---

# 9. Units

Units shall use recognised international abbreviations.

Examples:

* ms
* s
* MB
* GB
* kB
* MHz
* GHz

A space shall separate the value and unit.

Examples:

Correct

* 16 GB
* 60 FPS
* 100 ms

Incorrect

* 16GB
* 60FPS
* 100ms

Exceptions may be made where industry convention dictates otherwise.

---

# 10. Dates

Dates shall follow Australian ordering.

Preferred format:

```text
30 June 2026
```

Numeric date formats shall be avoided in permanent documentation due to regional ambiguity.

---

# 11. Time

Where time is required, the 24-hour clock shall be used.

Examples:

* 09:30
* 14:45
* 18:00

Time zones shall be identified where relevant.

---

# 12. Acronyms

An acronym shall be expanded on first use.

Example:

> Entity Component System (ECS)

Subsequent references may use the acronym alone.

Widely recognised computing abbreviations may remain abbreviated where unambiguous.

---

# 13. Abbreviations

Abbreviations should be minimised.

Approved abbreviations shall remain consistent throughout every document.

Editors shall avoid introducing multiple abbreviations for the same concept.

---

# 14. Terminology

A single approved term shall be used consistently throughout the documentation.

Multiple interchangeable terms for the same concept shall be avoided unless explicitly permitted within the Canonical Vocabulary.

Examples:

Preferred:

* subsystem
* sprint
* deliverable
* dependency

Avoid mixing alternatives such as:

* subsystem / module / package
* task / activity / work item
* requirement / rule / instruction

unless those words intentionally describe different concepts.

---

# 15. Preferred Writing Style

Official documentation should:

* define before describing;
* state rules before providing explanation;
* present general concepts before specific cases;
* use parallel grammatical structure;
* maintain consistent terminology.

Requirements should be written positively where practical.

Examples should support requirements rather than replace them.

---

# 16. Prohibited Writing Style

The following editorial practices are prohibited:

* conversational language;
* rhetorical questions;
* humour;
* sarcasm;
* marketing language;
* motivational language;
* emotional language;
* exaggerated claims;
* unnecessary repetition;
* speculative wording;
* subjective commentary.

The following expressions shall not appear in official documentation:

* easy
* simple
* obvious
* clearly
* naturally
* of course
* luckily
* probably
* basically

unless required within a direct quotation.

---

# 17. Normative Language

Normative keywords shall carry the following meanings.

| Keyword    | Meaning                                            |
| ---------- | -------------------------------------------------- |
| Shall      | Mandatory requirement                              |
| Shall Not  | Mandatory prohibition                              |
| Must       | Absolute requirement where compliance is essential |
| Must Not   | Absolute prohibition                               |
| Should     | Strong recommendation                              |
| Should Not | Strong recommendation against                      |
| May        | Optional behaviour                                 |

These keywords shall be used consistently throughout every authoritative document.

Alternative expressions such as "needs to", "ought to", or "is expected to" should be avoided.

---

## Part VI — Canonical Vocabulary

# 1. Purpose

This section establishes the official vocabulary of the Locomotion Engine documentation.

Where multiple terms could describe the same concept, the preferred term defined here shall be used.

Alternative wording shall only be used where explicitly permitted.

The purpose of this vocabulary is editorial consistency rather than engineering definition.

---

# 2. Engine

| Attribute               | Standard                                                                                              |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| Preferred Term          | Engine                                                                                                |
| Acceptable Alternatives | None                                                                                                  |
| Prohibited Wording      | Framework, Program, Application                                                                       |
| Definition              | The Locomotion Engine as a whole.                                                                     |
| Usage Guidance          | Capitalise when referring to the project. Use lowercase only when referring to an engine generically. |

---

# 3. Subsystem

| Attribute               | Standard                                               |
| ----------------------- | ------------------------------------------------------ |
| Preferred Term          | Subsystem                                              |
| Acceptable Alternatives | System (where formally named)                          |
| Prohibited Wording      | Module (unless architecturally distinct), Package      |
| Definition              | A major organisational unit of the Engine.             |
| Usage Guidance          | Use consistently throughout engineering documentation. |

---

# 4. Module

| Attribute               | Standard                                   |
| ----------------------- | ------------------------------------------ |
| Preferred Term          | Module                                     |
| Acceptable Alternatives | None                                       |
| Prohibited Wording      | Package                                    |
| Definition              | A defined subdivision within a subsystem.  |
| Usage Guidance          | Do not use interchangeably with subsystem. |

---

# 5. Component

| Attribute               | Standard                                            |
| ----------------------- | --------------------------------------------------- |
| Preferred Term          | Component                                           |
| Acceptable Alternatives | None                                                |
| Prohibited Wording      | Property Set, Data Block                            |
| Definition              | A discrete element forming part of a larger system. |
| Usage Guidance          | Preserve its established engineering meaning.       |

---

# 6. Service

| Attribute               | Standard                                                    |
| ----------------------- | ----------------------------------------------------------- |
| Preferred Term          | Service                                                     |
| Acceptable Alternatives | Engine Service                                              |
| Prohibited Wording      | Manager, Singleton (unless technically accurate)            |
| Definition              | A long-lived capability owned by the Engine.                |
| Usage Guidance          | Capitalise only when referring to a formally named service. |

---

# 7. Architecture

| Attribute               | Standard                                            |
| ----------------------- | --------------------------------------------------- |
| Preferred Term          | Architecture                                        |
| Acceptable Alternatives | None                                                |
| Prohibited Wording      | Design (where architecture is intended)             |
| Definition              | The approved structural organisation of the Engine. |
| Usage Guidance          | Do not use interchangeably with implementation.     |

---

# 8. Runtime

| Attribute               | Standard                                                  |
| ----------------------- | --------------------------------------------------------- |
| Preferred Term          | Runtime                                                   |
| Acceptable Alternatives | Runtime Environment                                       |
| Prohibited Wording      | Execution Layer                                           |
| Definition              | The Engine while executing.                               |
| Usage Guidance          | Use consistently throughout implementation documentation. |

---

# 9. Lifecycle

| Attribute               | Standard                                               |
| ----------------------- | ------------------------------------------------------ |
| Preferred Term          | Lifecycle                                              |
| Acceptable Alternatives | None                                                   |
| Prohibited Wording      | Life Cycle                                             |
| Definition              | The ordered stages through which an entity progresses. |
| Usage Guidance          | Treat as a single word throughout the project.         |

## Part VI — Canonical Vocabulary (Continued)

# 10. Dependency

| Attribute               | Standard                                                                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Preferred Term          | Dependency                                                                                                                   |
| Acceptable Alternatives | None                                                                                                                         |
| Prohibited Wording      | Reliance, Requirement Chain                                                                                                  |
| Definition              | A required relationship in which one engineering element depends upon another.                                               |
| Usage Guidance          | Use consistently for both construction sequencing and architectural relationships. Distinguish dependencies from references. |

---

# 11. Ownership

| Attribute               | Standard                                                                 |
| ----------------------- | ------------------------------------------------------------------------ |
| Preferred Term          | Ownership                                                                |
| Acceptable Alternatives | Responsibility (where appropriate)                                       |
| Prohibited Wording      | Control, Authority (unless specifically intended)                        |
| Definition              | The exclusive responsibility assigned to an engineering element.         |
| Usage Guidance          | Ownership should always be singular unless explicitly defined otherwise. |

---

# 12. Validation

| Attribute               | Standard                                                      |
| ----------------------- | ------------------------------------------------------------- |
| Preferred Term          | Validation                                                    |
| Acceptable Alternatives | None                                                          |
| Prohibited Wording      | Checking, Testing                                             |
| Definition              | Confirmation that an artefact satisfies defined requirements. |
| Usage Guidance          | Do not use interchangeably with verification.                 |

---

# 13. Verification

| Attribute               | Standard                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| Preferred Term          | Verification                                                                              |
| Acceptable Alternatives | None                                                                                      |
| Prohibited Wording      | Validation                                                                                |
| Definition              | Confirmation that an artefact has been produced correctly according to its specification. |
| Usage Guidance          | Preserve the distinction between validation and verification throughout the project.      |

---

# 14. Review

| Attribute               | Standard                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| Preferred Term          | Review                                                                                    |
| Acceptable Alternatives | Assessment, Audit (where specifically defined)                                            |
| Prohibited Wording      | Inspection (unless formally defined)                                                      |
| Definition              | A structured examination of engineering work.                                             |
| Usage Guidance          | Review titles should identify the subject being reviewed rather than the activity itself. |

---

# 15. Certification

| Attribute               | Standard                                                                       |
| ----------------------- | ------------------------------------------------------------------------------ |
| Preferred Term          | Certification                                                                  |
| Acceptable Alternatives | Approval (where appropriate)                                                   |
| Prohibited Wording      | Sign-off, Tick-off                                                             |
| Definition              | Formal acknowledgement that an artefact satisfies defined acceptance criteria. |
| Usage Guidance          | Use only where formal acceptance is intended.                                  |

---

# 16. Engineering Tasks

| Attribute               | Standard                                                       |
| ----------------------- | -------------------------------------------------------------- |
| Preferred Term          | Engineering Tasks                                              |
| Acceptable Alternatives | Tasks                                                          |
| Prohibited Wording      | To-do List, Activities, Jobs                                   |
| Definition              | The engineering work required to satisfy a sprint objective.   |
| Usage Guidance          | Use as the official section title within construction sprints. |

---

# 17. Expected Deliverables

| Attribute               | Standard                                                                            |
| ----------------------- | ----------------------------------------------------------------------------------- |
| Preferred Term          | Expected Deliverables                                                               |
| Acceptable Alternatives | Deliverables                                                                        |
| Prohibited Wording      | Outputs, Results                                                                    |
| Definition              | The measurable artefacts produced upon successful completion of a sprint or review. |
| Usage Guidance          | Deliverables describe outcomes rather than work performed.                          |

---

# 18. Acceptance Criteria

| Attribute               | Standard                                                       |
| ----------------------- | -------------------------------------------------------------- |
| Preferred Term          | Acceptance Criteria                                            |
| Acceptable Alternatives | None                                                           |
| Prohibited Wording      | Success Criteria, Pass Conditions                              |
| Definition              | The objective conditions required for formal acceptance.       |
| Usage Guidance          | Acceptance Criteria shall always be measurable and verifiable. |

---

# 19. Completion Criteria

| Attribute               | Standard                                                                                |
| ----------------------- | --------------------------------------------------------------------------------------- |
| Preferred Term          | Completion Criteria                                                                     |
| Acceptable Alternatives | None                                                                                    |
| Prohibited Wording      | Completion Notes, Finish State                                                          |
| Definition              | The final condition indicating that a document section or sprint has been completed.    |
| Usage Guidance          | Completion Criteria summarise completion rather than introduce additional requirements. |

---

# 20. Requirement

| Attribute               | Standard                                                             |
| ----------------------- | -------------------------------------------------------------------- |
| Preferred Term          | Requirement                                                          |
| Acceptable Alternatives | Mandatory Requirement                                                |
| Prohibited Wording      | Suggestion, Idea                                                     |
| Definition              | A mandatory obligation defined by an authoritative project document. |
| Usage Guidance          | Requirements should normally be expressed using normative language.  |

---

# 21. Standard

| Attribute               | Standard                                                |
| ----------------------- | ------------------------------------------------------- |
| Preferred Term          | Standard                                                |
| Acceptable Alternatives | Project Standard                                        |
| Prohibited Wording      | Guideline (where mandatory compliance is intended)      |
| Definition              | A documented rule governing project practice.           |
| Usage Guidance          | Capitalise when referring to a specific named standard. |

---

# 22. Document

| Attribute               | Standard                                                    |
| ----------------------- | ----------------------------------------------------------- |
| Preferred Term          | Document                                                    |
| Acceptable Alternatives | Official Document                                           |
| Prohibited Wording      | File, Paper                                                 |
| Definition              | A formally maintained project publication.                  |
| Usage Guidance          | Use consistently across all books and supporting documents. |

---

# 23. Section

| Attribute               | Standard                                                 |
| ----------------------- | -------------------------------------------------------- |
| Preferred Term          | Section                                                  |
| Acceptable Alternatives | Subsection (where structurally appropriate)              |
| Prohibited Wording      | Topic, Block                                             |
| Definition              | A structural division within a document.                 |
| Usage Guidance          | Refer to structural elements using their official names. |

---

# 24. Reference

| Attribute               | Standard                                                                         |
| ----------------------- | -------------------------------------------------------------------------------- |
| Preferred Term          | Reference                                                                        |
| Acceptable Alternatives | Cross Reference                                                                  |
| Prohibited Wording      | Link (unless referring specifically to a hyperlink)                              |
| Definition              | A citation directing the reader to another approved project document or section. |
| Usage Guidance          | References shall remain accurate, stable, and unambiguous.                       |

---

# 25. Consistency

| Attribute               | Standard                                                                      |
| ----------------------- | ----------------------------------------------------------------------------- |
| Preferred Term          | Consistency                                                                   |
| Acceptable Alternatives | Editorial Consistency                                                         |
| Prohibited Wording      | Uniformity (unless context specifically requires it)                          |
| Definition              | The application of identical editorial conventions across documentation.      |
| Usage Guidance          | Consistency should always take precedence over personal stylistic preference. |

---

## Part VII — Editorial Consistency

# 1. Purpose

Editorial consistency ensures that every official Locomotion Engine document appears to have been written using one editorial standard regardless of:

* publication date;
* author;
* engineering subject; or
* document type.

Consistency is mandatory across the entire documentation library.

---

# 2. Cross References

Cross references shall identify documents using their official published names.

Examples:

* Book 02 — Conceptual Architecture
* Engineering Standards
* Implementation Roadmap

Informal references such as:

* the architecture book;
* Book Two;
* the roadmap document;

shall not be used.

References shall remain sufficiently precise that the intended destination is unambiguous.

---

# 3. Internal References

References within the same document shall identify the official structural element.

Examples include:

* Part III
* Chapter 8
* Section 5
* Appendix A

Relative descriptions such as:

* above;
* below;
* earlier;
* later;

should be avoided where a formal structural reference can be used.

---

# 4. Naming Consistency

The same concept shall always be described using the same approved terminology.

Editors shall not alternate between synonymous expressions for stylistic variation.

For example:

Correct

* subsystem
* subsystem
* subsystem

Incorrect

* subsystem
* module
* package

unless each term intentionally describes a different concept.

---

# 5. Section Consistency

Equivalent document types shall contain equivalent section structures.

For example:

* every sprint shall contain the same mandatory sections;
* every review shall follow the same ordering;
* every appendix shall use the same heading conventions.

Structural variation shall occur only where formally justified.

---

# 6. Formatting Consistency

Equivalent formatting shall produce equivalent meaning.

Examples include:

* identical heading levels for identical hierarchy;
* identical list formatting for identical structures;
* identical emphasis rules for identical concepts.

Formatting shall never be used to imply importance unless defined by these standards.

---

# 7. Terminology Consistency

Preferred terminology defined in Part VI shall be used throughout every project document.

Editors shall not replace approved terms with stylistic alternatives.

Where terminology evolves through future engineering decisions, updates shall be made centrally within the Canonical Vocabulary before being adopted elsewhere.

---

# 8. Normative Language Consistency

Normative keywords shall be used consistently throughout all authoritative documents.

Mandatory requirements shall not alternate between:

* shall;
* must;
* is required to;
* needs to.

A single level of obligation shall be expressed consistently.

---

# 9. Editorial Revision Principles

Editorial revisions shall preserve engineering intent.

An editorial revision may:

* improve readability;
* improve grammar;
* improve formatting;
* improve consistency;
* improve terminology.

An editorial revision shall not:

* modify engineering meaning;
* alter architecture;
* change implementation intent;
* introduce additional requirements;
* remove existing requirements.

---

# 10. Future Documentation

Every future official Locomotion Engine document shall conform to these Editorial Standards before publication.

Where uncertainty exists regarding editorial presentation, these standards shall be treated as the authoritative reference.

If these standards do not address a specific editorial circumstance, any new convention shall:

* align with the principles established in this document;
* minimise deviation from existing documentation; and
* be incorporated into a future revision of the Editorial Standards rather than applied inconsistently.

---

## Appendix A — Editorial Review Checklist

The following checklist shall be used when reviewing any official Locomotion Engine document for editorial compliance.

### Document Identity

* Document title follows the approved naming convention.
* Part, chapter, and appendix naming is correct.
* Section ordering matches the required structure.
* Cross references use official document names.
* Internal references are precise and unambiguous.

### Structure

* Mandatory sections are present.
* Optional sections are used appropriately.
* Prohibited sections are absent.
* Heading hierarchy is correct.
* Document organisation follows the approved layout.

### Formatting

* Markdown usage is consistent.
* Heading styles are consistent.
* Lists use parallel structure.
* Tables are correctly formatted.
* Code blocks contain only appropriate content.
* Whitespace is consistent.
* Emphasis follows project conventions.

### Writing Quality

* Australian English is used throughout.
* Grammar is correct.
* Present tense is used where appropriate.
* Objective voice is maintained.
* Normative language is applied consistently.
* Sentences are concise and unambiguous.
* Redundant wording has been removed.

### Terminology

* Canonical vocabulary is used consistently.
* Approved capitalisation is maintained.
* Acronyms are expanded on first use.
* Abbreviations are consistent.
* Terminology does not vary without justification.

### Consistency

* Formatting matches other project documents.
* Equivalent sections use equivalent wording.
* Cross-document terminology is consistent.
* References are accurate.
* Editorial changes have not altered engineering intent.

### Publication Readiness

A document is considered editorially compliant only when:

* all mandatory editorial requirements have been satisfied;
* no prohibited editorial practices remain;
* engineering meaning has been preserved without modification; and
* the document presents a consistent editorial style aligned with every other official Locomotion Engine publication.
