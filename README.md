# Simple Date Format

 A simple date formatter for javascript.

# install

```cmd
npm install @jacktown/simple-date-format --save
```

# use example

```javascript
import { SimpleDateFormat as SDF } from '@jacktown/simple-date-format';
var sdf = new SDF('yyyy-MM-dd hh:mm:ss');
console.log(sdf.parse('2018-10-11 04:04:23').getTime()); // 1539201863000
console.log(sdf.format(new Date())); // 2019-01-08 15:20:23
```

# API

## SimpleDateFormat()

The constructor to build a formatter instance.

### Syntax

`let sdf = new SimpleDateFormat(formatStr)`

### Paramters
  
`formatStr`, the format string used to format Date object or parse date string. The char's meaning in this parameter is as follows:
  * `y`, year
  * `M`, month
  * `d`, day
  * `h`, hour
  * `m`, minute
  * `s`, second
  * `S`, millisecond

### Return value

the formatter instance.

## format()

The method to format an Date type object to string.

### Syntax

`sdf.format(dateObj)`

### Paramters

`dateObj`, the Date type object to be formatted.

### Return value

a formated date string.

## parse()

The method to parse a date string to a Date type object.

### Syntax

`sdf.parse(dateStr)`

### Parameters

`dateStr`, the date string to be parsed.

### Return value

a Date type object.

