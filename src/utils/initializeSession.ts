export const initializeSession = () => async (sessionId: string) => {
	console.log('sending req to next backend')
	await fetch('/api/sessions/create', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(sessionId),
	})
}
