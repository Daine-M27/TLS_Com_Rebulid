import {getLayout} from '../components/Layout'

export async function getStaticProps() {
  return {
    props: {
      title: 'Dealers'
    }
  }
}

export default function Dealers() {
  return (
    <>
      
    </>
  )
}

Dealers.getLayout = getLayout;