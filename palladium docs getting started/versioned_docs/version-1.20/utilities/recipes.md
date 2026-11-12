# Recipes

Since Palladium Addon Packs function as datapacks, you can use any normal vanilla recipe json file in an addon.  
An online tool to generate files for that is https://crafting.thedestruc7i0n.ca (make sure to select the correct game version).

## Tailoring
Palladium also adds 2 new custom recipe types, for its Tailoring Bench. Both allow you to define recipes for it.

### `palladium:item_tailoring`

| Field                | Type              | Required?                                 | Default/Fallback | Description                                                                                                                                  |
|----------------------|-------------------|-------------------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `results`            | object            | required (must contain at least one item) | —                | Map of armor slots to the result items. Possible slots are: `head`, `chest`, `legs`, `feet`.                                                 |
| `ingredients`        | array             | required (non‑empty)                      | —                | Shapeless input ingredients. Each element is a `SizedIngredient` object (see table below). If empty, deserialization fails.                  |
| `tool`               | Ingredient        | required (must be non‑empty)              | —                | A standard Minecraft `Ingredient` JSON describing the required tailoring tool. If empty/invalid, deserialization fails.                      |
| `title`              | Text Component    | required                                  | —                | Localized text shown for the recipe title. Uses Minecraft `Component` JSON format (can be a raw string or structured object).                |
| `tool_icon`          | Resource Location | optional                                  | `null`           | Resource location for the icon used in the tailoring menu tool slot. Example: `"minecraft:item/diamond_sword"` or a custom texture location. |
| `category`           | Resource Location | optional                                  | `null`           | Resource location identifying a category for grouping recipes together in the tailoring menu recipe book.                                    |
| `requires_unlocking` | boolean           | optional                                  | `true`           | If `true`, the recipe requires unlocking before it appears and can be crafted.                                                               |

#### `ingredients`
Each element must be a non‑empty `Ingredient` with a positive count.

| Field        | Type           | Required?            | Default/Fallback | Notes                                                                                    |
|--------------|----------------|----------------------|------------------|------------------------------------------------------------------------------------------|
| `ingredient` | Ingredient     | required (non‑empty) | —                | Standard Minecraft `Ingredient` JSON (item, tag, or alternatives). Cannot be empty here. |
| `count`      | integer (>= 1) | optional             | `1`              | Number of items required for this ingredient. Must be positive.                          |

#### Example
```json
{
  "type": "palladium:item_tailoring",
  "results": {
    "head": "minecraft:diamond_helmet",
    "chest": "minecraft:diamond_chestplate",
    "legs": "minecraft:diamond_leggings",
    "feet": "minecraft:diamond_boots"
  },
  "ingredients": [
    {
      "ingredient": {
        "item": "minecraft:diamond"
      },
      "count": 24
    }
  ],
  "tool": {
    "item": "minecraft:shears"
  },
  "tool_icon": "palladium:item/empty_tool_slot_shears",
  "title": "Diamond Armor",
  "category": "test:vanilla_armor",
  "requires_unlocking": false
}
```

### `palladium:suit_set_tailoring`

Works essentially the same, but can directly use a suit set to declare its results.

| Field                | Type              | Required?                    | Default/Fallback | Description                                                                                                                                  |
|----------------------|-------------------|------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `suit_set`           | object            | required                     | —                | ID of a suit set that will be the result of this recipe                                                                                      |
| `ingredients`        | array             | required (non‑empty)         | —                | Shapeless input ingredients. Each element is a `SizedIngredient` object (see table below). If empty, deserialization fails.                  |
| `tool`               | Ingredient        | required (must be non‑empty) | —                | A standard Minecraft `Ingredient` JSON describing the required tailoring tool. If empty/invalid, deserialization fails.                      |
| `title`              | Text Component    | required                     | —                | Localized text shown for the recipe title. Uses Minecraft `Component` JSON format (can be a raw string or structured object).                |
| `tool_icon`          | Resource Location | optional                     | `null`           | Resource location for the icon used in the tailoring menu tool slot. Example: `"minecraft:item/diamond_sword"` or a custom texture location. |
| `category`           | Resource Location | optional                     | `null`           | Resource location identifying a category for grouping recipes together in the tailoring menu recipe book.                                    |
| `requires_unlocking` | boolean           | optional                     | `true`           | If `true`, the recipe requires unlocking before it appears and can be crafted.                                                               |

#### Example
```json
{
  "type": "palladium:suit_set_tailoring",
  "suit_set": "test:wood",
  "ingredients": [
    {
      "ingredient": {
        "item": "minecraft:oak_wood"
      },
      "count": 24
    }
  ],
  "tool": {
    "item": "minecraft:shears"
  },
  "tool_icon": "palladium:item/empty_tool_slot_shears",
  "category": "test:pack_armor"
}
```