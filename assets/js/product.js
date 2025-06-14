
// Product Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Menu navigation functionality
    const menuNavBtns = document.querySelectorAll('.menu-nav-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    menuNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            menuNavBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show/hide sections based on category
            if (category === 'all') {
                menuSections.forEach(section => {
                    section.style.display = 'block';
                });
            } else {
                menuSections.forEach(section => {
                    const sectionCategory = section.getAttribute('data-category');
                    if (sectionCategory === category) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Product item hover effects
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Smooth scroll for menu navigation
    const menuNavSection = document.querySelector('.menu-nav-section');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 200) {
            menuNavSection.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            menuNavSection.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Product search functionality (basic)
    function createSearchBox() {
        const searchBox = document.createElement('div');
        searchBox.className = 'search-box';
        searchBox.innerHTML = `
            <input type="text" placeholder="Tìm kiếm sản phẩm..." class="search-input">
            <button class="search-btn"><i class="fas fa-search"></i></button>
        `;
        
        const menuNavSection = document.querySelector('.menu-nav-section .container');
        menuNavSection.appendChild(searchBox);
        
        // Add search styles
        const searchStyle = document.createElement('style');
        searchStyle.textContent = `
            .search-box {
                margin-top: 20px;
                display: flex;
                max-width: 400px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .search-input {
                flex: 1;
                padding: 12px 16px;
                border: 2px solid #e0e0e0;
                border-radius: 25px 0 0 25px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.3s ease;
            }
            
            .search-input:focus {
                border-color: #00754a;
            }
            
            .search-btn {
                background: #00754a;
                border: 2px solid #00754a;
                color: white;
                padding: 12px 16px;
                border-radius: 0 25px 25px 0;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            .search-btn:hover {
                background: #1e3932;
                border-color: #1e3932;
            }
            
            @media (max-width: 768px) {
                .search-box {
                    max-width: 100%;
                    margin-top: 15px;
                }
            }
        `;
        document.head.appendChild(searchStyle);
        
        // Search functionality
        const searchInput = searchBox.querySelector('.search-input');
        const searchBtn = searchBox.querySelector('.search-btn');
        
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const productItems = document.querySelectorAll('.product-item');
            
            productItems.forEach(item => {
                const productName = item.querySelector('.product-name').textContent.toLowerCase();
                const productDesc = item.querySelector('.product-description').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = searchTerm === '' ? 'block' : 'none';
                }
            });
        }
        
        searchInput.addEventListener('input', performSearch);
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Initialize search box
    createSearchBox();
    
    // Loading animation for product images
    const productImages = document.querySelectorAll('.product-item img');
    productImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Add loading styles
        img.style.opacity = '0';
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    
    // Add to favorites functionality (visual only)
    function addFavoriteButtons() {
        const productItems = document.querySelectorAll('.product-item');
        
        productItems.forEach(item => {
            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = 'favorite-btn';
            favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
            
            const productImage = item.querySelector('.product-image');
            productImage.style.position = 'relative';
            productImage.appendChild(favoriteBtn);
            
            favoriteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const icon = this.querySelector('i');
                
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    this.style.color = '#e74c3c';
                    
                    // Show toast message
                    showToast('Đã thêm vào danh sách yêu thích!');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    this.style.color = '#666';
                    
                    showToast('Đã xóa khỏi danh sách yêu thích!');
                }
            });
        });
        
        // Add favorite button styles
        const favoriteStyle = document.createElement('style');
        favoriteStyle.textContent = `
            .favorite-btn {
                position: absolute;
                top: 12px;
                right: 12px;
                width: 36px;
                height: 36px;
                background: rgba(255, 255, 255, 0.9);
                border: none;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                color: #666;
                font-size: 16px;
                opacity: 0;
                transform: scale(0.8);
            }
            
            .product-item:hover .favorite-btn {
                opacity: 1;
                transform: scale(1);
            }
            
            .favorite-btn:hover {
                background: white;
                transform: scale(1.1);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
        `;
        document.head.appendChild(favoriteStyle);
    }
    
    // Initialize favorite buttons
    addFavoriteButtons();
    
    // Toast notification function
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #00754a;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0, 117, 74, 0.3);
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
    
    // Add toast animations
    const toastStyle = document.createElement('style');
    toastStyle.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(toastStyle);
});
