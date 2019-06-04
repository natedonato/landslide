# Landslide

[LIVE DEMO](https://landslidejs.herokuapp.com/) 

   Landslide is an online platforming / climbing game based on the flash game Avalance (previously hosted on thegamehomepage.com, now defunct).  It is built from scratch in JavaScript and HTML, with an Express.js server and MongoDB backend to host player high scores in an online leaderboard.

## Dynamic Gameplay
   Landslide features randomly generated content for endless replayability, with blocks dropping from unpredicable positions with randomized size and falling speeds to keep players on the edge.  Vector based physics calculations create satisfying gravity and friction effects, making gameplay and movement smooth and satisfying.  Collision detection accurately calculates which edges of a block players touch, allowing players to jump off the sides of falling blocks or stand on top of static blocks while avoiding being crushed by falling blocks from above.  Water slowly rises behind the player, forcing their movement upwards as the tower height stacks higher and higher.

## High Score Leaderboard
   Landslide employs a streamlined backend server to persist high scores.  Scores are posted to external cloud storage using MongoDB Atlas to hold the collections in a NoSQL database.  Any player may post any score, but only the top 10 scores are displayed on the main leaderboard, incentivizing players to keep playing and challenging each other to get the highest possible score.
      <img src="https://raw.githubusercontent.com/natedonato/landslide/master/productionmanual/scores.png" > 

## Mobile Design
   Landslide reroutes mobile users to /mobile, a page hosting the mobile opimized version of the game.  The mobile page features responsive CSS styling to make sure the game takes up the maximum available space on the device while maintaining a playable aspect ratio and not overflowing the smaller screen.  Custom mobile controls are implemented using HTML Web Api Touch events to allow users to play the game without use of a keyboard / mouse.
   <img src="https://raw.githubusercontent.com/natedonato/landslide/master/productionmanual/mobile.jpg" width="400px"> 
