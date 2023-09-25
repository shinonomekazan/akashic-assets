const fs = require("fs");
const path = require("path");
const imageScript = require("imagescript/v2");

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

function replace(bg, fg, x2, y){
  const fwidth = fg.width | 0;
  const bwidth = bg.width | 0;
  const fheight = fg.height | 0;
  const bheight = bg.height | 0;
  let mh = Math.min(bheight, fheight) | 0;
  const b32 = bg.u32;
  const f32 = fg.u32;
  for (let yy = y | 0; yy < mh; yy++) {
    const yoffset = yy * bwidth;
    const yyoffset = fwidth * (yy - y);
    for (let xx = x2 | 0; xx < bwidth; xx++) {
      b32[xx + yoffset] = f32[xx - x2 + yyoffset];
    }
  }
}

async function 生成() {
	const target = await loadFile("./target.gif");
	const gif = await imageScript.load(target);
	console.log(gif.width, gif.frames.length, gif.height);
	const base = new imageScript.Image(gif.width * gif.frames.length, gif.height);
	console.log(gif.width * gif.height);
	gif.frames.forEach((frame, index) => {
		replace(base, frame.image, index * gif.width, 0);
	});
	const result = await base.encode("png");
	fs.writeFile(`./result.png`, result, (err) => {
		if (err) {
			console.error(err);
		}
	});
}

生成();
