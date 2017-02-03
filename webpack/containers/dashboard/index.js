import React, { Component } from 'react'
import { connect } from 'react-redux'
import { apiActions, deserialize } from 'redux-jsonapi'
import AppBar from 'material-ui/AppBar'
import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton'

import Feedback from '../../components/feedback'

const deserializeAll = (resource, api) => {
  return Object.values(resource).map(object => deserialize(object, api))
}

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
  }
}

export class Dashboard extends Component {
  state = {
    showFeedback: false
  }

  componentWillMount () {
    this.props.loadCustomers()
    this.props.loadFeedbacks()
    this.props.loadFeedbackStates()
  }

  handleShowFeedback = () => {
    this.setState({showFeedback: true})
  }

  handleHideFeedback = () => {
    this.setState({showFeedback: false})
  }

  handleSaveFeedback = (feedback) => {
    this.props.saveFeedback(feedback)
    this.handleHideFeedback()
  }

  renderFeedbackButton () {
    return (
      <FlatButton
        label='New Feedback'
        onTouchTap={this.handleShowFeedback}
      />
    )
  }

  renderFeedback () {
    return (
      <Feedback
        customers={this.props.customers}
        feedbackStates={this.props.feedbackStates}
        open={this.state.showFeedback}
        onCancel={this.handleHideFeedback}
        onSave={this.handleSaveFeedback}
      />
    )
  }

  render () {
    return (
      <div style={styles.root}>
        <AppBar
          title='Dashboard'
          iconElementRight={this.renderFeedbackButton()}
        />
        {this.renderFeedback()}
        {this.props.feedbacks.map((feedback, index) => (
          <div key={index} style={styles.card}>
            <Chip>
              5
            </Chip>
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
    customers: deserializeAll(api.customers, api),
    feedbacks: deserializeAll(api.feedbacks, api),
    feedbackStates: deserializeAll(api.feedbackStates, api)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadFeedbacks: () => {
      dispatch(apiActions.read({ _type: 'feedbacks' }))
    },
    loadFeedbackStates: () => {
      dispatch(apiActions.read({ _type: 'feedbackStates' }))
    },
    loadCustomers: () => {
      dispatch(apiActions.read({ _type: 'customers' }))
    },
    saveFeedback: (feedback) => {
      dispatch(apiActions.write(feedback))
    }
  }
}

export default connect(select, mapDispatchToProps)(Dashboard)
