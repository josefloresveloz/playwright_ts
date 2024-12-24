import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect } from "@playwright/test";
import { PetClinicPage } from "../pages/PetClinicPage";
import { AddPetsPage } from "../pages/AddPetsPage";
import { AddVisitPetsPage } from "../pages/AddVisitPetsPage";
import { EditPetsPage } from "../pages/EditPetsPage";

let browser;
let page: Page;
let petClinicPage: PetClinicPage;
let addPetsPage: AddPetsPage;
let addVisitPetsPage: AddVisitPetsPage;
let editPetsPage: EditPetsPage;

let dateVisit: string;
let descriptionVisit: string;
let stepNumber = 1;

function getStepScreenshotName(baseName: string) {
  const stepName = `screenshots/paso_${stepNumber}_${baseName}.png`;
  stepNumber++;
  return stepName;
}

//Buscar a todos los dueños

Given("El usuario se encuentra en la pagina de petclinic", async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  petClinicPage = new PetClinicPage(page);
  await petClinicPage.navigate();
  await petClinicPage.takeScreenshot(getStepScreenshotName("inicio.png"));
});

Given("da click en el apartado buscar dueño", async function () {
  await page.waitForTimeout(3000);
  await petClinicPage.clickFindOwners();
  await petClinicPage.takeScreenshot(
    getStepScreenshotName("apartado buscar dueño.png")
  );
});

When("da click en el boton buscar dueño", async function () {
  await page.waitForTimeout(3000);
  await petClinicPage.clickSearchOwners();
});

Then("se muestra la lista de los dueños", async function () {
  await page.waitForTimeout(3000);
  await petClinicPage.waitForOwnersList();
  await petClinicPage.takeScreenshot(
    getStepScreenshotName("lista de dueños.png")
  );
  await browser.close();
});

//

When("da click en el boton agregar dueños", async function () {
  await petClinicPage.clickAddOwners();
  await petClinicPage.takeScreenshot(
    getStepScreenshotName("formulario vacio agregar nuevo dueño.png")
  );
});

Then(
  "se completa la informacion del dueño ",
  async function (firstName, lastName, address, city, telephone) {
    await petClinicPage.writeFirstName(firstName);
    await petClinicPage.writeLastName(lastName);
    await petClinicPage.writeAddress(address);
    await petClinicPage.writeCity(city);
    await petClinicPage.writeTelephone(telephone);
    await petClinicPage.takeScreenshot(
      getStepScreenshotName("formulario llenado agregar nuevo dueño.png")
    );
  }
);

Given("se guarda la informacion del nuevo dueño", async function () {
  await petClinicPage.submitNewOwner();
});

Given("se muestra la informacion dueño", async function () {
  await petClinicPage.waitForAddMessage();
  await petClinicPage.waitForOwnerInformation();
  await petClinicPage.takeScreenshot(getStepScreenshotName("Dueño registrado"));
  await browser.close();
});

Given(
  "se ingresa el apellido del dueño {string}",
  async function (lastNameSearch) {
    await petClinicPage.writeLastName(lastNameSearch);
    await petClinicPage.takeScreenshot(
      getStepScreenshotName("formulario busqueda dueño por apellido")
    );
  }
);

Then("se muestra la informacion del dueño", async function () {
  await petClinicPage.waitForOwnerInformation();
  await petClinicPage.takeScreenshot(
    getStepScreenshotName("se muestra informacion dueño")
  );
});

When(
  "se muestra la lista de los dueños que coinciden con la busqueda",
  async function () {
    await petClinicPage.waitForOwnersList();
  }
);

When("da click en el dueño que se desea editar", async function () {
  await petClinicPage.clickOwner();
  await petClinicPage.takeScreenshot(getStepScreenshotName("lista dueños"));
});

Then("da click en el boton editar dueño", async function () {
  await petClinicPage.clickEditOwner();
  await petClinicPage.takeScreenshot(
    getStepScreenshotName("informacion del dueño antes editar")
  );
});

Then(
  "se completa la informacion del dueño {string} {string} {string} {string} {string}",
  async function (firstName, lastName, address, city, telephone) {
    await petClinicPage.writeFirstName(firstName);
    await petClinicPage.writeLastName(lastName);
    await petClinicPage.writeAddress(address);
    await petClinicPage.writeCity(city);
    await petClinicPage.writeTelephone(telephone);
    await petClinicPage.takeScreenshot(
      getStepScreenshotName("informacion del dueño")
    );
  }
);

Then("da click en el boton de actualizar dueño", async function () {
  await petClinicPage.clickUpdateOwner();
});

Then("se muestra la informacion del dueño actualizada", async function () {
  await petClinicPage.waitForUpdateMessage();
  await petClinicPage.takeScreenshot(
    getStepScreenshotName("caso2/petclinic-paso9")
  );
  console.log("La información del dueño ha sido verificada.");
  await browser.close();
});

Given("que estoy en el perfil del dueño", async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  addPetsPage = new AddPetsPage(page);
  addVisitPetsPage = new AddVisitPetsPage(page);
  await addPetsPage.navigate();

  await addPetsPage.takeScreenshot(getStepScreenshotName("perfil dueño"));
});

When("selecciono la opción para agregar mascotas", async function () {
  await addPetsPage.clickAddPet();
  await addPetsPage.takeScreenshot(getStepScreenshotName("agregar mascota"));
});

When(
  "completo el formulario con la información de la mascota {string} {string} {string}",
  async function (nombre, fechaNacimiento, tipo) {
    await addPetsPage.writePetName(nombre);
    await addPetsPage.writePetBirthDate(fechaNacimiento);
    await addPetsPage.selectPetType(tipo);
    await addPetsPage.takeScreenshot(
      getStepScreenshotName("informacion mascota")
    );
  }
);

When("hago clic en guardar mascota", async function () {
  await addPetsPage.clickButtonSavePet();
  await addPetsPage.takeScreenshot(getStepScreenshotName("mascota guardada"));
});

Then(
  "la mascota {string} debe aparecer correctamente en la lista de mascotas del dueño",
  async function (name) {
    await addPetsPage.waitForAddPetMessage();
    await addPetsPage.isPetSaved(name);

    //await addPetsPage.takeScreenshot(getStepScreenshotName("mascota guardada"));
    await addPetsPage.scrollToElementAndTakeScreenshot(
      `//dd[text()='${name}']`,
      getStepScreenshotName("mascota guardada")
    );

    console.log("La mascota ha sido verificada.");
    await browser.close();
  }
);

//Visitar perfil de mascota

When("selecciono la opción para agregar una visita", async function () {
  await addVisitPetsPage.navigate();

  await addVisitPetsPage.takeScreenshot(getStepScreenshotName("perfil dueño"));

  await addVisitPetsPage.clickAddPetVisit();
  await addVisitPetsPage.takeScreenshot(
    getStepScreenshotName("agregar visita")
  );
});

When(
  "completo el formulario con la información de la visita {string} {string}",
  async function (date, description) {
    this.dateVisit = date;
    this.descriptionVisit = description;
    await addVisitPetsPage.writeDateVisit(date);
    await addVisitPetsPage.writeDescriptionVisit(description);
    await addVisitPetsPage.takeScreenshot(
      getStepScreenshotName("informacion de la visita")
    );
  }
);

When("hago clic en guardar visita", async function () {
  await addVisitPetsPage.clickButtonSavePetVisit();
  await addVisitPetsPage.takeScreenshot(
    getStepScreenshotName("visita es guardada")
  );
});

Then(
  "la visita debe aparecer correctamente en la lista de visitas asociadas a la mascota",
  async function () {
    await addVisitPetsPage.waitForAddPetVisitMessage();
    await addVisitPetsPage.isPetVisitSaved();

    await addVisitPetsPage.scrollToElementAndTakeScreenshot(
      `//table[@class='table-condensed']/tbody/tr/td[text()='${this.dateVisit}']`,
      getStepScreenshotName("informacion visita guardada")
    );
    console.log("La visita ha sido verificada.");
    await browser.close();
  }
);

//editar mascota
When("selecciono la mascota que quiero editar", async function () {
  editPetsPage = new EditPetsPage(page);
  await editPetsPage.navigate();
  await editPetsPage.takeScreenshot(getStepScreenshotName("perfil dueño"));

  await editPetsPage.clickEditPet();
  await editPetsPage.takeScreenshot(getStepScreenshotName("editar mascota"));
});

When("hago clic en guardar mascota editada", async function () {
  await editPetsPage.clickButtonSaveUpdatePet();
  await editPetsPage.takeScreenshot(getStepScreenshotName("mascota editada"));
});

Then(
  "los cambios deben aplicarse correctamente y mostrarse en el perfil de la mascota",
  async function () {
    await editPetsPage.waitForAddPetVisitMessage();

    await editPetsPage.takeScreenshot(getStepScreenshotName("mascota editada"));
    console.log("La mascota ha sido verificada.");
    await browser.close();
  }
);
