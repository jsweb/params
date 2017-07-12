import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

export default {
	format: 'umd',
	dest: 'queryfetch.js',
	entry: 'queryfetch.jsx',
	moduleName: 'queryfetch',
	amd: { id: 'queryfetch' },
	plugins: [buble(), uglify()]
}