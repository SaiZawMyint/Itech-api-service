
/**
 * Itech JS (JavaScript Library)
 * -----------------------------
 * 
 * Itech was build for your work to make it faster and shorter coding.
 * 
 * Features
 * ---------
 * - Objects are not initialize the original one (to prevent default privacy).
 * - Datetime calculation & formatting.
 * 
 * @param {String | Element | NULL} selector 
 * @author SaiZawMyint
 * @returns relational functions
 */
 const itechObject = function (selector) {
    let selected = selector == undefined ? Object: selector
    var iObj = new IObject(selected)

    return {
        date,
        get: ()=>{
            return iObj.obj
        },
        /**
         * 
         * @param {*} search 
         * @param {*} key 
         * @return Index of find
         */
        find: (search,key)=>{
            
            return iObj.find(search,key)
        },
        /**
         * Find max value of array
         * @returns index of Array
         */
        max: ()=>{
            return iObj.max()
        },
        /**
         * Add value to object.
         * @param  {any} value 
         */
        add: (value,index)=>{
            return iObj.add(value,index)
        },
        /**
         * Objects concatation
         * 
         * ``Note: you can't concat any number!``
         * @param {Array | Number | String | Object} value - value to concat
         * @returns 
         */
        concat: (value)=>{
            return iObj.concat(value)
        },
        /**
         * 
         * @param {String} key 
         * @param {String} value 
         * @returns Object
         */
        replace: (key,value)=>{
            return iObj.replace(key,value)
        },
        /**
         * Delete value from object or array.
         * 
         * In array, the deletion will executed from the index only.
         * 
         * e.g => 
         * 
         *        [1,4,5,9,3]
         *        delete(3)
         *        [1,4,5,3]
         * @param {Number | String} index 
         * @returns final result
         */
        delete: (index)=>{
            return iObj.delete(index)
        },
        /**
         * Remove values from Object or Array (Multiple case for array).
         * 
         * @param {String | Number} value - value to remove
         * @param {String | Number | null} key - key to remove
         * @returns final result
         */
        remove: (value,key)=>{
            return iObj.remove(value,key)
        },
        empty: ()=>{
            return iObj.empty()
        },
        /**
         * Wait function
         * 
         * A function that you can use to wait until the process done by specify minutes
         * 
         * @param {Number} time - execution time
         * @param {Function} before - before callback function
         * @param {Function} after - after callback function
         */
        wait: (time, before, after) => {
            let id = null
            let p = 0
            clearInterval(id)
            before()
            id = setInterval(function () {
                if (p > 0) {
                    clearInterval(id)
                    after()
                }
                p++
            }, time)
        },
        call: (link)=>{
            //fetch default datas
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                body: null,
                redirect: 'follow'
            }
            return{
                get: async (req = requestOptions)=>{
                    req.method = 'GET'
                    return fetch(link,req).then((res)=>res.json())
                },
                post: async (req = requestOptions)=>{
                    req.method = 'POST'
                    return fetch(link,req).then((res)=>res.json())
                }
            }
        },
        log: (...data)=>{
            console.log(data)
        },
        json: (file,callback)=>{
            let data;
            if (file) {
                var reader = new FileReader();
                const blob = new Blob([file], {type:"application/json"});
                
                reader.onload = function (evt) {
                    data = evt.target.result;
                    callback(JSON.parse(data))
                }
                reader.readAsText(blob);
            }
            
        }
    }
}

/**
* Date actions
* @param {String | Date} date 
*/
const date = (date = new Date(),short = false) => {

   if(new Date(date) == 'Invalid Date') throw new Error("Invalid date")

   const idate = new IDate(date,short);

   return {
        /**
         * #### Format date
         * 
         * In formatting date, you can simply use d for day, m for month and y for year. to get full name duplicate the single letter.
         * 
         * ``NOTE : there has a nested function named 'withTime'! You can get date with time and you can pass time format as param
         *  to this nested function. (e.g format('d,m y').withTime('h:m:s a')) ``
         * @param {String} fmt
         * @returns 
         */
       format: (formation = 'd-m-y') => {
           return idate.formate(formation)
       },
       /**
        * Add day to Date.
        * @param {Number} count - Number of Day to add
        * @returns 
        */
       addDay: (count) => {
           return idate.addDay(count)
       },
       /**
        * Add month to Date
        * @param {Number} count - Number of Month to add
        * @returns 
        */
       addMonth: (count) => {
           return idate.addMonth(count)
       },
       /**
        * Reduce day form Date.
        * @param {Number} count - Number of Day to reduce
        * @returns 
        */
       reduceDay: (count) => {
           return idate.reduceDay(count)
       },
       /**
        * 
        * @param {Number} count - Number of Month to reduce
        * @returns 
        */
       reduceMonth: (count) => {
           return idate.reduceMonth(count)
       },
       /**
        * Compare two date
        * @param {Date} otrdate - Date to compare
        * @returns An object with same, greater and smaller
        */
       compare: (otrdate = new Date()) => {
           return idate.compare(otrdate)
       },
       /**
        * Simple compare date differences.
        * @param {Date | DateString} compareDate 
        * @returns 
        */
       difference: (compareDate = new Date)=> {
        return idate.difference(compareDate)
       }
   }
}
/**
 * 
 * @param {Element | String} selector 
 */
const selectElements = (selector) => {
    if (!selector) return null
    if (selector instanceof Element) return selector
    if (typeof x == 'string') return document.querySelectorAll(selector)
}

class IDate{
    static SPLITOR = /[\-\/\ \,]/
    /**
     * #### Itech Date
     * ----
     * Date time calculator for datetime formattings, calculations and initializations.
     * @param {Date | String} date 
     * @param {Boolean} short - default false
     */
    constructor(date = new Date().toDateString(),short = false){
        this.date = new Date(date)
        this.short = short
    }
    /**
     * #### Format date
     * 
     * In formatting date, you can simply use d for day, m for month and y for year. to get full name duplicate the single letter.
     * 
     * ``NOTE : there has a nested function named 'withTime'! You can get date with time and you can pass time format as param
     *  to this nested function``
     * @param {String} fmt
     * @returns 
     */
    formate(fmt = 'd-m-y'){
        let result = ''
        const date = new Date(this.date)
        const nonW = cmnFns.nonWords(fmt)
        result = (cmnFns.convertDMYCases(fmt,nonW,date,this.short))
        let data =  {
            get: function(){
                return this.result
            }
        }
        Object.defineProperties(data,{
            withTime:{
                writable: true,
                configurable: true,
                enumerable: false
            },
            get: {
                writable: true,
                configurable: true,
                enumerable: false
            }
        })
        data.result = result
        data.withTime = function(timeformat = 'h:m:s a'){
            const nonW = cmnFns.nonWords(timeformat)
            const ampm = timeformat.charAt(timeformat.length -1) == 'a'
            timeformat = ampm ? timeformat.substring(0,timeformat.length-2) : timeformat
            let tresult = cmnFns.convertHMSCases(timeformat,nonW,date,ampm)
            return `${result} ${tresult}`
        }
        return data
    }
    /**
     * #### Add day
     * 
     * Adding day to date. You can use any number.
     * @param {Number} numOfDay 
     * @returns 
     */
    addDay(numOfDay){
        let addedDate = new Date(this.date);
        addedDate.setDate(addedDate.getDate() + numOfDay)
        return addedDate.toDateString()
    }
    /**
     * #### Add Month
     * 
     * Adding month to date. You can use any number.
     * @param {Number} numOfMonth 
     * @returns 
     */
    addMonth(numOfMonth){
        return new Date(this.date.setMonth(this.date.getMonth() + numOfMonth)).toDateString()
    }
    /**
     * #### Reduce day
     * Reduce day from date. You can use any number.
     * @param {Number} numOfDay 
     * @returns 
     */
    reduceDay(numOfDay){
        let addedDate = new Date(this.date);
        addedDate.setDate(addedDate.getDate() - numOfDay)
        return addedDate.toDateString()
    }
    /**
     * #### Reduce month
     * Reduce month from date. You can use any number.
     * @param {Number} numOfMonth 
     * @returns 
     */
    reduceMonth(numOfMonth){
        return new Date(this.date.setMonth(this.date.getMonth() - numOfMonth)).toDateString()
    }
    /**
     * #### Compare two date
     * Compare two date. The date params can be a date of string.
     * @param {Date | String} otrDate 
     * @returns 
     */
    compare(otrDate = new Date){
        const ndate = new Date(this.date)
        const nodate = new Date(otrDate)
        return {
            same: ndate >= nodate && ndate <= nodate,
            greater: !(ndate >= nodate && ndate <= nodate) && ndate >= nodate,
            smaller: !(ndate >= nodate && ndate <= nodate) && ndate <= nodate
        }
    }
    /**
     * #### Date differences
     * Calculate the differences between two date.
     * @param {Date | String} compareDate 
     * @returns Differences days, hours, times
     */
    difference(compareDate = new Date()){
        let date = new Date(compareDate)
        let orgdate = new Date(this.date)
        const differenceTimes = Math.abs(date - orgdate)
        const differenceDays = (differenceTimes / (1000 * 60 * 60 * 24))
        const differenceHours =(differenceDays * 24)
        return {
            differenceDays,
            differenceTimes,
            differenceHours
        }
    }
}
const cmnFns = {
    nonWords: function(str){
        let arrStr = str.split("")
        var strRegExp = /\W/g
        let arrNonWord = []
        arrStr.forEach(function (str) {
            var result = str.match(strRegExp)
            if (result)
                arrNonWord.push(result[0])
        })
        return arrNonWord
    },
    convertDMYCases: function(dmy = 'd-m-y',splitor = ['-','-'],date = new Date(),short = false){
        let cases = [
            dmy.slice(0,dmy.indexOf(splitor[0])), //first case
            dmy.slice(dmy.indexOf(splitor[0])+1,dmy.lastIndexOf(splitor[1])), //middle case
            dmy.slice(dmy.lastIndexOf(splitor[1])+1,dmy.length) //last case
        ]
        splitor.push('');
        let dates = '';
        let i = 0;
        for(let c of cases){
            c = c.trim()
            if(this.length > 0 && this.length < 3){
                throw new Error("Invalid date format!")
            }else{
                let dmy = dOmOy(c);
                if(short && (c != 'y' && c!= 'yy')){
                    dmy = dmy.substring(0,3)
                }
                dates += dmy.concat(splitor[i++])
            }
        }
        return dates;
        function dOmOy(c){
            let data = '';
            switch (c) {
                case 'd': { data = day() } break;
                case 'dd': { data = day(true) } break;
                case 'm': { data = month() } break;
                case 'mm': { data = month(true) } break;
                case 'y': { data = year() } break;
                case 'yy': { data = year(true) } break;
                default: { throw new Error("Invalid parsing date!") }
            }
            return data
        }
        function day(full = false){
            if(full){
                return DateUtils.day(date.getDay())
            }else{
                return NumUtils.padZero(date.getDay())
            }
        }
        function month(full = false){
            if(full){
                return DateUtils.month(date.getMonth())
            }else{
                return NumUtils.padZero(date.getMonth())
            }
        }
        function year(full = false){
            if(full){
                return date.getFullYear().toString()
            }else{
                return DateUtils.year(date.getFullYear().toString())
            }
        }
    },
    convertHMSCases: function(hms = 'h:m:s',splitor = [':',':'], date = new Date(),ampmCase = false){
        let cases = [
            hms.slice(0,hms.indexOf(splitor[0])), //first case
            hms.slice(hms.indexOf(splitor[0])+1,hms.lastIndexOf(splitor[1])), //middle case
            hms.slice(hms.lastIndexOf(splitor[1])+1,hms.length) //last case
        ]
        splitor.push('');
        let dates = '';
        let i = 0;
        let ampm = ''
        for(let c of cases){
            c = c.trim()
            if(this.length > 0 && this.length < 3){
                throw new Error("Invalid time format!")
            }else{
                let dmy = HMS(c);
                let h = ''
                if(c == 'h' || c == 'hh'){
                    if(ampmCase){
                        ampm = dmy.ampm
                    }
                    h = dmy.hour
                }else{
                    h = dmy
                }
                dates += h.concat(splitor[i++])
            }
        }
        if(ampm){
            dates = dates.concat(ampm);
        }
        return dates
        function HMS(c){
            let data;
            switch (c) {
                case 'h': { data =  hour()} break;
                case 'hh': { data = hour(true) } break;
                case 'm': { data = minute() } break;
                case 'mm': { data = minute(true) } break;
                case 's': { data = second() } break;
                case 'ss': { data = second(true) } break;
                default: { throw new Error("Invalid parsing time!") }
            }
            return data
        }
        function hour(full = false){
            return NumUtils.convert24(date.getHours(),full)
        }
        function minute(full = false){
            if(full){
                return NumUtils.padZero(date.getMinutes())
            }else{
                return (date.getMinutes()).toFixed(0)
            }
        }
        function second(full = false){
            if(full){
                return NumUtils.padZero(date.getSeconds())
            }else{
                return (date.getSeconds()).toFixed(0)
            }
        }
    },
    repeatCharacter: function(str){
        return str => new Set(str).size < str.length;
    },
}
const NumUtils = {
    padZero: function(num = 0){
        if(num < 10) return `0${num}`
        else return num.toString()
    },
    convert24: function(num = 0, full){
        let data = {hour: '',circadian: false,ampm: ''}
        if(num < 12){
            data.hour = full ? num.toFixed(0) : NumUtils.padZero(num)
            data.circadian = false
            data.ampm = 'AM'
        }else{
            data.hour = full ? num.toFixed(0) : NumUtils.padZero(num - 12)
            data.circadian = true
            data.ampm = 'PM'
        }
        return data
    }
}
const DateUtils = {
    day: function(index = 0){
        const dayofweek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        return dayofweek[index]
    },
    month: function (index = 0  ){
        const monthOfYear = ['January','February','March','April','May','June','July','August','September','October','November','December']
        return monthOfYear[index]
    },
    year: function(year = new Date().getFullYear().toString()){
        year = year.substring(year.length-2)
        return year
    }
}

class IObject {
    constructor(object){
        this.obj = object instanceof Array ? Object.assign([],object) : 
                    typeof object == 'string' ? new String(object) : 
                    typeof object == 'number' ? new Number(object) : 
                    typeof object == 'object' ? Object.assign({},object) : null
    }
    find(search,key){
        if(this.obj instanceof Array){
            if(key){
                return this.obj.findIndex(s=> s[key] == search)
            }else{
                return this.obj.findIndex(s=> s == search)
            }
        }
        if(this.obj instanceof String)return this.obj.indexOf(search)
        if(this.obj instanceof Number)throw new Error("You can't perform find action to number!")
        if(this.obj instanceof Object){
            if(key){
                return this.obj[key]
            }else{
                let found = null
                for(let k in this.obj){
                    if(k == search){
                        found = this.obj[k]
                        break
                    }
                }
                return found
            }
        }
    }
    max(){
        if(this.obj instanceof Array){
            return this.obj
                .map(a => a.length)
                .indexOf(Math.max(...this.obj.map(a => a.length)));
        }
        return null;
    }
    add(value,index) {
        if (this.obj instanceof Array) { 
            if(index){
                return this.obj.splice(index,0,value)
            }else{
                this.obj.push(value);
                return this.obj 
            }
            
        }
        else if (this.obj instanceof String) return this.obj.concat(value)
        else if (this.obj instanceof Number) return this.obj += value
        else if (this.obj instanceof Object) return Object.assign(this.obj, value)
    }
    
    concat(value){
        if (this.obj instanceof Array) { 
            if(!(value instanceof Array)) throw new Error("value must be an array.")
            switch(this.obj.length > 15 || value.length > 15){
                case true: this.obj.push.apply(this.obj,value)
                break
                case false: this.obj = this.obj.concat(value)
                break
                default: throw new Error("Unexpected error occoured!")
            }
            return this.obj 
        }
        else if (this.obj instanceof String) return this.obj.concat(value)
        else if (this.obj instanceof Number) throw new Error("Yan cannot concat any number use add instead!")
        else if (this.obj instanceof Object) return Object.assign(this.obj, value)
    }
    replace(key,value){
        if(this.obj instanceof Array){
            this.obj.splice(key,1,value)
        }
        else if (this.obj instanceof String){
            this.obj.replace(key,value)
        }
        else if (this.obj instanceof Number){
            throw new Error("Cannot replace a number!")
        }
        else if(this.obj instanceof Object){
            if(Object.hasOwnProperty.call(this.obj,key)){
                this.obj[key] = value
            }
        }
        return this.obj
    }
    remove(value, key){
        if(this.obj instanceof Array){
            if(key){
                return this.obj.filter(d => d[key] != value)
            }else{
                return this.obj.filter(d=> d !== value)
            }
        }else if(this.obj instanceof Object){
            if(Object.hasOwnProperty.call(this.obj,value)){
                delete this.obj[value]
                return this.obj
            }else if(key){
                if(this.obj[key] === value){
                    delete this.obj[key]
                }
                return this.obj
            }
            if(this.obj instanceof String){
                return this.obj.replace(value,'')
            }
        }
        
    }
    delete(index){
        if(this.obj instanceof Array){
            this.obj.splice(index,1)
            return this.obj
        }else if(this.obj instanceof String){
            throw new Error("To delete string use empty instead!")
        }else if(this.obj instanceof String){
            throw new Error("To delete number use empty instead!")
        }else if (typeof this.obj == 'object'){
            return this.remove(index)
        }
    }
    empty(){
        if(this.obj instanceof Array) {this.obj.length = 0}
        if(this.obj instanceof String) {this.obj = ""}
        if(this.obj instanceof Number) {this.obj = 0}
        if(this.obj instanceof Object){
            for(let key in this.obj){
                delete this.obj[key]
            }
        }
        return this.obj
    }
}
export default itechObject