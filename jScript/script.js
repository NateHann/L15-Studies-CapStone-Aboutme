$(document).ready(function () {
  // Function to toggle visibility for a given blog post
  function toggleBlogPostVisibility(blogPostId) {
    let blogPost = $("#" + blogPostId);
    if (blogPost.length === 0) {
      console.error("Blog post not found:", blogPostId);
      return;
    }
    let title = blogPost.find(".title_blog");
    let content = blogPost.find(".article-container");

    content.hide();
    title.click(function () {
      content.toggle();
    });
  }

  // Function to save a photo to local storage
  function saveForLater(photoId) {
    let savedPhotos = JSON.parse(localStorage.getItem("savedPhotos")) || [];
    savedPhotos.push(photoId);
    localStorage.setItem("savedPhotos", JSON.stringify(savedPhotos));
    alert(`Photo Saved. Total saved items: ${savedPhotos.length}`);
  }

  // Function to save blog post info to local storage
  function saveBlogForLater(blogPostId) {
    let savedBlogItems =
      JSON.parse(localStorage.getItem("savedBlogPosts")) || [];
    let blogPost = $("#" + blogPostId);
    if (blogPost.length === 0) {
      console.error("Blog post not found:", blogPostId);
      return;
    }

    let title = blogPost.find(".title_blog").text();
    let link = window.location.href.split("#")[0] + "#" + blogPostId;

    savedBlogItems.push({ id: blogPostId, title: title, link: link });
    localStorage.setItem("savedBlogPosts", JSON.stringify(savedBlogItems));
    alert(`Blog Post Saved. Total saved items: ${savedBlogItems.length}`);
  }

  // Function to display saved items on the Saved page
  function displaySavedItems() {
    let savedItems = JSON.parse(localStorage.getItem("savedPhotos")) || [];
    let savedBlogItems =
      JSON.parse(localStorage.getItem("savedBlogPosts")) || [];
    let container = $("#saved-items-container");
    let blogContainer = $("#saved-items-container-blog");

    container.empty();
    blogContainer.empty();

    $.each(savedItems, function (index, photoId) {
      let img = $("<img>", {
        src: "https://picsum.photos/300/200?random=" + photoId,
        css: { maxWidth: "10%" },
      });
      container.append(img);
    });

    $.each(savedBlogItems, function (index, item) {
      let link = $("<a>", {
        href: item.link,
        text: item.title,
      });
      blogContainer.append(link, "<br>");
    });
  }

  // Clears saved images from local storage and updates display
  $("#clear-saved-images").click(function () {
    localStorage.removeItem("savedPhotos");
    $("#saved-items-container").empty();
    alert("Saved images cleared.");
  });

  // Clears saved blog posts from local storage and updates display
  $("#clear-saved-blogposts").click(function () {
    localStorage.removeItem("savedBlogPosts");
    $("#saved-items-container-blog").empty();
    alert("Saved blog posts cleared.");
  });

  // Apply toggle visibility function to each blog post
  toggleBlogPostVisibility("blog-post1");
  toggleBlogPostVisibility("blog-post2");
  toggleBlogPostVisibility("blog-post3");

  // Event listeners for save buttons for gallery items
  $(".save-buttongallery").click(function () {
    let photoId = $(this).data("photo-id");
    saveForLater(photoId);

    // Add pulsate animation to the button
    $(this).addClass("pulsate");
    setTimeout(() => {
      $(this).removeClass("pulsate");
    }, 2000);
  });

  // Event listeners for save blog buttons
  $(".save-blog-button").click(function () {
    let blogPostId = $(this).data("blog-id");
    saveBlogForLater(blogPostId);

    // Add pulsate animation to the button
    $(this).addClass("pulsate");
    setTimeout(() => {
      $(this).removeClass("pulsate");
    }, 2000);
  });

  // Check if the current page is the "Saved for Later" page and display saved items
  if (window.location.pathname.endsWith("/saved.html")) {
    displaySavedItems();
  }

  // Event listeners for like buttons
  $(
    "#likeButton1, #likeButton2, #likeButton3, #likeButton4, #likeButton5, #likeButton6, #likeButton7"
  ).click(function () {
    let button = $(this);

    if (!button.hasClass("liked")) {
      button.addClass("liked");
      button.addClass("pulsate");

      // Remove the "pulsate" class after 2 seconds
      setTimeout(function () {
        button.removeClass("pulsate");
      }, 2000);
    } else {
      button.removeClass("liked");
      button.removeClass("pulsate");
    }
  });

  // Load comments from local storage for each comment section
  function loadComments() {
    $(".comment-section").each(function () {
      let sectionId = $(this).attr("id");
      let commentsHtml = localStorage.getItem("commentsHtml-" + sectionId);
      if (commentsHtml) {
        $(this).find(".comments").html(commentsHtml);
        attachDeleteEvent(sectionId);
      }
    });
  }

  // Save comments to local storage for a specific comment section
  function saveComments(sectionId) {
    let commentsHtml = $("#" + sectionId + " .comments").html();
    localStorage.setItem("commentsHtml-" + sectionId, commentsHtml);
  }

  // Attach delete event to delete buttons in comments for a specific section
  function attachDeleteEvent(sectionId) {
    $("#" + sectionId + " .delete-comment")
      .off("click")
      .on("click", function () {
        $(this).closest(".comment").remove();
        saveComments(sectionId);
      });
  }

  // Event handler for posting new comments
  $(".post-comment").click(function () {
    let commentSection = $(this).closest(".comment-section");
    let sectionId = commentSection.attr("id");
    let authorName = commentSection.find(".comment-author-input").val().trim();
    let commentText = commentSection.find(".comment-text-input").val().trim();
    let currentDate = new Date().toLocaleDateString("en-US");

    if (authorName !== "" && commentText !== "") {
      let newComment = `
              <div class="comment">
                  <div class="comment-author">
                      <p class="author-name">${authorName}</p>
                      <p class="comment-date">${currentDate}</p>
                      <button class="delete-comment">X</button>
                  </div>
                  <p class="comment-text">${commentText}</p>
              </div>
          `;

      commentSection.find(".comments").append(newComment);
      commentSection.find(".comment-author-input").val("");
      commentSection.find(".comment-text-input").val("");
      saveComments(sectionId);
      attachDeleteEvent(sectionId);
    } else {
      alert("Please enter your name and a comment.");
    }
  });

  // Load comments when the page loads
  loadComments();
});
