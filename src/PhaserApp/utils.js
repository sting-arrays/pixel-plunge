export function createUniqueFish(amount, minY, maxY, fishGroup, image, yUpperLimit, yLowerLimit) {
 for (let i = 0; i < amount; i++) {
  let y = Phaser.Math.Between(minY, maxY);
  let x = Phaser.Math.Between(0, 600);
  let fish = fishGroup.create(x, y, image).setScale(0.2);
  fish.setCollideWorldBounds(false);
  fish.setSize(70, 50, true);

  setInterval(() => {
   if (fish.body !== undefined) {
    if (fish.y < yUpperLimit) {
     fish.setVelocityY(30);
    } else if (fish.y > yLowerLimit) {
     fish.setVelocityY(-30);
    } else if (fish.x < -100) {
     fish.setVelocityX(Phaser.Math.Between(50, 200));
    } else if (fish.x > 900) {
     fish.setVelocityX(Phaser.Math.Between(-50, -150));
    } else {
     fish.setVelocityX(Phaser.Math.Between(-200, 200));
     fish.setVelocityY(Phaser.Math.Between(-30, 30));
    }

    if (fish.body.velocity.x < 0) {
     fish.flipX = true;
    } else {
     fish.flipX = false;
    }
   }
  }, Phaser.Math.Between(1000, 3000));

  fish.setVelocity(Phaser.Math.Between(-300, 300), 0);
  fish.body.setAllowGravity(false);
 }
}

export function between(item, val1, val2) {
 return item >= val1 && item <= val2;
}

export function createShark(amount, minY, maxY, sharkGroup, image, yUpperLimit, yLowerLimit) {
 for (let i = 0; i < amount; i++) {
  let y = Phaser.Math.Between(minY, maxY);
  //   let x = Phaser.Math.Between(-200, 800);
  let x = 900;
  let shark = sharkGroup.create(x, y, image).setScale(0.1);
  shark.setCollideWorldBounds(false);
  shark.setSize(560, 230, true);
  shark.setVelocity(-100, 0);
  shark.body.setAllowGravity(false);
  setInterval(() => {
   if (shark.body !== undefined) {
    if (shark.y < yUpperLimit) {
     shark.setVelocityY(15);
    } else if (shark.y > yLowerLimit) {
     shark.setVelocityY(-15);
    } else if (shark.x < -100) {
     shark.setVelocityX(100);
    } else if (shark.x > 900) {
     shark.setVelocityX(Phaser.Math.Between(-25, -50));
    } else {
     shark.setVelocityY(Phaser.Math.Between(-5, 5));
    }
    if (shark.body.velocity.x < 0) {
     shark.flipX = false;
    } else {
     shark.flipX = true;
    }
   }
  }, Phaser.Math.Between(1000, 3000));
 }
}

export function sharkAttack(player, shark) {
 if (shark.body.velocity.x > 0) {
  player.rotation += 1;
 } else {
  player.rotation -= 1;
 }
 player.setTint(0xff0000);
 shark.setVelocityX(shark.body.velocity.x * -2);
 if (shark.body.velocity.x < 0) {
  shark.flipX = false;
 } else {
  shark.flipX = true;
 }
 setTimeout(() => {
  player.rotation = 0;
  player.clearTint();
  player.setVelocityX(0);
 }, 1000);
}

export function createCharAnims(scene) {
 scene.anims.create({
  key: "left",
  frames: scene.anims.generateFrameNumbers("character", {
   start: 1,
   end: 5,
  }),
  frameRate: 10,
  repeat: -1,
 });

 scene.anims.create({
  key: "turn",
  frames: [{ key: "character", frame: 10 }],
  frameRate: 20,
 });

 scene.anims.create({
  key: "right",
  frames: scene.anims.generateFrameNumbers("character", {
   start: 6,
   end: 10,
  }),
  frameRate: 10,
  repeat: -1,
 });

 scene.anims.create({
  key: "swimming-up",
  frames: scene.anims.generateFrameNumbers("swimming", {
   start: 1,
   end: 4,
  }),
  frameRate: 6,
  repeat: -1,
 });
 scene.anims.create({
  key: "swimming-idle",
  frames: scene.anims.generateFrameNumbers("swimming", {
   start: 1,
   end: 4,
  }),
  frameRate: 6,
  repeat: -1,
 });

 scene.anims.create({
  key: "swimming-down",
  frames: scene.anims.generateFrameNumbers("swimming", {
   start: 5,
   end: 8,
  }),
  frameRate: 6,
  repeat: -1,
 });

 scene.anims.create({
  key: "swimming-right",
  frames: scene.anims.generateFrameNumbers("swimming", {
   start: 9,
   end: 12,
  }),
  frameRate: 6,
  repeat: -1,
 });

 scene.anims.create({
  key: "swimming-left",
  frames: scene.anims.generateFrameNumbers("swimming", {
   start: 13,
   end: 16,
  }),
  frameRate: 10,
  repeat: -1,
 });
 scene.anims.create({
  key: "player-dead",
  frames: [{ key: "swimming", frame: 0 }],
  frameRate: 11,
 });
}

export function createRocks(group) {
 //Create Rocks
 const rockArrayFlatXL = ["xlrock1flat", "xlrock2flat"];
 const rockArrayFlatMed = ["medrock1flat"];
 const rockArrayFlatSmall = [];
 const rockArrayRight = ["xlrock1right", "xlrock2right"];
 const rockArrayLeft = ["xlrock1left", "xlrock2left"];

 //flat large
 for (let i = 0; i < 3; i++) {
  let x = Phaser.Math.Between(0, 800);
  let y = Phaser.Math.Between(1000, 2000);
  let rockType = rockArrayFlatXL[Phaser.Math.Between(0, 1)];
  const rock = group.create(x, y, rockType);
  rock.setSize(260, 150);
 }
 //flat med
 for (let i = 0; i < 5; i++) {
  let x = Phaser.Math.Between(0, 800);
  let y = Phaser.Math.Between(500, 2000);
  let rockType = rockArrayFlatMed[Phaser.Math.Between(0, 0)];
  const rock = group.create(x, y, rockType);
  rock.setSize(150, 70);
 }
 //left
 for (let i = 0; i < 1; i++) {
  let x = 90;
  let y = Phaser.Math.Between(500, 1000);
  let rockType = rockArrayLeft[Phaser.Math.Between(0, 1)];
  const rock = group.create(x, y, rockType);
  rock.setSize(150, 270, true);
 }
 //right
 for (let i = 0; i < 1; i++) {
  let x = 710;
  let y = Phaser.Math.Between(500, 1000);
  let rockType = rockArrayRight[Phaser.Math.Between(0, 1)];
  const rock = group.create(x, y, rockType);
  rock.setSize(150, 260, true);
 }
}
