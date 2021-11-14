package cz3003.teamTWO;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
* This class encapsulates the methods used for the automated E2E testing using the Selenium library.
*/

public class AdminInterfaceNavigation {
    WebDriver driver;
    WebDriverWait wait;
    final String id = UUID.randomUUID().toString().replace("-", "").substring(0, 10);
    final String LOCAL_BASE_URL = "http://localhost:3000/";
    final String PROD_BASE_URL = "https://loving-easley-7c1b0c.netlify.app/";
    final String BASE_URL = System.getenv("use_prod_end_point") == null ? LOCAL_BASE_URL : PROD_BASE_URL;
    final String TWITTER_USERNAME = "game.of.thrones.mail.service@gmail.com";
    final String TWITTER_PASSWORD = "game.of.thrones";
    final String FACEBOOK_USERNAME = "game.of.thrones.mail.service@gmail.com";
    final String FACEBOOK_PASSWORD = "game.of.thrones";
    final String SECURITY_TESTING_ANNOUNCEMENT_SUBJECT = "Security Testing Subject";
    final String SECURITY_TESTING_ANNOUNCEMENT_HEADER = "Security Testing Header";
    final String SECURITY_TESTING_ANNOUNCEMENT_BODY = "Security Testing Body";
    final String SECURITY_TESTING_COURSE_ABSENT = "Add \"SEC0001 Security Testing " + id + "\"";
    final String SECURITY_TESTING_QUEST_ABSENT = "Add \"SEC0001 Quest " + id + "\"";
    final String SECURITY_TESTING_SUBQUEST_ABSENT = "Add \"SEC0001 Subquest " + id + "\"";
    final String SECURITY_TESTING_COURSE_PRESENT = "SEC0006 Security Testing";
    final String SECURITY_TESTING_QUEST_PRESENT = "SEC0006 Quest 2";
    final String SECURITY_TESTING_SUBQUEST_PRESENT = "SEC0006 Subquest 2";
    final String SECURITY_TESTING_SAMPLE_DIFFICULTY = "Level 1";
    final String SECURITY_TESTING_SAMPLE_QUESTION = "Security Testing Question " + id;
    final String SECURITY_TESTING_SAMPLE_ANSWER_1 = "Security Testing Answer 1 (Correct Answer) for " + id;
    final String SECURITY_TESTING_SAMPLE_ANSWER_2 = "Security Testing Answer 2 for " + id;
    final String SECURITY_TESTING_SAMPLE_ANSWER_3 = "Security Testing Answer 3 for " + id;
    final String SECURITY_TESTING_SAMPLE_ANSWER_4 = "Security Testing Answer 4 for " + id;
    final String SECURITY_TESTING_CORRECT_ANSWER = "1";
    final String SECURITY_TESTING_POINTS = "1";
    final String SECURITY_TESTING_ASSIGNMENT_NAME = "Security Testing Assignment " + id;
    final String SECURITY_TESTING_ASSIGNMENT_DESCRIPTION = "Security Testing Assignment " + id + " Body";

    /**
    * This class creates the Webdriver to be used by Selenium and subsequently a WebDriverWait class 
    * from the driver to be used for any testing which requires waiting.
    * @param  driver  is the Webdriver to be used for the Selenium E2E testing.
    */
    public AdminInterfaceNavigation(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 60);
        this.driver.manage().timeouts().pageLoadTimeout(60, TimeUnit.SECONDS);
        this.driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
    }

    /**
    * This method creates an announcement by Professor "Tan Wei Lun" and sends it to
    * student 4 and student 5
    */
    public void sendAnnouncement() {
        driver.get(BASE_URL);
        driver.findElement(By.id("demo-simple-select")).click();
        driver.findElement(By.xpath("//*[text()='Tan Wei Lun']")).click();
        driver.findElement(By.id("demo-multiple-chip")).click();
        driver.findElement(By.xpath("//*[text()='student 4']")).click();
        driver.findElement(By.xpath("//*[text()='student 5']")).click();
        driver.findElements(By.className("css-g3hgs1-MuiBackdrop-root-MuiModal-backdrop")).get(0).click();
        driver.findElements(By.id("input-with-icon-textfield")).get(0).click();
        driver.findElements(By.id("input-with-icon-textfield")).get(0).clear();
        driver.findElements(By.id("input-with-icon-textfield")).get(0).sendKeys(SECURITY_TESTING_ANNOUNCEMENT_SUBJECT);
        verifyTextPresent(SECURITY_TESTING_ANNOUNCEMENT_SUBJECT);
        driver.findElements(By.id("input-with-icon-textfield")).get(1).click();
        driver.findElements(By.id("input-with-icon-textfield")).get(1).clear();
        driver.findElements(By.id("input-with-icon-textfield")).get(1).sendKeys(SECURITY_TESTING_ANNOUNCEMENT_HEADER);
        verifyTextPresent(SECURITY_TESTING_ANNOUNCEMENT_HEADER);
        driver.findElements(By.id("input-with-icon-textfield")).get(2).click();
        driver.findElements(By.id("input-with-icon-textfield")).get(2).clear();
        driver.findElements(By.id("input-with-icon-textfield")).get(2).sendKeys(SECURITY_TESTING_ANNOUNCEMENT_BODY);
        verifyTextPresent(SECURITY_TESTING_ANNOUNCEMENT_BODY);
        driver.findElement(By.xpath("//*[text()='Post ']")).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[text()='Announcement sent!']")));
    }

    /**
    * This method adds a question to the question bank
    */
    public void addQuestion() {
        driver.get(BASE_URL);
        driver.findElement(By.xpath("//*[text()='Create']")).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[text()='Create']")));
        driver.findElements(By.id("select-category")).get(0).click();
        driver.findElements(By.id("select-category")).get(0).sendKeys(SECURITY_TESTING_COURSE_PRESENT);
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        if (this.driver.getPageSource().contains(SECURITY_TESTING_COURSE_ABSENT)) {
            driver.findElement(By.xpath("//*[text()=" + "'" + SECURITY_TESTING_COURSE_ABSENT + "']")).click();
        }
        else {
            driver.findElement(By.xpath("//*[text()=" + "'" + SECURITY_TESTING_COURSE_PRESENT + "']")).click();
        }
        driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
        driver.findElements(By.id("select-quest")).get(0).click();
        driver.findElements(By.id("select-quest")).get(0).sendKeys(SECURITY_TESTING_QUEST_PRESENT);
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        if (this.driver.getPageSource().contains(SECURITY_TESTING_QUEST_ABSENT)) {
            driver.findElement(By.xpath("//*[text()=" + "'" + SECURITY_TESTING_QUEST_ABSENT + "']")).click();
        }
        else {
            driver.findElement(By.xpath("//*[text()=" + "'" + SECURITY_TESTING_QUEST_PRESENT + "']")).click();
        }
        driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
        driver.findElements(By.id("select-subquest")).get(0).click();
        driver.findElements(By.id("select-subquest")).get(0).sendKeys(SECURITY_TESTING_SUBQUEST_PRESENT);
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        if (this.driver.getPageSource().contains(SECURITY_TESTING_SUBQUEST_ABSENT)) {
            driver.findElement(By.xpath("//*[text()=" + "'" + SECURITY_TESTING_SUBQUEST_ABSENT + "']")).click();
        }
        else {
            driver.findElement(By.xpath("//*[text()=" + "'" + SECURITY_TESTING_SUBQUEST_PRESENT + "']")).click();
        }
        driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);

        driver.findElements(By.id("demo-simple-select-filled")).get(0).click();
        driver.findElement(By.xpath("//*[text()=" + "'" + SECURITY_TESTING_SAMPLE_DIFFICULTY + "']")).click();

        driver.findElements(By.id("input-with-icon-textfield")).get(0).click();
        driver.findElements(By.id("input-with-icon-textfield")).get(0).sendKeys(SECURITY_TESTING_SAMPLE_QUESTION);

        driver.findElements(By.id("input-with-icon-textfield")).get(1).click();
        driver.findElements(By.id("input-with-icon-textfield")).get(1).sendKeys(SECURITY_TESTING_SAMPLE_ANSWER_1);

        driver.findElements(By.id("input-with-icon-textfield")).get(2).click();
        driver.findElements(By.id("input-with-icon-textfield")).get(2).sendKeys(SECURITY_TESTING_SAMPLE_ANSWER_2);

        driver.findElements(By.id("input-with-icon-textfield")).get(3).click();
        driver.findElements(By.id("input-with-icon-textfield")).get(3).sendKeys(SECURITY_TESTING_SAMPLE_ANSWER_3);

        driver.findElements(By.id("input-with-icon-textfield")).get(4).click();
        driver.findElements(By.id("input-with-icon-textfield")).get(4).sendKeys(SECURITY_TESTING_SAMPLE_ANSWER_4);

        driver.findElements(By.id("input-with-icon-textfield")).get(5).click();
        driver.findElements(By.id("input-with-icon-textfield")).get(5).sendKeys(SECURITY_TESTING_CORRECT_ANSWER);

        driver.findElements(By.id("input-with-icon-textfield")).get(6).click();
        driver.findElements(By.id("input-with-icon-textfield")).get(6).sendKeys(SECURITY_TESTING_POINTS);

        driver.findElement(By.xpath("//*[text()='Save and Add Another Question']")).click();
    }

    /**
    * This method navigates through the question bank of our application
    */
    public void navigateToQuestionBank() {
        driver.get(BASE_URL);
        driver.findElement(By.xpath("//*[text()='Question Bank']")).click();
    }

    /**
     * This method creates an assignment, assigns it to student "Ernest Ang Cheng Han" and publishes
     * it on Twitter
     */
    public void assignAnAssignmentAndPublishOnTwitter() {
        driver.get(BASE_URL);
        driver.findElement(By.xpath("//*[text()='Assign']")).click();
        driver.findElement(By.id("assignmentInput")).click();
        driver.findElement(By.id("assignmentInput")).sendKeys(SECURITY_TESTING_ASSIGNMENT_NAME);
        driver.findElement(By.id("descInput")).click();
        driver.findElement(By.id("descInput")).sendKeys(SECURITY_TESTING_ASSIGNMENT_DESCRIPTION);
        driver.findElements(By.className("PrivateSwitchBase-input")).get(2).click();
        driver.findElement(By.id("teacher-select")).click();
        driver.findElement(By.xpath("//*[text()='Tan Wei Lun']")).click();
        driver.findElement(By.xpath("//*[text()='Assign']")).click();
    }

    /**
     * This method tests the analytic-based functionalities of our interface
     */
    public void viewAnalytics() {
        driver.get(BASE_URL);
        driver.findElement(By.xpath("//*[text()='View Report']")).click();
        driver.findElement(By.id("indiv-link")).click();
        driver.findElement(By.xpath("//*[text()='View Report']")).click();
        driver.findElement(By.id("cohort-link")).click();
    }

    /**
     * This method verifies that a text is present in our browser
     */
    public void verifyTextPresent(String text) {
        if (!this.driver.getPageSource().contains(text)) throw new RuntimeException("Expected text: ["+text+"] was not found.");
    }

    /**
     * This method verifies that a text  in our browser
     */
    public void verifyTextAbsent(String text) {
        if (this.driver.getPageSource().contains(text)) throw new RuntimeException("Expected text: ["+text+"] should not be found but was found.");
    }

}
