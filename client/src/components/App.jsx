import React from 'react';
import '../index.css'
import styles from './app.module.css';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.appContainer}>
        <h1>App.js is connected</h1>
      </div>
    )
  }
}

export default App;