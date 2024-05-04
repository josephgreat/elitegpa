import React from 'react'
import { Navbar } from './components'

const PageWrapper = ({Component}) => {
  return (
    <>
        <Navbar />
        <Component />
    </>
  )
}

export default PageWrapper