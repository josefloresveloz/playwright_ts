@petclinic
Feature: Petclinic

    Background:
        Given El usuario se encuentra en la pagina de petclinic

    @Seach-owners
    Scenario: Listar todos los dueños de mascotas
        And da click en el apartado buscar dueño
        When da click en el boton buscar dueño
        Then se muestra la lista de los dueños 
