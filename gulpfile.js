const gulp = require('gulp'),
	plg = require('gulp-load-plugins')(),
	server = require('gulp-live-server'),
	system = require('node-notifier'),
	rollup = require('rollup').rollup,
	bubble = require('rollup-plugin-buble'),
	uglify = require('rollup-plugin-uglify'),
	commonjs = require('rollup-plugin-commonjs'),
	resolve = require('rollup-plugin-node-resolve'),
	nib = require('nib'),
	axis = require('axis'),
	jeet = require('jeet'),
	rupture = require('rupture'),
	autoprefixer = require('autoprefixer-stylus'),
	stylcfg = {
		compress: true,
		sourcemap: {
			comment: true,
			inline: true
		},
		use: [nib(), axis(), jeet(), rupture(), autoprefixer()]
	},
	bundle = (entry, dest, module, format, map) => {
		return rollup({
			entry,
			plugins: [
				bubble(),
				uglify(),
				commonjs({
					include: 'node_modules/**'
				}),
				resolve({
					jsnext: true,
					main: true
				})
			]
		}).then(js => {
			js.write({
				dest,
				format,
				moduleId: module,
				moduleName: module,
				sourceMap: map,
			})
			return system.notify({
				title: 'Gulp',
				message: 'Rollup compilado',
				sound: true
			})
		})
	}

gulp.task('default', ['cache', 'watch', 'server'])

//Image min
gulp.task('imagemin', done => {
	return gulp.src('web/img/*')
		.pipe(plg.cached('imagemin'))
		.pipe(plg.imagemin())
		.pipe(gulp.dest('web'))
		.pipe(plg.notify('Imagem otimizada para web'))
})

//Stylus
gulp.task('stylus', done => {
	return gulp.src('web/css/*.styl')
		.pipe(plg.cached('stylus'))
		.pipe(plg.sourcemaps.init())
		.pipe(plg.stylus(stylcfg))
		.pipe(plg.sourcemaps.write())
		.pipe(gulp.dest('web'))
		.pipe(plg.notify('Stylus processado'))
})

//HTML
gulp.task('pug', done => {
	return gulp.src('web/html/*.pug')
		.pipe(plg.cached('pug'))
		.pipe(plg.pug())
		.pipe(gulp.dest('web'))
		.pipe(plg.notify('Pug compilado'))
})

//Rollup
gulp.task('lib', done => {
	return bundle('queryfetch.js', 'queryfetch.umd.js', 'queryfetch', 'umd', false)
})
gulp.task('index', done => {
	return bundle('web/js/index.js', 'web/index.js', 'index', 'iife', 'inline')
})

//Cache
gulp.task('cache', done => {
	gulp.src('web/css/*.styl').pipe(plg.cached('stylus'))
	gulp.src('web/html/*.pug').pipe(plg.cached('pug'))
	gulp.src('web/img/*').pipe(plg.cached('imagemin'))

	return system.notify({
		title: 'Gulp',
		message: 'Arquivos armazenados em cache',
		sound: true
	})
})

//Watch
gulp.task('watch', done => {
	gulp.watch('queryfetch.js', ['lib'])
	gulp.watch('web/js/index.js', ['index'])

	gulp.watch('web/css/*.styl', ['stylus'])
	gulp.watch('web/html/*.pug', ['pug'])
	gulp.watch('web/img/*', ['imagemin'])

	return system.notify({
		title: 'Gulp',
		message: 'Tarefas aguardando atualizações',
		sound: true
	})
})

//Live server
gulp.task('server', done => {
	let srv = server.static('/web', 8888)
	srv.start()
	gulp.watch('web/*', file => srv.notify(file))
})
