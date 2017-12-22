# SIMPLE-JSON-VALIDATE

tool for check json input and set json data

## Getting Started

### Installing
```
npm install simple-json-validate --save
```

### Usage

```js
const validate = require('simple-json-validate');
const pattern = {
    "test": {
        "id": "required|number|max_length[13]|min_length[13]",
        "email": "required|email",
        "period": "default[30]",
        "value": "required|limit[100]"
    }
};
let input = {
    "id": "1111111111111",
    "email": "freeweed.m@gmail.com",
    "value": "10000"
}

let validated = new validate(pattern);
let output = validated.check('test', input);
console.log(output);//{"id":"1111111111111","email":"freeweed.m@gmail.com","value":"100","period":"30","isValid":true}
```

## How To use
### 1. Require SIMPLE-JSON-VALIDATE
```js
const validate = require('simple-json-validate');
```
### 2. Setup Your Json Pattern
```js
  var pattern = {
    "first pattern name": {
      "json key": "setup format"
    },
    "second pattern name": {
        "json key": "setup format"
    }
  }
  new validate(pattern);
```

### 3. Call Check Function

```js
   let output = validated.check("pattern name", input)
```

```
    NOTE: input can be only JSON Object
```

## The Format

You can use multiple format with | between format such as 

```
"id": required|number|max_length[13]|min_length[13]
```

### Avaliable Format

```
required
```
data is required

```
number
```
accept only number

```
email
```
accept only email

```
default[...]
```
set default data (This option will use only when input data is invalid or null. replace [...] with default data such as default[30])

```
avaliable[...]
```
set data that can be accepted (replace [...] with accepted data such as avaliable[banana, weed])

```
limit[...]
```
what ever input data will set 

```
max_length[...]
```
maximum length of data can be accepted (replace [...] with interger such ass max_length[13]) 

```
min_length[...]
```
minimum length of data can be accepted (replace [...] with interger such as min_length[13]) 

```
max_value[...]
```
maximum value of data can be accepted (replace [...] with interger such as man_value[10]) 

```
min_value[...]
```
minimum value of data can be accepted (replace [...] with interger such as min_value[1]) 

## Authors
freeweed

## License
This project is licensed under the WTFPL License - see the [LICENSE.md](LICENSE.md) file for details