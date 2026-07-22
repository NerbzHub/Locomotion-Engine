# Dungeon Defense Balance Guide

**Scope:** Standard difficulty, Gate Watch campaign node.

## Economy targets

| Moment | Target player choice | Rationale |
| --- | --- | --- |
| Opening | Two Archers, or one Archer with gold held for wave-one rewards | A clear first placement without forcing a single build. |
| After wave 1 | At least 79 total earned gold after one Archer purchase | Supports a Mage, Sentinel, or an early upgrade decision. |
| After wave 2 | A specialised damage/support direction should be visible | Beetle armour asks for damage, range, or slow choices. |
| Final wave | Warden and elite rewards finance recovery, not an automatic win | Boss pressure remains meaningful. |

## Authored income

Income is calculated by `waveEconomySummary()` from enemy rewards, elite
modifiers, boss reward, and each wave clear bonus. This avoids a second balance
table that can drift from playable content.

| Wave | Enemy rewards | Clear bonus | Total income |
| --- | ---: | ---: | ---: |
| 1 | 42 | 12 | 54 |
| 2 | 66 | 18 | 84 |
| 3 | 146 | 26 | 172 |

## Review rule

Compare deterministic telemetry from at least three seeds per map/difficulty
before changing a cost or reward. Record the seed, tower purchases, leaks, and
wave report alongside the change rationale.
