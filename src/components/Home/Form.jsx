import React from 'react'

const Form = ({ setSearchedProduct }) => {

    const inputProducts = e => {
        setSearchedProduct(e.target.value)
    }

  return (
    <div className='search_box'>
      <form className='input'>
          <input 
          type="text"
          placeholder='Looking for something?'
          onChange={inputProducts}
          />
      </form>
    </div>
  )
}

export default Form