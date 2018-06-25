import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: './src/queryfetch.js',
  output: {
    format: 'umd',
    name: 'queryfetch',
    file: './dist/queryfetch.js',
    amd: {
      id: 'queryfetch'
    }
  },
  plugins: [buble(), uglify()]
}
