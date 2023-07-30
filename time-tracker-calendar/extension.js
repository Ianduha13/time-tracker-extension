const vscode = require('vscode')

function activate(context) {
	let startAuthCommand = vscode.commands.registerCommand('time-tracker-calendar.startAuthentication', startAuthentication)
	context.subscriptions.push(startAuthCommand)
}

function startAuthentication() {
	// Create and show a WebView panel
	const panel = vscode.window.createWebviewPanel('auth', 'Authenticate', vscode.ViewColumn.One, {
		// Enable scripts inside the WebView
		enableScripts: true
	})

	// Load the OAuth2 URL inside the WebView
	const authUrl = 'https://accounts.google.com/o/oauth2/auth?' +
		'client_id=67596396969-41he5agd4qlb9dhsu6ka3pec2rfso7rp.apps.googleusercontent.com&' +
		'redirect_uri=http://localhost&' +
		'scope=https://www.googleapis.com/auth/calendar&' + // Adjust the scope as needed
		'response_type=code'
	panel.webview.html = `<html><body><iframe src="${authUrl}" style="width:100%; height:100%; border:none;"></iframe></body></html>`

	// Handle messages from the WebView (you'll need to implement logic to detect the callback and send a message from the WebView's content)
	panel.webview.onDidReceiveMessage(message => {
		if (message.type === 'callback' && message.accessToken) {
			// Store the access token and continue with the logic
			console.log('Access token received:', message.accessToken)
		}
	})
}

// other necessary functions...

module.exports = {
	activate
}
