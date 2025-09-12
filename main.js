let products = [];

const productForm = document.getElementById("productForm");
const titleInput = document.getElementById("titleInput");
const priceInput = document.getElementById("priceInput");
const imageInput = document.getElementById("imageInput");
const categoryInput = document.getElementById("categoryInput");
const productsContainer = document.getElementById("productsContainer");
const alertPlaceholder = document.getElementById("alertPlaceholder");
const updateBtn = document.getElementById("updateBtn");
const addBtn = document.getElementById("addBtn");
const productIdInput = document.getElementById("productId");

const defaultProducts = [
    {
        id: 1,
        name: "Omnitrix",
        price: 7999,
        image: "./imgs/Omnitrix.webp",
        category: "Ben 10",
    },
    {
        id: 2,
        name: "Web Shooter",
        price: 2999,
        image: "./imgs/WebShooter.jpg",
        category: "Marvel",
    },
    {
        id: 3,
        name: "Captain America Shield",
        price: 5999,
        image: "./imgs/CaptainAmericaShield.jpg",
        category: "Marvel",
    },
    {
        id: 4,
        name: "Mjolnir (Thor’s Hammer)",
        price: 6999,
        image: "./imgs/Mjolnir.avif",
        category: "Marvel",
    },
    {
        id: 5,
        name: "Iron Man Helmet",
        price: 8999,
        image: "./imgs/IronManHelmet.jpeg",
        category: "Marvel",
    },
    {
        id: 6,
        name: "Batarang",
        price: 1499,
        image: "./imgs/Batarang.jpeg",
        category: "DC",
    },
    {
        id: 7,
        name: "Infinity Gauntlet",
        price: 9999,
        image: "./imgs/InfinityGauntlet.webp",
        category: "Marvel",
    },
];

function showAlert(message, type) {
    alertPlaceholder.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => (alertPlaceholder.innerHTML = ""), 2000);
}

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

window.addEventListener("load", loadProducts);

function addProduct() {
    const id = Date.now();
    const name = titleInput.value.trim();
    const priceStr = priceInput.value.trim();
    const image = imageInput.value.trim();
    const category = categoryInput.value.trim();

    const price = Number(priceStr);
    if (!name || !priceStr) {
        showAlert("Product name and price required!", "danger");
        return;
    }
    if (Number.isNaN(price) || price <= 0) {
        showAlert("Price must be a positive number!", "danger");
        return;
    }

    const newProduct = { id, name, price, image, category };
    products.push(newProduct);

    saveProducts();

    renderProducts();

    productForm.reset();

    showAlert("Product added!", "success");
}

function renderProducts(list = products) {
    productsContainer.innerHTML = "";

    if (!list.length) {
        productsContainer.innerHTML = `<div class="no-results p-3 rounded">No products found.</div>`;
        return;
    }

    list.forEach((product) => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-3";

        const imgSrc =
            product.image && product.image.length
                ? product.image
                : "./imgs/placeholder.avif";

        card.innerHTML = `
      <div class="card h-100">
        <img src="${imgSrc}" alt="${product.name
            }" class="card-img-top product-img">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="price mb-1">₹${product.price}</p>
          <span class="badge mb-3">${product.category || "Uncategorized"}</span>
          <div class="mt-auto">
            <button class="btn btn-outline-light btn-sm" onclick="editProduct(${product.id
            })">Edit</button>
            <button class="btn btn-outline-danger btn-sm ms-2" onclick="deleteProduct(${product.id
            })">Delete</button>
          </div>
        </div>
      </div>
    `;

        productsContainer.appendChild(card);
    });
}

function deleteProduct(id) {
    const countBefore = products.length;
    products = products.filter((p) => p.id !== id);

    if (products.length === countBefore) {
        showAlert("Nothing deleted (id not found)", "danger");
        return;
    }

    saveProducts();
    renderProducts();
    showAlert("Product deleted!", "success");
}

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
    const q = searchInput.value.toLowerCase();
    const filtered = products.filter((p) => p.name.toLowerCase().includes(q));
    renderProducts(filtered);
});

productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addProduct();
});

const sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("change", function () {
    let sortedProducts = [...products];
    if (sortSelect.value === "price-asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
        renderProducts(sortedProducts);
    } else if (sortSelect.value === "price-desc") {
        sortedProducts.sort((a, b) => b.price - a.price);
        renderProducts(sortedProducts);
    } else {
        renderProducts(products);
    }
});