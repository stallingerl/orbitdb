const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');

async function main()
{

    // Create IPFS instance
    const ipfsOptions = { repo: './ipfs', }
    const ipfs = await IPFS.create(ipfsOptions);

    // Create OrbitDB instance
    const orbitDb = await OrbitDB.createInstance(ipfs);

    // Create docstore DB
    const docstore = await orbitDb.docstore('docstoreDB');

    // Set variables
    const amount = 2000; // Amout of data to put
    const timestamp = new Date().getTime(); // Timestamp (Only set once so we don't affect performance too much)
    const timeStart = performance.now(); // Start time of the data loop

    console.log("Starting to put data into Docstore DB...");

    // Loop for our amount of data to put
    for (let i = 0; i < amount; i++)
    {
        // Pseudo ID from timestamp + index should be enough for testing
        let pseudoId = timestamp + i;

        // Random KWh values between 1.000 and 100.000
        let kwhValue = Math.floor(Math.random() * 100000) + 1000;

        // Put line to DB
        let result = await docstore.put({ _id: pseudoId, timestamp: timestamp, "1-0:1.8.0*255": kwhValue,  pin: true});

        // Log every 100th iteration
        if(i > 1 && i % 100 == 0)
        {
            console.log("Now: " + i + " of " + amount);
        }
    }

    const timeEnd = performance.now(); // End time of data loop
    const timeDiff = (timeEnd - timeStart) / 1000; // Time difference in seconds

    console.log("Finished!");
    console.log(amount + " put into DB in " + timeDiff.toFixed(4) + " seconds.");
    console.log("That's " + (amount / timeDiff).toFixed(4) + " per second.");

    /*
    const kWhGreater30000 = docstore.query((doc) => doc["1-0:1.8.0*255"] >= 30000 )
    console.log("greater kWh than 30000: "+ kWhGreater30000[0]._id) // QmTruqCipSu1fyRTdEjVFqghfr54ZpJz3ZC52gFmudb7Yw

    const timestampGreater = docstore.query((doc) => doc.timestamp > 1651133617620 )
    console.log("timestamp greater than 1651133617620: "+ timestampGreater[0]._id)

    const idsBetweenDates = docstore.query((doc) => doc.timestamp > 1651133617620 && doc.timestamp <= 1651146233320)
    console.log("timestamp between 1651146233320 and 1651133617620: " + idsBetweenDates[0]._id) //QmTruqCipSu1fyRTdEjVFqghfr54ZpJz3ZC52gFmudb7Yw

    // Filter by id and timestamp
    const betweenDatesById = docstore.query((doc) => doc.timestamp > 1651133617620 && doc.timestamp <= 1651146233320 && doc._id == "QmTruqCipSu1fyRTdEjVFqghfr54ZpJz3ZC52gFmudb7Yw")
    console.log("timestamp between 1651146233320 and 1651133617620 and Id == QmTruqCipSu1fyRTdEjVFqghfr54ZpJz3ZC52gFmudb7Yw  " + betweenDatesById[0]._id) //QmTruqCipSu1fyRTdEjVFqghfr54ZpJz3ZC52gFmudb7Yw
    */ 

    await docstore.close();
}

main()