// JavaScript for the rotating testimonial carousel
let currentIndex = 0;
const testimonials = document.querySelectorAll(".testimonial");

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle("active", i === index);
  });
}

function rotateTestimonials() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}

// Rotate testimonials every 5 seconds (adjust as needed)
setInterval(rotateTestimonials, 5000);

// Show the first testimonial initially
showTestimonial(currentIndex);
