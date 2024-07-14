// Lógica para validar os campos do formulário.

const formOficina = document.querySelector('#form-oficina');

formOficina.addEventListener('submit', function(e) {

    if(!validarFormulario()) {
        e.preventDefault();
        return;        
    }

    else {
        window.alert('Formulário validado com sucesso!');
    }

});

/**
 * Valida um formulário antes de submetê-lo.
 * @returns {boolean} Verdadeiro se o formulário passar em todas as validações, falso caso contrário.
 */
function validarFormulario(){

    try {

        let validacaoNome = validarNome();

        if(!validacaoNome.status) {
            exibeMensagem(validacaoNome.mensagem);
            return false;
        }

        let validacaoIdade = validarIdade();

        if(!validacaoIdade.status) {
            exibeMensagem(validacaoIdade.mensagem);
            return false;
        }

        let validacaoEmail = validarEmail();
        
        if(!validacaoEmail.status) {
            exibeMensagem(validacaoEmail.mensagem);
            return false;
        }
        
        let validacaoTelefone = validarTelefone();

        if(!validacaoTelefone.status) {
            exibeMensagem(validacaoTelefone.mensagem);
            return false;
        }
        
        let validacaoCPF = validarCPF();
        
        if(!validacaoCPF.status) {
            exibeMensagem(validacaoCPF.mensagem);
            return false;
        }

        let validacaoSenha = validarSenha();

        if(!validacaoSenha.status) {
            exibeMensagem(validacaoSenha.mensagem);
            return false;
        }

        let validacaoConfirmarSenha = validarConfirmarSenha();

        if(!validacaoConfirmarSenha.status) {
            exibeMensagem(validacaoConfirmarSenha.mensagem);
            return false;
        }

        return true;
        
    } catch (error) {
     
        console.error(error);

        return false;

    }

}

/**
 * Exibe uma mensagem de aviso no HTML (relacionada à falha de alguma validação).
 * @param {string} mensagem - A mensagem de aviso a ser exibida.
 */
function exibeMensagem(mensagem) {
    let aviso = document.querySelector("#form-warning");
    aviso.textContent = mensagem;
}

/**
 * Exibe uma janela de alerta com um resumo sobre as novas funcionalidades implementadas.
 */
function exibirImplementacoes() {
    let mensagem = "> FUNCIONALIDADES IMPLEMENTADAS:\n" +
                   "- Adição de * para os campos obrigatórios.\n" +
                   "- Alteração da lógica para validação de campos obrigatórios.\n" +
                   "- Validação de domínio para o campo de Email.\n" +
                   "- Validação e aplicação de máscara para o campo de Telefone.\n" +
                   "- Validação e aplicação de máscara para o campo de CPF.\n" +
                   "- Aplicação de máscara para o campo de CEP.\n" +
                   "- Adição dos campos, com validações, de Senha e Confirmar Senha.\n";
    window.alert(mensagem);
}

/**
 * Valida o campo "Nome".
 * 
 * Verifica se o campo foi preenchido ou não (Campo obrigatório).
 * 
 * @returns {Object} Um objeto contendo o status e a mensagem de validação.
 * @returns {boolean} return.status - Verdadeiro se o campo for preenchido, falso caso contrário.
 * @returns {string} return.mensagem - Uma mensagem indicando o resultado da validação.
 */
function validarNome() {

    let nome = document.querySelector('#nome').value;

    if(nome == '') {
        return {
            status: false,
            mensagem: 'O campo Nome é obrigatório!'
        }
    }

    return {
        status: true,
        mensagem: ''
    }

}

/**
 * Valida o campo "Idade" com base na data de nascimento.
 * 
 * Verifica se o campo foi preenchido ou não (Campo obrigatório).
 * Verifica se a idade do usuário é maior que 18 anos.
 * 
 * @returns {Object} Um objeto contendo o status e a mensagem de validação.
 * @returns {boolean} return.status - Verdadeiro se a idade for válida (maior que 18 anos), falso caso contrário.
 * @returns {string} return.mensagem - Uma mensagem indicando o resultado da validação.
 */
function validarIdade(){
    
    let dataNascimento = document.querySelector('#data-nasc').value;
    let dataAtual = new Date();

    if(dataNascimento == '') {
        return {
            status: false,
            mensagem: 'O campo Data de Nascimento é obrigatório!'
        }
    }

    let anoNascimento = new Date(dataNascimento).getFullYear();
    let anoAtual = dataAtual.getFullYear();

    let idade = anoAtual - anoNascimento;

    if(idade < 18) {
        return {
            status: false,
            mensagem: 'Você precisa ter mais de 18 anos para se cadastrar.'
        }
    }

    return {
        status: true,
        mensagem: ''
    }

}

/**
 * Valida o campo "CPF".
 * 
 * Verifica se o campo foi preenchido ou não (Campo obrigatório).
 * Verifica se a string de entrada do CPF corresponde ao formato esperado,
 * removendo caracteres não numéricos e verificando se o CPF possui 11 dígitos.
 * Realiza a validação dos dígitos verificadores do CPF.
 * 
 * @returns {Object} Um objeto contendo o status e a mensagem de validação.
 * @returns {boolean} return.status - Verdadeiro se o CPF for válido, falso caso contrário.
 * @returns {string} return.mensagem - Uma mensagem indicando o resultado da validação.
 */
function validarCPF() {

    let cpf = document.querySelector('#cpf').value;

    if(cpf == '') {
        return {
            status: false,
            mensagem: 'O campo CPF é obrigatório!'
        }
    }

    cpf = cpf.replace(/[^\d]+/g, '');

    if(cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return {
            status: false,
            mensagem: 'O CPF informado é inválido.'
        };
    }

    if(!validarDigitosVerificadores(cpf)) {
        return {
            status: false,
            mensagem: 'O CPF informado é inválido.'
        };
    }

    return {
        status: true,
        mensagem: ''
    };

}

/**
 * Valida os dígitos verificadores de um CPF.
 * 
 * Realiza a validação dos dígitos verificadores do CPF, garantindo que o CPF seja válido
 * conforme a regra de formação do CPF.
 * 
 * @param {string} cpf - O CPF a ser validado.
 * @returns {boolean} Verdadeiro se os dígitos verificadores do CPF forem válidos, falso caso contrário.
 */
function validarDigitosVerificadores(cpf) {

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if(resto === 10 || resto === 11) resto = 0;
    if(resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if(resto === 10 || resto === 11) resto = 0;
    if(resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;

}

/**
 * Aplica uma máscara ao campo "CPF".
 * @param {string} cpf - A string de entrada do CPF a ser mascarada.
 * @returns {string} A string do CPF mascarada no formato 999.999.999-99.
 */
function aplicarMascaraCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

document.querySelector('#cpf').addEventListener('input', function() {
    this.value = aplicarMascaraCPF(this.value);
});

/**
 * Valida o campo "Email".
 * 
 * Verifica se o campo foi preenchido ou não (Campo obrigatório).
 * Verifica se o domínio do email informado é válido ou não, isto é, se está ou não
 * incluído na lista de domínios válidos.
 * 
 * @returns {Object} Um objeto contendo o status e a mensagem de validação.
 * @returns {boolean} return.status - Verdadeiro se o email for válido, falso caso contrário.
 * @returns {string} return.mensagem - Uma mensagem indicando o resultado da validação.
 */
function validarEmail() {

    let email = document.querySelector('#email').value;

    if(email == '') {
        return {
            status: false,
            mensagem: 'O campo Email é obrigatório!'
        }
    }

    const dominiosValidos = [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "outlook.com",
        "muz.ifsuldeminas.edu.br",
        "alunos.ifsuldeminas.edu.br"
    ];

    const dominio = email.split('@')[1];

    if(dominiosValidos.includes(dominio)) {
        return {
            status: true,
            mensagem: ''
        };
    }

    return {
        status: false,
        mensagem: 'O domínio do email é inválido.'
    };

}

/**
 * Valida o campo "Telefone".
 * 
 * Esta função verifica se a string de entrada do telefone corresponde ao formato padrão brasileiro ((99) 9 9999-9999).
 * Também verifica se o DDD do telefone está na lista de DDDs válidos do Brasil e se o terceiro dígito é 9.
 * 
 * @returns {Object} Um objeto contendo o status e a mensagem de validação.
 * @returns {boolean} return.status - Verdadeiro se o telefone for válido, falso caso contrário.
 * @returns {string} return.mensagem - Uma mensagem indicando o resultado da validação.
 */
function validarTelefone() {

    let telefone = document.querySelector('#telefone').value;

    const dddsBrasil = [
        '11', '12', '13', '14', '15', '16', '17', '18', '19',
        '21', '22', '24', '27', '28', '31', '32', '33', '34',
        '35', '37', '38', '41', '42', '43', '44', '45', '46',
        '47', '48', '49', '51', '53', '54', '55', '61', '62',
        '64', '65', '66', '67', '68', '69', '71', '73', '74',
        '75', '77', '79', '81', '82', '83', '84', '85', '86',
        '87', '88', '89', '91', '92', '93', '94', '95', '96',
        '97', '98', '99'
    ];

    if(telefone) {

        let telefoneRegex = /^\(\d{2}\) \d \d{4}-\d{4}$/;

        if(!telefoneRegex.test(telefone)) {
            return {
                status: false,
                mensagem: 'O número de telefone é inválido.'
            };
        }

        let ddd = telefone.substring(1, 3);

        if(!dddsBrasil.includes(ddd)) {
            return {
                status: false,
                mensagem: 'O DDD do número de telefone é inválido.'
            };
        }

        let terceiroDigito = telefone.charAt(5);

        if (terceiroDigito !== '9') {
            return {
                status: false,
                mensagem: 'O número de telefone deve ter o terceiro dígito como 9.'
            };
        }

    }

    return {
        status: true,
        mensagem: ''
    };

}

/**
 * Aplica uma máscara ao campo "Telefone".
 * @param {string} telefone - A string de entrada do telefone a ser mascarada.
 * @returns {string} A string do telefone mascarada no formato (99) 9 9999-9999.
 */
function aplicarMascaraTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '');
    telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
    telefone = telefone.replace(/(\d{1})(\d{4})(\d{4})$/, '$1 $2-$3');
    return telefone;
}

document.querySelector('#telefone').addEventListener('input', function() {
    this.value = aplicarMascaraTelefone(this.value);
});

/**
 * Aplica uma máscara ao campo "CEP".
 * @param {string} cep - A string de entrada do CEP a ser mascarada.
 * @returns {string} A string do CEP mascarada no formato 99999-999.
 */
function aplicarMascaraCEP(cep) {
    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
    return cep;
}

document.querySelector('#cep').addEventListener('input', function() {
    this.value = aplicarMascaraCEP(this.value);
});

/**
 * Valida o campo "Senha".
 * 
 * Verifica se o campo foi preenchido ou não (Campo obrigatório).
 * Verifica se o campo possui no mínimo 8 caracteres.
 * Verifica se há pelo menos 2 caracteres especiais na senha.
 * 
 * @return {Object} Um objeto contendo o status e a mensagem de validação.
 * @returns {boolean} return.status - Verdadeiro se a senha for válida, falso caso contrário.
 * @returns {string} return.mensagem - Uma mensagem indicando o resultado da validação.
 */
function validarSenha() {

    let senha = document.querySelector('#senha').value;

    if(senha == '') {
        return {
            status: false,
            mensagem: 'O campo Senha é obrigatório!'
        }
    }

    let caracteresEspeciais = /[!@#$%^&*(),.?":{}|<>]/g;
    let match = senha.match(caracteresEspeciais);

    if(senha.length < 8) {
        return {
            status: false,
            mensagem: 'É necessário uma senha de no mínimo 8 caracteres.'
        };
    }

    if(!match || match.length < 2) {
        return {
            status: false,
            mensagem: 'A senha deve conter pelo menos dois caracteres especiais.'
        };
    }

    return {
        status: true,
        mensagem: ''
    };

}

/**
 * Valida o campo "Confirmação de Senha".
 * 
 * Verifica se o campo foi preenchido ou não (Campo obrigatório).
 * Verifica se as senhas informadas nos campos "Senha" e "Confirmar Senha" coincidem.
 * 
 * @return {Object} Um objeto contendo o status e a mensagem de validação.
 * @returns {boolean} return.status - Verdadeiro se as senhas coincidirem, falso caso contrário.
 * @returns {string} return.mensagem - Uma mensagem indicando o resultado da validação.
 */
function validarConfirmarSenha() {

    let senha = document.querySelector('#senha').value;
    let confirmarSenha = document.querySelector('#confirmacao-senha').value;

    if(confirmarSenha == '') {
        return {
            status: false,
            mensagem: 'O campo Confirmar Senha é obrigatório!'
        }
    }

    if((senha) && (senha !== confirmarSenha)) {
        return {
            status: false,
            mensagem: 'As senhas não coincidem.'
        };
    }

    return {
        status: true,
        mensagem: ''
    };

}
