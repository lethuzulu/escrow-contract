const { deployments, getNamedAccounts, ethers } = require('hardhat')
const { expect, assert } = require('chai')

describe('Escrow', () => {
    let escrowContract, escrowAddress

    let deployer, arbiter, beneficiary

    beforeEach(async () => {
        await deployments.fixture(['all'])
        escrowContract = await ethers.getContract('Escrow')
        escrowAddress = await escrowContract.getAddress()

        deployer = (await getNamedAccounts()).deployer
        arbiter = (await getNamedAccounts()).arbiter
        beneficiary = (await getNamedAccounts()).beneficiary
    })

    describe('constructor', () => {
        it('should test if the arbiter, beneficiary and depositor address have been set correctly and if the contract has been funded', async () => {
            const overrides = { value: ethers.parseEther('1') }
            //depositor address
            assert.equal(deployer, await escrowContract.depositor())

            //beneficiary address
            assert.equal(beneficiary, await escrowContract.beneficiary())

            //arbiter address
            assert.equal(arbiter, await escrowContract.arbiter())

            //contract balance
            assert.equal(
                overrides.value,
                await ethers.provider.getBalance(escrowAddress)
            )
        })
    })

    describe('approve', () => {
        it('should revert if the caller is not the arbiter', async () => {
            //await expect(contract.call()).to.be.revertedWith("Some revert message");

            await expect(
                escrowContract
                    .connect(await ethers.getSigner(deployer))
                    .approve()
            ).to.be.revertedWith('Caller Not Arbiter')
        })

        it('should transfer all the ether to the beneficiary and set isApproved to true', async () => {
            await escrowContract
                .connect(await ethers.getSigner(arbiter))
                .approve()

            await expect(
                escrowContract
                    .connect(await ethers.getSigner(arbiter))
                    .approve()
            ).to.emit(escrowContract, 'Approved')

            assert.equal(0, await ethers.provider.getBalance(escrowAddress))
            assert.isTrue(await escrowContract.isApproved())
        })
    })
})
