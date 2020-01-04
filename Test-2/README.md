Include this javascript script tag in the page
<script src="./assets/script.js"></script>

call the "craigslistSearch" functions passing a search query object as its argument, e.g.

craigslistSearch({
  query: "tickets",
  is_paid: no",
  ...
})

then the "processResult" would generate the API response.

This can be achieved by one of the following three ways. Unfortunately craiglist website makes none work:

1. Use AJAX to fetch the result HTML page, but CORS issue prevents this from happening

2. Use JSONP to fetch the json for the HTML page, the page could be fetched but the response is not a valid json

3. Use a hidden iFrame to fetch the HTML page from craiglist site, but its server response sets the header "X-Frame-Options" to "sameorigin"