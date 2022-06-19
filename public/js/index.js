const socket = io();
const form = document.getElementById("form");
const table = document.getElementById("tableProducts")

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const name  = formData.get("name");
    const price = formData.get("price")
    const image = formData.get("image")
    const product = { name, price, image };

    socket.emit("addProduct", product)
})

socket.on("products", data => {
    const { products } = data;

    table.innerHTML = "";

    for(let product of products ) {
        let productMarkup = `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><img src="${product.image}" alt="" width="40"></td>
            </tr>`

        table.innerHTML += productMarkup
    }   
})