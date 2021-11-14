module.exports = {
  verbose: true,
  globals: {
    NODE_ENV: "test",
  },
  // "reporters": [
  //   "default",
  //   [
  //     "./node_modules/jest-html-reporter", 
  //     {
  //       "pageTitle": "Test Report"
  //     }
  //   ]
  // ]
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/src/__mocks__/fileMock.js',
  },
  "reporters": [
    "default",
    [
      "jest-html-reporters", 
      {
        // "publicPath": "./asdasd",
        "filename": "report.html"
      }
    ]
  ]
}
