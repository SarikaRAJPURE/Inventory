console.log("testing");

//veggieavailablity.textContent = 

let containerelem = document.getElementById('item-data');
let searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', async () => {
    let userItem = document.getElementById('search-item').value;
    console.log(userItem);
    if (userItem === "") {
        containerelem.textContent = "Please Enter Item you are looking for"
    } else {
        try {
            let itemData = await fetch(`http://localhost:5000/search/${userItem}`);
            let parsedData = await itemData.json();
            console.log(parsedData);
            console.log(parsedData[0].name);
            /*  expression = "/" + userItem +"/"+ "i";
             matchStr = regexp(userItem,expression,'match');
             console.log(matchStr); */
            /* if (userItem === parsedData[0].name) { */
            containerelem.innerHTML = `<p>The ${parsedData[0].name} is available.</p>
            <p>Name:${parsedData[0].name}</p>
            <p>Price:${parsedData[0].price}</p>
            <p>Inventory:${parsedData[0].inventory}</p>
            <p>Next Delivery Date:${parsedData[0].nextDelivery}</p>
            <p>Quantity to deliver:${parsedData[0].deliveryAmt}</p>
            <button>Buy</button>`;
            //} else {
    
            //containerelem.textContent = "Item you are looking for is not available right now";
            //}
        }
        catch(err){
            containerelem.textContent = "Sorry, Item you are looking for is not available right now";
        }
    }
});




let homeButton = document.getElementById('home');
homeButton.addEventListener('click', () => {
    window.location.href = "/";
});


let createItemButton = document.getElementById('create-item-btn');
createItemButton.addEventListener('click', () => {
    window.location.href = "/createItem";   //TO acess create item folder for index.html
});

let displayItemsButton = document.getElementById('dispaly-item-btn');
displayItemsButton.addEventListener('click', () => {
    window.location.href = "/displayItem";
});
let inventoryButton = document.getElementById('inventory-btn');
inventoryButton.addEventListener('click', () => {
    //window.location.href = "/incdecInventory";
    
    window.open(window.location.href = "/incdecInventory","bfs","fullscreen,scrollbars")
});