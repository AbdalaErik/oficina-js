function getCity(cep) {

    const cidade = document.querySelector("#cidade");
    const estado = document.querySelector("#estado");
    const rua = document.querySelector("#rua");
    const bairro = document.querySelector("#bairro");

    rua.removeAttribute("readonly");
    bairro.removeAttribute("readonly");

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
        
        //console.log(data);
        cidade.value = data.localidade;
        estado.value = data.uf;

        if(data.logradouro !== undefined) {
            rua.value = data.logradouro;
            rua.setAttribute("readonly", "readonly");
        }

        if(data.bairro !== undefined) {
            bairro.value = data.bairro;
            bairro.setAttribute("readonly", "readonly");
        }

    })
    .catch(error => {
        // Handle any errors here
        console.error(error);
    });


}

document.querySelector("#cep").addEventListener("blur", function(){
    getCity(this.value);
});
