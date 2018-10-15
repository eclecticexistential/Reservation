import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'; 
import './App.css';

class Header extends Component {
	constructor(){
		super();
		this.state = {
			admin: false,
			userName:'',
			password:'',
			FirstName: '',
			LastName: '',
			Table: ''
		}
	}
	
	onUserName = (e) =>{
		this.setState({userName: e.target.value})
	}
	
	onPassword = (e) =>{
		this.setState({password: e.target.value})
	}
	
	onEnterFirst = (e) => {
		this.setState({FirstName: e.target.value})
	}
	
	onEnterLast = (e) => {
		this.setState({LastName: e.target.value})
	}
	
	onEnterTable = (e) => {
		this.setState({Table: e.target.value})	
	}

	onLogin = (e) => {
		e.preventDefault()
		let user = this.state.userName
		let pass = this.state.password
		if(user === 'admin' && pass === 'password'){
			this.setState({admin: true})
		} else{
			alert("Nope. Try again.")
		}
	}
	
	addReservation = (e) => {
		e.preventDefault()
		let rId = this.props.guestList.length
		let reservation = {id: rId, firstName: this.state.FirstName, lastName: this.state.LastName, table: this.state.Table}
		this.props.addReservation(reservation)
		this.setState({FirstName: '', LastName: '', Table: ''})
	}
	
	removeGuest = (e) => {
		e.preventDefault()
		let removeGuest = e.target.value
		this.props.removeGuest(removeGuest)
	}
	
	componentDidMount(){
		document.querySelector('input').autofocus = true;
	}
	
	componentWillUnmount(){
		this.setState({userName: '', password: '', admin: false})
	}
	
	render() {
		let currList = this.props.guestList
		return (
			<div className='App App-header'>
				<h1 className='mb-3 text-primary'>Add To Guest List</h1>
			{this.state.admin ?
				<div>
					<ul>
						{currList.map(guest => 
							<li key={guest.id}>{`${guest.firstName} ${guest.lastName} - Table ${guest.table}`} 
							<button className='btn' id='guests' value={guest.id} onClick={this.removeGuest}>Remove</button></li>)
						}
					</ul>
							<form>
								<input type='text' placeholder="First Name?" value={this.state.FirstName} onChange={this.onEnterFirst} autoFocus={true}/>
								<input type='text' placeholder="Last Name?" value={this.state.LastName} onChange={this.onEnterLast}/>
								<input type='text' placeholder="Table Number?" value={this.state.Table} onChange={this.onEnterTable}/>
								<br />
								{this.state.FirstName && this.state.LastName && this.state.Table &&
									<div>
										{this.state.FirstName} {this.state.LastName} - Table {this.state.Table}
										<button type='submit' className='btn btn-warning space' onClick={this.addReservation}>Add Name</button>
									</div>
								}
							</form>
					<br />
					<NavLink to="/"><button className='btn btn-success'>Save List</button></NavLink>
				</div>
				:
				<div>
					<h6 className='my-4'>Login to Update</h6>
					<form>
						<input placeholder="Username" value={this.state.userName} onChange={this.onUserName} autoFocus={true}/>
						<input type='password' placeholder="Password" value={this.state.password} onChange={this.onPassword}/>
						<br />
						<button type='submit' className='btn' onClick={this.onLogin}>Login</button>
					</form>
					<br />
					<NavLink to="/"><button className='btn btn-danger'>Return to Check In</button></NavLink>
				</div>
			}
			</div>
		);
	}
}
	
export default Header;