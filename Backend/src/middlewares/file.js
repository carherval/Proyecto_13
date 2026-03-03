const { helpers } = require('../utils/helpers')

// MB
const MAX_SIZE = 5

const isValidSize = (req, res, next) =>
  req.headers['content-length'] != null &&
  parseInt(req.headers['content-length'], 10) > MAX_SIZE * 1024 * 1204
    ? next(
        helpers.getError(
          `Se ha producido un error al subir el archivo a "Cloudinary":${helpers.LINE_BREAK}El tamaño no debe ser superior a ${MAX_SIZE} MB`,
          413
        )
      )
    : next()

module.exports = { isValidSize }
