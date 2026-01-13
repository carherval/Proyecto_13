import './Character.css'

import { useMemo, useReducer } from 'react'
import {
  CHARACTER_DATA_FIELD_LABELS,
  CHARACTER_INFO_SECTIONS,
  COLLAPSIBLE_OPTIONS,
  getNotEmptyStr,
  NO_INFO_STR
} from '../Fetch'
import toggleCollapsibleReducer from '../../reducers/toggleCollapsibleReducer'

const TOGGLE_COLLAPSIBLE_INITIAL_STATE = {
  isOpened: [false, false, false, false]
}

// Componente que muestra la información de un personaje
const Character = ({ character }) => {
  // Desplegables de las secciones de información del personaje
  const [toggleCollapsibleState, dispatchToggleCollapsible] = useReducer(
    toggleCollapsibleReducer,
    TOGGLE_COLLAPSIBLE_INITIAL_STATE
  )

  // Devuelve una sección de información del personaje en forma de desplegable
  const getCharacterInfoSection = (sectionIndex, sectionTitle, sectionInfo) => (
    <section className='info'>
      <h3
        tabIndex={0}
        className={
          toggleCollapsibleState.isOpened[sectionIndex] ? 'opened' : undefined
        }
        title={`${
          !toggleCollapsibleState.isOpened[sectionIndex]
            ? COLLAPSIBLE_OPTIONS.open
            : COLLAPSIBLE_OPTIONS.close
        } ${sectionTitle}`}
        onClick={() =>
          dispatchToggleCollapsible({ payload: { index: sectionIndex } })
        }
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            dispatchToggleCollapsible({ payload: { index: sectionIndex } })
          }
        }}
      >
        {sectionTitle}
      </h3>
      <div
        className={
          !toggleCollapsibleState.isOpened[sectionIndex] ? 'oculto' : undefined
        }
      >
        {sectionInfo}
      </div>
    </section>
  )

  // Devuelve los datos básicos del personaje: nombre, género, raza y planeta
  const getCharacterData = useMemo(
    () => (
      <>
        <div className='flex field'>
          <div className='flex label'>
            {CHARACTER_DATA_FIELD_LABELS.name.title}:
          </div>
          <div className='flex value'>
            {getNotEmptyStr(character.name, true)}
          </div>
        </div>
        <div className='flex field'>
          <div className='flex label'>
            {CHARACTER_DATA_FIELD_LABELS.genre.title}:
          </div>
          <div className='flex value'>{getNotEmptyStr(character.genre)}</div>
        </div>
        <div className='flex field'>
          <div className='flex label'>
            {CHARACTER_DATA_FIELD_LABELS.race.title}:
          </div>
          <div className='flex value'>{getNotEmptyStr(character.race)}</div>
        </div>
        <div className='flex field'>
          <div className='flex label'>
            {CHARACTER_DATA_FIELD_LABELS.planet.title}:
          </div>
          <div className='flex value'>{getNotEmptyStr(character.planet)}</div>
        </div>
      </>
    ),
    [character]
  )

  const getCharacterDescr = useMemo(
    () => <p>{getNotEmptyStr(character.description)}</p>,
    [character]
  )

  const getCharacterBio = useMemo(
    () => <p>{getNotEmptyStr(character.biography)}</p>,
    [character]
  )

  const getCharacterTransformations = useMemo(
    () =>
      character.transformations[0].image != null &&
      character.transformations[0].image !== '' ? (
        <ul className='flex transformations'>
          {character.transformations.map((transformation) => (
            <li key={transformation.id ?? transformation.trans}>
              <img
                src={transformation.image}
                alt={getNotEmptyStr(transformation.title)}
                title={getNotEmptyStr(transformation.title)}
                // Si la carga de la imagen da error, se carga una imagen genérica
                onError={(event) => {
                  event.currentTarget.classList.add('no-image')
                  event.currentTarget.src = '/assets/images/silueta.png'
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>{NO_INFO_STR}</p>
      ),
    [character]
  )

  return (
    <article className='flex personaje'>
      <h2>{getNotEmptyStr(character.name, true)}</h2>
      <img
        className={
          character.image.includes('silueta.png') ? 'no-image' : undefined
        }
        src={character.image}
        alt={getNotEmptyStr(character.name, true)}
      />
      {getCharacterInfoSection(
        0,
        CHARACTER_INFO_SECTIONS.data.title,
        getCharacterData
      )}
      {getCharacterInfoSection(
        1,
        CHARACTER_INFO_SECTIONS.descr.title,
        getCharacterDescr
      )}
      {getCharacterInfoSection(
        2,
        CHARACTER_INFO_SECTIONS.bio.title,
        getCharacterBio
      )}
      {getCharacterInfoSection(
        3,
        CHARACTER_INFO_SECTIONS.transformations.title,
        getCharacterTransformations
      )}
    </article>
  )
}

export default Character
