import { getLayout } from '../components/Layout'
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