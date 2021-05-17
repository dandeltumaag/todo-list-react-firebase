import React, { useState, useEffect } from 'react';
import { InputLabel, Input, FormControl, Button, TextField } from '@material-ui/core';
import firebase from 'firebase'

import db from './firebase'
import Todo from './components/Todo'
import './App.css';

function App() {
	const [todos, setTodos] = useState([])
	const [input, setInput] = useState('')

	/* when the app load, we need to listen to the database and fetch new todos as they get added/remove */
	useEffect( () => {
		/* this code here.. fire when the app.js loads */
		/* read the database */
		/* orderBy('timestamp'.'desc') */
		db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
			/* console.log(snapshot.docs.map(doc => doc.data())) */
			setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
		})
	}, []); 

	const captureValue = (e) => {
		setInput(e.target.value)
		/* event = setInput(event.target.value) */
	}

	const addTodo = (e) => {
		 /* **always prevent default to disable refresh */
		e.preventDefault()

		/* add this to the database */
		db.collection('todos').add({
			todo: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp() /* get the firebase server timestamp */
		})

		/* This will fire once button is click */
		/* to update it use spread [...currentValue, valueToAdd] */
		// setTodos([...todos, input])

		/* this will clear and reset the input */
		setInput('')
	}
  return (
    <div className="App">
			<h1>TODO LIST with FIREBASE</h1>
			<form>
				<FormControl>
					<InputLabel>Write a Todo</InputLabel>
					<Input value={input} onChange={captureValue} />
				</FormControl>
				<Button
						disabled={!input} 
						type="submit" 
						onClick={addTodo}
						variant="contained"
						color="primary"
					>ADD Todo</Button>
			</form>

			<ul>
				{todos.map(todo => (
					<Todo todo={todo} />
				))}
			</ul>
    </div>
  );
}

export default App;
