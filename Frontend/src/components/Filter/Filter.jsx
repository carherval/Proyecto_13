import './Filter.css'

import React, { useEffect, useMemo, useReducer } from 'react'
import { useLocation } from 'react-router-dom'
import { DRAGON_BALL_SECTIONS } from '../../DragonBall'
import {
  CHARACTER_DATA_FIELD_LABELS,
  CHARACTER_INFO_SECTIONS,
  COLLAPSIBLE_OPTIONS
} from '../Fetch'
import filterValuesReducer from '../../reducers/filterValuesReducer'
import toggleCollapsibleReducer from '../../reducers/toggleCollapsibleReducer'

const NO_FILTER_STR = 'No hay filtros disponibles'

const FILTER_OPTION_COMMON_LABELS = {
  all: 'Todos',
  unknown: 'Desconocido',
  others: 'Otros'
}

// Valores admitidos para las opciones de los campos de información del filtro
const FILTER_OPTION_VALUE_STRS = {
  angel: 'angel|ángel',
  heaven: 'cielo',
  unknown: 'desconocid',
  god: 'dios',
  no: 'false',
  female: 'femenino',
  warrior: 'guerrero',
  human: 'human|terr',
  male: 'masculino',
  namek: 'namek|nameck',
  saiyajin: 'saiy|shay',
  earth: 'tierra',
  yes: 'true',
  universe: 'universo',
  vegeta: 'vegeta|vejeta'
}

// Opciones en el filtro para el campo de información "Género" del personaje
export const GENRE_FILTER_OPTIONS = {
  allGenres: {
    id: 'allGenres',
    title: FILTER_OPTION_COMMON_LABELS.all,
    value: ''
  },
  male: {
    id: 'male',
    title: 'Masculino',
    value: FILTER_OPTION_VALUE_STRS.male
  },
  female: {
    id: 'female',
    title: 'Femenino',
    value: FILTER_OPTION_VALUE_STRS.female
  },
  otherGenres: {
    id: 'otherGenres',
    title: FILTER_OPTION_COMMON_LABELS.others,
    value: `${FILTER_OPTION_VALUE_STRS.male}|${FILTER_OPTION_VALUE_STRS.female}`
  }
}

// Opciones en el filtro para el campo de información "Raza" del personaje
export const RACE_FILTER_OPTIONS = {
  allRaces: {
    id: 'allRaces',
    title: FILTER_OPTION_COMMON_LABELS.all,
    value: ''
  },
  angel: { id: 'angel', title: 'Ángel', value: FILTER_OPTION_VALUE_STRS.angel },
  unknownRace: {
    id: 'unknownRace',
    title: FILTER_OPTION_COMMON_LABELS.unknown,
    value: FILTER_OPTION_VALUE_STRS.unknown
  },
  god: { id: 'god', title: 'Dios', value: FILTER_OPTION_VALUE_STRS.god },
  warrior: {
    id: 'warrior',
    title: 'Guerrero',
    value: FILTER_OPTION_VALUE_STRS.warrior
  },
  human: {
    id: 'human',
    title: 'Humano',
    value: FILTER_OPTION_VALUE_STRS.human
  },
  namekian: {
    id: 'namekian',
    title: 'Namekiano',
    value: FILTER_OPTION_VALUE_STRS.namek
  },
  saiyajin: {
    id: 'saiyajin',
    title: 'Saiyajin',
    value: FILTER_OPTION_VALUE_STRS.saiyajin
  },
  otherRaces: {
    id: 'otherRaces',
    title: FILTER_OPTION_COMMON_LABELS.others,
    value: `${FILTER_OPTION_VALUE_STRS.angel}|${FILTER_OPTION_VALUE_STRS.unknown}|${FILTER_OPTION_VALUE_STRS.god}|${FILTER_OPTION_VALUE_STRS.warrior}|${FILTER_OPTION_VALUE_STRS.human}|${FILTER_OPTION_VALUE_STRS.namek}|${FILTER_OPTION_VALUE_STRS.saiyajin}`
  }
}

// Opciones en el filtro para el campo de información "Planeta" del personaje
export const PLANET_FILTER_OPTIONS = {
  allPlanets: {
    id: 'allPlanets',
    title: FILTER_OPTION_COMMON_LABELS.all,
    value: ''
  },
  heaven: {
    id: 'heaven',
    title: 'Cielo',
    value: FILTER_OPTION_VALUE_STRS.heaven
  },
  unknownPlanet: {
    id: 'unknownPlanet',
    title: FILTER_OPTION_COMMON_LABELS.unknown,
    value: FILTER_OPTION_VALUE_STRS.unknown
  },
  namek: { id: 'namek', title: 'Namek', value: FILTER_OPTION_VALUE_STRS.namek },
  earth: {
    id: 'earth',
    title: 'Tierra',
    value: FILTER_OPTION_VALUE_STRS.earth
  },
  universe: {
    id: 'universe',
    title: 'Universo',
    value: FILTER_OPTION_VALUE_STRS.universe
  },
  vegeta: {
    id: 'vegeta',
    title: 'Vegeta',
    value: FILTER_OPTION_VALUE_STRS.vegeta
  },
  otherPlanets: {
    id: 'otherPlanets',
    title: FILTER_OPTION_COMMON_LABELS.others,
    value: `${FILTER_OPTION_VALUE_STRS.heaven}|${FILTER_OPTION_VALUE_STRS.unknown}|${FILTER_OPTION_VALUE_STRS.namek}|${FILTER_OPTION_VALUE_STRS.earth}|${FILTER_OPTION_VALUE_STRS.universe}|${FILTER_OPTION_VALUE_STRS.vegeta}`
  }
}

// Opciones en el filtro para la sección de información "Transformaciones" del personaje
export const TRANSFORMATION_FILTER_OPTIONS = {
  both: { id: 'both', title: FILTER_OPTION_COMMON_LABELS.all, value: '' },
  yes: { id: 'yes', title: 'Sí', value: FILTER_OPTION_VALUE_STRS.yes },
  no: { id: 'no', title: 'No', value: FILTER_OPTION_VALUE_STRS.no }
}

const FILTER_FIELD_OPTIONS = {
  name: {},
  genre: GENRE_FILTER_OPTIONS,
  race: RACE_FILTER_OPTIONS,
  planet: PLANET_FILTER_OPTIONS,
  transformations: TRANSFORMATION_FILTER_OPTIONS
}

const FILTER_VALUES_INITIAL_STATE = {
  filterValues: {
    name: '',
    genre: GENRE_FILTER_OPTIONS.allGenres.id,
    race: RACE_FILTER_OPTIONS.allRaces.id,
    planet: PLANET_FILTER_OPTIONS.allPlanets.id,
    transformations: TRANSFORMATION_FILTER_OPTIONS.both.id
  }
}

const TOGGLE_COLLAPSIBLE_INITIAL_STATE = { isOpened: [false] }

// Componente que pinta el formulario del filtro
const Filter = React.memo(({ getFilteredSagaCharacters }) => {
  const filterTitle = `Filtrado de ${
    useLocation().pathname !== `/${DRAGON_BALL_SECTIONS.dragons.id}`
      ? 'personajes'
      : 'dragones'
  }`

  // Se reordenan los campos del filtro (nombre, transformaciones, género, raza y planeta) y se asocia a cada uno sus opciones de selección en el filtro
  const filterFields = [
    CHARACTER_DATA_FIELD_LABELS.name,
    CHARACTER_INFO_SECTIONS.transformations,
    ...Object.values(CHARACTER_DATA_FIELD_LABELS).filter(
      (filterField) => filterField.id !== CHARACTER_DATA_FIELD_LABELS.name.id
    )
  ].map((filterField) => ({
    ...filterField,
    options: FILTER_FIELD_OPTIONS[filterField.id]
  }))

  const [filterValuesState, dispatchFilterValues] = useReducer(
    filterValuesReducer,
    FILTER_VALUES_INITIAL_STATE
  )
  // Desplegable del filtro
  const [toggleCollapsibleState, dispatchToggleCollapsible] = useReducer(
    toggleCollapsibleReducer,
    TOGGLE_COLLAPSIBLE_INITIAL_STATE
  )

  const getTextField = (id, label) => (
    <>
      <label className='negrita' htmlFor={id}>
        {label}:
      </label>
      <input
        id={id}
        className='txt-fld'
        type='text'
        name={id}
        autoComplete='on'
        onChange={(event) =>
          dispatchFilterValues({
            payload: { filterFieldId: id, filterFieldValue: event.target.value }
          })
        }
      />
    </>
  )

  const getRadioButtonGroup = (groupName, options) =>
    Object.values(options).map((option) => (
      <React.Fragment key={option.id}>
        <input
          id={option.id}
          className='rd-btn'
          type='radio'
          name={groupName}
          value={option.id}
          checked={option.id === filterValuesState.filterValues[groupName]}
          onChange={(event) =>
            dispatchFilterValues({
              payload: {
                filterFieldId: groupName,
                filterFieldValue: event.target.value
              }
            })
          }
        />
        <label
          tabIndex={0}
          className='flex'
          htmlFor={option.id}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              document.getElementById(option.id).click()
            }
          }}
        >
          {option.title}
        </label>
      </React.Fragment>
    ))

  const getFilterForm = useMemo(
    () => (
      <form className='flex' onSubmit={(event) => event.preventDefault()}>
        {filterFields.map((filterField) => (
          <fieldset key={filterField.id} className='flex'>
            <legend className='oculto'>{filterField.title}</legend>
            <div className='flex'>
              {filterField.id === CHARACTER_DATA_FIELD_LABELS.name.id ? (
                getTextField(filterField.id, filterField.title)
              ) : (
                <>
                  <span>{filterField.title}:</span>
                  {getRadioButtonGroup(filterField.id, filterField.options)}
                </>
              )}
            </div>
          </fieldset>
        ))}
      </form>
    ),
    [filterValuesState.filterValues]
  )

  // Filtrado de los personajes de la saga al cambiar la opción seleccionada de un campo del filtro
  useEffect(() => {
    getFilteredSagaCharacters(filterValuesState.filterValues)
  }, [filterValuesState.filterValues, getFilteredSagaCharacters])

  return (
    <>
      <h3
        tabIndex={0}
        className={toggleCollapsibleState.isOpened[0] ? 'opened' : undefined}
        title={`${
          !toggleCollapsibleState.isOpened[0]
            ? COLLAPSIBLE_OPTIONS.open
            : COLLAPSIBLE_OPTIONS.close
        } ${filterTitle}`}
        onClick={() => dispatchToggleCollapsible({ payload: { index: 0 } })}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            dispatchToggleCollapsible({ payload: { index: 0 } })
          }
        }}
      >
        {filterTitle}
      </h3>
      <div
        className={!toggleCollapsibleState.isOpened[0] ? 'oculto' : undefined}
      >
        {useLocation().pathname !== `/${DRAGON_BALL_SECTIONS.dragons.id}` ? (
          getFilterForm
        ) : (
          <p className='negrita'>{NO_FILTER_STR}</p>
        )}
      </div>
    </>
  )
})

export default Filter
