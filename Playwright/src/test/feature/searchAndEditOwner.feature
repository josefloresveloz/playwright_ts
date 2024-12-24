@petclinic
Feature: buscar y editar dueño

    Background:
        Given El usuario se encuentra en la pagina de petclinic
    
    @Search-Edit-owners
    Scenario Outline: Buscar y editar un dueño
        And da click en el apartado buscar dueño
        And se ingresa el apellido del dueño "<lastNameSearch>"
        When da click en el boton buscar dueño
        And se muestra la lista de los dueños que coinciden con la busqueda
        And da click en el dueño que se desea editar
        Then se muestra la informacion del dueño
        And da click en el boton editar dueño
        And se completa la informacion del dueño "<firstName>" "<lastName>" "<address>" "<city>" "<telephone>"
        And da click en el boton de actualizar dueño
        And se muestra la informacion del dueño actualizada
        
    Examples:
        | lastNameSearch | firstName| lastName | address | city | telephone |
        | Carrasco      |  Pedro  |  Carrasco |  Trujillo  | Trujillo | 9876543210 |