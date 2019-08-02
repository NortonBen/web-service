'use strict'

const Model = use('Model')

class Question extends Model {
    static get dataSchema () {
        return ['name','question', 'answer']
    }
}

module.exports = Question
