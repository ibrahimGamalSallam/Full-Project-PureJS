let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let search = document.getElementById('search');
let deleteAllbtn = document.getElementById('deleteAll')
let mode = 'create';
let temp;
let searchMode = title;

// get total
function sum(){
    if(price.value !=('' || 0))
        {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green'
    }else{
        total.style.background = 'red'
        total.innerHTML = '';
    }
}


// create product
let dataProducts;

if (localStorage.products != null)
{
    dataProducts = JSON.parse(localStorage.products)

}else{
 dataProducts = [];
}

create.onclick = function (){

let newProduct = {
    title : title.value.toLowerCase(),
    price : price.value,
    taxes : taxes.value,
    ads : ads.value,
    discount : discount.value,
    total : total.innerHTML,
    count : count.value,
    category : category.value.toLowerCase()
}
if(title.value !=''
    && price.value !=''
    && category.value !=''
    && newProduct.count <100){
if(mode === 'create'){
    create.innerHTML = 'Create';

// count
// adding count products

        if(newProduct.count > 1){
            for(let i = 0; i < newProduct.count; i++){
                dataProducts.push(newProduct)
            }
            //adding one product only
            }
                else{
                    dataProducts.push(newProduct)
                    }
            //updating existing product
    }
    else{
        dataProducts[temp] = newProduct
        count.style.display = 'block';
        create.innerHTML = 'Create';
        mode = 'create';
    }
    clearData();
    title.focus();

    }

// save localstorage
localStorage.setItem('products', JSON.stringify(dataProducts));


read();
title.focus();
}

// clear inputs
function clearData(){
title.value = '',
price.value = '',
taxes.value = '',
ads.value = '',
discount.value = '',
count.value = '',
category.value = '',
total.innerHTML = '',
total.style.background = 'red'
}


// read
function read(){
let table = ''

for(let i = 0; i < dataProducts.length; i++){
    table += `            
    <tr>
        <td>${i+1}</td>
        <td>${dataProducts[i].title}</td>
        <td>${dataProducts[i].price}</td>
        <td>${dataProducts[i].taxes}</td>
        <td>${dataProducts[i].ads}</td>
        <td>${dataProducts[i].discount}</td>
        <td>${dataProducts[i].total}</td>
        <td>${dataProducts[i].category}</td>
        <td><button id="update" onclick = 'updateProduct(${i})'>Update</button></td>
        <td><button id="delete" onclick = 'deleteProduct(${i})'>Delete</button></td>
    </tr>`;
}

//adding DeleteAll button only if products exist
if(dataProducts.length > 0){
deleteAllbtn.innerHTML = `<button onclick="deleteAll()">Delete All ( ${dataProducts.length} )</button>`
}else{
    deleteAllbtn.innerHTML='';
}
document.getElementById('tableBody').innerHTML = table
}
read()

//delete
function deleteProduct(i){

    dataProducts.splice(i,1);
    localStorage.products = JSON.stringify(dataProducts);
    read()
}

//delete all
function deleteAll(){

    dataProducts.splice(0);
    localStorage.products = JSON.stringify(dataProducts);
    read();
}

//update

function updateProduct(i){
    title.value = dataProducts[i].title;
    price.value = dataProducts[i].price;
    taxes.value = dataProducts[i].taxes;
    ads.value = dataProducts[i].ads;
    discount.value = dataProducts[i].discount;
    category.value = dataProducts[i].category;
    count.style.display = 'none';
    sum();
    mode = 'update'
    temp = i;
    create.innerHTML = 'Update';
    scroll({
        top:0,
        behavior:"smooth"
    })
    title.focus();

}



//search
function SearchButton(id){
    search.focus();
    if(id == 'searchTitle'){
        searchMode = 'title';
        
    }else{
        searchMode = 'category'
    }
    search.placeholder = 'Search By '+ searchMode.toUpperCase();
    search.value ='';
    read();
}

function searchProduct(value){
    let table ='';
    for(let i = 0; i < dataProducts.length; i++){
    if(searchMode == 'title'){
            if(dataProducts[i].title.includes(value.toLowerCase())){
                table += `            
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    <td><button id="update" onclick = 'updateProduct(${i})'>Update</button></td>
                    <td><button id="delete" onclick = 'deleteProduct(${i})'>Delete</button></td>
                </tr>`;
            }}
            else{
                if(dataProducts[i].category.includes(value.toLowerCase())){
                    table += `            
                        <tr>
                            <td>${i+1}</td>
                            <td>${dataProducts[i].title}</td>
                            <td>${dataProducts[i].price}</td>
                            <td>${dataProducts[i].taxes}</td>
                            <td>${dataProducts[i].ads}</td>
                            <td>${dataProducts[i].discount}</td>
                            <td>${dataProducts[i].total}</td>
                            <td>${dataProducts[i].category}</td>
                            <td><button id="update" onclick = 'updateProduct(${i})'>Update</button></td>
                            <td><button id="delete" onclick = 'deleteProduct(${i})'>Delete</button></td>
                        </tr>`;
                    }
            }
        }
document.getElementById('tableBody').innerHTML = table;
    }
//clean data