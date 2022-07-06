import React from 'react'
import { getLayout } from '../../components/Layout'

export async function getStaticProps() {
  return {
    props: {
      title: 'Dealer Zone'
    }
  }
}

const user = () => {


  return (
    <></>
  )
}
user.getLayout = getLayout;

export default user