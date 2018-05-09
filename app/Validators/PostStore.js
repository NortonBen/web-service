'use strict'

class PostStore {
  get rules () {
    return {
      name: 'required',
      images: 'required',
      description: 'required',
      detail: 'required',
    }
  }
}

module.exports = PostStore
