# BalanceTonMichel 

It's a NodeJS API project written in TypeScript.

## Installing / Getting started

You will need some tools in order to get it :

- NodeJS


```shell
git clone https://github.com/bcatouillard/BalanceTonMichel-API
npm i
```

When it's running you can access endpoints :

- /violences/get
- /violences/getBy

### Initial Configuration

Before running it you have to get a .env file which will contain :

```text
PORT
MONGODB_URI
NODE_ENV
```

Port is the listening port for Express.

MONGODB_URI is the URI of your MongoDB. 

NODE_ENV is dev or prod.

## Developing

In order to run the project, you can use

```shell
npm start
```

It will convert TS code into JS code.

## Features

What's all the bells and whistles this project can perform?
* Fetch data from Database
* Return data on endpoint

## Licensing

The code in this project is licensed under ISC license.