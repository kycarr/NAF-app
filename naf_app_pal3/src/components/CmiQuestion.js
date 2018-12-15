import React, { Component } from 'react';
import Pal3Page from './Pal3Page';
import Cmi5AssignableUnit from './Cmi5AssignableUnit';

class CmiQuestion extends Component {

  render()
  {
    return (
    <Cmi5AssignableUnit>
        <Pal3Page></Pal3Page>
    </Cmi5AssignableUnit> 
    )
  }
 }

  export default CmiQuestion

