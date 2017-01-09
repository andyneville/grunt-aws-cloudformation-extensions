const fs = require('fs')
const path = require('path')

const promisify = require('es6-promisify')

const readFile = promisify(fs.readFile)

function replaceSubs(str) {
	if (str.indexOf('<%cfnex') !== -1 && str.indexOf('cfnex%>') !== -1) {
		const left = str.split('<%cfnex')[0]
		let middle = str.split('<%cfnex')[1].split('cfnex%>')[0]
		const right = str.split('cfnex%>')[1]

		try {
			middle = JSON.parse(middle)
		} catch (e) { /* if the parse fails, it will leave the original string intact */ }

		return { 'Fn::Join': ['', [left, middle, right]] }
	}

	return str;//.replace(/\\t/g, "\t")
}

function includeFile(args, { cwd, logger }) {
	const aargs = [...args]
	const filename = aargs.shift()

	const fn = path.resolve(cwd, filename)
	logger.debug(`including file ${fn}`)

	return readFile(fn, 'utf-8')
			.then(fileContents => {
			const split = fileContents.split('\n').map(replaceSubs)
			const output = { 'Fn::Join': ['\n', split] }

			return { output }
		})
}

module.exports = includeFile
