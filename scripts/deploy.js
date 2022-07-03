const { ethers, run, network } = require("hardhat")

const main = async () => {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )

    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()

    console.log(`deployed to ${simpleStorage.address}`)

    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.favouriteNumber()
    console.log(`currentValue: ${currentValue}`)

    const txResponse = await simpleStorage.store("2")
    await txResponse.wait(1)

    const updatedValue = await simpleStorage.favouriteNumber()
    console.log(`updatedValue: ${updatedValue}`)
}

const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("already verified")
        } else {
            console.log(e)
        }
    }
}

main()
