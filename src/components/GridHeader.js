import React from 'react'
import { pxToVw, pxToRem } from '../utils/theme'


function GridHeader() {
    return (     
        <div style={{
            marginTop: pxToRem(30),    
            marginLeft: pxToVw(30),               
            width: pxToRem(141),
            height: pxToRem(31),
            fontSize: pxToRem(28),
            fontVariant: 'normal',
            fontFamily: 'Ubuntu, sans-serif',
            lineHeight: pxToRem(32),
            letterSpacing: '0px',
            color: '#FFFFFF',               
            opacity: 1,
        }}
        >
            Invoice List    
        </div>
    )
}

// Exporting the component
export default GridHeader

