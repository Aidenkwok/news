$(document).ready(function(){
  $("#selectedHeadlinesDiv").hide();

  var aiden=[
    // {
    // title:"hello",
    // urlToImage:"http://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/2/14/0/FNK_breakfast-burrito_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382542427230.jpeg",
    // url:"http://aidenkwok.co.uk"
    // }
  ];

  var sources =[
  "the-guardian-uk",
  "bbc-news",
  "cnn",
  "the-new-york-times",
  "independent",
  "daily-mail",
  "al-jazeera-english",
  "Time",
  "Metro",
  "the-huffington-post",
  "the-telegraph"
  ];

  // var combinedSources =[];
  var combinedHeadlines =[];
  var getCount=0;
  var randomOrderHeadlines = true;
  var selectedHeadlineArray = [];

  function start(){
    for (var i = 0; i < 5; i++) {
      var url = "https://newsapi.org/v1/articles?source=" + sources[i] + "&sortBy=top&apiKey=35df8ec585274f9ab1494a30075b7688";
      $.get(url, function (data){
          for (var x = 0; x < data.articles.length; x++){
          combinedHeadlines.push(data.articles[x]);
        }
      });
    }
  }

  function getNews(){
    if (randomOrderHeadlines){
      combinedHeadlines = combinedHeadlines.concat(aiden);
      console.log(combinedHeadlines);
      combinedHeadlines.sort(function() { return 0.5 - Math.random(); });
      randomOrderHeadlines = false;
    }
    $("#headline").text(combinedHeadlines[getCount].title);
    $("#imgUrl").attr("src",combinedHeadlines[getCount].urlToImage);
    getCount ++;
    if (getCount === combinedHeadlines.length){
      // do something here
      console.log("end");
    }
    if(selectedHeadlineArray.length > 0){
      $("#showResults").removeClass("disabled");
    }
  }

  $('#get').click(function(){
    getNews();
  });

  $("#read").click(function(){
    selectedHeadlineArray.push(combinedHeadlines[(getCount-1)].title);
    $("#selectedHeadlines").append(
      '<a target="_blank" href=' + combinedHeadlines[(getCount-1)].url +
      '>' + combinedHeadlines[(getCount-1)].title + '</a>'
    );
    getNews();
  });

  $('#showResults').click(function(){
    if(selectedHeadlineArray.length === 0){
      return false;
    }else{
      $("#selectedHeadlinesDiv").fadeIn();
    }
  });

  $('#back').click(function(){
    $("#selectedHeadlinesDiv").fadeOut();
    getNews();
  });

  $('#intro').click(function(){
    getNews();
    $("#intro").fadeOut();
  });

  start();
  if(selectedHeadlineArray.length === 0){
    $("#showResults").addClass("disabled");
  }

});
