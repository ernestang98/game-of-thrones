package cz3003.teamTWO;

import cz3003.teamTWO.drivers.DriverFactory;
import net.continuumsecurity.proxy.ScanningProxy;
import net.continuumsecurity.proxy.Spider;
import net.continuumsecurity.proxy.ZAProxyScanner;
import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.Proxy;
import org.openqa.selenium.WebDriver;
import org.zaproxy.clientapi.core.Alert;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;

/**
 * This class encapsulates the methods used for Security Test using OWASP ZAP
 * combined with our automated E2E testing with Selenium
 */
public class EndToEndSecurityTest {
    static Logger log = Logger.getLogger(EndToEndSecurityTest.class.getName());
    private final static String ZAP_PROXYHOST = "localhost";
    private final static int ZAP_PROXYPORT = 8888;
    private final static String ZAP_APIKEY = null;
    private final static String CHROME_DRIVER_PATH = "drivers/chromedriver";
    private final static String MEDIUM = "MEDIUM";
    private final static String HIGH = "HIGH";
    private ScanningProxy zapScanner;
    private Spider zapSpider;
    private WebDriver driver;
    private AdminInterfaceNavigation myApp;
    private final static String[] policyNames = {
            "directory-browsing",
            "cross-site-scripting",
            "sql-injection",
            "path-traversal",
            "remote-file-inclusion",
            "server-side-include",
            "script-active-scan-rules",
            "server-side-code-injection",
            "external-redirect",
            "crlf-injection"
    };
    int currentScanID;

    /**
     * This method runs before every @Test suite runs
     */
    @Before
    public void setup() {
        zapScanner = new ZAProxyScanner(ZAP_PROXYHOST,ZAP_PROXYPORT,ZAP_APIKEY);
        zapScanner.clear();
        zapSpider = (Spider)zapScanner;
        log.info("Created client to ZAP API");
        driver = DriverFactory.createProxyDriver("chrome", createZapProxyConfigurationForWebDriver(), CHROME_DRIVER_PATH);
        assertThat(driver, is(notNullValue()));
        myApp = new AdminInterfaceNavigation(driver);
    }

    /**
     * This method runs after every @Test suite runs
     */
    @After
    public void after() {
        driver.quit();
    }

    /**
     * This method runs all the methods in the @AdminInterfaceNavigation
     * class related to the automated E2E selenium tests and proxies it through
     * OWASP ZAP and will then perform the necessary automated penetration tests
     * @see        AdminInterfaceNavigation
     */
    @Test
    public void testSecurityVulnerabilities() {
        myApp.sendAnnouncement();
        myApp.addQuestion();
        myApp.navigateToQuestionBank();
        myApp.assignAnAssignmentAndPublishOnTwitter();
        myApp.viewAnalytics();
        log.info("Spidering...");
        spiderWithZap();
        log.info("Spider done.");

        setAlertAndAttackStrength();
        zapScanner.setEnablePassiveScan(true);
        scanWithZap();

        List<Alert> alerts = filterAlerts(zapScanner.getAlerts());
        logAlerts(alerts);
        assertThat(alerts.size(), equalTo(0));
    }

    /**
     * This method logs all alerts obtained after performing the automates penetration tests
     * by OWASP ZAP
     */
    private void logAlerts(List<Alert> alerts) {
        for (Alert alert : alerts) {
            log.info("Alert: "+alert.getAlert()+" at URL: "+alert.getUrl()+" Parameter: "+alert.getParam()+" CWE ID: "+alert.getCweId());
        }
    }

    /**
     * This method filters all alerts obtained after performing the automates penetration tests
     * by OWASP ZAP
     */
    private List<Alert> filterAlerts(List<Alert> alerts) {
       List<Alert> filtered = new ArrayList<Alert>();
       for (Alert alert : alerts) {
           if (alert.getRisk().equals(Alert.Risk.High) && alert.getConfidence() != Alert.Confidence.Low) filtered.add(alert);
       }
       return filtered;
    }

    /**
     * This method sets the level of alerts to detect and the strength of the attack when OWASP ZAP is
     * performing the automates penetration tests
     */
    public void setAlertAndAttackStrength() {
        for (String policyName : policyNames) {
            String ids = enableZapPolicy(policyName);
            for (String id : ids.split(",")) {
                zapScanner.setScannerAlertThreshold(id, MEDIUM);
                zapScanner.setScannerAttackStrength(id, HIGH);
            }
        }
    }

    /**
     * This method actually runs the security scans and the automated penetration tests by OWASP ZAP
     * against all the URLs that the ZAP proxy managed to filter out during the Selenium tests.
     */
    private void scanWithZap() {
        log.info("Scanning...");
        zapScanner.scan(myApp.BASE_URL);
        currentScanID = zapScanner.getLastScannerScanId();
        int complete = 0;
        while (complete < 100) {
            complete = zapScanner.getScanProgress(currentScanID);
            log.info("Scan is " + complete + "% complete.");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        log.info("Scanning done.");
    }

    /**
     * This method actually enables the types of security flaws to filter out during the
     * automated penetration tests by OWASP ZAP
     */
    private String enableZapPolicy(String policyName) {
        String scannerIds = null;
        switch (policyName.toLowerCase()) {
            case "directory-browsing":
                scannerIds = "0";
                break;
            case "cross-site-scripting":
                scannerIds = "40012,40014,40016,40017";
                break;
            case "sql-injection":
                scannerIds = "40018";
                break;
            case "path-traversal":
                scannerIds = "6";
                break;
            case "remote-file-inclusion":
                scannerIds = "7";
                break;
            case "server-side-include":
                scannerIds = "40009";
                break;
            case "script-active-scan-rules":
                scannerIds = "50000";
                break;
            case "server-side-code-injection":
                scannerIds = "90019";
                break;
            case "remote-os-command-injection":
                scannerIds = "90020";
                break;
            case "external-redirect":
                scannerIds = "20019";
                break;
            case "crlf-injection":
                scannerIds = "40003";
                break;
            case "source-code-disclosure":
                scannerIds = "42,10045,20017";
                break;
            case "shell-shock":
                scannerIds = "10048";
                break;
            case "remote-code-execution":
                scannerIds = "20018";
                break;
            case "ldap-injection":
                scannerIds = "40015";
                break;
            case "xpath-injection":
                scannerIds = "90021";
                break;
            case "xml-external-entity":
                scannerIds = "90023";
                break;
            case "padding-oracle":
                scannerIds = "90024";
                break;
            case "el-injection":
                scannerIds = "90025";
                break;
            case "insecure-http-methods":
                scannerIds = "90028";
                break;
            case "parameter-pollution":
                scannerIds = "20014";
                break;
            default : throw new RuntimeException("No policy found for: "+policyName);
        }
        zapScanner.setEnableScanners(scannerIds, true);
        return scannerIds;
    }

    /**
     * Returns a Proxy object which is also OWASP ZAP's proxy
     * @return      the proxy of OWASP ZAP
     */
    private static Proxy createZapProxyConfigurationForWebDriver() {
        Proxy proxy = new Proxy();
        proxy.setHttpProxy(ZAP_PROXYHOST + ":" + ZAP_PROXYPORT);
        proxy.setSslProxy(ZAP_PROXYHOST + ":" + ZAP_PROXYPORT);
        return proxy;
    }

    /**
     * This method actually spiders and obtains the URLs which OWASP ZAP will subsequently perform
     * penetration tests againsts after the Selenium tests.
     */
    private void spiderWithZap() {
        zapSpider.setThreadCount(5);
        zapSpider.setMaxDepth(5);
        zapSpider.setPostForms(false);
        zapSpider.spider(myApp.BASE_URL);
        int spiderID = zapSpider.getLastSpiderScanId();
        int complete  = 0;
        while (complete < 100) {
            complete = zapSpider.getSpiderProgress(spiderID);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        for (String url : zapSpider.getSpiderResults(spiderID)) {
            log.info("Found URL: "+url);
        }
    }
}
