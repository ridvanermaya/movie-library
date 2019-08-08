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
                let tr = `<tr></tr>`;
                let td = `<td style="line-height: 40px; vertical-align: middle;"></td>`;
                let divModal = `<div class="modal fade" id="edit-movie-${movie.movieId}" tabindex="-1" role="dialog" aria-labelledby="editMovie" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="edit-movie-${movie.movieId}">Edit Movie</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form>
                                                    <div class="form-group">
                                                        <label for="movie-title" class="col-form-label">Movie Title</label>
                                                        <input type="text" class="form-control" id="edit-movie-title-${movie.movieId}">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="movie-genre" class="col-form-label">Movie Genre</label>
                                                        <input type="text" class="form-control" id="edit-movie-genre-${movie.movieId}">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="movie-director" class="col-form-label">Movie Director</label>
                                                        <input type="text" class="form-control" id="edit-movie-director-${movie.movieId}">
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
                        $(td).append(`<button id="btn-edit-movie-${movie.movieId}" type="button" class="btn btn-secondary table-btn" data-toggle="modal" data-target="#edit-movie-${movie.movieId}">Edit</button>`)
                        .append(`<button onclick="DeleteMovie(${movie.movieId})" id="btn-delete-movie-${movie.movieId}"type="button" class="btn btn-danger table-btn">Delete</button>`)
                    )
                );
                $(".modals").append($(divModal));
                $(`#edit-movie-title-${movie.movieId}`).val(movie.title);
                $(`#edit-movie-genre-${movie.movieId}`).val(movie.genre);
                $(`#edit-movie-director-${movie.movieId}`).val(movie.director);
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

    if(movie.Title === "" || movie.Genre === "" || movie.Director === "") {
        Swal.fire(
            'Empty Fields?',
            'You need to input "Movie Title", "Movie Genre", and "Movie Director".',
            'question'
          )
    } else {
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
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Movie is updated!',
                showConfirmButton: false,
                timer: 1500
            })
            GetData();
        }
    });
}

function DeleteMovie(movieId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
            $.ajax({
                url: uri + "/" + movieId,
                type: "DELETE",
                success: function() {
                    GetData();
                }
            });
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}