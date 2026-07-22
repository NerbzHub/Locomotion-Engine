# FEEDBACK AND IDEAS DOC

## THIS DOC IS TO NOTE DOWN IDEAS AND FEEDBACK FROM OTHERS FOR REFERENCE.

## KEY = FI# - So FI(Feedback Idea) then it is iterative numerically so that it is easy to reference which FI is being mentioned

### FI1. BUILD TOWER CONFIRMATION

**Status: implemented on 2026-07-21.** A valid placement now opens a
confirmation dialog that names the tower, cost, and tile. The simulation pauses
until the player confirms or cancels, so a misclick no longer spends gold.

There was a few times in testing that a misclick was detrimental and accidentally built a tower where I didn't want it.

#### POTENTIAL FIXES

1. If there was a pop up for confirmation to build the tower. "Confirm Build?" yes or no
I think that wouldn't cause too much friction for the user in creating them but the minor inconvinience trumps the issue of miscliking and building a tower at the exit or in the middle of nowhere.

2. A little tick and cross on either side of the tower, top right and left corners above the tower. Do this rather than the pop up box asking yes or no 

### FI2. MAP INTERACTABLE BEFORE GAME STARTS

User feedback is that it is confusing that they can press and place towers before the game starts. The game board shouldn't be visible until it is needed.

#### POTENTIAL FIXES

1. Menu on first load, you click "enter the dungeon" and it loads to choose which level to select. Once selected, only then does it actually show the map. This would most likely need to utilise a state machine or something like that.

### FI3. THE GOLD, LIVES, WAVE NEED TO BE EASIER TO SEE

They're too hidden and not obvious to actually see at all times.

#### POTENTIAL FIXES

1.Have them in the top left of the map so that they are visible at all times at a glance. Please see image example GrassBiome.png and IceBiome.png for the UI. Similar UI to RTS games. Move the settings menu to the top right of the game view too for easy access.