import Phaser, { Game } from "phaser";
import mp3 from "../assets/Orbital Colossus.mp3";
import background from "../assets/castleback.jpg";
import tiles from "../assets/knight.png";
import star from "../assets/star.png";
import { accelerate, decelerate } from "../utils";
import knight from "../assets/knight.png";

let box;
let cursors;
let fireball;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "game" });
    window.GAME = this;
  },
  //
  //
  //
  //
  //
  //
  //  //
  //
  //
  //
  //
  //
  //  //
  //
  //
  //
  //
  //
  //  //
  //
  //
  //
  //
  //
  //
  preload: function preload() {
    this.load.image("background", background);

    this.load.spritesheet("tiles", tiles, {
      frameWidth: 100,
      frameHeight: 100,
    });

    this.load.image("star", star);
  },
  //
  //
  //
  //
  //
  //
  //  //
  //
  //
  //
  //
  //
  //  //
  //
  //
  //
  //
  //
  //  //
  //
  //
  //
  //
  //
  //  //
  //
  //
  //
  //
  //
  //  //
  //
  //
  //
  //
  //
  //  //
  //
  //
  //
  //
  //
  //
  create: function create() {
    this.add.image(400, 300, "background");

    const stars = this.physics.add.group({
      key: "star",
      repeat: 0,
      setScale: { x: 0.1, y: 0.1 },
      setXY: { x: 0, y: 100 },
    });

    // stars.children.iterate(function (child) {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //   child.setVelocityX(150 - Math.random() * 300);
    //   child.setVelocityY(150 - Math.random() * 300);
    //   child.setBounce(1, 1);
    //   child.setCollideWorldBounds(true);
    // });

    cursors = this.input.keyboard.createCursorKeys();

    box = this.physics.add.image(0, 0, "tiles", 0);

    const processCollision = (box, star) => {
      star.destroy();
      const starsLeft = stars.countActive();
      // if (starsLeft === 0) {
      //   this.scene.start("winscreen");
      // }
    };

    this.physics.add.collider(
      stars,
      box,

      processCollision,
      null,
      this
    );

    //fireball

    ////
    box.setBounce(0, 0);
    box.setCollideWorldBounds(true);
  },
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //  //
  //
  //
  //
  //
  //
  //  //
  //
  //
  //
  //
  //
  //  //
  //
  //
  //
  //
  //
  //  //
  //
  //
  //
  //
  //
  //
  update: function () {
    const { velocity } = box.body;

    if (cursors.up.isDown && !(box.y < 520)) {
      box.body.velocity.y = -250;
      let jumping = true;
    }

    if (cursors.up.isDown) {
      box.setVelocityY(accelerate(velocity.y, -1 * -0.5));
    }
    if (cursors.right.isDown) box.setVelocityX(accelerate(velocity.x, 1));
    if (cursors.down.isDown) box.setVelocityY(accelerate(velocity.y, 1));
    if (cursors.left.isDown) box.setVelocityX(accelerate(velocity.x, -1));
  },
});
