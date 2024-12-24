import { Page } from "@playwright/test";
import dotenv from "dotenv";

// Cargar variables de entorno según el ambiente
const environment = process.env.NODE_ENV || "dev";
dotenv.config({ path: `.env.${environment}` });

export class AddPetsPage {
  constructor(private page: Page) {}

  async navigate() {
    const baseUrl = process.env.BASE_URL || "https://default.petclinic.com";
    await this.page.goto(`${baseUrl}owners/192`);
  }

  async clickAddPet() {
    await this.page.locator("//a[@href='192/pets/new']").click();
  }

  async writePetName(name: string) {
    await this.page.locator("//input[@id='name']").fill(name);
  }

  async writePetBirthDate(birthDate: string) {
    await this.page.locator("//input[@id='birthDate']").fill(birthDate);
  }

  async selectPetType(petType: string) {
    await this.page.selectOption("//select[@id='type']", { label: petType });
  }

  async clickButtonSavePet() {
    await this.page
      .locator(`//button[@type='submit' and contains(text(), 'Add Pet')]`)
      .click();
  }

  async waitForAddPetMessage() {
    await this.page
      .locator("//span[text()='New Pet has been Added']")
      .isVisible();
  }

  async takeScreenshot(path: string) {
    await this.page.screenshot({ path });
  }

  async isPetSaved(name: string) {
    await this.page.locator(`//dd[text()='${name}']`).isVisible();
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
