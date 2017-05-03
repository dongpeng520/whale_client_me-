var path = require('path');

var gulp = require('gulp'),
    clean = require("gulp-clean"),//清空文件夹
    rename = require('gulp-rename'),//重命名文件
    uglify = require("gulp-uglify"),//压缩js
    minifyCss = require("gulp-minify-css"),//压缩css
    minifyHtml = require("gulp-minify-html"),//压缩html
    concat = require("gulp-concat"), //多文件合并为一个
    processhtml = require("gulp-processhtml"), //标记的内容,替换指定的文本
    replace = require("gulp-replace"), //文本替换
    rev = require('gulp-rev'),//- 对文件名加MD5后缀
    revColletor = require('gulp-rev-collector'), //生成md5后替换对应的文件名
    autoprefixer = require('gulp-autoprefixer'), //自动加前缀
    spriter = require('gulp-css-spriter'), //雪碧图
    sftp = require('gulp-sftp'), //上传到sftp
    tap = require('gulp-tap'), //遍历所有找到的文件
    sass = require('gulp-sass'), //遍历所有找到的文件
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync');
    connect = require('gulp-connect');
    proxy = require('http-proxy-middleware');

var config = {
    buildPath: "whale",
    revPathCSS: "web/static/rev/revCSS",
    revPathJS: "web/static/rev/revJS"
}


gulp.task('webserver', function () {
    connect.server({
        root: 'web',
        livereload: true,
        port: 5050,
        middleware: function (connect, opt) {
            return [

                proxy('/account', {
                    // target: 'http://192.168.21.205:8082/',
                    // target: 'http://172.16.8.121:8081',
                    // target:'http://192.168.100.210:8081/',
                    //target: 'http://106.39.181.188:8081',
                    //target: 'http://192.168.100.143:8081',
                    target: 'http://106.39.181.188:8081',
                    changeOrigin: true
                }),
                proxy('/task', {

                    //target: 'http://192.168.100.143:8080',
                    target: 'http://106.39.181.188:8080',
                    changeOrigin: true
                }),
                proxy('/downloadHistTaskData', {
                    // target: 'http://192.168.21.205:8082/',
                    // target: 'http://172.16.8.121:8081',
                    // target:'http://192.168.100.210:8081/',

                    target: 'http://192.168.100.143:10081',
                    //target: 'http://106.39.181.188:8080',
                    changeOrigin: true
                }),
                proxy('/downloadCurrentTaskData', {
                    // target: 'http://192.168.21.205:8082/',
                    // target: 'http://172.16.8.121:8081',
                    // target:'http://192.168.100.210:8081/',

                    target: 'http://192.168.100.143:10081',
                    //target: 'http://106.39.181.188:8080',
                    changeOrigin: true
                })

            ];


        }
    });
});



//构建目录清理
gulp.task("clean", function (done) {
    //return cache.clearAll(done);
    return gulp.src(config.buildPath, {
        read: false
    })
        .pipe(clean({force: true}));
})

gulp.task("clean_js", function (done) {
    //return cache.clearAll(done);
    return gulp.src(['pictureAir/static/**/*.js',"!pictureAir/static/js/libs/*.*"], {
        read: false
    })
        .pipe(clean({force: true}));
})

gulp.task("clean_css", function (done) {
    //return cache.clearAll(done);
    return gulp.src(['pictureAir/static/**/*.css'], {
        read: false
    })
        .pipe(clean({force: true}));
})



gulp.task('filecopy', function () {
    gulp.src(['web/static/**/*.*', '!web/static/**/*.html','!web/static/rev/**/*.*', '!web/static/**/*.css', '!web/static/**/*.js','!web/static/img/**/*.*', '!web/static/**/*.scss','!web/static/**/*.map'],{base: 'web'}) //,'!static/**/*.html'
        .pipe(gulp.dest(config.buildPath))


})

gulp.task('minify-md5-css', function () {                                //- 创建一个名为 concat 的 task
    var date = new Date().getTime();
    var stream = gulp.src('web/static/**/*.scss', {base: 'web'})                                 //- 需要处理的css文件，放到一个字符串数组里
    //.pipe(concat('wap.min.css'))                          //- 合并后的文件名
    // .pipe(uglify())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest(config.buildPath))                               //- 输出文件本地
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest(config.revPathCSS))                              //- 将 rev-manifest.json 保存到 rev 目录内
        .pipe(browserSync.reload({stream: true})); //自动进行同步操作
    return stream;
});


gulp.task('image_min', function () {                                //- 创建一个名为 concat 的 task
    gulp.src(['web/static/img/*.*', '!web/static/img/banner.png'], {base: 'web'})                                 //- 需要处理的css文件，放到一个字符串数组里
        .pipe(imagemin())
        .pipe(gulp.dest(config.buildPath))
    gulp.src([ 'web/static/img/banner.png'], {base: 'web'})                                 //- 需要处理的css文件，放到一个字符串数组里
        .pipe(gulp.dest(config.buildPath))

});


gulp.task('minify-md5-js', function () {                                //- 创建一个名为 concat 的 task

    // gulp.run("clean_js")

    gulp.src(["web/static/js/libs/*.*"], {base: 'web'})                                 //- 需要处理的css文件，放到一个字符串数组里
    //.pipe(concat('wap.min.css'))                          //- 合并后的文件名
        //.pipe(uglify())                                      //- 压缩处理成一行
        //.pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest(config.buildPath))                               //- 输出文件本地
        //.pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        //.pipe(gulp.dest(config.revPathJS));                              //- 将 rev-manifest.json 保存到 rev 目录内
        //.pipe(browserSync.reload({stream: true})); //自动进行同步操作

    var stream2 = gulp.src(['web/static/**/*.js',"!web/static/js/libs/*.*"], {base: 'web'})                                 //- 需要处理的css文件，放到一个字符串数组里
    //.pipe(concat('wap.min.css'))                          //- 合并后的文件名
        .pipe(uglify())                                      //- 压缩处理成一行
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest(config.buildPath))                               //- 输出文件本地
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest(config.revPathJS))                             //- 将 rev-manifest.json 保存到 rev 目录内
    //.pipe(browserSync.reload({stream: true})); //自动进行同步操作
    return stream2;
});

gulp.task('replace-minify-html',['minify-md5-css', 'minify-md5-js'], function () {
    gulp.src(['web/static/rev/**/*.json', 'web/*.html'])      //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revColletor())                                   //- 执行文件内css名的替换
        .pipe(minifyHtml())                                     //使用gzip压缩是更好的方式
        .pipe(gulp.dest(config.buildPath))                       //- 替换后的文件输出的目录
        .pipe(browserSync.reload({stream: true})); //自动进行同步操作
    gulp.src(['web/static/rev/**/*.json', 'web/static/template/*.*'], {base: 'web'})      //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revColletor())                                   //- 执行文件内css名的替换
        .pipe(minifyHtml())                                     //使用gzip压缩是更好的方式
        .pipe(gulp.dest(config.buildPath))                     //- 替换后的文件输出的目录
        .pipe(browserSync.reload({stream: true})); //自动进行同步操作
});


gulp.task('autoUpdateSource', function(){
    //单独的监听所有与sass相关的文件，做到对sass转成css的工作
    gulp.watch('web/static/**/*.scss',["clean_css",'minify-md5-css','replace-minify-html'],function () {
            // console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
            // console.log(event.path); //变化的文件的路径
        })
    //单独的监听所有与html相关的文件，若改变，执行html任务
    gulp.watch('web/*.html', ['replace-minify-html']);
    gulp.watch('web/static/template/*.*', ['replace-minify-html']);
    gulp.watch('web/static/**/*.js', ["clean_js",'minify-md5-js','replace-minify-html']);
});

gulp.task('minify-js-controller', function () {
    gulp.src('static/js/controller/*.js', {base: 'static'}) // 要压缩的js文件
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest(config.buildPath)); //压缩后的路径
});

gulp.task('default', ['clean'], function () {
    gulp.start('filecopy','image_min', 'minify-md5-css', 'minify-md5-js', 'replace-minify-html');
    //gulp.run("autoUpdateSource")
});

