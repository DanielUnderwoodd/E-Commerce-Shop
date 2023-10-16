class DeleteController {
  constructor(model, resTitle) {
    this.model = model;
    this.resTitle = resTitle;
  }

  async deleteOne(req, res, next) {
    let query = {
      _id: req.body.id,
    };
    try {
      let deletePropertyOfSegment = await this.model.deleteOne(query);
      if (deletePropertyOfSegment.deletedCount == 1) {
        res.status(200).json({
          msg: `${this.resTitle} مورد نظر با موفقیت حذف شد `,
        });
      } else {
        res.status(500).json(`حذف  ${this.resTitle} ناموفق بود`);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

module.exports = DeleteController;
