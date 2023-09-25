function main() {
	const scene = new g.Scene({
		game: g.game,
		assetIds: ["btn1off", "btn1on", "btn2off", "btn2on", "btn3off", "btn3on", "btn4off", "btn4on", "btn5off", "btn5on", "btn6off", "btn6on", "btn7off", "btn7on", "btn8off", "btn8on", "btn9off", "btn9on", "btn10off", "btn10on", "btn11off", "btn11on", "btn12off", "btn12on", "btn13off", "btn13on", "btn14off", "btn14on", "btn15off", "btn15on"] // シーン内で利用するアセットID
	});

	scene.onLoad.add(() => {
		const imageNum = 15;
		for (let i = 1; i <= imageNum; i++) {
			dispButton(scene, i);
		}

	});
	g.game.pushScene(scene);
}
function dispButton(scene, num) {
	const width = 320;
	const height = 120;
	const rows = 3;
	const spriteOff = new g.Sprite({
		scene: scene,
		src: scene.asset.getImageById(`btn${num}off`),
		x: width * ((num - 1) % rows),
		y: height * Math.floor((num - 1) / rows)
	});
	const textX = spriteOff.x + spriteOff.width / 2;
	let textY = spriteOff.y + spriteOff.height / 2;
	let text = Text(scene, num, textX, textY);
	let spriteOn;
	const pushDepth = 7;
	spriteOff.touchable = true;
	scene.append(spriteOff);
	scene.append(text);
	spriteOff.onPointDown.add(() => {
		spriteOff.opacity = 0;
		spriteOff.modified();
		spriteOn = new g.Sprite({
			scene: scene,
			src: scene.asset.getImageById(`btn${num}on`),
			x: width * ((num - 1) % rows),
			y: height * Math.floor((num - 1) / rows)
		});
		scene.append(spriteOn);
		if (num === 13 || num === 14 || num === 15) textY += pushDepth;
		text = Text(scene, num, textX, textY);
		scene.append(text);
	})
	spriteOff.onPointUp.add(() => {
		spriteOff.opacity = 1;
		spriteOff.modified();
		if (spriteOn !== null) spriteOn.destroy();
		text.destroy();
		if (num === 13 || num === 14 || num === 15) textY -= pushDepth;
		text = Text(scene, num, textX, textY);
		scene.append(text);
	})
}
function Text(scene, num, x, y) {
	const font = new g.DynamicFont({
		game: g.game,
		fontFamily: "sans-serif",
		size: 30
	});
	const label = new g.Label({
		scene: scene,
		font: font,
		text: "ボタン",
		fontSize: 30,
		textColor: "white",
		x: x,
		y: y
	});
	label.x -= label.width / 2;
	label.y -= label.height / 2;
	// ボタン種類に合わせて微調整
	if (num === 7 || num === 8 || num === 9) {
		label.y -= 5;
	}
	if (num === 13 || num === 14 || num === 15) {
		label.y -= 5;
	}
	return label;
}
module.exports = main;
