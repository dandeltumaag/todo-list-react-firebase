import React, { useState } from 'react'
// import Modla from 'react-modal'
import './Todo.css'
import { Input, List, ListItem, ListItemText, Button, Modal,FormControl, InputLabel } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import db from '../firebase'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo({ todo }) {
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const [input, setInput] = useState()

	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	const updateTodo = () => {
		/* update the todo */
		db.collection('todos').doc(todo.id).set({
			todo: input
		}, { merge: true })
		setOpen(false)
	}
	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<div className={classes.paper}>
					<form>
						<h3>Editing Task</h3>
						<FormControl>
							<InputLabel>{todo.todo}</InputLabel>
							<Input value={input} onChange={event => setInput(event.target.value)}/>
						</FormControl>
					</form>
					<Button
						disabled={!input} 
						variant="contained"
						color="primary"
						onClick={updateTodo}
					>Save</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={e => setOpen(false)}
					>Close</Button>
				</div>
			</Modal>
			<List className="todo__list">
				<ListItem>
					<ListItemText primary={todo.todo} secondary="Dummy deadline" /> 
				</ListItem>
				<DeleteForeverIcon
					className="todo__delete" 
					variant="contained"
					color="secondary"
					onClick={ event => {
						db.collection('todos').doc(todo.id).delete()  // delete data from database
						}
					}				
				/>
				<EditIcon 
					onClick={handleOpen}
					className="todo__edit"
				/>
			</List>
		</>
	)
}

export default Todo

