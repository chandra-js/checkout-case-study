function findDomContent(id){
    let dom = document.getElementById(id);
    return dom?dom:null
    
}

function addDOMContent(contents) {
    let {parent,element , id,  styles , content, children} = contents;
    let dom = findDomContent(parent)
    const node = document.createElement(element)
    node.id= id;
    node.className= styles;
    node.innerText = content ;
    dom?dom.appendChild(node):document.body.appendChild(node);
}

function appendDOMChild  (contents){
    let {parent,element , id,  styles , content, children} = contents;
    let dom = document.getElementById(parent)
    dom?dom.insertAdjacentHTML("beforeend",children):document.body.insertAdjacentHTML("beforeend",children);
}


  
  export {addDOMContent,appendDOMChild }; 