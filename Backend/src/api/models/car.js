const mongoose = require('mongoose')
const { helpers } = require('../../utils/helpers')
const { validation } = require('../../utils/validation')

const CAR_COLLECTION_NAME = 'car'

const CAR_MAKE_MODELS = {
  Acura: ['MDX', 'RDX'],
  Audi: ['A4', 'Q5', 'Q7'],
  BMW: ['3 Series', '5 Series', 'X5'],
  Cadillac: ['CT5', 'Escalade', 'XT5'],
  Chevrolet: ['Equinox', 'Malibu', 'Suburban', 'Traverse'],
  Citroën: ['Berlingo', 'C3', 'C4', 'C5'],
  Dodge: ['Challenger', 'Charger'],
  Fiat: ['500', 'Stilo', 'Tipo'],
  Ford: ['Escape', 'Explorer', 'F-150', 'Focus', 'Mustang', 'Shelby GT500'],
  GMC: ['Acadia', 'Terrain', 'Yukon'],
  Honda: ['Accord', 'Civic', 'CR-V', 'HR-V'],
  Hyundai: ['Elantra', 'Santa Fe', 'Tucson'],
  Jeep: ['Cherokee', 'Grand Cherokee'],
  Kia: ['Ceed', 'Rio', 'Sorento'],
  Lincoln: ['MKC', 'MKZ', 'Town Car'],
  Mazda: ['CX-30', 'CX-5', 'Mazda3'],
  Mercedes: ['C-Class', 'E-Class', 'S-Class'],
  MG: ['HS', 'MG3', 'MG4', 'ZS'],
  Nissan: ['Qashqai', 'Rogue', 'X-Trail'],
  Peugeot: ['208', '3008', '308', '5008'],
  Porsche: ['911', 'Carrera', 'Cayenne'],
  Ram: ['1500', '2500'],
  Renault: ['Captur', 'Clio', 'Megane'],
  Seat: ['Arona', 'Ateca', 'Ibiza', 'León'],
  Tesla: ['Model 3', 'Model S', 'Model Y'],
  Toyota: ['4Runner', 'Highlander', 'Prius', 'RAV4', 'Sienna'],
  Volkswagen: ['Golf', 'Passat', 'Tiguan'],
  Volvo: ['S40', 'S60', 'XC60', 'XC90']
}

const COLORS = [
  'Amarillo',
  'Azul',
  'Azul metálico',
  'Azul oscuro',
  'Blanco',
  'Dorado',
  'Granate',
  'Gris',
  'Gris azulado',
  'Gris oscuro',
  'Marrón',
  'Marrón oscuro',
  'Morado',
  'Mostaza',
  'Naranja',
  'Negro',
  'Oliva',
  'Plateado',
  'Rojo',
  'Turquesa',
  'Verde',
  'Verde oscuro',
  'Violeta'
]

const CAR_CONDITIONS = {
  new: 'Nuevo',
  used: 'Usado'
}

const CAR_STATUSES = {
  available: 'Disponible',
  reserved: 'Reservado',
  sold: 'Vendido'
}

const carSchema = new mongoose.Schema(
  {
    licensePlate: {
      type: String,
      trim: true,
      uppercase: true,
      required: [true, validation.REQUIRED_MSG],
      validate: {
        validator: validation.isValidLicensePlate,
        message: validation.INVALID_LICENSE_PLATE_MSG
      },
      unique: [true, `licensePlate: ${validation.UNIQUE_MSG}`]
    },
    make: {
      type: String,
      trim: true,
      required: [true, validation.REQUIRED_MSG],
      enum: {
        values: Object.keys(CAR_MAKE_MODELS),
        message: validation.NOT_ALLOWED_VALUE_MSG
      }
    },
    model: {
      type: String,
      trim: true,
      required: [true, validation.REQUIRED_MSG],
      // Si la marca no se valida correctamente, se ignora la validación del modelo
      validate: {
        validator: function (model) {
          return CAR_MAKE_MODELS[this.make] != null
            ? CAR_MAKE_MODELS[this.make].includes(model)
            : true
        },
        message: validation.NOT_ALLOWED_VALUE_MSG
      }
    },
    color: {
      type: String,
      trim: true,
      required: [true, validation.REQUIRED_MSG],
      enum: {
        values: COLORS,
        message: validation.NOT_ALLOWED_VALUE_MSG
      }
    },
    img: {
      type: String,
      trim: true,
      default: ''
    },
    modelYear: {
      type: Number,
      required: [true, validation.REQUIRED_MSG],
      // Si hay error de "cast", se fuerza un error de validación personalizado
      set: function (modelYear) {
        if (
          modelYear == null ||
          typeof modelYear === 'number' ||
          modelYear.trim() === ''
        ) {
          return modelYear
        }

        const modelYearNumber = Number(modelYear.trim())

        if (!Number.isInteger(modelYearNumber)) {
          this.invalidate('modelYear', validation.INVALID_YEAR_MSG)
        }

        return modelYearNumber
      },
      validate: [
        {
          validator: validation.isMinYear,
          message: validation.getInvalidMinYearMsg()
        },
        {
          validator: validation.isMaxYear,
          message: validation.INVALID_MAX_YEAR_MSG
        }
      ]
    },
    purchaseDate: {
      type: Date,
      required: [true, validation.REQUIRED_MSG],
      // Se fuerza el formato y si hay error de "cast", se fuerza un error de validación personalizado
      set: function (purchaseDate) {
        if (
          purchaseDate == null ||
          purchaseDate instanceof Date ||
          purchaseDate.trim() === ''
        ) {
          return purchaseDate
        }

        const momentDate = helpers.getMomentDate(
          purchaseDate.trim(),
          'DD/MM/YYYY'
        )

        if (!momentDate.isValid()) {
          this.invalidate('purchaseDate', validation.INVALID_DATE_MSG)
        }

        return momentDate.toDate()
      },
      validate: [
        // Si el año de fabricación no se valida correctamente, se ignora la validación de la fecha de adquisición
        {
          validator: function (purchaseDate) {
            if (
              Number.isInteger(this.modelYear) &&
              validation.isMinYear(this.modelYear) &&
              validation.isMaxYear(this.modelYear) &&
              purchaseDate.getFullYear() < this.modelYear
            ) {
              this.invalidate(
                'purchaseDate',
                validation.getInvalidMinYearMsg(this.modelYear)
              )

              return false
            }

            return true
          }
        },
        {
          validator: validation.isMaxDate,
          message: validation.INVALID_MAX_DATE_MSG
        }
      ]
    },
    condition: {
      type: String,
      trim: true,
      required: [true, validation.REQUIRED_MSG],
      enum: {
        values: Object.values(CAR_CONDITIONS),
        message: validation.NOT_ALLOWED_VALUE_MSG
      }
    },
    mileage: {
      type: Number,
      required: [true, validation.REQUIRED_MSG],
      // Si hay error de "cast", se fuerza un error de validación personalizado
      set: function (mileage) {
        if (
          mileage == null ||
          typeof mileage === 'number' ||
          mileage.trim() === ''
        ) {
          return mileage
        }

        const mileageNumber = Number(mileage.trim())

        if (!Number.isInteger(mileageNumber)) {
          this.invalidate('mileage', validation.INVALID_MILEAGE_MSG)
        }

        return mileageNumber
      },
      // Sólo se valida el kilometraje cuando el coche no es nuevo
      validate: {
        validator: function (mileage) {
          return this.condition != null &&
            this.condition.trim() !== '' &&
            helpers.normalizeString(this.condition) !== CAR_CONDITIONS.new
            ? validation.isValidMileage(mileage)
            : true
        },
        message: validation.INVALID_MILEAGE_MSG
      }
    },
    price: {
      type: Number,
      required: [true, validation.REQUIRED_MSG],
      // Si hay error de "cast", se fuerza un error de validación personalizado
      set: function (price) {
        if (price == null || typeof price === 'number' || price.trim() === '') {
          return price
        }

        const priceNumber = Number(price.trim())

        if (!Number.isInteger(priceNumber)) {
          this.invalidate('price', validation.INVALID_PRICE_MSG)
        }

        return priceNumber
      },
      validate: {
        validator: validation.isValidPrice,
        message: validation.INVALID_PRICE_MSG
      }
    },
    status: {
      type: String,
      trim: true,
      required: [true, validation.REQUIRED_MSG],
      enum: {
        values: Object.values(CAR_STATUSES),
        message: validation.NOT_ALLOWED_VALUE_MSG
      },
      default: CAR_STATUSES.available
    }
  },
  {
    timestamps: true
  }
)

carSchema.index(
  { img: 1 },
  {
    unique: true,
    partialFilterExpression: {
      // La restricción sólo salta cuando el campo no está vacío y está repetido
      $and: [{ img: { $type: 'string' } }, { img: { $gt: '' } }]
    }
  }
)

carSchema.pre('validate', function () {
  if (this.make != null) {
    this.make = helpers.normalizeString(this.make)
  }

  if (this.model != null) {
    this.model = helpers.normalizeString(this.model)
  }

  if (this.color != null) {
    this.color = helpers.normalizeString(this.color)
  }

  if (this.condition != null) {
    this.condition = helpers.normalizeString(this.condition)
  }

  if (this.status != null) {
    this.status = helpers.normalizeString(this.status)
  }
})

// Modelo, esquema y colección de los coches
// Si no se especifica, por defecto, la colección es el plural del modelo
const Car = mongoose.model(CAR_COLLECTION_NAME, carSchema, CAR_COLLECTION_NAME)

module.exports = { CAR_CONDITIONS, CAR_STATUSES, Car }
