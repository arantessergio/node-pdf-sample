const pdf = require('pdf-creator-node')
const fs = require('fs')
const uuid = require('uuid')

const html = fs.readFileSync('./template.html', 'utf-8')

var options = {
    format: 'A4',
    orientation: 'portrait',
    border: '10mm',
    header: {
        height: '45mm',
        contents: '<div style="text-align: center;">Author: John Doe</div>'
    },
    footer: {
        height: '28mm',
        contents: {
            first: 'Cover page',
            2: 'Second page',
            default:
                '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
            last: 'Last Page'
        }
    }
}

var users = [
    {
        name: 'John',
        age: '26'
    },
    {
        name: 'Joseph',
        age: '27'
    },
    {
        name: 'Vadin',
        age: '28'
    }
]
var document = fileName => {
    return {
        html: html,
        data: {
            users: users
        },
        path: `./${fileName}.pdf`
    }
}

exports.generate = async (req, res) => {
    const fileName = uuid.v4()

    await pdf.create(document(fileName), options)

    const file = fs.createReadStream(`./${fileName}.pdf`)
    const stat = fs.statSync(`./${fileName}.pdf`)
    res.setHeader('Content-Length', stat.size)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}.pdf`)
    file.pipe(res)
}
