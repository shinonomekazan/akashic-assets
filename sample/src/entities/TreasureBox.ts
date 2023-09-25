export interface TreasureBoxParameterObject
	extends g.FrameSpriteParameterObject {
	hasTreasure: boolean;
	isClosed: boolean;
}

export class TreasureBox extends g.FrameSprite {
	_isClosed: boolean;

	_hasTreasure: boolean;

	constructor(param: TreasureBoxParameterObject) {
		super(param);
		this._isClosed = param.isClosed;
		this.hasTreasure = param.hasTreasure;
		this.interval = param.interval ?? 200;
		this.loop = false;
	}

	get closed() {
		return this._isClosed;
	}

	set hasTreasure(value: boolean) {
		this._hasTreasure = value;
		console.log("set hasTreasure");
		this.frames = [0, 1, value ? 2 : 3];
		if (this.closed === false) {
			this.frames.reverse();
		}
		this.frameNumber = 0;
		this.modified();
	}

	get hasTreasure() {
		return this._hasTreasure;
	}

	open() {
		this._isClosed = false;
		if (this.frames[0] % 4 !== 0) {
			this.frames.reverse();
		}
		this.frameNumber = 0;
		this.start();
	}

	close() {
		this._isClosed = true;
		if (this.frames[0] % 4 === 0) {
			this.frames.reverse();
		}
		this.frameNumber = 0;
		this.start();
	}
}
