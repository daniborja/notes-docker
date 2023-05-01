# DOCKER 2021 - De NOVATO a PRO! (CURSO COMPLETO)

## Inicio:
  - Docker Desktop para OS !== Linux
  - Instalar Docker Engine:
      sudo pacman -S docker
      sudo systemctl start docker.service
      sudo systemctl enable docker.service
      sudo usermod -aG docker $USER
      docker run hello-world

    - REINICIAR xq no se activa el deamon, me mato medio dia >:(

    - Crear grupo docker y agregar el user al grupo:
      https://www.digitalocean.com/community/questions/how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket
      https://linuxhandbook.com/docker-permission-denied/


    - REINICIAR xq no se activa el deamon, me mato medio dia >:(




      https://www.linuxfordevices.com/tutorials/linux/install-docker-on-arch#1A-Install-the-Official-version-of-Docker-on-Arch

      https://bbs.archlinux.org/viewtopic.php?id=267694


  
  

## Que es Docker
  - Nos permite correr todas nuestras apps siempre dentro del mismo entorno/contenedor.
    - Sandbox: Si corro una app con sus dependencias en el entorno va a funcionar, si lo muevo a otro server igual va a funcionar xq empaqueta todo.
    - 
  - Facil de mover, simpre funciona xq el entorno contiene las dependencias


  -- Docker vs Virtual Machine
    - Docker nos va a permitir correr Apps, compartir el kernel con el host
    - El OS va a dar el servicio de Docker
    - Docker comparte el kernel con el HOST


  -- Docker
    - Docker va a Correr 1 contenedor a partir de 1 Imagen. Para correr 1 contenedor necesitamos 1 img
      - La Imagen va a contener: El OS, Software y el Code/App conforman una img
        - OS: Distro de Linux - NO el kernel xq se comparte con el HOST
          - Puede ser ubuntu, debian, fedora, etc.
        - Software: Los paquetes q necesitamos para q funcione la app
        - App: El codigo fuente de la App

      - Cuando queremos convertir esa img a un Conteneder, corremos esa img




  -- Que es Docker behind the scenes:
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





    - Dockerfiles: Las imgs se generan usando el Dockerfile
      - Es un archivo q tiene una serie de instrucciones q indican como se creara la img
        - Comando  Docker build  genera la imagen
        - Docker run  corre el contenedor basado en la img creada
              Dockerfiles  --build-->  Img  --run-->  comtenedor

        - La Img puede ser creada x nosotros o x otra persona
          - Podemos cargar una imagen q previamente creo otra persona, y esa img puede tener 1 app corriendo
            - Esa app va a tener todas la deps para correr
            - Podemos bajar algo q ya este creado y adaptarlo a nuestras especificaciones
              - Ej: Si queremos correr un proyecto de WordPress en lugar de bajar 1 img de Ubuntu, instalarle Apache, PHP y demas dependencias. Lo q vamos a hacer es bajar 1 Img con WP que ya lo tiene todo configurado. Le metemos el code q le hace falta y lo personalizamos
              
          






## Correr una Img:
  - Buscar imagenes creadas: https://hub.docker.com/
    - Correr una img de postgres: https://hub.docker.com/_/postgres
      - No hace falta el    docker pull   xq ya esta incluido en el    docker run <img>
        - Con el     docker run <img>     si la img no existe en la maquina, se va a descargar automaticamente
          - Podemos usar el  tag  para acceder a diferentes versiones de la img
        - docker pull   <-  solo descarga la img
        - docker run    <-  la descarga y corre de inmediato

    ```
      # Ejemplo para img postgres: requiere el password
        docker run -e POSTGRES_PASSWORD=password postgres
    ```

      - Asi de facil tenemos un postgres corriente
        - Sin necesidad de tener Postgress instalado en la maquina
        - Corrimos esta lina de docker q automaticamente descargo la img de postgress e inicio el progreso
        - Podriamos abrir otra terminal y correr otro postgress al mismo tiempo
          - No hay problema xq c/contenedor es 100% independiente el 1 del otro.
          - No hay relacion entre contenedores. Por eso puedo correr diferentes versiones de 1 misma imagen en el mismo server

      - Las IMGS son un set de Layers/Capas
        - Descarga solo los layers q necesita. Los que no tiene. Optmiza el space
        - Como lons Contenedores son idependientes nos permite correr diferentes versiones de la img en el mismo servidor
          - Asi nos evitamos problemas de diferentes versiones de una dependencia en el server
            - Si tenemos PHPv en 1 contenedor no afecta a otros contenedores con PHPv diferentes
        - Las imgs las descargamos con  pull  o si las queremos correr con run
          - Cuando las corremos ya son Contenedores







  -- Comandos: Correr contenedores basados en Imgs
    docker images         <-    Lista las Img instaladas

    docker ps             <-    Lista los Contenedores q esta Corriendo
    docker ps -a          <-    Lista los Contenedores q corrieron hace tiempo.
                                Docker tiene un basurero q se limpia periodicamente

    docker start ID       <-    Correr un contendor x su id
                                Los Contenedores son Desechables, no deben guardar inf

    docker excec          <-    Ejecuta 1 comando Dentro de 1 contenedor q Ya esta corriendo
    docker exec -it ID sh   <-    -i sesion interactive | t emular 1 terminal | sh  shell

    docker stop ID       <-  Para un contenedor

    docker logs ID/NAME     <-  Muestra los Logs del contenedor y sale
    docker logs -f ID/NAME  <-  Muestras los Logs y se quda escuchando

    docker run -d IMG   <-  Corre una Img en background - Devuelve el ID del contenedor

    docker rm ID                <-  Elimina un contianer
    docker image rm -f ID/NAME  <-  Eliminar img








  -- Desarrollar 1 App usando un Contenedor de Docker
    - Ej con proyecto de Node
      - Buscamos una img creada, en este caso la official de Node
        - Nomenclatura:
          - 17-buster   <-  Hicieron un from Debian Buster. Instalaron todas las dependencias y crearon una img nueva de node con esa version
          - 17-stretch  <-  Lo mismo solo q con stretch
          - 17-alpine3.14 <-  Alpine es 1 Distro de Linux pensada para Contenedores muy pequena/liviana - la + utilizada  | apline No usa libc but masou??? - algunos problemas con algunos binarios


    ```
      # Version de la img q vas a ocupar
      # FROM node   <-  La ultima version de la img/node
      FROM node:16-alpine3.14


      # Dir q se crea en automatica - todos los comandos se correran en ese dir
      WORKDIR /app


      # Copia todos los archivos q estan en el directorio q contiene el dockerfile dentro de /app en el contenedor
      COPY . .


      # instala las deps del package.json
      RUN yarn install --production


      # Comando q va a correr: corre  node ./path   --   levanta la App de Node
      CMD ["node", "/app/src/index.js"]

    ```



  -- En la carpeta del proyecto de Node en este caso:
    - CONSTRUIMOS la IMG
      - Construir el contenedor | TAG: -t NAME
        - Esto nos permite darle un Name al contenedor para identificarlo + facil
            
            docker build -t NAME .

                - Descargara la img de node
                - Copiar todos los archivos
                - A correr el  RUN


    - CORREMOS la IMG:
      
            docker run IMG_NAME
        
      - Como esto corre independiente a nuestro HOST debemos especificar el puerto en el q debe correr
            docker run -dp 3300:3300 getting-starter



    - Volumenes en Docker para Persistencia
      - 36:20 / 1:06:21
          docker -d -v /PATH -p 3000:3000 NAME

      - Mantiene en sincronia el path con el contenedor
        - Si cambias el code, en vivo se cambia en el contenedor. Sin tener q volver a crear la img
            docker -d -v /PATH -p 3000:3000 -v /PATH NAME

      - Nuevo build a una img existente:
        - s
            docker build -t NAME:TAG .

      - Compartir la Img en internet
        - La subimos al  docker hub
            docker login
        - Tag correcto a la img: userName
            docker tag ID USERNAME/NAME:TAG
        - Tendremos 2 nombres q apunten al mismo ID img
        - Subimos:
            docker push CORRECT-TAG-NAME
        - Cualquiera puede descargar nuestra img:
            docker pull CORRECT-TAG-NAME



        


  // TODO: Docker compose  --  Da error el  network
  -- Corriendo varios containers a la vez
    - Ejemplo de la vida real: MULTICONTAINER
      - Lo mas comun es tener comtenedores separados:
        - Container para la DB
        - Container para la App


    - Multicontainer: Necesitamos una network - Red de Docker xq queremos q estos 2 contenedores corran en la misma red y q puedan conectarse entre ellos
      - Creamos 1 nueva red:
            docker network create todo-app
            docker run d \
              --network todo-app --network-alias mysql \
              -v todo-mysql-data:/var/lib/mysql \
              -e MYSQL_ROOT_PASSWORD=secret \
              -e MYSQL_DATABASE=todos \
              mysql:5.7 
      - s
      - 







## Docker compose
  - Tenemos:
    - services
      - Son los servicios/continers q vamos a correr dentro de docker compose
      - Nos permite correr varios contianers usando 1 solo archivo de config/especificaciones y automaticamente los va a meter en la misma red
        - Ya nos olvidamos del  --network y demas
        - docker-compose va a crear automaticamente una nueva red cada vez q corramos un   docker-compose up


    docker-compose up -d      <-  Levanta todos los servicios en el docker-compose.yaml



  - Comandos:     sudo pacman -Sy docker-compose
  >>> Todos los comandos en la ruta en la q esta el   .yaml:

    docker-compose up       <-    Levanta los containers especificados en el yaml
    docker-compose up -d    <-    Los levanta en background

    docker-compose ps       <-    Me indica los containers levantados con docker compose

    docker-compose logs -f SERVICE_NAME   <-  Logs

    docker-compose top      <-    Ver lo q se esta ejecutando

    docker-compose stop     <-    Para el composer
    docker-compose down     <-    Borra el composer - containers


  - Mapear un puerto en contreto de mi pc a un puerto del container:
    docker run -p  HOST_PORT:CONTAIMER_PORT IMG  







npm install -g npm@8.10.0
