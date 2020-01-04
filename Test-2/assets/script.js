
/*
 * @param {object} searchQuery hash object, e.g. { query: "tickets", is_paid: "all"}
 */
var craigslistSearch = function (searchQuery) {

  var queryString = Object.keys(searchQuery)
    .reduce(function (acc, cur) {
      return acc.concat(cur + "=" + encodeURIComponent(searchQuery[cur]));
    }, [])
    .join("&"),
    jsonp = document.getElementById("jsonp"),
    script = document.createElement("script"),
    head = document.getElementsByTagName("head")[0];

  script.src = "https://toronto.craigslist.ca/search/ggg?" + (queryString !== "" ? queryString + "&callback=processResult" : "callback=processResult");
  script.id = "jsonp";

  if (jsonp) {
    head.replaceChild(script, jsonp);
  } else {
    head.appendChild(script);
  }

},
  /*
   * @param {JSON} jsonp key value pair with the value as an html string
   */
  processResult = function (jsonp) {

    var APIS = [],
      HTML = new DOMParser().parseFromString(jsonp.page, "text/html"),
      lists = HTML.querySelector("#sortable-results").querySelectorAll("li.result-row") || [];

    lists
      .forEach(function (li) {
        var image = li.querySelector("a.result-image"),
          title = li.querySelector("a.result-title"),
          time = li.querySelector("time.result-date"),
          location = li.querySelector(".result-meta .result-hood");
        APIS = APIS.concat({
          image: image && image.getAttribute("href") || "",
          title: title && title.textContent || "",
          time: time && time.getAttribute("datetime") || "",
          location: (location && location.textContent || "").trim()
        })
      });

    return APIS;

  };