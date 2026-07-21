# Locomotion Engine – Procedural Sprite System (Session Recap)

## 🧠 Core Concept

The Locomotion Engine will use a **data-driven procedural sprite generation system** built on modular assets.

Instead of creating full sprites per unit, the system composes units from smaller parts:

- Heads  
- Torsos  
- Legs  
- Weapons  
- (Optional: accessories, effects)

---

## 🧩 Generation Pipeline

The engine follows this structure:

```
DATA (Entity Definition)
    ↓
RULES (Resolver)
    ↓
ASSEMBLY (Parts Selection)
    ↓
RENDERER (Canvas Draw)
    ↓
FINAL SPRITE
```

---

## 🧬 Entity DNA Model (Concept)

Units are not random — they are defined by structured data:

```json
{
  "species": "goblin",
  "role": "scout",
  "biome": "swamp",
  "tier": 1,
  "traits": ["fast", "weak"],
  "seed": 12345
}
```

This ensures:
- visual consistency
- gameplay meaning
- deterministic generation

---

## 🎨 Asset Strategy

### Modular Assets (Primary Approach)

Each unit is built from reusable parts:

```
head_01.png
torso_02.png
legs_03.png
weapon_01.png
```

This enables:
- massive variation from small asset sets
- easy expansion
- low performance cost

---

## ⚙️ Sprite Sheet Pipeline (Key Innovation)

Instead of requiring users to organise folders manually, the engine supports:

### 👉 Sprite Sheet Import + Visual Assignment

#### Workflow:

1. User uploads a sprite sheet
2. Engine overlays a grid (e.g. 30x30 tiles)
3. User selects regions visually
4. Assigns them to categories:
   - Head
   - Torso
   - Legs
   - Weapon
5. Engine creates a unit definition automatically

---

## 🧾 Sprite Sheet Spec (v1)

- Max size: 1024×1024
- Tile size: 30×30 pixels
- Transparent background required
- Consistent alignment per part type
- Optional: 1–2px padding between tiles

### Example Layout:

```
[ HEADS ]
[ H1 ][ H2 ][ H3 ][ H4 ]

[ TORSOS ]
[ T1 ][ T2 ][ T3 ][ T4 ]

[ LEGS ]
[ L1 ][ L2 ][ L3 ][ L4 ]

[ WEAPONS ]
[ W1 ][ W2 ][ W3 ][ W4 ]
```

---

## 🧠 Rendering System

The renderer:

- layers selected parts
- aligns them to a shared origin
- optionally applies:
  - palette swaps
  - wear/damage overlays
  - minor procedural variation

---

## ⚖️ Procedural Strategy

### NOT recommended:
- full code-generated characters (too unpredictable)

### Recommended:
- modular assets + procedural variation

This provides:
- control
- readability
- scalability

---

## 🖥️ UI Strategy

### Phase 1 – Debug UI (MVP)

- Unit selector
- Canvas preview
- Seed input
- Generate button

Purpose:
- validate system
- visualise results
- iterate quickly

---

### Phase 2 – Builder UI

- Visual sprite sheet importer
- Drag-select regions
- Assign categories
- Live preview

---

### Phase 3 – Full Editor (Unity-style)

- Left panel: units / assets
- Center: preview canvas
- Right panel: metadata / inspector

---

## 🔥 Key Design Principles

### 1. Convention over configuration
- Engine infers structure where possible

### 2. Data-driven generation
- visuals come from structured data, not randomness

### 3. Visual-first UX
- users interact with images, not files

### 4. LLM compatibility
- LLMs generate:
  - sprite sheets
  - unit definitions
- engine handles execution

---

## 🚀 Core Insight

> “The sprite sheet becomes the interface.”

Users don’t need to:
- name files
- organise folders
- understand systems

They:
- upload
- select
- assign
- generate

---

## 🎯 Outcome

This system enables:

- infinite unit variation
- beginner-friendly workflows
- modding support
- LLM-driven content creation

---

## 🧭 Next Steps

1. Define minimal data schema (EntityDNA v1)
2. Implement canvas renderer
3. Build debug UI
4. Add sprite sheet importer
5. Implement part assignment system

---

## 💡 Summary

Locomotion is not just a sprite system.

It is:

> A **data-driven procedural entity engine** with a **visual-first asset pipeline**

---