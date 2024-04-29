import React, { Component } from 'react'

export default class header extends Component {
  render() {
    return (
      <div style={{ backgroundColor: 'black', display: 'flex', justifyContent:'space-between' }}>
        <div className='header-options'>
          <h1 style={{
            color: 'white', fontFamily:"Cormorant Garamond"
          }}>
            BingeWatch
          </h1>
        </div>
        <div className='header-options'>
          <h1 style={{
            color: 'white', fontFamily: "Cormorant Garamond"
          }}>
            Favourites
          </h1>
        </div>
      </div>
    )
  }
}
