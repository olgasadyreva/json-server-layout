import { render } from './render'
import { debounce } from './helpers'

export const searchUsers = () => {
	const input = document.getElementById('search-input')

	if (!input) return

	const debounceSearch = debounce(() => {
		const searchValue = input.value.trim()
		
		if (searchValue.length > 0) {
			// Если есть текст поиска - ищем
			window.userService.getSearchUsers(searchValue).then(users => {
				render(users)
			})
		} else {
			userService.getUsers().then(users => {
				render(users)
			})
		}
	}, 500)

	input.addEventListener('input', debounceSearch)
}
