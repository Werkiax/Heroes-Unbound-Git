# Scoreboard Sync
A great tool in pack making is the scoreboard. The problem with it however is that a player's score is only synchronized with the player's game when it's displayed somewhere (e.g. sidebar, list, etc.). So if you want to use a player's score in render layers, dynamic textures, etc. this will causes issues, but Palladium offers a way around that.

## Scoreboard values in ability conditions:
Then you don't need to do anything. Ability conditions are handled on the server-side, so it's fully functioning there.


## Scoreboards values in render layers condition, dynamic texture variables, etc.:
Then your first step is to create the following file:  

````json title="data/<namespace>/tracked_scores.json"
{
  "objectives": [
    "test"
  ]
}
````

In this `objectives` array you can now put in all the names of the objectives you want to synchronize.

Then you can use them without problems as `palladium:objective_score`-conditions on render layers, or as `palladium:objective_score`-texture variables in dynamic textures (More info on those in their respective html-documentation files).