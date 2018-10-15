import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './Header';
import Guest from './Guest';
import './App.css';

class App extends Component {
	constructor(){
		super();
		this.state = {
			ReserveList: []
		}
	}
	
	addReservation = (reservation) => {
		this.setState(state =>{
			const ReserveList = [...state.ReserveList, reservation]
			return {ReserveList}
		})
	}
	
	removeGuest = (id) =>{
		let filteredGuests = this.state.ReserveList.filter(guest => guest.id !== parseInt(id, 10))
		let updatedGuests = filteredGuests.map((guest, index) => {
			guest.id = index
			return guest
		})
		this.setState(state => ({
			ReserveList: updatedGuests
		}))
	}
	
  render() {
    return (
	<BrowserRouter>
		<div>
			<Switch>
			<Route path="/header" render={() => <Header addReservation={this.addReservation} removeGuest={this.removeGuest} guestList={this.state.ReserveList}/>} />
			<Route exactpath="/" render={() => <Guest guestList={this.state.ReserveList} />} />
			</Switch>
		</div>
	</BrowserRouter>
    );
  }
}

export default App;
