@petclinic
Feature: Editar mascotas

    Background:
        Given que estoy en el perfil del dueño
    @Edit-pet
    Scenario Outline: Editar los datos de una mascota
        When selecciono la mascota que quiero editar
        And completo el formulario con la información de la mascota "<nombre>" "<fechaNacimiento>" "<tipo>"
        And hago clic en guardar mascota editada
        Then los cambios deben aplicarse correctamente y mostrarse en el perfil de la mascota

    Examples:
                | nombre   | fechaNacimiento | tipo |
        | Crespo     | 2024-10-15  | dog    |