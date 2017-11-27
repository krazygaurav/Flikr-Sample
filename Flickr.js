function jsonFlickrApi(rsp) {
    setUpImages(lastContentLoaded, rsp);
}
function setUpImages(tag, rsp){
  lastContentLoaded = "";
   var s = "";
   for (var i=0; i < rsp.photos.photo.length; i++) {
    photo = rsp.photos.photo[i];
    t_url = "http://farm" + photo.farm + ".static.flickr.com/" +
    photo.server + "/" + photo.id + "_" + photo.secret + "_" + "t.jpg";
    p_url = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
    s +=  "<div class='col-md-3'><a href='"+ p_url +"'>" + "'<img style = 'width:160px; height:120px;' alt='"+ photo.title +
    "' src= '" + t_url + "'/></a></div>";
  }
  $("."+tag).html(s);
}

function myFun(tags){
  var apiKey = "ca370d51a054836007519a00ff4ce59e";
  var src = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + apiKey +"&tags=" + tags + "&per_page=4&format=json&nojsoncallback=1";
  return src;
}
var lastContentLoaded = "";
var dataFromResponse = {};
$(document).ready(function(){
    var div_element = "<h4>Tag Name: html</h4><div class='row pic-row htmlCont' data-tag='html'></div><br>";
    $("#gallary").append(div_element);
    $.ajax(
        {
            url: myFun("html"),
            success: function(result){
                setUpImages("htmlCont", result);
            }
        });

    var div_element2 = "<h4>Tag Name: animal</h4><div class='row pic-row animalCont' data-tag='animal'></div><br>"
    $("#gallary").append(div_element2)
    $.ajax(
        {
            url: myFun("animal"),
            success: function(result){
                setUpImages("animalCont", result);
            }
        });
});
$(document).ready(function(){
    $("#inputTag").on("keyup", function(e){
        if(e.which == 13){
            insertTag();
        }
    });
    $("#addTag").on("click", function(){
        insertTag();
    });
});
function insertTag(){
    var tag = $("#inputTag").val();
    $("#inputTag").val("");
    if(tag == ""){
        alert("Enter a valid Tag");
    }else{
        var class_name = tag+"Cont";
        var div_element = "<h4>Tag Name: "+tag+"</h4><div class='row pic-row "+class_name+"' data-tag='"+tag+"'></div><br>";
        $("#gallary").append(div_element);
        $.ajax(
            {
                url: myFun(tag),
                success: function(result){
                    setUpImages(class_name, result);
                }
            });
    }
}
