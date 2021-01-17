$( document ).ready(function() {

  /* Padrão do PopOver */
  $.fn.tooltip.Constructor.DEFAULTS.html = true;

  $('body').tooltip( {
    selector: '[data-toggle=tooltip]',
    container: 'body'
  } );
  /* Tooltip */

  /* Div clicável */
  $(".clickable").bind( "click", function() {
    window.location = $(this).data("location");
  });

  /* Ao abrir um item do menu lateral fecha os outros */
  $('.sidebar-menu-collapsible li > .collapse').on('show.bs.collapse', function () {
    $('.sidebar-menu-collapsible  li .collapse').collapse('hide');
  });

  /* retração dos blocos */
  $(".hide-block-content").click(function(e){
    e.preventDefault();
    collapseElem = $(this).parents('.block').find(".collapse");
    iconButton = $(this).find('.block-controls .fa');

    iconButton.toggleClass("fa-chevron-up");
    iconButton.toggleClass("fa-chevron-down");

    collapseElem.collapse("toggle");
    collapseElem.on('shown.bs.collapse', function () {
      layoutConstruct();
    });
    collapseElem.on('hidden.bs.collapse', function () {
      layoutConstruct();
    });
  });

  /* Padrão do PopOver */
  $.fn.popover.Constructor.DEFAULTS.html = true;
  /* Popovers com Click*/
  $('.popover-trigger').click(function (e) {
    e.preventDefault();
  });

  /* Custom Popovers */
  $('.popover-trigger').popover({
    content: function(){
      getContent = $(this).attr("data-get-content");
      getContent = $("#"+getContent);
      // Fix to bs Select duplicate
      getContent.find("select").removeClass("bs-select-hidden");
      getContent.find(".bootstrap-select").remove();
      return(getContent.html());
    }
  }).on('shown.bs.popover', function () {
    // Aplica scroll depois da inicialização do popover
    customScrollbar();

    // popoverSize($(this).next('.popover'), true, true,$(window) );
    $('.popover select').selectpicker();
    datepickerInit();

    // Btn close
    var $popup = $(this);
    $(this).next('.popover').find('.popover-close').click(function (e) {
      e.preventDefault();
      $popup.popover('hide');
    });
  }).on('show.bs.popover', function () {
    $('.popover').popover('hide');
  });

  /* Ao fechar os modais ajustar o posicionamento */
  $('.modal').on('hidden.bs.modal', function () {
    layoutConstruct();
  });

  // Retração das laterais
  $(".sidebar-minify-left").click(function(){
    $("#main").toggleClass("sidebar-minified-left");
  });

  /* Abre menu da direita */
  $(".table-result-link").click(function(){
    $("#main").addClass("sidebar-maximized-right");
    $("#client-detail").removeClass("disabled");
    $("#run-operation-business-action").removeClass("disabled");
    $("#run-business-action").removeClass("disabled");
    $("#run-business-action").addClass("active");
  });
  $(".sidebar-content-area-close").click(function(e){
    e.preventDefault();
    $("#main").toggleClass("sidebar-maximized-right");
    $("#client-detail").addClass("disabled");
    $("#run-operation-business-action").addClass("disabled");
    $("#run-business-action").addClass("disabled");
    $("#run-business-action").removeClass("active");
  });

  /* Ajusta tamanho dos elementos na tela */
  layoutConstruct();

  // Mostra Snack da Agenda
  showSnack("#snackbar-calendar");
  
  customScrollbar();
});

/* Previne que os elementos animem antes da página estar totalmente carregada */
  $(window).load(function() {
    $("body").removeClass("preload");
  });

  $( window ).resize(function() {
    layoutConstruct();
    ajustResults();
    showMoreResults($(".table-results"));
  });

/* 
*		Fazer com que a sidebar e o conteúdo central ocupem 100% de altura, e diminuam de acordo com
*		o tamanho da janela. Feito dessa forma para compatibilidade com ie9+
*/
	function layoutConstruct(){

    $(".sidebar").each(function(){
      viewportHeight = $(window).height();
      contentregionHeight = $("#main-content-region").outerHeight();
      SideHeight =  $(this).outerHeight();

      minSideHeight = viewportHeight - ($("#header").outerHeight() + $("#section-header").outerHeight());
       if(minSideHeight > SideHeight){
        $(this).outerHeight(minSideHeight);
      }else if(contentregionHeight > SideHeight){
        $(this).outerHeight(contentregionHeight);
      }

    });
	}
/* /layout da estrutura */


/* Custom Scrollbar */
  function customScrollbar(){
    $(".custom-scrollbar").mCustomScrollbar({
      scrollInertia: 1,
      mouseWheel:{
        scrollAmount: 30,
        preventDefault: true
      }
    });
  }
/* Custom Scrollbar */

/* Snackbar */
  /* Botão para abrir snackbar
  * <button type="button" class="btn btn-primary" data-toggle="snackbar" data-get-content="snackbar-calendar">Snack!</button>
  */
  // $("[data-toggle='snackbar']").click(function(e){
  //   e.preventDefault();
  //   getSnack = $(this).attr("data-get-content");
  //   getSnack = $("#"+getSnack);
  //   showSnack(getSnack)
  // });
  function showSnack(selectedSnack){
    snackbarAutoCloseSecs = 5; // Tempo de fechamento automatico do snackbar em segundos

    selectedSnack = $(selectedSnack);
    getSnackRegion = $(".snackbar-region");

    if(!selectedSnack.hasClass("in") && !selectedSnack.hasClass("transitioning")){

      getSnackRegion.removeClass("hide");

      setTimeout( function(){
        selectedSnack.addClass("in");
        autoCloseSnack = setTimeout( function(){
          closeSnack(selectedSnack);
        },(snackbarAutoCloseSecs*1000));
        $(".close-snack").click(function(e){
          e.preventDefault();
          clearTimeout(autoCloseSnack);
          closeSnack(selectedSnack);
        });
      },100);
    }
  }
  function closeSnack(selectedSnack){
    selectedSnack.removeClass("in");
    selectedSnack.addClass("transitioning"); // similar to collapsing of BS
    setTimeout( function(){
      $(".snackbar-region").addClass("hide");
      selectedSnack.removeClass("transitioning");
    },700);
  }
/* Snackbar */


