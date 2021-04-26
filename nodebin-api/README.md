Nodebin API
===

![install](https://img.shields.io/badge/NPM-npm%20i%20nodebin--api-success?style=for-the-badge&logo=npm)
![install](https://img.shields.io/badge/Yarn-yarn%20add%20nodebin--api-success?style=for-the-badge&logo=yarn)

![Travis (.com)](https://img.shields.io/travis/com/lorenzo0111/nodebin?style=for-the-badge&logo=travis)
![npm](https://img.shields.io/npm/v/nodebin-api?logo=npm&style=for-the-badge)

A library to interface with a nodebin server.

---

### Requirements

You need an updated version 

### Usage

[Click here for the full example](https://github.com/Lorenzo0111/NodeBin/raw/master/nodebin-api/examples/index.js)

```JS
const Nodeserver = require('nodebin-api');

const server = new Nodeserver("http://localhost:3030")
server.add("Hello world").then(item => console.log(item.id))
```