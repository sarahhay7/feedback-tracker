import React, { Component } from 'react'
import { connect } from 'react-redux'
import { apiActions, deserialize } from 'redux-jsonapi'
import AppBar from 'material-ui/AppBar'
import Chip from 'material-ui/Chip'
import Badge from 'material-ui/Badge'
import FlatButton from 'material-ui/FlatButton'

import './index.scss'
import Feedback from '../../components/feedback'

const deserializeAll = (resource, api) => {
  return Object.values(resource).map(object => deserialize(object, api))
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

  sortedFeedbacks () {
    return this.props.feedbacks.sort((a, b) => b.weighting - a.weighting)
  }

  render () {
    return (
      <div className='dashboard'>
        <AppBar
          title='Dashboard'
          iconElementRight={this.renderFeedbackButton()}
        />
        {this.renderFeedback()}
        <div className='feedback-collection'>
          {this.sortedFeedbacks().map((feedback, index) => (
            <div key={index} className='feedback'>
              <div className='description'>
                {feedback.description}

                <div className='tags'>
                  {feedback.tags.map((tag, i) => <Chip key={i}>{tag}</Chip>)}
                </div>
              </div>
              <div className='weighting'>{feedback.weighting}</div>
            </div>
          ))}
        </div>
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
