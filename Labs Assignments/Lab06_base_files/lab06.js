$(document).ready(function() {
  $(function (){
    $('th#tableRow').click(function() {
      $(this).siblings().toggleClass('selected');
    });
  });

  $(function (){
    $('td').click(function () {
      var $this = $(this);
      var $input = $('<input>', {
      value: $this.text(),
       type: 'text',
       blur: function() {
          $this.text(this.value);
       },
       keyup: function(e) {
          if (e.which === 13) $input.blur();
       }
   }).appendTo( $this.empty() ).focus();
      $(this).toggleClass('selected');
    });
  });

  $(function () {
    $('th#tableCol').click(function () {
      var col = $(this).index();
        $("td").filter(":nth-child(" + (col + 1) + ")").toggleClass('selected');
    });
  });
});
