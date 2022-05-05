# BlockPro mit Orbit-DB Studie

# Get Started
[![npm version](https://badge.fury.io/js/orbit-db.svg)](https://www.npmjs.com/package/orbit-db) [![node](https://img.shields.io/node/v/orbit-db.svg)](https://www.npmjs.com/package/orbit-db)

1. git clone this repo 
2. run ```npm i``` in root directory
3. run ```npm start``` 
4. To run two docker containers with individual orbit and ipfs nodes run: 
    ```docker-compose up``` and to execute ```docker exec -it orbit1 bash``` and in second terminal: ```docker exec -it orbit1 bash```
5. To try replication example in container orbit 1 run: ```npm run orbit1``` and orbit2 with: ```npm run orbit2``` in container orbit2

# Zu klärende Fragen:

1. Ist es möglich die Indizierung der Einträge mit einer Docstore-DB auf die Bedürfnisse von BlockPro anzupassen? 

2. Welche Such- und Filtermöglichkeiten gibt es?

3. Wie ist die Performance der Orbit-DB?

4. Welche Verarbeitung und Vorbereitung ist durch den Second-Layer Node nötig, um die Reportingbedürfnisse zu erfüllen?

5. Haben andere Peers Read-Rechte auf meine lokale DB? Und wie wird sie gefunden? 

6. Wie persiste ich die OrbitDB?
peers müssen über ipfs verbunden sein und den OrbitDB Pfad der Datenbank kennen. z.B.: /orbitdb/zdpuAyfPbM5Tm7bDjsBjWYAg97xyw5vppN7CnazMq38SQSV13/

7. Use OrbitDB as an API

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[MIT © 2021 Webanizer AG.](./LICENSE.txt)


## Contributing

<a href="https://github.com/stallingerl/orbitdb/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=stallingerl/orbitdb" />
</a>