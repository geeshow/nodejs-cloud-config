import typescript from "@rollup/plugin-typescript";
export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs', // 번들 파일의 출력 경로
        format: 'esm' // 출력 포맷 ('esm' for ES module, 'cjs' for CommonJS, 'umd' for UMD)
      },
      {
        file: 'dist/index.cjs', // 번들 파일의 출력 경로
        format: 'cjs' // 출력 포맷 ('esm' for ES module, 'cjs' for CommonJS, 'umd' for UMD)
      }
    ],
    plugins: [typescript()]
  },
  {
    input: 'src/register/index.cjs',
    output: [
      {
        file: 'dist/register.cjs',
        format: 'cjs'
      }
    ],
    plugins: [typescript()]
  }
];
