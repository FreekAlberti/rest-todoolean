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

// chiamata ajax per eliminare elemento selezionato dal server
function deleteAjax(id) {
  $.ajax(
    {
      "url": "http://157.230.17.132:3002/todos/" + id,
      "method": "DELETE",
      "success": function (data) {

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
    var id = $("#lista").children(this).attr("data-id");
    deleteAjax(id);
    $(this).parent().remove();
  });
}

// aggiunge nuovo elemento alla lista
function newElement() {
  $(".button").click(function() {
    var val = $(".add-element").val();
    console.log(val);
    // if (val != "") {
    postAjax(val);
    $(".add-element").val("");
    // }

  });
}

// chiamata ajax per generare nuovo elemento nel server
function postAjax(val) {
  $.ajax(
    {
      "url": "http://157.230.17.132:3002/todos",
      "method": "POST",
      "data" : {
        "text": val
      },
      "success": function (data) {
        console.log(data);
      },
      "error": function (richiesta, stato, errori) {
        console.log(errori);
      }
    }
  );
}
