
// Product Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Price calculation variables
    let basePrice = 85000;
    let currentSize = 'tall';
    let espressoShots = 2;
    let selectedAddons = [];
    let quantity = 1;
    
    // Size selection functionality
    const sizeOptions = document.querySelectorAll('input[name="size"]');
    const sizeMapping = {
        'tall': { price: 85000, name: 'Tall' },
        'grande': { price: 95000, name: 'Grande' },
        'venti': { price: 105000, name: 'Venti' }
    };
    
    sizeOptions.forEach(option => {
        option.addEventListener('change', function() {
            currentSize = this.value;
            basePrice = sizeMapping[currentSize].price;
            updatePrice();
        });
    });
    
    // Espresso shots quantity
    const espressoMinusBtn = document.querySelector('#espresso-shots').previousElementSibling;
    const espressoPlusBtn = document.querySelector('#espresso-shots').nextElementSibling;
    const espressoValue = document.querySelector('#espresso-shots');
    
    espressoMinusBtn.addEventListener('click', function() {
        if (espressoShots > 1) {
            espressoShots--;
            espressoValue.textContent = espressoShots;
            updatePrice();
        }
    });
    
    espressoPlusBtn.addEventListener('click', function() {
        if (espressoShots < 5) {
            espressoShots++;
            espressoValue.textContent = espressoShots;
            updatePrice();
        }
    });
    
    // Addon selection
    const addonCheckboxes = document.querySelectorAll('.addon-option input[type="checkbox"]');
    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const addonValue = this.value;
            const addonPrice = 15000;
            
            if (this.checked) {
                selectedAddons.push({ name: addonValue, price: addonPrice });
            } else {
                selectedAddons = selectedAddons.filter(addon => addon.name !== addonValue);
            }
            
            updatePrice();
        });
    });
    
    // Main quantity selector
    const mainMinusBtn = document.querySelector('#main-quantity').previousElementSibling;
    const mainPlusBtn = document.querySelector('#main-quantity').nextElementSibling;
    const mainQuantityValue = document.querySelector('#main-quantity');
    
    mainMinusBtn.addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            mainQuantityValue.textContent = quantity;
            updatePrice();
        }
    });
    
    mainPlusBtn.addEventListener('click', function() {
        if (quantity < 10) {
            quantity++;
            mainQuantityValue.textContent = quantity;
            updatePrice();
        }
    });
    
    // Price update function
    function updatePrice() {
        let totalPrice = basePrice;
        
        // Add extra espresso shots (if more than default 2)
        if (espressoShots > 2) {
            totalPrice += (espressoShots - 2) * 10000;
        }
        
        // Add addon prices
        selectedAddons.forEach(addon => {
            totalPrice += addon.price;
        });
        
        // Multiply by quantity
        const finalPrice = totalPrice * quantity;
        
        // Update price display
        const priceElement = document.querySelector('#total-price');
        priceElement.textContent = formatPrice(finalPrice);
    }
    
    // Format price function
    function formatPrice(price) {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    }
    
    // Nutrition toggle
    const nutritionToggle = document.querySelector('.nutrition-toggle');
    const nutritionContent = document.querySelector('.nutrition-content');
    const toggleIcon = nutritionToggle.querySelector('i');
    
    nutritionToggle.addEventListener('click', function() {
        nutritionContent.classList.toggle('active');
        
        if (nutritionContent.classList.contains('active')) {
            toggleIcon.classList.remove('fa-chevron-down');
            toggleIcon.classList.add('fa-chevron-up');
        } else {
            toggleIcon.classList.remove('fa-chevron-up');
            toggleIcon.classList.add('fa-chevron-down');
        }
    });
    
    // Add to cart functionality
    const addToCartBtn = document.querySelector('.btn-add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        const productData = {
            name: 'Caffè Americano',
            size: sizeMapping[currentSize].name,
            espressoShots: espressoShots,
            addons: selectedAddons,
            quantity: quantity,
            totalPrice: calculateTotalPrice()
        };
        
        // Simulate add to cart
        console.log('Added to cart:', productData);
        
        // Show success message
        showSuccessMessage();
        
        // Add button animation
        addToCartBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            addToCartBtn.style.transform = 'scale(1)';
        }, 150);
    });
    
    function calculateTotalPrice() {
        let totalPrice = basePrice;
        
        if (espressoShots > 2) {
            totalPrice += (espressoShots - 2) * 10000;
        }
        
        selectedAddons.forEach(addon => {
            totalPrice += addon.price;
        });
        
        return totalPrice * quantity;
    }
    
    // Success message
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="fas fa-check-circle" style="color: #00754a; font-size: 20px;"></i>
                <span>Đã thêm vào giỏ hàng thành công!</span>
            </div>
        `;
        successMessage.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            color: #1e3932;
            padding: 16px 24px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            border: 2px solid #00754a;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => successMessage.remove(), 300);
        }, 3000);
    }
    
    // Image zoom effect
    const mainProductImg = document.querySelector('.main-product-img');
    mainProductImg.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    mainProductImg.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Smooth scrolling for related products
    const relatedProductCards = document.querySelectorAll('.related-products .product-card');
    relatedProductCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Save for later functionality (visual only)
    function addSaveButton() {
        const saveBtn = document.createElement('button');
        saveBtn.className = 'save-btn';
        saveBtn.innerHTML = '<i class="far fa-bookmark"></i> Lưu để mua sau';
        
        saveBtn.style.cssText = `
            background: none;
            border: 2px solid #e0e0e0;
            color: #666;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 16px;
            width: 100%;
            justify-content: center;
        `;
        
        const addToCartSection = document.querySelector('.add-to-cart-section');
        addToCartSection.parentNode.insertBefore(saveBtn, addToCartSection.nextSibling);
        
        saveBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.borderColor = '#00754a';
                this.style.color = '#00754a';
                this.innerHTML = '<i class="fas fa-bookmark"></i> Đã lưu';
                
                showToast('Đã lưu sản phẩm!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.borderColor = '#e0e0e0';
                this.style.color = '#666';
                this.innerHTML = '<i class="far fa-bookmark"></i> Lưu để mua sau';
                
                showToast('Đã bỏ lưu sản phẩm!');
            }
        });
        
        saveBtn.addEventListener('mouseover', function() {
            if (this.style.borderColor !== 'rgb(0, 117, 74)') {
                this.style.borderColor = '#00754a';
                this.style.color = '#00754a';
            }
        });
        
        saveBtn.addEventListener('mouseout', function() {
            if (!this.querySelector('i').classList.contains('fas')) {
                this.style.borderColor = '#e0e0e0';
                this.style.color = '#666';
            }
        });
    }
    
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
    
    // Initialize save button
    addSaveButton();
    
    // Initialize price
    updatePrice();
    
    // Add animations for page load
    const productDetailInfo = document.querySelector('.product-detail-info');
    const productDetailImage = document.querySelector('.product-detail-image');
    
    setTimeout(() => {
        productDetailInfo.style.opacity = '1';
        productDetailInfo.style.transform = 'translateX(0)';
        productDetailImage.style.opacity = '1';
        productDetailImage.style.transform = 'translateX(0)';
    }, 100);
    
    // Set initial styles for animation
    productDetailInfo.style.opacity = '0';
    productDetailInfo.style.transform = 'translateX(30px)';
    productDetailInfo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    productDetailImage.style.opacity = '0';
    productDetailImage.style.transform = 'translateX(-30px)';
    productDetailImage.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});
