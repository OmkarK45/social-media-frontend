import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
					{/* Splitbee Analytics */}
					<script async src="https://cdn.splitbee.io/sb.js"></script>
					<script
						async
						defer
						data-website-id="e992ccdb-5de4-4063-a5ff-f74e5bd829b2"
						src="https://umami-production-01a2.up.railway.app/umami.js"
					></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
