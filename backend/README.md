Para poder ejecutar e inicializar la base de datos:

- Descargar Docker/Docker Compose

- Ejecutar en terminal el siguiente comando para iniciar los contenedores con la info del archivo yml
```bash
docker-compose up -d
``` 
- Instalar Node.js para utilizar los comandos npm
```bash
npm install -g npm
npm install sequelize sqlite3
```
Esto último instala un ORM (Object-Relational Mapping) para javascript. Hay muchos tipos, yo he elegido [Sequelize](https://sequelize.org) por recomendacion externa.\
Para ver de forma mas limpia la base de datos uso un programa llamado [MySQL Workbench](https://dev.mysql.com/get/Downloads/MySQLGUITools/mysql-workbench-community-8.0.41-winx64.msi). Dentro del programa se puede consultar la base de datos en la sección Schemas en el apartado inferior izquierdo 

netstat -aon | findstr :3306

sudo taskkill /PID 1234 /F
