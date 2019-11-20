{ // change scope to not conflict with the same variable from another .js file
    let articlesBlock = document.querySelector('.articles');
    let updateForm = document.querySelector('.update-post-form');

    let titleInp = document.querySelector('#update-title');
    let textArea = document.querySelector('#update-text');
    let id;

    articlesBlock.addEventListener('click', async function (event) {
        if (event.target.classList.contains('btn-edit')) {
            id = event.target.parentNode.parentNode.querySelector('.id').value;
            let postInfo = await fetch('http://localhost:3000/posts/' +id) // for GET request we don't need to specify which method
                .then((response) => response.json())
                .then((data) => data);

            titleInp.value = postInfo.title;

            textArea.value = postInfo.text;

            let articlesTab = document.getElementById('v-pills-articles');
            articlesTab.classList.remove('show');
            articlesTab.classList.remove('active');
            let updateTab = document.getElementById('v-pills-update-post');
            updateTab.classList.add('show');
            updateTab.classList.add('active');
        }
    });
    updateForm.addEventListener('submit', function (event) {
        event.preventDefault();
        fetch('http://localhost:3000/posts/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleInp.value,
                text: textArea.value,
                description: textArea.value.substring(0, textArea.value.indexOf('.') +1)
            })
        }).then((response) => response.text())
            .then(() => window.history.go());
    });
}