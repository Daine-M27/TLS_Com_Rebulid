import { useState } from 'react'
import { getLayout } from '../components/Layout'
import styles from '../styles/Login.module.css'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/router";

export async function getStaticProps() {
  return {
    props: {
      title: 'Login'
    }
  }
}

export default function Login() {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const credentials = { username, password }
  
      const user = await axios.post('/api/auth/login', credentials)
      if (user.status === 200) {
        router.push('/dealerZone/user')
      }
    }
  
    return (
      <div className={styles.row}>
        <div className={styles.columnLarge}>
          <div className ={styles.columnLargeInner}>
            <p>
              Dealers can&nbsp; 
              <strong>
                place orders, check prices, track orders, see invoices, order history
              </strong>
                &nbsp;and more. All information is updated hourly.
            </p>
            <p>
              Want to become a dealer?
            </p>
            <p>
              Here's our <Link href='/'>dealer appication</Link> pdf.
            </p>
          </div>
        </div>
        <div className={styles.columnSmall}>
          <div className={styles.columnSmallInner}>
            <form className={styles.loginForm} onSubmit={(e) => { handleSubmit(e)}}>
              <label htmlFor="userName">Username:</label>
              <input type="text" name="username" id="username" onChange={(e) => { setUsername(e.target.value) }}/>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" onChange={(e) => { setPassword(e.target.value) }}/>
              <br/>
              <br/>
              <input type="submit" value="Login" /> 
              <span className={styles.lostPassword}><Link href='/'>Lost password?</Link></span>
            </form>
          </div>
        </div>
      </div>
    );
}

Login.getLayout = getLayout;