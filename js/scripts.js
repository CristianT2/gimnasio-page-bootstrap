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

    //FUNCIONES PARA ENTRENADORES.HTML
    // Animar barras de habilidades al cargar (entrenadores.html)
    $('.progress.barra-habilidad').each(function() {
        var $bar = $(this).find('.progress-bar');
        var porcentaje = $(this).data('porcentaje');
        $bar.animate({
            width: porcentaje + '%'
        }, {
            duration: 1000,
            easing: 'swing',
            step: function(now) {
                $bar.attr('aria-valuenow', Math.round(now));
            }
        });
    });

    // Manejar rating con estrellas (entrenadores.html)
    $('.rating input').on('change', function() {
        var $rating = $(this).closest('.rating');
        var value = $(this).val();
        $rating.find('label.estrella').each(function() {
            var $label = $(this);
            var inputValue = $label.attr('for').split('-')[1];
            if (inputValue <= value) {
                $label.addClass('activa');
            } else {
                $label.removeClass('activa');
            }
        });
    });

    // Hover en estrellas
    $('.rating label.estrella').on('mouseenter', function() {
        var $rating = $(this).closest('.rating');
        var hoverValue = $(this).attr('for').split('-')[1];
        $rating.find('label.estrella').each(function() {
            var $label = $(this);
            var inputValue = $label.attr('for').split('-')[1];
            if (inputValue <= hoverValue) {
                $label.addClass('activa');
            } else {
                $label.removeClass('activa');
            }
        });
    });

    $('.rating').on('mouseleave', function() {
        var $rating = $(this);
        var checkedValue = $rating.find('input:checked').val() || 0;
        $rating.find('label.estrella').each(function() {
            var $label = $(this);
            var inputValue = $label.attr('for').split('-')[1];
            if (inputValue <= checkedValue) {
                $label.addClass('activa');
            } else {
                $label.removeClass('activa');
            }
        });
    });

    // Inicializar estrellas según valor inicial
    $('.rating').each(function() {
        var $rating = $(this);
        var checkedValue = $rating.find('input:checked').val() || 0;
        $rating.find('label.estrella').each(function() {
            var $label = $(this);
            var inputValue = $label.attr('for').split('-')[1];
            if (inputValue <= checkedValue) {
                $label.addClass('activa');
            }
        });
    });

    //Funciones para contacto.html
    // Validación en tiempo real para contacto
    $('.form-contacto .form-control').on('input change', function() {
        var $input = $(this);
        var id = $input.attr('id');

        if (id === 'nombre' || id === 'apellido' || id === 'asunto') {
            if ($input.val().trim().length >= $input.attr('minlength')) {
                $input.addClass('is-valid').removeClass('is-invalid');
            } else {
                $input.addClass('is-invalid').removeClass('is-valid');
            }
        } else if (id === 'email') {
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailPattern.test($input.val())) {
                $input.addClass('is-valid').removeClass('is-invalid');
            } else {
                $input.addClass('is-invalid').removeClass('is-valid');
            }
        } else if (id === 'telefono') {
            var telPattern = /^[0-9]{10}$/;
            if ($input.val() === '' || telPattern.test($input.val())) {
                $input.addClass('is-valid').removeClass('is-invalid');
            } else {
                $input.addClass('is-invalid').removeClass('is-valid');
            }
        } else if (id === 'edad') {
            var edad = parseInt($input.val());
            if ($input.val() === '' || (!isNaN(edad) && edad >= 16 && edad <= 100)) {
                $input.addClass('is-valid').removeClass('is-invalid');
            } else {
                $input.addClass('is-invalid').removeClass('is-valid');
            }
        } else if (id === 'motivo') {
            if ($input.val() !== '') {
                $input.addClass('is-valid').removeClass('is-invalid');
            } else {
                $input.addClass('is-invalid').removeClass('is-valid');
            }
        } else if (id === 'mensaje') {
            if ($input.val().trim().length > 0) {
                $input.addClass('is-valid').removeClass('is-invalid');
            } else {
                $input.addClass('is-invalid').removeClass('is-valid');
            }
        }
    });

    //Manejo de modal y spinner
    $('form.needs-validation').on('submit', function(event) {
        var $form = $(this);
        var $spinner = $form.find('.spinner-border');
        event.preventDefault();
        event.stopPropagation();
    
        if (this.checkValidity()) {
            $spinner.removeClass('d-none').fadeIn(200);
            setTimeout(function() {
                $spinner.fadeOut(200, function() {
                    $spinner.addClass('d-none');
                });
                $form[0].reset();
                $form.removeClass('was-validated');
                $form.find('.form-control').removeClass('is-valid is-invalid');
                if ($form.hasClass('form-contacto')) {
                    $('#contactoModal').modal('show');
                }
            }, 2000);
        }
        $form.addClass('was-validated');
    });

    //Funciones para precios.html

    // Resaltar fila y columna en la tabla de precios
    $('.table td, .table th').on('click', function() {
        $('.table td, .table th').removeClass('highlight');
        var $cell = $(this);
        var $row = $cell.closest('tr');
        var colIndex = $cell.index();
        $row.find('td, th').addClass('highlight');
        $cell.closest('table').find('tr').each(function() {
            $(this).find('td:eq(' + colIndex + '), th:eq(' + colIndex + ')').addClass('highlight');
        });
    });

    // Toggle mensual/anual para precios
    $('#pricingToggle').on('change', function() {
        var isYearly = $(this).is(':checked');
        $('.price').each(function() {
            var $price = $(this);
            var monthly = $price.data('monthly');
            var yearly = $price.data('yearly');
            $price.text(isYearly ? '$' + yearly + '/año' : '$' + monthly + '/mes');
        });
    });

    //Funciones para blog.html
    // Inicializar filtros al cargar la página
    $('.articulos .articulo').fadeIn(0);
    $('.filtro-opciones .btn[data-filter="todos"]').addClass('active');

    // Función de filtrado de artículos
    $('.filtro-opciones .btn').on('click', function() {
        console.log('Filtro clicado:', $(this).data('filter'));
        $('.filtro-opciones .btn').removeClass('active');
        $(this).addClass('active');
        var filter = $(this).data('filter');
        $('.articulos .articulo').fadeOut(0);
        if (filter === 'todos') {
            $('.articulos .articulo').fadeIn(300);
        } else {
            $('.articulos .articulo[data-category="' + filter + '"]').fadeIn(300);
        }
    });

    // Función para responder comentarios
    $(document).on('click', '.responder', function() {
        console.log('Botón Responder clicado');
        var $comment = $(this).closest('.comment');
        var $replyForm = $comment.find('.reply-form');
        if ($replyForm.length === 0) {
            $comment.append(`
                <div class="reply-form">
                    <input type="text" placeholder="Tu nombre" class="form-control mb-2" />
                    <textarea placeholder="Escribe tu respuesta..." rows="3" class="form-control"></textarea>
                    <button class="btn btn-sm mt-2">Enviar</button>
                </div>
            `);
            $replyForm = $comment.find('.reply-form');
        }
        $replyForm.slideToggle(300);
    });

    // Función para enviar respuestas a comentarios
    $(document).on('click', '.reply-form button', function() {
        console.log('Botón Enviar clicado');
        var $replyForm = $(this).closest('.reply-form');
        var $textarea = $replyForm.find('textarea');
        var $nameInput = $replyForm.find('input');
        var responseText = $textarea.val().trim();
        var userName = $nameInput.val().trim() || 'Anónimo';
        var userInitials = userName.charAt(0).toUpperCase() || 'A';
        if (responseText) {
            var $comment = $replyForm.closest('.comment');
            $comment.append(`
                <div class="comment reply" data-user="${userName}" data-user-initials="${userInitials}">
                    <p><strong>${userName}:</strong> ${responseText}</p>
                </div>
            `);
            $textarea.val('');
            $nameInput.val('');
            $replyForm.slideUp(300);
        }
    });

    // Función para destacar comentarios
    $(document).on('click', '.destacar', function() {
        console.log('Botón Destacar clicado');
        var $comment = $(this).closest('.comment');
        var $button = $(this);
        $comment.toggleClass('destacado');
        $button.text($comment.hasClass('destacado') ? 'Quitar destaque' : 'Destacar');
    });
});

// Inicialización de AOS para animaciones de scroll reveal
$(window).on('load', function() {
    AOS.init({
        duration: 1000, // Duración de la animación (1s)
        once: false,    // Las animaciones se repiten al volver a hacer scroll
        offset: 150,    // Inicia la animación 100px antes de que el elemento sea visible
        delay: 0,        // Sin retraso adicional
        easing: 'ease-out-cubic', // Curva de animación más suave
        anchorPlacement: 'top-bottom' // Iniciar cuando la parte superior del elemento toca el fondo del viewport
    });
    console.log('AOS initialized');
    // Refrescar AOS después de la carga inicial
    AOS.refresh();
});