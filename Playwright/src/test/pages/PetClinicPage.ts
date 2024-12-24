import { Page } from "@playwright/test";
import dotenv from "dotenv";

// Cargar variables de entorno según el ambiente
const environment = process.env.NODE_ENV || "dev";
dotenv.config({ path: `.env.${environment}` });

export class PetClinicPage {
  constructor(private page: Page) {}

  async navigate() {
    const baseUrl = process.env.BASE_URL || "https://www.google.co.uk/";
    await this.page.goto(baseUrl);
  }

  async clickFindOwners() {
    await this.page.locator("//a[@title='find owners']").click();
  }

  async clickSearchOwners() {
    await this.page.locator("//button[@type='submit']").click();
  }

  async waitForOwnersList() {
    await this.page.waitForSelector("//table[@id='owners']");
  }

  async takeScreenshot(path: string) {
    await this.page.screenshot({ path });
  }

  async clickAddOwners() {
    await this.page.locator("//a[contains(text(),'Add Owner')]").click();
  }

  async writeFirstName(firstName: string) {
    await this.page.locator("//input[@id='firstName']").fill(firstName);
  }

  async writeLastName(lastName: string) {
    await this.page.locator("//input[@id='lastName']").fill(lastName);
  }

  async writeAddress(address: string) {
    await this.page.locator("//input[@id='address']").fill(address);
  }

  async writeCity(city: string) {
    await this.page.locator("//input[@id='city']").fill(city);
  }

  async writeTelephone(telephone: string) {
    await this.page.locator("//input[@id='telephone']").fill(telephone);
  }

  async submitNewOwner() {
    await this.page
      .locator("//button[@type='submit' and contains(text(), 'Add Owner')]")
      .click();
  }

  async waitForOwnerInformation() {
    await this.page.waitForSelector(
      "//h2[contains(text(),'Owner Information')]"
    );
  }

  async waitForAddMessage() {
    await this.page.locator("//span[text()='New Owner Created']").isVisible;
  }

  async clickOwner() {
    await this.page.locator("//a[@href='/owners/192']").click();
  }

  async clickEditOwner() {
    await this.page.locator("//a[@href='192/edit']").click();
  }

  async clickUpdateOwner() {
    await this.page
      .locator("//button[@type='submit' and text()='Update Owner']")
      .click();
  }

  async waitForUpdateMessage() {
    await this.page.locator("//span[text()='Owner Values Updated']").isVisible;
  }
}
