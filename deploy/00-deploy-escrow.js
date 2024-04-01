module.exports = async ({ getNamedAccounts, deployments, getChainId, ethers }) => {
    const { deploy, log } = deployments
    const { deployer, arbiter, beneficiary } = await getNamedAccounts()

    const args = [arbiter, beneficiary]
    await deploy('Escrow', {
        from: deployer,
        args,
        log: true,
        value:ethers.parseEther('1')
    })
}

module.exports.tags = ['all', 'escrow']
