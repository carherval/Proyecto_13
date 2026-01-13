import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ERROR_MSG } from '../DragonBall'
import Character from './Character/Character'
import Filter, {
  GENRE_FILTER_OPTIONS,
  PLANET_FILTER_OPTIONS,
  RACE_FILTER_OPTIONS,
  TRANSFORMATION_FILTER_OPTIONS
} from './Filter/Filter'
import Loader from './Loader/Loader'
import useFetch from '../hooks/useFetch'
import Error from '../pages/Error'

export const NO_INFO_STR = 'No hay información disponible'
const UNKNOWN_NAME = 'Nombre desconocido'

// Secciones de información de los personajes
export const CHARACTER_INFO_SECTIONS = {
  data: { id: 'data', title: 'Datos básicos' },
  descr: { id: 'descr', title: 'Descripción' },
  bio: { id: 'bio', title: 'Biografía' },
  transformations: { id: 'transformations', title: 'Transformaciones' }
}

// Campos de información de la sección "Datos básicos" de los personajes
export const CHARACTER_DATA_FIELD_LABELS = {
  name: { id: 'name', title: 'Nombre' },
  genre: { id: 'genre', title: 'Género' },
  race: { id: 'race', title: 'Raza' },
  planet: { id: 'planet', title: 'Planeta' }
}

export const COLLAPSIBLE_OPTIONS = {
  open: 'Mostrar',
  close: 'Ocultar'
}

export const getNotEmptyStr = (str, isNameCharacter = false) =>
  str != null && str.trim() !== ''
    ? str
    : !isNameCharacter
    ? NO_INFO_STR
    : UNKNOWN_NAME

/* Devuelve los personajes de la saga filtrados por un campo de información de la sección "Datos básicos" del personaje
filteredCharacters: listado de personajes filtrados
characterDataFieldId: identificador del campo de información
filterOptions: opciones de selección en el filtro para el campo de información
filterValues: valores admitidos de la opción elegida para filtrar el listado de personajes
othersId: identificador de la opción "Otros" del campo de información */
const getFilteredSagaCharactersByCharacterDataField = (
  filteredCharacters,
  characterDataFieldId,
  filterOptions,
  filterValues,
  othersId
) => {
  // Expresión regular que evalúa si el valor del campo de información de la sección "Datos básicos" del personaje cumple con los valores admitidos de la opción elegida
  const regExp = new RegExp(
    filterOptions[filterValues[characterDataFieldId]].value,
    'i'
  )

  // Si la opción elegida en el filtro no es "Otros", se filtran los personajes de la saga que cumplen los valores admitidos de la opción seleccionada en el filtro
  // Si la opción elegida en el filtro es "Otros", se filtran los personajes de la saga que cumplen cualquier valor diferente a los valores admitidos de la opción seleccionada en el filtro
  return filteredCharacters.filter((character) =>
    filterValues[characterDataFieldId] !== othersId
      ? regExp.test(character[characterDataFieldId])
      : !regExp.test(character[characterDataFieldId])
  )
}

// Componente que muestra el listado de personajes de una saga
export const SagaCharactersFetch = ({ sagaId }) => {
  const NO_RESULTS_STR = 'No hay resultados'

  const h2 = document.querySelector('h2')
  h2?.classList.remove('oculto')

  const { data, filteredData, setFilteredData, isLoading, isError } = useFetch(
    `https://dragonballapp.vercel.app/${sagaId}`
  )

  // Devuelve el filtrado de personajes de una saga en función de las opciones elegidas en el filtro
  const getFilteredSagaCharacters = useCallback(
    (filterValues) => {
      let filteredCharacters = data

      // Filtrado por el nombre del personaje
      if (filterValues.name !== '') {
        filteredCharacters = filteredCharacters.filter((character) =>
          new RegExp(filterValues.name, 'i').test(
            getNotEmptyStr(character.name, true)
          )
        )
      }

      // Filtrado por el género del personaje
      if (filterValues.genre !== GENRE_FILTER_OPTIONS.allGenres.id) {
        filteredCharacters = getFilteredSagaCharactersByCharacterDataField(
          filteredCharacters,
          CHARACTER_DATA_FIELD_LABELS.genre.id,
          GENRE_FILTER_OPTIONS,
          filterValues,
          GENRE_FILTER_OPTIONS.otherGenres.id
        )
      }

      // Filtrado por la raza del personaje
      if (filterValues.race !== RACE_FILTER_OPTIONS.allRaces.id) {
        filteredCharacters = getFilteredSagaCharactersByCharacterDataField(
          filteredCharacters,
          CHARACTER_DATA_FIELD_LABELS.race.id,
          RACE_FILTER_OPTIONS,
          filterValues,
          RACE_FILTER_OPTIONS.otherRaces.id
        )
      }

      // Filtrado por el planeta del personaje
      if (filterValues.planet !== PLANET_FILTER_OPTIONS.allPlanets.id) {
        filteredCharacters = getFilteredSagaCharactersByCharacterDataField(
          filteredCharacters,
          CHARACTER_DATA_FIELD_LABELS.planet.id,
          PLANET_FILTER_OPTIONS,
          filterValues,
          PLANET_FILTER_OPTIONS.otherPlanets.id
        )
      }

      // Filtrado por las transformaciones del personaje
      if (
        filterValues.transformations !== TRANSFORMATION_FILTER_OPTIONS.both.id
      ) {
        filteredCharacters = filteredCharacters.filter((character) =>
          filterValues.transformations === TRANSFORMATION_FILTER_OPTIONS.yes.id
            ? character.transformations[0].image != null &&
              character.transformations[0].image !== ''
            : character.transformations[0].image == null ||
              character.transformations[0].image === ''
        )
      }

      setFilteredData(filteredCharacters)
    },
    [data]
  )

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    h2?.classList.add('oculto')

    return <Error errorMsg={ERROR_MSG.error} />
  }

  return (
    <>
      <section className='filter'>
        <Filter getFilteredSagaCharacters={getFilteredSagaCharacters} />
      </section>
      <section
        className={`flex${filteredData.length === 0 ? ' no-characters' : ''}`}
      >
        {filteredData.length > 0 ? (
          // Listado de personajes de la saga en orden alfabético
          <ul className='flex personajes'>
            {[...filteredData]
              .sort((character1, character2) =>
                getNotEmptyStr(character1.name, true).localeCompare(
                  getNotEmptyStr(character2.name, true)
                )
              )
              .map((character) => (
                <li key={character.id} className='flex'>
                  <Link to={`${character.id}`}>
                    {getNotEmptyStr(character.name, true)}
                  </Link>
                </li>
              ))}
          </ul>
        ) : (
          <div className='flex'>
            <p>{NO_RESULTS_STR}</p>
          </div>
        )}
      </section>
    </>
  )
}

// Componente que muestra un personaje
export const CharacterFetch = ({ sagaId, characterId }) => {
  const { data, isLoading, isImageLoaded, isError } = useFetch(
    `https://dragonballapp.vercel.app/${sagaId}/${characterId}`,
    true
  )

  // "data" es un array de un elemento (personaje)
  return isLoading || !isImageLoaded ? (
    <Loader />
  ) : isError ? (
    <Error errorMsg={ERROR_MSG.error} />
  ) : data[0].id == null ? (
    <Error errorMsg={ERROR_MSG.character} />
  ) : (
    <Character character={data[0]} />
  )
}
