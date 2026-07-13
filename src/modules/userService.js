export class UserService {
	getUsers() {
		return fetch('/api/users').then(res => res.json())
	}

	addUser(user) {
		return fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		}).then(res => {
			console.log(res.json())
		})
	}

	removeUser(id) {
		return fetch(`/api/users/${id}`, {
			method: 'DELETE',
		}).then(res => res.json())
	}

	changeUser(id, data) {
		return fetch(`/api/users/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => res.json())
	}

	getUser(id) {
		return fetch(`/api/users/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => res.json())
	}

	editUser(id, user) {
		return fetch(`/api/users/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		}).then(res => res.json())
	}

	filterUsers(filterOption) {
		return fetch(`/api/users?${filterOption}=true`, {
		}).then(res => res.json())
	}

	getSortUsers(sortOption) {
		return fetch(`/api/users?_sort=${sortOption.name}&_order=${sortOption.value}`, {
		}).then(res => res.json())
	}

	getSearchUsers(str) {
		return fetch(`/api/users?name_like=${str}`, {
		}).then(res => res.json())
	}
}
