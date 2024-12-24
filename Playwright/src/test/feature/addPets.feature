@petclinic
Feature: Agregar mascotas al perfil del dueño

    Background:
        Given que estoy en el perfil del dueño

    @Add-pets
    Scenario Outline: Agregar 2 mascotas al perfil del dueño
        When selecciono la opción para agregar mascotas
        And completo el formulario con la información de la mascota "<nombre>" "<fechaNacimiento>" "<tipo>"
        And hago clic en guardar mascota
        Then la mascota "<nombre>" debe aparecer correctamente en la lista de mascotas del dueño

    Examples:
        | nombre   | fechaNacimiento | tipo |
        | Martha    | 2024-10-10  | dog    |
        | Fran | 2022-10-19    | cat    |
