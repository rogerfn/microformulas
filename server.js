const express = require('express')
const bodyParser = require('body-parser');
const HyperFormula = require('hyperformula');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = 8080

const options = {
    licenseKey: 'gpl-v3'
};

app.get('/', (req, res) => {
  res.send('Please use a POST request to this endpoint.')
})

app.post('/', (req, res) => {
  
  
    const hfInstance = HyperFormula.HyperFormula.buildEmpty(options);
    // get data from req.body
    const data = req.body;

    // loop over each key in data
    for (const key in data) {
        // add sheet to hfInstance
        const sheetName = hfInstance.addSheet(key);
        const sheetId = hfInstance.getSheetId(sheetName);

        
        // add data to hfInstance
        hfInstance.setSheetContent(sheetId, data[key]);
    }

    // get all sheets
    const values = hfInstance.getAllSheetsValues()

    // send response
    res.send(values)
    
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
