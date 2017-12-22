'use string';

class stringJob {

    stringToNumber(input){
        return input.replace(/\D/g,'');
    }

    isNumber(input){
        return (/\d/g).test(input);
    }
    
    isStringfunction(input){
        return (/\W/g).test(input);
    }

    isEmail(input){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(input);
    }

    extractNum(input, word){
        return this.extractMiddle(input, word);
    }

    extractMiddle(input, word){
        let wordLength = word.length + 1;
        let startPos = input.indexOf(word) + wordLength;
        input = input.substr(startPos);
        let stopPos = input.indexOf("]");
        return input.substring(0, stopPos);
    }
}

module.exports = stringJob;