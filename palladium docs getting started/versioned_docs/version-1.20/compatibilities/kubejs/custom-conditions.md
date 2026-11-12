# Custom Conditions

This page of the wiki will show you how to make a custom condition. Custom conditions are made using KubeJS scripts.

1. Make a file in the addon scripts directory.
2. Add the code to register the condition.
```js
StartupEvents.registry('palladium:condition_serializer', (event) => {
	// ID of the condition will be: 'kubejs:mycoolpack/mycoolcondition'
	event.create('mycoolpack/mycoolcondition')
});
```
3. Add the condition handler.
```js
StartupEvents.registry('palladium:condition_serializer', (event) => {
	event.create('mycoolpack/mycoolcondition')

	// Handler for the condition, in this case, the condition will be fulfilled when the entity is crouching
	.test((entity) => {
		return entity.isCrouching();
	});

});
```
