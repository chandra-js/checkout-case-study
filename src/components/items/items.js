import './items.css';

const cardHeader = () =>{
    return(`
        <div class="card" id="card-header" > 
            <div class="card-img card-header" >  Plate Image </div>
            <div class="card-name card-header"> Plate Name </div>
            <div class="card-name card-header"> Plate Price </div>
        </div>
    `)
}

const cardLayout = (item) =>{
    return(`
        <div class="card" id="${item.id}" onClick={}> 
            <div class="card-img" style="background-color:${item.image}"> </div>
            <div class="card-name"> ${item.name} </div>
            <div class="card-name">$ ${item.price} </div>
            <button  class="card-action" id="action-${item.id}"> Add </div>
        </div>
    `)
}


const itemsLayout = (contents) =>{
    let tempLayout = cardHeader();
    contents.forEach((item)=>{
        tempLayout += cardLayout(item);
    })
  return tempLayout
}

export default itemsLayout; 