export class UserService {
	// Универсальный метод для отправки данных
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

	// Универсальный метод для получения данных
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

	// Получить всех пользователей
	async getUsers() {
		return await this.getData({ url: '/api/users' })
	}

	// Добавить пользователя
	async addUser(user) {
		return await this.sendData({
			url: '/api/users',
			method: 'POST',
			data: user,
		})
	}

	// Удалить пользователя
	async removeUser(id) {
		return await this.sendData({
			url: `/api/users/${id}`,
			method: 'DELETE',
			data: {},
		})
	}

	// Изменить права пользователя
	async changeUser(id, data) {
		return await this.sendData({
			url: `/api/users/${id}`,
			method: 'PATCH',
			data: data,
		});
	}

	// Получить одного пользователя
	async getUser(id) {
		return await this.getData({
			url: `/api/users/${id}`,
		});
	}

	// Редактировать пользователя
	async editUser(id, user) {
		return await this.sendData({
			url: `/api/users/${id}`,
			method: 'PUT',
			data: user,
		});
	}

	// Фильтровать пользователей
	async filterUsers(filterOption) {
		return await this.getData({
			url: `/api/users?${filterOption}=true`,
		});
	}

	// Сортировать пользователей
	async getSortUsers(sortOption) {
		return await this.getData({
			url: `/api/users?_sort=${sortOption.name}&_order=${sortOption.value}`,
		});
	}

	// Поиск пользователей
	async getSearchUsers(str) {
		return await this.getData({
			url: `/api/users?name_like=${str}`,
		});
	}
}
