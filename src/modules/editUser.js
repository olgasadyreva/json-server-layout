import { render, showError, hideError } from './render'

export const editUser = () => {
	const tbody = document.getElementById('table-body')
	const form = document.querySelector('form')
	const nameInput = document.querySelector('#form-name')
	const emailInput = document.querySelector('#form-email')
	const childrenInput = document.querySelector('#form-children')

	// Обработчик нажатия на кнопку редактирования
	tbody.addEventListener('click', event => {
		const editButton = event.target.closest('.btn-edit')
		if (editButton) {
			const tr = editButton.closest('tr')
			const id = tr.dataset.key
			
			console.log('Редактирование пользователя с ID:', id) // Для отладки

			// Получаем данные пользователя для заполнения формы
			userService.getUser(id).then(user => {
				console.log('Данные пользователя:', user) // Для отладки
				
				nameInput.value = user.name || ''
				emailInput.value = user.email || ''
				childrenInput.checked = user.children || false

				// Сохраняем ID пользователя в dataset формы
				form.dataset.method = id
				
				// Меняем текст кнопки
				const submitButton = form.querySelector('button[type="submit"]')
				if (submitButton) {
					submitButton.textContent = 'Сохранить изменения'
				}
			}).catch(error => {
				console.error('Ошибка загрузки пользователя:', error)
				alert('Не удалось загрузить данные пользователя')
			})
		}
	})

	// Обработчик отправки формы
	form.addEventListener('submit', e => {
		e.preventDefault()

		const userId = form.dataset.method
		
		if (userId) {
			// Режим редактирования
			const user = {
				name: nameInput.value.trim(),
				email: emailInput.value.trim(),
				children: childrenInput.checked,
				permissions: false,
			}

			userService.editUser(userId, user)
			.then(() => {
				return userService.getUsers()
			})
			.then(users => {
				hideError()
				render(users)
				form.reset()
				form.removeAttribute('data-method')
				
				const submitButton = form.querySelector('button[type="submit"]')
				if (submitButton) {
					submitButton.textContent = 'Добавить'
				}
			})
			.catch(error => {
				console.error('Ошибка при сохранении:', error)
				showError('Ошибка при сохранении изменений')
			});
		}
	});
}
