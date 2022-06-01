import styles from '../styles/Header.module.css'

import Navigation from '../components/Navigation'

const Header = ({title}) => {
  return (
    <div id='header'>
      <Navigation />
      <h1>{title}</h1>
    </div>
  )
}

export default Header