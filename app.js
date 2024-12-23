// Get references to elements
const buyNowButton = document.getElementById('buyNowButton');
const checkoutForm = document.getElementById('checkoutForm');
const closeCheckout = document.getElementById('closeCheckout');

// Show the checkout form when "Buy Now" is clicked
buyNowButton.addEventListener('click', () => {
    checkoutForm.classList.remove('hidden');
});

// Hide the checkout form when the close button is clicked
closeCheckout.addEventListener('click', () => {
    checkoutForm.classList.add('hidden');
});

document.getElementById("buyNowButton").addEventListener("click", function() {
    const selectedOption = document.querySelector('input[name="paymentOption"]:checked').value;
    console.log("Selected Payment Option: $" + selectedOption);
    document.getElementById("checkoutForm").classList.remove("hidden");
});
