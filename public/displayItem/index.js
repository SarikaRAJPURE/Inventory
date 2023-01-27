console.log("Display Page");

const getData = async () =>{
    let itemdata = await fetch(`/items`);
    let parseditemData = await itemdata.json();
    console.log(parseditemData);

    //map through veggie data and get it on html
    parseditemData.forEach(object => {
        let pTag = document.createElement("p");
        //if not ready red text
        if(object.inventory <= 0){
            pTag.style.color="red";
        }else{
            pTag.style.color="green";
        }
        pTag.textContent = object.name;
        let itemcontainerelem = document.getElementById('items-container');
        itemcontainerelem.appendChild(pTag);
    });
}

getData();

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

