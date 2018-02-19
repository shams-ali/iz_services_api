var invoiceModel = require("../models/invoiceModel.js");
const { pick } = require("lodash");
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
    invoiceModel.findOne({ _id: id }, function(err, invoice) {
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
    });
  },

  /**
   * invoiceController.create()
   */
  create: function(req, res) {
    console.log("wtfff");
    var invoice = new invoiceModel(
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
        "fee",
        "status",
        "payment"
      ])
    );

    invoice.save(function(err, invoice) {
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
  update: function(req, res) {
    var id = req.params.id;
    invoiceModel.findOne({ _id: id }, function(err, invoice) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting invoice",
          error: err
        });
      }
      if (!invoice) {
        return res.status(404).json({
          message: "No such invoice"
        });
      }

      invoice.vin = req.body.vin ? req.body.vin : invoice.vin;
      invoice.plate = req.body.plate ? req.body.plate : invoice.plate;
      invoice.make = req.body.make ? req.body.make : invoice.make;
      invoice.model_year = req.body.model_year
        ? req.body.model_year
        : invoice.model_year;
      invoice.exp_date = req.body.exp_date
        ? req.body.exp_date
        : invoice.exp_date;
      invoice.engine = req.body.engine ? req.body.engine : invoice.engine;
      invoice.case_type = req.body.case_type
        ? req.body.case_type
        : invoice.case_type;
      invoice.case_status = req.body.case_status
        ? req.body.case_status
        : invoice.case_status;
      invoice.comments = req.body.comments
        ? req.body.comments
        : invoice.comments;
      invoice.dmv_fee = req.body.dmv_fee ? req.body.dmv_fee : invoice.dmv_fee;
      invoice.dmv_fee2 = req.body.dmv_fee2
        ? req.body.dmv_fee2
        : invoice.dmv_fee2;
      invoice.service_fee = req.body.service_fee
        ? req.body.service_fee
        : invoice.service_fee;
      invoice.other_fee = req.body.other_fee
        ? req.body.other_fee
        : invoice.other_fee;
      invoice.extra_discount = req.body.extra_discount
        ? req.body.extra_discount
        : invoice.extra_discount;
      invoice.old_post_fee = req.body.old_post_fee
        ? req.body.old_post_fee
        : invoice.old_post_fee;
      invoice.ros_bos = req.body.ros_bos ? req.body.ros_bos : invoice.ros_bos;
      invoice.ros_num = req.body.ros_num ? req.body.ros_num : invoice.ros_num;
      invoice.tax = req.body.tax ? req.body.tax : invoice.tax;
      invoice.vehicle_tax = req.body.vehicle_tax
        ? req.body.vehicle_tax
        : invoice.vehicle_tax;
      invoice.type = req.body.type ? req.body.type : invoice.type;
      invoice.comments = req.body.comments
        ? req.body.comments
        : invoice.comments;
      invoice.status = req.body.status ? req.body.status : invoice.status;
      invoice.payment = req.body.payment ? req.body.payment : invoice.payment;

      invoice.save(function(err, invoice) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating invoice.",
            error: err
          });
        }

        return res.json(invoice);
      });
    });
  },

  /**
   * invoiceController.remove()
   */
  remove: function(req, res) {
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
