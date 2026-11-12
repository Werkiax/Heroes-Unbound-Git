# Custom Animations

Using KubeJS you can also animate the player model itself.

To get started you create a client-side script (`assets/<namespace>/kubejs_scripts/<name>.js`) and subscribe to the event for registering animations:

```js
PalladiumEvents.registerAnimations((event) => {
    event.registerForPower('test/ability_test', 'namespace:my_power_id', 10, (builder) => {
        // animation part
    });
});
```

In the `registerForPower` function you specificy the ID, the ID of the power this animation will be used for, the priority, and then a function for animating, which just needs a `builder` parameter.



Let's animate the right arm when the player is crouching. **You should wrap every animation in an `if` to make it dependent on something!**
In the animation part (look above) you can write this to get a player part:
```js
if (builder.getPlayer().isCrouching()) {
    builder.get('right_arm');
}
```
With this function you get access to the player's arm and can modify it. To rotate it to a certain angle, we can do this:
```js
if (builder.getPlayer().isCrouching()) {
    builder.get('right_arm').setXRotDegrees(90);
}
```
This will rotate the right arm by 90 degrees.

This will happen instantly though. If you want to progress this animation over time, we need an animation timer ability. Let's say you have named an animation timer ability 'animation' in a 'test:kubejs_animation' power, your script can now look like this:
```js
const progress = animationUtil.getAnimationTimerAbilityValue(builder.getPlayer(), 'test:kubejs_animation', 'animation', builder.getPartialTicks());
if (progress > 0.0) {
    builder.get('right_arm').setXRotDegrees(90).multiplier(progress);
}
```
With this we are also now having the animation depend on that timer, and not on the crouching anymore. The `animationUtil.getAnimationTimerAbilityValue` function gives you a number from 0.0 to 1.0. This is then used in `multiplier` to make the animation happen.

This animation however is pretty linear and unnatural. There are various methods to "ease" this animation out. You can see them all [here](https://easings.net/). Let's say we want to use the "easeInOutCubic" from there in our animation, we remove the "ease" part of that name and use it like this:
```js
const progress = animationUtil.getAnimationTimerAbilityValue(builder.getPlayer(), 'test:kubejs_animation', 'animation', builder.getPartialTicks());
if (progress > 0.0) {
    builder.get('right_arm').setXRotDegrees(90).animate('InOutCubic', progress);
}
```
This will make our animation nice and smooth!

That's basically it. This example only showed how to rotate the X axis, but here are all the functions you can use:  
`setXRot` / `setYRot` / `setZRot` (use radians)  
`setXRotDegrees` / `setYRotDegrees` / `setZRotDegrees` (use degrees)  
`setX` / `setY` / `setZ`  
`scale` / `scaleX` / `scaleY` / `scaleZ`

And here are all the body parts you can access:
`head`, `chest`, `right_arm`, `left_arm`, `right_leg`, `left_leg`, `body` (last one is able to rotate/scale/move the entire player model)

# First-Person-Specific Animations
If you want to have the animation in first-person be more specific, or even not appear at all, there are some functions you can use:
```js
PalladiumEvents.registerAnimations((event) => {
    event.registerForPower('test/ability_test', 'namespace:my_power_id', 10, (builder) => {
        if (builder.isFirstPerson()) {
            // do first-person animations
        } else {
            // do third-person animations
        }
    });
});
```


# Power-independent animations

If you want to make an animation that isn't bound to any power, you can use the following method.

:::danger

Using this is bad for your FPS. Use this with caution!

:::

```js
PalladiumEvents.registerAnimations((event) => {
    event.register('test/ability_test', 10, (builder) => {
        // animation part
    });
});
```