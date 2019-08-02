'use strict'

const Course = use("App/Models/Post")

class CourseController {

    async index({ request, }) {

    }

    async detail({ request, params }) {
        const { id }  = params;

    }
}

module.exports = CourseController
