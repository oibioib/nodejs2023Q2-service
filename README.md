# Node.js Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## To run the app, please run the following:

```
git clone git@github.com:oibioib/nodejs2023Q2-service.git
```

```
cd nodejs2023Q2-service
```

```
git checkout develop
```

```
npm install
```

```
Create .env file (based on .env.example): ./.env
```

## Running application

```
npm start
```

## OpenAPI documentation

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc .

Documentation also available in `yaml` http://localhost:4000/doc-yaml and `json` http://localhost:4000/doc-json .

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
