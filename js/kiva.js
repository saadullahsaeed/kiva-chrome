var currentPage, loanHTML, req, requestAPI, showLoans, showMore;

req = null;

currentPage = 0;

loanHTML = function(loan) {
  var div;
  div = document.createElement('div');
  div.innerHTML = "<img src=\"http://www.kiva.org/img/w200h200/" + loan.image.id + ".jpg\"/>\n<p>\n	<a href=\"http://www.kiva.org/lend/" + loan.id + "\" target=\"_blank\">" + loan.name + "</a> <br/>\n	<span>" + loan.location.country + " | " + loan.sector + "</span> <br/> <br/>\n	" + loan.use + "\n</p>";
  div.className = 'pin';
  return div;
};

showLoans = function() {
  var list, loan, resp, _i, _len, _ref;
  list = document.getElementById('columns');
  resp = JSON.parse(req.responseText);
  _ref = resp.loans;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    loan = _ref[_i];
    list.appendChild(loanHTML(loan));
  }
  return true;
};

requestAPI = function(page) {
  req = new XMLHttpRequest();
  req.open('GET', "http://api.kivaws.org/v1/loans/newest.json?page=" + page, true);
  req.onload = showLoans;
  return req.send(null);
};

showMore = function() {
  currentPage += 1;
  return requestAPI(currentPage);
};

showMore();

document.getElementById('a_show_more').addEventListener('click', showMore, false);
