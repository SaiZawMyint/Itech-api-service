
const extensions = (contentType)=>{
    switch(contentType){
        case "text/plain": return "txt"
        case "text/html": return "html"
        case "text/css": return "css"
        case "text/xml": return "xml"
        case "image/gif": return "gif"
        case "image/jpeg": return "jpeg"
        case "application/x-javascript": return "js"
        case "application/atom+xml": return "atom"
        case "application/rss+xml": return "rss"
        case "text/mathml": return "mml"
        case "text/vnd.sun.j2me.app-descriptor": return "jad"
        case "text/vnd.wap.wml": return "wml"
        case "text/x-component": return "htc"
        case "image/png": return "png"
        case "image/tiff": return "tiff"
        case "image/vnd.wap.wbmp": return "wbmp"
        case "image/x-icon": return "ico"
        case "image/x-jng": return "jng"
        case "image/x-ms-bmp": return "bmp"
        case "image/svg+xml": return "svg"
        case "image/webp": return "webp"
        case "application/java-archive": return "jar"
        case "application/mac-binhex40": return "hqx"
        case "application/msword": return "doc"
        case "application/pdf": return "pdf"
        case "application/postscript": return "ps"
        case "application/rtf": return "rtf"
        
    }
}

const download = (name,data,contentType)=>{
    let blob = new Blob([data],{type:contentType})
    let link = document.createElement('a')
    link.href=window.URL.createObjectURL(blob)
    link.download = name
    link.click()
}

export const itechAPI = ()=>{
    return{
        download
    }
}

export default itechAPI