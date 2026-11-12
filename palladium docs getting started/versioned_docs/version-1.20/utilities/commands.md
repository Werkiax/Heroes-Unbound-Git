# Commands
The mod adds the following commands:

- `/superpower <set/add/remove> <Power ID> [Entity]` which allows you to set/add/remove the superpower of an entity.

- `/ability <lock/unlock> <Entities> <Power ID> <Ability Key>` Locks/unlocks abilities which have the ability to be bought.
- `/energybar value get <Entity> <Power ID> <Energy Bar Key>` Gets the value of an energy bar
- `/energybar value set <Entity> <Power ID> <Energy Bar Key> <value>` Sets the value of an energy bar
- `/energybar value add <Entity> <Power ID> <Energy Bar Key> <value>` Adds to the value of an energy bar
- `/energybar value subtract <Entity> <Power ID> <Energy Bar Key> <value>` Subtracts from the value of an energy bar
- `/energybar max get <Entity> <Power ID> <Energy Bar Key>` Gets the max value of an energy bar
- `/energybar max set <Entity> <Power ID> <Energy Bar Key> <value>` Sets the max value of an energy bar
- `/energybar max reset <Entity> <Power ID> <Energy Bar Key> <value>` Resets the max value of an energy bar


## Selectors
You can also filter entities by a power in an entity selector like:

`/effect give @e[palladium.power=test:custom_projectile_test] minecraft:levitation 3`  
This will only give entities the levitation effect if they have the `test:custom_projectile_test` power