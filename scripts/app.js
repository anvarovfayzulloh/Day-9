const $result = document.querySelector("#result")

const renderData = (data) => {
    data.forEach(user => {
        const $div = document.createElement("div")
        $div.innerHTML = `
            <img src="${user.image}" alt="${user.firstName}">
            <h3>${user.firstName}</h3>
            <h3>${user.lastName}</h3>
            <h4>${user.email.slice(0, 13)}</h4>
            <p>${user.role}</p>
            <button class="delete" data-user-id="${user.id}" >Delete</button>
        `
        $result.appendChild($div)
    });     
}

fetch("https://dummyjson.com/users?limit=20")
    .then(response => response.json())
    .then(data => renderData(data.users))
    .catch(error => console.error('Error:', error));

const handleUserActions = (e) => {
    if (e.target.classList.contains("delete")) {
        const id = e.target.dataset.userId
        let userAgree = confirm("Are you sure you want to delete this user?")
        if (userAgree) {
            e.target.parentElement.remove()
            fetch(`https://dummyjson.com/users/${id}`, { method: "DELETE" })
                .then(response => response.json())
                .then(deletedData => {
                    console.log('User deleted:', deletedData)
                })
                .catch(error => console.error('Error:', error));
        }
    }
}
    
$result.addEventListener("click", handleUserActions)
