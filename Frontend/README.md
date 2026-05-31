# Concesionario thePower

Aplicación de un concesionario de coches donde los usuarios de dicha aplicación pueden gestionar los coches, los clientes y los propios usuarios de la aplicación, así como la gestión de reservas de coches, anulaciones de reservas, ventas de coches y devoluciones de los mismos.

> Una vez se accede a la aplicación, se puede acceder al perfil del usuario o salir de la aplicación desde el saludo inicial en la cabecera

## Coches

Muestra un listado de los coches del concesionario y un buscador para poder filtrar los coches.

Desde esta sección se puede crear un coche (**sólo para usuarios "admin"**).

### Filtrado de coches

El buscador de coches permite filtrar los mismos por diferentes campos:

| CAMPO           | TIPO             | VALOR                                                                   |
| --------------- | ---------------- | ----------------------------------------------------------------------- |
| ---             | Campo de texto   | Texto libre para la matrícula, la marca, el modelo o el color del coche |
| **_Condición_** | Botones de radio | _Todos, Nuevo, Usado_                                                   |
| **_Estado_**    | Botones de radio | _Todos, Disponible, Reservado, Vendido_                                 |

### Detalle de un coche

Muestra la marca, el modelo y la matrícula, la imagen del coche y una ficha con la información del mismo:

- Color
- Año de fabricación
- Fecha de adquisición
- Condición
- Kilometraje
- Precio
- Estado

Desde esta sección se puede actualizar y eliminar el coche, teniendo en cuenta que:

`Si un coche está disponible sólo se puede actualizar el color, la imagen y el precio`
`Si un coche no está disponible sólo se puede actualizar la imagen`
`No se puede eliminar un coche que no está disponible`

## Clientes

Muestra un listado de los clientes del concesionario y un buscador para poder filtrar los clientes.

Desde esta sección se puede crear un cliente.

### Filtrado de clientes

El buscador de clientes permite filtrar los mismos por un único campo:

| CAMPO | TIPO           | VALOR                                                                         |
| ----- | -------------- | ----------------------------------------------------------------------------- |
| ---   | Campo de texto | Texto libre para los apellidos, el nombre o el correo electrónico del cliente |

### Detalle de un cliente

Muestra el nombre y los apellidos del cliente y una ficha con la información del mismo:

- Correo electrónico

Desde esta sección se puede actualizar y eliminar el cliente, teniendo en cuenta que:

`No se puede eliminar un cliente con coches reservados o vendidos`

## Reservas

Muestra un listado de las reservas de coches del concesionario y un buscador para poder filtrar las reservas.

Desde esta sección se puede reservar un coche.

### Filtrado de reservas

El buscador de reservas permite filtrar las mismas por diferentes campos:

| CAMPO                     | TIPO             | VALOR                                                                         |
| ------------------------- | ---------------- | ----------------------------------------------------------------------------- |
| ---                       | Campo de texto   | Texto libre para la matrícula, la marca, el modelo o el color del coche       |
| **_Condición del coche_** | Botones de radio | _Todos, Nuevo, Usado_                                                         |
| ---                       | Campo de texto   | Texto libre para los apellidos, el nombre o el correo electrónico del cliente |
| **_Ordenar por_**         | Botones de radio | _Coche, Cliente_                                                              |

### Detalle de una reserva

Muestra una ficha con la información de la misma:

- Fecha de la reserva
- Coche (enlace a la ficha del mismo)
- Cliente (enlace a la ficha del mismo)

Desde esta sección se puede anular la reserva y vender el coche al cliente que ha hecho la reserva (se anula la reserva).

## Ventas

Muestra un listado de las ventas de coches del concesionario y un buscador para poder filtrar las ventas.

Desde esta sección se puede vender un coche.

### Filtrado de ventas

El buscador de ventas permite filtrar las mismas por diferentes campos:

| CAMPO                     | TIPO             | VALOR                                                                         |
| ------------------------- | ---------------- | ----------------------------------------------------------------------------- |
| ---                       | Campo de texto   | Texto libre para la matrícula, la marca, el modelo o el color del coche       |
| **_Condición del coche_** | Botones de radio | _Todos, Nuevo, Usado_                                                         |
| ---                       | Campo de texto   | Texto libre para los apellidos, el nombre o el correo electrónico del cliente |
| **_Ordenar por_**         | Botones de radio | _Coche, Cliente_                                                              |

### Detalle de una venta

Muestra una ficha con la información de la misma:

- Fecha de la venta
- Coche (enlace a la ficha del mismo)
- Cliente (enlace a la ficha del mismo)

Desde esta sección se puede devolver el coche en donde hay que añadir el kilometraje realizado.

## Usuarios

> La sección "Usuarios" sólo es visible para usuarios "admin"

Muestra un listado de los usuarios de la aplicación del concesionario y un buscador para poder filtrar los usuarios.

Desde esta sección se puede crear un usuario.

### Filtrado de usuarios

El buscador de usuarios permite filtrar los mismos por diferentes campos:

| CAMPO     | TIPO             | VALOR                                                                                               |
| --------- | ---------------- | --------------------------------------------------------------------------------------------------- |
| ---       | Campo de texto   | Texto libre para los apellidos, el nombre, el nombre de usuario o el correo electrónico del usuario |
| **_Rol_** | Botones de radio | _Todos, seller, admin, superadmin_                                                                  |

### Detalle de un usuario

Muestra el nombre y los apellidos del usuario y una ficha con la información del mismo:

- Nombre de usuario
- Correo electrónico
- Rol

Desde esta sección se puede actualizar los datos y actualizar la contraseña del usuario, teniendo en cuenta que:

`Un usuario que no sea "admin" sólo puede consultar y actualizar su propio usuario mediante el enlace al perfil del usuario en el saludo inicial de la cabecera de la aplicación`
`El usuario "superadmin" no se puede actualizar ni eliminar`
`El rol sólo puede ser actualizado por un usuario "admin"`
`Un usuario no se puede eliminar a sí mismo`
