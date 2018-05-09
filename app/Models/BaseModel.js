'use strict'

const Model = use('Model')
const ValidateException = use('ValidateException')
const ValidateException = use('ValidateException')

class BaseModel extends Model {

    rules = {

    }

    getSchema() {
        return {
           
        }
    }
    
    getFields(){
        return Object.getOwnPropertyNames(this.getSchema());
    }

    setRequest({ request }) {
        $data = request.only()
    }

}

module.exports = BaseModel
