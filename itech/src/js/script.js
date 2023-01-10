import zipFile from '../assets/img/icons/zip-icon.png';
import textFile from '../assets/img/icons/text-icon.png';
import unknowFile from '../assets/img/icons/unknow-icon.png';
import excel from '../assets/img/icons/Google_Sheets_Logo.svg'
import pdf from '../assets/img/icons/pdf-icon.png';
import docx from '../assets/img/icons/docx-icon.png';
import archive from '../assets/img/icons/archive-icon.png';
import folder from '../assets/img/icons/folder-icon.svg';

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
export const fileTypeLogo = (type)=>{
    console.log(type)
    switch(type){
        case "txt":{
            return textFile
        }
        case "zip":{
            return zipFile
        }
        case "xlsx":{
            return excel
        }
        case "unknow":{
            return unknowFile
        }case "pdf":{
            return pdf
        }
        case "docx":{
            return docx
        }
        case "archived":{
            return archive
        }
        case "drive-folder":{
            return folder
        }
        default:{
            return unknowFile
        }
    }
}
export default {spreadsheet,fileTypeLogo}