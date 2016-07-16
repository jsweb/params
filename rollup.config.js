import buble from 'rollup-plugin-buble'

export default {
	moduleId: 'queryfetch',
	moduleName: 'queryfetch',
	entry: 'queryfetch.js',
	dest: 'queryfetch.umd.js',
	plugins: [buble()],
	format: 'umd'
}
