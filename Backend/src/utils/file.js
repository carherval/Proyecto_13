const cloudinary = require('cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storageConfig = (folderName) =>
  new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
      folder: folderName,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
    }
  })

const getPublicIdCloudinary = (fileUrl) =>
  `${fileUrl.split('/').at(-3)}/${fileUrl.split('/').at(-2)}/${
    fileUrl.split('/').at(-1).split('.')[0]
  }`

const fileExistsInCloudinary = async (publicId) => {
  try {
    await cloudinary.v2.api.resource(publicId)

    return true
  } catch {
    return false
  }
}

const deleteFile = (fileUrl, reasonMsg) => {
  const publicId = getPublicIdCloudinary(fileUrl)

  // Sólo se elimina si el archivo existe en "cloudinary"
  fileExistsInCloudinary(publicId).then((exists) => {
    if (exists) {
      cloudinary.v2.uploader.destroy(publicId, () => {
        console.log(
          `Archivo "${publicId}" de "Cloudinary" eliminado debido a: ${reasonMsg}`
        )
      })
    }
  })
}

module.exports = { storageConfig, getPublicIdCloudinary, deleteFile }
