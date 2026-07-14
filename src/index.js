import './css/main.css';

import { render, showError, hideError } from "./modules/render";
import { addUser } from "./modules/addUser";
import { UserService } from "./modules/userService";
import { removeUser } from "./modules/removeUser";
import { changePermissions } from "./modules/changePermissions";
import { editUser } from "./modules/editUser";
import { filterUsers } from "./modules/filterUsers";
import { sortUsers } from "./modules/sortUsers";
import { searchUsers } from "./modules/searchUsers";

window.userService = new UserService()

// Загружаем пользователей при старте с обработкой ошибок
userService.getUsers()
	.then(data => {
		console.log('Загружены пользователи:', data);
		hideError();
		render(data);
	})
	.catch(error => {
		console.error('Ошибка загрузки пользователей:', error);
		showError('Произошла ошибка, данных нет!');
	});

addUser()
removeUser()
changePermissions()
editUser()
filterUsers()
sortUsers()
searchUsers()
