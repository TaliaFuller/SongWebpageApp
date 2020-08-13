function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  var getAllRecords = function() {
    $.getJSON(
      "https://api.airtable.com/v0/appCkmft1t8OezpRL/My%20Favorite%20Songlist?api_key=keyax94arml6tDpFn",
      function(airtable) {
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var picture = record.fields["Images"];
          var songs = record.fields["Songs"];
          var artist = record.fields["Artists"];
          html.push(listView(id, picture, songs, artist));
        });
        $(".list-view").append(html);
      }
    );
  };

  var listView = function(id, picture, songs, artist) {
    return `
    <div class="col-md-3">
    <div class="card"> 
    ${picture ? `<img src="${picture[0].url}" class="card-img-top">` : ``}
    <div class="card-body">
      <h5 class="card-title">${songs} - ${artist}</h5>
      <p class="card-text">Click on the button below to check out more info about this artist.</p>
      <button type="button" class="btn btn-info"><a href="index.html?id=${id}">Click me</a></button>
    </div>
  </div>
  </div>
    `;
  };

  var getOneRecord = function(id) {
    $.getJSON(
      `https://api.airtable.com/v0/appCkmft1t8OezpRL/My%20Favorite%20Songlist/${id}?api_key=keyax94arml6tDpFn`,
      function(record) {
        var html = [];
        var vids = record.fields["Video"];
        var background = record.fields["Background Music"];
        var website = record.fields["Link"];
        var music = record.fields["Audio"];
        var descriptions = record.fields["Description"];
        var downloads = record.fields["Download"];
        var songs = record.fields["Songs"];
        var artist = record.fields["Artists"];
        html.push(
          detailView(
            vids,
            background,
            music,
            website, descriptions, downloads,  songs,artist,
          )
        );
        $(".detail-view").append(html);
      }
    );
  }; 

  var detailView = function(
    vids,
            background,
            music,
            website, descriptions, downloads, songs, artist,
  ) {
    return `
    <div class="main">
    <div class="card mb-3" style="width: 80rem;">
    <div class="row no-gutters">
      <div class="col-md-4">
      <iframe class="card-img" width="560" height="446" src="https://www.youtube.com/embed/${vids}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${songs} - ${artist}</h5>
          <p class="card-text">${descriptions} </p><br><br><br><br>
          <button type="button" class="btn btn-info"><a href="${website}" target="_blank">Artist Website</a></button>
          <button type="button" class="btn btn-info"><a href="${downloads}" target="_blank">Listen to music here</a></button>
        </div>
      </div>
    </div>
  </div> 
  </div>
  <div class="bottom">
  <button type="button" class="btn btn-warning"><a href="index.html">Back to home</a></button>
  </div>
    `;
  };

  
  var id = getParameterByName("id");
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}