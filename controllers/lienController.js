const fs = require("fs");
const pdfFiller = require("pdffiller");
const moment = require("moment")

const { assign } = Object
const { isArray } = Array
/**
 * lienController.js
 *
 * @description :: Server-side logic for managing lien forms.
 */

module.exports = {

    /**
     * lienController.list()
     */
    list (req, res) {
        console.log('insides list')
        return res.json({});
    },

    /**
     * lienController.show()
     */
    show (req, res) {
        console.log('insides show')
        const id = req.params.id;
        return res.json({});
    },

    /**
     * lienController.create()
     */
    create: ({ body = {} }, res) => {
        const sourcePDF = `${__dirname}/LienSaleForm.pdf`;
        const destinationPDF = `${__dirname}/LienSaleForm_Complete.pdf`;
        // console.log(body, 'this is body')
        // const nameRegex = null;
        // pdfFiller.generateFDFTemplate(sourcePDF, nameRegex, (err, fdfData) => err ? console.log(err) : console.log(fdfData, 'this is fdf data'));
        try {
            const storageToDate = moment(body['P1-2-Date owner billed']).diff(moment(body['P1-2-Date Veh into possession']), 'days') * body['PER DAY']; // use dates here
            const pdfData = assign(body,
                {
                    "STORAGE TO DATE": storageToDate,
                    "P1-6-Storage 4000 or less": storageToDate,
                    "P1-6-Towing 4000 or less": body.TOWING,
                    'P1-6-Repairs 4000 or less': body.REPAIRS,
                    'P1-6-Parking Violations 4000 or less': body["PARKING VIOLATIONS"],
                    "P1-6-Cost of Selling 4000 or less": body["COST FOR LIEN SALE"],
                    "P1-6-Total of 2 (A-D) 4000 or less": +body.TOWING + +body.REPAIRS + +body["COST FOR LIEN SALE"] + storageToDate,
                    "P1-7-Area Code": body.tel.slice(0, 3),
                    "P1-7-Telephone No": body.tel.slice(3).split('-').join(''),
                    "P1-1-Year": body.year,
                    "P1-1-Lic Exp Date": moment(body["P1-1-Lic Exp Date"]).format("MM DD YY"), // not required leave empty
                    "P1-2-Date Veh into possession": moment(body["P1-2-Date Veh into possession"]).format("MM DD YY"),
                    "P1-2-Date owner billed": moment(body["P1-2-Date owner billed"]).format("MM DD YY"),
                    "P1-2-Date work-serv completed": body["P1-2-Date work-serv completed"] ? moment(body["P1-2-Date work-serv completed"]).format("MM DD YY") : '',
                    "DATE NOTICE MAILED": moment(body["DATE NOTICE MAILED"]).format("MM DD YY"),
                    "DATE OF SALE": moment(body["DATE OF SALE"]).format("MM DD YY"),
                    "REGISTERED OWNER": (body["REGISTERED OWNER"] ? body["REGISTERED OWNER"] : []).reduce((sanitize, { name, address, city, state, zip }, index) => 
                        sanitize.concat(`${index + 1}. ${name}\n ${address}\n ${city}, ${state} ${zip}\n`), ''),
                    "LEGAL OWNER": (body["LEGAL OWNER"] ? body["LEGAL OWNER"] : []).reduce((sanitize, { name, address, city, state, zip }, index) => 
                        sanitize.concat(`${index + 1}. ${name}\n ${address}\n ${city}, ${state} ${zip}\n`), ''),
                    "INTERESTED PARTIES": (body["INTERESTED PARTIES"] ? body["INTERESTED PARTIES"] : []).reduce((sanitize, { name, address, city, state, zip }, index) => 
                        sanitize.concat(`${index + 1}. ${name}\n ${address}\n ${city}, ${state} ${zip}\n`), ''),
                },
                [].concat(
                    isArray(body["REGISTERED OWNER"]) ? body["REGISTERED OWNER"] : [], 
                    isArray(body["LEGAL OWNER"]) ? body["LEGAL OWNER"] : [],
                    isArray(body["INTERESTED PARTIES"]) ? body["INTERESTED PARTIES"] : [],
                ).reduce((sanitize, { name, address, city, state, zip }, index) => (assign(sanitize, {
                    [`Name_${index + 1}`]: name,
                    [`Street_${ index + 1 }`]: address,
                    [`CityStateZipCountry_${ index + 1}`]: `${city} ${state} ${zip}`,
                })), {})
            );
            pdfFiller.fillForm(sourcePDF, destinationPDF, pdfData, err => {
                if (err) {
                    console.error(err, 'this is error in pdfiller')
                    throw err
                };
                res.contentType("application/pdf");
                res.send(fs.readFileSync(destinationPDF));
            });
        }
        catch(err){
            console.error(err, 'this is error');
            res.send(err)
        }
        
        


    },

    /**
     * lienController.update()
     */
    update (req, res) {
        console.log('insides update')
        const id = req.params.id;
        return res.json({});
    },

    /**
     * lienController.remove()
     */
    remove (req, res) {
        console.log('insides remove')
        const id = req.params.id;
        return res.json({});
    }
};
