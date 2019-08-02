'use strict'

class Post {
  get rules () {
    return {
      name : 'required',
      image : 'required',
      description : 'required',
      detail : 'required',
      state_id : 'required',
      category_id : 'required',
      push: 'required',
    }
  }
}

module.exports = Post
