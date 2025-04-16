$(document).ready(function () {
    // Animar hero overlay
    $(".hero-overlay").fadeIn(1000).slideDown(800);

    // Hover en cards
    $(".card").hover(
        function () {
            $(this).animate({ opacity: 0.9 }, 200);
        },
        function () {
            $(this).animate({ opacity: 1 }, 200);
        }
    );

    // Contador animado con repetición
    function animateCounters() {
        $('.counter').each(function () {
            var $this = $(this),
                countTo = $this.attr('data-target');
            // Reiniciar a 0 antes de animar
            $this.text(0);
            $({ countNum: 0 }).animate({
                countNum: countTo
            },
                {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                    }
                });
        });
    }

    // Ejecutar la primera vez
    animateCounters();

    // Repetir cada 5 segundos (2000ms animación + 3000ms espera)
    setInterval(animateCounters, 5000);

    // Carrusel: pausa al hover
    $('#testimoniosCarousel').hover(
        function () {
            $(this).carousel('pause');
        },
        function () {
            $(this).carousel('cycle');
        }
    );

    // Validación formulario footer
    $('form.needs-validation').on('submit', function (event) {
        var $form = $(this);
        var $spinner = $form.find('.spinner-border');
        if (!this.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            $spinner.removeClass('d-none');
            setTimeout(function () {
                $spinner.addClass('d-none');
                $form[0].reset();
                $form.removeClass('was-validated');
            }, 2000);
        }
        $form.addClass('was-validated');
    });

    // Tema claro/oscuro
    const themeToggle = $('#theme-toggle');
    const htmlElement = $('html');
    const themeIcon = $('.theme-icon');
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.attr('data-theme', currentTheme);
    themeIcon.text(currentTheme === 'dark' ? '☀️' : '🌙');

    themeToggle.on('click', function () {
        const newTheme = htmlElement.attr('data-theme') === 'light' ? 'dark' : 'light';
        htmlElement.attr('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.text(newTheme === 'dark' ? '☀️' : '🌙');
    });

    //FUNCIONES PARA CLASES.HTML
    // Inicializar Masonry.js para la galería
    var $grid = $('.masonry-grid');
    if (typeof $.fn.masonry !== 'undefined') {
        $grid.masonry({
            itemSelector: '.masonry-item',
            columnWidth: '.col-6',
            percentPosition: true,
            gutter: 10
        });

        // Forzar layout inicial después de cargar imágenes
        $grid.imagesLoaded().progress(function() {
            $grid.masonry('layout');
        });
    }

    // Filtros para clases y galería
    $('.filtro-opciones .btn').on('click', function() {
        $('.filtro-opciones .btn').removeClass('active');
        $(this).addClass('active');
        var filter = $(this).data('filter');

        // Filtrar tarjetas de clases
        $('#tarjetas-clases .tarjeta-clase').filter(function() {
            return filter === 'todos' || $(this).hasClass(filter);
        }).fadeIn(300);
        $('#tarjetas-clases .tarjeta-clase').filter(function() {
            return filter !== 'todos' && !$(this).hasClass(filter);
        }).fadeOut(0);

        // Filtrar galería masonry
        $('.masonry-grid .masonry-item.galeria-item').filter(function() {
            return filter === 'todos' || $(this).hasClass(filter);
        }).fadeIn(300);
        $('.masonry-grid .masonry-item.galeria-item').filter(function() {
            return filter !== 'todos' && !$(this).hasClass(filter);
        }).fadeOut(0);

        // Actualizar Masonry.js si está disponible
        if (typeof $.fn.masonry !== 'undefined') {
            setTimeout(function() {
                $grid.masonry('layout');
            }, 350);
        }
    });
});