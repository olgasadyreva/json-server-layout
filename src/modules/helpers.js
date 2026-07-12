export const debounce = (func, ms = 3000) => {
	let timer

	return (...args) => {
		clearTimeout(timer)

		timer = setTimeout(() => {func.apply(this, args)}, ms)
	}
}
