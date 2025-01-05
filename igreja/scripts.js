document.addEventListener('DOMContentLoaded', function() {
    const navbarToggleBtn = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('#navbarNav');

    navbarToggleBtn.addEventListener('click', function() {
        navbarNav.classList.toggle('collapse');
    });

    const contactForm = document.querySelector('form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;
        console.log(`Nome: ${nome}, Email: ${email}, Mensagem: ${mensagem}`);
        alert('Formulário enviado com sucesso!');
        contactForm.reset();
    });
});
