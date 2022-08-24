import removeDomContent from '../../removeDomContent';
import delivery from '../../data/deliveryRule.json'
import './cart.css';


const checkoutCalculations= (cart)=>{
    let result = {
        delivery:0,
        total : 0,
        discount : 0
    }
    Object.keys(cart).forEach(function(key){
        //    console.log(cart[key])
        cart[key].total= cart[key].qty *cart[key].price;
           // Check Multiple Offer With Quantity, Offer text 
           let offerQty = 0
           let offerPer = 0
           let calculateTotalQty= 0
           if(cart[key].offer){ 
            cart[key].discountedTotal=0;
                for(let i=0;i<cart[key].offer.length;i++){
                    offerQty= cart[key].offer[i][0];
                    let calculateQty = (cart[key].qty >offerQty - 1)?(offerQty - 1+calculateTotalQty):cart[key].qty// current calculation will be
                    calculateTotalQty += calculateQty // update total quantity calculations
                    cart[key].discountedTotal += calculateQty* (cart[key].price*(offerPer? offerPer/100:1))
                    
                    offerPer =cart[key].offer[i][1]; // update offer percentage for remaining quantity

                }
                if( cart[key].qty > calculateTotalQty){ // remain quantity calculation
                    let remainQty =cart[key].qty - calculateTotalQty
                    cart[key].discountedTotal += remainQty* (cart[key].price*(offerPer? offerPer/100:1))
                }
           }
           let discountAmount =cart[key].total - cart[key].discountedTotal ;
            if(discountAmount){
                result.total +=cart[key].discountedTotal;
                result.discount +=discountAmount;
                cart[key]['discount'] =discountAmount;
                cart[key]['discountText'] = `you will get ${offerPer}% on next ${cart[key].name}`
            }else{
                result.total +=cart[key].total
                if(cart[key].offer){
                    cart[key]['discountText'] = `you need buy  ${offerQty-cart[key].qty} more  ${cart[key].name} to get${offerPer}% `
                }
            }

    })

    // Check Delivery Charges
    let deliveryAmountList =  Object.keys(delivery)
    for(let i=0; i<deliveryAmountList.length; i++){
        let compareVal =parseInt(deliveryAmountList[i]);
        if(result.total <= compareVal) {
            result.delivery = delivery[deliveryAmountList[i]]
            break;
        }
    }


    return result
}
const cartHeaderLayout = ()=>{
    return (`
            <div class="header-sub-title" id="cart-header"> Cart Items </div>
            
    `)
}
const cartItemHeadr = () => {
    return (
        `<div class="cart-items-header" id="cart-items-header"> 
            <div class="cart-item cart-item-header"> 
                <div class="cart-item-name">NAME </div>
                <div class="cart-item-qty"> QTY </div>
                <div class="cart-item-price-header"> PRICE </div>
            </div>
        </div>
        `
    )
}
const emptyCart = () =>{
  return (
    `
    <div class="empty-cart-container"> 
      <div class="empty-cart"> Cart is Empty !</div>
    <div>

    `
  )
}

const cartCardLayout = (item) =>{
    return (`
       <div class="cart-item-container"> 
            <div class="cart-item"> 
            <div class="cart-item-name">${item.name} </div>
            <div class="cart-item-qty"> ${item.qty} </div>
            <div class="cart-item-price-container"> 
                    <div class="cart-item-price-strike"> 
                        ${item.discount?`$ ${(item.total).toFixed(2)} `:''}
                        
                    </div>
                    <div class="cart-item-price"> $ ${(item.discountedTotal?item.discountedTotal:item.total).toFixed(2)} </div>
            </div>
            </div>
            ${item.discountText?
                `
                  <div class="cart-offer-text"> OFFER :  ${item.discountText}</div>
                 `
              :''}
        </div>
    `
    )
}
const checkOutInfo = (obj) =>{
    let{delivery,total ,discount} = obj;

    return (`
        <div id="delivery-charge" class="delivery-charge">
         <div class="delivery-charge-text"> Delivery Charge : </div>
         <div class="delivery-charge-amount"> $ ${delivery} </div>
        </div>
        <div id="total-amount-conatiner" class="total-amount-container"> 
          <div class="total-amount-text text-bold"> Total Amount : </div>
          <div class="amount-container">
            <div class="total-amount text-bold">
              ${discount?`$ ${(total+discount+delivery).toFixed(2)}`:''}
            </div>
            <div class="after-discount text-bold">$   ${(total+delivery).toFixed(2)}</div>
        </div>
        </div>
        <div id="checkout" class="checkout"> 
            <button class="checkout-btn text-bold" id="checkout-btn"> Checkout </button>
        </div>
    `)
}

const cartLayout = (cart) =>{
   let tempLayout= cartHeaderLayout()
   let cartKeys = Object.keys(cart)
   removeDomContent('cart') // Remove Previous all cart childrn elements 
   if(cartKeys.length){
    let checkoutAmount = checkoutCalculations(cart);
    tempLayout += cartItemHeadr()
    cartKeys.forEach(element => {
        tempLayout += cartCardLayout(cart[element]);
        
     });
     tempLayout += checkOutInfo(checkoutAmount)

   }
   else{
    tempLayout += emptyCart()
   }

   return tempLayout;
}

export default cartLayout;