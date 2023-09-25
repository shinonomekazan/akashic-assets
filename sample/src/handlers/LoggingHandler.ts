export function LoggingHandler(e: g.MessageEvent) {
	console.log(
		`message:${e.player.id} to ${g.game.selfId}${e.local ? "(local)" : ""}`,
		e.data
	);
}
