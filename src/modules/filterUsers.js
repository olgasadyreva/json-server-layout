import { render, showError, hideError } from './render'
import { resetSort, applySortToData } from './sortUsers'

export const filterUsers = () => {
	const btnIsChildren = document.getElementById('btn-isChildren')
	const btnIsPermissions = document.getElementById('btn-isPermissions')
	const btnIsAll = document.getElementById('btn-isAll')
	const searchInput = document.getElementById('search-input')

	const clearSearch = () => {
		if (searchInput) {
			searchInput.value = ''
		}
	}

	btnIsChildren.addEventListener('click', () => {
		clearSearch()
		resetSort()
		
		userService.filterUsers('children')
			.then(users => {
				hideError()
				render(users)
			})
			.catch(error => {
				console.error('Ошибка фильтрации:', error)
				showError('Ошибка при фильтрации пользователей')
			})
	})

	btnIsPermissions.addEventListener('click', () => {
		clearSearch()
		resetSort()
		
		userService.filterUsers('permissions')
			.then(users => {
				hideError()
				render(users)
			})
			.catch(error => {
				console.error('Ошибка фильтрации:', error)
				showError('Ошибка при фильтрации пользователей')
			})
	})

	btnIsAll.addEventListener('click', () => {
		clearSearch()
		resetSort()
		
		userService.getUsers()
			.then(users => {
				hideError()
				render(users)
			})
			.catch(error => {
				console.error('Ошибка загрузки:', error)
				showError('Ошибка при загрузке пользователей')
			})
	})
}
