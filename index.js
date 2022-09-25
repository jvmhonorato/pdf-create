const PdfPrinter = require('pdfmake')
const fs = require('fs')


//fonts types
const fonts = {
    Roboto: {
        normal:'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Bold.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-BoldItalic.ttf'
    }
}

//link new pdf with fonts on variable 'printer'
const printer = new PdfPrinter(fonts)

//pdf document content
const docDefinition = {
    content: 'PDF content'
}


//link pdf content with the creation of a new pdf document
const pdf = printer.createPdfKitDocument(docDefinition)

//receive data from pdf and send to the  new file doc.pdf
pdf.pipe(fs.createWriteStream('doc.pdf'))

//finish procedure
pdf.end()