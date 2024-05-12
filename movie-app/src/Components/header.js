import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class header extends Component {
  render() {
    return (
      <div style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'space-between' }}>
        <Link to={'/'} style={{ textDecoration: 'none' }}><div className='header-options'>
          <h1 style={{
            color: 'white', fontFamily: "Cormorant Garamond"
          }}>
            BingeWatch
          </h1>
        </div></Link>

        <Link to={'/favourites'} style={{ textDecoration: 'none' }}>
          <div className='header-options'>
            <h1 style={{
              color: 'white', fontFamily: "Cormorant Garamond"
            }}>
              Favourites
            </h1>
          </div>
        </Link>
      </div>
    )
  }
}
