"use strict"

import React, { Component } from 'react'

import { logout } from '@stormgle/auth-client'
import { Login, bindUserProvider  } from '@stormgle/react-user'

class Sidebar extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const _display = this.props.display ? 'block' : 'none';
    return (
      <div className="w3-sidebar w3-bar-block w3-animate-right w3-hide-medium w3-hide-large" 
           style= {{ display: _display, right: 0, width: '100%', background: 'linear-gradient(to bottom right, #f1f1f1  0%, #ddffff  100%)' }} 
      >
        <span className="w3-button w3-display-topright w3-text-red" onClick={this.props.close}>X</span>

        <div className="w3-bar-item w3-border-bottom" style={{marginTop: '48px'}} > 
          <button className="w3-button w3-block w3-large w3-blue w3-card-4 w3-round" onClick={this.props.login}> Login </button>
          <button className="w3-button w3-block w3-text-orange w3-hover-none w3-hover-text-blue no-outline"> Sign up </button>
        </div>
        
        <a href="#" className="w3-bar-item w3-button">Home</a>
        <a href="#" className="w3-bar-item w3-button">About</a>
        <a href="#" className="w3-bar-item w3-button">Contact</a>
      </div>
    )
    
  }
}

class LoginPanel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const _display = this.props.display ? 'block' : 'none';
    return (
      <div  className="w3-sidebar w3-animate-top"
            style= {{ display: _display, right: 0, width: '100%', background: 'linear-gradient(to bottom right, #f1f1f1  0%, #ddffff  100%)' }} 
      > 
        <div style={{margin: 'auto'}} >
          <Login show = {this.props.display} close = {this.props.close} /> 
        </div>
      </div>
    )
  }
}

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSidebar: false,
      showLogin: false
    }

    const methods = ['closeSidebar', 'openSidebar', 'login', 'logout', 'closeLogin']
    methods.forEach( method => this[method] = this[method].bind(this) )

  }

  render() {
    return (
      <div className="w3-container w3-bar">
        <div className="w3-bar-item" > <h2> Catalog </h2> </div>

        {/* render for small device */}

        <div className="w3-bar-item w3-right w3-hide-medium w3-hide-large" style={{marginTop: '16px'}} > 
          <i className="fa fa-bars w3-xlarge cursor-pointer"  aria-hidden="true"  onClick={this.openSidebar} ></i>
        </div>

        <Sidebar display = {this.state.showSidebar} close = {this.closeSidebar} login={this.login} />

        {/* render for medium and large device */}

        {
          (typeof window !== 'undefined') && this.props.user? 
            <div className="w3-bar-item w3-right w3-hide-small" style={{marginTop: '16px'}}> 
              <div className="w3-bar-item"> {this.props.user.name || this.props.user.email} </div>
              <button className="w3-button w3-large w3-blue w3-round" onClick={this.logout}> Logout </button>
            </div>
          :
            <div className="w3-bar-item w3-right w3-hide-small" style={{marginTop: '16px'}}>               
              <button className="w3-button w3-text-orange w3-hover-none w3-hover-text-blue no-outline"> Sign up </button>
              <button className="w3-button w3-large w3-blue w3-card-4 w3-round" onClick={this.login}> Login </button>
            </div>
        }
        
        <div className="w3-bar-item w3-right w3-hide-small w3-border-right" style={{marginTop: '16px'}}> 
          <a href="#" className="w3-bar-item w3-button no-outline">Home</a>
          <a href="#" className="w3-bar-item w3-button no-outline">About</a>
          <a href="#" className="w3-bar-item w3-button no-outline">Contact</a>
        </div>

        <LoginPanel display = {this.state.showLogin} close={this.closeLogin} />

      </div>
    )
  }

  closeSidebar() {
    this.setState({ showSidebar: false })
  }

  openSidebar() {
    this.setState({ showSidebar: true })
  }

  login() {
    this.setState({ showLogin: true })
  }

  logout() {
    logout()
  }

  closeLogin() {
    this.setState({ showLogin: false })
  }

}

module.exports = bindUserProvider(Header)