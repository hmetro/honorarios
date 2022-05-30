module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{png,css,json,txt,eot,otf,ttf,woff,woff2,jpg,svg,hbs,md,ts,scss,ico,crt,key}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};