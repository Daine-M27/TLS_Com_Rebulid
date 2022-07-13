import Dashboard from '../components/Dashboard'
import { getLayout } from '../components/Layout'


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
     <Dashboard />
    </>
  )
}




DealerZone.getLayout = getLayout;