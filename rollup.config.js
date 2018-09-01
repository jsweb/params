import babel from 'rollup-plugin-babel'

const author = `/**
 * @author Alex Bruno Cáceres
 * @email git.alexbr@outlook.com
 * @date 2016-07-16 09:26:19
 * @desc Simple JS module to parse/serialize HTTP query/params, useful for Fetch API or AJAX requests
 */`

export default [{
  input: 'src/params.js',
  plugins: [babel()],
  output: {
    format: 'umd',
    name: 'params',
    file: 'dist/params.js',
    banner: author
  }
}, {
  input: 'src/test.js',
  external: ['assert', './params'],
  output: {
    format: 'cjs',
    name: 'test',
    file: 'dist/test.js'
  }
}]
