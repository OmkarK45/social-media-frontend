import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
					{/* Splitbee Analytics */}
					<script async src="https://cdn.splitbee.io/sb.js"></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
