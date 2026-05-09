import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../components/Auth/AuthProvider'
import TextField from '../components/Form/TextField'
import useFetchWithDialog from '../hooks/useFetchWithDialog'
import userFetch from '../utils/fetch/user'
import strings from '../utils/strings'

// Componente que permite hacer "login" en la aplicación
const Login = () => {
  const { login } = useContext(AuthContext)
  const { register, handleSubmit } = useForm()
  const { fetchData } = useFetchWithDialog(userFetch.loginUser)

  const submit = async (body) => {
    const res = await fetchData(body)

    login(res.resData.data)
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <TextField
          id={strings.USER_FIELDS.username.id}
          placeholder={strings.USER_FIELDS.username.label}
          register={register}
        />
      </div>

      <div>
        <TextField
          id={strings.USER_FIELDS.password.id}
          type={strings.INPUT_FIELD_TYPES.password}
          placeholder={strings.USER_FIELDS.password.label}
          register={register}
        />
      </div>

      <button type={strings.INPUT_FIELD_TYPES.submit}>
        {strings.USER_ACTIONS.login.label}
      </button>
    </form>
  )
}

export default Login
