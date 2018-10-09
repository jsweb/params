import typescript from 'rollup-plugin-typescript'
import esmin from 'rollup-plugin-esmin'
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

export default [{
  input: 'src/module.ts',
  plugins: [typescript()],
  output: {
    name,
    banner,
    format: 'esm',
    file: 'dist/module.mjs'
  }
}, {
  input: 'src/umd.ts',
  plugins: [
    typescript(),
    esmin()
  ],
  output: {
    name,
    banner,
    format: 'umd',
    file: 'dist/umd.js'
  }
}]

