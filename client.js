import http from 'http'

function getUsers() {
	const getUsersRequest = http.request(new URL('http://localhost:3000/users'), res => {
	  res.on('data', data => {
	    console.log('get users', data.toString())
	  })
	})
	getUsersRequest.on('error', console.error)
	getUsersRequest.end()
}

function putUser(user) {
	const body = JSON.stringify(user)
	const options = {
	  hostname: "localhost",
	  port: 3000,
	  path: "/users",
	  method: "PUT",
	  headers: {
	    "Content-Type": "application/json",
	    "Content-Length": Buffer.byteLength(body)
	  }
	}
	const getUsersRequest = http.request(options, res => {
	  res.on('data', data => {
	    console.log('put user', data.toString())
	  })
	})
	getUsersRequest.on('error', console.error)
	getUsersRequest.end(body)
}

function getUser(id) {
	const getUsersRequest = http.request(new URL('http://localhost:3000/users/' + id), res => {
	  res.on('data', data => {
	    console.log('get user', data.toString())
	  })
	})
	getUsersRequest.on('error', console.error)
	getUsersRequest.end()
}

function deleteUser(id) {
	const options = {
	  hostname: "localhost",
	  port: 3000,
	  path: "/users/" + id,
	  method: "DELETE",
	  headers: {"Content-Type": "application/json"}
	}
	const getUsersRequest = http.request(options, res => {
	  res.on('data', data => {
	    console.log('delete user', data.toString())
	  })
	})
	getUsersRequest.on('error', console.error)
	getUsersRequest.end()
}

getUsers()

putUser({username: "name1", password: "password"})

getUsers()

getUser(1)

deleteUser(1)

getUsers()