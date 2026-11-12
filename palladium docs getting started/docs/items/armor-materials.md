---
sidebar_position: 3
---

# Armor Materials

Armor materials define the properties and textures of armor items. They are referenced by their registry ID in item definitions.

To create a custom armor material, create a JSON file at:

```
addon/<namespace>/armor_material/<material_id>.json
```

For example, `addon/mypack/armor_material/dirt.json` registers the material `mypack:dirt`.

---

## Fields

| Field                 | Type        | Required | Description                                                                                      |
|-----------------------|-------------|----------|--------------------------------------------------------------------------------------------------|
| `durability`          | Integer     | Yes      | Base durability multiplier. The actual per-piece durability is derived from this value.          |
| `defense`             | Object      | Yes      | Defense points per armor slot. Keys are `helmet`, `chestplate`, `leggings`, `boots`, and `body`. |
| `enchantment_value`   | Integer     | Yes      | Enchantability. Higher values yield better enchantments.                                         |
| `equip_sound`         | Sound ID    | Yes      | Sound event played when this armor is equipped.                                                  |
| `toughness`           | Float       | Yes      | Armor toughness value. Vanilla diamond has `2.0`, netherite has `3.0`.                           |
| `knockback_resistance`| Float       | Yes      | Knockback resistance. Netherite armor has `0.1` per piece.                                       |
| `repair_items`        | Tag (Item)  | Yes      | Item tag whose members can repair this armor in an anvil.                                        |
| `asset_id`            | Identifier  | No       | Points to the equipment asset file at `assets/<namespace>/equipment/<name>.json`. See below.     |

---

## Equipment Asset File

The `asset_id` field references an equipment asset that defines the in-world texture layers rendered on the player when wearing the armor. It is optional: without it, the armor simply renders no worn texture on the body, which is exactly what you want when the visuals come from [render layers](../rendering/render-layers) instead, for example via a [suit set](suit-sets).

If you do want a vanilla-style worn texture, create the asset file at:

```
assets/<namespace>/equipment/<name>.json
```

The `<namespace>` and `<name>` come from the `asset_id` value, so for example `asset_id: "mypack:dirt"` maps to `assets/mypack/equipment/dirt.json`.

```json title="assets/mypack/equipment/dirt.json"
{
  "layers": {
    "humanoid": [
      {
        "texture": "mypack:dirt"
      }
    ],
    "humanoid_leggings": [
      {
        "texture": "mypack:dirt"
      }
    ]
  }
}
```

The `texture` value points to `assets/<namespace>/textures/entity/equipment/<name>.png`. Helmets, chestplates, and boots share the `humanoid` layer, while leggings use the `humanoid_leggings` layer.

---

## Built-in Vanilla Materials

The following vanilla armor materials are pre-registered and can be referenced directly by ID:

| ID                          | `durability` | `defense.helmet` | `defense.chestplate` | `defense.leggings` | `defense.boots` | `defense.body` | `enchantment_value` | `toughness` | `knockback_resistance` | `equip_sound`                          | `repair_items`                         | `asset_id`                    |
|-----------------------------|--------------|----------|--------------|------------|---------|--------|---------------------|-------------|------------------------|----------------------------------------|----------------------------------------|-------------------------------|
| `minecraft:leather`         | 5            | 1        | 3            | 2          | 1       | 3      | 15                  | 0.0         | 0.0                    | `minecraft:item.armor.equip_leather`   | `#minecraft:repairs_leather_armor`     | `minecraft:leather`           |
| `minecraft:chainmail`       | 15           | 2        | 5            | 4          | 1       | 4      | 12                  | 0.0         | 0.0                    | `minecraft:item.armor.equip_chain`     | `#minecraft:repairs_chain_armor`       | `minecraft:chainmail`         |
| `minecraft:iron`            | 15           | 2        | 6            | 5          | 2       | 5      | 9                   | 0.0         | 0.0                    | `minecraft:item.armor.equip_iron`      | `#minecraft:repairs_iron_armor`        | `minecraft:iron`              |
| `minecraft:gold`            | 7            | 2        | 5            | 3          | 1       | 7      | 25                  | 0.0         | 0.0                    | `minecraft:item.armor.equip_gold`      | `#minecraft:repairs_gold_armor`        | `minecraft:gold`              |
| `minecraft:diamond`         | 33           | 3        | 8            | 6          | 3       | 11     | 10                  | 2.0         | 0.0                    | `minecraft:item.armor.equip_diamond`   | `#minecraft:repairs_diamond_armor`     | `minecraft:diamond`           |
| `minecraft:netherite`       | 37           | 3        | 8            | 6          | 3       | 19     | 15                  | 3.0         | 0.1                    | `minecraft:item.armor.equip_netherite` | `#minecraft:repairs_netherite_armor`   | `minecraft:netherite`         |
| `minecraft:turtle_scute`    | 25           | 2        | 6            | 5          | 2       | 5      | 9                   | 0.0         | 0.0                    | `minecraft:item.armor.equip_turtle`    | `#minecraft:repairs_turtle_helmet`     | `minecraft:turtle_scute`      |
| `minecraft:armadillo_scute` | 4            | 3        | 8            | 6          | 3       | 11     | 10                  | 0.0         | 0.0                    | `minecraft:item.armor.equip_wolf`      | `#minecraft:repairs_wolf_armor`        | `minecraft:armadillo_scute`   |

---

## Example

```json title="addon/mypack/armor_material/dirt.json"
{
  "durability": 1,
  "defense": {
    "helmet": 1,
    "chestplate": 1,
    "leggings": 1,
    "boots": 1,
    "body": 1
  },
  "enchantment_value": 3,
  "equip_sound": "minecraft:block.gravel.place",
  "toughness": 0,
  "knockback_resistance": 0,
  "repair_items": "#mypack:repairs_dirt_armor",
  "asset_id": "mypack:dirt"
}
```
