import React from 'react'

interface ContainerProps{
    children: React.ReactNode
}

const Container = ({children}: ContainerProps) => {
  return (
    <div className='container w-11/12'>
        {children}
    </div>
  )
}

export default Container
