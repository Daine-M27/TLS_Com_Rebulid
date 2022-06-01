import {getLayout} from '../components/Layout'

export async function getStaticProps() {
  return {
    props: {
      title: 'Contact'
    }
  }
}

export default function Contact() {
  return (
    <>
      
    </>
  )
}

Contact.getLayout = getLayout;