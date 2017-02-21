//Change your code so that it takes the user's input and makes the 
//AJAX request based on that input.

//user-input script
/*e.g 
0345803485
1442486805
*/

var source = $('#ebook-template').html();
var template = Handlebars.compile(source);

//func takes user argument
 var searchIsbn = function () {
    var isbnNum = $(".search").val();
    $(".search").val("");//clear input field
    fetch(isbnNum); //invoke fetch function
  };


var fetch = function (isbnNum) {
  $.ajax({ //ajax method to make asynchronous requests easy
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbnNum,
    dataType: "json",

    success: function(data) { //callback function that runs when request succeeds

     var previewBook = function(){ //inner callback function
            var title = data.items[0].volumeInfo.title; //objectName.objectArray[index].property.innerProperty
            var author = data.items[0].volumeInfo.authors[0];
            var description = data.items[0].volumeInfo.description;
            var image = data.items[0].volumeInfo.imageLinks.thumbnail;
            
            var book = {
                 title: title,
                 description: description,
                 author: author,
                 image:image
            };

            var newHTML = template(book);

            $(".preview").empty();
            $(".preview").append(newHTML); 
            //$(".preview").empty().append(newHTML); 
          };

    previewBook(); //invoking function
    
    }, //end of success function

    //callback function that runs when request fails 
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }    
  }); //end of $ajax
}; //enf of fetch function

