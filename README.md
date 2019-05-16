* LANDSLIDE
* Background and Overview
(Game based off http://www.avalanchegame.org/)
    * Create a simple yet addicting game, with randomly / procedurally generated content and basic platforming 
physics
    * Player can run left and right, as well as jump
    * Squares of different sizes fall randomly from sky and stack up for player to jump off
    * Water slowly rises from bottom that kills player

* Functionality and MVP Features

    * Player can move side to side, jump, wrap around screen horizontally, plays animation on death
    * Squares fall from the sky and stack up on each other
    * Player doesn't move thru squares, can jump on top of squares, can either jump off sides of squares or do one midair double-jump
    * Water slowly rises from bottom and kills player
    * Shows current height and max achieved height
    * Player can be crushed to death by falling square

* Architecture and Technologies
    * Just canvas?  Maybe something to play sound effects

Timeline
Day 0:
 Study Canvas and basic platforming JS
 Wireframe

Day 1:

 Render Player that can run back and forth, wrap around screen edges, jump.  (Double jump?)
 Start basic squares as terrain that player can't move thru and can jump off top of


Day 2:
 Finish square collisions with player
 Squares fall from random position on sky and randomly sized
 Squares stack on hitting each other

 Player is squashed if square collides while he is not airborne

Day 3 (weekend):
  "Camera" pans with player height
  Walljumping?
  Finishing unfinished MVPS
  Height tracker / max height tracker

Day 4:
  Add styling, animations for different things (running, jumping, player death)
  Sounds for jumping, block stopping, crushing, Background music track
