const mongoose = require('mongoose')
const { Car, CAR_STATUSES } = require('./car')
const { Customer } = require('./customer')
// const { Reservation } = require('./reservation')
const { validation } = require('../../utils/validation')

const SALE_COLLECTION_NAME = 'sale'

const saleSchema = new mongoose.Schema(
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
        // No se puede vender a un cliente un coche reservado a otro cliente
        {
          validator: async function (car) {
            const { Reservation } = require('./reservation')

            const reservation = await Reservation.findOne({ car })

            return (
              reservation == null ||
              reservation.customer.toString() === this.customer.toString()
            )
          },
          message: validation.getStatusCarMsg(CAR_STATUSES.reserved)
        }
      ],
      // No se puede vender un coche que ya está vendido
      unique: [true, validation.getStatusCarMsg(CAR_STATUSES.sold)]
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
      createdAt: 'saleDate',
      updatedAt: false
    }
  }
)

// Modelo, esquema y colección de las ventas de coches
// Si no se especifica, por defecto, la colección es el plural del modelo
const Sale = mongoose.model(
  SALE_COLLECTION_NAME,
  saleSchema,
  SALE_COLLECTION_NAME
)

module.exports = { Sale }
