import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/vueRefreshable.js',
    output: {
        name: 'VueRefreshable',
        file: 'dist/vueRefreshable.js',
        exports: 'named'
    },
    watch: {
        include: 'src/**/*',
        exclude: 'node_modules/**',
    },
    plugins: [
        terser()
    ]
  };
  