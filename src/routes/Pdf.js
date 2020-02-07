const Controller = require('../controllers/PdfController')

module.exports = app => {
    app.route('/generate-pdf').get(Controller.generate)
}
