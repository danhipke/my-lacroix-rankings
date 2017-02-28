import React from 'react'
import ApricotImage from '../assets/apricot.png'
import './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <img
      alt="This is LaCroix's apricot flavor"
      className='lacroix-flavor'
      src={ApricotImage} />
  </div>
)

export default HomeView
