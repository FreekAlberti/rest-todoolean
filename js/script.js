$(document).ready(function() {
  getAjax();
  deleteElement();
  newElementClick();
  newElementEnter();
  changeElement();
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
function deleteAjax(id,elm) {
  $.ajax(
    {
      "url": "http://157.230.17.132:3002/todos/" + id,
      "method": "DELETE",
      "success": function (data) {
        elm.remove();
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
    var elm = $(this).parent();
    var id = elm.attr("data-id");
    deleteAjax(id, elm);
  });
}

// aggiunge nuovo elemento alla lista con click bottone
function newElementClick() {
  $(".add").click(function() {
    var val = $(".add-element").val();
    if (val != "") {
      postAjax(val);
      $(".add-element").val("");
    }
  });
}

// aggiunge nuovo elemento alla lista con tasto enter
function newElementEnter() {
  $(document).keydown(function(e){
    if (e.keyCode == 13) {
      var val = $(".add-element").val();
      if (val != "") {
        postAjax(val);
      }
    }
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
        var newData = [];
        newData.push(data);
        render(newData);
        $(".add-element").val("");
      },
      "error": function (richiesta, stato, errori) {
        console.log(errori);
      }
    }
  );
}

//modifica elemento presente nella lista
function changeElement() {
  $("#lista").on("click", ".change", function() {
    var elm = $(this).parent();
    var elmVal = elm.children("input").val();
    var id = elm.attr("data-id");
    putAjax(id, elmVal);
  });
}

// chiamata ajax modifica elemento esistente
function putAjax(id, elmVal) {
  $.ajax(
    {
      "url": "http://157.230.17.132:3002/todos/" + id,
      "method": "PUT",
      "data" : {
        "text": elmVal
      },
      "success": function (data) {
        alert("Elemento aggiornato");
      },
      "error": function (richiesta, stato, errori) {
        console.log(errori);
      }
    }
  );
}
