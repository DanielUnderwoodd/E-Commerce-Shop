const express = require("express");
const router = express.Router();
const classModel = require("../../models/class");
const unitModel = require("../../models/uniOfMeasurement");
const { userValidationRules, validate } = require("../../validator/user.js");
const { addAddressValidationRules } = require("../../validator/addAddress");
const { classValidationRules } = require("../../validator/class");
const UpdateController = require("../../controllers/update");
const ReadController = require("../../controllers/read");
const CreateController = require("../../controllers/create");
const DeleteController = require("../../controllers/delete");
const { unitValidationRules } = require("../../validator/unit");

module.exports = (Admin, sessionAdmin, client, jwt) => {
  router.get("/logout", async (req, res) => {
    try {
      let terminateSession = await Admin.updateOne(
        {
          _id: req.user.admin._id,
        },
        {
          $pull: {
            session: req.user.admin.sessionId,
          },
        }
      );
      if (terminateSession.nModified === 1) {
        let removeSession = await sessionAdmin.deleteOne({
          _id: req.user.admin.sessionId,
        });
        if (removeSession.deletedCount === 1) {
          res.clearCookie("jwtAdmin");
          console.log("you are logout successfully");
          res.status(200).json("you are logout successfully");
        }
      } else {
        res.status(500).json("failed to update db");
      }
    } catch (err) {
      console.log(`error ocur in customer/pv/logout GET Method: ${err}`);
      res.status(500).json(err);
    }
  });

  router.get(
    "/class",
    ReadInstance(classModel, "صنفی", ["name", "properties"])
  );
  router.post(
    "/class",
    classValidationRules(),
    validate,
    CreateInstance(classModel, "صنف", "addClass")
  );
  router.put(
    "/class",
    classValidationRules(),
    validate,
    UpdateInstance(classModel, "صنف", "updateClass")
  );
  router.delete("/class", DeleteInstance(classModel, "صنف"));
  router.get("/unit", ReadInstance(unitModel, "واحدی", ["name"]));
  router.post(
    "/unit",
    unitValidationRules(),
    validate,
    CreateInstance(unitModel, "واحد", "addUnit")
  );
  router.put(
    "/unit",
    unitValidationRules(),
    validate,
    UpdateInstance(unitModel, "واحد", "updateUnit")
  );
  router.delete("/unit", DeleteInstance(unitModel, "واحد"));

  return router;
};

const CreateInstance = (model, resTitle, method) => {
  return async (req, res, next) => {
    const create = new CreateController(model, resTitle);
    create[method](req, res, next);
    create.save(req, res, next);
  };
};

const UpdateInstance = (model, resTitle, method) => {
  return async (req, res, next) => {
    const update = new UpdateController(model, resTitle);
    update[method](req, res, next);
    update.findOneAndUpdate(req, res, next);
  };
};
const ReadInstance = (model, resTitle, searchSubjects) => {
  return async (req, res, next) => {
    const read = new ReadController(model, resTitle, searchSubjects);
    read.getPropertyOfSegment(req, res, next);
  };
};
const DeleteInstance = (model, resTitle) => {
  return async (req, res, next) => {
    const remove = new DeleteController(model, resTitle);
    remove.deleteOne(req, res, next);
  };
};
