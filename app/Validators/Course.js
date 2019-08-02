'use strict'

class Course {
  get rules () {
    return {
      id_number : 'required',
      name : 'required',
      image : 'required',
      description : 'required',
      detail : 'required',
      state_id : 'required',
      category_id : 'required',
      price: 'required',
    }
  }
}

module.exports = Course
