import del from "del";
//Экспортируем функцию копирования файлов с исходников в конечную папку
export const reset = () => {
	return del(app.path.clean);
}