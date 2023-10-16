const { json } = require("body-parser");

class UpdateController {
  constructor(model, resTitle) {
    this.model = model;
    this.resTitle = resTitle;
  }

  updateClass(req, res, next) {
    var updatedField = {
      name: req.body.name,
      properties: req.body.properties,
    };

    this.updatedField = updatedField;
  }

  updateUnit(req, res, next) {
    var updatedField = {
      name: req.body.name,
    };

    this.updatedField = updatedField;
  }
  async findOneAndUpdate(req, res, next) {
    let query = {
      _id: req.body.id,
    };
    try {
      let updateSegment = await this.model.findOneAndUpdate(
        query,

        {
          ...this.updatedField,
        },
        {
          new: true,
        }
      );
      if (updateSegment) {
        let updateData = {
          _id: updateSegment._id,
        };
        for (const property in this.updatedField) {
          updateData[property] = updateSegment[property];
        }
        res.status(200).json({
          msg: `${this.resTitle} مورد نظر با موفقیت بروزرسانی شد `,
          updateData,
        });
      } else {
        res.status(500).json(`بروزرسانی  ${this.resTitle} ناموفق بود`);
      }
    } catch (err) {
      switch (err.code) {
        case 11000:
          res
            .status(500)
            .json(
              `این ${this.resTitle}   در سامانه موجود می باشد نمی توانید بروزرسانی کنید`
            );
          break;
        default:
          console.log(err);
          res.status(500).json(err);
      }
    }
  }

  //   updateField(model, resTitle, section, _id) {
  //     return async (req, res, next) => {
  //       switch (section) {
  //         case "classes":
  //           var updatedField = {
  //             name: req.body.name,
  //           };
  //           break;
  //         case "brand":
  //           var updatedField = {
  //             name: req.body.name,
  //           };
  //           break;

  //         case "category":
  //           var updatedField = {
  //             name: req.body.name,
  //             class: req.body.class,
  //           };
  //           break;

  //         case "subCategory":
  //           var updatedField = {
  //             name: req.body.name,
  //           };
  //           break;

  //         case "order":
  //           var updatedField = {
  //             receiver: req.body.receiver,
  //             address: req.body.address,
  //             numberOfItems: req.body.numberOfItems,
  //             totalOrderAmount: req.body.totalOrderAmount,
  //             theAmountPayable: req.body.theAmountPayable,
  //             cart: req.body.cart,
  //             deliverySchedule: req.body.deliverySchedule,
  //           };
  //           break;

  //         case "product":
  //           var updatedField = {
  //             class: req.body.class,
  //             name: req.body.name,
  //             category: req.body.category,
  //             packageWeight: req.body.packageWeight,
  //             barcode: req.body.barcode,
  //             description: req.body.description,
  //             packagingDimensions: req.body.packagingDimensions,
  //             healthLicenseNumber: req.body.healthLicenseNumber,
  //             Subcategory: req.body.subCategory,
  //             brand: req.body.brand,
  //             unitOfMeasurement: req.body.unitOfMeasurement,
  //           };
  //           break;

  //         case "store":
  //           var updatedField = {
  //             address: req.body.address,
  //             name: req.body.name,
  //             minimumPurchasePriceAmount: req.body.minimumPurchasePriceAmount,
  //             productsInStore: req.body.productsInStore,
  //             deliverySchedule: req.body.deliverySchedule,
  //             class: req.body.class,
  //             categories: req.body.categories,
  //             healthLicenseNumber: req.body.healthLicenseNumber,
  //             Subcategory: req.body.subCategory,
  //             brand: req.body.brand,
  //             unitOfMeasurement: req.body.unitOfMeasurement,
  //           };
  //           break;

  //         case "deliverySchedule":
  //           var updatedField = {
  //             name: req.body.name,
  //           };
  //           break;
  //       }

  //       let query = {
  //         _id,
  //       };
  //       try {
  //         let updateSegment = await model.findOneAndUpdate(query, updatedField, {
  //           new: true,
  //         });
  //       } catch (err) {
  //         switch (err.code) {
  //           case 11000:
  //             res.status(500).json(`این ${resTitle}  در سامانه موجود می باشد `);
  //             break;
  //           default:
  //             res.status(500).json(err);
  //         }
  //       }
  //     };
  //   }
}
// const updateController = new UpdateController();

module.exports = UpdateController;
