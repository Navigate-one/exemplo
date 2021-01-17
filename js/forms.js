$( document ).ready(function() {


  /* selecpicker for Selects */
  $('select').selectpicker();


  /* DateTimePicker para formulários*/
    datepickerInit();

  /* Campo de Arquivo */
  $(":file").filestyle({buttonText: "Buscar"});

  /* Campos dependentes - Radios */
  $(".collapse-next").on("change",function(){
    radioShow = $(this).find("input:checked").data("collapseShow");
    radioShow = "#"+radioShow;

    $(this).siblings(".collapse-item").collapse("hide");
    $(radioShow).collapse("show");
    console.log($(this).siblings(".collapse-item"));
  });

  /* /Campos dependentes - Radios */

});

/*
*   Datepicker INIT
*   *So it can be placed on popovers
*/
function datepickerInit(){
  $('.datepicker').datetimepicker({
    format: 'DD/MM/YY',
    icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-arrow-up",
        down: "fa fa-arrow-down"
    }
  });
  $('.datetimepicker').datetimepicker({
    format: 'DD/MM/YY - HH:mm',
    icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-arrow-up",
        down: "fa fa-arrow-down"
    }
  });
}