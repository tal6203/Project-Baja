
function setDetails() {
  $("#first_name").value
  details.firstName = $("#first_name").val();
  details.lastName = $("#last_name").val();
  details.address = $("#address").val();
  details.check_18_old = $("#check_18_old").prop('checked');
  details.gender = $("[name = gender]")[0].checked ? "male" : "female";
  details.profile_pic = $("#my_img_profile").attr("src");

}

function isFormVali() {
  return details.firstName.length > 0 &&
    details.lastName.length > 0 &&
    details.address.length > 0
}

function createUserInfoCard() {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card", "mb-4", "user-details");
  cardContainer.style.maxWidth = "400px";

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  cardHeader.innerText = "User Information";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "text-center");

  const profileImage = document.createElement("img");
  profileImage.classList.add("img-account-profile", "rounded-circle", "mb-2");
  profileImage.src = details.profile_pic;
  profileImage.alt = "User Profile";
  cardBody.appendChild(profileImage);

  const userInfoList = document.createElement("ul");
  userInfoList.classList.add("list-group", "list-group-flush");

  const keys = Object.keys(details);
  keys.forEach(key => {
    if (key !== "profile_pic") {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.innerHTML = `<strong>${formatKey(key)}:</strong> ${details[key]}`;
      userInfoList.appendChild(listItem);
    }
  });

  cardBody.appendChild(userInfoList);

  cardContainer.appendChild(cardHeader);
  cardContainer.appendChild(cardBody);

  return cardContainer;
}

function appendCardToContainer(card) {
  const container = document.getElementById("card-container");
  const cards = document.querySelectorAll(".user-details");
  if (cards.length % 3 === 0) {
    // Create a new row for every third card
    const row = document.createElement("div");
    row.classList.add("row", "justify-content-center");
    row.style.marginLeft="60px"
    container.appendChild(row);
  }

  const currentRow = container.lastChild;
  const col = document.createElement("div");
  col.classList.add("col-md-4"); // Adjust the column width based on your preference
  col.appendChild(card);
  currentRow.appendChild(col);
}



function sendForm(event) {
  event.preventDefault();
  try {
    setDetails();
    if (isFormVali()) {
      const card = createUserInfoCard();
      appendCardToContainer(card);
    } else {
      var err = new Error("Make sure all fields are complete");
      throw err;
    }
  } catch (error) {
    swal({
      icon: "error",
      title: "Oops...",
      text: error.message
    });
  }
}


function formatKey(key) {
  return key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function setRandomfield(name) {
  document.getElementById(name).value = random_data[name][Math.floor(Math.random() * random_data[name].length)];
}




function set_random_users() {
  setRandomfield("first_name");
  setRandomfield("last_name");
  setRandomfield("address");
  document.getElementById("check_18_old").checked = random_data.check_18_old[Math.floor(Math.random() * 5)];
  document.getElementsByName("gender")[Math.floor(Math.random() * 2)].checked = true;
  document.getElementById("my_img_profile").setAttribute("src", `${random_data.profile_pic[Math.floor(Math.random() * 5)]}`);
}


document.getElementById("f_random").addEventListener("click", () => {
  fetch("https://randomuser.me/api/")
    .then(res => res.json())
    .then(data => {
      let user = data.results[0];
      print_details(user);
    })
});



document.getElementById("j_random").addEventListener("click", () => {
  $.ajax({
    url: "https://randomuser.me/api/",
    type: "GET",
    data: "data",
    dataType: "json",
    success: function (res) {
      let user = res.results[0];
      print_details(user);
    }
  })
});



document.getElementById("x_random").addEventListener("click", () => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      let user = JSON.parse(xhr.responseText).results[0];
      print_details(user);
    }
  };
  xhr.open(`GET`, `https://randomuser.me/api/`, true);
  xhr.send(null);
});




function print_details(user) {
  document.getElementById("first_name").value = user.name.first;
  document.getElementById("last_name").value = user.name.last;
  if (user.dob.age >= 18) {
    document.getElementById("check_18_old").checked = true;
  }
  document.getElementById("address").value = `${user.location.country} ,${user.location.city} ,${user.location.street.name}`;
  document.getElementsByName("gender")[user.gender == "male" ? 0 : 1].checked = true;
  document.getElementById("my_img_profile").setAttribute("src", `${user.picture.large}`);
}


document.getElementById("rest").addEventListener("click", () => {
  document.querySelectorAll(".user-details").forEach(card => card.remove());
  document.getElementById("my_img_profile").setAttribute("src", "http://bootdey.com/img/Content/avatar/avatar1.png");
});
