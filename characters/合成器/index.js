const fs = require("fs");
const path = require("path");
const imageScript = require("imagescript/v2");
const imageScriptPngNode = require("imagescript/png/node");

function loadFile(filepath) {
	const p = path.resolve(filepath);
	return new Promise((resolve, reject) => {
		fs.readFile(p, (err, data) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(data);
		});
	});
}

async function 生成() {
	const 素材群 = [];
	素材群.push([
		"./素体/村人素体_シート.png",
	], [
		"./髪/髪1_短髪.png",
		"./髪/髪2_短髪.png",
		"./髪/髪3_短髪.png",
		"./髪/髪4_長髪.png",
		"./髪/髪5_長髪.png",
	], [
		"./服/服1_兵士.png",
		"./服/服2_兵士.png",
		"./服/服3_魔法使い.png",
		"./服/服4_魔法使い.png",
	], [
		"./帽子/帽子1_兵士.png",
		"./帽子/帽子2_兵士.png",
		"./帽子/帽子3_魔法使い.png",
		"./帽子/帽子4_魔法使い.png",
	]);
	const 選択した素材ファイル = await Promise.all(素材群.filter((_, index) => {
		if (index === 0) return true;
		// 2個目以降はちょっとずつ確率下げる
		return Math.random() < (0.8 - index * 0.1);
	}).map((素材) => 素材[Math.floor(Math.random() * 素材.length)]).map((素材ファイルのパス) => loadFile(素材ファイルのパス)));
	const 選択した素材 = await Promise.all(
		選択した素材ファイル.map((素材ファイル) => {
			const imageLike = imageScriptPngNode.decode(素材ファイル);
			return new imageScript.Image(imageLike.width, imageLike.height, imageLike.pixels);
		})
	);
	const base = new imageScript.Image(96, 128);
	選択した素材.forEach((素材, index) => {
		base.overlay(素材, 0, 0);
	});
	const result = await base.encode("png");
	fs.writeFile(`./result.png`, result, (err) => {
		if (err) {
			console.error(err);
		}
	});
}

生成();
