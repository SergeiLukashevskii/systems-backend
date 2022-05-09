const System = require('../models/system')
class SystemController {
  async createSystem(req, res, next) {
    try {
      const { name, exersices } = req.body
      console.log(name)
      const system = await new System({
        userId: req.user.id,
        daysCount: Object.keys(exersices).length,
        exersices: exersices,
        name: name
      })
      await system.save()
      console.log(system.toObject())
      return res.json({ system: system.toObject() })
    } catch (e) {
      console.log(e)
      next(ApiError.internal(e))
    }
  }

  async getSystems(req, res, next) {
    try {
      const systems = await System.find({ userId: req.user.id }).lean()
      return res.json({ systems })
    } catch (e) {
      console.log(e)
      next(ApiError.internal(e))
    }
  }
}

module.exports = new SystemController()
