@petclinic
Feature: add Petclinic

    Background:
        Given El usuario se encuentra en la pagina de petclinic
    
    @Add-owners
    Scenario Outline: Agregar dueños
        And da click en el apartado buscar dueño
        And da click en el boton agregar dueños
        Then se completa la informacion del dueño "<firstName>" "<lastName>" "<address>" "<city>" "<telephone>"
        And se guarda la informacion del nuevo dueño
        And se muestra la informacion dueño

    Examples:
        | firstName| lastName | address | city | telephone |
        |  Alberto  |  Carrasco |  Esperanza  | Esperanza | 9876543210 |