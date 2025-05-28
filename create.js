

// create a post
 document.addEventListener("DOMContentLoaded", function () {
  console.log("Script loaded");

  const form = document.getElementById("postForm");
  console.log("postForm:", form);

  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const content = document.getElementById("content").value;

    fetch("http://mini-blog-backend-production-85b3.up.railway.app/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, content }),
    })
      .then((res) => res.json())
      .then((data) => {

        showToast("Post Saved")
        // alert("Post saved!");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500)
       
      });
  });

});



function showToast(message, type = "success") {

  const toast = document.getElementById("toast");
  toast.textContent = message;

  // apply color
  toast.className =
    "fixed top-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded shadow z-50 animate-fade";

  document.body.appendChild(toast);

  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}
