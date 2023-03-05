---
title: Right way to use GraphQL Client in NodeJS + Typescript
date: 2022-03-14 22:22:38
keywords: Typescript, GraphQL, NodeJs, Prisma Labs, yarn
level: Easy
layout: post.html
description: Using GraphQL Clients is particularly hard with NodeJS because of lack of window.fetch, but here's a simple fix to that
image: https://res.cloudinary.com/poorna/image/upload/v1647273959/my-blog/graphql%3Dnodejs.png
---

GraphQL has been a revolutionary piece of technology that enables all kinds of developers increase speed of iteration and takes out the guessing game that we were used to querying REST APIs.

Querying GraphQL layer inside NodeJS is a no brainer. Current technologies like Graphile, Hasura and Supabase enable us to use GraphQL as a standardized layer between our database and our app.

## First Option: `graphql-request`

`graphql-request` is a library by Prisma Labs, completely open source and has around 4.4 thousand stars. Find it [here](https://github.com/prisma-labs/graphql-request)


Here's how to use it in typescript.
Install the library

```bash
npm install graphql-request
# OR
yarn add graphql-request
```

Lets make a client we can use everywhere
```ts
import {GraphQLClient} from "graphql-request";

const hasuraUrl = "http://localhost:8000"
const client = new GraphQLClient(hasuraUrl, {
	headers: {
		authorization: "Bearer YOUR_HASURA_AUTH_TOKEN"
	}
});
```
Making requests using the client
```ts
const getUserbyId = gql`
{
	GetUserByID(id: $Int!){
		user(where: {
			_id: { _eq: $id }
		}){
			id
			fullName
			email
		}
	}
}
`;

const req = await client.request(getUserbyId, { id: 3 });
console.log(req);
// { user: { id: 3, fullName: "John Doe", email: "hello@example.dev" } } 
 
```
And that's it, its super simple and super straight forward, nothing complex to configure

## Second option: Make your own fetch based GraphQL client
NodeJS does not natively have fetch unlike the browsers which means that we need to use a secondary client to achieve the same functionality.

First, lets install `cross-fetch`, its a library that provides the same features to NodeJS
```sh
npm install cross-fetch
#OR
yarn add cross-fetch
```
Now lets create our custom client function
```ts
import fetch from "cross-fetch";

interface IGC{
	[key: string]: any
};
const graphqlClient = async (gqlDocument: string, vars: IGC) => {
	const res = await fetch("HASURA_URL", {
		method: "POST",
		headers: {
			"content-type": "application/json"
		},
		body: JSON.stringify({
			query: gqlDocument,
			variables: vars
		})
	});
	const jsonRes = await res.json();
	return jsonRes.data;
};
```
Lets use that function to query the endpoint
```ts
const getUserbyId = gql`
{
	GetUserByID(id: $Int!){
		user(where: {
			_id: { _eq: $id }
		}){
			id
			fullName
			email
		}
	}
}
`;
const userById = await graphqlClient(getUserbyId, { id: 3 });
console.log(userById);
// { user: { id: 3, fullName: "John Doe", email: "hello@example.dev" } } 
```
Its a little more complex than using a built in module but that also means that you get granular control over the error handling the requests you make with `fetch`.

