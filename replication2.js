import { createRequire } from "module";
const require = createRequire(import.meta.url);
import OrbitDB from 'orbit-db';
import createOrReadPeerId from './src/p2p/createOrReadPeerId.js'
const IPFS = require('ipfs')
import bootstrapers from './src/p2p/peerIds/bootstrapers.js'


async function main() {

    // Create the second peer
    var peerIdConf = process.env.PEER;
    var id = await createOrReadPeerId(peerIdConf)

    const ipfs2 =  await IPFS.create({
        repo: './ipfs2',
        peerId: id,
        start: true,
        EXPERIMENTAL: {
          pubsub: true,
        },
        config: {
          Bootstrap: bootstrapers
        }
      })

    const peers = await ipfs2.swarm.peers()
    console.log(`The node now has ${peers.length} peers.`)

    // Open the first database for the second peer,
    // ie. replicate the database
    const orbitdb2 = await OrbitDB.createInstance(ipfs2, { directory: './orbitdb2' })
    const db2 = await orbitdb2.log("/orbitdb/zdpuAkkGGFG4vKRY7tXej3KSvyvzJtW46xaDpWut72UKhhzoM/events")
    console.log("db2 address: ", db2.address.toString())

    console.log('Making db2 check replica')

    // When the second database replicated new heads, query the database
    db2.events.on('replicated', () => {
        const result = db2.iterator({ limit: -1 }).collect().map(e => e.payload.value)
        console.log(result)
    })

}

main()