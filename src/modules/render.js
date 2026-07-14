const errorContainer = document.getElementById('error-container')
const errorMessage = document.getElementById('error-message')

export const showError = (message = 'Произошла ошибка, данных нет!') => {
	if (errorContainer && errorMessage) {
		errorMessage.textContent = message
		errorContainer.style.display = 'block'
	}
	const tbody = document.getElementById('table-body')
	if (tbody) {
		tbody.innerHTML = ''
	}
}

export const hideError = () => {
	if (errorContainer) {
		errorContainer.style.display = 'none'
	}
}

export const render = users => {
	const tbody = document.getElementById('table-body')

	if (!tbody) {
		console.error('Элемент table-body не найден!')
		return
	}

	if (!users || users.length === 0) {
		showError('Пользователи не найдены')
		return
	}

	hideError();

	tbody.innerHTML = ''

	users.forEach(user => {
		tbody.insertAdjacentHTML(
			'beforeend',
			`
			<tr data-key="${user.id}">
				<th scope="row">${user.id}</th>
				<td>${user.name || 'Без имени'}</td>
				<td>${user.email || 'Без email'}</td>
				<td>${user.children ? 'Есть' : 'Нет'}</td>
				<td>
						<div class="form-check form-switch">
								<input class="form-check-input" type="checkbox" role="switch"
										id="form-children" ${user.permissions ? 'checked' : ''}>
						</div>
				</td>
				<td>
						<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
								<button type="button" class="btn btn-warning btn-edit">
										<i class="bi-pencil-square"></i>
								</button>
								<button type="button" class="btn btn-danger btn-remove">
										<i class="bi-person-x"></i>
								</button>
						</div>
				</td>
		</tr>
			`,
		)
	})
}
