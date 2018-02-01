/*
* @Author: Mr.Sofar
* @Date:   2018-02-01 20:44:36
* @Last Modified by:   Mr.Sofar
* @Last Modified time: 2018-02-01 21:21:13
*/
const marked = require('marked');
const fs = require('fs');
const util = require('util');
const yaml = require('yamljs');
const conf = yaml.parse(fs.readFileSync("./config.yaml").toString());
console.log(conf);

const readMd = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
var html;

readMd('./homepage.md')
	.then(data => {
		html = marked(data.toString());
		return readMd('./original.html');
	})
	.catch(err => {
		console.log(err);
	})
	.then(data => {
		html = data.toString().replace("<Sofar />",html);
		html = html.replace("<Title />",conf.title);
		html = html.replace("<Description />",conf.description);
		return writeFile("./index.html",html);
	})
	.catch(err => {
		console.log(err);
	})
	.then(data => {
		console.log("success");
	})
	.catch(err => {
		console.log(err);
	})