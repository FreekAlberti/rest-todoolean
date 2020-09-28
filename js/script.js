$(document).ready(function() {
  getAjax();
  deleteElement();
});

// FUNCTION

// chiamata ajax per ottenere data
function getAjax() {
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
}

// renderizza data nel dom con handlebars
function render(data) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  var context = {
    "data" : data
  }
  var html = template(context);
  $("#lista").append(html);
}

// elimina dalla lista elemento cliccato
function deleteElement() {
  $("#lista").on("click", ".delete", function() {
    $(this).parent().remove();
  });
}
