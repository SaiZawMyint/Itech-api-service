
export const spreadsheet = {
    getRange: (range = "")=>{
        if(!range.includes("!") || !range.includes(":")) return null;
        if(range.includes("!")){}
        let match = range.includes("!") ? range.split("!")[1] : range
        let ranges = match.includes(":") ? match.split(":") : [match]
        let data = {
            start: {
                range: ``,
                index: 0
            },
            end: {
                range: ``,
                index: 0
            }
        }
        let startN = ranges[0].search(/\d/)
        if(startN > 0){
            data.start.range = ranges[0].substring(0,startN)
            data.start.index = parseInt(ranges[0].substring(startN,ranges[0].length))
        }else{
            data.start.range = ranges[0]
            data.start.index = 1
        }

        let endN = ranges[0].search(/\d/)
        if(endN > 0){
            data.end.range = ranges[1].substring(0,endN)
            data.end.index = parseInt(ranges[1].substring(endN,ranges[1].length))
        }else{
            data.end.range = ranges[1]
            data.end.index = 1
        }
        return data
    }
}
const checkAuth = function(){
    
}
export default {spreadsheet}