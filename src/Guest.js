import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './App.css';

class Guest extends Component {
	constructor(){
		super();
		this.state = {
			realUser: false,
			userInfo: [],
			currUserFirst: '',
			currUserLast: '',
		}
	}
	
	onGuestUpdateFirst = (e) => {
		this.setState({currUserFirst: e.target.value})
	}
	
	onGuestUpdateLast = (e) => {
		this.setState({currUserLast: e.target.value})
	}
	
	timer = () => setTimeout(() => {
		this.setState({realUser: false})
		this.setState({userInfo: []})
	}, 5000)
	
	checkIn = (e) => {
		e.preventDefault()
		this.props.guestList.map(user => {
			if(user.lastName === this.state.currUserLast && user.firstName === this.state.currUserFirst){
				return (
					this.setState({realUser: true, userInfo: user, currUserFirst: '', currUserLast: ''})
				)
			}
			return false
		})
		this.timer();
	}
	
	render(){
	return (
		<div className='App App-header'>
				<NavLink to="/header">_</NavLink>
				<div>
					<h1 className='mb-5'>Check Reservation</h1>
					<form>
						<input type='text' placeholder="First Name...?" value={this.state.currUserFirst} onChange={this.onGuestUpdateFirst} autoFocus={true}/>
						<input type='text' placeholder="Last Name...?" value={this.state.currUserLast} onChange={this.onGuestUpdateLast}/>
						<br />
						<button type='submit' className='btn btn-warning' onClick={this.checkIn}>Check In</button>
					</form>
					{this.state.realUser && 
						<div className='m-4'>
							<h3>Welcome {this.state.userInfo.firstName} {this.state.userInfo.lastName}!</h3>
							<h4>Your Table is Number {this.state.userInfo.table}</h4>
						</div>
					}
				</div>
			</div>
	)
	}
}

export default Guest;