
// get post by id

    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")

    fetch(`http://mini-blog-backend-production-85b3.up.railway.app/posts/${id}`)
      .then( (res) => res.json())
      .then((post) => {
         const container = document.getElementById("post");
         container.innerHTML = `
            <h1 class="text-3xl font-bold mb-2">${post.title}</h1>
            <p clas="text-gray-600 mb-4">by ${post.author} | ${new Date(post.createdAt).toLocaleDateString()}</p>
            <p class="mb-6">${post.content}</p>
            <a href="index.html" class="text-blue-600">← Back to Home</a>
         `;
      })

