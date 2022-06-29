import styles from '../styles/Login.module.css'
import Link from 'next/link';
import { signIn } from 'next-auth/client'



const Login = () => {
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
          <form className={styles.loginForm}>
            <label htmlFor="userName">Username:</label>
            <input type="text" />
            <label htmlFor="password">Password:</label>
            <input type="text" />
            <br/>
            <br/>
            <input type="submit" value="Login" /> <span className={styles.lostPassword}><Link href='/'>Lost password?</Link></span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login