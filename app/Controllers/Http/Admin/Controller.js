
class Controller {
    async findOrExits(model, { id }) {
        return await model.findOrFail(id)
    }


}

module.exports = Controller