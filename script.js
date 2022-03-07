//1. fetch 20 random user on page load
//2. filter user by gender
//3. filter user by name

const apiUrl = "https://randomuser.me/api/?";
const listElm = document.querySelector("#user-list");
const courterElm = document.querySelector("#user-count");
let usrArgs = [];

const displayUsers = users => {
	let str = "";

	users.map(user => {
		str += `
    <div class="col-md-6 col-lg-3 py-2">
      <div class="card fs-5 user-card ">
						<img src="${user.picture.large}" class="card-img-top" alt="..." />
					<h4 class="text-center mt-3">
          ${user.name.title} ${user.name.first} ${user.name.last}
          </h4>
            <div class="card-body">
             

						<div >
            <span><i class="fa-solid fa-mobile-button"></i></span>  ${user.cell}
            </div>


						<div >
            <span><i class="fa-solid fa-envelope"></i></span>  ${user.email}
            </div>
						 

						<div >
            <span><i class="fa-solid fa-location-dot"></i></span>  ${user.location.city}, ${user.location.country}
            </div>
						 
						</div>
					</div>
        </div>
  `;
	});

	listElm.innerHTML = str;
	courterElm.innerText = users.length;
};

const fetchUser = (params = "results=20") => {
	//fetch form api
	fetch(apiUrl + params)
		.then(response => response.json())
		.then(data => {
			usrArgs = data.results;

			displayUsers(usrArgs);
		})
		.catch(error => console.log(error));
};

fetchUser();

// for dorp down menu change
const handleOnChange = e => {
	const params = `results=20&gender=${e.value}`;
	fetchUser(params);
};

const handleOnSearch = e => {
	const str = e.value.toLowerCase();
	const filteredArgs = usrArgs.filter(item => {
		const userFullName = (item.name.first + " " + item.name.last).toLowerCase();
		if (userFullName.includes(str)) {
			return item;
		}
	});

	displayUsers(filteredArgs);
	// console.log(filteredArgs);
};
