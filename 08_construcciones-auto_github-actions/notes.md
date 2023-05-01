# Construcciones automáticas - Github Actions
  -- Intro
    - Automatizar los despliegues
      - Con Github Actions  -   Esto tb se puede hacer con  Jenkins

    - Lo q queremos es q, mediante 1 simple Comando de Git disparar el Proceso de Construccion de la Img y publicarla en Docker Hub
      - Q tb maneje el Versionamiento Semantico x mi
    


  -- Inicio
    - Creamos el Repositorio en GitHub
      - Subimos el proyecto

    -- Configurar Credenciales     <-     Github Secrets
      - Los repositorios, pese a ser privados son visibles para los miembros del equipo 
        - No queremos q vean el token de prod para el deployment
          - En el repo del proyecto nos camos a      Settings > Secrets and variables
            - Podemos crear para Actions
              - Las creamos y las debemos guardar xq una vez las veamos y ya dejemos de verlas, no podremos saver como son
              - > New repository secret  <- para connection with Dockerhub
                - Damos title y cuerpo (username)
                  - Add Secret
                - Otro para el pass del dockerhub
                  - Q en realidad es 1 TOKEN de acceso
                    - En Docker Hub:
                      - Account Settings
                        - Security > New Access Token
                          - Dar nombre
                          - Seleccionar permisos: Read & Write
                          - Generate
                          - Copiamos y pegamos en Actions
                    - Ese token lo pegamos en el Secret de Github Actions

          - Estos serian los secrets para mi Github Actions
            - Esto ya no los puede ver nadie


      -- Todo comienza con la Creacion Manual del Repositorio en Docker Hub
        - Podemos crearlo privado
          - En el tip gratuito solo me da 1 repo privado




  -- GitHub Actions
    - Nos vamos a     `Actions`    en el repo de interes
      - Buscamos     'Docker images'
        - Configure     <--   esto creara 1 yml
          - Lo publicamos y cancelamos el Actions xq aun faltan cosas


    -- Github Actions - Steps
      - Cualquier modificacion al   /workflow/docker-image.yml   disparara el Action
        - Cada guion (-) del yml es 1 Step
          - Configurar
        - Create Commit
          - Dar title y Commit Changes
        - Nos vamso a Actions y vemos si salio bien
      
      - Esto nos auth en Docker Hub desde nuestro Action
      


      -- Step - Construir Imagen
        - Creamos los Steps para el Build y Push de la Img
          - Start commit > Damos el Name > Commit changes
        - Pull de la Img q se creo automatizadamente x el Github Actions
          - Wow, hizo todo, la creo, la subio.
          - Yo simplemente la descargo de Docker Hub y puedo correrla
        


    -- Renombrar Latest:
      - Solo duplico las lineas del Build y Push para tener al final la del latest, como hacerlo manual.


    -- Versionamiento semantio automatico
      - Usamo el  Feature Action de ese man :v
        - Establecemos las config
          - si el commit tiene     'major:'   pues hace un versionamiento semantico major 
          - si es   'feat:'     solo el de feature o menor
          - si no tiene ninguno de esos, cambia el   prerelease9

    https://github.com/marketplace/actions/git-semantic-version?version=v4.0.3





    -- Tag automatico
      - Solo uso el   Output   del Feature Actions de ese man como EnvV en el   docker-image.yml
        - En los Spets de   Build y Pushs

      - Tal como esta configurado el Action, con cada Commit al Main se va a disparar este Action
        - Asi q, x c/d commit tendriamos 1 nuevo TAG en Docker Hub

        https://github.com/AlexMartin998/basic-docker-graphql/blob/main/.github/workflows/docker-image.yml

