require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()
require('hardhat-deploy')
require('hardhat-deploy-ethers')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.24',
    namedAccounts: {
        deployer: {
            default: 0,
        },
        arbiter: {
            default: 1,
        },
        beneficiary: {
            default: 2,
        },
    },
}
