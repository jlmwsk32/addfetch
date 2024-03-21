document.addEventListener("DOMContentLoaded", function() {
    const fetchDataBtn = document.getElementById("fetchDataBtn");
    const userDataDiv = document.getElementById("userData");
    const loadingSpinnerDiv = document.getElementById("loadingSpinner");
    let isFetching = false;
  
    fetchDataBtn.addEventListener("click", fetchData);
  
    function fetchData() {
      if (!isFetching) {
        loadingSpinnerDiv.style.display = "block";
        userDataDiv.innerHTML = ""; // Limpiamos los datos mostrados previamente
        fetchDataBtn.disabled = true;
        isFetching = true;
  
        const lastRequestTime = localStorage.getItem("lastRequestTime");
        if (lastRequestTime && Date.now() - lastRequestTime < 60000) {
          const userData = JSON.parse(localStorage.getItem("userData"));
          renderUserData(userData);
          loadingSpinnerDiv.style.display = "none";
          fetchDataBtn.disabled = false;
          isFetching = false;
        } else {
          fetch("https://reqres.in/api/users?delay=3")
            .then(response => response.json())
            .then(data => {
              localStorage.setItem("userData", JSON.stringify(data.data));
              localStorage.setItem("lastRequestTime", Date.now());
              renderUserData(data.data);
              loadingSpinnerDiv.style.display = "none";
              fetchDataBtn.disabled = false;
              isFetching = false;
            })
            .catch(error => {
              console.error("Error fetching data:", error);
              loadingSpinnerDiv.style.display = "none";
              fetchDataBtn.disabled = false;
              isFetching = false;
            });
        }
      }
    }
  
    function renderUserData(userData) {
      let output = "<table class='table'>";
      output += "<thead><tr><th>ID</th><th>Email</th><th>Avatar</th></tr></thead><tbody>";
      userData.forEach(user => {
        output += `<tr><td>${user.id}</td><td>${user.email}</td><td><img src="${user.avatar}" class="avatar" alt="Avatar"></td></tr>`;
      });
      output += "</tbody></table>";
      userDataDiv.innerHTML = output;
    }
  });
  