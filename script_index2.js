let add_user = document.getElementById("add_user");
let remove_user = document.getElementById("remove_user");


add_user.addEventListener("click", () => {
    fetch("https://randomuser.me/api/")
        .then((res) => res.json())
        .then((data) => {
            try {
                if (document.getElementsByTagName("tr").length < 11) {
                    let user = data.results[0];
                    document.getElementById("my_table").innerHTML += `<tr>
                <td>${user.name.first}</td>
                <td>${user.name.last}</td>
                <td>${user.dob.age >= 18 ? "YES" : "NO"}</td>
                <td>${user.location.country}, ${user.location.city}, ${user.location.street.name}</td>
                <td>${user.gender}</td>
                <td><img src='${user.picture.thumbnail}' alt='your picture'></td>
                </tr>`;

                }
                else {
                    var err = new Error("Up to 10 lines");
                    throw err;
                }
            }
            catch (error) {
                swal({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
            }
        });
});



remove_user.addEventListener("click", () => {
    try {
        if (document.getElementsByTagName("tr").length < 2) {
            var err = new Error("No lines to delete");
            throw err;
        }
        else {
            document.getElementsByTagName("tr")[document.getElementsByTagName("tr").length - 1].remove();
        }
    }
    catch (error) {
        swal({
            icon: "error",
            title: "Oops...",
            text: error.message,
        })
    }
});