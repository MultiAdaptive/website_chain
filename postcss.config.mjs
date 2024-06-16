/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-preset-env': {
      browsers: 'last 2 version'
    },
    autoprefixer: {},
    tailwindcss: {},
    'postcss-pxtorem': {
      rootValue: 16, // 1rem的基准值
      unitPrecision: 5, // 转换后保留的小数位数
      propList: ['*'], // 需要转换的属性列表，'*'表示全部
      selectorBlackList: [], // 要忽略的选择器
      replace: true, // 替换而不是添加备用单位
      mediaQuery: false, // 允许在媒体查询中转换px
      minPixelValue: 0 // 最小的转换值
    }
  },
};

export default config;
