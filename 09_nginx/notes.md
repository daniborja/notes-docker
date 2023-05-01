# Nginx - Images
  -- Intro
    - Desplegaremos nuestras Apps usando un host especial llamado Nginx
      - Nginx es parecido a Apache si ya conoces a apache
        - Es lo q usaba en mi curso de VPS
    - Vamos a correr una app front en Nginx
      - Configuraremos Nginx para q W con 1 SPA con routing
    - Nginx es muy poderoso para servir contenido estatico

    -- Nginx
      - Es 1 Servidor Web q tb se puede utilizar como proxy inverso, balanceador de carga, proxy de correo y cache HTTP. Lanzado el 2004, Nginx es 1 fostware gratuito y de codigo abierto.
      - Es la Img mas descargada del mundo
        - Existen cursos especificos de Nginx xq es muy poderoso



    -- Nginx Docker Hub
      - Lo queremos usar como 1 Hounting
        - El Front se lo corre en Nginx


  ```bash
    docker run --name some-nginx -d -p 8080:80 nginx:1.23.3
  ```




  -- Construir la Img de nuestra app
    - Debemos decirle a  Nginx  q React y las demas SPA tiene su propio Routing
    - La construimos con su respectiva config



  -- Copiar los recuros estaticos
    - Solo se copia al  path  esperado
      - Al q esta apuntando nuestra App

