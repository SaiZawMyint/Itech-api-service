import itechObject from "./itech-objects";

const itech = function(){
    return {
        cms: function(){
            return {
                /**
                 * 
                 * @param {Element} context 
                 * @param {String | null} classes 
                 * @param {String | null} styles 
                 * @returns html string
                 */
                generated: function(context,classes,styles,id){
                    return new CMS(context,classes,styles,id).html()
                },
                /**
                 * 
                 * @param {Array} templateData 
                 * @param {String} customTemplateHTML 
                 */
                wrappedTemplate: function(templateData=[],customTemplateHTML=''){
                    let temp = `<div class="w-full">`;
                    templateData.forEach(d=>{
                        temp += d
                    })
                    temp += `</div>`;
                    return temp
                },
                blogTemplate: function(title,icon,blog){
                    let date = itechObject().date(new Date(),true).format('dd,mm yy').withTime('h:m:s a')
                    return `<div class='w-full flex flex-col rounded bg-gray-100'>
                                <div class="flex border-b-2 p-3">
                                    <div class="w-10 h-10 flex items-center justify-center rounded-full bg-[#0000004c]">
                                        ${icon}
                                    </div>
                                    <div class="px-2 flex flex-col">
                                        <h3>${title}</h3>
                                        <i class="text-[.7em]">${date}</i>
                                    </div>
                                </div>
                                ${blog}
                            </div>`
                },
                previewTemplate: function(data = []){
                    return new CMS().previewTemplate(data)
                },
                getNearestSelectionAttributes: function(){
                    return new CMS().getNearestSelectionAttributes();
                }
            }
        },
        textEditor: function(cmd, value = true){
            document.execCommand(cmd,false,value)
        },
        richText: function(cmd,value){
            const target = this
            checkExecution(cmd)
            switch(cmd){
                case 'bold': {
                    document.execCommand('insertHtml',false,createItechData('b',cmd))
                } break
                case 'italic': {
                    document.execCommand('insertHtml',false,createItechData('i',cmd))
                } break
                case 'underline': {
                    document.execCommand('insertHtml',false,createItechData('u',cmd))
                } break
                case 'color': {
                    document.execCommand('insertHtml',false,createItechData('font',cmd,`color='${value}'`))
                } break
                case 'fontSize': {
                    document.execCommand('insertHtml',false,createItechData('font',cmd,`size='${value}'`))
                } break
                case 'link': {
                    document.execCommand('insertHtml',false,createItechData('a',cmd,`href='${value}' target='black'`))
                } break
                // case 'bold': {} break
            }
            
            function checkExecution(cmd){
                let nearest = target.cms().getNearestSelectionAttributes()
                console.log(nearest,itechObject(nearest).find('data-itech-cms'))
            }

            function createItechData(tag,org,attrs = '',userdefined={}){
                return `<${tag} ${attrs} data-itech-cms='{"data":{"orgin":${org},userdefined:${JSON.stringify(userdefined)}}}'>${document.getSelection()}</${tag}>`
            }
        },
        "createRandomName":function(prefix = '',tailing = ''){
            return  prefix.replaceAll(' ','')+"-"+ (Math.random() + 1).toString(36).substring(2)+tailing.replaceAll(' ','');
        },
        file: function(file){
            return {
                extension: function(){
                    if(file){
                        let ftype = file.type
                        return ftype.substring(ftype.indexOf('/')+1, ftype.length)
                    }
                }
            }
        },
        wait: function(time,action,callback){
            let id = null
            let p = 0
            clearInterval(id)
            action()
            id = setInterval(function(){
                if(p > 0){
                    clearInterval(id)
                    callback()
                }
                p++
            },time)
        }
    }
}
class CMS{
    /**
     * 
     * @param {Element} target 
     * @param {String} classes 
     * @param {String} styles 
     * @param {String} id 
     */
    constructor(target,classes,styles,id){
        this.target = target
        this.classes = classes
        this.styles = styles
        this.id = id
    }
    html(){
        let tag = this.target.tagName.toLowerCase()
        return `<${tag} class='${this.classes}' ${this.id!=null? `id='${this.id}'`:''} style='${this.styles}'>${this.target.innerHTML}</${tag}>`
    }
    previewTemplate(json = []){
        let template = ``
        let temp = ``
        json.forEach((data)=>{
            if('editor' in data){
                switch(data['editor']){
                    case 'text':{
                        let context = 'context' in data ? data['context'] : ''
                        temp += `<div class="p-2 te"  ${'id' in data? `id='${data['id']}'`:''}>${context}</div>`
                    }
                    break
                    case 'image':{
                        let view = 'view' in data ? data['view'] : 'justify-start'
                        let imgFill = 'imgFill' in data ? data['imgFill'] : 'w-auto'
                        let src = 'src' in data ? data['src'] : ''
                        temp += `<div class="p-2 flex w-full ${view}" ${'id' in data? `id='${data['id']}'`:''}>
                                    <div class="image-wrap ie ${imgFill}">
                                        <img alt="blog image" src='${src}'>
                                    </div>
                                </div>`
                    }
                    break
                }
            }
        })
        template = `<div class="w-full">${temp}</div>`
        return template;
    }
    getNearestSelectionAttributes(){
        let data = {};
        if(document.getSelection().toString().length > 0){
            let parent = document.getSelection().getRangeAt(0).startContainer.parentElement
            for(var att, i = 0, atts = parent.attributes, n = atts.length; i < n; i++){
                att = atts[i];
                data[att.nodeName] = att.nodeValue
            }
        }
        return data
    }
}
export default itech;