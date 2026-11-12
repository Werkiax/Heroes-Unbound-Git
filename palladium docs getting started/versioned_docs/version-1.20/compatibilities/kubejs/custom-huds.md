# Custom HUDs

You can also use Palladium with KubeJS to make your own HUD. Simply register it in a client-side script like here:

```js
// Event for registering HUDs
PalladiumEvents.registerGuiOverlays((event) => {
    event.register(
        // ID for the overlay
        'test/example_hud',

        // Function for rendering
        (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
            // Drawing text. Parameters: PoseStack, Text (as text component), X, Y, Color
            guiUtil.drawString(poseStack, Component.string("I am a text"), 10, 10, 0xffffff);

            // Drawing a piece of a texture
            // Parameters: Texture, Gui, PoseStack, x, y, U on the texture, V on the texture, width, height
            guiUtil.blit('test:textures/gui/my_cool_texture.png', gui, poseStack, 10, 20, 0, 10, 182, 5);
        });
});
```

If you use the `blit` method, your texture file must be 256x256 pixels big. If you choose to have your own dimensions, simply add to more arguments add the end as the texture width & height.