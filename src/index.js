import { render } from "./modules/render";
import { addUser } from "./modules/addUser";
import { UserService } from "./modules/userService";
import { removeUser } from "./modules/removeUser";
import { changePermissions } from "./modules/changePermissions";
import { editUser } from "./modules/editUser";
import { filterUsers } from "./modules/filterUsers";
import { sortUsers } from "./modules/sortUsers";
import { searchUsers } from "./modules/searchUsers";

window.userService = new UserService

userService.getUsers().then(data => {
	console.log(data);
	render(data)
})

addUser()
removeUser()
changePermissions()
editUser()
filterUsers()
sortUsers()
searchUsers()
