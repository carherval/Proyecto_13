const mongoose = require('mongoose')
const { Car, CAR_STATUSES } = require('./car')
const { Customer } = require('./customer')
const { Sale } = require('./sale')
const { validation } = require('../../utils/validation')

const RESERVATION_COLLECTION_NAME = 'reservation'

const reservationSchema = new mongoose.Schema(
  {
    car: {
      ref: Car.collection.name,
      type: mongoose.Types.ObjectId,
      required: [true, validation.REQUIRED_MSG],
      // Si hay error de "cast", se fuerza un error de validación personalizado
      set: function (car) {
        car = car.toString().trim()

        if (car === '') {
          this.invalidate('car', validation.REQUIRED_MSG)
        }

        if (!mongoose.isValidObjectId(car)) {
          this.invalidate('car', validation.INVALID_ID_MSG)
        }

        return car
      },
      validate: [
        {
          validator: async (_id) => (await Car.exists({ _id })) != null,
          message: (props) => validation.getCarNotFoundByIdMsg(props.value)
        },
        // No se puede reservar un coche que ya está vendido
        {
          validator: async (car) => (await Sale.findOne({ car })) == null,
          message: validation.getStatusCarMsg(CAR_STATUSES.sold)
        }
      ],
      // No se puede reservar un coche que ya está reservado
      unique: [true, validation.getStatusCarMsg(CAR_STATUSES.reserved)]
    },
    customer: {
      ref: Customer.collection.name,
      type: mongoose.Types.ObjectId,
      required: [true, validation.REQUIRED_MSG],
      // Si hay error de "cast", se fuerza un error de validación personalizado
      set: function (customer) {
        customer = customer.toString().trim()

        if (customer === '') {
          this.invalidate('customer', validation.REQUIRED_MSG)
        }

        if (!mongoose.isValidObjectId(customer)) {
          this.invalidate('customer', validation.INVALID_ID_MSG)
        }

        return customer
      },
      validate: {
        validator: async (_id) => (await Customer.exists({ _id })) != null,
        message: (props) => validation.getCustomerNotFoundByIdMsg(props.value)
      }
    }
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'reservationDate',
      updatedAt: false
    }
  }
)

// Modelo, esquema y colección de las reservas de coches
// Si no se especifica, por defecto, la colección es el plural del modelo
const Reservation = mongoose.model(
  RESERVATION_COLLECTION_NAME,
  reservationSchema,
  RESERVATION_COLLECTION_NAME
)

module.exports = { Reservation }
