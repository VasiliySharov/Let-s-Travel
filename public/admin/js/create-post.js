let createForm = document.querySelector('.create-post-form');
let createTitle = document.querySelector('#create-title');
let createCounty = document.querySelector('#create-country');
let createImageUrl = document.querySelector('#create-image-url');
let createText = document.querySelector('#create-text');
let createImageFile = document.querySelector('#create-image-file');

createForm.addEventListener('submit', function (e) {
     e.preventDefault();
     let text = createText.value;
    let data = new FormData(); // Creating an object of the type FromData
    data.append('title', createTitle.value);
    data.append('country', createCounty.value);
    data.append('imageUrl', createImageUrl.value);
    data.append('text', text);
    data.append('description', text.substring(0, text.indexOf('.') +1)); // +1 to add a dot. CHECK IT
    data.append('imageFile', createImageFile.files[0]);
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: data
        })
        .then((response) => response.text())
        .then((data) => window.history.go()); // CHECK "now will be automatically redirected to the admin page each time a post is added."
});

function disableInput(input, input2) {
    if (input.value) {
        input2.disabled = true;
    } else {
        input2.disabled = false;
    }
}

createImageUrl.addEventListener('change', function () {
    disableInput(this, createImageFile)
});
createImageFile.addEventListener('change', function () {
    disableInput(this, createImageUrl)
});