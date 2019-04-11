const Box = require("../models/Box");

class BoxController {
  async store(req, res) {
    const box = await Box.create(req.body);

    return res.json(box);
  }

  async list(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const boxes = await Box.paginate(
      {},
      { sort: { updatedAt: -1 }, page, limit, populate: ["files"] }
    );

    return res.json(boxes);
  }

  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: "files",
      options: { sort: { createdAt: -1 } }
    });

    return res.json(box);
  }
}

module.exports = new BoxController();
