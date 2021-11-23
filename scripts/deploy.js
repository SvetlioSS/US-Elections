const hre = require('hardhat')
const ethers = hre.ethers;

async function deployElectionContract() {
    await hre.run('compile'); // We are compiling the contracts using subtask
    const [deployer] = await ethers.getSigners(); // We are getting the deployer
  
    await hre.run('print', { message: 'Deploying contracts with the account: ' + deployer.address });
    await hre.run('print', { message: 'Account balance: ' + (await deployer.getBalance()).toString() });

    const USElection = await ethers.getContractFactory("USElection");
    const usElectionContract = await USElection.deploy();
    await hre.run('print', { message: 'Waiting for USElection deployment...' });
    await usElectionContract.deployed();

    await hre.run('print', { message: 'USElection Contract address: ' + usElectionContract.address });
    await hre.run('print', { message: 'Done!' });

    await hre.run("verify:verify", {
      address: usElectionContract.address,
      constructorArguments: [
       // if any
      ],
    });
}
  
module.exports = deployElectionContract;