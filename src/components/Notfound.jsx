import React from 'react'
import '../css/Notfound.css'

const Notfound = () => {
  return (
    <div className="notfound">
    <div>
      <div className="notfound-code">404</div>
      <p className="notfound-glyph">// SIGNAL_LOST · PAGE_NOT_FOUND</p>
      <h2 className="notfound-title">Transmission Interrupted</h2>
      <p className="notfound-msg">
        The page you were looking for has drifted out of range.
        Don't worry — your gadgets are safe. Let's get you back on grid.
      </p>
      <a href="/getproducts" className="notfound-btn">← Return to Base</a>
    </div>
  </div>
  )
}

export default Notfound
