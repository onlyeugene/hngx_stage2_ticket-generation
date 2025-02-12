import React from 'react'
import Logo from './logo'
import Container from './container'
import UserMenu from './user-menu'
import Tickets from './tickets'

const Navbar = () => {
  return (
    <div className='py-5 fixed w-full z-20'>
      <Container>
        <div className='flex justify-between items-center border px-5 py-3 rounded-2xl border-primary bg-[#05252c82] z-10'>
        <Logo />
        <UserMenu />
        <Tickets />
        </div>
      </Container>
    </div>
  )
}

export default Navbar
