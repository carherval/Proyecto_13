import { useForm } from 'react-hook-form'
import CustomerForm from '../../components/Customer/CustomerForm'
import RequiredNote from '../../components/Form/RequiredNote'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import customerFetch from '../../utils/fetch/customer'
import strings from '../../utils/strings'

// Componente que permite crear un cliente nuevo
const CreateCustomer = () => {
  const { register, handleSubmit } = useForm()
  const { fetchData } = useFetchWithDialog(customerFetch.createCustomer)

  const submit = (body) => fetchData(body)

  return (
    <>
      <h2>{strings.CUSTOMER_ACTIONS.create.label}</h2>

      <section className='form'>
        <RequiredNote />
        <form onSubmit={handleSubmit(submit)}>
          <CustomerForm register={register} />
        </form>
      </section>
    </>
  )
}

export default CreateCustomer
