var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const fee = new Schema({
  dmv_fee: Number,
  service_fee: String,
  other_fee: String,
  extra_discount: String,
  old_post_fee: String,
  ros_bos: String,
  ros_num: String,
  tax: String,
  vehicle_tax: String
});

const payment = new Schema({
  type: String,
  amount: Number
});

const invoiceSchema = new Schema({
  dealer: String,
  name: String,
  phone: String,
  email: String,
  Dl: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  vin: String,
  plate: String,
  make: String,
  model_year: String,
  exp_date: String,
  engine: String,
  case_type: String,
  case_status: String,
  comments: String,
  fee: [fee],
  payment: [payment]
});

module.exports = mongoose.model("invoice", invoiceSchema);
