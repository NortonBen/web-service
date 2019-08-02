'use strict'

const Model = use('Model')

class Setting extends Model {
    static get dataSchema () {
        return ['name','option']
    }
}

module.exports = Setting
