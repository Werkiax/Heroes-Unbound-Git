---
sidebar_position: 6
---

# Item Upgrades

Item upgrades let players install permanent modifications onto items at the smithing table, in the same way netherite upgrades work in vanilla. An upgrade is applied once, sticks to the item forever, and can change the item's data components on installation. Installed upgrades show up in the item's tooltip.

The system is built from three parts:

1. **Upgrade definitions**, entries in the `palladium/item_upgrade` datapack registry that describe what an upgrade can be applied to and what it does.
2. **Smithing recipes** of the type `palladium:item_upgrade` that make an upgrade obtainable in survival.
3. **Template items** (optional), a dedicated item type for the smithing template that players place in the first slot.

On top of that, there is a [condition](../logic/conditions#palladiumitem_upgrade) to check for installed upgrades, which is the main way to make upgrades actually do something (unlock abilities, change stats via powers, and so on).

---

## Upgrade Definitions

An upgrade is a datapack registry entry. Create a JSON file at:

```
data/<namespace>/palladium/item_upgrade/<id>.json
```

| Field               | Type              | Required | Fallback | Description                                                                                                   |
|---------------------|-------------------|----------|----------|---------------------------------------------------------------------------------------------------------------|
| `applicable_items`  | Item ID(s) or Tag | Yes      | /        | Which items the upgrade can be installed on. A single ID, a list of IDs, or an item tag like `#mypack:suits`. |
| `incompatibilities` | Upgrade ID(s)     | No       | `[]`     | Other upgrades that cannot coexist with this one on the same item. Accepts a single ID, a list, or a tag.     |
| `components`        | Component Patch   | No       | `{}`     | Data components applied to the item when the upgrade is installed. See [below](#the-components-field).        |

Incompatibilities are checked in both directions: if upgrade A lists upgrade B, the smithing recipe refuses to install either one on an item that already has the other. You do not need to list the incompatibility on both sides, but it does not hurt.

The display name of an upgrade comes from the lang key `palladium.item_upgrade.<namespace>.<path>`:

```json title="assets/mypack/lang/en_us.json"
{
  "palladium.item_upgrade.mypack.rocket_boosters": "Rocket Boosters"
}
```

This name is used in the item tooltip and in the template item's "Incompatible with" list, so you should always provide it.

### The `components` Field

The `components` field is a component patch, the same format vanilla uses for `/give` and recipe results. When the upgrade is installed, the patch is applied to the item on top of its existing data. Prefixing a component ID with `!` removes that component instead of setting it:

```json
"components": {
  "minecraft:enchantment_glint_override": true,
  "minecraft:unbreakable": {},
  "!minecraft:tooltip_style": {}
}
```

Keep in mind that the patch is applied exactly once, at the moment of installation. Removing the upgrade definition later or changing its components does not affect items that already have it installed.

---

## Applying Upgrades In-Game

Upgrades are installed at the vanilla smithing table through the `palladium:item_upgrade` recipe type, using the familiar template + base + addition layout:

| Field      | Type       | Required | Description                                                 |
|------------|------------|----------|-------------------------------------------------------------|
| `template` | Ingredient | Yes      | The item in the template slot.                              |
| `base`     | Ingredient | Yes      | The item receiving the upgrade.                             |
| `addition` | Ingredient | No       | Optional third slot. Leave it out and the slot stays empty. |
| `upgrade`  | ID         | Yes      | The upgrade to install.                                     |

The result is always the base item itself, keeping all of its existing data (damage, enchantments, other upgrades, ...), with the new upgrade added and its `components` patch applied.

The recipe automatically refuses to match if:

- the upgrade's `applicable_items` does not include the base item,
- the base item already has this upgrade, or
- the base item has an upgrade that is incompatible with this one (in either direction).

There is nothing extra to configure for these checks; they always apply. Also see [Recipes & Ingredients](recipes#item-upgrade-recipes) for general recipe information (folder location, tags, conditions).

---

## Template Items

The `palladium:upgrade_template` item type creates a smithing template item for an upgrade, comparable to the vanilla Netherite Upgrade Smithing Template. Like all items, it goes into:

```
addon/<namespace>/item/<item_id>.json
```

| Field        | Type           | Required | Description                                                                                      |
|--------------|----------------|----------|--------------------------------------------------------------------------------------------------|
| `upgrade`    | ID             | Yes      | The upgrade this template is for.                                                                |
| `applies_to` | Text Component | No       | Shown under "Applies to" in the tooltip. Without it, a generic "Compatible Items" line is shown. |
| `properties` | Object         | Yes      | Regular item properties, same as every other item type.                                          |

The tooltip automatically lists the upgrade's incompatibilities (using their display names), so players can see conflicts before they craft.

Using a template item is a convention, not a requirement. The recipe's `template` field is a normal ingredient, so any item works as the template. The dedicated item type just gives you the vanilla-style tooltip and slot hints for free.

---

## Making Upgrades Do Something

An upgrade on its own only changes components and tooltip. To attach behaviour to it, use the [`palladium:item_upgrade` condition](../logic/conditions#palladiumitem_upgrade) in your powers and abilities:

```json
{
  "type": "palladium:item_upgrade",
  "upgrade": "mypack:rocket_boosters",
  "slot": "chest"
}
```

| Field     | Type | Required | Description                                                                                                                                  |
|-----------|------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `upgrade` | ID   | Yes      | The upgrade to look for.                                                                                                                     |
| `slot`    | Slot | No       | Which slot(s) to check. Without it, the item from the current context is checked, or all equipment slots if there is no item in the context. |

Combined with [item powers](../powers/item-powers), this is the typical setup: the item grants a power, and abilities inside that power are gated behind installed upgrades.

---

## Examples

### Basic: A Simple Upgrade

A reinforced plating upgrade for a custom chestplate. Three files: the upgrade, a template item, and the smithing recipe.

The upgrade itself makes the item unbreakable when installed:

```json title="data/mypack/palladium/item_upgrade/reinforced_plating.json"
{
  "applicable_items": "mypack:cool_chestplate",
  "components": {
    "minecraft:unbreakable": {}
  }
}
```

A template item players need to find:

```json title="addon/mypack/item/reinforced_plating_template.json"
{
  "type": "palladium:upgrade_template",
  "upgrade": "mypack:reinforced_plating",
  "properties": {}
}
```

The recipe that ties it together at the smithing table:

```json title="data/mypack/recipe/reinforced_plating.json"
{
  "type": "palladium:item_upgrade",
  "template": "mypack:reinforced_plating_template",
  "base": "mypack:cool_chestplate",
  "addition": "minecraft:netherite_ingot",
  "upgrade": "mypack:reinforced_plating"
}
```

And the name:

```json title="assets/mypack/lang/en_us.json"
{
  "palladium.item_upgrade.mypack.reinforced_plating": "Reinforced Plating"
}
```

### Advanced: Incompatible Upgrades Unlocking Abilities

Two upgrades for a suit that exclude each other: rocket boosters for flight, or stealth coating for invisibility. The player has to pick one per suit.

Both upgrades apply to anything in a shared item tag, and each lists the other as incompatible:

```json title="data/mypack/palladium/item_upgrade/rocket_boosters.json"
{
  "applicable_items": "#mypack:suit_chestplates",
  "incompatibilities": "mypack:stealth_coating",
  "components": {
    "minecraft:enchantment_glint_override": true
  }
}
```

```json title="data/mypack/palladium/item_upgrade/stealth_coating.json"
{
  "applicable_items": "#mypack:suit_chestplates",
  "incompatibilities": "mypack:rocket_boosters"
}
```

A single template item works for both recipes here, but giving each upgrade its own template (as in the basic example) is usually clearer. This recipe uses an existing item as the template instead:

```json title="data/mypack/recipe/rocket_boosters.json"
{
  "type": "palladium:item_upgrade",
  "template": "mypack:upgrade_kit",
  "base": "#mypack:suit_chestplates",
  "addition": "minecraft:firework_rocket",
  "upgrade": "mypack:rocket_boosters"
}
```

```json title="data/mypack/recipe/stealth_coating.json"
{
  "type": "palladium:item_upgrade",
  "template": "mypack:upgrade_kit",
  "base": "#mypack:suit_chestplates",
  "addition": "minecraft:phantom_membrane",
  "upgrade": "mypack:stealth_coating"
}
```

The suit's [item power](../powers/item-powers) then gates its abilities behind the installed upgrade. Excerpt from the power file, showing a flight ability that only unlocks with the rocket boosters installed in the chest slot:

```json title="data/mypack/palladium/powers/suit_power.json (excerpt)"
"abilities": {
  "rocket_flight": {
    "type": "palladium:flight",
    "state": {
      "unlocking": [
        {
          "type": "palladium:item_upgrade",
          "upgrade": "mypack:rocket_boosters",
          "slot": "chest"
        }
      ]
    }
  }
}
```

Because the upgrades are mutually exclusive, no suit can ever have both abilities unlocked at once. There is no built-in way to remove an upgrade again, so this choice is permanent per item; if you want players to be able to switch, keep the base item craftable so they can start over with a fresh one.
