import Head from 'next/head'
import Image from 'next/image'
import {getLayout} from '../components/Layout'

export async function getStaticProps() {
  return {
    props: {
      title: 'Products'
    }
  }
}

export default function Home() {
  return (
    <>
      
    </>
  )
}

Home.getLayout = getLayout;