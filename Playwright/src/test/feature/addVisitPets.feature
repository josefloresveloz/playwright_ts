@petclinic
Feature: Add Pets to Owner Profile

    Background:
        Given que estoy en el perfil del dueño

    @Add-visit
    Scenario Outline: Agregar una visita a una mascota específica
        When selecciono la opción para agregar una visita
        And completo el formulario con la información de la visita "<fecha>" "<descripcion>"
        And hago clic en guardar visita
        Then la visita debe aparecer correctamente en la lista de visitas asociadas a la mascota

    Examples:
            | fecha       | descripcion       |
            | 2021-12-30  | Revisión general  |