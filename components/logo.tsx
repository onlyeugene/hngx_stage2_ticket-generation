import Image from 'next/image'
import React from 'react'

import ticket from '../public/logo.svg'
import logo from '../public/ticz.svg'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href='/' className='flex items-center gap-3'>
        <Image src={ticket} alt='ticket' width={50} height={50} className='bg-secondary py-2 px-4 rounded-xl border-primary border'/>
        <Image src={logo} alt='logo'/>
    </Link>
  )
}

export default Logo
