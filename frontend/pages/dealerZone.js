import { getLayout } from '../components/Layout'
import { signIn } from 'next-auth/client'
import Login from '../components/Login'

export async function getStaticProps() {
  return {
    props: {
      title: 'Dealer Zone'
    }
  }
}

export default function DealerZone() {
  return (
    <>
      <Login />
    </>
  )
}




DealerZone.getLayout = getLayout;