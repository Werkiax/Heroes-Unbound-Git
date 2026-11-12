---
sidebar_position: 5
---

# Multiversal Variants

Multiversal variants let a single item exist in multiple looks, one per universe. A "Wooden Chestplate" can look one way in Earth-1234 and completely different in Earth-12345, while still being the same item.

Players switch between variants in survival using the **Multiversal Extrapolator** and the **Multiversal Iterator** block (see [In-Game Conversion](#in-game-conversion) below).

The system is built from three parts:

1. **Universes**, defined in the `palladium/multiverse` datapack registry.
2. **Categories**, a data component on items that says "this item participates in variant switching".
3. **Variant definitions**, entries in the `palladium/multiversal_item_variant` datapack registry that tie a universe to appearances for one or more categories.

---

## Universes

A universe is a datapack registry entry. Create a JSON file at:

```
data/<namespace>/palladium/multiverse/<id>.json
```

A universe has no required fields, so the smallest possible file is just `{}`.

| Field                 | Type    | Required | Fallback | Description                                                                                                                     |
|-----------------------|---------|----------|----------|---------------------------------------------------------------------------------------------------------------------------------|
| `weight`              | Integer | No       | `50`     | How likely the extrapolator is to land on this universe, relative to all other universes. `0` means it is never found randomly. |
| `conditional_weights` | List    | No       | `[]`     | List of weight overrides that apply when a [condition](../logic/conditions) is met. The first matching entry wins.              |

Each entry in `conditional_weights` looks like this:

| Field    | Type      | Required | Description                                                      |
|----------|-----------|----------|------------------------------------------------------------------|
| `weight` | Integer   | Yes      | The weight to use while the condition is true.                   |
| `if`     | Condition | Yes      | The condition, tested against the player using the extrapolator. |

Conditional weights are useful for gating universes: set the base `weight` to `0` and add a conditional weight that only applies when the player fulfills some requirement, and the universe can only be found by those players.

The display name of a universe comes from the lang key `palladium.universe.<namespace>.<path>`:

```json title="assets/mypack/lang/en_us.json"
{
  "palladium.universe.mypack.earth-1234": "Earth-1234"
}
```

:::info

To avoid multiple occurences of the same universes across addon packs, I advise for everyone to use the `c` (for "common") namespace for declaring them.  
That means adding universes like this:

| Universe     | Path                                          | ID             |
|--------------|-----------------------------------------------|----------------|
| Earth-616    | data/c/palladium/multiverse/earth-616.json    | c:earth-616    |
| Earth-1      | data/c/palladium/multiverse/earth-1.json      | c:earth-1      |
| Earth-199999 | data/c/palladium/multiverse/earth-199999.json | c:earth-199999 |

:::

---

## Categories

A category is just an ID stored in the `palladium:multiversal_category` data component. Every item that carries the same category ID belongs to the same "family" and can be switched between all variants that cover that category.

You can set it directly on an item:

```json title="addon/mypack/item/cool_helmet.json (excerpt)"
"properties": {
  "components": {
    "palladium:multiversal_category": "mypack:cool_armor_helmet"
  }
}
```

The currently active variant is stored in a second component, `palladium:multiversal_variant`. You will rarely write this one by hand, but setting it in the item's default components decides which variant a freshly crafted or spawned item uses. Without it, an item that uses the variant item model has no appearance to fall back on, so you should always give such items a default.

### Suit Set Shortcut

Since armor is the main use case, [suit sets](suit-sets) have a shortcut that sets up both components for all four pieces at once:

```json title="addon/mypack/suit_set/cool_armor.json (excerpt)"
"multiversal_variant": {
  "category": "mypack:cool_armor",
  "default": "mypack:cool_armor_classic"
}
```

| Field      | Type | Required | Description                                                                                                                                                                     |
|------------|------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `category` | ID   | Yes      | Base category ID. Each piece gets the slot name appended, so the helmet ends up with `mypack:cool_armor_helmet`, the chestplate with `mypack:cool_armor_chestplate`, and so on. |
| `default`  | ID   | No       | The variant definition every piece starts out with.                                                                                                                             |

---

## Variant Definitions

A variant definition describes one look in one universe. Create a JSON file at:

```
data/<namespace>/palladium/multiversal_item_variant/<id>.json
```

| Field        | Type   | Required | Description                                                                                                                          |
|--------------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------|
| `universe`   | ID     | Yes      | The universe this variant belongs to.                                                                                               |
| `categories` | Object | Yes      | Map of category ID to an [appearance](#appearances). One variant can cover several categories, e.g. all four pieces of an armor set. |

The display name comes from the lang key `palladium.multiversal_item_variant.<namespace>.<path>` and is shown in the item tooltip, together with the universe name.

:::info

To show variants in a creative tab, add a **variant group** to the tab's (or a section's) `items` list.
See [Creative Tabs → Variant Groups](creative-tabs#variant-groups).

:::

### Appearances

Each value in the `categories` map defines how items of that category look while this variant is active.

| Field           | Type   | Required | Description                                                                                                                                                           |
|-----------------|--------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `item_model`    | ID     | No       | The item model to use. `mypack:some_model` points to `assets/mypack/models/item/multiversal_variant/some_model.json`.                                                 |
| `render_layers` | Object | No       | Render layers applied while the item is equipped, in the same slot-keyed format as the [`palladium:render_layers` component](data-components#palladiumrender_layers). |
| `components`    | Object | No       | Data components written onto the item when this variant is selected, in the same format as the vanilla `components` field. Removals use the `!component` syntax.      |

All fields are optional, but an appearance without any of them does nothing.

`components` lets a variant change more than looks, e.g. give one variant different armor or attribute modifiers:

```json
{
  "item_model": "mypack:reinforced_helmet",
  "components": {
    "minecraft:attribute_modifiers": [
      {
        "type": "minecraft:armor",
        "id": "mypack:reinforced_helmet",
        "amount": 4,
        "operation": "add_value",
        "slot": "head"
      }
    ]
  }
}
```

Switching to another variant takes these components back off first, so they never carry over. A component is only removed if it still holds the value the variant gave it, meaning later edits from other sources are kept.

:::warning
The components are written when a variant is *selected* — through the multiversal iterator, the extrapolator, scrolling in an inventory, or a creative tab. An item that only carries a default variant in its own `components` never went through that step, so its variant components are missing. Set those on the item itself as well if you rely on a default variant.
:::

### Item Models

For `item_model` to have any effect, the item needs to use the `palladium:multiversal_variant` item model type in its client-side item definition:

```json title="assets/mypack/items/cool_helmet.json"
{
  "model": {
    "type": "palladium:multiversal_variant"
  }
}
```

The model type looks up the stack's current variant and renders the appearance's `item_model`. The referenced models are regular item models, they just live in the `models/item/multiversal_variant/` subfolder:

```json title="assets/mypack/models/item/multiversal_variant/cool_helmet_classic.json"
{
  "parent": "minecraft:item/generated",
  "textures": {
    "layer0": "mypack:item/cool_helmet_classic"
  }
}
```

The model type also accepts optional `transformation` and `tints` fields, matching the vanilla `minecraft:model` type. If a stack has no variant (or its variant has no appearance for the item's category), the missing model is rendered, which is why a default variant on the item is important.

---

## In-Game Conversion

Two things let players switch variants in survival:

- The **Multiversal Extrapolator** is an item that, on use, searches the multiverse for a random universe (weighted by the universe `weight` fields). Once designated, its tooltip shows the universe and it can be used in the iterator. It has 4 durability and takes 1 damage per converted item.
- The **Multiversal Iterator** is a block with two modes:
  - Used normally, it opens an anvil-style menu: extrapolator in the top slot, any item with a matching category in the bottom slot, and the result slot offers the item converted to a variant of the extrapolator's universe. If there are several possible results, a button cycles through them.
  - With an armor stand placed on top of the block, right-clicking it opens the suit stand menu instead. It shows the stand with its equipment and lets you page through full-set conversions, applying a whole variant to every equipped piece at once.

Which conversions are available is entirely recipe-driven. By default Palladium ships a single recipe that enables the component-based variant switching described on this page, but packs can add concrete conversion recipes (turn item A into item B in universe X) or remove the default behaviour altogether. See [Recipes & Ingredients](recipes#multiversal-iterator-recipes) for the recipe formats.

There are also two [custom ingredient types](recipes#ingredient-types) to match items by their universe or category in any recipe.

---

## Examples

### Basic: One Armor Set, Two Universes

A wooden armor suit set that starts out as oak and can be converted to a birch look found in a second universe.

Two universes (weight left at the default 50):

```json title="data/mypack/palladium/multiverse/earth-1234.json"
{}
```

```json title="data/mypack/palladium/multiverse/earth-12345.json"
{}
```

The suit set opts into variants:

```json title="addon/mypack/suit_set/wooden_armor.json (excerpt)"
"multiversal_variant": {
  "category": "mypack:wooden_armor",
  "default": "mypack:oak_wood_armor"
}
```

Two variant definitions, one per universe:

```json title="data/mypack/palladium/multiversal_item_variant/oak_wood_armor.json"
{
  "universe": "mypack:earth-1234",
  "categories": {
    "mypack:wooden_armor_helmet": { "item_model": "mypack:oak_wooden_helmet" },
    "mypack:wooden_armor_chestplate": { "item_model": "mypack:oak_wooden_chestplate" },
    "mypack:wooden_armor_leggings": { "item_model": "mypack:oak_wooden_leggings" },
    "mypack:wooden_armor_boots": { "item_model": "mypack:oak_wooden_boots" }
  }
}
```

```json title="data/mypack/palladium/multiversal_item_variant/birch_wood_armor.json"
{
  "universe": "mypack:earth-12345",
  "categories": {
    "mypack:wooden_armor_helmet": { "item_model": "mypack:birch_wooden_helmet" },
    "mypack:wooden_armor_chestplate": { "item_model": "mypack:birch_wooden_chestplate" },
    "mypack:wooden_armor_leggings": { "item_model": "mypack:birch_wooden_leggings" },
    "mypack:wooden_armor_boots": { "item_model": "mypack:birch_wooden_boots" }
  }
}
```

Plus the client-side item definitions (`assets/mypack/items/wooden_helmet.json` etc.) using the `palladium:multiversal_variant` model type, and the referenced models under `assets/mypack/models/item/multiversal_variant/`.

### Advanced: Conditional Universe with Render Layers

A universe that can only be found by players who have unlocked a specific power lends itself to "endgame" variants. The variant here also applies a glowing render layer while worn, on top of the model swap:

```json title="data/mypack/palladium/multiverse/dark-dimension.json"
{
  "weight": 0,
  "conditional_weights": [
    {
      "weight": 200,
      "if": {
        "type": "palladium:has_power",
        "power": "mypack:sorcery"
      }
    }
  ]
}
```

```json title="data/mypack/palladium/multiversal_item_variant/dark_cool_armor.json"
{
  "universe": "mypack:dark-dimension",
  "categories": {
    "mypack:cool_armor_chestplate": {
      "item_model": "mypack:dark_cool_chestplate",
      "render_layers": {
        "chest": ["mypack:dark_glow", "mypack:dark_cape"]
      }
    },
    "mypack:cool_armor_helmet": {
      "item_model": "mypack:dark_cool_helmet"
    }
  }
}
```

Since the base weight is `0`, extrapolators used by regular players never find the Dark Dimension. Players with the `mypack:sorcery` power find it with a very high weight instead.
