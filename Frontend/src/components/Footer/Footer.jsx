import './Footer.css'

const AUTHOR_FULLNAME = 'Carlos Hernández'
const API_NAME = 'Dragon Ball API'
const API_URL = 'https://dragonballapp.vercel.app/'
const API_AUTHOR_FULLNAME = 'Juan Pablo Patiño López'
const API_AUTHOR_URL = 'https://juanppdev.vercel.app/'
const OPEN_NEW_WINDOW_STR = 'Abre nueva ventana'

const getHtmlLink = ({
  href,
  text,
  isTargetBlank = false,
  title = ''
} = {}) => (
  <a
    href={href}
    target={isTargetBlank ? '_blank' : undefined}
    title={
      title.trim() !== '' || isTargetBlank
        ? `${title.trim()}${title.trim() !== '' && isTargetBlank ? '. ' : ''}${
            isTargetBlank ? OPEN_NEW_WINDOW_STR : ''
          }`
        : undefined
    }
  >
    {text}
  </a>
)

const Footer = () => (
  <footer className='flex pie'>
    <div>
      <p>
        Creado por <span>{AUTHOR_FULLNAME}</span>
      </p>
    </div>
    <div>
      <p>
        Fuente:{' '}
        {getHtmlLink({
          href: API_URL,
          text: API_NAME,
          isTargetBlank: true
        })}
      </p>
      <p>
        Autor:{' '}
        {getHtmlLink({
          href: API_AUTHOR_URL,
          text: API_AUTHOR_FULLNAME,
          isTargetBlank: true
        })}
      </p>
    </div>
  </footer>
)

export default Footer
