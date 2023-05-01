# Docker Compose
  -- Nos permite automatizar la creacion de un set de contenedores a traves de 1 
      docker-compose.yml



  -- Docker compose
    - Es 1 herramienta q se desarrollo para ayudar a definir y compartir aplicaciones de varios contenedores.


    -- Usamos volumes Externos, es decir q ya existen en el HOST y nos conectacmos a ellos: (external: true)

    --Usamos Binding Volumes, volumes el el filesystem de nuestro proyecto
      - Lo malo, q en linux todo se genera con roles de ROOT, para cambiar eso:

                `sudo chown -R 5050:5050 mypgadmin/`
      
      - Tb se genera 1 nuevo volume c/levanta el docker compose.
        - Limpiar:   docker volume prune
          - Pero esto no me funciona
            - Esto si:     `docker volume rm $(docker volume ls -q)`
              - Esto elimina todos los volumes
                - Hacerlo corriendo los container q usan volumens q no queremos eliminar




    -- MongoDB & MongoExpress
      - Si solo las va a utilizar servicios de mi compose, para q exponer puertos?
      - Mientras + aislado mejor
      - Aqui solo lo usara el mongo_express, x eso no expongo puertos, Pero, si lo quisiera usar con MongoCompas, pues si debo exponer puertos para conectarme desde el Compas q esta en el HOST





