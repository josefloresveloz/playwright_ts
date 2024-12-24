import { Page, expect } from "@playwright/test";
import dotenv from "dotenv";

// Cargar variables de entorno según el ambiente
const environment = process.env.NODE_ENV || "dev";
dotenv.config({ path: `.env.${environment}` });

export class AddVisitPetsPage {
  constructor(private page: Page) {}
  private dateVisit: string;
  private descriptionVisit: string;

  async navigate() {
    const baseUrl = process.env.BASE_URL || "https://default.petclinic.com";
    await this.page.goto(`${baseUrl}owners/192`);
  }

  async clickAddPetVisit() {
    await this.page
      .locator("//td/a[@href='192/pets/167/visits/new'][1]")
      .click();
  }

  async writeDateVisit(dateVisit: string) {
    this.dateVisit = dateVisit;
    await this.page.locator("//input[@id='date']").fill(dateVisit);
  }

  async writeDescriptionVisit(descriptionVisit: string) {
    this.descriptionVisit = descriptionVisit;
    await this.page
      .locator("//input[@id='description']")
      .fill(descriptionVisit);
  }

  async clickButtonSavePetVisit() {
    await this.page
      .locator("//button[@type='submit' and contains(text(), 'Add Visit')]")
      .click();
  }

  async waitForAddPetVisitMessage() {
    await this.page
      .locator("//span[text()='Your visit has been booked']")
      .isVisible();
  }

  async takeScreenshot(path: string) {
    await this.page.screenshot({ path });
  }

  async isPetVisitSaved() {
    const visitDateLocator = this.page.locator(
      `//table[@class='table-condensed']/tbody/tr/td[text()='${this.dateVisit}']`
    );
    await expect(visitDateLocator).toBeVisible();
  }

  async getVisitDate() {
    const visitDate = await this.page
      .locator("//table[@class='table-condensed']/tbody/tr/td[1]")
      .textContent();
    return visitDate ? visitDate.trim() : null;
  }

  async getVisitDescription() {
    const visitDescription = await this.page
      .locator("//table[@class='table-condensed']/tbody/tr/td[2]")
      .textContent();
    return visitDescription ? visitDescription.trim() : null;
  }

  async scrollToElementAndTakeScreenshot(
    selector: string,
    screenshotPath: string
  ) {
    const element = this.page.locator(selector);
    await element.scrollIntoViewIfNeeded();
    await this.page.screenshot({ path: screenshotPath });
  }
}
