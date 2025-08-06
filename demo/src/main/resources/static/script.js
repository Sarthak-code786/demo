// CRUD operations for items
function addItem() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    
    if (!name) {
        alert('Please enter an item name');
        return;
    }
    
    let items = JSON.parse(localStorage.getItem("items")) || [];
    items.push(name);
    localStorage.setItem("items", JSON.stringify(items));
    
    nameInput.value = "";
    displayItems();
    
    // Show success message
    showNotification('Item added successfully!', 'success');
}

function deleteItem(index) {
    if (confirm('Are you sure you want to delete this item?')) {
        let items = JSON.parse(localStorage.getItem("items")) || [];
        items.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(items));
        displayItems();
        
        // Show success message
        showNotification('Item deleted successfully!', 'success');
    }
}

function editItem(index) {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    const newName = prompt('Edit item name:', items[index]);
    
    if (newName !== null && newName.trim() !== '') {
        items[index] = newName.trim();
        localStorage.setItem("items", JSON.stringify(items));
        displayItems();
        
        // Show success message
        showNotification('Item updated successfully!', 'success');
    }
}

function displayItems() {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    const itemList = document.getElementById('itemList');
    const itemCount = document.getElementById('itemCount');
    
    if (items.length === 0) {
        itemList.innerHTML = '<li class="empty-state">No items yet. Add your first item above!</li>';
    } else {
        let html = items.map((item, index) => `
            <li>
                <span>${item}</span>
                <div class="item-actions">
                    <button onclick="editItem(${index})" class="btn btn-edit">Edit</button>
                    <button onclick="deleteItem(${index})" class="btn btn-danger">Delete</button>
                </div>
            </li>
        `).join('');
        itemList.innerHTML = html;
    }
    
    itemCount.textContent = items.length;
}

function clearAllItems() {
    if (confirm('Are you sure you want to delete all items?')) {
        localStorage.removeItem("items");
        displayItems();
        showNotification('All items cleared!', 'success');
    }
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add keyboard support
document.getElementById('nameInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addItem();
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayItems();
    
    // Add clear all button if there are items
    const stats = document.querySelector('.stats');
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear All Items';
    clearButton.className = 'btn btn-danger';
    clearButton.style.marginLeft = '10px';
    clearButton.onclick = clearAllItems;
    
    stats.appendChild(clearButton);
});
  