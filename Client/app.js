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
                let divModal = `<div class="modal fade" id="edit-movie-${index + 1}" tabindex="-1" role="dialog" aria-labelledby="editMovie" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="edit-movie-${index + 1}">Edit Movie</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form>
                                                    <div class="form-group">
                                                        <label for="movie-title" class="col-form-label">Movie Title</label>
                                                        <input type="text" class="form-control" id="edit-movie-title-${index + 1}">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="movie-genre" class="col-form-label">Movie Genre</label>
                                                        <input type="text" class="form-control" id="edit-movie-genre-${index + 1}">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="movie-director" class="col-form-label">Movie Director</label>
                                                        <input type="text" class="form-control" id="edit-movie-director-${index + 1}">
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button onclick="EditMovie(${movie.movieId})" type="button" data-dismiss="modal" class="btn btn-primary" id="edit_movie_${index + 1}">Update Movie</button>
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
                        `<button id="btn-edit-movie-${index + 1}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#edit-movie-${index + 1}">Edit</button>`
                    ).append(
                        `<button id="btn-delete-movie-${index + 1}"type="button" class="btn btn-primary">Delete</button>`
                    )
                );
                $(".modals").append($(divModal));
                $(`#edit-movie-title-${index + 1}`).val(movie.title);
                $(`#edit-movie-genre-${index + 1}`).val(movie.genre);
                $(`#edit-movie-director-${index + 1}`).val(movie.director);
            });
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
    const movie = {
        MovieId: movieId,
        Title: $(`#edit-movie-title-${movieId}`).val(),
        Genre: $(`#edit-movie-genre-${movieId}`).val(),
        Director: $(`#edit-movie-director-${movieId}`).val()
    };

    $.ajax({
        url: uri + "/" + movieId,
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(movie),
        success: function(result) {

            GetData();
        }
    });
}


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