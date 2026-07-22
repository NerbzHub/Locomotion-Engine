# Locomotion Engine
## Book 04 — Game Vision

## Section 1 — Purpose

Dungeon Defense is the first game vision established for the Locomotion
Engine. It is a browser-first procedural pixel-art tower-defence game in
which a small fantasy settlement withstands an indefinitely escalating series
of threats.

The game exists to provide a complete and demanding application of the
Locomotion Engine. It exercises reusable engine capabilities while retaining
ownership of its own rules, content, balance, tone, progression, and fantasy
identity. Dungeon Defense shall not define the engine's architecture. It shall
demonstrate and validate that architecture through a coherent game experience.

The intended player experience combines familiar tower-defence decisions with
procedural variation, persistent run identity, and increasingly improbable
fantasy escalation. A successful run should be remembered not only by its wave
number, but by the particular towers, heroes, relics, events, enemies, and
accidents that shaped it.

## Section 2 — Core Fantasy

Dungeon Defense begins with a small and recognisable fantasy defence. Early
waves present modest threats such as rats, goblins, kobolds, bandits, and
similar creatures. The player initially commands a limited collection of
conventional towers within a small pixel-art world.

Continued survival changes the scale of the world. Threats progress through
orc armies, undead forces, necromancers, demonic incursions, dragons, titans,
and increasingly strange cosmic entities. The escalation is intended to remain
surprising and slightly absurd without losing the clarity of the tower-defence
loop.

The central fantasy is that a charming and initially humble settlement keeps
surviving long enough to confront threats that should be far beyond its scale.
The game should permit combinations such as flaming goblins riding dragons
while escorting a sentient moon, provided that the underlying game rules remain
legible and the result remains tactically meaningful.

## Section 3 — Endless Progression

Dungeon Defense is intended to support unlimited progression rather than a
single predetermined final wave. Endless progression shall not be implemented
as a simple and indefinite increase in enemy health.

The world should evolve through distinct fantasy eras. Each era introduces new
enemy families, tactical pressures, visual palettes, environmental conditions,
events, and opportunities for tower development. Wave count remains useful as
a measure of survival, but it is not the sole expression of progress.

The initial era structure is as follows:

### 3.1 The Frontier

The Frontier establishes the familiar starting scale of the game. Rats,
goblins, kobolds, bandits, and other local threats define the early defence.

### 3.2 The Wilderness

The Wilderness introduces wolves, orcs, ogres, shamans, and larger organised
threats. Enemy durability and support behaviour become more significant.

### 3.3 The Dark Ages

The Dark Ages introduce skeletons, zombies, ghouls, wraiths, necromancers, and
other undead forces. Holy damage, summoning, resurrection, and supernatural
movement may become relevant to tower decisions.

### 3.4 The Infernal War

The Infernal War introduces imps, hellhounds, demons, portals, and infernal
conditions. The battlefield may become increasingly hostile or unstable.

### 3.5 The Dragon Age

The Dragon Age introduces wyverns, dragons, and progressively more formidable
dragon variants. Long-range and specialised anti-large-enemy capabilities gain
in importance.

### 3.6 The Celestial and Cosmic Age

The Celestial and Cosmic Age introduces titans, cosmic dragons, strange
entities, and threats that extend beyond ordinary fantasy expectations.

### 3.7 The End of Reality

The End of Reality permits the game to become deliberately excessive. Reality
eaters, sentient moons, void creatures, and other improbable combinations may
appear. This era shall preserve readable game rules while allowing the visual
and narrative presentation to lose conventional restraint.

## Section 4 — Tower Design

Towers provide the primary player decisions. They shall begin with familiar
fantasy archetypes so that the opening game is immediately understandable, then
grow into specialised and memorable identities as a run develops.

### 4.1 Familiar Foundations

The initial tower families establish the baseline vocabulary of the game:

* **Archer Tower** — reliable rapid physical damage.
* **Mage Tower** — magical damage with elemental potential.
* **Cannon** — slow, powerful area damage.
* **Frost Tower** — crowd control and slowing.

These towers should provide clear first decisions without requiring knowledge
of the later procedural systems.

### 4.2 Fantasy Towers

Additional tower families expand the tactical and tonal range of the game:

* **Cleric Shrine** — healing, blessings, and support effects.
* **Druid Grove** — roots, nature control, and summoned creatures.
* **Necromancer Tower** — enemy defeats may create allied skeletons.
* **Alchemist** — potion effects including poison, burning, slowing, and
  unusual random outcomes.
* **Bard Tower** — musical support for nearby towers.
* **Ballista** — extreme-range physical damage for large enemies and dragons.
* **Paladin Watchtower** — holy damage effective against undead and demons.
* **Warlock Circle** — dangerous magic and summoned imps.
* **Beastmaster Camp** — allied wolves, bears, boars, and related creatures.
* **Rune Tower** — magical traps placed on enemy routes.
* **Portal Tower** — late-game summons of increasingly unusual creatures.

### 4.3 Towers With Personality

Some towers exist primarily to give individual runs memorable character. They
shall be mechanically coherent, but their distinctive behaviour is part of
their value.

The **Goblin Engineer** may fire bombs, rockets, explosive barrels, chickens,
or other uncertain ammunition. The **Mimic Chest** appears to be treasure until
an enemy approaches and is attacked. The **Tavern** may produce adventurers
who join the defence. The **Wizard Academy** may produce apprentice mages over
time.

The **Dragon Egg** is intended as a long-term emotional investment. It begins
with limited immediate value and may develop through egg, hatchling, young
dragon, adult dragon, and ancient dragon stages. Its survival should create an
attachment that purely numerical upgrades cannot provide.

### 4.4 Tower Evolution

Tower progression shall not be limited to linear statistical upgrades. Towers
may develop through branching identities that alter their tactical role.

An Archer may develop through longbow, elven archer, hunter, beastmaster, or
ranger captain paths. A Mage may develop through fire mage, pyromancer, and
phoenix mage paths before reaching more unusual late-game identities.

Branching evolution should make a tower feel like an individual participant in
a run. It should create meaningful choices rather than merely increasing a
single damage value.

## Section 5 — Enemy Design

Enemies shall represent tactical problems rather than interchangeable health
bars. Each family should communicate a recognisable role through movement,
durability, support behaviour, spawning behaviour, resistance, or other
readable mechanics.

The initial enemy vocabulary includes rats, goblins, kobolds, bandits, wolves,
orcs, ogres, shamans, skeletons, zombies, ghouls, wraiths, necromancers,
hellhounds, imps, demons, wyverns, and dragons.

Later enemy identities may include void dragons, crystal dragons, time dragons,
reality eaters, star spawn, and living dungeons. These later identities shall
remain governed by clear game rules even when their presentation becomes
deliberately strange.

### 5.1 Elite Modifiers

Enemy modifiers provide replayability by allowing a familiar base enemy to
create a new tactical problem. A goblin may become a Giant Goblin, Swift
Flaming Goblin, or Vampiric Armoured Explosive Goblin.

The initial modifier vocabulary includes:

* Giant;
* Swift;
* Armoured;
* Regenerating;
* Flaming;
* Frozen;
* Vampiric;
* Explosive;
* Invisible;
* Teleporting; and
* Splitter.

Modifiers should be composed with restraint. Their purpose is to keep enemy
definitions relevant across long runs, not to create unreadable combinations.

### 5.2 Procedural Bosses

Important bosses should eventually be assembled from composable game content.
A procedural boss may combine a base creature, boss archetype, modifiers,
abilities, procedural appearance, and procedural name.

This system may produce identities such as Ancient Flaming Goblin King, Swift
Crystal Dragon, Titanic Vampiric Demon Lord, or Vorlak the Void Lich. The
result should feel specific to its run while remaining understandable to the
player through visible rules and behaviour.

## Section 6 — Run Progression

Run progression shall combine tower growth, enemy escalation, boss rewards,
relics, heroes, merchants, and events. These systems should create strategic
variation while preserving the central clarity of tower placement and defence.

### 6.1 Relics

Boss victories may award relic choices. A relic should change a future decision
or create a new relationship between the player's existing systems.

Examples include:

* **Ranger's Quiver** — Archer towers attack faster.
* **Phoenix Feather** — fire damage may ignite enemies.
* **Ancient Roots** — Nature towers gain range.
* **Lucky Coin** — permanent gold-generation benefit.

Relics should interact with stable content tags such as Holy, Nature, Fire,
Ice, Arcane, Undead, Demon, Dragon, Summon, Mechanical, Support, Ranged, and
Melee. Tag-based relationships allow a relic to affect a family of game
content without requiring a separate rule for every individual tower.

### 6.2 Heroes

Heroes may enter a run as persistent characters rather than anonymous units.
They should possess a generated identity, class, traits, appearance, and
history within that run.

Examples include Sir Duncan, a fearless holy and possibly drunk paladin, and
Steve the Adequate, a modest fighter whose continued survival becomes part of
the player's story. The purpose is not scripted character drama. It is to
allow ordinary simulation outcomes to become memorable.

### 6.3 Procedural Names and Merchants

Generated names should support understated humour without becoming the sole
source of the game's identity. Examples include Bob the Brave, Kevin the
Unfortunate, Gerald the Mostly Competent, and Mildred the Unexpected.

Merchants should be identifiable characters rather than anonymous shops. A
merchant such as Bork Ironwallet may have a recognisable appearance, unusual
stock, and a chance to recur within a run. Possible stock may include explosive
cheese, cursed relics, or other game-appropriate absurdities.

### 6.4 Events

Events interrupt predictable progression and introduce temporary opportunities
or threats. The initial event vocabulary includes:

* **Treasure Goblin** — a valuable enemy that must be defeated before escape.
* **Fairy Blessing** — a temporary global enhancement.
* **Mimic Invasion** — enemies appear as suspicious treasure chests.
* **Sheep Parade** — a low-threat or beneficial unusual wave.
* **Blood Moon** — temporary changes to enemy behaviour and world conditions.
* **Goblin Festival** — a themed and potentially dangerous event.
* **Meteor Shower** — environmental battlefield disruption.
* **Hero Arrival** — a generated adventurer joins the defence.
* **Wandering Merchant** — a temporary shop becomes available.

Events should change a run without invalidating the player's accumulated
understanding of its systems.

## Section 7 — Changing Worlds

The environment shall evolve alongside the threats faced by the player.
Biomes are not intended to be simple background replacements. They may affect
visual palette, terrain, decoration, enemy probability, event probability,
weather, and gameplay modifiers.

The initial biome vocabulary includes forests, deserts, frozen wastes, haunted
marshes, crystal caverns, volcanoes, infernal regions, void regions, and
celestial planes.

World conditions may include rain, fog, snow, meteor showers, blood moons,
eclipses, and auroras. Conditions should influence game rules when appropriate.
For example, winter may reduce enemy movement while strengthening ice effects
and weakening fire effects.

Changing worlds visually communicate how far a run has progressed. They should
make escalation visible before it is fully explained through text or numbers.

## Section 8 — Procedural Pixel Art

Procedural pixel art is central to the identity of Dungeon Defense. The game
should not depend primarily on a fixed library of finished sprites. Instead,
the Locomotion Engine should eventually support generated visual variation that
remains coherent with the game's pixel-art direction.

An enemy may be assembled from a body, head, skin, eyes, helmet, weapon,
armour, cape, accessories, and palette. Two enemies may share a gameplay
definition while appearing as different individuals.

The same approach may eventually support towers, heroes, merchants, monsters,
dragons, weapons, armour, relic icons, trees, rocks, buildings, and decorative
world content.

The desired outcome is not perfect modern pixel art. It is charming generated
pixel art with personality. Minor irregularity is acceptable where it supports
the feeling that the world is alive and specific to the current run.

## Section 9 — Emergent Stories

Emergent stories are the primary reason for combining endless defence,
procedural content, persistent heroes, relics, events, and visual variation.
The game should create stories that arise from systems interacting rather than
from a fixed narrative sequence.

A successful player memory may involve surviving a Blood Moon because Steve the
Adequate held one path until a Dragon Egg hatched, while a previously acquired
relic unexpectedly strengthened summoned creatures. The systems should make
such a story possible without requiring it to be authored in advance.

Tower-defence mechanics provide the stable structure of the game. Procedural
systems provide the variation and personal history that make one run distinct
from another.

## Section 10 — Tone

Dungeon Defense combines tabletop fantasy, old-school pixel games, unusual
browser-game energy, and roguelite unpredictability. Its tone shall be fun,
weird, charming, surprising, slightly silly, and increasingly epic.

The game should avoid cynicism, manipulative progression systems, and humour
that overwhelms tactical clarity. Absurdity is valuable when it creates
memorable identity or strategic variation. It is not a substitute for readable
rules or satisfying defence decisions.

The intended feeling is that the game contains many small unnecessary details
because those details give the world personality and make a run worth
remembering.

## Section 11 — Relationship to the Locomotion Engine

The Locomotion Engine is the reusable architectural product. It provides
capabilities such as entities, definitions, procedural generation, runtime
systems, world generation, procedural visual generation, rendering, and other
general game-framework capabilities.

Dungeon Defense is a consumer of those capabilities. It owns its towers,
enemies, dragons, relics, fantasy eras, boss rules, tower evolution, wave
composition, game-specific balance, humour, and content.

This separation permits Dungeon Defense to become highly specific and
deliberately unusual without making the Locomotion Engine tower-defence
specific. The engine provides capability. The game provides content and rules.

## Section 12 — Vision Summary

Dungeon Defense is an endless procedural fantasy tower-defence game in which a
small pixel-art kingdom begins by defending itself from rats and goblins and
eventually confronts dragons, demons, titans, and reality-breaking cosmic
threats.

Towers evolve, bosses are generated, heroes acquire identities, merchants bring
unusual relics, worlds transform through fantasy eras, and visual content gains
procedural variation. The objective is not simply to survive another wave. It
is to create a run full of specific, ridiculous, and repeatable-in-principle
stories that cannot occur in exactly the same way twice.
