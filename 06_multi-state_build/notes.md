# Multi-Stage builds
  -- Intro:     https://docs.docker.com/build/building/multi-stage
    - Crear 1 especie de Temp Images q se enfocaran en realizar 1 tarea
      - Bloque solo para deps, 
      - Es eficiente xq al no encontrar cambios en Layers, se usa el Cache y va mas rapido
      - Puede especificar q Mover entre Stages

    - Eliminar el Builder con    buildX
      - Nos pasamos a otro builder
      - Eliminamos el q queremos
          docker buildx rm NAME


  
  -- Init al Multi-Stage Build
    - Separamos por stage en el mismo Dockerfile


      - Push a Dockerhub con soporte a multiples plataformas
      
  ```bash
    docker buildx create --name mybuilder --driver docker-container --bootstrap
    docker buildx use mybuilder

    docker buildx build --platform linux/amd64,linux/arm64 \
    -t <username>/<image>:latest --push .
  ```




  -- Docker compose  Target Stage
    - Simplemente, si tenemos 1 Dockerfiel, en el Docker Compose hacer referencia a el

  ```docker
      build: 
        context: .
        dockerfile: Dockerfile
  ```

    - Al construir el    dev    <- target
      - Me da error, se solvento eliminando todos los    ^    en el package.json
        - Esto esta bien??? de q otra manera se podria corregir


    -- Probar el BindVolume desde el Compose
      - FH trata de evitar el   Bind Volume lo maximo posible
        - Es util para Dev


    
          https://docs.docker.com/compose/production/
    -- Generar el PRODUCTION build
      - Crear != docker-compose
        - 
      - Eliminamos los   Volumes   de la app
      

  `docker compose -f docker-compose.prod.yml up`



    -- Especificar 1 solo Service
      - Al final del build se especifica el servicio de interes
        - Servicio del   services    del docker-compose.yml

  `docker compose -f docker-compose.prod.yml build app`

      - Todo esto se hace asi xq FH quiso ensenar sobre los  targets y demas


    -- Podemos W con Multiples archivos Dockerfile y docker-compose.yml
      - 1 normal para prod
      - Otro   .dev   para devel
        - Para este, SI necesitamos los      Bind Volumes y en Node el Anonymous Volume
          - Bind Volueme:       Para vincular el code con el container y ver los cambios en t r
          - Anonymous Volume:   Para los  node_modules/, q no de error y se levante la app


