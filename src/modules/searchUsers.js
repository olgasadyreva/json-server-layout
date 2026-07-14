import { render, showError, hideError } from './render'
import { debounce } from './helpers'
import { isSortActive, applySortToData } from './sortUsers'

export const searchUsers = () => {
	const input = document.getElementById('search-input')
	
	if (!input) return

	const debounceSearch = debounce(() => {
		const searchValue = input.value.trim()
		
		if (searchValue.length > 0) {
			userService.getSearchUsers(searchValue)
				.then(users => {
					// Применяем текущую сортировку к результатам поиска
					const sortedUsers = applySortToData(users)
					
					if (sortedUsers && sortedUsers.length > 0) {
						hideError()
						render(sortedUsers)
					} else {
						showError('Пользователи не найдены')
					}
				})
				.catch(error => {
					console.error('Ошибка поиска:', error)
					showError('Ошибка при поиске пользователей')
				})
		} else {
			userService.getUsers()
				.then(users => {
					// Применяем текущую сортировку
					const sortedUsers = applySortToData(users)
					hideError()
					render(sortedUsers)
				})
				.catch(error => {
					console.error('Ошибка загрузки:', error)
					showError('Ошибка при загрузке пользователей')
				})
		}
	}, 500)

	input.addEventListener('input', debounceSearch)
}
