function showGreeting() {
    var greeting = document.getElementById("greeting");

    if (!greeting) {
        return;
    }
    var hour = new Date().getHours();
    var message
    if (hour < 12) {
        message = "Good morning";
    } else if (hour < 18) {
        message = "Good afternoon";
    } else {
        message = "Good evening";
    }
    greeting.innerHTML = message;
}
showGreeting();

const mapElement = document.getElementById("map");
if (mapElement) {
    // Initialize the map and set the view to Protea Glen, Soweto (approximate coordinates)
    const map = L.map('map').setView([-26.2744, 27.8292], 14); 
    
    // Add the OpenStreetMap tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker and a popup
    L.marker([-26.2744, 27.8292]).addTo(map)
        .bindPopup('<b>Sneaker.Kicks</b><br>27446 Kgosi Street, Protea Glen')
        .openPopup();
}

function toggleAnswer(event) {
    var answer = event.currentTarget.nextElementSibling;
    if (answer.style.display === "none") {
        answer.style.display = "";
    }
    else {
        answer.style.display = "none";
    }
}
var questions = document.querySelectorAll(".faq-items h3");
for (var q = 0; q < questions.length; q++){
    questions[q].style.cursor = "pointer";
    questions[q].nextElementSibling.style.display = "none";
    questions[q].addEventListener("click", toggleAnswer);
}
console.log("script.js is connected!");

const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
element.addEventListener("click", function () {
    // code that runs every time the element is clicked
});

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(function (item) {
    const question = item.querySelector("h3");
    // Start with every answer hidden
    item.classList.add("closed");
    // Make the question reachable and understandable without a mouse
    question.setAttribute("tabindex", "0");
    question.setAttribute("role", "button");
    question.setAttribute("aria-expanded", "false");
    function toggleAnswer() {
        // toggle() adds the class if it is missing, removes it if present,
        // and gives back true when the class is now ON the element.
        const isClosed = item.classList.toggle("closed");
        if (isClosed) {
            question.setAttribute("aria-expanded", "false");
        } else {
            question.setAttribute("aria-expanded", "true");
        }
    }
    question.addEventListener("click", toggleAnswer);
    question.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); // stop the space bar scrolling the page
            toggleAnswer();
        }
    });
});

// Step 7 - Product search: filter the cards as the visitor types
const searchInput = document.getElementById("product-search");
const productCards = document.querySelectorAll(".product-card");
const noResults = document.getElementById("no-results");
if (searchInput) {
    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;
        productCards.forEach(function (card) {
            const name = card.querySelector("h3").textContent;
            const details = card.querySelector(".product-meta").textContent;
            const cardText = (name + " " + details).toLowerCase();
            if (cardText.includes(searchText)) {
                card.classList.remove("is-hidden");
                visibleCount = visibleCount + 1;
            } else {
                card.classList.add("is-hidden");
            }
        });
        if (visibleCount === 0) {
            noResults.classList.remove("is-hidden");
        } else {
            noResults.classList.add("is-hidden");
        }
    });
}
switch (valueToCheck) {
    case "option one":
        // code for option one
        break;
    case "option two":
        // code for option two
        break;
    default:
    // code if nothing above matched
}
// Step 8 - switch / case: a hint that changes with the chosen reason
const typeSelect = document.getElementById("enq-type");
const typeHint = document.getElementById("type-hint");
function showTypeHint() {
    if (!typeSelect || !typeHint) {
        return; // not on the Enquiries page, so do nothing
    }
    let message = "";
    switch (typeSelect.value) {
        case "Enquiry about a service":
            message = "Please tell us which service you are interested in.";
            break;
        case "Enquiry about a product":
            message = "Please tell us the product name and size.";
            break;
        case "I want to volunteer":
            message = "Wonderful! Tell us when you are available and what you enjoydoing.";
            break;
        default:
            message = "Tell us how we can help you today.";
    }
    typeHint.textContent = message;
}
if (typeSelect) {
    typeSelect.addEventListener("change", showTypeHint);
    showTypeHint(); // show the starting hint straight away
}
// Step 9 - Form validation (works for BOTH the Enquiries and Contact forms)
// Is this text shaped like an email address? (something@something.something)
function isValidEmail(email) {
    const atPosition = email.indexOf("@");
    const lastDotPosition = email.lastIndexOf(".");
    return (
        atPosition > 0 &&
        lastDotPosition > atPosition + 1 &&
        lastDotPosition < email.length - 1 &&
        !email.includes(" ")
    );
}
// Put a red border on a field and add an error message under it
function showError(field, message) {
    field.classList.add("input-error");
    const error = document.createElement("span");
    error.className = "error-message";
    error.textContent = message;
    field.parentElement.appendChild(error);
}
// Remove every error message and red border from a form
function clearErrors(form) {
    form.querySelectorAll(".error-message").forEach(function (error) {
        error.remove();
    });
    form.querySelectorAll(".input-error").forEach(function (field) {
        field.classList.remove("input-error");
    });
}
const forms = document.querySelectorAll("form");
forms.forEach(function (form) {
    const successMessage = form.querySelector(".form-success");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // stop the page reloading - we check first
        clearErrors(form);
        
        if (successMessage) {
            successMessage.classList.add("is-hidden");
        }
        
        let formIsValid = true;
        let firstBadField = null;
        const requiredFields = form.querySelectorAll("[required]");
        
        requiredFields.forEach(function (field) {
            const value = field.value.trim();
            const labelText = field.labels[0].textContent;
            let problem = "";
            
            if (value === "") {
                problem = labelText + " is required.";
            } else if (field.type === "email" && !isValidEmail(value)) {
                problem = "Please enter a valid email address, like you@email.com.";
            }
            
            if (problem !== "") {
                showError(field, problem);
                formIsValid = false;
                if (firstBadField === null) {
                    firstBadField = field;
                }
            }
        });
        
        if (formIsValid) {
            // --- NEW AJAX SUBMISSION CODE ---
            // Disable the submit button to prevent double-clicks
            const submitBtn = form.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = "Sending...";
            submitBtn.disabled = true;

            // Gather the form data
            const formData = new FormData(form);

            // Simulate an AJAX request using fetch()
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Success! The data was "sent"
                console.log('AJAX Success:', data);
                
                form.reset();
                if (typeof showTypeHint === "function") {
                    showTypeHint(); // reset() empties the menu, so refresh the hint
                }
                
                if (successMessage) {
                    successMessage.classList.remove("is-hidden");
                }
            })
            .catch(error => {
                // Handle errors (e.g., no internet connection)
                console.error('AJAX Error:', error);
                alert("Sorry, there was an error sending your message. Please try again later.");
            })
            .finally(() => {
                // Restore the button state whether it succeeded or failed
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
            // --- END OF NEW AJAX CODE ---

        } else {
            firstBadField.focus(); // jump the cursor to the first problem
        }
    });
});
    const lightboxHTML = `
    <div class="lightbox-overlay" id="lightbox">
        <div class="lightbox-content">
            <button class="lightbox-close" id="lightbox-close" aria-label="Close image">&times;</button>
            <img src="" alt="Enlarged product view" id="lightbox-img">
        </div>
    </div>
`;
// Append it to the body
document.body.insertAdjacentHTML('beforeend', lightboxHTML);

// 2. Get the elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

// 3. Find all product images on the page
const productImages = document.querySelectorAll('.product-image img');

// 4. Add click events to open the lightbox
if (productImages.length > 0 && lightbox) {
    productImages.forEach(function(image) {
        image.addEventListener('click', function() {
            // Set the lightbox image source to the clicked image's source
            lightboxImg.src = this.src;
            // Add the active class to show the overlay
            lightbox.classList.add('active');
            // Prevent the page from scrolling while the lightbox is open
            document.body.style.overflow = 'hidden'; 
        });
    });

    // 5. Function to close the lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        // Re-enable scrolling
        document.body.style.overflow = ''; 
        // Clear the source after closing (optional, but good for memory)
        setTimeout(() => { lightboxImg.src = ''; }, 300); 
    }

    // 6. Event listeners to close the lightbox
    lightboxClose.addEventListener('click', closeLightbox);

    // Close if clicking on the dark background (outside the image)
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Close if pressing the 'Escape' key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}


