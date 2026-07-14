import { render, showError, hideError } from './render'

export const addUser = () => {
	const form = document.querySelector('form')
	const nameInput = document.querySelector('#form-name')
	const emailInput = document.querySelector('#form-email')
	const childrenInput = document.querySelector('#form-children')

	form.addEventListener('submit', e => {
		e.preventDefault()

		if (!form.dataset.method) {
			if (!nameInput.value || !emailInput.value) {
				showError('Пожалуйста, заполните все поля!')
				return
			}

			const user = {
				name: nameInput.value.trim(),
				email: emailInput.value.trim(),
				children: childrenInput.checked,
				permissions: false,
			}

			userService.addUser(user)
				.then(() => {
					return userService.getUsers()
				})
				.then(users => {
					hideError()
					render(users)
					form.reset()
				})
				.catch(error => {
					console.error('Ошибка при добавлении пользователя:', error)
					showError('Ошибка при добавлении пользователя')
				})
		}
	})
}
