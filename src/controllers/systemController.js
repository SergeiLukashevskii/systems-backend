const System = require('../models/system')
class SystemController {
  async createSystem(req, res, next) {
    try {
      const { name, exersices } = req.body
      const system = await new System({
        userId: req.user.id,
        daysCount: Object.keys(exersices).length,
        exersices: exersices,
        name: name
      })
      await system.save()
      return res.json({ system: system.toObject() })
    } catch (e) {
      console.log(e)
      next(ApiError.internal(e))
    }
  }

  async getSystems(req, res, next) {
    try {
      const systems = await System
        .find({ userId: req.user.id })
      const formattedSystems = await systems.map(system => system.toObject())
      return res.json({ systems: formattedSystems })
    } catch (e) {
      console.log(e)
      next(ApiError.internal(e))
    }
  }
}

module.exports = new SystemController()
