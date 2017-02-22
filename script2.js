//Change your code so that it takes the user's input and makes the 
//AJAX request based on that input.

//user-input script
/*e.g isbn
0801838428
0345803485
1442486805
0857510606
*/

var source = $('#ebook-template').html();
var template = Handlebars.compile(source);

//func takes user argument
 var searchIsbn = function () {
    var url;
    //isisbn = (!isNaN(query) && (query.length == 10 || query.length==13));

    if ($(".search").val().length > 0){

      if (isNaN(parseInt($(".search").val()))) {
          console.log("non-parsing fix");
          var getTitle = $(".search").val();
          url = 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + getTitle;
          fetch(url);
      } else {
          console.log("this is a number?");
          var isbnNum = $(".search").val();
          url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbnNum;
          fetch(url);
      }
    } else { 
        alert("please fill in ISBN or title"); }

    $(".search").val("");//clear input field
};

// 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbnNum + '&q=intitle:' + getTitle

var fetch = function (url) {
  $.ajax({ //ajax method to make asynchronous requests easy
    method: "GET",
    url: url,
    dataType: "json",

    success: function(data) { //callback function that runs when request succeeds
      console.log(data);
     var previewBook = function(){ //inner callback function
          
            var title = data.items[0].volumeInfo.title; //objectName.objectArray[index].property.innerProperty
            var authors = data.items[0].volumeInfo.authors;
            var description = data.items[0].volumeInfo.description;
            var image = data.items[0].volumeInfo.imageLinks.thumbnail;
            var isbn = data.items[0].volumeInfo.industryIdentifiers[1].identifier;
            var rating = data.items[0].volumeInfo.averageRating;


            //users can search for books based on the title.
            // Display a list of the first 10 books the response returns, 


            // I wanna convert the rating numeric data onto my lovely html stars
            // for (var i = 0; i < 5; i++) {
            //   rating[i]
            // };
            // if (rating === 5) {
            //   rating = innerHTML("0857510606");
            // }else{alert("bkbkb");
            // };

            console.log(rating);
            var book = {
                 title: title,
                 description: description,
                 authors: authors,
                 image:image,
                 isbn:isbn,
                 rating: rating
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

