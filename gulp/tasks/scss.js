import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие файла css
import webpcss from 'gulp-webpcss'; // Вывод изображений Webp
import autoprefixer from "gulp-autoprefixer"; //Добавление вендерных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; //Группировка медиа-запросов


const sass = gulpSass(dartSass);

//Экспортируем функцию копирования файлов с исходников в конечную папку
export const scss = () => {

   return app.gulp.src(app.path.src.scss, { sourcemaps: true })
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
         })))
      .pipe(app.plugins.replace(/@img\//g, '../img/'))
      .pipe(sass({
         outputStyle: 'expanded'
      }))
      .pipe(groupCssMediaQueries())
      .pipe(webpcss({
         webpClass: ".webp",
         noWebpClass: ".no-webp"
      }))
      .pipe(autoprefixer({
         grid: true,
         overrideBrowserslist: ["last 3 versions"],
         cascade: true
      }))
      .pipe(app.gulp.dest(app.path.build.css)) //Не сжатый файл css, если не надо, то убрать или закомитить 
      .pipe(cleanCss())
      .pipe(rename({
         extname: ".min.css"
      }))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream());
}