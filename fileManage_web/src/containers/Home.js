import React from 'react'

import {getElements} from '../services/apis'

class Home extends React.Component {

  state = {
    elements: []
  }

  async componentDidMount() {
    const resp = await getElements()
    if (resp) {
      console.log('resp', resp)
      this.setState({
        elements: [...resp]
      })
    }
  }

  render() {
    const {elements} = this.state

    return <div>
      home {elements.length}
    </div>
  }

}

export default Home