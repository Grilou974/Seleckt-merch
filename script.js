// Base de données des produits
const products = [
    {
        id: 1,
        name: "Bigoudis Magiques Arc-en-ciel",
        category: "bigoudis",
        price: 12.99,
        emoji: "💅",
        description: "Des bigoudis colorés pour des boucles parfaites !",
        featured: true
    },
    {
        id: 2,
        name: "Bouée Licorne Géante",
        category: "bouees",
        price: 24.99,
        emoji: "🦄",
        description: "Flotte avec style cet été !",
        featured: true
    },
    {
        id: 3,
        name: "Set de Bigoudis Pastel",
        category: "bigoudis",
        price: 15.99,
        emoji: "🌸",
        description: "Couleurs pastel douces pour un look furry parfait",
        featured: true
    },
    {
        id: 4,
        name: "Bouée Flamant Rose",
        category: "bouees",
        price: 22.99,
        emoji: "🦩",
        description: "Élégance et fun à la plage !",
        featured: false
    },
    {
        id: 5,
        name: "Bigoudis Chauffants Premium",
        category: "bigoudis",
        price: 29.99,
        emoji: "✨",
        description: "Pour des boucles qui durent toute la journée",
        featured: false
    },
    {
        id: 6,
        name: "Bouée Donut Géante",
        category: "bouees",
        price: 19.99,
        emoji: "🍩",
        description: "Délicieusement fun !",
        featured: true
    },
    {
        id: 7,
        name: "Mini Bigoudis de Voyage",
        category: "bigoudis",
        price: 9.99,
        emoji: "🎀",
        description: "Parfaits pour voyager avec style",
        featured: false
    },
    {
        id: 8,
        name: "Bouée Pizza Party",
        category: "bouees",
        price: 21.99,
        emoji: "🍕",
        description: "La fête à la piscine garantie !",
        featured: false
    },
    {
        id: 9,
        name: "Miroir de Poche Furry",
        category: "accessoires",
        price: 7.99,
        emoji: "🪞",
        description: "Miroir compact avec design furry exclusif",
        featured: false
    },
    {
        id: 10,
        name: "Brosse Démêlante Rainbow",
        category: "accessoires",
        price: 11.99,
        emoji: "🌈",
        description: "Brosse douce aux couleurs de l'arc-en-ciel",
        featured: false
    },
    {
        id: 11,
        name: "Sac Étanche Licorne",
        category: "accessoires",
        price: 16.99,
        emoji: "👜",
        description: "Protège tes affaires avec style !",
        featured: true
    },
    {
        id: 12,
        name: "Lunettes de Soleil Furry",
        category: "accessoires",
        price: 13.99,
        emoji: "😎",
        description: "Protection UV avec style furry",
        featured: false
    }
];

// Panier (stocké dans le localStorage)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fonction pour sauvegarder le panier
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Mettre à jour le compteur du panier
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

// Créer une carte produit
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <span>${product.emoji}</span>
                ${product.featured ? '<div class="product-badge">⭐ Top Vente</div>' : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price.toFixed(2)} €</span>
                    <button
  class="add-to-cart snipcart-add-item"
  data-item-id="${product.id}"
  data-item-name="${product.name}"
  data-item-price="${product.price}"
  data-item-url="/produits.html"
  data-item-description="${product.description}">
  Ajouter 🛒
</button>

                </div>
            </div>
        </div>
    `;
}

// Obtenir le nom de la catégorie
function getCategoryName(category) {
    const categories = {
        'bigoudis': '💅 Bigoudis',
        'bouees': '🦄 Bouées',
        'accessoires': '✨ Accessoires'
    };
    return categories[category] || category;
}

// Ajouter au panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    showNotification(`${product.emoji} ${product.name} ajouté au panier !`);
}

// Afficher une notification
function showNotification(message) {
    // Créer la notification si elle n'existe pas
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #FF7F2A 0%, #FFB27F 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-weight: 600;
        `;
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.style.display = 'none';
            notification.style.animation = 'slideIn 0.3s ease-out';
        }, 300);
    }, 2000);
}

// Ajouter les animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Afficher les produits vedettes (page d'accueil)
function displayFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featuredProducts = products.filter(p => p.featured);
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Afficher tous les produits (page produits)
function displayAllProducts() {
    const container = document.getElementById('all-products') || document.getElementById('products-grid');
    if (!container) return;

    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

// Filtrer les produits
function filterProducts(category) {
    const allProducts = document.querySelectorAll('.product-card');
    
    allProducts.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Gestion des filtres
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            // Filtrer les produits
            filterProducts(button.dataset.category);
        });
    });
}

// Afficher le panier
function displayCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-emoji">🛒</div>
                <h2>Ton panier est vide</h2>
                <p>Ajoute des produits furry pour commencer !</p>
                <a href="produits.html" class="btn btn-primary">Découvrir les produits ✨</a>
            </div>
        `;
        updateCartSummary();
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <span>${item.emoji}</span>
            </div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <div class="cart-item-category">${getCategoryName(item.category)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="item-price">${(item.price * item.quantity).toFixed(2)} €</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Retirer</button>
            </div>
        </div>
    `).join('');

    updateCartSummary();
}

// Mettre à jour la quantité
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    displayCart();
}

// Retirer du panier
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    displayCart();
    showNotification('Produit retiré du panier');
}

// Mettre à jour le résumé du panier
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    if (subtotalElement) {
        subtotalElement.textContent = `${subtotal.toFixed(2)} €`;
    }

    if (totalElement) {
        totalElement.innerHTML = `<strong>${subtotal.toFixed(2)} €</strong>`;
    }
}

// Gérer la commande
function handleCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (!checkoutBtn) return;

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Ton panier est vide ! 🛒');
            return;
        }

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        showNotification(`🎉 Commande validée ! Total: ${total.toFixed(2)} €`);
        
        setTimeout(() => {
            cart = [];
            saveCart();
            displayCart();
            showNotification('Merci pour ta commande ! 🦊✨');
        }, 2000);
    });
}

// Animation d'explosion des emojis de fond
function explodeEmojis() {
    const emojis = document.querySelectorAll('.pattern-emoji');
    
    emojis.forEach((emoji, index) => {
        setTimeout(() => {
            // Explosion
            emoji.classList.add('exploding');
            
            // Réapparition après l'explosion
            setTimeout(() => {
                emoji.classList.remove('exploding');
                emoji.style.animation = 'reappear 0.8s ease-out, float 4s ease-in-out infinite';
                emoji.style.animationDelay = `${index * 0.3}s, ${index}s`;
            }, 800);
        }, index * 200);
    });
    
    // Répéter l'animation toutes les 8 secondes
    setTimeout(explodeEmojis, 8000);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayFeaturedProducts();
    displayAllProducts();
    setupFilters();
    displayCart();
    handleCheckout();
    initBurgerMenu();
    
    // Démarrer l'animation des emojis après un court délai
    setTimeout(explodeEmojis, 2000);
});

// Menu Burger
function initBurgerMenu() {
    const burger = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (!burger) return;

    // Toggle menu
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Fermer le menu en cliquant sur un lien
    links.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
            burger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
