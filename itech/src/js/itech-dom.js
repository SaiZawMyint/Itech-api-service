const itechDom = function(selector){
    var selectors = $_(selector)
    function command(cmd) {
        selectors = selectors instanceof Element ? [selectors] : selectors;
        [].forEach.call(selectors, cmd); 
    }
    return {
        toggleClass: function(cls){
            if(selectors instanceof HTMLElement){
                toggle(selectors)
            }else{
                command(function(ele){
                    toggle(ele)
                })
            }
            
            function toggle(ele){
                if(ele.classList.contains(cls)){
                    ele.classList.remove(cls)
                }else{
                    ele.classList.add(cls)
                }
            }
        },
        width: function(width){
            if(selectors instanceof HTMLElement){
                selectors.style.width = width
            }else{
                command(function(ele){
                    ele.style.width = width
                })
            }
        },
        addClass: function(cls = ''){
            let clss = [cls]
            if(cls.includes(' ')){
                clss = cls.split(' ')
            }
            clss.forEach(c=>{
                command(function(ele){
                    ele.classList.add(c)
                })
            })
        },
        removeClass: function(cls = ''){
            let clss = [cls]
            if(cls.includes(' ')){
                clss = cls.split(' ')
            }
            clss.forEach(c=>{
                command(function(ele){
                    ele.classList.remove(c)
                })
            })
        },
        hasClass: function(cls = ''){
            let check = false;
            command(function(ele){
                check = ele.classList.contains(cls)
            })
            return check
        }
    }
}

function $_(selector) {
    if(selector instanceof Element) return selector
    return document.querySelectorAll(selector);
}
function i_id(id) {
    return document.getElementById(id);
}
function i_class(cls) {
    return document.getElementsByClassName(cls);
}
function i_create(tag) {
    return document.createElement(tag);
}
function i_append(parent, ...children) {
    children.forEach(child => {
        parent.appendChild(child);
    });
}

export default itechDom