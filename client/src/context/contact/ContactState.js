import React, { useReducer } from 'react';
import axios from 'axios'
import  {v4 as uuid} from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
	GET_CONTACT,
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CONTACT,
	UPDATE_CONTACT,
	FILTER_CONTACT,
	CLEAR_FILTER,
	CLEAR_CURRENT,
	CONTACT_ERROR
} from '../types';

const ContactState = props => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	// GET Contact
	const getContacts = async () => {
	
		try {
			const res = await axios.get('/api/contacts')
			dispatch({
				type: GET_CONTACT,
				payload: res.data
			})
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.data.msq
			})
		}
	}

	// Add Contact
	const addContact = async contact => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		try {
			const res = await axios.post('/api/contacts', contact, config)
			dispatch({
				type: ADD_CONTACT,
				payload: res.data
			})
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.data.msq
			})
		}
	}

	// Update Contacts
	const updateContact = async contact => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		try {
			const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
			dispatch({
				type: UPDATE_CONTACT,
				payload: res.data
			})
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.data.msq
			})
		}
	}

	// Delete Contact
	const deleteContact = async id => {
		try {
			await axios.delete(`/api/contacts/${id}` )
			dispatch({ 
				type: DELETE_CONTACT, 
				payload: id 
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.data.msq
			})
		}
	}

	// Clear Contact
	const clearContacts = contact => {
		dispatch({ type: CLEAR_CONTACT });
	}

	// Set Current Contact
	const setCurrent = contact => {
		dispatch({ type: SET_CURRENT, payload: contact });
	}

	// Clear Current Contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	}

	

	// Filter Contacts
	const filterContacts = text => {
		dispatch({ type: FILTER_CONTACT, payload: text });
	}

	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	}

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				clearFilter,
				filterContacts,
				getContacts,
				clearContacts

			}}
		>
			{props.children}
		</ContactContext.Provider>
	)
}

export default ContactState;