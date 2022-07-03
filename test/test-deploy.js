const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
describe("SimpleStorage", () => {
    let simpleStorage, SimpleStorageFactory
    beforeEach(async () => {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with a favourite no of 0", async () => {
        const favouriteNumber = await simpleStorage.favouriteNumber()
        const expectedValue = "0"
        assert.equal(favouriteNumber.toString(), expectedValue)
    })

    it("Should update favourite number", async () => {
        const txResponse = await simpleStorage.store(5)
        await txResponse.wait(1)
        const favouriteNumber = await simpleStorage.favouriteNumber()
        assert.equal(favouriteNumber.toString(), "5")
    })
})
