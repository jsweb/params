import esbuild from 'esbuild'
import pack from './package.json' assert { type: 'json' }

const modify = new Date().toJSON().split('.')[0].replace('T', ' ')
const banner = `/**
 * @name ${pack.name}
 * @version ${pack.version}
 * @desc ${pack.description}
 * @author ${pack.author}
 * @create date 2016-07-16 09:26:19
 * @modify date ${modify}
 */`

esbuild
  .build({
    entryPoints: ['src/params.ts'],
    outdir: 'dist',
    format: 'esm',
    bundle: true,
    minify: true,
    banner: {
      js: banner,
    },
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
