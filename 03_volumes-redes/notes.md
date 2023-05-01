# Volumes and Network

  -- Hacer pesistente la data de interes almacenada en el container
  -- Creamos redes para permitir la comunicacion entre Containers


  - Conectarse a MariaDB

    ```bash
      docker container run \
        -dp 3306:3306 \
        --name world-db \
        -e MARIADB_USER=example-user \
        -e MARIADB_PASSWORD=user-password \
        -e MARIADB_ROOT_PASSWORD=root-secret-password \
        -e MARIADB_DATABASE=world-db \
        mariadb:jammy
    ```






## Volumens
  --- Tenemos 3 tipos de volumenes. Persisten la data entre reinicios y lenvantamientos de imgs
    - Named Volumes:
      - El volumen mas usado, nosotros damos el name, x eso podra ser referenciado cuanso se vaya a crear 1 container
    - Bind Volumes:
      - Defines q dir/ del HOST montar en q path del containes
    - Anonymous Volumes:
      - Solo indicas la ruta en donde debera ser montada y docker asignara el name


    -- Definir 1 volume a 1 container:
      - Named Volume:        `-v  HOST_VOLUME:PATH_CONTAINER`
      - Bind Volumes:
        - conectar un dir/ especifico de nuestro filesystem con el container
          - Asi podemos tener un Docker Dev   <--    Dev Containers de VSCode
      - Anonymed Vluemes: 
        - 

        - DB paths:
          - mongo-data  ->  /data/db
          - postgres    ->  /var/lib/postgresql/data
          - mysql       ->  /var/lib/mysql
          - mariaDB     ->  /var/lib/mysql


    ```bash
      docker container run \
        -dp 3306:3306 \
        --name world-db \
        -e MARIADB_USER=example-user \
        -e MARIADB_PASSWORD=user-password \
        -e MARIADB_ROOT_PASSWORD=root-secret-password \
        -e MARIADB_DATABASE=world-db \
        -v z_my-volume:/var/lib/mysql \
        --network world-app \
        mariadb:jammy
    ```



    -- phpMyAdmin
      - Usaremos la verison:        '5.2.1-apache'
            docker run --name phpmyadmin -d -e PMA_ARBITRARY=1 -p 8080:80 phpmyadmin

    ```bash
      docker run \
        --name phpmyadmin \
        -dp 8080:80 \
        -e PMA_ARBITRARY=1 \
        phpmyadmin:5.2.1-apache
    ```






## Network
  --- Los Container se podran comunicar entre si, SOLO SI estan en al Misma Red/Network
    - Debemos crear un Network para comunicar containers entre si.
      - Los container dentro de una misma red se comunican entre si mediante el Nombre del Container
                https://docs.docker.com/engine/tutorials/networkingcontainers
    - Al crear 1  red y agregarle containers, estos dentro de la red como DNS o identificadores usaran su mismo nombre de contenedor.


    - Conectarnos a phpmyadmin
      - Con los datos de la DB
      - Server: Es el nombre asignado dentro de la red  (world-db)
      
      - Conectar container a la red
        - 1 a la vez:       `docker network connect world-app 46f`
        - Desde la inicializacion:

  
    ```bash
      docker run \
        ...
        --network world-app \
    ```




    -- Bind Volumes
      - App de Nest, crea el dist/ y el node_modules/ pero le pertenece al root
        - v: HOST:CONTAINER

    ```bash
      docker container run \
        --name nest-app-docker \
        -w /app \
        -dp 3000:3000 \
        -v "$(pwd)":/app \
        node:18-alpine \
        sh -c "yarn install && yarn start:dev"
    ```


    -- Ingresar al Container
      
        `docker exec -it d14 /bin/sh`


