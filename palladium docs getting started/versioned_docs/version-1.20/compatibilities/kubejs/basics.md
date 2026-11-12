# Basics

Scripts are not a part of Palladium but rather a part of KubeJS. Palladium adds a lot of compatibility features. KubeJS scripts allow you to use the JavaScript programming language to execute code from events that happen in-game. For example, you can grant players a diamond every time they break a block. It's helpful to know a little Javascript but it is not a requirement. KubeJS has three types of scripts startup, server/world & client.

| Script Types | Reload Method                         | Content                                        | Folder Structure                    |
|--------------|---------------------------------------|------------------------------------------------|-------------------------------------|
| Client       | Pressing F3+T                         | Custom animations, custom HUDs                 | `assets/<namespace>/kubejs_scripts` |
| Server/World | Running `/reload`                     | e.g. manipulate entities, player/entity events | `data/<namespace>/kubejs_scripts`   |
| Startup      | None. Loads once when the game starts | Custom abilities, custom conditions            | `addon/<namespace>/kubejs_scripts`  |

## Example
Here's an example of what you can do with KubeJS scripts. If you would like to learn more, I recommend checking out their [wiki v1](https://mods.latvian.dev/books/kubejs) and [wiki v2](https://kubejs.com/wiki/).
```js
ItemEvents.rightClicked((event) => {

  // Show player's SUPERPOWER [when rightclicking bread]
  if (event.getItem().getId() === 'minecraft:bread') {
    event.player.tell('Current Superpower: ' + event.player.data.powers.getSuperpower());
  }

  // Show all of player's powers (superpower, suit, etc.) [when rightclicking glow berries]
  if (event.getItem().getId() === 'minecraft:glow_berries') {
    event.player.tell('Current Powers:');
    event.player.data.powers.getPowers().forEach(element => {
      event.player.tell(' - ' + element);
    });
  }

  // Show ALL AVAILABLE powers [when rightclicking rabbit stew]
  else if (event.getItem().getId() === 'minecraft:rabbit_stew') {
    event.player.tell('All Powers:');
    event.level.data.powers.getPowers().forEach(element => {
      event.player.tell(' - ' + element);
    });
  }

  // Swing arm [when rightclicking bone]
  else if (event.getItem().getId() === 'minecraft:bone') {
    palladium.swingArm(event.player, event.getHand());
  }
});
```
TIP: Comments in Javascript code have a `//` in front of them!  
TIP: Since this is a server/world script, it's placed in `data/<namespace>/kubejs_scripts`.