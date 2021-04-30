import React, { useState } from 'react';
import styles from './header.module.css';

const Header = () => {
  const [inputs, setInputs] = useState({
    search: '',
  });

  const inputHandleChange = () => {

  };

  const search = (e) => {
    e.preventDefault();
    console.log({ inputs });
  };
  return (
    <header className={styles.header}>
      <div className={styles.divHeader}>
        <h1 className={styles.h1}><i className="fas fa-cat fa-lg"></i></h1>
      </div>
      <div className={styles.divForm}>
        <form onSubmit={search}>
          <input
            type="text"
            name="search"
            value={inputs.search}
            onChange={inputHandleChange}
            className={styles.input}
          />
        </form>
        <i className={`fas fa-search ${styles.icon}`} />
      </div>
    </header>
  );
};

export default Header;
