import { Page, expect } from "@playwright/test";
import dotenv from "dotenv";

// Cargar variables de entorno según el ambiente
const environment = process.env.NODE_ENV || "dev";
dotenv.config({ path: `.env.${environment}` });

export class EditPetsPage {
  constructor(private page: Page) {}
  private dateVisit: string;
  private descriptionVisit: string;

  async navigate() {
    const baseUrl = process.env.BASE_URL || "https://default.petclinic.com";
    await this.page.goto(`${baseUrl}owners/192`);
  }

  async clickEditPet() {
    await this.page.locator("//td/a[@href='192/pets/167/edit'][1]").click();
  }

  async clickButtonSaveUpdatePet() {
    await this.page
      .locator("//button[@type='submit' and contains(text(), 'Update Pet')]")
      .click();
  }

  async waitForAddPetVisitMessage() {
    await this.page
      .locator("//span[text()='Pet details has been edited']")
      .isVisible();
  }

  async takeScreenshot(path: string) {
    await this.page.screenshot({ path });
  }
}
