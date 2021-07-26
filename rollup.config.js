import { terser } from "rollup-plugin-terser";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/main.js',
    output: {
        name: 'VueRefreshable',
        file: 'dist/vueRefreshable.js',
        exports: 'named',
        sourcemap: true
    },
    watch: {
        include: 'src/**/*',
        exclude: 'node_modules/**',
    },
    plugins: [
        terser(),
        commonjs({
            include: /node_modules/
        }),
        nodeResolve(),
    ]
  };
  