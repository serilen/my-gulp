import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие файла css
import webpcss from 'gulp-webpcss'; // Вывод изображений Webp
import autoprefixer from "gulp-autoprefixer"; //Добавление вендерных префиксов
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import sourcemaps from 'gulp-sourcemaps';
import gulpIf from 'gulp-if';

const sass = gulpSass(dartSass);

//Экспортируем функцию копирования файлов с исходников в конечную папку
export const scss = () => {

   return app.gulp.src(app.path.src.scss, { sourcemaps: true })
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
         })))
      .pipe(
         app.plugins.if(
            app.isDev,
            sourcemaps.init()
         )
      )
      .pipe(sass({
         outputStyle: 'expanded'
      }))
      .pipe(
         app.plugins.if(
            app.isBuild,
            autoprefixer(
               {
                  grid: true,
                  overrideBrowserslist: ["last 3 versions"],
                  cascade: true
               }
            )
         )
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            webpcss(
               {
                  webpClass: ".webp",
                  noWebpClass: ".no-webp"
               }
            )
         )
      )
      .pipe(app.plugins.replace(/@img\//g, '/img/'))
      .pipe(app.gulp.dest(app.path.build.css)) //Не сжатый файл css, если не надо, то убрать или закомитить 
      .pipe(
         app.plugins.if(
            app.isBuild,
            cleanCss()
         )
      )
      .pipe(rename({
         extname: ".min.css"
      }))
      .pipe(
         app.plugins.if(
            app.isDev,
            sourcemaps.write()
         )
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream());
}