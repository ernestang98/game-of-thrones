## Administration User Interface (AUI):

- Deployed on: https://loving-easley-7c1b0c.netlify.app/

- Guide followed: https://www.freecodecamp.org/news/how-to-deploy-react-router-based-app-to-netlify/

- [Netlify CI set to `false`](https://stackoverflow.com/questions/62863131/netlify-deploy-failed-to-compile-react-spa)

## Jest Configurations + Report Generation

- Error 1:

  ```
  SyntaxError: /Users/ernestang98/Desktop/cz3003/ssad-ui/src/__test__/AssignmentAdd.test.js: Support for the experimental syntax 'jsx' isn't currently enabled (12:31):

  Add @babel/preset-react (https://git.io/JfeDR) to the 'presets' section of your Babel config to enable transformation.
    If you want to leave it as-is, add @babel/plugin-syntax-jsx (https://git.io/vb4yA) to the 'plugins' section to enable parsing.
  ```

  - [Fix: Configure babel.config.js](https://stackoverflow.com/questions/65880113/react-add-babel-preset-react-https-git-io-jfedr-to-the-presets-section)

- Error 2:

  ```
    ● Test suite failed to run

    /Users/ernestang98/Desktop/cz3003/ssad-ui/node_modules/@fontsource/roboto/500.css:2
    @font-face {
    ^

    SyntaxError: Invalid or unexpected token
  ```
  
  - [Fix: Need to mock out these files cause the are dependencies](https://stackoverflow.com/questions/54627028/jest-unexpected-token-when-importing-css)

- Error 3:

  ```
  ● Test suite failed to run

    Configuration error:

    Could not locate module @fontsource/roboto/500.css mapped as:
    src/__mocks__/styleMock.js.

    Please check your configuration for these entries:
    {
      "moduleNameMapper": {
        "/\.(css|less)$/": "src/__mocks__/styleMock.js"
      },
      "resolver": undefined
    }

       5 | import ProTip from './ProTip';
       6 | import ButtonAppBar from './AppBar'
    >  7 | import '@fontsource/roboto/500.css';
         | ^
       8 | import { styled } from '@mui/material/styles';
       9 | import {
      10 |     Box,
  ```
  
  - [Fix: do not remove `<rootDir>` and name folders & files properly](https://stackoverflow.com/questions/57307668/jest-error-could-not-locate-module-mapped-as)

- Error 4 (not really error):

  ```
  No files were found with the provided path: ./report.html. No artifacts will be uploaded.
  ```
  
  - When you run yarn test or npm run test, you are not directly running jest and hence report will not be generated
  
  - Hotfix: created a `yarn-test` under script in package.json, and got the ci pipeline to run `yarn yarn-test` as a workaround  

- [Jest Report Generator 1 - jest-html-reporter](https://www.npmjs.com/package/jest-html-reporter)

- [Jest Report Generator 2 - jest-html-reporters](https://www.npmjs.com/package/jest-html-reporters)

## CORS/Netlify-specific CORS problems

- https://stackoverflow.com/questions/62507022/how-to-enable-cors-on-a-netlify-deployment

- https://answers.netlify.com/t/access-control-allow-origin-policy/1813

- https://stackoverflow.com/questions/10636611/how-does-access-control-allow-origin-header-work

- https://stackoverflow.com/questions/20035101/why-does-my-javascript-code-receive-a-no-access-control-allow-origin-header-i

- https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

## Background on CORS

- [What is CORS?](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

- [Wikipedia: Same Origin Policy](https://en.wikipedia.org/wiki/Same-origin_policy)

- [Mozilla: Same Origin Policy + definitions](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)

- [Purpose of Same Origin Policy in Browsers](https://www.hackedu.com/blog/same-origin-policy-and-cross-origin-resource-sharing-cors)

- [What is the `No 'Access-Control-Allow-Origin' Header Present` error](https://www.stackhawk.com/blog/fixing-no-access-control-allow-origin-header-present/)

- tl/dr: most servers will only allow requests from sources of the same origin. To allow requests from different origins (even if server and client are on the same domain but on different ports, it would amount to the client and server having different origins), need to set up cors (see backend repo `main.py` file) if not cors error will be thrown server side. Cors error can also thrown client side as most browsers are implemented with Same Origin Policy when sending requests for security purposes. This creates the current problem we observe on our netlify deployment, where `No 'Access-Control-Allow-Origin' Header Present` error is thrown.

## Netlify CI/CD

- Disabled auto deployment in order to integrate Github Actions into our workflow

- https://dev.to/dancurtis/ci-cd-pipeline-with-netlify-and-github-actions-bcm

- https://docs.netlify.com/configure-builds/stop-or-activate-builds/

- Netlify CI set to `false`: https://stackoverflow.com/questions/62863131/netlify-deploy-failed-to-compile-react-spa



