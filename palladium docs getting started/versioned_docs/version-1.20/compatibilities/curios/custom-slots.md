# Custom Slots

This page will show how to create custom curios slots.

## Slot Creation

1. Make a .json file in `data/namespace/curios/slots`, and add the code to register the slot. The name of the file should be the slots identifier (e.g. ring.json).
```json
{
    "replace": false, // Whether or not to replace slots with the same name from addonpacks with a lower priority [optional] [default=false]
    "size": 2, // Number of slots to be given by default [optional] [default=1]
    "operation": "SET", // Whether to use SIZE to ADD, SET, REMOVE [optional] [default=SET]
    "order": 1000, // Order the slots will appear in the curios gui. Lower numbers appear first [optional] [default=1000]
    "icon": "namespace:slot/ring", // The icon to use for the empty slot [optional] [default=curios:slot/empty_curios_slot]
    "add_cosmetic": true, // Whether or not items in your slot can render on the entity [optional] [default=false]
    "use_native_gui": true, // When false, does not add the slot to the native curios gui [optional] [default=true]
    "render_toggle": true, // Whether or not the render on the entity can be toggled on or off [optional] [default=true]
    "drop_rule": "DEFAULT", // Whether to drop, keep, destroy, or follow the config settings [optional] [default=true] [accepted_values=DEFAULT,ALWAYS_KEEP,ALWAYS_DROP,DESTROY]
    "validators": ["curios:tag"] // The list of registered predicates from the Curios API used by this slot type to validate item insertions. [optional] [default=["curios:tag"]]
}
```
2. Make a .json file in `data/namespace/curios/entities`, and add the code to register the slot to entities. File name does not matter.
```json
{
    "replace": false, // When true, replaces data from lower priority addonpacks [optional] [default=false]
    "entities": ["minecraft:player", "minecraft:zombie"], // The entities to add the slots to, tags are accepted too [optional] [default=[]]
    "slots": ["ring"] // The slots to add to the entities [optional] [default=[]]
}
```

That is all. You should now have a custom curios slot. See the page on Custom Items to add items to the slots.