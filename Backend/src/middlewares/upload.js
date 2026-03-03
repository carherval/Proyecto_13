const multer = require('multer')
const { storageConfig } = require('../utils/file')
const { helpers } = require('../utils/helpers')

const CAR_FOLDER_NAME = 'Car-dealership/Cars'

const uploadFile =
  (fileField, folderName, cloudinaryAsset) => (req, res, next) =>
    multer({ storage: storageConfig(folderName) }).single(fileField)(
      req,
      res,
      (error) =>
        error != null || (req.file != null && req.file.path == null)
          ? next(
              helpers.getError(
                `Se ha producido un error al subir ${cloudinaryAsset} a "Cloudinary"${error != null ? ':' + helpers.LINE_BREAK + error.message : ''}`,
                400
              )
            )
          : next()
    )

const upload =
  (doc, isMale = true) =>
  (req, res, next) =>
    multer().none()(req, res, (error) =>
      error != null
        ? next(
            helpers.getError(
              `Se ha producido un error al subir ${isMale ? 'el' : 'la'} ${doc}:${helpers.LINE_BREAK}${error.message}`,
              400
            )
          )
        : next()
    )

const uploadCarImg = () =>
  uploadFile('img', CAR_FOLDER_NAME, 'la imagen del coche')

const uploadCar = () => upload('coche')

const uploadCustomer = () => upload('cliente')

const uploadUser = () => upload('usuario')

const uploadReservation = () => upload('reserva', false)

const uploadSale = () => upload('venta', false)

module.exports = {
  CAR_FOLDER_NAME,
  uploadCarImg,
  uploadCar,
  uploadCustomer,
  uploadUser,
  uploadReservation,
  uploadSale
}
