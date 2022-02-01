//Основной модуль
import gulp from "gulp";

// Импорт путей
import { path } from "./gulp/config/path.js";

//Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

//Переведем значения в глобальный объект (переменную), где хранятся пути и сущности

global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
		path: path,
			gulp: gulp,
				plugins: plugins,
}

//Импортируем задачи 

import { copy } from "./gulp/tasks/copy.js";
gulp.task('copy', copy);
import { reset } from "./gulp/tasks/reset.js";
gulp.task('reset', reset);
import { html } from "./gulp/tasks/html.js";
gulp.task('html', html);
import replace from "gulp-replace";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
gulp.task('scss', scss);
import { js } from "./gulp/tasks/js.js";
gulp.task('js', js);
import { images } from "./gulp/tasks/images.js";
gulp.task('images', images);
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
gulp.task('otfToTtf', otfToTtf);
gulp.task('ttfToWoff', ttfToWoff);
gulp.task('fontsStyle', fontsStyle);
import { svgSprive } from "./gulp/tasks/svgSprive.js";

//Наблюдатель за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
}

//Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
//Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

//Построение сценариев выполнения задач (series - последовательно, parallel - паралельно)
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

// Экспорт сценариев
export { svgSprive }
export { dev }
export { build }

// Выполнение сценариев по умолчанию
gulp.task('default', dev);

