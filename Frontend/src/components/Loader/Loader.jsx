import './Loader.css'

const LOADING_MSG = 'Espere, por favor...'

// Componente que muestra una imagen de carga durante las llamadas "fetch"
const Loader = () => (
  <div id='loader' className='flex'>
    <div className='flex loader'>
      <img src='/assets/images/bola.png' alt={LOADING_MSG} />
      <p>{LOADING_MSG}</p>
    </div>
  </div>
)

export default Loader
