# Custom Items

This page will show you how to add items to slot types, and use render layers to render on the entity wearing the item.

## Adding Items To Slots

1. Make a .json file in `data/curios/tags/items`, and add the code to add items to slots. File name should match the slot identifier.
```json
{
    "replace": false, // When true, replaces data from lower priority addonpacks [optional] [default=false]
    "values": ["namespace:ring_item"] // Items that can be placed into the slot [optional] [default=[]]
}
```

This should register the item with the id `namespace:ring_item` into whatever slot was intended. In this case, the file name was `ring.json`, so this would be in a `ring` slot.

## Rendering Items On Entities

1. When creating an item through the default palladium methods (in `addon/namespace/items`), add this argument to your item to apply the render layer.
```json
{
    "type": "palladium:default",
    "max_stack_size": 1,
    "render_layers": {
        "curios:ring": [
            "namespace:ring_render_layer"
        ]
    }
}
```
`curios:ring` is the id of the curios slot, which in this case is ring.
`namespace:ring_render_layer` is the render layer used when the item is in the correct slot. See the page on render layers for more information.