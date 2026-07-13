// import { UserService } from "./userService"
import { render } from './render'

export const filterUsers = () => {
	const btnIsChildren = document.getElementById('btn-isChildren')
	const btnIsPermissions = document.getElementById('btn-isPermissions')
	const btnIsAll = document.getElementById('btn-isAll')
	const searchInput = document.getElementById('search-input')

	btnIsChildren.addEventListener('click', () => {
		userService.filterUsers('children').then(users => {
			render(users);
		})
	})

	btnIsPermissions.addEventListener('click', () => {
		userService.filterUsers('permissions').then(users => {
			render(users);
		})
	})

	btnIsAll.addEventListener('click', () => {
		if (searchInput) {
			searchInput.value = ''
		}
		
		userService.getUsers().then(users => {
			render(users);
		})
	})
}
