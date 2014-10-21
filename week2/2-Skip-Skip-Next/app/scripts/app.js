/* global require, console, alert */

require.config({
  paths: {
    "jquery": "../bower_components/jquery/dist/jquery",
    "handlebars": "../bower_components/handlebars/handlebars",
    "bootstrap": "../bower_components/bootstrap/dist/js/bootstrap"
  },
  shim: {
    "handlebars": {
      exports: "Handlebars"
    },
    "bootstrap": {
        "deps": ["jquery"]
    }
  }
});


require(["jquery", "handlebars", "bootstrap"], function($, Handlebars) {
  "use strict";

  function reloadUI(data) {
    var
      templateString = $("#table-template").html(),
      compiledTemplate = Handlebars.compile(templateString),
      html = compiledTemplate({
        data: data
      });

      $("body").html(html);
  }

  function fetchKeywords(data, cb) {
    $.ajax({
      type: "GET",
      url: "http://localhost:8000/keywords",
      data: data
    })
    .done(function(keywords) {
      cb(keywords);
    })
    .fail(function(error) {
      console.log(error);
    });
  }

  ["#next","#prev"].forEach(function(buttonId) {
    $(document).on("click", buttonId, function() {
        fetchKeywords({
          fromPosition: parseInt($("table tr").last().find("td").first().html(), 10),
          direction: $(this).attr("id")
        }, reloadUI);
    });
  });

  reloadUI();
});
