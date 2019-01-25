
// Include the cluster module
const cluster = require('cluster');
const server = require('./server');

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    const cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
// Code to run if we're in a worker process
} else {
    console.log(cluster.worker.id)
    server.init(cluster.worker.id);
}