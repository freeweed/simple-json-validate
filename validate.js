const stringJob = require('./stringJob');

class validate{

    constructor(paramConfig = null){
        this.paramConfig = paramConfig;
        this.stringJob = new stringJob();
    }

    check(paramName = "", params = null){
        let checkResult = {
            error: []
        };
        if(this.paramConfig){
            if(this.paramConfig.hasOwnProperty(paramName)){// check is that have property
                try{
                    if(typeof params === "object"){//the params is object
                        if(params == null){
                            params = {};
                        }
                        checkResult = params;
                        checkResult.error = [];
                        for(var checkConfig in this.paramConfig[paramName]){//loop around setting
                            if(params.hasOwnProperty(checkConfig) && params[checkConfig]){//if params have config && param have value
                                let condition = this.paramConfig[paramName][checkConfig].split('|');
                                for(var i=0;i<condition.length;i++){
                                    if(condition[i].match(/(number)/g)){
                                        checkResult.isValid = this.stringJob.isNumber(params[checkConfig]); 
                                        if(!checkResult.isValid){
                                            checkResult.error.push(checkConfig + ": " + this.paramConfig[paramName][checkConfig]);
                                        }
                                    }else if(condition[i].indexOf('_length') >= 0){
                                        let num = this.stringJob.stringToNumber(condition[i]);
                                        if(condition[i].indexOf('max_length') >= 0){
                                            if(params[checkConfig].length > num){
                                                checkResult.isValid = false;
                                                checkResult.error.push(checkConfig + ": " + this.paramConfig[paramName][checkConfig]);
                                            }
                                        }else if(condition[i].indexOf('min_length') >= 0){
                                            if(params[checkConfig].length < num){
                                                checkResult.isValid = false;
                                                checkResult.error.push(checkConfig + ": " + this.paramConfig[paramName][checkConfig]);
                                            }
                                        }
                                    }else if(condition[i].indexOf('_value') >= 0){
                                        if(condition[i].indexOf('min_value') >= 0){
                                            let num = this.stringJob.extractNum(this.paramConfig[paramName][checkConfig], 'min_value');
                                            if(parseInt(params[checkConfig]) < num){
                                                if(this.paramConfig[paramName][checkConfig].indexOf('default') && condition[i].indexOf('!') < 0){
                                                    num = this.stringJob.extractNum(this.paramConfig[paramName][checkConfig], 'default');
                                                }
                                                checkResult[checkConfig] = num;
                                            }
                                        }else if(condition[i].indexOf('max_value') >= 0){
                                            let num = this.stringJob.extractNum(this.paramConfig[paramName][checkConfig], 'max_value');
                                            if(parseInt(params[checkConfig]) > num){
                                                if(this.paramConfig[paramName][checkConfig].indexOf('default') && condition[i].indexOf('!') < 0){
                                                    num = this.stringJob.extractNum(this.paramConfig[paramName][checkConfig], 'default');
                                                }
                                                checkResult[checkConfig] = num;
                                            }
                                        }
                                    }else if(condition[i].indexOf('email') >= 0){
                                        checkResult.isValid = this.stringJob.isEmail(params[checkConfig]);
                                        if(!checkResult.isValid){
                                            checkResult.error.push(checkConfig + ": " + this.paramConfig[paramName][checkConfig]);
                                        }
                                    }
                                }
                            }else{
                                if(this.paramConfig[paramName][checkConfig].indexOf('required') >= 0){
                                    checkResult.isValid = false;
                                    checkResult.error.push(checkConfig + ": " + this.paramConfig[paramName][checkConfig]);
                                }
                            }

                            if( this.paramConfig[paramName][checkConfig].indexOf('default') >= 0){
                                if(!params.hasOwnProperty(checkConfig)){
                                    checkResult[checkConfig] = this.stringJob.extractNum(this.paramConfig[paramName][checkConfig], 'default');
                                }
                            }
                            if(this.paramConfig[paramName][checkConfig].indexOf('avaliable') >= 0){
                                let avaliableData = this.stringJob.extractMiddle(this.paramConfig[paramName][checkConfig], 'avaliable').split(',');
                                let pass = false;
                                for(var i=0;i<avaliableData.length;i++){
                                    if(avaliableData[i] === params[checkConfig]){
                                        pass = true;
                                    }
                                }
                                if(!pass){
                                    checkResult.isValid = false;
                                    checkResult.error.push(checkConfig + ": " + this.paramConfig[paramName][checkConfig]);
                                }
                            }
                            if( this.paramConfig[paramName][checkConfig].indexOf('limit') >= 0){
                                if(!checkResult.isValid){
                                    checkResult.isValid = true;
                                    if(checkResult.error){
                                        delete checkResult.error;
                                    }
                                }
                                let limit = checkResult[checkConfig] = this.stringJob.extractNum(this.paramConfig[paramName][checkConfig], 'limit');
                                if(params[checkConfig] != limit){
                                    checkResult[checkConfig] = limit
                                }
                            }
                            if(checkResult.error.length > 0){
                                checkResult.isValid = false;
                            }else{
                                checkResult.isValid = true;
                            }
                        }           
                    }else{
                        checkResult.status = false;
                    }
                }catch(e){
                    throw "Please Check Your Pattern Or Your Input";
                }
            }else{
                throw "Invalid Property"
            }
        }else{
            throw "Please Set Json Pattern"
        }
        if(checkResult.error.length == 0){
            delete checkResult.error;
        }
        return checkResult;
    }

}

module.exports = validate;