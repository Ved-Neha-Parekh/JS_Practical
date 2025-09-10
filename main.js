let products = [];

const productForm = document.getElementById("productForm");
const productIdInput = document.getElementById("productId");
const titleInput = document.getElementById("titleInput");
const priceInput = document.getElementById("priceInput");
const imageInput = document.getElementById("imageInput");
const categoryInput = document.getElementById("categoryInput");

const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");

const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const categoryFilter = document.getElementById("categoryFilter");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

const alertPlaceholder = document.getElementById("alertPlaceholder");

const defaultProducts = [
    {
        id: 1,
        name: "Omnitrix",
        price: 7999,
        image: "./imgs/Omnitrix.webp",
        category: "Ben 10"
    },
    {
        id: 2,
        name: "Web Shooter",
        price: 2999,
        image: "./imgs/WebShooter.jpg",
        category: "Marvel"
    },
    {
        id: 3,
        name: "Captain America Shield",
        price: 5999,
        image: "./imgs/CaptainAmericaShield.jpg",
        category: "Marvel"
    },
    {
        id: 4,
        name: "Mjolnir (Thor’s Hammer)",
        price: 6999,
        image: "./imgs/Mjolnir.avif",
        category: "Marvel"
    },
    {
        id: 5,
        name: "Iron Man Helmet",
        price: 8999,
        image: "./imgs/IronManHelmet.jpeg",
        category: "Marvel"
    },
    {
        id: 6,
        name: "Batarang",
        price: 1499,
        image: "./imgs/Batarang.jpeg",
        category: "DC"
    },
    {
        id: 7,
        name: "Infinity Gauntlet",
        price: 9999,
        image: "./imgs/InfinityGauntlet.webp",
        category: "Marvel"
    }
];


function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function loadProducts() {
    const data = localStorage.getItem("products");
    if (data) {
        products = JSON.parse(data);
    } else {
        products = defaultProducts;
        saveProducts();
    }
    renderProducts();
}


function renderProducts(list = products) {
    productsContainer.innerHTML = "";

    list.forEach(product => {
        const card = document.createElement("div");
        card.className = "col-md-4";
        card.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top object-fit-cover product-img" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <span class="badge">${product.category}</span>
                    <p class="card-text price mt-2">₹${product.price}</p>
                    <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-warning btn-sm" onclick="editProduct(${product.id})"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.appendChild(card);
    });
}

productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newProduct = {
        id: Date.now(),
        name: titleInput.value,
        price: priceInput.value,
        image: imageInput.value,
        category: categoryInput.value
    };

    products.push(newProduct);
    saveProducts();
    renderProducts();
    productForm.reset();
})
loadProducts();