export class Door extends g.FrameSprite {
	_isClosed: boolean;

	constructor(param: g.FrameSpriteParameterObject) {
		super(param);
		this._isClosed = false;
		this.loop = false;
	}

	get closed() {
		return this._isClosed;
	}

	open() {
		this._isClosed = false;
		if (this.frames[0] % this.frames.length !== 0) {
			this.frames.reverse();
		}
		this.frameNumber = 0;
		this.start();
	}

	close() {
		this._isClosed = true;
		if (this.frames[0] % this.frames.length === 0) {
			this.frames.reverse();
		}
		this.frameNumber = 0;
		this.start();
	}
}
