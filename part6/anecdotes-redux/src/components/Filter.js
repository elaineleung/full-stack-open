import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.filterChange(event.target.value)
  }
  
  const style = {
    marginBottom: 20
  }

  return (
    <div style={style}>
      Filter: <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  filterChange
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)