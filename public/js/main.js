let callMeForm = document.querySelector('.call-me-form');

document.addEventListener('DOMContentLoaded', async function () { // When the object document is completely loaded.
    let post = await getPost();
    let articles = document.querySelector('.articles');
    articles.innerHTML = '';
    post.forEach((post) => {
        let postHTML = `
             <div class="col-4">
                <div class="card">
                    <img class="card-img-top" src="${post.imageURL}" alt="${post.title}">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.description}</p>
                        <a href="/sight?id=${post.id}" class="btn btn-primary">Details</a>
                    </div>
                </div>
             </div>`;
        articles.insertAdjacentHTML('beforeend', postHTML);
    })
});

callMeForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    let phoneInp = callMeForm.querySelector('input'); // because inside form there is only one input.
    await fetch('http://localhost:3000/callback-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // we're going to send a JSON object.
        },
        body: JSON.stringify({
            phoneNumber: phoneInp.value
        })
    }).then((resp) => resp.text()).then(() => alert("We will call you as soon as possible."));
});