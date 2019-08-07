const uri = "api/MovieLibrary";
let movies = null;

function GetData() {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function(data) {
            const tBody = $("#movies");

            $(tBody).empty();
            GetCount(data.length);

            $.each(data, function(key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.Title))
                    .append($("<td></td>").text(item.Genre))
                    .append($("<td></td>").text(item.Director))
                    .append(
                        $("<td></td>").append(
                            $("<button>Edit</button>").on("click", function() {
                                EditItem(item.MovieId);
                            })
                        )
                    )
                    .append(
                        $("<td></td>").append(
                            $("<button>Delete</button>").on("click", function() {
                                DeleteItem(item.MovieId);
                            })
                        )
                    );
                    
                tr.appendTo(tBody);
            });

            movies = data;
        }
    });
}

function AddMovie() {
    const movie = {
        Title: $("#add-title").val(),
        Genre: $("#add-genre").val(),
        Director: $("#add-director").val()
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(movie),
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Something unexpected happened!");
        },
        success: function(result) {
            GetData();
            $("#add-title").val(""),
            $("#add-genre").val(""),
            $("#add-director").val("");
        }
    });
}

function GetCount(data) {
    const el = $("#counter");
    let name = "movie";
    if (data) {
        if (data > 1) {
            name = "movies";
        }
        el.text(data + " " + name);
    } else {
        el.text("No " + name);
    }
}
// const uri = "api/MovieLibrary";
// let movieLibrary = null;
// function getCount(data) {
//     const el = $('#counter');
//     let name = "movie";
//     if(data) {
//         if(data > 1){
//             name = "movies";
//         }
//         el.text(data + " " + name);
//     } else {
//         el.text("No " + name);
//     }
// }

// $(document).ready(function() {
//     getData();
// });

// function getData() {
//     $.ajax({
//         type: "GET",
//         url: uri,
//         cache: false,
//         success: function(data) {
//             const tBody = $('#movie-library');

//             $(tBody).empty();

//             getCount(data.Length);

//             $.each(data, function(key, item) {
//                 const tr = $("<tr></tr>")
//                     .append(
//                         $("<td></td>").append(
//                             $("<input/>", {
//                                 type: "text"
//                             })
//                         )
//                     )
//                     .append($("<td></td>").text(item.Title))
//                     .append(
//                         $("<td></td>").append(
//                             $("<button>Edit</button>").on("click", function() {
//                                 editItem(item.id);
//                             })
//                         )
//                     )
//                     .append(
//                         $("<td></td>").append(
//                             $("<button>Delete</button>").on("click", function() {
//                                 deleteItem(item.id);
//                             })
//                         )
//                     );

//                     tr.appendTo(tBody);
//             });

//             movieLibrary = data;
//         }
//     });
// }

// function addItem() {
//     const item = {
//         Title: $("#add-title").val(),
//         Genre: $("#add-genre").val(),
//         Director: $("#add-director").val()
//     };

//     $.ajax({
//         type: "POST",
//         accepts: "application/json",
//         url: uri,
//         contentType: "application/json",
//         data: JSON.stringify(item),
//         error: function(jqXHR, textStatus, errorThrown) {
//             alert("Something went wrong!");
//         },
//         success: function(result) {
//             getData();
//             $("#add-title").val(""),
//             $("#add-genre").val(""),
//             $("#add-director").val("");
//         }
//     });
// }

// function deleteItem(id) {
//     $.ajax({
//         url: uri + "/" + id,
//         type: "DELETE",
//         success: function(result) {
//             getData();
//         }
//     });
// }

// function editItem(id) {
//     $.each(movieLibrary, function(key, item) {
//         if (item.MovieId === id) {
//             $("#edit-movie-id").val(item.MovieId);
//             $("#edit-title").val(item.Title);
//             $("#edit-genre").val(item.Genre);
//             $("#edit-director").val(item.Director);
//         }
//     });
//     $("#spoiler").css({ display: "block"});
// }

// $(".my-form").on("submit", function() {
//     const item = {
//         Title = $("#edit-title").val(),
//         Genre = $("#edit-genre").val(),
//         Director = $("#edit-director").val()
//     };

//     $.ajax({
//         url: uri + "/" + $("edit-movie-id").val(),
//         type: "PUT",
//         accepts: "application/json",
//         data: JSON.stringify(item),
//         success: function(result) {
//             getData();
//         }
//     });

//     closeInput();
//     return false;
// });

// function closeInput() {
//     $("#spoiler").css({ display: "none" });
// }