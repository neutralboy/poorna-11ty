---
title: A real life guide to Hasura migrations with Docker
description: Hasura migrations seem really complicated at first but on second look are quite intuitive and easy to use with Docker
image: https://res.cloudinary.com/poorna/image/upload/c_scale,q_auto,w_400/v1660325973/Dribbble_Shot_HD.png
keywords: Docker, Hasura, SQL, Hasura Migrations, Remote Containers
level: Medium
layout: post.html
date: 2022-07-12 17:53:53
---
> **How do we use Hasura migrations Docker image and setup migrations to be used in production ?**
	This is a question I found asking myself ever so often when using Hasura in my development toolchain.

#### To start off with the positives:
Hasura is a great tool built battle ready, its exceptionally fast, super easy to setup and use. The development experience makes use of a database interface really easy for everyone alike - amateurs to advanced.

#### My issue with Hasura's migrations docs
Hasura all-in-all has great documentation, but their docs on using migrations with Docker is a little lacking.
Docs on Docker migrations are here: https://hasura.io/docs/latest/migrations-metadata-seeds/auto-apply-migrations/

So here I manage to outline the whole process in one single flow:

### Setup a project with Hasura in it
#### Get started on the database
Lets configure a development environment to use Hasura
`development.yml`
```yaml
version: '3'
	services:
		db:
			image: postgres:14-alpine
			ports:
			  - 5433:5432
			volumes:
			  - ./pgdata:/var/lib/postgresql/data
			environment:
			  POSTGRES_USERNAME: abcd
			  POSTGRES_PASSWORD: abcd
```
Lets just setup a basic database using  `postgres-alpine`  for our development

#### Adding Hasura to the mix
Hasura in development need not be added using Docker. Although the Docker image works the same way as the CLI console does but it **cannot** track database changes and create migration files.
Install the Hasura CLI: https://hasura.io/docs/latest/hasura-cli/install-hasura-cli/

Easiest way to do it is 
```bash
npm install --global hasura-cli@2.8.0
```

#### Start the Hasura Console
Create a new folder for Hasura config and migrations
```bash
mkdir hasura
cd hasura
```
Now start Hasura console
```bash
hasura console
```

### Now edit the database
Now use the Hasura console started at  `http://localhost:8080`  to make edits to the database. 
```sh
# Your expected Postgres URL will be
POSTGRES_URL: postgres//abcd:abcd@localhost:5432/test
```
Add a few tables and create indexes
You should see the migrations files with inside
`hasura/migrations/163677`  there are two distinct files that are created. 
`up.sql`  and `down.sql` these files are to apply and remove the migration.


### Now lets deploy this to production using Docker
Hasura provides us with a special image that auto applies migrations.
Here's the `production.yml`
```yml
version: '3'
services:
  db:
    image: postgres:14-alpine
    ports:
      - 5433:5432
    environment:
      POSTGRES_PASSWORD: ndhm

  hasura:
  # Note the special image witht he cli-migrations tag
    image: hasura/graphql-engine:v2.8.0.cli-migrations-v3
    ports:
      - 8080:8080
    depends_on:
      - db
    environment:
      HASURA_GRAPHQL_METADATA_DATABASE_URL: postgres://abcd:abcd@db:5432/postgres
      HASURA_GRAPHQL_DATABASE_URL: postgres://abcd:abcd@db:5432/test
      HASURA_GRAPHQL_DEV_MODE: 'true'
      HASURA_GRAPHQL_MIGRATIONS_DIR: /hasura-migrations
      HASURA_GRAPHQL_METADATA_DIR: /hasura-metadata
    restart: on-failure
    volumes:
      - ./hasura/migrations:/hasura-migrations
      - ./hasura/metadata:/hasura-metadata
```
We specify the location of migration files as an  `env` variable. This will auto apply the migrations to the server and the linked database.

### Thats it
And thats the simplest way to setup Hasura migrations from development to production

