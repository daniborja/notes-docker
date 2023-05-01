# Docker

  
## Que es Docker y XQ debemos saberlo
  -- Beneficios de usar Docker
    - Los contenedores se levantan en milesimas de segundo o pocos segundos

    -- Docker utiliza tecnologias propias de Linux para q != processo se puedan ejecutar de forma aislada en 1 misma maquina
      - Estas tecnologias son los     `C-GROUPS y NAMESPACES`      q hacen q los procesos piensen q estan siendo ejecutados de forma aislada en sistemas independientes. Pero, realmente se ejecutan en la Maquinas HOST q tiene instalado Docker.
          - C-GROUPS: Tecnologia en Linux q me permite definir limites a un proceso. Limites como de memoria RAM, CPU, uso de disco, etc.
          - NAMESPACES: Definir q es lo q quiero q vea un proceso. El container usa un namespace distinto para un sistema de procesos del contenedor.
            - Como el   Scope   de una f(x)  en JS o cualquier otro LP
      - En esto se basa Docker, en crea limites para nuestras Apps. Encontes, en cada container colocamos algo que necesitemos. Puebe ser la App, la DB, etc.

    - Es posible ejecutar varias instancias de la misma version o versiones != sin config adicional.
    - Cada container contiene todo lo q necesita para ejecutarse


    -- Imagen:  Confiar en imgs  Oficiales y Verificadas 
      - Es 1 archivo construido x CAPAS, q contiene todas las dependencias q necesita para ejecutarse, tal como: deps, config, scripts, binarios, etc.
        - La Imagen va a contener: El OS, Software y el Code/App conforman una img
          - OS: Distro de Linux - NO el kernel xq se comparte con el HOST
            - Puede ser ubuntu, debian, fedora, etc.
          - Software: Los paquetes q necesitamos para q funcione la app
          - App: El codigo fuente de la App

      - Al correr (RUN) de la img, instanciamos 1 nuevo Container.
        - Un Container es una Instancia de 1 img ejecutandose en 1 ambiente aislado
        - Docker va a Correr 1 contenedor a partir de 1 Imagen. Para correr 1 contenedor necesitamos 1 img
      - Los containers son desechables, NO deben almacenar infro, para eso estan los Volumes




  ===================================================================
  --- Comandos:
    docker images                       <- list images
    docker image ls                     <- list images
    docker image ls -a                  <- list all images

    docker image rm ID/NAME             <- remove 1 o more imgs | ID puede ser 3 primeros
    docker image prune                  <- remove unused imgs

    docker run -d -p 80:80 ID/NAME      <- run 1 img in detached & publish ports HOST:CONTAINER





    docker container ls -a              <- list all containers === docker ps -a 

    docker container start ID           <- start one or more stopped containers
    docker container stop ID            <- stop one or more running containers
    docker start/stop ID

    docker container logs ID            <-  muestras los Outputs/Comandos/logs del container
    docker container logs -f ID         <-  se queda escuchando los logs del container   
    docker logs ID                            -f = follow
                         
    docker exec                         <-  ejecuta 1 comando Dentro d 1 container q is running
    docker exec -it ID sh               <-  ingresar al container    |  -i sesion interactive
                                               -t emular 1 terminal  | bin/sh   shell

    docker container prune              <-  remove all stopped containers
    docker rm ID -f                     <-  force container elimination even if it is running





    docker volume ls                    <-  list all volumes
    docker volume create name           <-  crear 1 nuevo volume
    docker volume rm ID/NAME            <-  remove a specific volume




    docker network ls
    docker network create NAME
    docker network rm ID/NAME

    docker network inspect ID/NAME      <-  list all containers in the network

    docker network connect Id/Name_Network ID/NAME_CONTAINER    <- solo 1 a la vez
        docker network connect world-app 46f





    docker compose up
    docker compose down

        sudo chown -R 5050:5050 mypgadmin/postgres
    
    docker compose down --volumes   <--  elimina los containers y los volumes






