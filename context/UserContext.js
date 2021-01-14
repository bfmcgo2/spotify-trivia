import { createContext, useReducer } from 'react';

import { userReducer } from '../reducers/userReducer';

const User = createContext(); // Create a context object

const initialState = {
	user: {

	}
}

const UserProvider = (props) => {

	const [state, dispatch] = useReducer(userReducer, initialState);
	const value = { state, dispatch };

	return  <User.Provider value = { value }>
				{props.children}
			</User.Provider>
}

export {
  UserProvider,
  User
};