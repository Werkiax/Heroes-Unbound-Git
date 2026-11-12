---
sidebar_position: 7
---

# Recipes & Ingredients

Palladium adds several recipe types and two custom ingredient types on top of the vanilla recipe system. All of them are regular datapack recipes, so they go into the usual folder:

```
data/<namespace>/recipe/<id>.json
```

Everything vanilla recipes support works here too: tags in ingredients, NeoForge conditions, overriding recipes from other packs by using the same file path, and so on.

---

## Tailoring Recipes

### `palladium:item_tailoring`

Used by the Tailoring Bench. A tailoring recipe consumes ingredients straight from the player's inventory (no crafting grid), damages the tool in the bench's tool slot, and produces up to four armor pieces at once.

| Field                | Type            | Required | Fallback | Description                                                                                                            |
|----------------------|-----------------|----------|----------|--------------------------------------------------------------------------------------------------------------------------|
| `title`              | Text Component  | Yes      | /        | Name shown in the recipe list. Plain strings work, as do translatable components.                                        |
| `results`            | Object          | Yes      | /        | Map of armor slot (`helmet`, `chestplate`, `leggings`, `boots`) to the resulting [item stack](#item-stacks). You can fill any subset of the four slots. |
| `ingredients`        | List            | Yes      | /        | The materials taken from the player's inventory. Each entry is a [sized ingredient](#sized-ingredients). A single entry can also be given directly without the surrounding list. |
| `tool`               | Ingredient      | Yes      | /        | What counts as a valid tool in the bench's tool slot. The tool takes 1 damage per produced piece.                          |
| `tool_icon`          | ID              | No       | /        | Sprite drawn in the empty tool slot as a hint, e.g. `palladium:container/slot/shears`.                                     |
| `category`           | ID              | No       | /        | Groups recipes in the recipe list under a shared headline. The headline text comes from the lang key `palladium.tailoring_recipe.category.<namespace>.<path>`. |
| `requires_unlocking` | Boolean         | No       | `true`   | If true, the recipe only shows up once the player has it unlocked in their recipe book (via advancements or `/recipe give`). Set to `false` for recipes that should always be available. |
| `show_notification`  | Boolean         | No       | `true`   | Whether unlocking the recipe shows the vanilla toast.                                                                      |

#### Sized Ingredients

An ingredient plus an amount:

```json
{
  "ingredient": "minecraft:iron_ingot",
  "count": 24
}
```

`count` defaults to `1` and can be higher than a stack size; the amount is collected across the whole inventory.

#### Item Stacks

Wherever a recipe produces an item, you can either write a plain item ID or an object with components:

```json
"minecraft:iron_helmet"
```

```json
{
  "id": "mypack:cool_helmet",
  "components": {
    "palladium:multiversal_variant": "mypack:cool_armor_classic"
  }
}
```

---

## Item Upgrade Recipes

### `palladium:item_upgrade`

Applied at the vanilla smithing table, in the same template + base + addition layout as netherite upgrades. Instead of producing a fixed item, it installs an [item upgrade](item-upgrades) (an entry of the `data/<namespace>/palladium/item_upgrade/` registry) onto the base item, keeping all of its existing data.

| Field      | Type       | Required | Description                                                                                                             |
|------------|------------|----------|---------------------------------------------------------------------------------------------------------------------------|
| `template` | Ingredient | Yes      | The item in the template slot.                                                                                             |
| `base`     | Ingredient | Yes      | The item receiving the upgrade.                                                                                            |
| `addition` | Ingredient | No       | Optional third slot. Leave it out and the slot stays empty.                                                                |
| `upgrade`  | ID         | Yes      | The item upgrade to install.                                                                                               |

The recipe automatically refuses to match if the base item already has the upgrade, if the upgrade is not applicable to the item, or if it is incompatible with an already installed upgrade.

---

## Multiversal Iterator Recipes

Both menus of the [Multiversal Iterator](multiversal-variants#in-game-conversion) (the anvil-style menu and the suit stand menu) are fully recipe-driven. They look up all recipes of the `palladium:multiversal_iterator` recipe type and offer every conversion that matches the inserted extrapolator and item. You can add as many of these recipes as you like; the results of all matching recipes are merged.

### `palladium:multiversal_variants`

The recipe behind the standard variant switching. It has no settings at all:

```json
{
  "type": "palladium:multiversal_variants"
}
```

It offers every item with a `palladium:multiversal_category` component for conversion into each variant of the extrapolator's universe that covers that category. The result keeps all data of the input item and only swaps the variant component.

Palladium ships this recipe by default as `palladium:multiversal_variants`. If you want the iterator to only ever use your own concrete recipes, you can disable it by overriding the file with a never-loading recipe:

```json title="data/palladium/recipe/multiversal_variants.json"
{
  "neoforge:conditions": [
    { "type": "neoforge:false" }
  ],
  "type": "palladium:multiversal_variants"
}
```

### `palladium:multiversal_conversion`

A concrete conversion: turn a specific input into a specific output in a specific universe.

| Field      | Type       | Required | Description                                                        |
|------------|------------|----------|------------------------------------------------------------------------|
| `input`    | Ingredient | Yes      | What can be placed in the iterator (tags and custom ingredients work). |
| `result`   | Item Stack | Yes      | What comes out. Same [format](#item-stacks) as tailoring results.      |
| `universe` | ID         | Yes      | The extrapolator must be designated to this universe.                  |

Unlike `multiversal_variants`, the result is a fresh stack built from the recipe. It does not copy any data from the input.

In the suit stand menu, all equipped items matching the `input` are converted together on a single page.

---

## Ingredient Types

Palladium registers two custom ingredient types. They work anywhere an `Ingredient` is accepted, in Palladium recipes as well as vanilla crafting, smelting, smithing and recipes from other mods.

### `palladium:universe`

Matches any item stack whose current multiversal variant belongs to the given universe.

```json
{
  "type": "palladium:universe",
  "universe": "mypack:earth-1234"
}
```

| Field      | Type | Required | Description                             |
|------------|------|----------|---------------------------------------------|
| `universe` | ID   | Yes      | The universe the item's variant must be from. |

### `palladium:multiversal_category`

Matches any item stack with the given `palladium:multiversal_category` component.

```json
{
  "type": "palladium:multiversal_category",
  "category": "mypack:cool_armor_chestplate"
}
```

| Field      | Type | Required | Description                     |
|------------|------|----------|-------------------------------------|
| `category` | ID   | Yes      | The category the item must have.    |

---

## Examples

### Basic: Tailoring Recipe

Iron armor tailored from 24 iron ingots with any shears, always visible:

```json title="data/mypack/recipe/iron_armor.json"
{
  "type": "palladium:item_tailoring",
  "title": "Iron Armor",
  "results": {
    "helmet": "minecraft:iron_helmet",
    "chestplate": "minecraft:iron_chestplate",
    "leggings": "minecraft:iron_leggings",
    "boots": "minecraft:iron_boots"
  },
  "ingredients": {
    "ingredient": "minecraft:iron_ingot",
    "count": 24
  },
  "tool": "#c:tools/shear",
  "tool_icon": "palladium:container/slot/shears",
  "requires_unlocking": false
}
```

### Basic: Multiversal Conversion

A stick becomes bread, but only in Earth-12345:

```json title="data/mypack/recipe/stick_to_bread.json"
{
  "type": "palladium:multiversal_conversion",
  "input": "minecraft:stick",
  "result": "minecraft:bread",
  "universe": "mypack:earth-12345"
}
```

### Advanced: Universe-Exclusive Crafting

Since the ingredients work in vanilla recipe types too, you can gate regular crafting behind variant state. A shapeless recipe that only works with an Earth-1234 variant item:

```json title="data/mypack/recipe/multiversal_battery.json"
{
  "type": "minecraft:crafting_shapeless",
  "ingredients": [
    { "type": "palladium:universe", "universe": "mypack:earth-1234" },
    "minecraft:redstone_block"
  ],
  "result": {
    "id": "mypack:multiversal_battery"
  }
}
```
