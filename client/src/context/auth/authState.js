import React, { useReducer } from 'react';
import axios from 'axios'
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken'

import {
	REGISTER_SUCCSESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCES,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

const AuthState = props => {
	console.log('AuthState', localStorage.getItem('token'))
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: null,
		error: null,
		user: null
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load User 
	const loadUser = async () => {
		console.log('loadUser', localStorage.token)
		setAuthToken(localStorage.token)
		try {
			const res = await axios.get('/api/auth')
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		} catch (err) {
			dispatch({
				type: AUTH_ERROR
			})
		}
	}

	// Register User 

	const register = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.post('/api/users', formData, config)
			dispatch({
				type: REGISTER_SUCCSESS,
				payload: res.data
			})
			loadUser()
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msq
			})
		}
	}

	// Login User 
	const login = async formData => {
	
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.post('/api/auth', formData, config)
			dispatch({
				type: LOGIN_SUCCES,
				payload: res.data
			})
			loadUser()
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msq
			})
		}
	}

	// Logaut 
	const logout = () => dispatch({ type: LOGOUT})

	// Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS});

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				login,
				logout,
				clearErrors,
				loadUser
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState;