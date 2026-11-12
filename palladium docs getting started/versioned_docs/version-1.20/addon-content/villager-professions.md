# Villager Professions

Villager Professions are the "jobs" that villagers can acquire by finding a compatible workstation. This page will walk you through the steps of adding one yourself.

## Adding a POI Type
POI Type (= Point of Interest Type) is an object that determines detectable blocks in the game. It is used by bees to find their nests, but also by villagers to find a workstation. Adding one is simple as that:

```json title="addon/<namespace>/poi_types/<name>.json"
{
  "block": "minecraft:redstone_lamp"
}
```
You can also add "max_tickets" and "valid_range" settings, but they will fallback to 1 which is the usual values for villager workstations. So a simple json like that is enough.


## Adding the POI Type to the tag
To let Minecraft know that our new POI type is suitable for villagers, we need to add it to `minecraft:acquirable_job_site` tag. Simply add a file as following:  
```json title="data/minecraft/tags/point_of_interest_type/acquirable_job_site.json"
{
  "values": [
    "test:redstone_lamp"
  ]
}
```
`test:redstone_lamp` is supposed to replaced with the ID of your POI type from step 1.


## Adding the Profession
Adding the actual profession is also very easy:

```json title="addon/<namespace>/villager_professions/<name>.json"
{
  "poi_type": "test:redstone_lamp",
  "sound_event": "minecraft:entity.villager.work_librarian"
}
```
`poi_type` must be the ID of your newly made POI type!


## Textures
A villager profession needs two texture: One for the normal villager, and one for the zombified villager. The texture locations are:  
`assets/<namespace>/textures/entity/villager/profession/<name>.png`  
`assets/<namespace>/textures/entity/zombie_villager/profession/<name>.png`  
You can use MC's textures as a template.

You can also decide how the model for the villager hat will be like if you provide a mcmeta file like this next to the texture:
```json title="assets/<namespace>/textures/entity/villager/profession/<name>.png.mcmeta"
{
    "villager": {
        "hat": "full"
    }
}
```
The `hat` setting can either be `none`, `partial` or `full`. This file is however not needed.

[Click here to the files from the example pack.](https://github.com/ThreeTAG/Palladium/tree/1.20/main/run/addonpacks/Test%20Pack/assets/test/textures/entity)