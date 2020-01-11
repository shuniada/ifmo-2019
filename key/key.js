const crypto = require('crypto');

const json = require('json');

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const constants = require('constants');

const padding = constants.RSA_NO_PADDING;

 

function getTxtSmgs(URL) {

    let xhr = new XMLHttpRequest();

    let url = URL;

    xhr.open('GET', url, false);

    xhr.send();

    return xhr.responseText;

}

 

var pub = getTxtSmgs("https://kodaktor.ru/mysteries/key");

 

var smsg = Buffer.from(getTxtSmgs("https://kodaktor.ru/mysteries/secret"), 'base64');

 

var a = crypto.publicDecrypt({ key: pub, padding: padding }, smsg);

console.log(a.toString(""));
