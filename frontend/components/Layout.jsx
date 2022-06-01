import styles from '../styles/Layout.module.css'


import Header from '../components/Header'

export const Layout = ({children, title}) => {
  return (
    <>
      <Header title={title}/>
      <div className=''>
        <main>{children}</main>
      </div>
    </>
  )
}

export const getLayout = (page, { title }) => {
  return <Layout title={title}>{ page }</Layout>;
}