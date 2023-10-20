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
		"./素体/人間素体_両性1.png",
		"./素体/人間素体_両性2.png",
		"./素体/人間素体_両性3.png",
		"./素体/人間素体_女性1.png",
		"./素体/人間素体_女性2.png",
		"./素体/人間素体_女性3.png",
		"./素体/人間素体_男性1.png",
		"./素体/人間素体_男性2.png",
		"./素体/人間素体_男性3.png",
		"./素体/村人素体_シート.png",
	], [
		"./顔/顔パーツタイプ1_1.png",
		"./顔/顔パーツタイプ1_10.png",
		"./顔/顔パーツタイプ1_11.png",
		"./顔/顔パーツタイプ1_2.png",
		"./顔/顔パーツタイプ1_3.png",
		"./顔/顔パーツタイプ1_4.png",
		"./顔/顔パーツタイプ1_5.png",
		"./顔/顔パーツタイプ1_6.png",
		"./顔/顔パーツタイプ1_7.png",
		"./顔/顔パーツタイプ1_8.png",
		"./顔/顔パーツタイプ1_9.png",
		"./顔/顔パーツタイプ2_1.png",
		"./顔/顔パーツタイプ2_10.png",
		"./顔/顔パーツタイプ2_11.png",
		"./顔/顔パーツタイプ2_2.png",
		"./顔/顔パーツタイプ2_3.png",
		"./顔/顔パーツタイプ2_4.png",
		"./顔/顔パーツタイプ2_5.png",
		"./顔/顔パーツタイプ2_6.png",
		"./顔/顔パーツタイプ2_7.png",
		"./顔/顔パーツタイプ2_8.png",
		"./顔/顔パーツタイプ2_9.png",
		"./顔/顔パーツタイプ3_1.png",
		"./顔/顔パーツタイプ3_10.png",
		"./顔/顔パーツタイプ3_11.png",
		"./顔/顔パーツタイプ3_2.png",
		"./顔/顔パーツタイプ3_3.png",
		"./顔/顔パーツタイプ3_4.png",
		"./顔/顔パーツタイプ3_5.png",
		"./顔/顔パーツタイプ3_6.png",
		"./顔/顔パーツタイプ3_7.png",
		"./顔/顔パーツタイプ3_8.png",
		"./顔/顔パーツタイプ3_9.png",
	], [
		"./髪/髪1_短髪.png",
		"./髪/髪2_短髪.png",
		"./髪/髪3_短髪.png",
		"./髪/髪4_長髪.png",
		"./髪/髪5_長髪.png",
		"./髪/村人衣装_髪_F1.png",
		"./髪/村人衣装_髪_F2.png",
		"./髪/村人衣装_髪_F3.png",
		"./髪/村人衣装_髪_F4.png",
		"./髪/村人衣装_髪_M1.png",
		"./髪/村人衣装_髪_M2.png",
		"./髪/村人衣装_髪_M3.png",
		"./髪/村人衣装_髪_M4.png",
	], [
		"./服/服1_兵士.png",
		"./服/服2_兵士.png",
		"./服/服3_魔法使い.png",
		"./服/服4_魔法使い.png",
		"./服/村人衣装_F1.png",
		"./服/村人衣装_F2.png",
		"./服/村人衣装_F3.png",
		"./服/村人衣装_F4.png",
		"./服/村人衣装_M1.png",
		"./服/村人衣装_M2.png",
		"./服/村人衣装_M3.png",
		"./服/村人衣装_M4.png",
	], [
		"./帽子/帽子1_兵士.png",
		"./帽子/帽子2_兵士.png",
		"./帽子/帽子3_魔法使い.png",
		"./帽子/帽子4_魔法使い.png",
	]);
	const 素材候補群 = 素材群.map((素材) => 素材[Math.floor(Math.random() * 素材.length)]);
	const 選択した素材ファイル = await Promise.all(素材候補群.filter((_, index) => {
		if (index === 0) return true;
		if (index === 1) {
			// 顔あり素材なら顔素材は使わない
			if (素材候補群[0] === "./素体/村人素体_シート.png") return false;
			return true;
		}
		if (index === 3) {
			// 服無し素材なら基本的に服は着せる
			if (素材候補群[0] !== "./素体/村人素体_シート.png") {
				return Math.random() < 0.95;
			}
		}
		// 3個目以降はちょっとずつ確率下げる
		return Math.random() < (0.8 - index * 0.1);
	}).map((素材ファイルのパス) => loadFile(素材ファイルのパス)));
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
