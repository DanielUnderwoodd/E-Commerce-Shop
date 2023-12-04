const uniqid = require("uniqid");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("0123456789", 12);
class CreateController {
  constructor(model, resTitle) {
    this.model = model;
    this.resTitle = resTitle;
  }
  addClass(req, res, next) {
    let newField = {
      name: req.body.name,
      _id: uniqid("CID-"),
      properties: req.body.properties,
    };
    this.newField = newField;
  }
  addUnit(req, res, next) {
    let newField = {
      name: req.body.name,
      _id: uniqid(),
    };
    this.newField = newField;
  }

  async save(req, res, next) {
    try {
      const newData = new this.model(this.newField);
      let saveResponse = await newData.save();
      res.status(200).json({
        msg: `${this.resTitle} successfully saved.`,
        doc: saveResponse,
      });
    } catch (err) {
      switch (err.code) {
        case 11000:
          res
            .status(500)
            .json(`this item: ${this.resTitle} exists. `);
          break;
        default:
          res.status(500).json(err);
      }
    }
  }
}

module.exports = CreateController;

// switch (section) {
//   case "brand":
//     var newField = {
//       name: req.body.name,
//       _id: uniqid("BID-"),
//     };
//     break;

//   case "category":
//     var newField = {
//       name: req.body.name,
//       _id: uniqid("CAID-"),
//       class: req.body.class,
//     };
//     break;

//   case "subCategory":
//     var newField = {
//       name: req.body.name,
//       _id: uniqid("SUBCAID-"),
//     };
//     break;

//   case "order":
//     var newField = {
//       _id: "OID-" + nanoid(),
//       receiver: req.body.receiver,
//       address: req.body.address,
//       numberOfItems: req.body.numberOfItems,
//       totalOrderAmount: req.body.totalOrderAmount,
//       theAmountPayable: req.body.theAmountPayable,
//       cart: req.body.cart,
//       deliverySchedule: req.body.deliverySchedule,
//     };
//     break;

//   case "product":
//     var newField = {
//       _id: uniqid("PID-"),
//       class: req.body.class,
//       name: req.body.name,
//       category: req.body.category,
//       packageWeight: req.body.packageWeight,
//       barcode: req.body.barcode,
//       description: req.body.description,
//       packagingDimensions: req.body.packagingDimensions,
//       healthLicenseNumber: req.body.healthLicenseNumber,
//       Subcategory: req.body.subCategory,
//       brand: req.body.brand,
//       unitOfMeasurement: req.body.unitOfMeasurement,
//     };
//     break;

//   case "store":
//     var newField = {
//       _id: uniqid("SID-"),
//       address: req.body.address,
//       name: req.body.name,
//       minimumPurchasePriceAmount: req.body.minimumPurchasePriceAmount,
//       productsInStore: req.body.productsInStore,
//       deliverySchedule: req.body.deliverySchedule,
//       class: req.body.class,
//       categories: req.body.categories,
//       healthLicenseNumber: req.body.healthLicenseNumber,
//       Subcategory: req.body.subCategory,
//       brand: req.body.brand,
//       unitOfMeasurement: req.body.unitOfMeasurement,
//     };
//     break;

//   case "deliverySchedule":
//     var newField = {
//       name: req.body.name,
//       _id: uniqid("DID-"),
//     };
//     break;
// }
