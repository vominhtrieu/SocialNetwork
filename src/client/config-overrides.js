const { override, addLessLoader, fixBabelImports } = require("customize-cra");
const darkTheme = require("@ant-design/dark-theme");

module.exports = override(
  fixBabelImports("antd", {
    libraryDirectory: "es",
    libraryName: "antd",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { ...darkTheme.default },
    },
  })
);
