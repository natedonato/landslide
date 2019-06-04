
* LANDSLIDE

    * Randomly generated content and basic platforming physics
    * Player can run left and right, jump, and walljump off obstacles
    * Squares of different sizes fall randomly from sky and stack up for player climb
    * Water slowly rises from bottom that kills player
    * Player can be crushed to death by falling square

* Architecture and Technologies
    * MongoDB, Express (& Node) for saving scores

(Game based off http://www.avalanchegame.org/)

# Landslide

[LIVE DEMO](https://landslidejs.herokuapp.com/) 

   Landslide is an online platforming / climbing game based on the flash game Avalance (previously hosted on thegamehomepage.com, now defunct).  It is built from scratch in JavaScript and HTML, with an Express.js server and MongoDB backend to host player high scores in an online leaderboard.

## High Score Leaderboard
   Landslide employs a streamlined backend server to persist high scores.  Scores are posted to external cloud storage using MongoDB Atlas to hold the collections in a NoSQL database.  Any player may post any score, but only the top 10 scores are displayed on the main leaderboard, incentivizing players to keep playing and challenging each other to get the highest possible score.
      <img src="https://raw.githubusercontent.com/natedonato/landslide/master/productionmanual/scores.png" > 

## Mobile Design
   Landslide reroutes mobile users to /mobile, a page hosting the mobile opimized version of the game.  The mobile page features responsive CSS styling to make sure the game takes up the maximum available space on the device while maintaining a playable aspect ratio and not overflowing the smaller screen.  Custom mobile controls are implemented using HTML Web Api Touch events to allow users to play the game without use of a keyboard / mouse.
   <img src="https://raw.githubusercontent.com/natedonato/landslide/master/productionmanual/mobile.jpg" width="400px"> 
