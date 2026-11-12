---
sidebar_position: 4
---

# Suit Sets

Suit sets are a shorthand for registering a full set of armor items (helmet, chestplate, leggings, boots) from a single file, instead of creating four separate item files. All pieces share the same armor material, components, and creative tab placement, with the option to override those per slot.

To create a suit set, create a JSON file at:

```
addon/<namespace>/suit_set/<id>.json
```

The suit set is registered under the same ID, e.g. `addon/mypack/suit_set/iron_spider.json` registers `mypack:iron_spider`.

---

## Fields

| Field            | Type         | Required | Description                                                                              |
|------------------|--------------|----------|------------------------------------------------------------------------------------------|
| `armor_material` | ArmorMaterial | No      | The armor material used for all pieces. Accepts a registry ID or an inline definition. See [Armor Materials](armor-materials). If omitted, the pieces are still equippable in their slots but have no armor stats. |
| `slots`          | Object       | Yes      | Map of armor slot to slot config. Keys are `helmet`, `chestplate`, `leggings`, `boots`. |
| `components`     | Object       | No       | Data components applied to all pieces. Same format as on individual items.               |
| `tab`            | Tab Placement | No      | Creative tab placement for all pieces. Same format as on individual items.               |
| `multiversal_variant` | Object  | No       | Opts all pieces into the multiversal variant system. See [Multiversal Variants](multiversal-variants#suit-set-shortcut). |

### Slot Config

Each entry in `slots` configures one armor piece.

| Field       | Type   | Required | Description                                                                                                                    |
|-------------|--------|----------|--------------------------------------------------------------------------------------------------------------------------------|
| `item_name` | String | No       | The item ID path within the namespace. If omitted, defaults to `<suit_set_id>_<slot>` (e.g. `iron_spider_helmet`). |
| `components` | Object | No      | Additional data components for this piece only, merged on top of the top-level `components`.                                   |
| `tab`       | Tab Placement | No | Creative tab placement for this piece only, overriding the top-level `tab`.                                                    |

### Name

Some features show the name of a suit set, for example when several pieces of the same set are listed together. The name is translated with the key `palladium.suit_set.<namespace>.<id>`:

```json title="assets/mypack/lang/en_us.json"
{
  "palladium.suit_set.mypack.iron_spider": "Iron Spider Suit"
}
```

---

## Examples

### Referenced Armor Material

The `armor_material` points to a material registered as its own file (or one of the built-in vanilla ones):

```json title="addon/mypack/suit_set/iron_spider.json"
{
  "armor_material": "mypack:iron_spider",
  "tab": {
    "type": "add_after",
    "tab": "minecraft:combat",
    "target": "minecraft:netherite_boots"
  },
  "slots": {
    "helmet": {
      "item_name": "iron_spider_helmet"
    },
    "chestplate": {
      "item_name": "iron_spider_chestplate"
    },
    "leggings": {
      "item_name": "iron_spider_leggings"
    },
    "boots": {
      "item_name": "iron_spider_boots"
    }
  }
}
```

This registers four items: `mypack:iron_spider_helmet`, `mypack:iron_spider_chestplate`, `mypack:iron_spider_leggings`, and `mypack:iron_spider_boots`.

### Inline Armor Material

Instead of referencing a material by ID, you can write the full material definition directly into the suit set. This saves the extra `armor_material` file when the material is not shared with any other items. The fields are exactly the same as in a standalone [armor material](armor-materials) file:

```json title="addon/mypack/suit_set/stealth_suit.json"
{
  "armor_material": {
    "durability": 25,
    "defense": {
      "helmet": 2,
      "chestplate": 6,
      "leggings": 5,
      "boots": 2
    },
    "enchantment_value": 9,
    "equip_sound": "minecraft:item.armor.equip_leather",
    "toughness": 1,
    "knockback_resistance": 0,
    "repair_items": "#mypack:repairs_stealth_suit"
  },
  "slots": {
    "helmet": {},
    "chestplate": {},
    "leggings": {},
    "boots": {}
  }
}
```

Since an inline material has no registry ID, it cannot be referenced from other item files; each piece of this set simply carries it directly. Note that `asset_id` is omitted here, so the pieces render no vanilla worn texture, the usual choice when the suit's look comes from [render layers](../rendering/render-layers) instead.

---

To assign powers to a suit set, see [Assigning Powers to Items](../powers/item-powers#suit-sets).
