import React from 'react'
// import { useDispatch } from 'react-redux'  hook way
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  // const dispatch = useDispatch()

  const handleChange = (event) => {
    // dispatch(filterChange(event.target.value))
    props.filterChange(event.target.value)   //connect way
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  )
}

// export default Filter

export default connect(
  null, 
  { filterChange }
)(Filter)