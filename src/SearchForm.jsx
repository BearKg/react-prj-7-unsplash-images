import React, { useState } from 'react'
import { useGlobalContext } from './context'

const SearchForm = () => {
  const [image, setImage] = useState('')
  const {setSearchValue} = useGlobalContext()
  const handleSubmit = (e) => { //target hiện tại là form
    e.preventDefault()
    const newValue = e.target.elements.search.value
    if (!newValue) return 
    setSearchValue(newValue)
  }
  return (
    <section>
      <h1 className="title">unsplash images</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          name="search"
          placeholder="cat"
          className="form-input search-input"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </section>
  )
}

export default SearchForm
