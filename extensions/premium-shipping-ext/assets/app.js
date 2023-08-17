const parentDiv = document.querySelector(".product__info-container");

const fetchAPI = async () => {

    await fetch("myshopify.com/apps/myapp/api/options/get")
    .then(res => res.json())
    .then((data) => {

        let options = data.data;

        options = options.map(function(element) {
            return element.options;
        });

        let option = options[0].map(function(element) {
            return `<button class="${element}Btn">${element}</button>`;
        });

        parentDiv.innerHTML = option.join(" ");


    })
    .catch((error) => {
        console.log("ERROR", error);
    })

};

fetchAPI();