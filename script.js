document.addEventListener("DOMContentLoaded", () => {
  fetchProperties();
  setupContactForm();
  setupSubscriptionForm();
});

async function fetchProperties() {
  try {
    const response = await fetch("http://localhost:5000/api/properties");
    const properties = await response.json();
    const propertyContainer = document.getElementById("property-list");
    propertyContainer.innerHTML = properties.map(property => `
      <div class="property">
        <img src="${property.image}" alt="${property.title}">
        <h3>${property.title}</h3>
        <p>${property.description}</p>
        <p><strong>Price:</strong> $${property.price}</p>
        <p><strong>Location:</strong> ${property.location}</p>
      </div>
    `).join("");
  } catch (error) {
    console.error("Error fetching properties:", error);
  }
}

function setupContactForm() {
  document.getElementById("contact-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const contactData = Object.fromEntries(formData);
    try {
      await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData)
      });
      alert("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  });
}

function setupSubscriptionForm() {
  document.getElementById("subscribe-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("subscribe-email").value;
    try {
      await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      alert("Subscription successful!");
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  });
}