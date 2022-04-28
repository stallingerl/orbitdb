const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

async function main() {

  // Create IPFS instance
  const ipfsOptions = { repo: './ipfs', }
  const ipfs = await IPFS.create(ipfsOptions)

  // Create OrbitDB instance
  const orbitdb = await OrbitDB.createInstance(ipfs)

  /* 
  By default and if not specified otherwise, only the creator of the database will be given write-access.
  Access rights are setup by passing an accessController object that specifies 
  the access-controller type and access rights of the database when created. 
  OrbitDB currently supports write-access. 
  The access rights are specified as an array of public keys of the peers who can write to the database. 
  The public keys to which access is given can be retrieved from the identity.publicKey property of each peer.

  // Give write permission to following peers:
  const options = {
    // Give write access to ourselves
    accessController: {
      write: [orbitdb.identity.id]
    }
  }

  // Create a public database that everyone can write to:
  
  write: ['*']
  
  */

// Database Type keyvalue
  const db = await orbitdb.keyvalue('first-database')

  // Address first-database
  console.log("address of my first-database: " + db.address.toString())

  // Who created the db and who signed the enty
  const identity = db.identity
  console.log("Database creator identity _id: " + identity._id)

  // Add an entry
  await db.put('name', 'hello')

  // OrbitDB does not automatically pin content added to IPFS. 
  // This means that if garbage collection is triggered, 
  // any unpinned content will be erased. 
  await db.put('1651133617620-QmPd9GVhyMJQ7iFqzxMgwUV5fwVdWhUNNbmqmhMkv66rF2',
    '1-0:1.8.0*255":"21678.1405 kWh',
    { pin: true })


  await db.put('1651146233320-QmTruqCipSu1fyRTdEjVFqghfr54ZpJz3ZC52gFmudb7Yw',
    '1-0:1.8.0*255":"21678.1405 kWh',
    { pin: true })

  console.log("Put an entry.")

  // get an entry
  const value = db.get('1651133617620-QmPd9GVhyMJQ7iFqzxMgwUV5fwVdWhUNNbmqmhMkv66rF2')
  console.log("read value: ", value)

  db.close()


// Database Type docstore
  const docstore = await orbitdb.docstore('docstoreDB')

  const hash1 = await docstore.put({ _id: 'QmPd9GVhyMJQ7iFqzxMgwUV5fwVdWhUNNbmqmhMkv66rF2', timestamp: 1651133617620, "1-0:1.8.0*255": 21678.1405 })
  const hash2 = await docstore.put({ _id: 'QmTruqCipSu1fyRTdEjVFqghfr54ZpJz3ZC52gFmudb7Yw', timestamp: 1651146233320, "1-0:1.8.0*255": 31678.1405 })

  const kWhGreater30000 = docstore.query((doc) => doc["1-0:1.8.0*255"] >= 30000 )
  console.log("greater kWh than 30000: "+ kWhGreater30000[0]._id) // QmTruqCipSu1fyRTdEjVFqghfr54ZpJz3ZC52gFmudb7Yw

  const timestampGreater = docstore.query((doc) => doc.timestamp > 1651133617620 )
  console.log("timestamp greater than 1651133617620: "+ timestampGreater[0]._id)

  const idsBetweenDates = docstore.query((doc) => doc.timestamp > 1651133617620 && doc.timestamp <= 1651146233320)
  console.log("timestamp between 1651146233320 and 1651133617620: " + idsBetweenDates[0]._id) //QmTruqCipSu1fyRTdEjVFqghfr54ZpJz3ZC52gFmudb7Yw

  // Filter by id and timestamp
  const betweenDatesById = docstore.query((doc) => doc.timestamp > 1651133617620 && doc.timestamp <= 1651146233320 && doc._id == "QmTruqCipSu1fyRTdEjVFqghfr54ZpJz3ZC52gFmudb7Yw")
  console.log("timestamp between 1651146233320 and 1651133617620 and Id == QmTruqCipSu1fyRTdEjVFqghfr54ZpJz3ZC52gFmudb7Yw  " + betweenDatesById[0]._id) //QmTruqCipSu1fyRTdEjVFqghfr54ZpJz3ZC52gFmudb7Yw

  await docstore.close()
}
main()