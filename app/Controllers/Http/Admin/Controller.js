
class Controller {
    async findOrExits(model, { id }) {
        return await model.findOrFail(id)
    }

    notification(session, message) {
        
    }
}

module.exports = Controller