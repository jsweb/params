import resolve from '@rollup/plugin-node-resolve'
import common from '@rollup/plugin-commonjs'
import pack from './package.json'

const name = pack.name.split('/')[1]
const modify = new Date().toJSON().split('.')[0].replace('T', ' ')
const banner = `/**
 * @name ${pack.name}
 * @version ${pack.version}
 * @desc ${pack.description}
 * @author ${pack.author}
 * @create date 2016-07-16 09:26:19
 * @modify date ${modify}
 */`

export default [
  {
    input: 'src/index.js',
    plugins: [resolve(), common()],
    output: {
      name,
      banner,
      format: 'esm',
      file: 'index.js',
    },
  },
]
