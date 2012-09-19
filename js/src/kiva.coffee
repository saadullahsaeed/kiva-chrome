req = null
currentPage = 0

loanHTML= (loan)->
	div = document.createElement 'div'
	div.innerHTML = """
				<img src="http://www.kiva.org/img/w200h200/#{loan.image.id}.jpg"/>
				<p>
					<a href="http://www.kiva.org/lend/#{loan.id}" target="_blank">#{loan.name}</a> <br/>
					<span>#{loan.location.country} | #{loan.sector}</span> <br/> <br/>
					#{loan.use}
				</p>
	"""
	div.className = 'pin'
	div

showLoans= ->
	list = document.getElementById 'columns'
	
	resp = JSON.parse req.responseText
	list.appendChild loanHTML(loan) for loan in resp.loans
	yes

requestAPI= (page)->
	req = new XMLHttpRequest()
	req.open 'GET', "http://api.kivaws.org/v1/loans/newest.json?page=#{page}", yes
	req.onload = showLoans
	req.send null

showMore= ->
	currentPage += 1
	requestAPI currentPage


#Start 
showMore()
document.getElementById('a_show_more').addEventListener('click', showMore, false)