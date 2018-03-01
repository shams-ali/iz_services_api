var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const feeSchema = new Schema({
  dmv_fee: Number,
  service_fee: Number,
  other_fee: Number,
  extra_discount: Number,
  old_post_fee: Number,
  ros_bos: Number,
  ros_num: Number,
  tax: Number,
  vehicle_tax: Number
});

const paymentSchema = new Schema({
  type: String,
  amount: Number
});

const invoiceSchema = new Schema(
  {
    dealer: String,
    name: String,
    phone: String,
    email: String,
    Dl: String,
    address: String,
    city: String,
    state: String,
    zip: Number,
    vin: String,
    plate: String,
    make: String,
    model_year: String,
    exp_date: String,
    engine: String,
    case_type: String,
    case_status: String,
    comments: String,
    fees: [feeSchema],
    payments: [paymentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("invoice", invoiceSchema);
