document.addEventListener('DOMContentLoaded', () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyuQ2u9kVZGECrPTJyfHM2M5ftM5uOwm5fjN-f79Osh9KpbJinICPc4GArim93UJTsb/exec';

    const form = document.getElementById('form-assinatura');
    const btnSubmit = document.getElementById('btn-submit');
    const msgSucesso = document.getElementById('mensagem-sucesso');
    const barraProgresso = document.getElementById('minhaBarra');
    const textoAssinaturas = document.getElementById('assinaturas-atuais');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const termosInput = document.getElementById('termos');
    const erroGeral = document.getElementById('erro-geral');
    const btnWhatsapp = document.getElementById('btn-whatsapp');
    const ctaFixo = document.getElementById('cta-fixo');
    const contadorTexto = document.getElementById('contador-texto');

    const urlCompartilhar = encodeURIComponent(window.location.href);
    const msgCompartilhar = encodeURIComponent('Basta de caos nos trilhos! Assine o abaixo-assinado para o governador romper o contrato com a ViaMobilidade: ');

    function carregarAssinaturas() {
        fetch(scriptURL)
            .then(response => response.json())
            .then(data => {
                const atuais = data.assinaturas || 0;
                const meta = 10000;

                if (textoAssinaturas) textoAssinaturas.innerText = atuais.toLocaleString('pt-BR');

                let porcentagem = (atuais / meta) * 100;
                if (porcentagem > 100) porcentagem = 100;

                if (barraProgresso) barraProgresso.style.width = porcentagem + '%';
            })
            .catch(error => console.error(error));
    }

    if (scriptURL !== 'COLE_AQUI_A_URL_DO_APPS_SCRIPT') {
        carregarAssinaturas();
    } else {
        if (textoAssinaturas) textoAssinaturas.innerText = '0';
        if (contadorTexto) contadorTexto.innerText = 'assine agora e seja a primeira pessoa';
    }

    window.addEventListener('scroll', () => {
        const secaoForm = document.getElementById('form-assinatura');
        if (!ctaFixo || !secaoForm) return;
        const passouHero = window.scrollY > 600;
        const formVisivel = secaoForm.getBoundingClientRect().top < window.innerHeight * 0.8;
        ctaFixo.classList.toggle('visivel', passouHero && !formVisivel);
    }, { passive: true });

    if (btnWhatsapp) {
        btnWhatsapp.href = 'https://wa.me/?text=' + msgCompartilhar + urlCompartilhar;
    }

    if (telefoneInput) {
        telefoneInput.addEventListener('input', function (e) {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length > 11) valor = valor.slice(0, 11);
            if (valor.length > 2 && valor.length <= 6) valor = valor.replace(/^(\d{2})(\d+)/, '($1) $2');
            else if (valor.length > 6) valor = valor.replace(/^(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
            else if (valor.length > 0) valor = valor.replace(/^(\d+)/, '($1');
            e.target.value = valor;
            limparErro(telefoneInput, 'erro-telefone');
        });
    }

    if (nomeInput) nomeInput.addEventListener('input', () => limparErro(nomeInput, 'erro-nome'));
    if (emailInput) emailInput.addEventListener('input', () => limparErro(emailInput, 'erro-email'));
    if (termosInput) termosInput.addEventListener('change', () => limparErro(termosInput, 'erro-termos'));

    function mostrarErro(inputElement, idErro) {
        if (inputElement) inputElement.classList.add('input-invalido');
        const erroEl = document.getElementById(idErro);
        if (erroEl) erroEl.classList.add('visivel');
    }

    function limparErro(inputElement, idErro) {
        if (inputElement) inputElement.classList.remove('input-invalido');
        const erroEl = document.getElementById(idErro);
        if (erroEl) erroEl.classList.remove('visivel');
    }

    function emailValido(valor) {
        const partes = valor.trim().toLowerCase().split('@');
        if (partes.length !== 2) return false;
        const dominio = partes[1];
        if (!/^[^\s.]+\.[a-z]{2,}$/.test(dominio)) return false;
        if (dominio.split('.').some(p => p.length < 2)) return false;
        return true;
    }

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            if (erroGeral) erroGeral.classList.remove('visivel');

            let formularioValido = true;

            if (nomeInput && nomeInput.value.trim().length < 3) {
                mostrarErro(nomeInput, 'erro-nome');
                formularioValido = false;
            }

            if (emailInput && !emailValido(emailInput.value)) {
                mostrarErro(emailInput, 'erro-email');
                formularioValido = false;
            }

            if (telefoneInput && telefoneInput.value.replace(/\D/g, '').length < 10) {
                mostrarErro(telefoneInput, 'erro-telefone');
                formularioValido = false;
            }

            if (termosInput && !termosInput.checked) {
                mostrarErro(termosInput, 'erro-termos');
                formularioValido = false;
            }

            if (!formularioValido) return;

            btnSubmit.disabled = true;
            btnSubmit.innerText = 'Enviando...';

            const dados = new FormData();
            dados.append('nome', nomeInput.value.trim());
            dados.append('email', emailInput.value.trim().toLowerCase());
            dados.append('telefone', telefoneInput.value.trim());
            dados.append('dataHora', new Date().toLocaleString('pt-BR'));

            fetch(scriptURL, { method: 'POST', body: dados })
                .then(() => {
                    form.hidden = true;
                    msgSucesso.hidden = false;
                    if (ctaFixo) ctaFixo.classList.remove('visivel');
                    carregarAssinaturas();
                })
                .catch(() => {
                    btnSubmit.disabled = false;
                    btnSubmit.innerText = 'Quero assinar ✊';
                    erroGeral.classList.add('visivel');
                });
        });
    }
});
