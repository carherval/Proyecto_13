const { ROLES, User } = require('../api/models/user')
const { helpers } = require('../utils/helpers')
const { getDecodedToken } = require('../utils/token')
const { validation } = require('../utils/validation')

// También devuelve el usuario autorizado cuando se realiza un inicio de sesión aunque no sea obligatorio
const isAuthorizedUser =
  ({ isRequiredLogin = true, role = ROLES.seller } = {}) =>
  async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]

      if (token == null && isRequiredLogin) {
        throw new Error(validation.getLoginMsg())
      }

      req.user =
        token != null ? await User.findById(getDecodedToken(token).id) : null

      // Aunque se encuentre el usuario puede dar error por "jwt expired", "invalid token" o "jwt malformed"
      // Si se realiza un inicio de sesión y no se encuentra el usuario es porque ha sido eliminado estando el token todavía activo
      if (req.user == null && isRequiredLogin) {
        throw new Error(validation.getLoginMsg())
      }

      if (req.user.role !== role && req.user.role === ROLES.seller) {
        throw new Error(validation.getLoginMsg(ROLES.admin))
      }

      return next()
    } catch (error) {
      if (isRequiredLogin) {
        error.message = `${validation.ENDPOINT_ACCESS_ERROR_MSG}:${helpers.LINE_BREAK}${error.message}`
        error.status = 403

        return next(error)
      } else {
        req.user = null

        return next()
      }
    }
  }

module.exports = { isAuthorizedUser }
