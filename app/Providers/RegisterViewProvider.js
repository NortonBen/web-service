
const Fold = require('@adonisjs/fold')
const _ = require('lodash')

class RegisterViewProvider extends Fold.ServiceProvider {

    register () {

    }

    boot () {
      
        const View = this.app.use('View')

        View.global('errorFor', function (key) {
            const errors = this.resolve('errors')()

            if (_.isPlainObject(errors)) {
              return _.get(errors, key)
            }

            const errorMessage = _.find(errors, (error) => error.field === key || error.fieldName === key)
            return errorMessage ? errorMessage.message : ""
          })

        View.global('formText', function (name, label, _value = "", ext = "") {
            const value = this.resolve('old')(name, _value)
            const errorFor = this.resolve('errorFor')
            return View.render('components.form.text', { name, label, value, errorFor, ext })
        })

        View.global('formFile', function (name, label, _value = "", ext = "") {
            const value = this.resolve('old')(name, _value)
            const errorFor = this.resolve('errorFor')
            return View.render('components.form.file', { name, label, value, errorFor, ext })
        })

        
        View.global('formDate', function (name, label, _value = "", ext = "") {
            const date = new Date(_value);
            let dd = date.getDate();
            let mm = date.getMonth()+1; //January is 0!
            const yyyy = date.getFullYear();
            if(dd < 10){
                dd ='0'+dd;
            } 
            if(mm < 10){
                mm ='0'+mm;
            } 
            const val = yyyy +'-'+mm+'-'+dd;
            let value = this.resolve('old')(name, val)
            const errorFor = this.resolve('errorFor')
            return View.render('components.form.date', { name, label, value, errorFor, ext })
        })

        View.global('formNumber', function (name, label, _value = 0, ext = "") {
            const value = this.resolve('old')(name, _value)
            const errorFor = this.resolve('errorFor')
            return View.render('components.form.number', { name, label, value, errorFor, ext })
        })

        View.global('formTextarea', function (name, label, _value = "", ext = "") {
            const value = this.resolve('old')(name, _value)
            const errorFor = this.resolve('errorFor')
            return View.render('components.form.textarea', { name, label, value, errorFor, ext })
        })

        View.global('formHtml', function (name, label, _value = "", ext = "") {
            const value = this.resolve('old')(name, _value)
            const errorFor = this.resolve('errorFor')
            return View.render('components.form.html', { name, label, value, errorFor, ext })
        })

        View.global('formImage', function (name, label, _value = "", ext = "") {
            const value = this.resolve('old')(name, _value)
            const errorFor = this.resolve('errorFor')
            return View.render('components.form.image', { name, label, value, errorFor, ext })
        })

        View.global('formImages', function (name, label = "",  _value = "", ext = "") {
            const value = this.resolve('old')(name, _value)
            const errorFor = this.resolve('errorFor')
            return View.render('components.form.images', { name, label, value, errorFor, ext })
        })

        View.global('formSelect', function (name, label, data = [],  _value = "", cfg = ['id', 'name'], ext = "") {
            const value = this.resolve('old')(name, _value)
            const errorFor = this.resolve('errorFor')
            return View.render('components.form.select', { name, label, value, list: data, cfg, errorFor })
        })

        View.global('formSelects', function (name, label, list, _value = [], cfg = ['id', 'name'], ext = "") {
            const value = this.resolve('old')(name, _value)
            const errorFor = this.resolve('errorFor')
            return View.render('components.form.selects', { name, label, value, list, cfg, errorFor, ext })
        })
    }
}

module.exports = RegisterViewProvider