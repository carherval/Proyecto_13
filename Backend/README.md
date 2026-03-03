# Car dealership

**_Car dealership_** es una Base de Datos sencilla que implementa un **CRUD** completo sobre cinco colecciones de datos relacionadas, la de coches (**_car_**), la de clientes (**_customer_**), la de reservas (**_reservation_**), la de ventas (**_sale_**) y la de usuarios (**_user_**).

Para el almacenamiento de las imágenes de los coches se usa el servicio de [Cloudinary].

## Colección _car_

A continuación se detallan los datos que almacena un coche de la colección **_car_**:

| CAMPO              | DESCRIPCIÓN                      | TIPO          | OBLIGATORIO | ÚNICO | VALOR                                                                                                                                                                                                                         |
| ------------------ | -------------------------------- | ------------- | ----------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\__id_**         | Identificador del coche          | Identificador | ---         | Sí    | **Automático**                                                                                                                                                                                                                |
| **_licensePlate_** | Matrícula del coche              | Texto         | Sí          | Sí    | Matrícula válida en formato de 4 dígitos y 3 consonantes, excluyendo la Ñ                                                                                                                                                     |
| **_make_**         | Marca del coche                  | Texto         | Sí          | No    | Marca válida [1]                                                                                                                                                                                                              |
| **_model_**        | Modelo del coche                 | Texto         | Sí          | No    | Modelo válido [2]                                                                                                                                                                                                             |
| **_color_**        | Color del coche                  | Texto         | Sí          | No    | _Amarillo, Azul, Azul metálico, Azul oscuro, Blanco, Dorado, Granate, Gris, Gris azulado, Gris oscuro, Marrón, Marrón oscuro, Morado, Mostaza, Naranja, Negro, Oliva, Plateado, Rojo, Turquesa, Verde, Verde oscuro, Violeta_ |
| **_img_**          | Imagen del coche                 | Texto         | No          | Sí    | Ruta del archivo subido a **Cloudinary** [3]                                                                                                                                                                                  |
| **_modelYear_**    | Año de fabricación del coche     | Número        | Sí          | No    | Año válido (entre 2000 y el año actual) en formato _AAAA_                                                                                                                                                                     |
| **_purchaseDate_** | Fecha de adquisición del coche   | Fecha         | Sí          | No    | Fecha válida (año entre el año de fabricación del coche y el año actual) en formato _DD/MM/AAAA_                                                                                                                              |
| **_condition_**    | Condición del coche              | Texto         | Sí          | No    | _Nuevo, Usado_                                                                                                                                                                                                                |
| **_mileage_**      | Kilometraje del coche            | Número        | Sí          | No    | Kilometraje válido (número entero)                                                                                                                                                                                            |
| **_price_**        | Precio del coche                 | Número        | Sí          | No    | Precio válido (número entero mayor o igual que 1)                                                                                                                                                                             |
| **_status_**       | Estado del coche                 | Texto         | Sí          | No    | _Disponible, Reservado, Vendido_                                                                                                                                                                                              |
| **_\_\_v_**        | Versión del coche                | Número        | ---         | No    | **Automático** (se incrementa con cada actualización del coche)                                                                                                                                                               |
| **_createdAt_**    | Fecha de creación del coche      | Fecha         | ---         | No    | **Automático**                                                                                                                                                                                                                |
| **_updatedAt_**    | Fecha de actualización del coche | Fecha         | ---         | No    | **Automático**                                                                                                                                                                                                                |

[1]:
[2]:

- Acura: MDX, RDX
- Audi: A4, Q5, Q7
- BMW: 3 Series, 5 Series, X5
- Cadillac: CT5, Escalade, XT5
- Chevrolet: Equinox, Malibu, Suburban, Traverse
- Citroën: Berlingo, C3, C4, C5
- Dodge: Challenger, Charger
- Fiat: 500, Stilo, Tipo
- Ford: Escape, Explorer, F-150, Focus, Mustang, Shelby GT500
- GMC: Acadia, Terrain, Yukon
- Honda: Accord, Civic, CR-V, HR-V
- Hyundai: Elantra, Santa Fe, Tucson
- Jeep: Cherokee, Grand Cherokee
- Kia: Ceed, Rio, Sorento
- Lincoln: MKC, MKZ, Town Car
- Mazda: CX-30, CX-5, Mazda3
- Mercedes: C-Class, E-Class, S-Class
- MG: HS, MG3, MG4, ZS
- Nissan: Qashqai, Rogue, X-Trail
- Peugeot: 208, 3008, 308, 5008
- Porsche: 911, Carrera, Cayenne
- Ram: 1500, 2500
- Renault: Captur, Clio, Megane
- Seat: Arona, Ateca, Ibiza, León
- Tesla: Model 3, Model S, Model Y
- Toyota: 4Runner, Highlander, Prius, RAV4, Sienna
- Volkswagen: Golf, Passat, Tiguan
- Volvo: S40, S60, XC60, XC90

[3]:

- Extensión: jpg, jpeg, png, gif, webp
- Tamaño: menor o igual que 5 MB

## Colección _customer_

A continuación se detallan los datos que almacena un cliente de la colección **_customer_**:

| CAMPO           | DESCRIPCIÓN                        | TIPO          | OBLIGATORIO | ÚNICO | VALOR                                                             |
| --------------- | ---------------------------------- | ------------- | ----------- | ----- | ----------------------------------------------------------------- |
| **\__id_**      | Identificador del cliente          | Identificador | ---         | Sí    | **Automático**                                                    |
| **_surnames_**  | Apellidos del cliente              | Texto         | Sí          | No    | Texto libre                                                       |
| **_name_**      | Nombre del cliente                 | Texto         | Sí          | No    | Texto libre                                                       |
| **_email_**     | Correo electrónico del cliente     | Texto         | Sí          | Sí    | Correo electrónico válido                                         |
| **_\_\_v_**     | Versión del cliente                | Número        | ---         | No    | **Automático** (se incrementa con cada actualización del cliente) |
| **_createdAt_** | Fecha de creación del cliente      | Fecha         | ---         | No    | **Automático**                                                    |
| **_updatedAt_** | Fecha de actualización del cliente | Fecha         | ---         | No    | **Automático**                                                    |

## Colección _reservation_

A continuación se detallan los datos que almacena una reserva de la colección **_reservation_**:

| CAMPO                 | DESCRIPCIÓN                             | TIPO          | OBLIGATORIO | ÚNICO | VALOR                           |
| --------------------- | --------------------------------------- | ------------- | ----------- | ----- | ------------------------------- |
| **\__id_**            | Identificador de la reserva             | Identificador | Sí          | Sí    | **Automático**                  |
| **_car_**             | Identificador del coche de la reserva   | Identificador | Sí          | Sí    | Identificador válido de coche   |
| **_customer_**        | Identificador del cliente de la reserva | Identificador | Sí          | No    | Identificador válido de cliente |
| **_reservationDate_** | Fecha de la reserva                     | Fecha         | ---         | No    | **Automático**                  |

## Colección _sale_

A continuación se detallan los datos que almacena una venta de la colección **_sale_**:

| CAMPO          | DESCRIPCIÓN                           | TIPO          | OBLIGATORIO | ÚNICO | VALOR                           |
| -------------- | ------------------------------------- | ------------- | ----------- | ----- | ------------------------------- |
| **\__id_**     | Identificador de la venta             | Identificador | ---         | Sí    | **Automático**                  |
| **_car_**      | Identificador del coche de la venta   | Identificador | Sí          | Sí    | Identificador válido de coche   |
| **_customer_** | Identificador del cliente de la venta | Identificador | Sí          | No    | Identificador válido de cliente |
| **_saleDate_** | Fecha de la venta                     | Fecha         | ---         | No    | **Automático**                  |

## Colección _user_

A continuación se detallan los datos que almacena un usuario de la colección **_user_**:

| CAMPO           | DESCRIPCIÓN                               | TIPO          | OBLIGATORIO | ÚNICO | VALOR                                                             |
| --------------- | ----------------------------------------- | ------------- | ----------- | ----- | ----------------------------------------------------------------- |
| **\__id_**      | Identificador del usuario                 | Identificador | ---         | Sí    | **Automático**                                                    |
| **_surnames_**  | Apellidos del usuario                     | Texto         | Sí          | No    | Texto libre                                                       |
| **_name_**      | Nombre del usuario                        | Texto         | Sí          | No    | Texto libre                                                       |
| **_username_**  | Nombre de usuario del usuario             | Texto         | Sí          | Sí    | Texto libre                                                       |
| **_password_**  | Contraseña del usuario (**campo oculto**) | Texto         | Sí          | No    | Contraseña válida                                                 |
| **_email_**     | Correo electrónico del usuario            | Texto         | Sí          | Sí    | Correo electrónico válido                                         |
| **_role_**      | Rol del usuario                           | Texto         | Sí          | No    | _seller, admin, superadmin_ **(no asignable)**                    |
| **_\_\_v_**     | Versión del usuario                       | Número        | ---         | No    | **Automático** (se incrementa con cada actualización del usuario) |
| **_createdAt_** | Fecha de creación del usuario             | Fecha         | ---         | No    | **Automático**                                                    |
| **_updatedAt_** | Fecha de actualización del usuario        | Fecha         | ---         | No    | **Automático**                                                    |

## Carga inicial de datos

Si se desea, se puede ejecutar **previamente** una carga inicial de datos en las colecciones **_car_** y **_customer_** mediante el siguiente comando de **Node.js**:

```sh
npm run createData
```

`La carga inicial elimina todos los datos almacenados previamente en las colecciones "car", "customer", "reservation" y "sale" y elimina los archivos de las imágenes de los coches subidos a "Cloudinary"`

## Endpoints de la colección _car_

A continuación se detallan las peticiones **HTTP** de la **API** de la colección **_car_** y sus posibles respuestas:

| MÉTODO | URL                                  | DESCRIPCIÓN                  | LOGIN                         | PARÁMETROS              | CUERPO DE LA PETICIÓN                                         | CÓDIGO DE RESPUESTA | RESPUESTA                                              |
| ------ | ------------------------------------ | ---------------------------- | ----------------------------- | ----------------------- | ------------------------------------------------------------- | ------------------- | ------------------------------------------------------ |
| GET    | http://localhost:3000/car/get/all/   | Búsqueda de todos los coches | **_seller_** (no obligatorio) |                         |                                                               | 200                 | Lista de todos los coches ordenados por marca y modelo |
| GET    | http://localhost:3000/car/get/id/    | Búsqueda de un coche         | **_seller_** (no obligatorio) | Identificador del coche |                                                               | 200                 | Coche                                                  |
| POST   | http://localhost:3000/car/create/    | Creación de un coche         | **_admin_**                   |                         | **Multipart Form Data** con los campos del coche a crear      | 201                 | Mensaje de confirmación de la creación del coche       |
| PUT    | http://localhost:3000/car/update/id/ | Actualización de un coche    | **_admin_**                   | Identificador del coche | **Multipart Form Data** con los campos a actualizar del coche | 200                 | Mensaje de confirmación de la actualización del coche  |
| DEL    | http://localhost:3000/car/delete/id/ | Eliminación de un coche      | **_admin_**                   | Identificador del coche |                                                               | 200                 | Mensaje de confirmación de la eliminación del coche    |

- El código de respuesta también puede ser **400** cuando falla la subida de la imagen del coche a **Cloudinary**
- El código de respuesta también puede ser **403** cuando se intenta realizar una acción sin estar autorizado
- El código de respuesta también puede ser **404** cuando no se encuentran resultados de búsqueda (métodos **GET**)
- El código de respuesta también puede ser **413** cuando falla la subida de la imagen del coche a **Cloudinary** por no tener un tamaño válido
- El código de respuesta también puede ser **500** cuando se produce un error interno del servidor al procesar la petición (por ejemplo, durante la validación de los campos del **Multipart Form Data** en los métodos **POST** y **PUT**)

`Si se crea un coche con la condición "Nuevo" el kilometraje siempre es 0`
`Si se crea un coche con la condición "Usado" el kilometraje tiene que ser mayor que 0`
`Un coche siempre se crea con el estado "Disponible"`
`Si un coche está disponible sólo se puede actualizar el color, la imagen y el precio`
`Si un coche no está disponible sólo se puede actualizar la imagen`
`No se puede eliminar un coche que no está disponible`
`La imagen de un coche será eliminada de "Cloudinary" si se produce alguna de las siguientes situaciones:`

- `Se ha producido un error al crear el coche`
- `Se actualiza la imagen del coche por una nueva`
- `Se ha producido un error al actualizar el coche`
- `Se elimina el coche`

## Endpoints de la colección _customer_

A continuación se detallan las peticiones **HTTP** de la **API** de la colección **_customer_** y sus posibles respuestas:

| MÉTODO | URL                                       | DESCRIPCIÓN                    | LOGIN        | PARÁMETROS                | CUERPO DE LA PETICIÓN                                           | CÓDIGO DE RESPUESTA | RESPUESTA                                                    |
| ------ | ----------------------------------------- | ------------------------------ | ------------ | ------------------------- | --------------------------------------------------------------- | ------------------- | ------------------------------------------------------------ |
| GET    | http://localhost:3000/customer/get/all/   | Búsqueda de todos los clientes | **_seller_** |                           |                                                                 | 200                 | Lista de todos los clientes ordenados por apellidos y nombre |
| GET    | http://localhost:3000/customer/get/id/    | Búsqueda de un cliente         | **_seller_** | Identificador del cliente |                                                                 | 200                 | Cliente                                                      |
| POST   | http://localhost:3000/customer/create/    | Creación de un cliente         | **_seller_** |                           | **Multipart Form Data** con los campos del cliente a crear      | 201                 | Mensaje de confirmación de la creación del cliente           |
| PUT    | http://localhost:3000/customer/update/id/ | Actualización de un cliente    | **_seller_** | Identificador del cliente | **Multipart Form Data** con los campos a actualizar del cliente | 200                 | Mensaje de confirmación de la actualización del cliente      |
| DEL    | http://localhost:3000/customer/delete/id/ | Eliminación de un cliente      | **_seller_** | Identificador del cliente |                                                                 | 200                 | Mensaje de confirmación de la eliminación del cliente        |

- El código de respuesta también puede ser **400** cuando falla la subida del cliente
- El código de respuesta también puede ser **403** cuando se intenta realizar una acción sin estar autorizado
- El código de respuesta también puede ser **404** cuando no se encuentran resultados de búsqueda (métodos **GET**)
- El código de respuesta también puede ser **500** cuando se produce un error interno del servidor al procesar la petición (por ejemplo, durante la validación de los campos del **Multipart Form Data** en los métodos **POST** y **PUT**)

`No se puede eliminar un cliente con coches reservados o vendidos`

## Endpoints de la colección _reservation_

A continuación se detallan las peticiones **HTTP** de la **API** de la colección **_reservation_** y sus posibles respuestas:

| MÉTODO | URL                                                | DESCRIPCIÓN                    | LOGIN        | PARÁMETROS                              | CUERPO DE LA PETICIÓN                                        | CÓDIGO DE RESPUESTA | RESPUESTA                                                                                                      |
| ------ | -------------------------------------------------- | ------------------------------ | ------------ | --------------------------------------- | ------------------------------------------------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------- |
| GET    | http://localhost:3000/reservation/get/all/         | Búsqueda de todas las reservas | **_seller_** |                                         |                                                              | 200                 | Lista de todas las reservas ordenadas descendentemente por fecha de la reserva                                 |
| GET    | http://localhost:3000/reservation/get/id/          | Búsqueda de una reserva        | **_seller_** | Identificador de la reserva             |                                                              | 200                 | Reserva                                                                                                        |
| GET    | http://localhost:3000/reservation/get/car-id/      | Búsqueda de una reserva        | **_seller_** | Identificador del coche de la reserva   |                                                              | 200                 | Reserva                                                                                                        |
| GET    | http://localhost:3000/reservation/get/customer-id/ | Búsqueda filtrada              | **_seller_** | Identificador del cliente de la reserva |                                                              | 200                 | Lista de reservas filtradas por identificador del cliente y ordenadas descendentemente por fecha de la reserva |
| POST   | http://localhost:3000/reservation/create/          | Reserva de un coche            | **_seller_** |                                         | **Multipart Form Data** con los campos de la reserva a crear | 201                 | Mensaje de confirmación de la reserva del coche                                                                |
| DEL    | http://localhost:3000/reservation/delete/id/       | Anulación de una reserva       | **_seller_** | Identificador de la reserva             |                                                              | 200                 | Mensaje de confirmación de la anulación de la reserva                                                          |

- El código de respuesta también puede ser **400** cuando falla la subida de la reserva
- El código de respuesta también puede ser **403** cuando se intenta realizar una acción sin estar autorizado
- El código de respuesta también puede ser **404** cuando no se encuentran resultados de búsqueda (métodos **GET**)
- El código de respuesta también puede ser **500** cuando se produce un error interno del servidor al procesar la petición (por ejemplo, durante la validación de los campos del **Multipart Form Data** en los métodos **POST** y **PUT**)

> La información de una reserva se puebla con la información del coche y del cliente de dicha reserva

`No se puede reservar un coche que ya está reservado o vendido`
`Cuando se reserva un coche o se anula una reserva se actualiza el estado del coche`

## Endpoints de la colección _sale_

A continuación se detallan las peticiones **HTTP** de la **API** de la colección **_sale_** y sus posibles respuestas:

| MÉTODO | URL                                         | DESCRIPCIÓN                  | LOGIN        | PARÁMETROS                            | CUERPO DE LA PETICIÓN                                      | CÓDIGO DE RESPUESTA | RESPUESTA                                                                                                  |
| ------ | ------------------------------------------- | ---------------------------- | ------------ | ------------------------------------- | ---------------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| GET    | http://localhost:3000/sale/get/all/         | Búsqueda de todas las ventas | **_seller_** |                                       |                                                            | 200                 | Lista de todas las ventas ordenadas descendentemente por fecha de la venta                                 |
| GET    | http://localhost:3000/sale/get/id/          | Búsqueda de una venta        | **_seller_** | Identificador de la venta             |                                                            | 200                 | Venta                                                                                                      |
| GET    | http://localhost:3000/sale/get/car-id/      | Búsqueda de una venta        | **_seller_** | Identificador del coche de la venta   |                                                            | 200                 | Venta                                                                                                      |
| GET    | http://localhost:3000/sale/get/customer-id/ | Búsqueda filtrada            | **_seller_** | Identificador del cliente de la venta |                                                            | 200                 | Lista de ventas filtradas por identificador del cliente y ordenadas descendentemente por fecha de la venta |
| POST   | http://localhost:3000/sale/create/          | Venta de un coche            | **_seller_** |                                       | **Multipart Form Data** con los campos de la venta a crear | 201                 | Mensaje de confirmación de la venta del coche                                                              |
| DEL    | http://localhost:3000/sale/delete/id/       | Devolución de un coche       | **_seller_** | Identificador de la venta             |                                                            | 200                 | Mensaje de confirmación de la devolución del coche                                                         |

- El código de respuesta también puede ser **400** cuando falla la subida de la venta
- El código de respuesta también puede ser **403** cuando se intenta realizar una acción sin estar autorizado
- El código de respuesta también puede ser **404** cuando no se encuentran resultados de búsqueda (métodos **GET**)
- El código de respuesta también puede ser **500** cuando se produce un error interno del servidor al procesar la petición (por ejemplo, durante la validación de los campos del **Multipart Form Data** en los métodos **POST** y **PUT**)

> La información de una venta se puebla con la información del coche y del cliente de dicha venta

`No se puede vender un coche que ya está vendido`
`No se puede vender a un cliente un coche reservado a otro cliente`
`Si se vende un coche reservado se anula la reserva`
`Cuando se vende un coche se actualiza el estado del coche`
`Cuando se devuelve un coche se actualiza la condición, el kilometraje (hay que añadir el nuevo kilometraje) y el estado del coche`

## Endpoints de la colección _user_

A continuación se detallan las peticiones **HTTP** de la **API** de la colección **_user_** y sus posibles respuestas:

| MÉTODO | URL                                   | DESCRIPCIÓN                    | LOGIN        | PARÁMETROS                | CUERPO DE LA PETICIÓN                                                                         | CÓDIGO DE RESPUESTA | RESPUESTA                                                   |
| ------ | ------------------------------------- | ------------------------------ | ------------ | ------------------------- | --------------------------------------------------------------------------------------------- | ------------------- | ----------------------------------------------------------- |
| GET    | http://localhost:3000/user/get/all/   | Búsqueda de todos los usuarios | **_admin_**  |                           |                                                                                               | 200                 | Lista de todos los usuarios ordenados por nombre de usuario |
| GET    | http://localhost:3000/user/get/id/    | Búsqueda de un usuario         | **_seller_** | Identificador del usuario |                                                                                               | 200                 | Usuario                                                     |
| POST   | http://localhost:3000/user/login/     | Inicio de sesión de un usuario | ---          |                           | **Multipart Form Data** con el nombre de usuario y la contraseña del usuario a iniciar sesión | 200                 | Token de autorización generado                              |
| POST   | http://localhost:3000/user/create/    | Creación de un usuario         | **_admin_**  |                           | **Multipart Form Data** con los campos del usuario a crear                                    | 201                 | Mensaje de confirmación de la creación del usuario          |
| PUT    | http://localhost:3000/user/update/id/ | Actualización de un usuario    | **_seller_** | Identificador del usuario | **Multipart Form Data** con los campos a actualizar del usuario                               | 200                 | Mensaje de confirmación de la actualización del usuario     |
| DEL    | http://localhost:3000/user/delete/id/ | Eliminación de un usuario      | **_admin_**  | Identificador del usuario |                                                                                               | 200                 | Mensaje de confirmación de la eliminación del usuario       |

- El código de respuesta también puede ser **400** cuando falla la subida del usuario
- El código de respuesta también puede ser **401** cuando falla el inicio de sesión del usuario
- El código de respuesta también puede ser **403** cuando se intenta realizar una acción sin estar autorizado
- El código de respuesta también puede ser **404** cuando no se encuentran resultados de búsqueda (métodos **GET**)
- El código de respuesta también puede ser **500** cuando se produce un error interno del servidor al procesar la petición (por ejemplo, durante la validación de los campos del **Multipart Form Data** en los métodos **POST** y **PUT**)

`Un usuario que no sea "admin" sólo puede consultar y actualizar su propio usuario`
`El usuario "superadmin" no se puede actualizar ni eliminar`
`El rol sólo puede ser actualizado por un usuario "admin"`
`Un usuario no se puede eliminar a sí mismo`

[//]: # 'Lista de enlaces:'
[Cloudinary]: https://cloudinary.com/
