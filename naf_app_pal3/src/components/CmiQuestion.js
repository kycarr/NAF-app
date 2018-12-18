import React, { Component } from 'react'
import Pal3Page from './Pal3Page'
import Cmi5AU from 'react-cmi5'

class CmiQuestion extends Component {

  render()
  {
    return (
    <Cmi5AU>
        <Pal3Page></Pal3Page>
    </Cmi5AU> 
    )
  }
 }

  export default CmiQuestion

