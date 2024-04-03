# nodejs-apirest-app

## Diagrama de arquitectura

Microservicio creado con arquitectura hexagonal, principal división de carpetas 'application', 'domain', 'infrastructure'.

- __'application':__ inicializamos los componentes principales de dominio e infraestructura ademas de las configuraciones necesarias para el proyecto.

- __'domain':__ las entidades de dominio, los casos de uso y las posibles excepciones provenientes del dominio.

- __'infrastructure':__ conexiones a bases de datos, servidores web, message broker entre otros componentes de entrada ('receivers') y salida('adapters') de datos.

![Diagrama de arquiitectura](./documentation/arquitectura-hexagonal.png)
