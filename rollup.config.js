import babel from 'rollup-plugin-babel'

export default [{
  input: 'src/main.js',
  plugins: [babel()],
  output: {
    format: 'umd',
    name: 'params',
    file: 'dist/main.js'
  }
}, {
  input: 'src/test.js',
  external: ['assert', './main'],
  output: {
    format: 'cjs',
    name: 'test',
    file: 'dist/test.js'
  }
}]
