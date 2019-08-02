'use strict'

const Model = use('Model')

class ResultTest extends Model {
    static get dataSchema () {
        return ['user_id', 'result', 'test_id', 'scores']
    }
}

module.exports = ResultTest
