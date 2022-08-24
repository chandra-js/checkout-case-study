import {appendDOMChild} from "../../addDomContent";
import itemsLayout from "../items/items";
import cartLayout from "../cart/cart";
import './layout.css'
import plates from '../../data/plates.json';

let cart = {

}
/* Create Main Layout HTML */
const mainLayout = () =>{
    return (`<div>
    <div id="header" class="header">
        <div class="header-title"> Case Study</div>
    </div>
    <div id ="main" class="main" > 
        <div id ="items" class="items"> 
            <div class="header-sub-title" id="items-header"> Order Food Online </div>
        </div> 
        <div id ="cart" class="cart"> 
            
        </div>
    </div>
    </div>`)
}

const manageCart =(id) =>{
    if(cart[id]){
        cart[id].qty +=1 
    }else{ 
        let findPlate = plates.filter(plate=>plate.id === id);
        cart[id]={...findPlate[0],qty:1};
    }

    createCartLayout(); // Update the Cart Layout
}

const itemDynamicClickEvents = (className,checkout=false) =>{
    let elements = document.getElementsByClassName(className);
    for(let i=0;i<elements.length;i++){
        let element = elements[i];
        element.addEventListener('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            if(checkout){
                cart ={}
                createCartLayout()
            }else{
                let id = e.target.id
                manageCart(id.split("-")[1])
            }
           
        })
    }
}


const createItemsLayout = () =>{
    /* Create Item Layout Object */
    const itemsObj= {
        parent:'items',
        children:itemsLayout(plates)
    }

    /* Create Main Layout */
    appendDOMChild(itemsObj)  
    itemDynamicClickEvents('card-action')
}

const createCartLayout =() =>{
    /* Create Cart Layout Object */
    const cartObj= {
        parent:'cart',
        children:cartLayout(cart)
    }

       /* Create cart Layout */
       appendDOMChild(cartObj)  
       itemDynamicClickEvents('checkout-btn',true)
}

const Layout = ()=>{
    /* Create Main Layout Object */
    const mainObj= {
        parent:'root',
        children:mainLayout()
    }
    /* Create Main Layout */
   appendDOMChild(mainObj)  

   createItemsLayout() // Create Item Layouts
   
   createCartLayout() // Create cart layouts


}

export default Layout;
