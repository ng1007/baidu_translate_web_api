const path = require('path');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const alias = require('@rollup/plugin-alias');
const json =require('@rollup/plugin-json')

const projectRootDir = path.resolve(__dirname);

module.exports = [
    {
        input: './src/index.ts',
        output: [
            {
                dir: 'lib',
                format: 'cjs',
                entryFileNames: '[name].cjs.js',
                sourcemap: false, // 是否输出sourcemap
            },
            {
                dir: 'lib',
                format: 'esm',
                entryFileNames: '[name].esm.js',
                sourcemap: false, // 是否输出sourcemap
            },
            {
                dir: 'lib',
                format: 'iife',
                entryFileNames: '[name].min.js',
                sourcemap: false, // 是否输出sourcemap
            },
            {
                dir: 'lib',
                format: 'umd',
                entryFileNames: '[name].umd.js',
                name: '$utils', // umd模块名称，相当于一个命名空间，会自动挂载到window下面
                sourcemap: false,
                // @ts-ignore
                plugins: [terser()],
            },
        ],
        plugins: [
            alias({
                entries: [{ find: '@', replacement: path.resolve(projectRootDir, 'src') }],
            }),
            resolve(),
            json(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                compilerOptions: { incremental: false }
            }),
        ],
    },
];
