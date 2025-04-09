const productList = document.getElementById("productList");
    const searchInput = document.getElementById("searchInput");
   
    const categorySelect = document.getElementById("categoryFilter");
    const checkboxes = document.querySelectorAll(".filter-checkbox");
    const searchForm = document.getElementById("searchForm");
    const logoutBtn = document.getElementById("logoutBtn");
    let allProducts = [];

    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        allProducts = data;
        displayProducts(allProducts);
      })
      .catch(err => {
        console.error("Failed to load products:", err);
        productList.innerHTML = "<p>Failed to load products.</p>";
      });

    function displayProducts(products) {
      productList.innerHTML = "";
      products.forEach(product => {
        const item = document.createElement("div");
        item.className = "product";
        item.innerHTML = `
          <img src="${product.image}" alt="${product.title}" />
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
          <button onclick="viewDetails(${product.id})">View Details</button>
        `;
        productList.appendChild(item);
      });
    }

    function viewDetails(id) {
      localStorage.setItem("selectedProductId", id);
      window.location.href = "product.html";
    }

    function filterProducts() {
        const query = searchInput.value.toLowerCase(); 
        const checkedFilters = [...checkboxes].filter(cb => cb.checked).map(cb => cb.value);
      
        const filtered = allProducts.filter(p => {
          const matchesSearch = p.title.toLowerCase().includes(query); 
          const matchesCheckbox = checkedFilters.length === 0 || checkedFilters.includes(p.category); 
          return matchesSearch && matchesCheckbox; 
        });
      
        displayProducts(filtered); 
      }

   

    searchInput.addEventListener("input", filterProducts); 
checkboxes.forEach(cb => cb.addEventListener("change", filterProducts)); 

  

    function displayProducts(products) {
        productList.innerHTML = "";
        const liked = JSON.parse(localStorage.getItem("likedProducts")) || [];
      
        products.forEach(product => {
          const isLiked = liked.includes(product.id);
          const item = document.createElement("div");
          item.className = "product";
      
          item.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <div class="view-like">
            <button  onclick="viewDetails(${product.id})">View Details</button>
            <img src="assets/like.png" height="30px" width="30px" class="like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike(${product.id}, this)">
            </div>
            </img>
          `;
      
          productList.appendChild(item);
        });
      }

      function toggleLike(productId, btn) {
        let liked = JSON.parse(localStorage.getItem("likedProducts")) || [];
      
        if (liked.includes(productId)) {
          liked = liked.filter(id => id !== productId);
          btn.classList.remove("liked");
        } else {
          liked.push(productId);
          btn.classList.add("liked");
        }
      
        localStorage.setItem("likedProducts", JSON.stringify(liked));
      }
    

  logoutBtn.addEventListener("click", () => {
    alert("You have been logged out.");
    window.location.href = "index.html"; 
  });


      