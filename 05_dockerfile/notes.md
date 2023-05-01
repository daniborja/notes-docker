# Dockerfile - Crear Images

  -- Intro
    - Son instrucciones de como Construir Capas
      - Instrucciones para construir la Imagen
    - Vamos a incluir TESTS
      - Solo SI pasan los tests, se contruye la Img, caso contrario NO.

    - Dockerizar 1 App
      - Proceso de tomar 1 codigo fuente y generar 1 Img lista para montar y correrla en 1 Container



    -- Dockerfile:   https://docs.docker.com/engine/reference/builder
      - Es 1 Archivo de Texto con Instrucciones necesarias para crear 1 Img. Se puede ver como 1 Blueprint o plano para su construccion.
      - Podemos especificar como queremos q se comporte un container ejecutado a   partir de esa Img
        - FROM:   scrath  <-  Img q no se basa ni depende de otra. Creada desde cero
        - ADD:    copia data de un path en el /path del container
        - RUN:    Ejecuta comandos DENTRO del Container
        - CMD:    Comando q se ejecuta dentro del Container cuando se hace un   docker run
            https://docs.docker.com/engine/reference/builder/#from







## Dockerfile - Construir Imgs
  -- Dockerizar 1 app
    - FROM        Img base de entrada/inicio  - Node crea  app/
    - WORKDIR     Nos movemos de dir/
    - RUN         Ejecuta comandos DENTRO del Container en 1 NEW LAYER
    - CMD         Comando q se ejecuta al Iniciar el Container (docker RUN img)
  

  -- Build de la Img
    - Para darle 1 name a la Img usamos el Tag del name
          `docker build . -t some-name`
            - -t    <-    tags, en este caso para darle name a la Img
            - .     <-    referencia al Path en donde esta el Dockerfile
            - -f name   <-    Optional, si el Dockerfile tiene Otro name/path

    - Step 1/5: Son las Lineas con cada Instruccion en el Dockerfile
    - Buena Practica colocar todos los comandos q MENOS Cambian Al inicio
      - Xq, Docker, 1 vez detecta 1 change, este rompe la cache


  -- Run img
    - Como siempre:    docker run img_name





  -- Reconstruir 1 Img
    - Podemos crear 1 nueva Img dandole 1 TAG especifico (like versionamiento)
            `docker build -t cron-ticker:1.0.0  .`

    - Construir la img RENOMBRANDO una Etiqueta/TAG
      - Renombrar 1 image Local
        - Mas bien es como clonar esa img y asignarle 1 nuevo tag
          - Si no especifico tag (:1.0.0) tomara x default el  latest
        
  `docker image tag cron-ticker:1.0.1 cron-ticker:wolf`

  ```bash
  # comandos para esto
  docker image tag SOURCE[:TAG] TARGET_IMAGE[:TAG]
  docker tag IMAGE NEW_IMAGE
  docker tag <Tag Actual> <USUARIO>/<NUEVO NOMBRE>
  ```

      



  -- Subir una Img a DockerHub  <-  Se suben imgs a 1 registro (dockerhub)
    - Crear 1 cuanta en  Dockerhub
      - Crear 1 nuevo repository
    - Cambiar el Name de la Img a desplegar  -  Crea otra img como en Local antes visot
                `docker image tag cron-ticker alexmartin22221/cron-ticker`
          - Este tag viee del repo creado, asi lo debemos llamar
    - Auth en Docker en el HOST
      - comandos:
                  docker login
    - Hacer el push del repo
                  docker push alexmartin22221/cron-ticker

    - Podemos hacer push de otras versiones/Tags
      - Cambiamos el name / creamos otra img en base a 1 existente (q es lo q realmente sucede)
      
`docker image tag alexmartin22221/cron-ticker:latest alexmartin22221/cron-ticker:1.0.1.castor`
`docker push alexmartin22221/cron-ticker:1.0.1.castor`

      - Se pushea :v rapido si los Layers no han cambiado
        - Solo las cuentas Verificadas/Originales son las q mantienen el    latest   como debe de ser, el resto de nosotros creamos tags sin respetar el latest


    -- Consumir nuestras Imgs de DockerHun
      - Simplemente hacemos el    pull    y el     run     de la img




    -- Agregar Pruebas Automaticas al codigo
      - Es de suma importancia crear tests que Impidad que se Cree la Img cuando algun test no pasa.
        - Esto nos evita acarrear problemas a Production
        - Instalamos   Jest   para el testing en Node
              pnpm add -D jest
        

      -- Incorporar   Testing   en la construccion de la Img  -  Dockerfile
        - Con esto, solo si pasa todos los test, se crea la img.

        -- Examinar la Img creada
          - Solo entramos al container con el    exec -it
            - Como usamos un  apline  debemos correr:       /bin/sh


      -- .dockerignore
        - Evita q se copien los archivos indicados
    

      -- Optimizacino Empirica - NO Pro plus
        - Remover archivos y carpetas de la Img
        - Ejecutar el  npm ci --prod
          - Para q solo installer las deps de prod y no las de Dev 


      -- El renombrar el Tag nos sirve para poder llevar a    latest    el ultimo tag q tengamos
        - Asi, el ultimo tag lo podemos renombrar a    latest:

    ```bash
      docker image tag alexmartin22221/cron-ticker:samy alexmartin22221/cron-ticker:latest
      docker push alexmartin22221/cron-ticker:latest
    ```





#### BuildX - Construcciones de Imgs en Multiples Arquitecturas
  --- Especificar la Arquitectura/Plataforma de la imagen
    -- Forzar 1 plataforma en la construccion de la Img
      - Solo sirve para 1 img, se deberia cambiar x c/arch q se requiera


    -- BuildX:
      - NO funca para Linux  :(
            https://docs.docker.com/build/install-buildx/
            https://docs.docker.com/build/building/multi-platform/#getting-started


    - Con   yay:   https://archlinux.org/packages/community/x86_64/docker-buildx/
      - Asi ya vale :v
        - Instalar el bootstrap
              `docker buildx create --name mybuilder --driver docker-container --bootstrap`
          - En auto Run de 1 container
        - Cambiar / Switch to the new Builder
          - Cambiamos al de interes para crear la img con esa plataforma
                `docker buildx use mybuilder`
          - Ver el q se esta usando: Se marca con el   *
                `docker buildx ls`
          - Luego de push, devolvemos al default
                `docker buildx use default`
          - Crear la Img para != arch con el  buildx
            - Este   buildx  seleccionara el q este en  use
            - Ver las arch q usa el builder q se esta usando:
                  `docker buildx inspect`

          - Docker identificara en auto cual de esas versiones es la q se adapta a mi Architecture y la va a seleccionar.


```bash
# example: En donde esta el   Dockerfile
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 \
-t alexmartin22221/cron-ticker:latest --push .

# structure
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 \
-t <username>/<image>:latest --push s.
```



    -- buildx sin agregar nada al Dockerfile
      - No agregamos nada al Dockerfile
      - Ejecutar el comando en el  path/  en el q esta el  Dockerfile
      - Siempre hacer de nuevo el push con el tag   latest   para tener como ultimo tag el latest
        - Tip este de crear el latest de nuevo  :v

```bash
docker buildx build \
--platform linux/amd64,linux/arm64 \
-t alexmartin22221/cron-ticker:bird-builder --push .
```





