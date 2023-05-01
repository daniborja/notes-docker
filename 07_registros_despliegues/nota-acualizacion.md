# Nota de actualización
En la próxima clase veremos como subir desde buildx la imagen.

Algunas personas en la siguiente clase les arroja un error de autenticación al registro de DigitalOcean cuando hacen el push directo del build de buildx.



Si ese es el caso, prueben esto:

# Autenticación
 
docker logout registry.digitalocean.com
docker login registry.digitalocean.com
(ingresar token como usuario y password) (esto lo vemos en la próxima clase)


# Borren el builder
 
docker buildx rm mybuilder


# Crearlo de nuevo
 
docker buildx create --name mybuilder --driver docker-container --bootstrap


# Usen el nuevo builder
 
docker buildx use mybuilder


# Build y Push
 
docker buildx build \
--platform linux/amd64,linux/arm64 \
-t registry.digitalocean.com/<Nuestro registro>/teslo-shop:[TAG] --push .
