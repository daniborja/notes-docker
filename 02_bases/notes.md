# Bases

  -- Seguir la guia de Docker Desktop
    - Correr la imagen:       `docker run -d -p 80:80 docker/getting-started`
      - d:  desenlazado de la terminal
      - p:  HOST_PORT:CONTAINER_PORT    <- -p de publish | publicar puerto host:container

    - Abrir el navegador en localhost
      - Ver la guia, q es la oficial
      
    - ID:  Podemos solo colocar los primeros  3  terminos del IDo



  -- Environment Variables
    - Asignadas con el tag      -e      x c/1
    - Correr 1 imagen oficial de     PostgreSQL
      `docker run --name some-postgres -dp 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword postgres:14.6`
          - name: nombre del container
          - e: EnvV
          - d: detached
          - p: puertos
          - al final el nombre de la IMG
            - username: postgres

    

  -- Multiples Instancias de la misma Img
    - Misma version/tag
    - Podemos crear 
          docker container run \
            --name postgres-alpha \
            -e POSTGRES_PASSWORD=mypass1 \
            -dp 5432:5432 \
            postgres:14.6


  -- Eliminar varios containers q estan corriendo o no: `docker container rm b18 d29 -f`


  -- Tarea:
    - Montar 1 db MariaDB
    - Run: 
      - username:   root
      - host:       127.0.0.1
    
  ```bash
    docker container run \
      --name some-mariadb \
      -e MARIADB_ROOT_PASSWORD=mypass1 \
      -dp 3306:3306 \
      mariadb:jammy
  ```










