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
