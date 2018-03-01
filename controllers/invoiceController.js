var invoiceModel = require("../models/invoiceModel.js");
const { pick, find, reject, reduce } = require("lodash");
const { assign } = Object;
/**
 * invoiceController.js
 *
 * @description :: Server-side logic for managing invoices.
 */
module.exports = {
  /**
   * invoiceController.list()
   */
  list: function(req, res) {
    invoiceModel.find(function(err, invoices) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting invoice.",
          error: err
        });
      }
      return res.json(invoices);
    });
  },

  /**
   * invoiceController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    invoiceModel.findOne(
      {
        _id: id
      },
      function(err, invoice) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting invoice.",
            error: err
          });
        }
        if (!invoice) {
          return res.status(404).json({
            message: "No such invoice"
          });
        }
        return res.json(invoice);
      }
    );
  },

  /**
   * invoiceController.create()
   */
  create: function(req, res) {
    new invoiceModel(
      pick(req.body, [
        "dealer",
        "name",
        "phone",
        "email",
        "Dl",
        "address",
        "city",
        "state",
        "zip",
        "vin",
        "plate",
        "make",
        "model_year",
        "exp_date",
        "engine",
        "case_type",
        "case_status",
        "comments",
        "fees",
        "status",
        "payments"
      ])
    ).save(function(err, invoice) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating invoice",
          error: err
        });
      }
      return res.status(201).json(invoice);
    });
  },

  /**
   * invoiceController.update()
   */
  update: ({ body, query: { type, kind }, params: { id } }, res) => {
    console.log("inside update", type, kind, id);
    if (!type) {
      res.status(500).json({
        message: "Must Provide A Type"
      });
    }

    const idPrefix = type === "invoice" ? "" : `${type}.`;
    const $setPrefix = type === "invoice" ? "" : `${type}.$.`;
    if (kind === "new") {
      console.log("this is new");
      invoiceModel
        .update(
          {
            _id: id // id of invoice
          },
          {
            $push: {
              [type]: {
                dmv_fee: 1000
              }
            }
          }
        )
        .then(() => res.sendStatus(202))
        .catch(err =>
          res.status(500).json({
            message: `Error when creating new ${type}`,
            error: err
          })
        );
    } else {
      const $set = reduce(
        body,
        ($set, value, key) =>
          assign($set, {
            [`${$setPrefix}${key}`]: value
          }),
        {}
      );
      console.log("updating invoice model", $set);
      invoiceModel
        .update(
          {
            [`${idPrefix}_id`]: id // id of fee or payment or invoice
          },
          {
            $set
          }
        )
        .then(() => res.sendStatus(202))
        .catch(err =>
          res.status(500).json({
            message: `Error when updating ${type}.`,
            error: err
          })
        );
    }
  },

  /**
   * invoiceController.remove()
   */
  remove: function(req, res) {
    console.log("trying to delete");
    var id = req.params.id;
    invoiceModel.findByIdAndRemove(id, function(err, invoice) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the invoice.",
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
