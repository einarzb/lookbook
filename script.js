
var source = $('#ebook-template').html();
var template = Handlebars.compile(source);



//the func takes an object as an argument 
var fetch = function () {
  $.ajax({ //ajax method to make asynchronous requests easy
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:0439023521',
    dataType: "json",

    success: function(data) { //callback function that runs when request succeeds
      //console.log(data);
      //accessing properties of the object

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

        //tests     
        //alert(book[0].title); check to see that my new object works! 
        //console.log("book title is " + title + " written by " + author + "     that's the description: " + "  " + description);
    },//end of previewBook function

    //callback function that runs when request fails 
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }    
  }); 
};

