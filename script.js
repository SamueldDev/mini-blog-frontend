

// fetch post
  document.addEventListener("DOMContentLoaded", () => {
  // fetch("http://localhost:7030/posts")
   fetch("https://mini-blog-backend-production-85b3.up.railway.app/posts")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("posts");

      if(!container){
        console.error("post not found")
        return;
      }

      data.forEach((post) => {
        container.innerHTML += `
          <div class="bg-white p-4 shadow rounded">
            <h2 class="text-xl font-bold">${post.title}</h2>
            <p class="text-gray-600">by ${post.author}</p>
            <a href="viewpost.html?id=${post.id}" class="text-blue-600 mt-2 inline-block">View Post</a>
            <button onclick="deletePost('${post.id}')" class="text-red-500 ml-4 cursor-pointer">Delete</button>
          </div>
        `;
      });
    });
});



// Show the modal and return a Promise that resolves true/false
function showConfirm() {
  return new Promise((resolve) => {
    const modal = document.getElementById("confirmModal");
    modal.classList.remove("hidden");

    document.getElementById("confirmYes").onclick = () => {
      modal.classList.add("hidden");
      resolve(true);
    };

    document.getElementById("confirmNo").onclick = () => {
      modal.classList.add("hidden");
      resolve(false);
    };
  });
}

// Usage in deletePost function:
async function deletePost(id) {
  const confirmed = await showConfirm();
  if (!confirmed) return;

  fetch(`https://mini-blog-backend-production-85b3.up.railway.app/posts/${id}`, { method: "DELETE" })
    .then((res) => {
      if (res.ok) {
        showToast("Post deleted successfully");
        setTimeout(() => location.reload(), 1500);
      } else {
        showToast("Failed to delete post", "error");
      }
    });
}



function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;


  // Apply color
  toast.className =
    "fixed top-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded shadow z-50 animate-fade";

  document.body.appendChild(toast);

  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

