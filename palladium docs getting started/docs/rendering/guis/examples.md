---
sidebar_position: 4
---

# Examples

Two complete setups, from a small info popup to a fully custom power screen. All files on this page are client-side assets and go into `assets/<namespace>/palladium/screens/`.

## Basic: An Info Popup

A small screen with a title, some scrollable text, and a close button. The default background and padding are used, so only size and widgets need to be defined:

```json title="assets/mypack/palladium/screens/welcome.json"
{
  "width": 200,
  "height": 140,
  "widgets": [
    {
      "type": "palladium:text",
      "text": "Welcome!",
      "color": "#404040",
      "alignment": "center",
      "properties": {
        "alignment": "top_center",
        "width": 180,
        "height": 10
      }
    },
    {
      "type": "palladium:text_box",
      "text": "You have been chosen. Head to the laboratory to receive your first power. Talk to Dr. Connor when you arrive.",
      "properties": {
        "alignment": "center",
        "width": 180,
        "height": 80
      }
    },
    {
      "type": "palladium:button",
      "text": "Got it",
      "close_on_press": true,
      "properties": {
        "alignment": "bottom_center",
        "width": 80,
        "height": 20
      }
    }
  ]
}
```

Open it for testing with:

```
/palladium screen mypack:welcome
```

In a real pack you would trigger the same command from a function or advancement reward.

## Advanced: A Mission Hub with a Custom Power Screen

This setup shows most of the system in one place: a multi-column hub screen with the player model, buttons that link to another screen, condition-based visibility, and a redesigned power screen.

The hub has two columns: the left one shows the player, the right one holds the menu. The left column uses a repeating block texture as its background (written with the string shortcut):

```json title="assets/mypack/palladium/screens/hub.json"
{
  "type": "palladium:multi_column",
  "gap": 4,
  "layouts": [
    {
      "width": 90,
      "height": 160,
      "background": "minecraft:textures/block/deepslate_tiles.png",
      "widgets": [
        {
          "type": "palladium:player_display",
          "scale": 60,
          "follow_mouse": true,
          "properties": {
            "alignment": "center",
            "width": 80,
            "height": 140
          }
        }
      ]
    },
    {
      "width": 140,
      "height": 160,
      "widgets": [
        {
          "type": "palladium:text",
          "text": "Mission Hub",
          "alignment": "center",
          "properties": {
            "alignment": "top_center",
            "width": 120,
            "height": 10
          }
        },
        {
          "type": "palladium:button",
          "text": "Missions",
          "properties": {
            "alignment": "top_center",
            "y": 24,
            "width": 110,
            "height": 20,
            "action": {
              "type": "palladium:open_screen",
              "screen": "mypack:missions"
            }
          }
        },
        {
          "type": "palladium:button",
          "text": "Customize Suit",
          "properties": {
            "alignment": "top_center",
            "y": 48,
            "width": 110,
            "height": 20,
            "action": {
              "type": "palladium:open_customization_screen"
            }
          }
        },
        {
          "type": "palladium:flat_button",
          "text": "Secret Lab",
          "properties": {
            "alignment": "top_center",
            "y": 72,
            "width": 110,
            "height": 20,
            "tooltip": "Only visible to speedsters",
            "visibility": {
              "type": "palladium:has_power",
              "power": "mypack:speedster"
            },
            "action": {
              "type": "minecraft:run_command",
              "command": "function mypack:enter_lab"
            }
          }
        },
        {
          "type": "palladium:button",
          "text": "Close",
          "close_on_press": true,
          "properties": {
            "alignment": "bottom_center",
            "width": 110,
            "height": 20
          }
        }
      ]
    }
  ]
}
```

The "Secret Lab" button only exists for players with the `mypack:speedster` power; everyone else never sees it. The "Missions" button opens a second screen file (`mypack:missions`, not shown here), which is how you chain screens into a multi-page menu. A back button on that screen would simply use `palladium:open_screen` pointing back to `mypack:hub`.

For the custom power screen, the quickest option is reusing the built-in layout type with a different tree background:

```json title="assets/mypack/palladium/screens/speedster_power.json"
{
  "type": "palladium:power/default",
  "background": "minecraft:textures/block/yellow_concrete.png"
}
```

But you can also build it from scratch. Inside a power screen, the `palladium:power_name` and `palladium:power_tree` widgets automatically use the power the screen belongs to, so they need no `power` field:

```json title="assets/mypack/palladium/screens/speedster_power.json"
{
  "width": 256,
  "height": 196,
  "widgets": [
    {
      "type": "palladium:power_name",
      "shadow": true,
      "alignment": "center",
      "properties": {
        "alignment": "top_center",
        "width": 240,
        "height": 10
      }
    },
    {
      "type": "palladium:power_tree",
      "background": "minecraft:textures/block/yellow_concrete.png",
      "properties": {
        "alignment": "bottom_center",
        "width": 240,
        "height": 160
      }
    }
  ]
}
```

The power then points to this screen:

```json title="data/mypack/palladium/powers/speedster.json (excerpt)"
"screen": "mypack:speedster_power"
```
