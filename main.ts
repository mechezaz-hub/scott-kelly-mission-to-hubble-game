function createAsteroids () {
    info.startCountdown(120)
    asteroidList = [assets.image`asteroid0`, assets.image`asteroid1`, assets.image`asteroid2`]
    while (info.countdown() > 0) {
        projectile = sprites.createProjectileFromSide(asteroidList._pickRandom(), randint(-75, -25), randint(-25, 25))
        projectile.setPosition(160, randint(5, 115))
        pause(randint(250, 1000))
    }
}
function startGame () {
    info.setLife(81)
    scene.setBackgroundImage(assets.image`spaceBackground`)
    discovery = sprites.create(assets.image`discoveryShuttle`, SpriteKind.Player)
    discovery.setPosition(30, 60)
    discovery.z = 10
    controller.moveSprite(discovery, 75, 75)
    discovery.setStayInScreen(true)
    createAsteroids()
}
info.onCountdownEnd(function () {
    hubble = sprites.create(assets.image`hubbleTelescope`, SpriteKind.Player)
    hubble.setPosition(140, 55)
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.coolRadial, 1000)
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
    info.changeLifeBy(-1)
    scene.cameraShake(12, 1000)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    scene.setBackgroundImage(assets.image`kellyScreen`)
    game.showLongText("Thanks For Your Help!", DialogLayout.Bottom)
    game.showLongText("I'll Give You My Best Reward!", DialogLayout.Bottom)
})
info.onLifeZero(function () {
    scene.setBackgroundImage(assets.image`kellyScreen0`)
    game.showLongText("WHAT THE HELL?", DialogLayout.Bottom)
    game.showLongText("HOW DARE YOU FAIL!", DialogLayout.Bottom)
    game.showLongText("TAKE THISSSS!!!!", DialogLayout.Bottom)
    game.gameOver(false)
})
let hubble: Sprite = null
let discovery: Sprite = null
let projectile: Sprite = null
let asteroidList: Image[] = []
scene.setBackgroundImage(assets.image`kellyScreen`)
game.showLongText("My Name Is Scott Kelly..", DialogLayout.Bottom)
game.showLongText("Use Arrows Or WASD To Move.", DialogLayout.Bottom)
game.showLongText("Can You Help Me Go Back?", DialogLayout.Bottom)
startGame()
