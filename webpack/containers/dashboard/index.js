import React, { Component } from 'react'
import { connect } from 'react-redux'
import { apiActions, deserialize } from 'redux-jsonapi'

const styles = {
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  card: {
    backgroundColor: '#dddddd',
    padding: 10,
    borderRadius: 5,
    margin: '3%',
    width: '30%',
    maxHeight: 200,
    overflow: 'hidden',
    textOverflow: 'clip ellipsis'
  },
  chip: {
    float: 'right',
    backgroundColor: '#aaaaaa',
    padding: '6px 10px',
    borderRadius: 16,
    display: 'inline',
    color: '#ffffff',
    margin: '0 0 5px 5px'
  }
}

export class Dashboard extends Component {
  componentWillMount () {
    this.props.loadFeedbacks()
  }

  render () {
    return (
      <div style={styles.root}>
        {this.props.feedbacks.map((feedback, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.chip}>
              {feedback.tickets().length}
            </div>
            {feedback.description}
          </div>
        ))}
      </div>
    )
  }
}

function select (state, props) {
  const { api } = state
  return {
    feedbacks: Object.values(api.feedbacks || {}).map(feedback => deserialize(feedback, api))
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadFeedbacks: () => {
      dispatch(apiActions.read({ _type: 'feedbacks' }, { params: { include: 'tickets' } }))
    }
  }
}

export default connect(select, mapDispatchToProps)(Dashboard)
