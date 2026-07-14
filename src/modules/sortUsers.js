import { render, showError, hideError } from './render'

let currentSort = {
	field: null,
	order: 'asc'
}

export const isSortActive = () => {
	return currentSort.field !== null
}

export const getCurrentSort = () => {
	return currentSort
}

export const resetSort = () => {
	currentSort.field = null
	currentSort.order = 'asc'
	updateSortIcon()
}

const updateSortIcon = () => {
	const headerSortIsChildren = document.getElementById('sort-is-children')
	if (!headerSortIsChildren) return
	
	const icon = headerSortIsChildren.querySelector('.sort-icon')
	if (icon) {
		if (currentSort.field === 'children') {
			icon.textContent = currentSort.order === 'asc' ? ' 🔼' : ' 🔽'
		} else {
			icon.textContent = ''
		}
	}
}

export const sortUsers = () => {
	const headerSortIsChildren = document.getElementById('sort-is-children')
	const searchInput = document.getElementById('search-input')
	
	if (!headerSortIsChildren) {
		console.error('Элемент sort-is-children не найден!')
		return
	}

	headerSortIsChildren.style.cursor = 'pointer'

	if (!headerSortIsChildren.querySelector('.sort-icon')) {
		headerSortIsChildren.innerHTML += '<span class="sort-icon"> ⬍</span>'
	}

	updateSortIcon()

	headerSortIsChildren.addEventListener('click', () => {
		if (currentSort.field === 'children') {
			currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc'
		} else {
			currentSort.field = 'children'
			currentSort.order = 'asc'
		}

		if (searchInput) {
			searchInput.value = ''
		}

		const sortOrder = currentSort.order
		
		console.log(`Сортировка: поле=${currentSort.field}, порядок=${sortOrder}`)
		
		userService.getSortUsers({
			name: 'children',
			value: sortOrder
		})
		.then(users => {
			hideError()
			render(users)
			updateSortIcon()
		})
		.catch(error => {
			console.error('Ошибка сортировки:', error)
			showError('Ошибка при сортировке пользователей')
		})
	})
}

export const applySortToData = (users) => {
	if (!currentSort.field || !users || users.length === 0) {
		return users
	}

	const sorted = [...users]
	const order = currentSort.order === 'asc' ? 1 : -1
	
	sorted.sort((a, b) => {
		const valA = a[currentSort.field] ? 1 : 0
		const valB = b[currentSort.field] ? 1 : 0
		return (valA - valB) * order
	})
	
	return sorted
}
