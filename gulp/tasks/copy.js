//Экспортируем функцию копирования файлов с исходников в конечную папку

export const copy = () => {
// Берем получаем доступ к исходным файлам по пути в глобальной переменной

	return app.gulp.src(app.path.src.files)
	.pipe(app.gulp.dest(app.path.build.files))
}