$(document).ready(function() {
  $('#inputbar').on({
    keydown: function(e) {
      if(e.keyCode === 13) {
        var value = $('#inputbar').val();
      if(value === "moodle") {
        window.location.assign('../Step2/Step2.html');
      } else if(value === "ual moodle") {
        window.location.href = '../Step2/Step2.html';
      } else if(value === "csm moodle") {
        window.location.href = '../Step2/Step2.html';
      } else if(value === "university of arts moodle") {
        window.location.href = '../Step2/Step2.html';
      } else if(value === "university of the arts moodle") {
        window.location.href = '../Step2/Step2.html';
      } else if(value === "central saint martins moodle") {
        window.location.href = '../Step2/Step2.html';
      } else if(value === "university of the arts london moodle") {
          window.location.href = '../Step2/Step2.html';
      } else {
        window.location.href = '../error1/error1.html';
      }
      }
    }
  });
  
  $('#search').click(function() {
    var value = $('#inputbar').val();
    if(value === "moodle") {
      window.location.assign('../Step2/Step2.html');
    } else if(value === "ual moodle") {
      window.location.href = '../Step2/Step2.html';
    } else if(value === "csm moodle") {
      window.location.href = '../Step2/Step2.html';
    } else if(value === "university of arts moodle") {
      window.location.href = '../Step2/Step2.html';
    } else if(value === "university of the arts moodle") {
      window.location.href = '../Step2/Step2.html';
    } else if(value === "central saint martins moodle") {
      window.location.href = '../Step2/Step2.html';
    } else if(value === "university of the arts london moodle") {
        window.location.href = '../Step2/Step2.html';
    } else {
      window.location.href = '../error1/error1.html';
    }
  });

});
