(function() {
  var button = document.getElementById('subscribe_button'),
    form = document.getElementById('subscribe_form'),
    notify = document.getElementById('subscribe_notify');

  var checkIfValid = function(email) {
    var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    if(re.test(email)) {
      return true;
    } else {
      notify.innerHTML = 'This is not a valid email!';
      notify.style.color = 'red';
      return false;
    }
  }

  button.addEventListener('click', function(e) {
    var email = form.value;
    notify.innerHTML = '...loading.';
    notify.style.color = 'black';

    if(checkIfValid(email)) {
      var req = new XMLHttpRequest();

      req.onload = function (e) {
        var xhr = e.target;
        var response;
        if (xhr.responseType === 'json') {
          response = xhr.response;
        } else {
          response = JSON.parse(xhr.responseText);
        }
        notify.innerHTML = response.message;
        notify.style.color = 'green';
      };

      req.open('POST', 'http://localhost:3000/subscribe?email=' + email);
      req.responseType = 'json';
      req.send();
    }
  });
})();
