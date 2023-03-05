---
date: 2021-09-06 23:24:42
title: The Ultimate Kibana Docker guide
level: Easy
layout: post.html
description: Kibana is a great platform for all your analytics, its a huuge pain to setup on docker. Here's what I've learnt tinkering with it for 3 months.
keywords: Kiibana, Docker, docker-compose, Dashboard, Elasticsearch
---
> [Kibana](https://www.elastic.co/kibana/) is a free and open user interface that lets you visualize your Elasticsearch data and navigate the Elastic Stack. Do anything from tracking query load to understanding the way requests flow through your apps. 

Though it is a great tool to have in your arsenal, its not easy to set it up with docker.
Here's a ridiculously simple guide to getting kibana on docker

## Docker Compose configuration to enable kibana:
This configuration can be used without a seperate kibana configuration file
`docker-compose.yml`
```yaml
...
  kibana:
    image: docker.elastic.co/kibana/kibana:7.13.0
    container_name: kibana_es
    environment:
      - SERVER_NAME=kibana.yourdomain.com # add a unique name to your kibana deployment
      - ELASTICSEARCH_HOSTS=http://elastisearch:9200 # your elasitcsearch deployment url - Assuming that you do not have elasticsearch authentication setup
    ports:
      - 5601:5601
    depends_on:
      - elastisearch
    networks:
      - app-network
...
```
Now kibana must be accessible at [http://localhost:5601/](http://localhost:5601/)

## Adding `kibana.yml` for advanced configuration

1. Remove environemnt configuration and add kibana.yml volume support in `docker-compose.yml`
```yaml
...
  kibana:
    image: docker.elastic.co/kibana/kibana:7.13.0
    container_name: kibana_es
    ports:
      - 5601:5601
    depends_on:
      - elastisearch
    networks:
      - app-network
    volumes:
      - ./path/to/kibana.yml:/usr/share/kibana/config/kibana.yml
...
```
2. Define `kibana.yml`
```
elasticsearch.username: "elastic" # If you've setup authentication for elasticsearch
elasticsearch.password: "elasticsearchpassword" # Elasticsearch password
elasticsearch.hosts: ["http://elastisearch:9200"] # Your Elasticsearch URL
server.ssl.enabled: false # Disable SSL
server.host: "0.0.0.0" # To allow for connections from outside the docker container
server.name: "My Kibana server" # Name the server
```

Now restart your docker-compose and here's what you should see
![Login for elasticsearch](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1631025164/my-blog/Screenshot_2021-09-07_at_19-59-52_Elastic.png)

Now login using the username and password you used to setup ElasticSearch.

