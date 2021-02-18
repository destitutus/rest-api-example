import express from 'express'
import bodyParser from 'body-parser'

const app = new express()

let users = []

app.use(bodyParser.raw({
  inflate: true,
  limit: '100kb',
  type: 'application/*'
}))
app.use('/public', express.static('public'))


function getUsers(request, response) {
	response.status(200).send(users)
}

function putUser(request, response) {
	const user = JSON.parse(request.body.toString())
	user.id = (users.length + 1).toString()
	users.push(user)
	response.status(200).send(user)
}

function getUser(request, response) {
	const {id} = request.params
	const user = users.find(user => user.id === id)
	if (user) {
		response.status(200).send(user)	
	} else {
		response.status(404).send({error: "user not found"})	
	}
}

function updateUser(request, response) {
	const {id} = request.params
	const updates = JSON.parse(request.body.toString())
	const user = users.find(user => user.id === id)
	if (user) {
		for (let key in updates) {
			if (key !== 'id') {
				user[key] = updates[key]
			}
		}
		response.status(200).send(user)	
	} else {
		response.status(404).send({error: "user not found"})	
	}
}

function patchUser(request, response) {
	const {id} = request.params
	const updates = JSON.parse(request.body.toString())
	const user = users.find(user => user.id === id)
	if (user) {
		const key = updates.key
		user[key] = updates.value
		response.status(200).send(user)	
	} else {
		response.status(404).send({error: "user not found"})	
	}
}


function deleteUser(request, response) {
	const {id} = request.params
	const user = users.find(user => user.id === id)
	if (user) {
		users = users.filter(user => user.id !== id)
		response.status(200).send(user)	
	} else {
		response.status(404).send({error: "user not found"})	
	}
}


app.get('/users', getUsers)
app.put('/users', putUser)

app.get('/users/:id', getUser)
app.post('/users/:id', updateUser)
app.patch('/users/:id', patchUser)
app.delete('/users/:id', deleteUser)

app.listen(3000)