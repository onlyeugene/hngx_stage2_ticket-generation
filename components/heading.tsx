import React from 'react'

interface HeadingProps{
    title: string;
    subtitle: string;
}

const Heading = ({title, subtitle}: HeadingProps) => {
  return (
    <div className='flex md:flex-row flex-col md:justify-between md:items-center items-start text-white'>
        <h1 className='md:text-[32px] text-2xl font-normal'>{title}</h1>
        <p>{subtitle}</p>
    </div>
  )
}

export default Heading
