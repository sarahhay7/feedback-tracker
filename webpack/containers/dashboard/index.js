import React, { Component } from 'react'

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

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const tilesData = [
  {
    description,
    weight: 30
  },
  {
    description,
    weight: 20
  },
  {
    description,
    weight: 10
  },
  {
    description,
    weight: 5
  },
  {
    description,
    weight: 5
  },
  {
    description,
    weight: 4
  },
  {
    description,
    weight: 0
  },
  {
    description,
    weight: 0
  }
]

export default class Dashboard extends Component {
  render () {
    return (
      <div style={styles.root}>
        {tilesData.map((tile, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.chip}>
              {tile.weight}
            </div>
            {tile.description}
          </div>
        ))}
      </div>
    )
  }
}
