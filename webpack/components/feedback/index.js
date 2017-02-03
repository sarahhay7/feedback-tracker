import React, { Component, PropTypes } from 'react'
import ChipInput from 'material-ui-chip-input'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'

export default class DialogExampleModal extends Component {

  static propTypes = {
    customers: PropTypes.array.isRequired,
    feedback: PropTypes.object,
    feedbackStates: PropTypes.array.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  }

  state = {}

  componentWillReceiveProps (props) {
    this.setState({
      ...props.feedback,
      feedbackStateId: this.getFeedbackStateId(props),
      customers: this.mapToCustomerDataSource(this.getCustomers(props)),
      tags: this.getTags(props),
      tickets: this.getTickets(props)
    })
  }

  getFeedbackStateId ({ feedback: { feedbackState } = {}, feedbackStates }) {
    return feedbackState &&
      (feedbackState() || {}).id ||
      (feedbackStates[0] || {}).id
  }

  getCustomers ({ feedback: { customers } = {} }) {
    return customers && customers()
  }

  getTickets ({ feedback: { tickets } = {} }) {
    return tickets && tickets()
  }

  getTags ({ feedback: { tags = [] } = {} }) {
    return tags
  }

  mapToCustomerDataSource (customers = []) {
    return customers.map(customer =>
      ({ ...customer, title: `${customer.name} <${customer.email}>` })
    )
  }

  handleInputChange (field, { target: { value } }) {
    this.setState({ [field]: value })
  }

  handleSelectChange (field, event, index, value) {
    this.setState({ [field]: value })
  }

  handleCustomerAdd (value) {
    const customers = [...this.state.customers, value]
    this.setState({ customers })
  }

  handleCustomerDelete (value) {
    const customers = this.state.customers.filter(({ id }) => id !== value)
    this.setState({ customers })
  }

  handleTicketAdd (value) {
    const tickets = [...this.state.tickets, value]
    this.setState({ tickets })
  }

  handleTicketDelete (value) {
    const tickets = this.state.tickets.filter(({ id }) => id !== value)
    this.setState({ tickets })
  }

  handleTagAdd (value) {
    const tags = [...this.state.tags, value]
    this.setState({ tags })
  }

  handleTagDelete (value) {
    const tags = this.state.tags.filter(tag => tag !== value)
    this.setState({ tags })
  }

  handleSave () {
    const { id, description, customers, feedbackStateId, importanceMutation, tags, tickets } = this.state
    this.props.onSave({
      _type: 'feedbacks',
      id,
      description,
      importanceMutation,
      feedbackState: () => ({ _type: 'feedback_states', id: feedbackStateId }),
      customers: () => customers,
      tags,
      tickets: () => tickets
    })
  }

  renderActions () {
    return [
      <FlatButton
        label='Cancel'
        onTouchTap={this.props.onCancel}
      />,
      <FlatButton
        label='Save'
        primary
        onTouchTap={this.handleSave.bind(this)}
      />
    ]
  }

  renderStateOption ({ id, name }) {
    return (
      <MenuItem key={id} value={id} primaryText={name} />
    )
  }

  render () {
    return (
      <Dialog
        title={`${this.state.id ? 'Edit' : 'New'} Feedback`}
        actions={this.renderActions()}
        modal
        open={!!this.props.feedback}
      >
        <form>
          <TextField
            floatingLabelText='Description'
            onChange={this.handleInputChange.bind(this, 'description')}
            value={this.state.description}
            multiLine
            rows={2}
            rowsMax={2}
            fullWidth
          /><br />
          <SelectField
            floatingLabelText='State'
            onChange={this.handleSelectChange.bind(this, 'feedbackStateId')}
            value={this.state.feedbackStateId}
          >
            {this.props.feedbackStates.map(this.renderStateOption, this)}
          </SelectField><br />
          <ChipInput
            floatingLabelText='Customers'
            dataSourceConfig={{ text: 'title', value: 'id' }}
            dataSource={this.mapToCustomerDataSource(this.props.customers)}
            onRequestAdd={this.handleCustomerAdd.bind(this)}
            onRequestDelete={this.handleCustomerDelete.bind(this)}
            value={this.state.customers}
            fullWidth
          />
          <ChipInput
            floatingLabelText='Tickets'
            dataSourceConfig={{ text: 'title', value: 'id' }}
            dataSource={this.props.tickets}
            onRequestAdd={this.handleTicketAdd.bind(this)}
            onRequestDelete={this.handleTicketDelete.bind(this)}
            value={this.state.tickets}
            fullWidth
          />
          <ChipInput
            floatingLabelText='Tags'
            onRequestAdd={this.handleTagAdd.bind(this)}
            onRequestDelete={this.handleTagDelete.bind(this)}
            value={this.state.tags}
            fullWidth
          />
          <TextField
            floatingLabelText='Importance'
            type='number'
            onChange={this.handleInputChange.bind(this, 'importanceMutation')}
            value={this.state.importanceMutation}
          /><br />
        </form>
      </Dialog>
    )
  }
}
