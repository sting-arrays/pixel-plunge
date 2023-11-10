export function createUniqueFish(
  amount,
  minY,
  maxY,
  fishGroup,
  image,
  yUpperLimit,
  yLowerLimit
) {
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
