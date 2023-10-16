const _ = require("lodash");

class ReadController {
  constructor(model, resTitle, searchSubjects) {
    this.model = model;
    this.resTitle = resTitle;
    this.searchSubjects = searchSubjects;
  }

  async getPropertyOfSegment(req, res, next) {
    try {
      let regex = new RegExp(req.query.incomingData);
      const newSubjects = this.searchSubjects.map((subject) => {
        return {
          [subject]: regex,
        };
      });
      const findResponse = await this.model.find(
        { $or: newSubjects },
        { createdAt: 0, updatedAt: 0, __v: 0 }
      );

      res.status(200).json({
        findResponse,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ReadController;
