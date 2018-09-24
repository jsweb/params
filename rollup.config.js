import typescript from 'rollup-plugin-typescript'

export default [{
  input: 'src/main.ts',
  plugins: [typescript()],
  output: {
    format: 'esm',
    name: 'params',
    file: 'dist/esnext.js'
  }
}, {
  input: 'src/main.ts',
  plugins: [typescript()],
  output: {
    format: 'umd',
    name: 'params',
    file: 'dist/main.js'
  }
}]
