/* =====================================================
   FOODGO FOOD DELIVERY
   HTML + CSS + JAVASCRIPT
   localStorage based project
===================================================== */


/* =====================================================
   FOOD DATA
===================================================== */

const foods = [

    {
        id: 1,
        name: "Margherita Pizza",
        restaurant: "Pizza Palace",
        category: "Pizza",
        price: 249,
        emoji: "🍕",
        description: "Classic cheese and tomato pizza"
    },

    {
        id: 2,
        name: "Farmhouse Pizza",
        restaurant: "Pizza Palace",
        category: "Pizza",
        price: 349,
        emoji: "🍕",
        description: "Loaded with fresh vegetables"
    },

    {
        id: 3,
        name: "Cheese Burger",
        restaurant: "Burger House",
        category: "Burger",
        price: 179,
        emoji: "🍔",
        description: "Juicy burger with cheese"
    },

    {
        id: 4,
        name: "Chicken Burger",
        restaurant: "Burger House",
        category: "Burger",
        price: 229,
        emoji: "🍔",
        description: "Crispy chicken burger"
    },

    {
        id: 5,
        name: "Chicken Biryani",
        restaurant: "Biryani Corner",
        category: "Biryani",
        price: 299,
        emoji: "🍛",
        description: "Aromatic chicken biryani"
    },

    {
        id: 6,
        name: "Veg Biryani",
        restaurant: "Biryani Corner",
        category: "Biryani",
        price: 219,
        emoji: "🍛",
        description: "Delicious vegetable biryani"
    },

    {
        id: 7,
        name: "Hakka Noodles",
        restaurant: "Chinese Wok",
        category: "Chinese",
        price: 199,
        emoji: "🍜",
        description: "Hot and spicy noodles"
    },

    {
        id: 8,
        name: "Veg Manchurian",
        restaurant: "Chinese Wok",
        category: "Chinese",
        price: 189,
        emoji: "🥡",
        description: "Crispy Manchurian balls"
    },

    {
        id: 9,
        name: "Chocolate Cake",
        restaurant: "Sweet Treats",
        category: "Dessert",
        price: 159,
        emoji: "🍰",
        description: "Soft chocolate cake"
    },

    {
        id: 10,
        name: "Ice Cream",
        restaurant: "Sweet Treats",
        category: "Dessert",
        price: 99,
        emoji: "🍨",
        description: "Creamy vanilla ice cream"
    },

    {
        id: 11,
        name: "Cold Coffee",
        restaurant: "Cafe Coffee",
        category: "Drinks",
        price: 129,
        emoji: "🥤",
        description: "Chilled creamy coffee"
    },

    {
        id: 12,
        name: "Fresh Lemonade",
        restaurant: "Cafe Coffee",
        category: "Drinks",
        price: 89,
        emoji: "🍋",
        description: "Fresh lemon drink"
    }

];


/* =====================================================
   RESTAURANT DATA
===================================================== */

const restaurants = [

    {
        id: 1,
        name: "Pizza Palace",
        cuisine: "Pizza • Italian",
        rating: "4.6",
        time: "25-30 min",
        emoji: "🍕"
    },

    {
        id: 2,
        name: "Burger House",
        cuisine: "Burgers • Fast Food",
        rating: "4.5",
        time: "20-25 min",
        emoji: "🍔"
    },

    {
        id: 3,
        name: "Biryani Corner",
        cuisine: "Biryani • Indian",
        rating: "4.7",
        time: "30-35 min",
        emoji: "🍛"
    },

    {
        id: 4,
        name: "Chinese Wok",
        cuisine: "Chinese • Asian",
        rating: "4.4",
        time: "25-30 min",
        emoji: "🍜"
    },

    {
        id: 5,
        name: "Sweet Treats",
        cuisine: "Dessert • Bakery",
        rating: "4.5",
        time: "20-25 min",
        emoji: "🍰"
    },

    {
        id: 6,
        name: "Cafe Coffee",
        cuisine: "Cafe • Drinks",
        rating: "4.3",
        time: "15-20 min",
        emoji: "☕"
    }

];


/* =====================================================
   LOCAL STORAGE
===================================================== */

let cart =
    JSON.parse(
        localStorage.getItem("foodgoCart")
    ) || [];


let orders =
    JSON.parse(
        localStorage.getItem("foodgoOrders")
    ) || [];


let users =
    JSON.parse(
        localStorage.getItem("foodgoUsers")
    ) || [];


let currentUser =
    JSON.parse(
        localStorage.getItem("foodgoCurrentUser")
    ) || null;


let selectedAddress =
    JSON.parse(
        localStorage.getItem("foodgoAddress")
    ) || null;


let trackingOrderId = null;


/* =====================================================
   AUTH
===================================================== */

function showSignup() {

    document
        .getElementById("loginBox")
        .classList.add("hidden");

    document
        .getElementById("signupBox")
        .classList.remove("hidden");
}


function showLogin() {

    document
        .getElementById("signupBox")
        .classList.add("hidden");

    document
        .getElementById("loginBox")
        .classList.remove("hidden");
}


/* =====================================================
   SIGNUP
===================================================== */

document
    .getElementById("signupForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();


        const name =
            document
                .getElementById("signupName")
                .value.trim();


        const email =
            document
                .getElementById("signupEmail")
                .value.trim()
                .toLowerCase();


        const phone =
            document
                .getElementById("signupPhone")
                .value.trim();


        const password =
            document
                .getElementById("signupPassword")
                .value;


        const confirmPassword =
            document
                .getElementById("confirmPassword")
                .value;


        if (password !== confirmPassword) {

            toast(
                "Passwords do not match!"
            );

            return;
        }


        if (
            users.some(
                user => user.email === email
            )
        ) {

            toast(
                "Email already registered!"
            );

            return;
        }


        const user = {

            id: Date.now(),

            name,

            email,

            phone,

            password

        };


        users.push(user);


        localStorage.setItem(
            "foodgoUsers",
            JSON.stringify(users)
        );


        toast(
            "Account created successfully!"
        );


        document
            .getElementById("signupForm")
            .reset();


        setTimeout(
            showLogin,
            1000
        );

    });


/* =====================================================
   LOGIN
===================================================== */

document
    .getElementById("loginForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();


        const email =
            document
                .getElementById("loginEmail")
                .value.trim()
                .toLowerCase();


        const password =
            document
                .getElementById("loginPassword")
                .value;


        /* Demo Admin */

        if (
            email === "admin@gmail.com" &&
            password === "admin123"
        ) {

            currentUser = {

                id: "admin",

                name: "FoodGo Admin",

                email: "admin@gmail.com",

                phone: "9999999999",

                password: "admin123"

            };


            loginSuccess();

            return;
        }


        const user =
            users.find(
                user =>
                    user.email === email &&
                    user.password === password
            );


        if (!user) {

            toast(
                "Invalid email or password!"
            );

            return;
        }


        currentUser = user;


        loginSuccess();

    });


function loginSuccess() {

    localStorage.setItem(
        "foodgoCurrentUser",
        JSON.stringify(currentUser)
    );


    document
        .getElementById("authSection")
        .classList.add("hidden");


    document
        .getElementById("app")
        .classList.remove("hidden");


    initializeApp();


    toast(
        "Login successful! 🍔"
    );
}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "foodgoCurrentUser"
    );


    currentUser = null;


    document
        .getElementById("app")
        .classList.add("hidden");


    document
        .getElementById("authSection")
        .classList.remove("hidden");


    showLogin();


    toast(
        "Logged out successfully!"
    );
}


/* =====================================================
   INITIALIZE
===================================================== */

function initializeApp() {

    renderRestaurants();

    renderFoods(foods);

    updateCart();

    renderOrders();

    loadProfile();

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(
            page =>
                page.classList.add("hidden")
        );


    const page =
        document.getElementById(pageId);


    if (page) {

        page.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    if (pageId === "cart") {

        updateCart();

    }


    if (pageId === "orders") {

        renderOrders();

    }


    if (pageId === "profile") {

        loadProfile();

    }


    if (pageId === "payment") {

        updatePaymentTotal();

    }

}


/* =====================================================
   RESTAURANTS
===================================================== */

function renderRestaurants() {

    const container =
        document.getElementById(
            "restaurantList"
        );


    container.innerHTML = "";


    restaurants.forEach(
        restaurant => {

            container.innerHTML += `

                <div
                    class="restaurant-card"
                    onclick="selectRestaurant('${restaurant.name}')"
                >

                    <div class="restaurant-image">
                        ${restaurant.emoji}
                    </div>

                    <div class="restaurant-info">

                        <h3>
                            ${restaurant.name}
                        </h3>

                        <p>
                            ${restaurant.cuisine}
                        </p>

                        <div class="restaurant-meta">

                            <span>
                                ⭐ ${restaurant.rating}
                            </span>

                            <span>
                                🛵 ${restaurant.time}
                            </span>

                        </div>

                    </div>

                </div>

            `;

        }
    );

}


function selectRestaurant(name) {

    const filtered =
        foods.filter(
            food =>
                food.restaurant === name
        );


    renderFoods(filtered);


    document
        .getElementById("foodSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   FOOD
===================================================== */

function renderFoods(list) {

    const container =
        document.getElementById(
            "foodList"
        );


    container.innerHTML = "";


    document.getElementById(
        "foodResultCount"
    ).textContent =
        `${list.length} items`;


    if (list.length === 0) {

        container.innerHTML = `

            <div
                style="
                grid-column:1/-1;
                text-align:center;
                padding:50px;
                "
            >

                <h2>
                    😕 No food found
                </h2>

                <p>
                    Try another search.
                </p>

            </div>

        `;

        return;
    }


    list.forEach(food => {

        container.innerHTML += `

            <div class="food-card">

                <div class="food-image">
                    ${food.emoji}
                </div>

                <div class="food-info">

                    <h3>
                        ${food.name}
                    </h3>

                    <p>
                        ${food.restaurant}
                    </p>

                    <p>
                        ${food.description}
                    </p>

                    <div class="food-bottom">

                        <span class="food-price">
                            ₹${food.price}
                        </span>

                        <button
                            class="add-btn"
                            onclick="addToCart(${food.id})"
                        >
                            + Add
                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


/* =====================================================
   CATEGORY FILTER
===================================================== */

function filterCategory(category) {

    if (category === "All") {

        renderFoods(foods);

        return;
    }


    const filtered =
        foods.filter(
            food =>
                food.category === category
        );


    renderFoods(filtered);


    document
        .getElementById("foodSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   SEARCH
===================================================== */

function globalSearch() {

    const query =
        document
            .getElementById("globalSearch")
            .value
            .toLowerCase()
            .trim();


    if (!query) {

        renderFoods(foods);

        return;
    }


    const filtered =
        foods.filter(food =>

            food.name
                .toLowerCase()
                .includes(query)

            ||

            food.restaurant
                .toLowerCase()
                .includes(query)

            ||

            food.category
                .toLowerCase()
                .includes(query)

        );


    renderFoods(filtered);


    document
        .getElementById("foodSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(foodId) {

    const food =
        foods.find(
            item =>
                item.id === foodId
        );


    if (!food) return;


    const existing =
        cart.find(
            item =>
                item.id === foodId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: food.id,

            name: food.name,

            restaurant: food.restaurant,

            price: food.price,

            emoji: food.emoji,

            quantity: 1

        });

    }


    saveCart();

    updateCart();


    toast(
        `${food.name} added to cart 🛒`
    );

}


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "foodgoCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    document.getElementById(
        "cartCount"
    ).textContent = count;


    renderCart();

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML = `

            <div
                class="form-card"
                style="text-align:center"
            >

                <div
                    style="
                    font-size:70px;
                    margin-bottom:15px;
                    "
                >
                    🛒
                </div>

                <h2>
                    Your cart is empty
                </h2>

                <p
                    style="
                    color:#777;
                    margin:10px 0 20px;
                    "
                >
                    Add some delicious food!
                </p>

                <button
                    class="main-btn"
                    onclick="showPage('home')"
                >
                    Browse Food
                </button>

            </div>

        `;


        updateSummary();

        return;
    }


    cart.forEach(item => {

        container.innerHTML += `

            <div class="cart-item">

                <div class="cart-image">
                    ${item.emoji}
                </div>

                <div class="cart-details">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${item.restaurant}
                    </p>

                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>


                <div class="cart-price">

                    ₹${item.price * item.quantity}

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})"
                >
                    🗑️
                </button>

            </div>

        `;

    });


    updateSummary();

}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(
    foodId,
    change
) {

    const item =
        cart.find(
            item =>
                item.id === foodId
        );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item =>
                    item.id !== foodId
            );

    }


    saveCart();

    updateCart();

}


/* =====================================================
   REMOVE CART
===================================================== */

function removeFromCart(foodId) {

    cart =
        cart.filter(
            item =>
                item.id !== foodId
        );


    saveCart();

    updateCart();


    toast(
        "Item removed from cart"
    );

}


/* =====================================================
   TOTAL CALCULATION
===================================================== */

function calculateSubtotal() {

    return cart.reduce(
        (total, item) =>
            total +
            item.price *
            item.quantity,
        0
    );

}


function calculateTax() {

    return Math.round(
        calculateSubtotal() * 0.05
    );

}


function calculateDeliveryFee() {

    if (cart.length === 0) {

        return 0;

    }


    return 40;

}


function calculateGrandTotal() {

    return (
        calculateSubtotal()
        +
        calculateTax()
        +
        calculateDeliveryFee()
    );

}


/* =====================================================
   SUMMARY
===================================================== */

function updateSummary() {

    const subtotal =
        calculateSubtotal();


    const tax =
        calculateTax();


    const delivery =
        calculateDeliveryFee();


    const total =
        calculateGrandTotal();


    document.getElementById(
        "subtotal"
    ).textContent =
        `₹${subtotal}`;


    document.getElementById(
        "tax"
    ).textContent =
        `₹${tax}`;


    document.getElementById(
        "deliveryFee"
    ).textContent =
        `₹${delivery}`;


    document.getElementById(
        "grandTotal"
    ).textContent =
        `₹${total}`;

}


/* =====================================================
   CHECKOUT
===================================================== */

function goToCheckout() {

    if (cart.length === 0) {

        toast(
            "Your cart is empty!"
        );

        return;
    }


    if (currentUser) {

        document.getElementById(
            "deliveryName"
        ).value =
            currentUser.name || "";


        document.getElementById(
            "deliveryPhone"
        ).value =
            currentUser.phone || "";

    }


    if (selectedAddress) {

        document.getElementById(
            "deliveryAddress"
        ).value =
            selectedAddress.address || "";


        document.getElementById(
            "deliveryCity"
        ).value =
            selectedAddress.city || "";


        document.getElementById(
            "deliveryPin"
        ).value =
            selectedAddress.pin || "";

    }


    showPage("checkout");

}


/* =====================================================
   ADDRESS
===================================================== */

document
    .getElementById("addressForm")
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            selectedAddress = {

                name:
                    document
                        .getElementById(
                            "deliveryName"
                        )
                        .value,

                phone:
                    document
                        .getElementById(
                            "deliveryPhone"
                        )
                        .value,

                address:
                    document
                        .getElementById(
                            "deliveryAddress"
                        )
                        .value,

                city:
                    document
                        .getElementById(
                            "deliveryCity"
                        )
                        .value,

                pin:
                    document
                        .getElementById(
                            "deliveryPin"
                        )
                        .value

            };


            localStorage.setItem(
                "foodgoAddress",
                JSON.stringify(
                    selectedAddress
                )
            );


            showPage("payment");


            updatePaymentTotal();


            toast(
                "Address saved!"
            );

        }
    );


/* =====================================================
   PAYMENT TOTAL
===================================================== */

function updatePaymentTotal() {

    document.getElementById(
        "paymentTotal"
    ).textContent =
        `₹${calculateGrandTotal()}`;

}


/* =====================================================
   PLACE ORDER
===================================================== */

function placeOrder() {

    if (cart.length === 0) {

        toast(
            "Your cart is empty!"
        );

        return;
    }


    if (!selectedAddress) {

        toast(
            "Please enter delivery address!"
        );

        showPage("checkout");

        return;
    }


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    const order = {

        id:
            Date.now(),

        userId:
            currentUser
                ? currentUser.id
                : "guest",

        items:
            JSON.parse(
                JSON.stringify(cart)
            ),

        address:
            JSON.parse(
                JSON.stringify(
                    selectedAddress
                )
            ),

        subtotal:
            calculateSubtotal(),

        tax:
            calculateTax(),

        deliveryFee:
            calculateDeliveryFee(),

        total:
            calculateGrandTotal(),

        payment,

        status:
            "Order Placed",

        date:
            new Date()
                .toLocaleString(),

        step:
            1

    };


    orders.push(order);


    localStorage.setItem(
        "foodgoOrders",
        JSON.stringify(orders)
    );


    cart = [];


    saveCart();

    updateCart();


    document
        .getElementById(
            "addressForm"
        )
        .reset();


    selectedAddress = null;


    localStorage.removeItem(
        "foodgoAddress"
    );


    toast(
        "Order placed successfully! 🎉"
    );


    setTimeout(
        () => {

            trackingOrderId =
                order.id;

            showTracking(
                order.id
            );

        },
        800
    );

}


/* =====================================================
   ORDERS
===================================================== */

function renderOrders() {

    const container =
        document.getElementById(
            "ordersList"
        );


    container.innerHTML = "";


    const userOrders =
        currentUser
            ? orders.filter(
                order =>
                    order.userId ===
                    currentUser.id
            )
            : [];


    if (userOrders.length === 0) {

        container.innerHTML = `

            <div
                class="form-card"
                style="
                max-width:900px;
                margin:auto;
                text-align:center;
                "
            >

                <div
                    style="
                    font-size:70px;
                    margin-bottom:15px;
                    "
                >
                    📦
                </div>

                <h2>
                    No orders yet
                </h2>

                <p
                    style="
                    color:#777;
                    margin:10px 0 20px;
                    "
                >
                    Your orders will appear here.
                </p>

                <button
                    class="main-btn"
                    onclick="showPage('home')"
                >
                    Order Food
                </button>

            </div>

        `;

        return;
    }


    [...userOrders]
        .reverse()
        .forEach(order => {

            const foodNames =
                order.items
                    .map(
                        item =>
                            `${item.emoji} ${item.name} × ${item.quantity}`
                    )
                    .join(" • ");


            container.innerHTML += `

                <div class="order-card">

                    <div class="order-header">

                        <div>

                            <span
                                style="
                                color:#777;
                                font-size:12px;
                                "
                            >
                                Order ID
                            </span>

                            <div class="order-id">
                                #${order.id}
                            </div>

                        </div>

                        <span class="order-status">
                            ${order.status}
                        </span>

                    </div>


                    <div class="order-foods">

                        <div class="order-food">
                            ${foodNames}
                        </div>

                    </div>


                    <div
                        style="
                        color:#777;
                        font-size:13px;
                        margin-bottom:12px;
                        "
                    >
                        📅 ${order.date}
                    </div>


                    <div class="order-footer">

                        <strong>
                            Total: ₹${order.total}
                        </strong>

                        <button
                            class="track-btn"
                            onclick="showTracking(${order.id})"
                        >
                            🚚 Track Order
                        </button>

                    </div>

                </div>

            `;

        });

}


/* =====================================================
   TRACKING
===================================================== */

function showTracking(orderId) {

    trackingOrderId =
        orderId;


    const order =
        orders.find(
            order =>
                order.id === orderId
        );


    if (!order) return;


    document.getElementById(
        "trackingOrderId"
    ).textContent =
        `#${order.id}`;


    document.getElementById(
        "trackingStatus"
    ).textContent =
        order.status;


    updateTrackingUI(
        order.step
    );


    showPage("tracking");


    simulateTracking(
        order.id
    );

}


/* =====================================================
   TRACKING UI
===================================================== */

function updateTrackingUI(step) {

    const steps = [

        document.getElementById(
            "preparingStep"
        ),

        document.getElementById(
            "deliveryStep"
        ),

        document.getElementById(
            "deliveredStep"
        )

    ];


    steps.forEach(
        stepElement =>
            stepElement.classList.remove(
                "active"
            )
    );


    if (step >= 2) {

        steps[0]
            .classList.add("active");

    }


    if (step >= 3) {

        steps[1]
            .classList.add("active");

    }


    if (step >= 4) {

        steps[2]
            .classList.add("active");

    }

}


/* =====================================================
   DEMO ORDER TRACKING
===================================================== */

function simulateTracking(orderId) {

    const order =
        orders.find(
            order =>
                order.id === orderId
        );


    if (!order) return;


    if (order.step >= 4) {

        return;

    }


    const nextStep =
        order.step + 1;


    setTimeout(
        () => {

            const currentOrder =
                orders.find(
                    item =>
                        item.id === orderId
                );


            if (!currentOrder) return;


            currentOrder.step =
                nextStep;


            if (nextStep === 2) {

                currentOrder.status =
                    "Preparing";

            }

            else if (nextStep === 3) {

                currentOrder.status =
                    "On the Way";

            }

            else if (nextStep === 4) {

                currentOrder.status =
                    "Delivered";

            }


            localStorage.setItem(
                "foodgoOrders",
                JSON.stringify(orders)
            );


            if (
                trackingOrderId ===
                orderId
            ) {

                document.getElementById(
                    "trackingStatus"
                ).textContent =
                    currentOrder.status;


                updateTrackingUI(
                    currentOrder.step
                );

            }


            renderOrders();


            if (nextStep < 4) {

                simulateTracking(
                    orderId
                );

            }

        },
        5000
    );

}


/* =====================================================
   PROFILE
===================================================== */

function loadProfile() {

    if (!currentUser) return;


    document.getElementById(
        "profileName"
    ).textContent =
        currentUser.name;


    document.getElementById(
        "profileName2"
    ).textContent =
        currentUser.name;


    document.getElementById(
        "profileEmail"
    ).textContent =
        currentUser.email;


    document.getElementById(
        "profileEmail2"
    ).textContent =
        currentUser.email;


    document.getElementById(
        "profilePhone"
    ).textContent =
        currentUser.phone ||
        "Not added";

}


/* =====================================================
   TOAST
===================================================== */

function toast(message) {

    const element =
        document.getElementById(
            "toast"
        );


    element.textContent =
        message;


    element.classList.add(
        "show"
    );


    setTimeout(
        () => {

            element.classList.remove(
                "show"
            );

        },
        2500
    );

}


/* =====================================================
   AUTO LOGIN
===================================================== */

window.addEventListener(
    "DOMContentLoaded",
    function() {

        if (currentUser) {

            document
                .getElementById(
                    "authSection"
                )
                .classList.add(
                    "hidden"
                );


            document
                .getElementById(
                    "app"
                )
                .classList.remove(
                    "hidden"
                );


            initializeApp();

        }

    }
);