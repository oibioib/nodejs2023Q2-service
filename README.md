# Node.js Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/get-started/)

## To run the app, please run the following:

```
git clone git@github.com:oibioib/nodejs2023Q2-service.git
```

```
cd nodejs2023Q2-service
```

```
npm install
```

```
Create .env file (based on .env.example): ./.env
```

## Running application

```
npm run docker:compose
```

## Testing

Run tests after complete command `npm run docker:compose`

```
npm run test:auth
```

## Scan for vulnerabilities

Since docker scan is deprecated, docker scout is used for vulnerabilities scanning.

Run scan after complete command `npm run docker:compose`

```
npm run scan:app
```

```
npm run scan:postgres
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## OpenAPI documentation

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc .

Documentation also available in `yaml` http://localhost:4000/doc-yaml and `json` http://localhost:4000/doc-json .
