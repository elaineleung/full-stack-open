import React from 'react'

const Filter = ({ nameFilter, handleFilterChange}) => 
    <div>
    Filter shown with: <input type="text" value={nameFilter} onChange={handleFilterChange} />          
    </div>
   
export default Filter 