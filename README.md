# NANH
Discord.js client for No API, No Hacking policy!

## Installation
```bash
npm i nanh
```
```js
cosnt NANH = require("nanh");
```

## Usage
```js
NANH(client, [except], [callback])
```
- client: Djs client
- except: Array of except bot IDs 
- callback: Function with array of guilds that violating policy (Default: Send error message to them and leave with invite)
