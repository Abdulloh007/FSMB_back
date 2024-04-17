const Report = require("../models/report.model");

async function getReports(req, res) {
  try {
    if (!req.user.roles.includes("admin")) {
      return res
        .status(403)
        .json({ error: "Недостаточно прав для просмотра жалоб" });
    }

    const reports = await Report.findAll();
    res.status(200).json({ reports });
  } catch (error) {
    res.status(409).json({ error: "Произошла ошибка при получении жалоб" });
  }
}

async function newReport(req, res) {
  try {
    const userId = req.user.id;
    const { title, description } = req.body;

    if (
      !title ||
      !description ||
      title.trim() === "" ||
      description.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Заголовок и описание обязательны для создания жалобы" });
    }

    const newReport = await Report.create({
      from: userId,
      title,
      description,
    });

    res.status(201).json({ report: newReport, msg: "Жалоба успешна создана" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function updateReportStatus(req, res) {
  try {
    if (!req.user.roles.includes("admin")) {
      return res
        .status(403)
        .json({ error: "Недостаточно прав для изменения статуса жалобы" });
    }

    const reportId = req.params.id;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Некорректный статус жалобы" });
    }

    const report = await Report.findByPk(reportId);

    if (!report) {
      return res.status(404).json({ error: "Жалоба не найден" });
    }

    report.status = status;
    await report.save();

    res.status(200).json({ report, msg: "Статус жалобы успешно обновлен" });
  } catch (error) {
    res
      .status(409)
      .json({ error: "Произошла ошибка при обновлении статуса жалобы" });
  }
}
module.exports = {
  getReports,
  newReport,
  updateReportStatus,
};
