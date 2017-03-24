import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div className='header'>
    <h1>LaCroix Flavor Pyramid</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    <img
      src='/images/illuminati.png'
      draggable='false'
      style={{ width: '140px', marginRight: '20px', marginLeft: '20px' }} />
    <Link to='/results' activeClassName='route--active'>
      Results
    </Link>
  </div>
)

export default Header
