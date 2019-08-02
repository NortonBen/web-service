'use strict'

class PostCommentController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = PostCommentController
