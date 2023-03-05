---
title: Get started with Akaunting and Docker with HTTPS
level: Medium
date: 2021-06-03 18:50:19
kwywords: docker, akaunting, finances
description: Get started with akaunting and docker to manage your work and finances.
layout: post.html
image: https://res.cloudinary.com/poorna/image/upload/c_scale,q_auto,w_1300/v1622727459/my-blog/Screenshot_2021-06-03_at_19-05-03_Dashboard_-_Accel_Samurai.png
---
>  [Akaunting](https://akaunting.com/) is an open-source accounting software. They offer self hosted and managed platform to manage all your finances.


Here's a preview of accounting:
![Perview of Akaunting](https://res.cloudinary.com/poorna/image/upload/c_scale,q_auto,w_1300/v1622727459/my-blog/Screenshot_2021-06-03_at_19-05-03_Dashboard_-_Accel_Samurai.png)

### Lets assume you have setup a machine with docker and docker-compose.

Follow through on the commands below and your own self hosted finance at the end of it.
Though Akauntings docker docs are comprehensive, they dont have a documentation on making it secure
```
git clone https://github.com/akaunting/docker
cd docker
cp env/db.env.example env/db.env
cp env/run.env.example env/run.env
```

### Now open the env/run.env file and set the parameters right.
Here's how the file should look:

```env
# You should change this to match your reverse proxy DNS name and protocol
APP_URL=https://<your-domain.com> # No need of a trailing slash
LOCALE=en-US

# Don't change this unless you rename your database container or use rootless podman, in case of using rootless podman you should set it to 127.0.0.1 (NOT localhost)
DB_HOST=akaunting-db

# Change these to match env/db.env
DB_DATABASE=akaunting
DB_USERNAME=admin
DB_PASSWORD=akaunting_password

# You should change this to a random string of three numbers or letters followed by an underscore
DB_PREFIX=asd_

# These define the first company to exist on this instance. They are only used during setup.
COMPANY_NAME=<Your company name>
COMPANY_EMAIL=<Your company email>

# This will be the first administrative user created on setup.
ADMIN_EMAIL=<Admin email>
ADMIN_PASSWORD=<Admin password>
```
Save and close the file.

### Make changes to docker-compose.yml
Edit the existing `docker-compose.yml` to add the caddy service to it.
> [Caddy](https://caddyserver.com/) is a highly performant reverse proxy server written in GoLang. Caddy takes care of reverse proxy and adding a wild card certificate to the domain.
```yaml
version: '3.7'
services:
  akaunting:
    container_name: akaunting
    image: docker.io/akaunting/akaunting:latest
    build:
      context: .
    ports:
      - 8080:80
    volumes:
      - akaunting-data:/var/www/html/storage
      - akaunting-modules:/var/www/html/modules
    restart: unless-stopped
    env_file:
      - env/run.env
    environment:
      - AKAUNTING_SETUP
    depends_on:
      - akaunting-db
    networks:
      - app-network
    

  akaunting-db:
    container_name: akaunting-db
    image: mariadb
    volumes:
      - akaunting-db:/var/lib/mysql
    restart: unless-stopped
    env_file:
      - env/db.env
    networks:
      - app-network

  akaunting-update:
    image: containrrr/watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --cleanup akaunting akaunting-db

  caddy:
    image: caddy:2.3.0-alpine
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
    networks:
      - app-network
    depends_on: 
      - akaunting

volumes:
  akaunting-data:
  akaunting-modules:
  akaunting-db:


networks:
    app-network:
      driver: bridge
```

### Add the Caddyfile in the same location as docker-compose.yml
Create a file called Caddyfile (no file extension name!) and add the following into it.
> Caddyfile is how Caddy takes in configuration akin to the ngnix/sites-enabled files
```caddy
<your-domain.com> {
    encode gzip
    reverse_proxy akaunting:80
}
```
Save and exit the file.

### Start the setup
Now execute the following commands:
```
AKAUNTING_SETUP=true docker-compose up -d
```

In your browser open up <your-domain.com> and finish the Akaunting setup 
> #### Akaunting API key isnt necessary to complete the install, you can skip the step


### Once setup is completed
Start the container again without the env variable that is required for setup.
```bash
docker-compose down -v
docker-compose up -d
```

### Sweet Perk: Auto-updating your Akaunting installation 
Included in the docker-compose.yml file is a container called watchtower which takes care of the auto updating