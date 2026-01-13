import { useParams } from 'react-router-dom'
import { DRAGON_BALL_SECTIONS, ERROR_MSG } from '../DragonBall'
import { CharacterFetch } from '../components/Fetch'
import Error from './Error'

// Página que muestra la información de un personaje
const Character = () => {
  const { sagaId, characterId } = useParams()
  const dbSection = DRAGON_BALL_SECTIONS[sagaId]

  return dbSection != null ? (
    <CharacterFetch sagaId={sagaId} characterId={characterId} />
  ) : (
    <Error errorMsg={ERROR_MSG.saga} />
  )
}

export default Character
