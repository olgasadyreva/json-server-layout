import { render, showError, hideError } from './render'

// Состояние сортировки (глобальное)
let currentSort = {
	field: null,    // 'children' или null
	order: 'asc'    // 'asc' или 'desc'
}

// Функция для проверки, активна ли сортировка
export const isSortActive = () => {
	return currentSort.field !== null
}

// Функция для получения текущей сортировки
export const getCurrentSort = () => {
	return currentSort
}

// Функция для сброса сортировки
export const resetSort = () => {
	currentSort.field = null
	currentSort.order = 'asc'
	updateSortIcon()
}

// Функция для обновления иконки
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

	// Добавляем иконку
	if (!headerSortIsChildren.querySelector('.sort-icon')) {
		headerSortIsChildren.innerHTML += '<span class="sort-icon"> ⬍</span>'
	}

	// Инициализируем иконку
	updateSortIcon()

	headerSortIsChildren.addEventListener('click', () => {
		// Меняем состояние сортировки
		if (currentSort.field === 'children') {
			// Если уже сортируем по этому полю - меняем порядок
			currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc'
		} else {
			// Если сортируем по новому полю - начинаем с asc
			currentSort.field = 'children'
			currentSort.order = 'asc'
		}

		// Очищаем поле поиска (но НЕ триггерим событие input)
		if (searchInput) {
			searchInput.value = ''
			// Убираем dispatchEvent, чтобы не вызывать searchUsers
			// searchInput.dispatchEvent(new Event('input')) // <-- УБИРАЕМ!
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

// Функция для применения сортировки к данным (используется в других модулях)
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
