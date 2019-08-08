const uri = "https://localhost:5001/api/MovieLibrary";
let movies = null;

$(document).ready(function() {
    GetData();
});

function GetData() {
    $.ajax({
        type: "GET",
        url: uri,
        success: function(movies) {
            const tBody = $("#movies");

            $(tBody).empty();

            $.each(movies, function(index, movie) {
                let tr = "<tr></tr>";
                let td = "<td></td>";
                let divModal = `<div class="modal fade" id="edit-movie-${index}" tabindex="-1" role="dialog" aria-labelledby="editMovie" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="edit-movie-${index}">Edit Movie</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form>
                                                    <div class="form-group">
                                                        <label for="movie-title" class="col-form-label">Movie Title</label>
                                                        <input type="text" class="form-control" id="movie-title-${index}">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="movie-genre" class="col-form-label">Movie Genre</label>
                                                        <input type="text" class="form-control" id="movie-genre-${index}">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="movie-director" class="col-form-label">Movie Director</label>
                                                        <input type="text" class="form-control" id="movie-director-${index}">
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" id="edit_movie_${index}">Edit Movie</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
             
                $(tBody).append(
                    $(tr).append(
                        $(td).text(movie.title)
                    ).append(
                        $(td).text(movie.genre)
                    ).append(
                        $(td).text(movie.director)
                    ).append(
                        `<button id="btn-edit-movie-${index}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#edit-movie-${index}">Edit</button>`
                    ).append(
                        `<button id="btn-delete-movie-${index}"type="button" class="btn btn-primary">Delete</button>`
                    )
                );
                $(".modals").append($(divModal));
                $(`#movie-title-${index}`).val(movie.title);
                $(`#movie-genre-${index}`).val(movie.genre);
                $(`#movie-director-${index}`).val(movie.director);
            });
        }
    });
}

// function GetData() {
//     $.ajax({
//         type: "GET",
//         url: uri,
//         success: function(data) {
//             const tBody = $("#movies");

//             $(tBody).empty();
//             GetCount(data.length);

//             $.each(data, function(i, item) {
//                 let tr = "<tr>";
//                     tr += "<td>" + item.title + "</td>"
//                     + "<td>" + item.genre + "</td>"
//                     + `<td> ${item.director} </td>`
//                     + "<td>"
//                     + `<button id="edit_button_${i}">Edit</button>`
//                     + "</td>"
//                     + "<td>"
//                     + `<button id="delete_button_${i}">Delete</button>`
//                     + "</td>"
//                     + "</tr>";

//                 tBody.append(tr);
                
//                 $(`#edit_button_${i}`).on("click", function() {
//                     EditMovie(item.movieId);
//                 })
//                 $(`#delete_button_${i}`).on("click", function() {
//                     DeleteMovie(item.movieId);
//                 })
//             movies = data;
//             })
//         }
//     });
// }

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
        error: (error) => {
            console.log(error);
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

function EditMovie(movieId)
{
    $.each(movies, function(index, movie) {
        if (movie.movieId === movieId)
        {
            $()
        }
    })
}

// function EditMovie(id) {
//     $.each(movies, function(i, item) {
//         if (item.MovieId === id) {
//             $("#edit-movie-id").val(item.movieId);
//             $("#edit-title").val(item.title);
//             $("#edit-genre").val(item.genre);
//             $("#edit-director").val(item.director);
//         }
//     });
//     $("#spoiler").css({ display: "block"});
// }


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