# Starwars API

## Installation
Use the package manager [npm] (https://www.npmjs.com/) to install anything.

```bash
npm install
```

Configure your .env file inside '/env/.env'.
You can use .env.test as a sample

## Usage
```bash
npm start
```

## Test
```bash
npm test
```

# End Points

## Create planet
### (POST) localhost:8001/planets

body
```json
{
    "*name": "<String> [Represent the planet's name]",
    "*climate": "<String> [Represent the planet's climate]",
    "*ground": "<String> [Represent the planet's ground']"
}
```
\* = required fields

## Get planet

### All Planets - (GET) localhost:8001/planets

### By ID - (GET) localhost:8001/planets?id=5ffc7dbb07aaf877009c98da

queryParams
```json
{
    "id": "<String> [Represent the planet's _id (ObjectID) code]",
}
```

### By NAME - (GET) localhost:8001/planets?name=Kashyyyk

queryParams
```json
{
    "name": "<String> [Represent the planet's name]",
}
```