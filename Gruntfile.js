/** Load Javascript Library */
const path = require('path')

/** Export Module */
module.exports = function (grunt) {
	/** Configuration */
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/** Compile TailwindCSS - Cross Platform */
		shell: {
			npm_tailwind: {
				command: `npx tailwindcss build assets/css/tailwind/style.css -o assets/build/css/tailwind.min.css --silent`,
			},
			sass: {
				command: () => {
					let assets = { // No extension because added in loop command
						"assets/css/backend/style.scss": `assets/build/css/backend.min.css`,
						"assets/css/frontend/style.scss": `assets/build/css/frontend.min.css`,
					}
					let cmd = [];
					for (const [source, target] of Object.entries(assets)) {
						cmd.push(`npx sass ${source} ${target} --style compressed`)
					}
					return cmd.join(' && ')
				},
			},
		},

		/** CSS Minify */
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1,
			},
			target: {
				files: {
					'assets/build/css/backend.min.css':
						'assets/build/css/backend.min.css',
					'assets/build/css/frontend.min.css':
						'assets/build/css/frontend.min.css',
				},
			},
		},

		/** Configure watch task */
		watch: {
			options: {
				livereload: false,
			},
			css: {
				files: [
					'assets/css/**/*.scss',
					'assets/css/**/*.css',
					'src/View/**/*.php',
					'*.php',
					'template-parts/**/*.php',
				],
				tasks: ['build-css'],
			},
		},
	})

	/** Load Plugin */
	grunt.loadNpmTasks('grunt-shell')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-cssmin')

	/** Register Tasks */
	grunt.registerTask('build-css', [ 'shell:npm_tailwind', 'shell:sass', 'cssmin' ])
	grunt.registerTask('build', ['build-css'])
	grunt.registerTask('default', ['build'])
}
