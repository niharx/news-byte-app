import React, { Component } from 'react'
import loading from '../loading.gif'

export class Spinner extends Component {
    render() {
        return (
            <div className="text-center my-5" style={{
                display:'flex',justifyContent:'center',alignItems:'center'
            }}>
                <img src={loading} alt="loading" width={`100px`} height={`100px`}/>
            </div>
        )
    }
}

export default Spinner
