import Dashboard from '../components/Dashboard'
import { getLayout } from '../components/Layout'


export async function getStaticProps() {
  return {
    props: {
      title: 'Dealer Zone'
    }
  }
}

export default function DealerZonexxx() {
  return (
    <>
     <Dashboard />
    </>
  )
}




DealerZonexxx.getLayout = getLayout;