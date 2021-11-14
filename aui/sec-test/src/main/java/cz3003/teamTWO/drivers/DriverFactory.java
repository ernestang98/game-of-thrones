package cz3003.teamTWO.drivers;

import org.openqa.selenium.Proxy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.firefox.internal.ProfilesIni;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import java.io.File;

/**
 * This class encapsulates the methods used for instantiating our driver (Chrome/FireFox)
 */

public class DriverFactory {

    private final static String CHROME = "chrome";
    private final static String FIREFOX = "firefox";

    /**
     * Returns the appropriate proxy WebDriver based on the type, proxy, and path provided
     * @param  type  the type of proxy driver
     * @param  proxy the proxy of the driver to be created
     * @param  path the path where the driver is found
     * @return      the WebDriver to be created
     */
    public static WebDriver createProxyDriver(String type, Proxy proxy, String path) {
        if (type.equalsIgnoreCase(CHROME)) return createChromeDriver(createProxyCapabilities(proxy), path);
        else if (type.equalsIgnoreCase(FIREFOX)) return createFirefoxDriver(createProxyCapabilities(proxy));
        throw new RuntimeException("Unknown WebDriver browser: "+type);
    }

    /**
     * Returns a chrome WebDriver based on the desired capabilities and path
     * @param  capabilities  the capabilities of the WebDriver
     * @param  path the path where the driver is found
     * @return      the chrome WebDriver to be created
     */
    public static WebDriver createChromeDriver(DesiredCapabilities capabilities, String path) {
        System.setProperty("webdriver.chrome.driver", path);
        if (capabilities != null) {
            capabilities.setCapability(CapabilityType.ACCEPT_INSECURE_CERTS, true);
            capabilities.setCapability(CapabilityType.ACCEPT_SSL_CERTS, true);
            return new ChromeDriver(capabilities);
        } else return new ChromeDriver();

    }

    /**
     * Returns a FireFox WebDriver based on the desired capabilities and path
     * @param  capabilities  the capabilities of the WebDriver
     * @return      the FireFox WebDriver to be created
     */
    public static WebDriver createFirefoxDriver(DesiredCapabilities capabilities) {
        if (capabilities != null) {
            return new FirefoxDriver(capabilities);
        }

        ProfilesIni allProfiles = new ProfilesIni();
        FirefoxProfile myProfile = allProfiles.getProfile("WebDriver");
        if (myProfile == null) {
            File ffDir = new File(System.getProperty("user.dir")+ File.separator+"ffProfile");
            if (!ffDir.exists()) {
                ffDir.mkdir();
            }
            myProfile = new FirefoxProfile(ffDir);
        }
        myProfile.setAcceptUntrustedCertificates(true);
        myProfile.setAssumeUntrustedCertificateIssuer(true);
        myProfile.setPreference("webdriver.load.strategy", "unstable");
        if (capabilities == null) {
            capabilities = new DesiredCapabilities();
        }
        capabilities.setCapability(FirefoxDriver.PROFILE, myProfile);
        return new FirefoxDriver(capabilities);
    }

    /**
     * Returns a the desired capabilities of the Webdriver based on the procy used
     * @param  proxy  the proxy of the WebDriver
     * @return      the desired capabilities of the driver
     */
    public static DesiredCapabilities createProxyCapabilities(Proxy proxy) {
        DesiredCapabilities capabilities = DesiredCapabilities.chrome();
        capabilities.setCapability("proxy", proxy);
        return capabilities;
    }

}
