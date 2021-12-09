`docker run --name redis-server -p 6379:6379 -d redis`

`docker run -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin --name keycloak-sp -p 8080:8080 jboss/keycloak`
`docker run -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin --name keycloak-idp -p 9090:8080 jboss/keycloak`

