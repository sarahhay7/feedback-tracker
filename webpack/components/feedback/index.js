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
    feedbackStates: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  }

  state = {
    description: '',
    customers: []
  }

  getCustomerDataSource () {
    return this.props.customers.map(({id, name, email}) =>
      ({ id, text: `${name} <${email}>` })
    )
  }

  handleInputChange (field, { target: { value } }) {
    this.setState({ [field]: value })
  }

  handleSelectChange (field, event, index, value) {
    console.log(value)
    this.setState({ [field]: value })
  }

  handleCustomerAdd (value) {
    const { customers } = this.state
    this.setState({ customers: [...customers, value] })
  }

  handleSave () {
    const { description, customers, feedbackStateId } = this.state
    this.props.onSave({
      _type: 'feedbacks',
      description,
      feedbackState: () => ({ _type: 'feedback_states', id: feedbackStateId }),
      customers: () => customers.map(({ id }) => ({ _type: 'customers', id }))
    })
  }

  render () {
    const actions = [
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

    return (
      <Dialog
        title='New Feedback'
        actions={actions}
        modal
        open={this.props.open}
      >
        <form>
          <TextField
            hintText='Description'
            onChange={this.handleInputChange.bind(this, 'description')}
            value={this.state.description}
          /><br />
          <SelectField
            hintText='State'
            onChange={this.handleSelectChange.bind(this, 'feedbackStateId')}
            value={this.state.feedbackStateId}
          >
            {this.props.feedbackStates.map(({ id, name }) => (<MenuItem key={id} value={id} primaryText={name} />))}
          </SelectField><br />
          <ChipInput
            hintText='Customers'
            dataSourceConfig={{ text: 'text', value: 'id' }}
            dataSource={this.getCustomerDataSource()}
            onRequestAdd={this.handleCustomerAdd.bind(this)}
            value={this.state.customers}
            fullWidth
          />
        </form>
      </Dialog>
    )
  }
}
