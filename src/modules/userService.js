export class UserService {
	sendData = async ({ url, data = {}, method = 'POST' }) => {
		try {
			const response = await fetch(url, {
				method: method,
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})

			if (!response.ok) {
				throw new Error(`Ошибка HTTP: ${response.status}`)
			}

			const result = await response.json()
			console.log('Данные успешно отправлены:', result)
			return result
		} catch (error) {
			console.error('Ошибка при отправке данных:', error.message)
			throw error
		}
	}

	getData = async ({ url, method = 'GET' }) => {
		try {
			const response = await fetch(url, {
				method: method,
				headers: {
					'Content-type': 'application/json',
				},
			})

			if (!response.ok) {
				throw new Error(`Ошибка HTTP: ${response.status}`)
			}

			const data = await response.json()
			console.log('Данные получены из db.json:', data)
			return data
		} catch (error) {
			console.error('Ошибка при получении данных:', error.message)
			throw error
		}
	}

	async getUsers() {
		return await this.getData({ url: '/api/users' })
	}

	async addUser(user) {
		return await this.sendData({
			url: '/api/users',
			method: 'POST',
			data: user,
		})
	}

	async removeUser(id) {
		return await this.sendData({
			url: `/api/users/${id}`,
			method: 'DELETE',
			data: {},
		})
	}

	async changeUser(id, data) {
		return await this.sendData({
			url: `/api/users/${id}`,
			method: 'PATCH',
			data: data,
		});
	}

	async getUser(id) {
		return await this.getData({
			url: `/api/users/${id}`,
		});
	}

	async editUser(id, user) {
		return await this.sendData({
			url: `/api/users/${id}`,
			method: 'PUT',
			data: user,
		});
	}

	async filterUsers(filterOption) {
		return await this.getData({
			url: `/api/users?${filterOption}=true`,
		});
	}

	async getSortUsers(sortOption) {
		return await this.getData({
			url: `/api/users?_sort=${sortOption.name}&_order=${sortOption.value}`,
		});
	}

	async getSearchUsers(str) {
		return await this.getData({
			url: `/api/users?name_like=${str}`,
		});
	}
}
