const form = document.querySelector('#produtosform');
const tabela = document.querySelector('#tbody');
let idx = form.idx.value;

//Salvando as informações no LocalStorage
const armazenarLocalStorage = (products) => {localStorage.setItem('produtos_armazenados', JSON.stringify(products))}

//Recuperar as informações salvas no LocalStorage
const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('produtos_armazenados')|| '[]');

//Pegar os Dados do formúlario para ficar no [armazenarLocalStorage]
const armazenarProduto = (savedProduct) =>{
    savedProduct.preventDefault()
    const product = form.product.value;
    const price = Number(form.price.value);
    const rate = form.rate.checked;
    
    if(idx == 'new'){
    const products = recuperarLocalStorage();
    products.push({id:products.length + 1, product, price, rate});
    armazenarLocalStorage(products);
    executarTabela();
    form.reset();  
    }else{
        let productedit = {id: idx, product, price, rate}

        updateProduct(idx, productedit);
        executarTabela();
        form.reset();
        idx = 'new';
    }
}

const executarTabela = () =>{
    const products = recuperarLocalStorage();
    tabela.innerHTML = '';
    for(const product of products){
        tabela.innerHTML += `
        <tr>
            <th scope="row">${product.id}></th>
            <td>${product.product}</td>
            <td>${product.price}</td>
            <td>${product.rate ? "Sim" : "Não"}</td>
            <td>
                <img type="button" width="40" src="img/trash_icon.jpg" onclick="deletProduct(${product.id})">
                <img type="button" width="40" src="img/edit_icon.png" onclick="editProduct(${product.id})">
            </td>
        </tr>    
        `
    }
}

const deletProduct = (id) =>{
    const products = recuperarLocalStorage();
    const indexProduct = products.findIndex(product => product.id === id)
    if(indexProduct < 0) return;
    products.splice(indexProduct, 1);
    armazenarLocalStorage(products);
    alert('Produto Deletado')
    executarTabela();
}

const editProduct = (id) =>{
    const products = recuperarLocalStorage();
    const indexProduct = products.findIndex((product) => product.id === id)
    form.product.value = products[indexProduct].product;
    form.price.value = products[indexProduct].price;
    form.rate.checked = products[indexProduct].rate;
    idx = id;
}

const updateProduct = (id, productedit) => {
    const products = recuperarLocalStorage();
    const indexProduct = products.findIndex((productedit) => productedit.id === id);
    products[indexProduct] = productedit;
    armazenarLocalStorage(products);
}

form.addEventListener('submit', armazenarProduto);
document.addEventListener('DOMContentLoaded', executarTabela);