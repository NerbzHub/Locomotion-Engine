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

**Status: implemented as LE-P01 (2026-07-22).** The game now opens on a title
screen, and the board remains hidden and non-interactive until a mission is
selected and the player begins it.

User feedback is that it is confusing that they can press and place towers before the game starts. The game board shouldn't be visible until it is needed.

#### POTENTIAL FIXES

1. Menu on first load, you click "enter the dungeon" and it loads to choose which level to select. Once selected, only then does it actually show the map. This would most likely need to utilise a state machine or something like that.

### FI3. THE GOLD, LIVES, WAVE NEED TO BE EASIER TO SEE

**Status: implemented as LE-P02 (2026-07-22).** Gold, Lives, and Wave now
remain in the board’s top-left safe zone during play, while Menu/Settings stay
in the top-right.

They're too hidden and not obvious to actually see at all times.

#### POTENTIAL FIXES

1.Have them in the top left of the map so that they are visible at all times at a glance. Please see image example GrassBiome.png and IceBiome.png for the UI. Similar UI to RTS games. Move the settings menu to the top right of the game view too for easy access.

### FI4. THERE IS MORE INFO ON THE SCREEN THAN NEEDED ON MENU

**Status: implemented on 2026-07-23.** Mission setup now follows the direct
level → difficulty → begin flow. Redundant campaign context, duplicate map
controls, the custom-game disclosure, selection summary, and the visible reset
link were removed from the setup screen. Campaign reset remains available from
the in-game Menu under Campaign.

Tester was confused why it said Dungeon Gate. Standard. above the Game Title Dungeon Defense. The custom game options were unnecessary. The tester was confused why there was so many options to achieve the same result.

#### POTENTIAL FIXES
 There should just be the two different option

 Flow:
 1. Enter the dungeon screen
 2. Select level
 3. Select Difficulty
 4. The actual game.

 Once the game is complete, there should be a play again? Or change level.

 This would be a better flow and remove any double ups of information

 I have added screenshots that explains what should be deleted - They are labelled FI4PC.png and FI4Mobile.jpg there are red lines crossing out what shouldn't be visible for this screen.

### FI5. ONCE THE GAME STARTED, THERE WAS A LOT ON THE SCREEN TELLING THE SAME THING

**Status: implemented on 2026-07-23.** Gameplay no longer repeats the selected
mission/difficulty or the selected tower's cost, range, and placement
instruction. The selected tower card and placement/range visuals remain the
primary in-context guidance; important state changes continue through a
screen-reader live region.

There was a few areas where the tester said there was the same information being told in many places.
They knew they chose gate watch and standard so it didn't need to be displayed at the top during gameplay.
They also don't need "Archer ready - tap grass to place" or above the start wave button there is "Archer . 25 gold . range 145. reliable starter. Tap grass to place."
They are being told that information by the archer button being selected and on the button it says "25 gold, reliable starter" and the range is displayed on the screen by the rings. A number 145 means nothing to the player.
To assist, there is a screenshot labelled FI5PC.png that has all of the unnecessary info crossed out in red.

#### POTENTIAL FIXES

1. Remove all of the unnecessary info mentioned and crossed out in FI5PC.png
