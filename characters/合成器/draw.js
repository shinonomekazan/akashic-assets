const 素材群 = [];
素材群.push(
	[
		"-",
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
	],
	[
		"-",
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
	],
	[
		"-",
		"./髪/村人衣装_髪_F1.png",
		"./髪/村人衣装_髪_F2.png",
		"./髪/村人衣装_髪_F3.png",
		"./髪/村人衣装_髪_F4.png",
		"./髪/村人衣装_髪_M1.png",
		"./髪/村人衣装_髪_M2.png",
		"./髪/村人衣装_髪_M3.png",
		"./髪/村人衣装_髪_M4.png",
		"./髪/髪1_短髪.png",
		"./髪/髪2_短髪.png",
		"./髪/髪3_短髪.png",
		"./髪/髪4_長髪.png",
		"./髪/髪5_長髪.png",
	],
	[
		"-",
		"./服/村人衣装_M1.png",
		"./服/村人衣装_M2.png",
		"./服/村人衣装_M3.png",
		"./服/村人衣装_M4.png",
		"./服/村人衣装_F1.png",
		"./服/村人衣装_F2.png",
		"./服/村人衣装_F3.png",
		"./服/村人衣装_F4.png",
		"./服/服1_兵士.png",
		"./服/服2_兵士.png",
		"./服/服3_魔法使い.png",
		"./服/服4_魔法使い.png",
	],
	[
		"-",
		"./帽子/帽子1_兵士.png",
		"./帽子/帽子2_兵士.png",
		"./帽子/帽子3_魔法使い.png",
		"./帽子/帽子4_魔法使い.png",
	],
);
const backCanvas =
	document.querySelector("#backCanvas");
const canvas = document.querySelector("#canvas");
const dlCanvas = document.querySelector("#dlCanvas");
function handleChange() {
	const assetsContainers =
		document.querySelectorAll(".tab-pane");
	const indexes = [];
	assetsContainers.forEach((container, i) => {
		let selected = Array.from(
			container.children,
		).find((asset) =>
			asset.classList.contains("selected"),
		);
		if (!selected) {
			const selectedIndex = -1;
			indexes.push(selectedIndex);
		} else {
			const selectedIndex =
				parseInt(selected.id) - 1;
			indexes.push(selectedIndex);
		}
	});
	const context = backCanvas.getContext("2d");
	const dlContext = dlCanvas.getContext("2d");
	context.clearRect(
		0,
		0,
		backCanvas.width,
		backCanvas.height,
	);
	dlContext.clearRect(
		0,
		0,
		dlCanvas.width,
		dlCanvas.height,
	);
	indexes.forEach((imageIndex, groupIndex) => {
		if (imageIndex < 0) return;
		const assetImage =
			image群[groupIndex][imageIndex];
		context.drawImage(
			image群[groupIndex][imageIndex],
			32,
			64,
			32,
			32,
			0,
			0,
			backCanvas.width,
			backCanvas.height,
		);
		dlContext.drawImage(image群[groupIndex][imageIndex], 0, 0);
	});
	const frontContext = canvas.getContext("2d");
	frontContext.imageSmoothingEnabled = false;
	const dWidth = 96;
	const dHeight = 96;
	const dx = (canvas.width - dWidth) / 2;
	const dy = (canvas.height - dHeight) / 2;
	frontContext.clearRect(
		0,
		0,
		canvas.width,
		canvas.height,
	);
	frontContext.drawImage(
		backCanvas,
		dx,
		dy,
		dWidth,
		dHeight,
	);
}

function handleReset() {
	const selectedAssets =
		document.querySelectorAll(".asset.selected");
	selectedAssets.forEach((asset) => {
		asset.classList.remove("selected");
	});
	const selectedPartsElms =
		document.querySelectorAll(".selected-parts");
	selectedPartsElms.forEach((elm) => {
		elm.innerHTML = "";
	});
	const context = canvas.getContext("2d");
	context.clearRect(
		0,
		0,
		canvas.width,
		canvas.height,
	);
}

function handleDownload() {
	const assetLink = document.createElement("a");
	assetLink.href = dlCanvas.toDataURL("image/png");
	assetLink.download = "character.png";
	assetLink.click();
}

const image群 = [];

素材群.forEach((素材s, index) => {
	const images = [];
	image群.push(images);

	const assetsContainer = document.querySelector(
		`#content${index}`,
	);
	const selectedPartsElm = document.querySelector(
		`#selected${index}`,
	);

	素材s.forEach((素材, index) => {
		const assetElm = document.createElement("div");
		assetElm.setAttribute("id", index);
		assetElm.classList.add("asset");

		if (素材 !== "-") {
			const partsName = 素材.split("/")[1];
			assetElm.innerHTML = `
<div class="asset-content">
<img src="${素材}" alt="${partsName}${index}">
<p>${partsName}${index}</p>
</div>`;
			const image = new Image();
			image.src = 素材;
			images.push(image);
		} else {
			assetElm.innerHTML = `<div>なし</div>`;
		}
		assetsContainer.insertAdjacentElement(
			"beforeend",
			assetElm,
		);

		assetElm.addEventListener("click", (e) => {
			const target = e.currentTarget;
			const assets = target
				.closest(".tab-pane")
				.querySelectorAll(".asset");

			assets.forEach((asset) => {
				asset.classList.remove("selected");
			});
			target.classList.add("selected");

			const targetImage =
				target.querySelector("img");

			if (targetImage) {
				const src =
					targetImage.getAttribute("src");
				const alt =
					targetImage.getAttribute("alt");
				selectedPartsElm.innerHTML = `<img src="${src}" alt="${alt}">`;
			} else {
				selectedPartsElm.innerHTML = "";
			}

			handleChange();
		});
	});
});

document
	.querySelector(".reset_button")
	.addEventListener("click", () => {
		handleReset();
	});

document
	.querySelector(".download_button")
	.addEventListener("click", () => {
		handleDownload();
	});
