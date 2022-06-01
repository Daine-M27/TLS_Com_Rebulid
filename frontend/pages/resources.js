import {getLayout} from '../components/Layout'

export async function getStaticProps() {
  return {
    props: {
      title: 'Resources'
    }
  }
}

export default function Resources() {
  return (
    <>
      
    </>
  )
}

Resources.getLayout = getLayout;