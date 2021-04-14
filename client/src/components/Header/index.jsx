import React, { useState } from 'react';
import styles from './header.module.css';

const Header = () => {
  const [inputs, setInputs] = useState({
    search: '',
  })

  const inputHandleChange = () => {

  }

  const search = (e) => {
    e.preventDefault()
    console.log({inputs})
  }
  return (
    <header className={styles.header}>
      <div className='div-logo'>
        <h1 className='header'>Logo</h1>
      </div>
      <div className='div-input'>
        <form onSubmit={search}>
          <input type='text' name='search' value={inputs.search} onChange={inputHandleChange}/>
        </form>
      </div>
    </header>
  )
}

export default Header;