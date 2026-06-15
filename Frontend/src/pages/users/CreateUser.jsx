import { useForm } from 'react-hook-form'
import RequiredNote from '../../components/Form/RequiredNote'
import UserForm from '../../components/User/UserForm'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import userFetch from '../../utils/fetch/user'
import strings from '../../utils/strings'

const DEFAULT_CREATE_USER_FORM_VALUES = {
  role: strings.ROLES.seller
}

// Componente que permite crear un usuario nuevo
const CreateUser = () => {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: DEFAULT_CREATE_USER_FORM_VALUES
  })
  const { fetchData } = useFetchWithDialog(userFetch.createUser)

  const submit = (body) => fetchData(body)

  return (
    <>
      <h2>{strings.USER_ACTIONS.create.label}</h2>

      <section className='form'>
        <RequiredNote />
        <form onSubmit={handleSubmit(submit)}>
          <UserForm register={register} reset={reset} />
        </form>
      </section>
    </>
  )
}

export default CreateUser
