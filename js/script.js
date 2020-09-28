$(document).ready(function() {
  $.ajax(
    {
      "url": "http://157.230.17.132:3002/todos",
      "method": "GET",
      "success": function (data) {
        render(data);
      },
      "error": function (richiesta, stato, errori) {
        console.log(errori);
      }
    }
  );
});

function render(data) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  var context = {
    "data" : data
  }
  var html = template(context);
  $("#lista").append(html);
}
