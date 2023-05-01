# Registros y Despliegues
  -- Intro
    - Proveeremos 1 DB
    - Luego se podra publicar en  Azure, AWS, Digital Ocean, etc
    

  -- Construir la Img en multiples arch y subirla a 1 nuevo repo (del register) en dockerhub
    - Construimos la img con el   buildX
      - Nos cambiamos al builder del   buildX:       `docker buildx use mybuilder`
      - Ya debemos tener construido el Repository en dockerhub
        - Construimos la Img con soporte a multiples plataformas y hacemos el Push de una vez
          - Todo en base a solo el   Dockerfile
    
  ```bash
    docker buildx build \
      --platform linux/amd64,linux/arm64 \
      -t alexmartin22221/teslo-shop:1.0.0 --push .
  ```

    - El pord no funca xq necesita SSL para la DB
      - Solo se construye la IMG a partir del Dockerfile
        - Esta luego se hace el Push al Docker hun

    - Markdown para la Img - readme.md
        https://www.markdownguide.org/basic-syntax/




  -- Prueba de la img creada
    - Simeplemente podriamos agregar el Name de la Img q esta en Remoto en el  docker-compose

    - Para PROD debemos subir una nueva Img con la config del SSL para la DB
      - Probar con DB de   Render
      - La de Railway se acaba al paso
        - Buscar otro en donde colocar la de MySQL



  -- Desplegar la imagen directamente desde DockerHub       <--  No pude seguir x pobre :v
    - FH lo hace con Digital Ocean, pero es de pago  :(
      - Aqui mismo desplego 1ro la DB

    -- Desplegar desde Docker Hub
      - Solo es permitido con Repositorios/Registros Publicos
        - El  PORT  no lo incluye en las EnvV

    -- Container Registry de Digital Ocean
      - Subir la Img al registro de Digital Ocean, asi ya NO es publico en Docker Hub
        - Se crea el registry
        - Se sube la img
          - Cada img q subamso cobra :v
            - Es decir, No podemos tener tantos TAG/Versiones de la img como en Docker Hub xq seria caro
        - Se conecta con el API Token de Docker
          - El            `docker logout`      solo hace el logout de Docker Hub
          - Si tiene en otros como aqui en Digital Ocean debes hacer el logout en ese servicio:
                      docker logout registry.digitalocean.com
          - Login en digital ocean con docker
              docker login register.digitalocean.com
                - El token generado de acceso en do es el username y pass para este login
                  - Este login se ve 1 vez y luego no lo podras ver de nuevo
                    - Mejor lo guardas en un gestor de contrasenas

      - Desplegar la Img en local al Registro privado de DO (Digital Ocean)
        - Crar el registro privado
        - Suben la imagen
        - Despliegue:
          - Lo mismo q desplegar desde el Docker Hub, solo q ahora se elecciona el Regyster del DO

