import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { readCard, readDeck, updateCard } from '../utils/api'

export default function EditCard({ selectedDeck, setSelectedDeck }) {
  const history = useHistory()
  const [selectedCard, setSelectedCard] = useState([])
  const { deckId, cardId } = useParams()
  useEffect(() => {
    const abortController = new AbortController()
    readDeck(deckId, abortController.signal).then((deck) => {
      setSelectedDeck(deck)
      readCard(cardId, abortController.signal).then(setSelectedCard)
    })
  }, [deckId, cardId])

  const handleChange = ({ target }) => {
    setSelectedCard({
      ...selectedCard,
      [target.name]: target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateCard(selectedCard)
    history.push(`/decks/${selectedDeck.id}`)
  }

  return (
    <div className='container'>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <i className='fas fa-home'></i> Home
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            <Link to={`/decks/${selectedDeck.id}`}>{selectedDeck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            {'Edit Card ' + cardId}
          </li>
        </ol>
      </nav>
      <h3>Edit Card</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='front'>Front</label>
          <textarea
            className='form-control'
            name='front'
            id='front'
            type='text'
            value={selectedCard.front}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='back'>Back</label>
          <textarea
            className='form-control'
            name='back'
            id='back'
            type='text'
            value={selectedCard.back}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className='buttons mb-3'>
          <Link
            to={`/decks/${selectedDeck.id}`}
            className='btn btn-secondary mr-2'
          >
            Cancel
          </Link>
          <button type='submit' className='btn btn-primary'>
            Save
          </button>
        </div>
      </form>
    </div>
  )
}