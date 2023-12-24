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

// Rotate testimonials every 5 seconds
setInterval(rotateTestimonials, 3000);

// Start with initial testimonial 
showTestimonial(currentIndex);
