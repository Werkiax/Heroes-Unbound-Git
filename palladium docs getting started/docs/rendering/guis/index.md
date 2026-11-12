# GUIs

Palladium lets you build entire custom screens from JSON, no code required. A screen is defined by a **layout** that describes its size and background, and a list of **widgets** (text, buttons, images, your player model, ...) placed inside it. The power screen you see when pressing the powers key is built with this exact system, so everything described here also applies to customizing power screens.

Screens are client-side asset files. Create a JSON file at:

```
assets/<namespace>/palladium/ui_layouts/<id>.json
```

For example, `assets/mypack/palladium/ui_layouts/starter.json` defines the screen `mypack:starter`.

The system is split into three building blocks, each with its own page:

1. **[Layouts](layouts)** define the overall frame: size, padding, background, and which widgets it contains. The screen file itself is a layout.
2. **[Widgets](widgets)** are the individual elements inside a layout. Every widget shares a common set of properties for positioning, tooltips, visibility, and click actions.
3. **[Backgrounds](backgrounds)** fill the area behind a layout (or behind the power tree), from simple repeating textures to sprites.

A minimal screen file looks like this:

```json title="assets/mypack/palladium/ui_layouts/starter.json"
{
  "width": 200,
  "height": 100,
  "widgets": [
    {
      "type": "palladium:text",
      "text": "Hello!",
      "properties": {
        "alignment": "top_center"
      }
    }
  ]
}
```

See the [Examples](examples) page for complete setups.

---

## Opening Screens

A screen file on its own does nothing; something has to open it. There are three ways:

### The `/palladium screen` Command

```
/palladium screen <id> [players]
```

Opens the screen for yourself or the given players. Requires gamemaster permissions. Useful for testing while building a screen, and for triggering screens from functions or command blocks.

### Dialog and Button Actions

Palladium registers the custom action type `palladium:open_screen`, which works in vanilla [dialogs](https://minecraft.wiki/w/Dialog) as well as in the `action` property of [button widgets](widgets#click-actions):

```json
"action": {
  "type": "palladium:open_screen",
  "screen": "mypack:other_screen"
}
```

| Field    | Type | Required | Description            |
|----------|------|----------|------------------------|
| `screen` | ID   | Yes      | The screen to open.    |

This also means screens can open other screens, which lets you build multi-page menus out of several screen files.

There is a second custom action, `palladium:open_customization_screen`, which opens the player customization screen instead. Its optional `category` field jumps straight to a specific customization category.

### Power Screens

Every power is shown with a layout when the powers button is pressed. Without any setup, that is `palladium:power/default`, the built-in power screen with the power's name at the top and the ability tree below. A power picks up its own screen either by naming convention, through a layout at `mypack:power/<power_path>`, or explicitly through the `screen_layout` field of its [power renderer](../power-renderers):

```json title="assets/mypack/palladium/power_renderers/my_power.json (excerpt)"
"screen_layout": "mypack:my_power_screen"
```

When a player has several powers, each power's layout is shown as a tab of the same screen. The full resolution order is described under [Custom Power Screen](../../powers/index.md#custom-power-screen).

### HUD Overlays

Layouts can also render as in-game HUD overlays instead of openable screens, bound to a power via the `hud_layouts` field of its [power renderer](../power-renderers#hud-layouts). On the HUD the layout background is skipped and buttons are inert; a layout without `width`/`height` spans the whole screen, which is the usual setup for HUDs. See the power renderer docs for details.