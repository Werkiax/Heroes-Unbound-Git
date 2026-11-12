# Useful Functions

## Powers
`palladium.powers.getPowerIds(LivingEntity entity)`  
Returns a list of the entity's current power IDs.

`palladium.powers.getPowerIdsForNamespace(LivingEntity entity, String namespace)`  
Returns the IDs of the powers the entity currently has, filtered by the namespace

## Superpowers

`palladium.superpowers.setSuperpower(LivingEntity entity, ResourceLocation powerId)`  
Sets the entity's superpowers to just the given one

`palladium.superpowers.setSuperpowerIds(LivingEntity entity, ResourceLocation... powerIds)`  
Sets the entity's superpowers to the given ones

`palladium.superpowers.hasSuperpower(LivingEntity entity, ResourceLocation powerId)`  
Tests if the entity has the given superpower

`palladium.superpowers.addSuperpower(LivingEntity entity, ResourceLocation powerId)`  
Adds a superpower to the entity

`palladium.superpowers.removeSuperpower(LivingEntity entity, ResourceLocation powerId)`  
Removes a superpower to the entity

`palladium.superpowers.removeAllSuperpowers(LivingEntity entity)`  
Removes all superpowers from an entity

## Abilities

`palladium.abilities.getEntries(LivingEntity entity)`  
Returns all ability entries from the given entity

`palladium.abilities.getEntries(LivingEntity entity, ResourceLocation abilityId)`  
Returns all ability entries of the given ability type from the entity

`palladium.abilities.getEntry(LivingEntity entity, ResourceLocation powerId, String abilityKey)`  
Returns a specific ability entry from a specific power

`palladium.abilities.isUnlocked(LivingEntity entity, ResourceLocation powerId, String abilityKey)`  
Checks if a specific ability entry is unlocked

`palladium.abilities.isEnabled(LivingEntity entity, ResourceLocation powerId, String abilityKey)`  
Checks if a specific ability entry is enabled

`palladium.abilities.hasPower(LivingEntity entity, ResourceLocation powerId)`  
Checks if the entity has that power (can be superpower or power of any source)


## Scoreboard

`palladium.scoreboard.getScore(Entity entity, String objective, int fallback)`  
Gets the entity's score for the given objective, or the fallback value if the entity has no score.  
The `fallback` argument is optional and defaults to 0.

`palladium.scoreboard.setScore(Entity entity, String objective, int value)`  
Sets the entity's score for the given objective to the given value.

`palladium.scoreboard.addScore(Entity entity, String objective, int value)`  
Adds the given value to the entity's score for the given objective.

`palladium.scoreboard.subtractScore(Entity entity, String objective, int value)`  
Removes the given value from the entity's score for the given objective.

## Animation

`palladium.animations.getAnimationTimerAbilityValue(LivingEntity entity, ResourceLocation powerId, String abilityKey, float partialTicks)`  
Gives you the animation progress of the given ability, a float ranging from 0.0 to 1.0

`palladium.animations.getAnimationTimerAbilityValue(LivingEntity entity, ResourceLocation powerId, String abilityKey, float partialTicks, float start, float end)`  
Gives you the animation progress of the given ability, a float ranging from 0.0 to 1.0. BUT you can determines which
part of the progress you want to look at. If the animation ability goes up to 30, and you only want to see the progress
of between 10 and 20 you can use this function.

`palladium.animations.getInbetweenProgress(float progress, float startingPoint, float endPoint)`  
Calculcates the progress of a bigger number, given from two points. If `progress` is a float that goes up to 30, and you
want to see how far the number is from 10-20, you can use the other 2 parameters to determine that.