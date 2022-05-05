import { createRequire } from "module";
const require = createRequire(import.meta.url);
import OrbitDB from 'orbit-db';
import createOrReadPeerId from './src/p2p/createOrReadPeerId.js'
const IPFS = require('ipfs')
import bootstrapers from './src/p2p/peerIds/bootstrapers.js'

async function main() {
    // Create the first peer
    // const ipfs1_config = { repo: './ipfs1', }
    // const ipfs1 = await IPFS.create(ipfs1_config)

    var peerIdConf = process.env.PEER;
    var id = await createOrReadPeerId(peerIdConf)
    const ipfs1 =  await IPFS.create({
        repo: './ipfs1',
        peerId: id,
        start: true,
        EXPERIMENTAL: {
          pubsub: true,
        },
        config: {
          Bootstrap: bootstrapers
        }
      })

    const peers = await ipfs1.swarm.peers()
    console.log(`The node now has ${peers.length} peers.`)

    // Create the database
    const orbitdb1 = await OrbitDB.createInstance(ipfs1, { directory: './orbitdb1' })
    const db1 = await orbitdb1.log('events')
    console.log("db1 address: ", db1.address.toString())

    // Start adding entries to the first database
    setInterval(async () => {
        await db1.add({ time: new Date().getTime() })
    }, 1000)

}

main()