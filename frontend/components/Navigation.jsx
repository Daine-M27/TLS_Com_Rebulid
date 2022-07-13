import Link from 'next/link'

import styles from '../styles/Navigation.module.css'

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li className={styles.navlink}>
          <Link href='/'>Products</Link>
        </li>
        <li className={styles.navlink}>
          <Link href='/dealers'>Dealers</Link>
        </li>
        <li className={styles.navlink}>
          <Link href='/resources'>Resources</Link>
        </li>
        <li className={styles.navlink}>
          <Link href='/contact'>Contact</Link>
        </li>
        <li className={`${styles.navlink} ${styles.special}`}>
          <Link href='/dashboard'>Dealer Zone</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation