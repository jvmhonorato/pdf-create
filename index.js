const PdfPrinter = require('pdfmake')
const fs = require('fs')
const express = require('express')
const app = express()

//fonts types
const fonts = {
    Roboto: {
        normal:'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Bold.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-BoldItalic.ttf'
    }
}

//lines
const lines = []
//add tables fields
lines.push([ 
    {
        text:'Nome',
        style: 'header'
    },
     'Email',
     'Status',
     'Telefone'])

//add values
for(let i = 0; i<300; i++){
    let ativo = 'ativo'
    if(i%2===0){
        ativo = {text: 'inativo', style:'inativo'}
    }
    lines.push(['Victor Honorato', 'vituhonorato@gmail.com', ativo, '71 987840407'])
}

//link new pdf with fonts on variable 'printer'
const printer = new PdfPrinter(fonts)


//pdf document models content 
const docDefinition = {
    content:[
        {
            image: 'images/react.png',
            // width: 100,
            // height: 100,
            fit: [80,100]
        },
    {text:  'PDF content'},
    {
        table:{
            //tables colums 
            widths: ['*','*',100,'*'],
            //tables lines
            body: lines
    }
  }
],
styles:{
    header: {
        fontSize: 22,
        bold: true
    },
    inativo:{
        fontSize: 18,
        bold: true
    },
    
 },
 footer: (page, pages) => {
    return {
        columns: [
            'Este documento é modelo de aprendizado de João Victor',
            {
                alignment: 'right',
                text: [
                    {text: page.toString(), italics:true},
                    'de',
                    {text: pages.toString(), italics: true}
                ]
            }
        ],
        margin: [
            40,0
        ]
    }
 }
    
}

//LINK
app.get('/get/:name',(req,res)=>{
    const pdf = printer.createPdfKitDocument({
        content: 'Óla '+req.params.name
    })
    //suggest the name of the file to be saved OBS: usar attachment no lugar de inline pra salvar automaticamente
    res.header('Content-disposition', 'inline; filename=meud-pdf.pdf')
    res.header('Content-type','application/pdf')
    pdf.pipe(res)
    pdf.end()
})

/*
//link pdf content with the creation of a new pdf document
const pdf = printer.createPdfKitDocument(docDefinition)

//receive data from pdf and send to the  new file doc.pdf
pdf.pipe(fs.createWriteStream('doc.pdf'))

//finish procedure
pdf.end()
*/


//Server listen
app.listen(3000, () =>{
    console.log('PDF running...')
})