const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContractSchema = new Schema({
  specialID: {
    type: Number,
    unique: true
  },
  type: {
    type: String
  },
  cancelNotice: {
    type: Number
  },
  propertyType: {
    type: String
  },
  propertyStreetAddress: {
    type: String
  },
  propertyCity: {
    type: String
  },
  propertyState: {
    type: String
  },
  propertyZipCode: {
    type: Number
  },
  furnished: {
    type: Boolean
  },
  parkingAvailable: {
    type: Boolean
  },
  signingDate: {
    type: Date
  },
  effectiveDate: {
    type: Date
  },
  landlordId: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  tenantId: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  firstMonthRequired: {
    type: Boolean
  },
  depositRequired: {
    type: Boolean
  },
  subletAllowed: {
    type: Boolean
  },
  guestsAllowed: {
    type: Boolean
  },
  depositAmt: {
    type: Number
  },
  rentAmt: {
    type: Number
  },
  rentDueDate: {
    type: Date
  },
  lateFee: {
    type: Boolean
  },
  lateFeeAmt: {
    type: Number
  },
  paymentMethod: {
    type: String
  },
  utilityBillsIncluded: {
    type: Boolean
  },
  petsAllowed: {
    type: Number
  },
  petsTotal: {
    type: Number
  },
  singlePetFee: {
    type: Number
  },
  moveOutDate: {
    type: Date
  }
});

const Contract = mongoose.model('contract', ContractSchema);
module.exports = Contract;
