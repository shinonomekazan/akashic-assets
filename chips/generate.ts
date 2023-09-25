import * as fs from "fs";
import * as path from "path";
// TODO: 型定義
const Spritesmith = require("spritesmith");

function listDir(dirPath: string) {
	return new Promise<fs.Dirent[]>((resolve, reject) => {
		fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
			if (err != null) {
				reject(err);
				return;
			}
			resolve(files);
		});
	});
}

function createImage(files: string[]) {
	return new Promise<any>((resolve, reject) => {
		Spritesmith.run(
			{
				src: files,
				algorithm: "left-right",
			},
			(err: any, result: any) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(result);
			}
		);
	});
}

function writeFile(result: any, filePath: string) {
	return new Promise<void>((resolve, reject) => {
		fs.writeFile(filePath, result.image, (err) => {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});
}

async function execute(baseDir: string) {
	const dir = "tile";
	const dirPath = path.join(baseDir, dir);
	const files = await listDir(dirPath);
	const result = await createImage(
		files.map((f) => path.join(baseDir, dir, f.name))
	);
	console.log(result);
	await writeFile(
		result,
		path.join(baseDir, `${dir}.png`)
	);
}

const baseDir = path.resolve(__dirname);
execute(baseDir);
