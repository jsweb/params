import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'queryfetch.esm.js',
  output: {
    format: 'umd',
    name: 'queryfetch',
    file: 'queryfetch.js',
    amd: {
      id: 'queryfetch'
    }
  },
  plugins: [buble(), uglify()]
}
