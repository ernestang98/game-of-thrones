### Admin UI Non-functional Testing (Security)

- Technology:

  - [OWASP ZAP](https://www.zaproxy.org/download/)
  
  - Java
  
  - mvn
  
  - Selenium

- Basic set up (to ensure that it works)

  - Test using bodgeit store:

    - [YouTube tutorial](https://www.youtube.com/watch?v=H0kSuP1bM1Y)

  - [Tomcat Server](http://tomcat.apache.org/)

    - [How to start server](https://www.youtube.com/watch?v=h_qQOVDTxo8)

    - Tl/dr: enable all executables under bin (*.sh), then run startup.sh or shutdown.sh to start or stop the server respectively

      ```bash
      cd bin
      ls -al *.sh
      ./startup.sh
      ./shutdown.sh
      ```

  - [Bodgeit Store](https://github.com/psiinon/bodgeit/releases/tag/1.4.0)

    - [DEPRACATED](https://code.google.com/archive/p/bodgeit/)

    - Under the `webapps` directory, create folder (i.e. `store`)  

    - Download the war file and extract the contents into `store` using the following command

      ```bash
      jar -xvf <filename>.war        
      ```

    - Start your tomcat server

    - Go to your browser and search `localhost:8080/store`

### Tutorial (All using Selenium, OWASP and Java)

- [Practical DevSecOps Tutorial on Automating Security Tests using Selenium and OWASP ZAP (No Source Code)](https://www.youtube.com/watch?v=Ho_4EvKGSUA)

- [Proof of Concept Selenium & OWASP ZAP Security Test Automation (with source code)](https://www.youtube.com/watch?v=H0kSuP1bM1Y)

- [Article on Security Testing using OWASP ZAP with Selenium](https://blogs.halodoc.io/driving-security-testing-by-owasp-zap-with-selenium/)

### Implementation

1. Run OWASP ZAP
    
    - Disable API Key (Tools -> Options -> API)
    
    - Set Local Proxy Port to 8888 (Tools -> Options -> Local Proxies)
    
2. Start localhost at root directory
    
   ```bash
   npm start
   ```

3. Start the test

   ```bash
   mvn clean test
   ```

### Selenium Stuff

- [Wait for text/element](https://riptutorial.com/selenium-webdriver/example/15496/different-types-of-explicit-wait-conditions)

### Debugging Errors

- Error 1:

    ```
    [warn] kq_init: detected broken kqueue; not using.: Undefined error: 0
    ```
    
    - Solution: https://github.com/spyder-ide/spyder/issues/3730

- Error 2:  

    ```
    testSecurityVulnerabilitiesAfterLogin(net.continuumsecurity.ZapScanTest)  Time elapsed: 7.072 sec  <<< ERROR!
    org.openqa.selenium.WebDriverException: unknown error: Runtime.executionContextCreated has invalid 'context': {"auxData":{"frameId":"834991767FC66F2EADBCA68583820B06","isDefault":true,"type":"default"},"id":1,"name":"","origin":"://","uniqueId":"7739072904322843884.2010622248082733047"}
      (Session info: chrome=95.0.4638.54)
      (Driver info: chromedriver=2.14.313457 (3d645c400edf2e2c500566c9aa096063e707c9cf),platform=Mac OS X 10.15.7 x86_64) (WARNING: The server did not provide any stacktrace information)
    ```
    
    - Outdated version of chromedriver, use new one

- Error 3: 

    ```
    java.lang.NullPointerException while invoking selenium driver.quit()
    ```
    
    - [Stackoverflow Article](https://stackoverflow.com/questions/50766063/java-lang-nullpointerexception-while-invoking-driver-quit-within-afterclass-a)
    
    - For me, I think there was some bug cause after I asserted that driver is not null, it was working fine 

- Error 4:  

    ```
    [1635586197.030][SEVERE]: Timed out receiving message from renderer: 3.677
    [1635586197.031][SEVERE]: Timed out receiving message from renderer: 3.677
    ```
    
    - Some timeout error, just re-run it, if need be, set the timeout duration to be longer

- Error 5:

    ```
    Failed to load resource: net::ERR_CERT_AUTHORITY_INVALID, network error
    ```
    
    - Need to set chromedriver in Java to accept insecure certs
    
    - https://github.com/SeleniumHQ/selenium/issues/4791
    
    - https://www.toolsqa.com/selenium-webdriver/ssl-certificate-in-selenium/

- Error 6: 
    
   OWASP ZAP Spider not spidering all the URLS
   
  - [OWASP ZAP 'not spidering' SPA](https://stackoverflow.com/questions/39020732/can-zap-be-used-for-spa-application)
  
  - [OWASP ZAP structured parameteres & AJAX Spider for SPA](https://stackoverflow.com/questions/60400926/zap-spider-not-working-in-angular-spa-how-to-setup-structural-parameters)

  - [OWASP ZAP Security Testing on SPA](https://stackoverflow.com/questions/38890260/how-to-do-security-testing-on-angularjs-with-the-use-of-owasp-zap)

  - I think ZAP Spider is for server side rendering of files (.html, .jsp), for client side rendering using JavaScript, use AJAX Spider
  
  - For more information on AJAX Spider, click [here](https://www.zaproxy.org/docs/desktop/addons/ajax-spider/options/#:~:text=The%20AJAX%20Spider%20allows%20you,%2C%20to%20cover%20HTML%20comments).)
  
  - [Documentation with code segments in Java, Python and Bash](https://www.zaproxy.org/docs/api/?java#using-ajax-spider)

  - [ApiResponse.toString() not working, need to use .toString(0)](https://stackoverflow.com/questions/61954694/how-to-retrieve-the-results-of-ajaxspider-scan-using-the-java-apis-of-zap)

### Using Github Actions 

- Need to enable  `issues`  on Github

  - Settings -> Options -> Issues

- 3 types of OWASP ZAP scans on Github Actions Marketplace

  - https://github.com/marketplace?type=actions&query=owasp+

- Sharing of Github Actions outputs (Caches & Artifacts)

  - https://levelup.gitconnected.com/github-actions-how-to-share-data-between-jobs-fc1547defc3e

- Zap Proxy report.html output path using Docker OWASP ZAP (which is what OWASP ZAP plugin on Github Actions Marketplace uses)

  - https://github.com/zaproxy/zaproxy/issues/5881

- Articles on people using this plugin and demonstrating it (ALL scans on marketplace generates reports, creates issues, and has settings which are similarly configurable, all action notes is on marketplace)

  - https://www.lunavi.com/blog/using-the-owasp-zap-baseline-scan-github-action

  - https://zimmergren.net/security-scanning-with-github-actions-and-owasp-zap

  - https://dev.to/cheahengsoon/security-testing-with-zap-and-github-actions-4kae

- Different types of exit codes for OWASP ZAP docker container

  - [Different types of exit codes for OWASP ZAP docker container](https://github.com/zaproxy/zaproxy/blob/efb404d38280dc9ecf8f88c9b0c658385861bdcf/docker/zap-baseline.py#L31-L35)

  - [Explanation for why scans are failing from `WARN-NEW`](https://github.com/zaproxy/action-baseline/issues/34)

### Other stuff

- [Integrate into CI/CD pipeline (Jenkins)](https://medium.com/cloudadventure/security-in-a-ci-cd-pipeline-876ed8541fa4)

- [Selenium Retry Failed Test](https://seleniumjava.com/2017/07/22/how-to-retry-automatically-selenium-tests/)

