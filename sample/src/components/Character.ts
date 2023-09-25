import {
	Character4,
	Character4ParameterObject,
} from "akashic-simple-character4";

export class Character extends Character4 {
	onMoveCompleted: g.Trigger<void>;

	constructor(param: Character4ParameterObject) {
		super(param);
		this.onMoveCompleted = new g.Trigger();
	}

	_handleCharacterUpdate() {
		const hasDestinationPos = this.destinationPos != null;
		super._handleCharacterUpdate();
		if (hasDestinationPos && this.destinationPos == null) {
			this.onMoveCompleted.fire();
		}
	}
}
