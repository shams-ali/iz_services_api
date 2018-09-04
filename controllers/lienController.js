const fs = require("fs");
const pdfFiller = require("pdffiller");
const moment = require("moment")
const { assign } = Object
/**
 * lienController.js
 *
 * @description :: Server-side logic for managing lien forms.
 */

module.exports = {

    /**
     * lienController.list()
     */
    list: function (req, res) {
        console.log('insides list')
        return res.json({});
    },

    /**
     * lienController.show()
     */
    show: function (req, res) {
        console.log('insides show')
        var id = req.params.id;
        return res.json({});
    },

    /**
     * lienController.create()
     */
    create: ({ body }, res) => {
        const sourcePDF = `${__dirname}/LienSaleForm.pdf`;
        const destinationPDF = `${__dirname}/LienSaleForm_Complete.pdf`;
        console.log(body, 'this is body')
        // const nameRegex = null;
        // pdfFiller.generateFDFTemplate(sourcePDF, nameRegex, (err, fdfData) => err ? console.log(err) : console.log(fdfData));
        const storageToDate = moment(body['P1-2-Date owner billed']).diff(moment(body['P1-2-Date Veh into possession']), 'days') * body['PER DAY']; // use dates here
        const pdfData = assign(body,
            {
                "STORAGE TO DATE": storageToDate,
                'P1-6-Parking Violations 4000 or less': storageToDate,
                "P1-6-Total of 2 (A-D) 4000 or less": +body["TOWING"] + +body["REPAIRS"] + +body["COST FOR LIEN SALE"] + storageToDate,
                "P1-7-Area Code": body['tel'].slice(0, 3),
                "P1-7-Telephone No": body['tel'].slice(3),
                "P1-1-Lic Exp Date": moment(body["P1-1-Lic Exp Date"]).format("MM Do YY"),
                "P1-2-Date Veh into possession": moment(body["P1-2-Date Veh into possession"]).format("MM Do YY"),
                "P1-2-Date owner billed": moment(body["P1-2-Date owner billed"]).format("MM Do YY"),
                "P1-2-Date work-serv completed": moment(body["P1-2-Date work-serv completed"]).format("MM Do YY"),
                "DATE NOTICE MAILED": moment(body["DATE NOTICE MAILED"]).format("MM Do YY"),
                "DATE OF SALE": moment(body["DATE OF SALE"]).format("MM Do YY"),
                "REGISTERED OWNER": (body["REGISTERED OWNER"] || []).reduce((sanitize, { name, address, city, state, zip }, index) => 
                    sanitize.concat(`${index + 1}. ${name} ${address} ${city} ${state} ${zip}\n`), ''),
                "LEGAL OWNER": (body["LEGAL OWNER"] || []).reduce((sanitize, { name, address, city, state, zip }, index) => 
                    sanitize.concat(`${index + 1}. ${name} ${address} ${city} ${state} ${zip}\n`), ''),
                "INTERESTED PARTIES": (body["INTERESTED PARTIES"] || []).reduce((sanitize, { name, address, city, state, zip }, index) => 
                    sanitize.concat(`${index + 1}. ${name} ${address} ${city} ${state} ${zip}\n`), ''),
            }
        );
        console.log(pdfData, 'this is pdf data')
        pdfFiller.fillForm(sourcePDF, destinationPDF, pdfData, err => {
            if (err) throw err;
            res.contentType("application/pdf");
            res.send(fs.readFileSync(destinationPDF));
        });

    },

    /**
     * lienController.update()
     */
    update: function (req, res) {
        console.log('insides update')
        var id = req.params.id;
        return res.json({});
    },

    /**
     * lienController.remove()
     */
    remove: function (req, res) {
        console.log('insides remove')
        var id = req.params.id;
        return res.json({});
    }
};
