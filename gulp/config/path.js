//Берем получаем доступ к исходным файлам по пути в глобальной переменной

import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

//Путь к конечной папке
const buildFolder = `./dist`;
//Путь к исходникам
const srcFolder = `./src`;

export const path = {
	//Укажем путь куда выгружаем файлы
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`
	},
	src: {
		//Укажем путь откуда берем файлы
		js: `${srcFolder}/js/`,
		images: `${srcFolder}/img/**/*.{img,jpg,iso,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		scss: `${srcFolder}/scss/*.scss`,
		html: `${srcFolder}/*.html`,
		files: `${srcFolder}/files/**/*.*`,
		svgicons: `${srcFolder}/svgicons/*.svg`,
	},
	//Укажем путь за какими изменениями в какой папке необходимо следить постоянно
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
		images: `${srcFolder}/img/**/*.{img,jpg,jpeg,png,svg,gif,ico,webp}`,
		files: `${srcFolder}/files/**/*.*`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: ``
}