# Docker: De 0 a deployment

## Introducción - ¡Disponible sin registro!
  -- Que es Docker
    - NO es una Virtual Machine
      - X lo tanto es + eficiente. No tiene q levantar todo.
    - En este caso el Container es Docker:
      - Utiliza tecnologias propios de linux para q procesos q se ejecutan en tu maquina se ejecuten de forma aislada.
      - Esas tecnologias son         C-GROUPS Y NAMESPACES         q hacen q los procesos piensen q estan siendo ejecutados de forma aislada en otro sistema. Pero realmente se ejecutan en mi maquina en la q tengo instalado Docker.
          - c-groups: Tecnologia en Linux q me permite definir limites a un proceso. Limites como de memoria RAM, CPU, uso de disco, etc.
          - namespaces: Definir q es lo q quiero q vea un proceso. El container usa un namespace distinto para un sistema de procesos del contenedor.
            - Como el   Scope   de una f(x)  en JS o cualquier otro LP
      - En esto se basa Docker, en crea limites para nuestras Apps. Encontes, en cada container colocamos algo que necesitemos. Puebe ser la App, la DB, etc.


  - Docker se esta convirtiendo el en Standar a la hora de Ejecutar y Distribuir Apps.
    - Con esto, podemos crear container de cualquier cosa:
      - App en Java / JS / Python / etc.
      - El container va a arrancar independientemente del LP

    - Cuando hago un    docker run IMG    docker comprueba si existe la IMG en local
      - Si no existe, pues la descarga







## Inicio:
  - Docker Desktop para OS !== Linux
  - Instalar Docker Engine:
      sudo pacman -S docker
      sudo systemctl start docker.service
      sudo systemctl enable docker.service
      sudo usermod -aG docker $USER
      docker run hello-world

    - REINICIAR xq no se activa el deamon, me mato medio dia >:(

    - Crear grupo docker y agregar el user al grupo:    <--   sino requiere ser super su para usarlo
      https://www.digitalocean.com/community/questions/how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket
      https://linuxhandbook.com/docker-permission-denied/


    - REINICIAR xq no se activa el deamon, me mato medio dia >:(




      https://www.linuxfordevices.com/tutorials/linux/install-docker-on-arch#1A-Install-the-Official-version-of-Docker-on-Arch

      https://bbs.archlinux.org/viewtopic.php?id=267694









## Primeros pasos con Docker
  - Cada vez q se ejecuta un      docker run IMG     docker crea un Container Nuevo.
    - Tenemos una Img base, y con un    docker run IMG    lo q hacemos es Instanciar esa Img en un Contianer (como en programacion instanciamos un Obj a partir de una Class).
      - Aqui tenemos las Imgs q describen como van a ser los Containers
      - Cuando hago un   run, crea un  Contianer  basandose en esa Img.
        - Justamente x eso, si creo algo en un contianer y luego lo mato, toda esa data se pierde xq es un container nuevo
        
  - Si quiero recuperar la info del container lo inicio sabiendo su ID con     docker ps -a
    - Asi recupero toda la info q tenia en ese container.
    - Docker mata el proceso/container pero NO lo eleimina
    


   -- Docker:
    - Docker va a Correr 1 contenedor a partir de 1 Imagen. Para correr 1 contenedor necesitamos 1 img
      - La Imagen va a contener: El OS, Software y el Code/App conforman una img
        - OS: Distro de Linux - NO el kernel xq se comparte con el HOST
          - Puede ser ubuntu, debian, fedora, etc.
        - Software: Los paquetes q necesitamos para q funcione la app
        - App: El codigo fuente de la App

      - Cuando queremos convertir esa img a un Conteneder, corremos esa img


 - Dockerfiles: Las imgs se generan usando el Dockerfile
      - Es un archivo q tiene una serie de instrucciones q indican como se creara la img
        - Comando    Docker build    genera la imagen
        - Docker run   corre el contenedor basado en la img creada
              Dockerfiles  --build-->  Img  --run-->  comtenedor

        - La Img puede ser creada x nosotros o x otra persona
          - Podemos cargar una imagen q previamente creo otra persona, y esa img puede tener 1 app corriendo
            - Esa app va a tener todas la deps para correr
            - Podemos bajar algo q ya este creado y adaptarlo a nuestras especificaciones
              - Ej: Si queremos correr un proyecto de WordPress en lugar de bajar 1 img de Ubuntu, instalarle Apache, PHP y demas dependencias. Lo q vamos a hacer es bajar 1 Img con WP que ya lo tiene todo configurado. Le metemos el code q le hace falta y lo personalizamos
              





## Correr una Img:
  - Buscar imagenes creadas: https://hub.docker.com/
    - Correr una img de postgres: Existe Imgs oficiales
      - No hace falta el    docker pull   xq ya esta incluido en el    docker run <IMG>
        - Con el     `docker run <IMG>`     si la img no existe en la maquina, se va a descargar automaticamente
        
          - Podemos usar el   tag   para acceder a diferentes versiones de la img
          
        - docker pull   <-  solo descarga la img
        - docker run    <-  la descarga y corre de inmediato

    ```bash
      # Ejemplo para img postgres: requiere el password
        docker run -e POSTGRES_PASSWORD=password postgres
    ```

      - Asi de facil tenemos un postgres corriente
        - Sin necesidad de tener Postgress instalado en la maquina
        - Corrimos esta lina de docker q automaticamente descargo la img de postgress e inicio el progreso
        - Podriamos abrir otra terminal y correr otro postgress al mismo tiempo
          - No hay problema xq c/contenedor es 100% independiente el 1 del otro.
          - No hay relacion entre contenedores. Por eso puedo correr diferentes versiones de uan misma imagen en el mismo server

      - Las IMGS son un set de Layers/Capas
        - Descarga solo los layers q necesita. Los que no tiene. Optmiza el space
        - Como lons Contenedores son idependientes nos permite correr diferentes versiones de la img en el mismo servidor
          - Asi nos evitamos problemas de diferentes versiones de una dependencia en el server
            - Si tenemos PHPv en 1 contenedor no afecta a otros contenedores con PHPv diferentes
        - Las imgs las descargamos con  pull  o si las queremos correr con run
          - Cuando las corremos ya son Contenedores




  ===================================================================
  -- Comandos:
    docker images         <-    Lista las Img instaladas

    docker ps             <-    Lista los Contenedores q esta Corriendo
    docker ps -a          <-    Lista los Contenedores q corrieron hace tiempo.
                                Docker tiene un basurero q se limpia periodicamente


    docker start ID       <-    Correr un contendor x su ID
                                Los Contenedores son Desechables, no deben guardar inf

    
    docker excec          <-    Ejecuta 1 comando Dentro de 1 contenedor q Ya esta corriendo
    docker exec -it ID sh   <-    -i sesion interactive | t emular 1 terminal | sh  shell

    docker stop ID         <-  Para un contenedor

    docker logs ID              <-  Muestras los Outputs/Comandos/logs del container
    docker logs -f ID           <-  Se queda escuchando los logs del container   |   -f = follow

    docker stop ID              <-  Linux envia una senal para detener el contianer. La senal es una  zip term de linux.


    docker start -i ID          <-  Arranco un container creado y visto con   docker ps -a
                                    Tendra toda la data creada en ese container


    docker rm ID                <-  Elimina un contianer
    docker rm ID -f             <-  Fuerza la eliminacion del container, sin importar si eta corriendo o no 

    docker images               <-  Lista las imgs q tengo en el sistema
    docker run -d IMG           <-  Corre una Img en background

    docker image rm -f ID/NAME  <-  Elimina una Img



  -- Volumes
  - Ver el path en el q se creo el dir del volumen en our PC
    docker inspect -f "{{json .Mounts}}" IMG_ID
    docker inspect -f "{{json .Mounts}}" NAME (--name)

    docker volume ls              <-    Lista todos los volumenes existentes
    docker volume create NAME     <-    Crear voluemenes
    docker volume rm ID/NAME      <-    Eliminar volumen

    ```
      # usar 1 volumen ya existente
      docker run -it -v alex-volume:/data ubuntu
    ```
        alex-volume:    <-  Volumen/Dir en mi PC  - Vol creado por mi
        /data           <-  path en el q quiero montar ese volumen en el Contianer 


    - Comandos:     sudo pacman -Sy docker-compose
      >>> Todos los comandos en la ruta en la q esta el   .yaml:

      docker-compose up       <-    Levanta los containers especificados en el yaml
      docker-compose up -d    <-    Los levanta en background

      docker-compose ps       <-    En la ruta del  .yaml  - Me indica los containers levantados con docker compose en esta ruta

      docker-compose logs -f SERVICE_NAME   <-  Logs

      docker-compose top      <-    Ver lo q se esta ejecutando

      docker-compose stop     <-    Para el composer
      docker-compose down     <-    Borra el composer - containers


        ```
        # .yaml
        version: '2.3'
        services:
          app:      # Servicios
            image: php:7.2-apache
            volumes:
              - ${PWD}:/var/www/html
            ports:
              - 8000:80
        ```






## Imágenes de Docker
  -- Dockerfile
    - Imagenes oficiales en  docker hub:
        https://hub.docker.com/search?image_filter=official&q=&type=image

    - Docker file
      - Fichero q describe lo q tiene una Img de Docker
        - Podemos especificar como queremos q se comporte un container ejecutado a   partir de esa Img
          - FROM:   scrath  <-  Img q no se basa ni depende de otra. Creada desde cero
          - ADD:    copia data de un path en el /path del container
          - RUN:    Ejecuta comandos DENTRO del Container
          - CMD:    Comando q se ejecuta dentro del Container cuando se hace un   docker run
              https://docs.docker.com/engine/reference/builder/#from



  -- Creando nuestras Img con Dockerfile
    - Creamos el Dockerfile
          docker build -t NAME  .  [-f NAME]
            -t Para darle name
            . Indica en donde esta el   Dockerfile
            -f NAME   <-  Si el Dockerfile tiene otro nombre. Optional

    - Correr la img creada:
          docker run --rm -p  8000:80 -it NAME
      
      -p    Define el puerto
      -it   Modo interactivo con terminal




  -- CMD vs Entrypoint
    - Entrypoint: Siempre se va a ejecutar cuando arranque un container. Aunq no lo especifique en el Dockerfile se va a ejecutar el q tiene x defecto
          ENTRYPOINT ["/bin/sh", "-c"]    <-  ejecuta el comando q recibe en la shell

      - Podemos Sobrescribirlo y lanzar un comando q queramos:
        - Todo lo q va despues de la Img sobrescribe el entrypoint
            docker run --rm -it IMAGE /COMANDO

          ```dockerfile
            # Dockerfiel:
            FROM ubuntu
            ENTRYPOINT [ "/bin/cat" ]                           <--

            # Creamos la img
            docker build -t entryp-cmd-1 .

            # Corremos la img con el comando
            docker run --rm -it entryp-cmd-1 /etc/os-release    <--
            docker run --rm -it entryp-cmd-1 /etc/passwd        <--
          ```



    - CMD: No hay uno x default. Comando q se ejecuta dentro del container cuando se haga un    docker run
      - Si no especifico nada al correr el container, toma el CMD del Dockerfile

      ```
         # Dockerfiel:
          FROM ubuntu
          ENTRYPOINT [ "/bin/cat" ]                           <--
          CMD [ "/etc/os-release" ]                           <--

          # Creamos la img
          docker build -t entryp-cmd-2 .

          # Corremos la img -- Como NO especifico nada toma el CMD del Docker file
          docker run --rm -it entryp-cmd-2                    <--
          docker run --rm -it entryp-cmd-2 /etc/passwd        <- Sobrescribe
      ```


    - Correr una App de Node
  
      ```
        # Dockerfile
        FROM node
        WORKDIR /app
        COPY . .
        RUN npm i
        CMD [ "node", "/app/src/server.js"]

        # Crear la Img
        docker build -t IMAGE_NAME .      

        # Correr la img
        docker run -dp 3300:3300 IMAGE_NAME
      ```



  -- Usando variables de entorno para configurar el contenedor
    - Uno de los patrones mas utilizados al construir nuestras Img es definir las config como variables de entorno
      - 

    - Dockerfile
      - LABEL:  Nos permite poner etiquetas a nuestras imgs
      - ENV:    Definir variables de entorno
        - Para Node puede definir las ENV q tengo en el   .env
          - Es como en Heroku, creamos las env en la app de heroku
          - Aqui lo haemos en el Dockerfile

        ```
          # Dockerfile
          FROM node
          WORKDIR /app
          ENV PORT=4992                                     <--
          COPY . .
          RUN npm i
          CMD [ "node", "/app/src/server.js"]

          # Creo la img
          docker build -f IMG_NAME .

          # Correr el container de Node
          docker run -dp PORT:PORT IMG_NAME                 <--
        ```


      - Indicar las  ENV  al momento de correr la img 
        --env     -e 

        ```
          docker run --rm -e ENV_NAME=VALUE -p 8000:80 IMG_NAME
        ```







## Buenas prácticas con Dockerfiles
  -- La Cache
    - Colocar los comandos del Dockerfile q MAS vayan a CAMBIAR en el FINAL, para no romper la cache

    - Docker va apilando distintas capas de cambios 
      - Cada vez q se encuentra 1 linea en el Dockerfile crea una Capa Nueva q refleja/contiene ese cambio
      - Cuando ejecuto el    docker build    el va ejecutando 1 a 1 esas instrucciones y anadiendo esas capas.
      
    - Si en una cadena de pasos cacheados docker se encuentra una modificacion y ya NO puede coger de la cache, pues el resto de pasos TAMPOCO van a coger de la cache, aunq no hayan sido modificados.
        Using cache   <-  Docker esta usando la cache en el    docker build



  -- Multi-stage build
    - Permite tener 2  FROM
      - El 1ro es eliminado y se queda el 2do FROM
      - Util para PHP con Composer.
        - El 1er FROM es a Composer
        - El 2do es a PHP con la referencia a lo crado en el 1ero, asi ya NO se lleva el composer, solo los archivos genrados
    - Hacer imgs lo mas pequenas posibles
      - Como cada instruccion en el Docker file es una capa, cuantas menos capas tengamos mejor
      - Por eso podemos usar un   RUN   de varias intrucciones vinculadas con  &&

  ```
    RUN something1 && something2  &&  something3
  ```
    


  



## Ejecutando aplicaciones con Docker
  -- Exponiendo Puertos
    - Usualmente las App q ponemos dentro de nuestros container van a tener un servidor escuchando en algun puerto.
      - Por default un proceso que esta escuchando en un puerto del container NO es accesible desde fuera del container
      - Docker me permite exponer ese puerto afuera del container y q asi mi servidor pueda responder a las peticiones.


    - Definir puertos:
      - Definir el puerto expuesto en el Container
        - Si SOLO defino este puerto para el contianer, este se Mapeara/conectara con un puerto aleatorio de mi PC/HOST. Lo podemos ver con    docker ps   
        - EL puerto 49154 de mi pc esta mapeado al puerto  3300 dentro del contianer (49154->3300/tcp)
              docker run -p CONTAIMER_PORT IMG


    - Mapear un puerto en contreto de mi pc a un puerto del container:
              docker run -p  HOST_PORT:CONTAIMER_PORT IMG
    
    
    

  -- Reiniciar contenedores fallidos automaticamente
    - Tenemos 3 opciones. Unas respetan el   docker stop   y el always no
      --restart=on-failure[:max-retries]

      ```
        docker run --restart=on-failure:NUMBER -p 3300:3300 apv-app
      ```

      https://docs.docker.com/engine/reference/commandline/run/#restart-policies---restart


  

  -- Limitar la CPU y memoria
    - Ahora nos centraremos en el    c-groups   q permiten Docker.
      - Los  c-roups  es la funcionalidad de Linux q permiten limitar los recursos disponibles para un proceso determinado.
        - Si la App incrementa el consumo de   memoria (ram)  y llega al limite especificado, el servicio de Docker Matara a ese contianer
        - CPU: Podemos establecer un limite a los CPUs (cores)
        - CPU SHARES: Cuando ya no se tenga CPU y varios procesos esten compitiendo por cpu, el asignar cpu-chare dara prioridad a un procesos/img en concreto
      - Estos limites no van a ser usados todo el tiempo, solo q docker cuando vea q se alcance esos limites, mata el contianer
      

      ```
        docker run --cpu=2  --memory=500m  --restart=on-failure:4 -p 3300:3300 apv-app
      ```

      
      

    -- Persistencia de datos con Volumenes
      - Con los Volumenes Docker nos permite persistir informacion, x ejemplo de DB.
        - Usar volumenes al correr un contianer      -v /PATH   <-  Monta en el container
        - En este ej. docker creara/montara el nuevo volumen  /data  dentro del file system de la img de ubuntu en el path especificado
          - El contedio/data de ese volumen va a vivir fuera del filesystem del contianer. Con lo cual aunq el container se para o se borre, esos datos NO se perderan.
        - Este volumen vive fuera del contianer, dentro de mi pc
     
        
  ```
    docker run -it --name vol-test -v /data ubuntu
  ```
      --name vol-test   <-  Crea el volumen (dir en mi pc <- docker define en donde lo crea)
      -v /data          <-  Monsta  /data en el volumen dentro del container

      - Con esto, docker ha creado un directorio q es el volumen en MI PC.
        - Para ver en donde la ha creado nos fijamos en el    Source   q mostrara el  docker inspect

        ```
          docker inspect -f "{{json .Mounts}}" IMG_ID
          docker inspect -f "{{json .Mounts}}" NAME (--name)
        ```

          - Ese volumen/dir q esta en el container es en efecto un DIR en mi PC
            - En el container ese volume esta mapeado al dir en mi pc
            - X eso tiene un ciclo de vida != al del contianer. Con lo cual el container puede morirse o borrarse y el voluemen/dir en mi pc  no se va a ver afectado


    - Los volumenes en Docker son como 1 objeto de 1er nivel al igual q las Imgs, x lo cual podemos usar comandos especificos para ellos:
      - Al crear un volumen asi se crea la carpeta/dir en la ruta especifica para volumenes en Docker. Esto hace q exista este volumen y ya lo podemos utilizar para Montarlo en aquellos containers q a mi me interesen

        docker volume ls              <-    Lista todos los volumenes existentes
        docker volume create NAME     <-    Crear voluemenes
        docker volume rm ID/NAME      <-    Eliminar volumen


    ```
      # usar 1 volumen ya existente
      docker run -it -v alex-volume:/data ubuntu
    ```
        alex-volume:    <-  Volumen/Dir en mi PC  - Vol creado por mi
        /data           <-  path en el q quiero montar ese volumen en el Contianer 



    - Especificar a Docker en done guardar el  volume  en mi PC
      - Igual q antes, pero en vez de 1 VolumeName colocamos un Path en mi PC
        - Esa ruta se convertira en un volumen

      ```
        docker run -it vol-test -v $PWD:/data ubuntu

        # Al matar el container sigue usando el volume xq le dimos  --name
        docker run -it --name vol-test -v $PWD:/data ubuntu
      ```
            -v $PWD:/data
                  $PWD    <-   path de mi pc para q se convierta en volume (ruta actual)
                  /data   <-   path dentro del container en donde se montara el volume

      

    // TODO: Ver lo del pelado nerd  --  Node
    - Crear un volumen con el codigo fuente en lugar de crear una img
      - Creo un Volume con el contenido del back en Node x ejemp. y lo monto dentro del container en /path q buscara el start del npm
      - Muy util en php, asi ya NO crea la img, solo arrancas una img de php con apache y especificas lo q debe buscar
    
      - docker -d -v /PATH -p 3000:3000 -v /PATH IMG_NAME
            docker -d -v ./ -p 3000:3000 -v ./ apv-app

      - En el Dockerfile puede establecer el path detro del container en donde se va a montar el volume

      ```
        ...
        VOLUME /path
      ```







## Publicando nuestra aplicacion en DockerHub con Continuous Integration
  -- Con Continous Delivery
    - A 2022 esta funcion es de pago :(
    - Solo se puede publicar en dochubs gratis lo que sea publico





## Docker Compose
  -- Intro a Docker Compose
    - Nos permite orquestar varios containers en local
    - Se basa en un fichero.yaml
      - Permite especificar las apps q queremos levantar
      - Este  .yaml  lo podemos tener el github
    - docker-compose va a crear automaticamente una nueva red cada vez q corramos un   docker-compose up
   



    - Comandos:     sudo pacman -Sy docker-compose
      >>> Todos los comandos en la ruta en la q esta el   .yaml:

      docker-compose up       <-    Levanta los containers especificados en el yaml
      docker-compose up -d    <-    Los levanta en background

      docker-compose ps       <-    En la ruta del  .yaml  - Me indica los containers levantados con docker compose en esta ruta

      docker-compose logs -f SERVICE_NAME   <-  Logs

      docker-compose top      <-    Ver lo q se esta ejecutando

      docker-compose stop     <-    Para el composer
      docker-compose down     <-    Borra el composer - containers




        ```
        # .yaml
        version: '2.3'
        services:
          app:      # Servicios
            image: php:7.2-apache
            volumes:
              - ${PWD}:/var/www/html
            ports:
              - 8000:80
        ```



  -- Orquestando varios contenedores en local
    - 
