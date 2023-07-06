export const htmlDecode = (body: string | null) => {
	if (typeof body === 'string') {
		const html = new DOMParser().parseFromString(body, 'text/html')
		return html.documentElement.textContent
	}
}