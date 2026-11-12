# Custom Abilities

This page of the wiki will show you how to make a custom ability. Custom abilities are made using KubeJS scripts.

1. Make a file in the addon scripts directory.
2. Add the code to register the ability.
```js
StartupEvents.registry('palladium:abilities', (event) => {
    // ID of the condition will be: 'kubejs:mycoolpack/mycoolability'
	event.create('mycoolpack/mycoolability')
});
```
3. Add a preset icon.
```js
StartupEvents.registry('palladium:abilities', (event) => {
	event.create('mycoolpack/mycoolability')
		.icon(palladium.createItemIcon('palladium:vibranium_circuit'))
});
```
4. [OPTIONAL] Add the first tick handler. You can dfine the behaviour of what happens during the first tick of the ability being enabled.
```js
StartupEvents.registry('palladium:abilities', (event) => {
	event.create('mycoolpack/mycoolability')
		.icon(palladium.createItemIcon('palladium:vibranium_circuit'))
		
		.firstTick((entity, entry, holder, enabled) => {
			entity.tell('First Tick!');
		});
});
```
5. [OPTIONAL] Add the tick handler. You can dfine the behaviour of what happens during every tick of the ability. You should use `enabled` to see if the ability is enabled.
```js
StartupEvents.registry('palladium:abilities', (event) => {
	event.create('mycoolpack/mycoolability')
		.icon(palladium.createItemIcon('palladium:vibranium_circuit'))
		
		.firstTick((entity, entry, holder, enabled) => {
			entity.tell('First Tick!');
		})

		.tick((entity, entry, holder, enabled) => {
			if (enabled) {
				entity.tell('Tick!');
			}
		});
});
```
6. [OPTIONAL] Add the last tick handler. You can dfine the behaviour of what happens during the last tick of the ability being enabled.
```js
StartupEvents.registry('palladium:abilities', (event) => {
	event.create('mycoolpack/mycoolability')
		.icon(palladium.createItemIcon('palladium:vibranium_circuit'))
		
		.firstTick((entity, entry, holder, enabled) => {
			entity.tell('First Tick!');
		})

		.tick((entity, entry, holder, enabled) => {
			if (enabled) {
				entity.tell('Tick!');
			}
		})

		.lastTick((entity, entry, holder, enabled) => {
			entity.tell('Last Tick!');
		});
});
```

That's it! Now you can use your ability in your power json file. You can find the ID in the abilities.html.