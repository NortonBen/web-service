const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)

class FileHeper {
    async getBinarytoFile(path) {
        return await readFile(path)
    }
}

module.exports = FileHeper