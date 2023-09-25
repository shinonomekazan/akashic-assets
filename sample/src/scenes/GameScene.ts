import * as tileEx from "akashic-tile-ex";
import * as components from "../components";
import * as entities from "../entities";
import * as utils from "../utils";
import * as constraints from "../constraints";
import { BaseScene } from "./BaseScene";

export class GameScene extends BaseScene {
	button?: components.BasicButton;
	doorIsClosed: boolean;
	doors: entities.Door[];
	treasures: entities.TreasureBox[];
	buttons: entities.FrameButton[];

	constructor(param: g.SceneParameterObject) {
		super(utils.mergeAssetPaths(param, constraints.AssetPaths));

		this.onLoad.addOnce(this.handleOnLoad, this);
		this.button = undefined;
		this.doorIsClosed = true;
		this.doors = [];
		this.treasures = [];
		this.buttons = [];
	}

	createRawTileToTileData(rawTile: number[][]): tileEx.TileCell[][] {
		return rawTile.map((rawRow) =>
			rawRow.map((rawCell) => {
				switch (rawCell) {
					case 0:
						return [0, 0];
					case 1:
						return [0, 1];
					case 2:
						return [1, 0];
					default:
						throw new Error(
							`Detected invalid tile data: ${rawCell}`
						);
				}
			})
		);
	}

	handleOnLoad() {
		const field = {
			x: 0,
			y: 0,
			width: 32 * 15,
			height: 32 * 13,
		};
		new tileEx.TileEx({
			scene: this,
			chipSets: [
				new tileEx.ChipSet({
					src: this.asset.getImage("/assets/tile/tile.png"),
					tileWidth: 32,
					tileHeight: 32,
				}),
				new tileEx.WolfAutoTileChipSet({
					src: this.asset.getImage("/assets/autotile1.png"),
					tileWidth: 32,
					tileHeight: 32,
				}),
			],
			tileWidth: 32,
			tileHeight: 32,
			tileData: this.createRawTileToTileData([
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
				[0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0],
				[0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			]),
			parent: this,
			x: field.x,
			y: field.y,
			width: field.width,
			height: field.height,
		});

		const objectLayer = new g.E({
			scene: this,
			parent: this,
			x: field.x,
			y: field.y,
			width: field.width,
			height: field.height,
		});
		const door1 = new entities.Door({
			scene: this,
			src: this.asset.getImage("/assets/doors/door-gold.png"),
			frames: [0, 1, 2],
			frameNumber: 0,
			parent: objectLayer,
			width: 32,
			height: 32,
			x: 3 * 32,
			y: 3 * 32,
			interval: 200,
		});
		const door2 = new entities.Door({
			scene: this,
			src: this.asset.getImage("/assets/doors/door-wood.png"),
			frames: [0, 1, 2],
			frameNumber: 0,
			parent: objectLayer,
			width: 32,
			height: 32,
			x: 5 * 32,
			y: 3 * 32,
			interval: 200,
		});
		this.doors.push(door1);
		this.doors.push(door2);
		const treasureBox1 = new entities.TreasureBox({
			scene: this,
			parent: objectLayer,
			src: this.asset.getImage("/assets/treasures/takarabako_blue.png"),
			width: 32,
			height: 32,
			x: 7 * 32,
			y: 3 * 32,
			hasTreasure: true,
			isClosed: true,
		});
		const treasureBox2 = new entities.TreasureBox({
			scene: this,
			parent: objectLayer,
			src: this.asset.getImage("/assets/treasures/takarabako_blue.png"),
			width: 32,
			height: 32,
			x: 8 * 32,
			y: 3 * 32,
			hasTreasure: false,
			isClosed: true,
		});
		const treasureBox3 = new entities.TreasureBox({
			scene: this,
			parent: objectLayer,
			src: this.asset.getImage("/assets/treasures/takarabako_red.png"),
			width: 32,
			height: 32,
			x: 9 * 32,
			y: 3 * 32,
			hasTreasure: true,
			isClosed: true,
		});
		const treasureBox4 = new entities.TreasureBox({
			scene: this,
			parent: objectLayer,
			src: this.asset.getImage("/assets/treasures/takarabako_red.png"),
			width: 32,
			height: 32,
			x: 10 * 32,
			y: 3 * 32,
			hasTreasure: false,
			isClosed: true,
		});
		this.treasures.push(treasureBox1);
		this.treasures.push(treasureBox2);
		this.treasures.push(treasureBox3);
		this.treasures.push(treasureBox4);

		new components.BasicButton({
			scene: this,
			src: this.asset.getImage("/assets/buttons/btn_blue1.png"),
			width: 32,
			height: 32,
			x: this.game.width / 2 - 34 / 2 - 64,
			y: this.game.height - 34 - 17,
			// x: 1 * 32,
			// y: 6 * 32,
			parent: this,
		});
		new components.BasicButton({
			scene: this,
			src: this.asset.getImage("/assets/buttons/btn_blue1.png"),
			width: 32,
			height: 32,
			x: this.game.width / 2 - 34 / 2 - 96,
			y: this.game.height - 34 - 17,
			parent: this,
			disabled: true,
		});
		const button1 = new entities.FrameButton(this, {
			src: this.asset.getImage("/assets/buttons/btn_blue2.png"),
			width: 32,
			height: 32,
			x: 1 * 32,
			y: 6 * 32,
			parent: objectLayer,
		});
		const button2 = new entities.FrameButton(this, {
			src: this.asset.getImage("/assets/buttons/btn_green1.png"),
			width: 32,
			height: 32,
			x: 2 * 32,
			y: 6 * 32,
			parent: objectLayer,
		});
		const button3 = new entities.FrameButton(this, {
			src: this.asset.getImage("/assets/buttons/btn_green2.png"),
			width: 32,
			height: 32,
			x: 3 * 32,
			y: 6 * 32,
			parent: objectLayer,
		});
		const button4 = new entities.FrameButton(this, {
			src: this.asset.getImage("/assets/buttons/btn_red1.png"),
			width: 32,
			height: 32,
			x: 4 * 32,
			y: 6 * 32,
			parent: objectLayer,
		});
		const button5 = new entities.FrameButton(this, {
			src: this.asset.getImage("/assets/buttons/btn_red2.png"),
			width: 32,
			height: 32,
			x: 5 * 32,
			y: 6 * 32,
			parent: objectLayer,
		});
		this.buttons.push(button1);
		this.buttons.push(button2);
		this.buttons.push(button3);
		this.buttons.push(button4);
		this.buttons.push(button5);

		const chara4 = new components.Character({
			scene: this,
			src: this.asset.getImage("/assets/characters/character1.png"),
			animationFrameCount: 3,
			interval: 200,
			width: 32,
			height: 32,
			parent: this,
			x: g.game.width / 2,
			y: g.game.height / 2,
		});
		chara4.start();
		chara4.onMoveCompleted.add(() => {
			this.buttons.forEach((button) => {
				if (button.x === chara4.x && button.y === chara4.y) {
					button.frameNumber = 1;
					button.modified();
				}
			});
		}, this);
		this.onPointDownCapture.add((e) => {
			if (e.target != null) return;
			const x = Math.floor(e.point.x / 32);
			const y = Math.floor(e.point.y / 32);
			if (x < 0 || x > 14) return;
			if (y < 0 || y > 12) return;
			this.buttons.forEach((button) => {
				if (button.x === chara4.x && button.y === chara4.y) {
					button.frameNumber = 0;
					button.modified();
				}
			});
			chara4.animationMoveTo(x * 32, y * 32);
		});

		this.button = new components.BasicButton({
			scene: this,
			src: this.asset.getImage("/assets/parts/buttons.png"),
			width: 34,
			height: 34,
			x: this.game.width / 2 - 34 / 2,
			y: this.game.height - 34 - 17,
			parent: this,
		});
		this.button.onClick.add(this.handleButtonClick, this);
	}

	handleButtonClick() {
		this.doors.forEach((door) => {
			if (this.doorIsClosed) {
				door.open();
			} else {
				door.close();
			}
		});
		this.treasures.forEach((treasure) => {
			if (this.doorIsClosed) {
				treasure.open();
			} else {
				treasure.close();
			}
		});
		this.doorIsClosed = !this.doorIsClosed;
	}
}
