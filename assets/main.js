

if(window.location.pathname == '/register.html'){
    const registration_form = document.querySelector('.register')
    const txtfullname = document.querySelector('#full-name')
    const txtemail = document.querySelector('#email')
    const txtpassword = document.querySelector('#password') 
    const txtpassword2 = document.querySelector('#password2') 
    // const txtpassword = document.querySelector('.txtpassword')
    // CONSTR PROFILE


    let profileurl = ''
    const regError = document.querySelector('.regError')

    // txtprofile.addEventListener('change', (event)=>{
        
    //     const target = event.target
    //     const files = target.files
    //     if(files){
    //         const formData = new FormData()
    //         formData.append("file", files[0])
    //         formData.append("upload_preset", "jituconstructions")
    //         formData.append("cloud_name", "dtn9kzx2v")

    //         fetch('https://api.cloudinary.com/v1_1/dtn9kzx2v/image/upload', {
    //             method: "POST",
    //             body: formData
    //         }).then((res) => res.json()).then(res => profileurl = res.url)
    //     }
    // })

    registration_form.addEventListener('submit', (e)=>{
        e.preventDefault();

        console.log(txtpassword.value, txtpassword2.value );
        

        if(txtpassword.value !== txtpassword2.value){
            // regError.innerHTML = "Your Password does not match"
            console.log('pwd don match')
            return
        }

        console.log(profileurl);
        let user = txtfullname.value !== '' && txtemail.value !== '' && txtpassword.value !== '' 

        if(user){
            const promise = new Promise ((resolve , reject)=>{
                fetch('http://localhost:4500/users/register',{
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    method: "POST",
                    body:JSON.stringify({
                        "full_name": txtfullname.value,
                        "email": txtemail.value,
                        "password": txtpassword.value
                    })
                }).then(res=>(res.json())).then(data=>{
                    console.log(data);
                    // regError.innerHTML = data[0]?.message ?? data?.message
                    resolve(data)
                }).catch(error =>{
                    console.log(error);
                    reject(error)
                })
            })
        }
    })
}


// HANDLE LOGIN LOGIN

if(window.location.pathname == '/login.html'){ 
    const login_form = document.querySelector('.form')
    const txtloginemail = document.querySelector('#email')
    const txtloginpwd = document.querySelector('#password')

    // const loginMsgs = document.querySelector('.loginErrors')
    let token = ''

    
    login_form.addEventListener('submit', (e)=>{
        e.preventDefault()
        

        const user = txtloginemail.value !== '' && txtloginpwd.value !== ''

        if(user){
            const promise = new Promise((resolve, reject)=>{
                fetch('http://localhost:4500/users/login', {
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    method: "POST",
                    body:JSON.stringify({
                        "email": txtloginemail.value,
                        "password": txtloginpwd.value
                    })
                }).then(res => (res.json())).then(data=>{
                    // loginMsgs.innerHTML = data?.message 
                    token = data?.token

                       
                    localStorage.setItem('token', token)

                    setTimeout(() => {
                        // loginMsgs.innerHTML = ''
                    }, 3000);
                })
            })

            if(localStorage.getItem('token')){
                // console.log("inside fetch");
                fetch('http://localhost:4500/users/check', {
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        "token": localStorage.getItem('token')
                    },
                    method: "GET"
                }).then(res => (res.json())).then(data=>{
                    // loginMsgs.innerHTML = data?.message 
                    // token = data?.token

                     // Get user role from the response
                    const userRole = data?.info?.role;

                    // console.log(userRole);

                    // Redirect based on user role
                    if (userRole === 'user') {
                        window.location.href = '/userpage.html'; // Redirect for regular users
                    } else if (userRole === 'admin') {
                        window.location.href = '/adminpage.html'; // Redirect for admin users
                    }


                       
                    // localStorage.setItem('token', token)

                    setTimeout(() => {
                        // loginMsgs.innerHTML = ''
                    }, 3000);
                })
            }
        }
    })
}


// HANDLE LOGIN LOGIN
// if(window.location.pathname == '/adminpage.html'){

// }

if(window.location.pathname == '/admin-assign.html'){

    // Send GET request and render projects
    async function renderProjects() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('http://localhost:4500/projects', {
            method: 'GET',
            headers: {
                'token': token
            }
        });

        if (response.ok) {
            
            let selectuser = document.querySelector('#select-users');
            const projects = await response.json();
            // console.log(`projects are: ${projects}`);
            console.log(projects);
            const projectsArray = projects.projects;
            // console.log('km m m  kl  ');

            projectsArray.map(project => {
                const option = document.createElement('option');
                option.value = `${project.id}`;
                option.text = `${project.title}`;
                console.log(project.title);
                
                selectuser.appendChild(option);
              });

              

              if (localStorage.getItem('token')) {
                fetch('http://localhost:4500/users/allusers', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        "token": localStorage.getItem('token')
                    },
                    method: "GET"
                })
                .then(res => res.json())
                .then(data => {
                    const usersListContainer = document.querySelector('.users-list');
                    
                    // Loop through the user data and generate HTML for each user
                    data.users.forEach(user => {
                        const userDiv = document.createElement('div');
                        userDiv.className = 'user';
                        
                        const userNameSpan = document.createElement('span');
                        userNameSpan.textContent = user.full_name;
                        
                        userDiv.appendChild(userNameSpan);
                        
                        // Check if the user is assigned to a project
                        if (user.assignedProject) {
                            const assignedSpan = document.createElement('span');
                            assignedSpan.textContent = 'Assigned';
                            userDiv.appendChild(assignedSpan);
                        } else {
                            const checkbox = document.createElement('input');
                            checkbox.type = 'checkbox';
                            checkbox.name = 'assignUser';
                            checkbox.value = user.id; // Store the user's ID as the checkbox value
                            checkbox.dataset.userId = user.id; // Store the user's ID as a data attribute
                            
                            const label = document.createElement('label');
                            label.textContent = 'Not Assigned';
                            
                            userDiv.appendChild(checkbox);
                            userDiv.appendChild(label);
                        }
                        
                        usersListContainer.appendChild(userDiv);
                    });
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
            }



    //         assignButton.addEventListener('click', async () => {
    //     // Get the selected user ID and project ID
    //     let selectedUserId = ''; // Get the selected user's ID from the rendered user elements
    //     let selectedProjectId = selectUser.value; // Get the selected project's ID from the dropdown
        
    //     // Construct the payload for assignment
    //     const assignmentPayload = {
    //         user_id: selectedUserId,
    //         project_id: selectedProjectId
    //     };
        
    //     try {
    //         const response = await fetch('http://localhost:4500/users/assign', {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(assignmentPayload)
    //         });
            
    //         if (response.ok) {
    //             console.log('Project assigned successfully.');
    //             // You can perform additional actions here after successful assignment
    //         } else {
    //             console.error('Project assignment failed.');
    //             // Handle error cases here
    //         }
    //     } catch (error) {
    //         console.error('An error occurred:', error);
    //         // Handle errors related to the fetch request
    //     }
    // });
            

            

            
          
        } else {
            console.error('Failed to fetch projects');
            // Handle error scenario here
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
        // Handle error scenario here
    }
}




    
      
    renderProjects()
}


// handle render projects in admin dashboard
if(window.location.pathname == '/adminpage.html'){
    
// Assuming you have a <div> element with the id "content" to hold the project data
const contentDiv = document.querySelector('.content-data')
console.log("inside admin dashboard");

// Send GET request and render projects
async function renderProjects() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('http://localhost:4500/projects', {
            method: 'GET',
            headers: {
                'token': token
            }
        });

        if (response.ok) {
            let selectuser = document.querySelector('#select-users');
            const projects = await response.json();
            // console.log(`projects are: ${projects}`);
            console.log(projects);
            const projectsArray = projects.projects;
            renderProjectsToDOM(projectsArray); // Call function to render projects

            
          
        } else {
            console.error('Failed to fetch projects');
            // Handle error scenario here
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
        // Handle error scenario here
    }
}

// Render projects to the DOM
function renderProjectsToDOM(projects) {
    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        const projectTitle = document.createElement('h4');
        projectTitle.textContent = project.title;

        const projectDescription = document.createElement('p');
        projectDescription.textContent = `Project description: ${project.description}`;

        const projectStatus = document.createElement('span');
        projectStatus.textContent = `Status: ${project.status}`;

        const projectStartDate = document.createElement('span');
        projectStartDate.textContent = `Start Date: ${project.startdate}`;

        const projectEndDate = document.createElement('span');
        projectEndDate.textContent = `End Date: ${project.enddate}`;

        const projBtnDiv = document.createElement('div');
        projBtnDiv.classList.add('proj-btn');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';

        const editButton = document.createElement('button');
        editButton.textContent = 'edit';

        // Append elements to the projectDiv
        projBtnDiv.appendChild(deleteButton);
        projBtnDiv.appendChild(editButton);

        projectDiv.appendChild(projectTitle);
        projectDiv.appendChild(projectDescription);
        projectDiv.appendChild(projectStatus);
        projectDiv.appendChild(projectStartDate);
        projectDiv.appendChild(projectEndDate);
        projectDiv.appendChild(projBtnDiv);

        // Append the projectDiv to the contentDiv
        contentDiv.appendChild(projectDiv);
    });
}

// Call the function to render projects when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
});


}


if (window.location.pathname == '/userpage.html') {
    const contentDataDiv = document.querySelector('.content-data');
    const projectTitle  = document.querySelector('#project-title')
    const description  = document.querySelector('#proj-desc')
    const startDate  = document.querySelector('#startdate')
    const endDate  = document.querySelector('#enddate')
    const status  = document.querySelector('.status')
    let token = localStorage.getItem('token'); // Declare the token variable here

    // Function to render project details
    async function renderProjectDetails(userId, token) {
        try {
            console.log('inside renderProjectDetails');
            const response = await fetch(`http://localhost:4500/projects/${userId}`, {
                method: 'GET',
                headers: {
                    'token': token
                }
            });

            console.log("inside renderprojectdetails");

            if (response.ok) {
                const projectResponse = await response.json();
                    const project = projectResponse.project[0]; // Access the project object within the array
                    console.log(project);
                    renderProjectToDOM(project);
            } else {
                console.error('Failed to fetch project details');
                // Handle error scenario here
            }
        } catch (error) {
            // console.error('Error fetching project details:', error);
            // Handle error scenario here
        }
    }

    // Check for token and fetch user data
    if (token) {
        fetch('http://localhost:4500/users/check', {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                "token": token
            },
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            const userId = data?.info?.id; // Extract user ID from the response
            console.log(userId);

            // Call renderProjectDetails with user ID and token
            renderProjectDetails(userId, token);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }

    

    // Render project details to the DOM
    function renderProjectToDOM(project) {
        console.log("bsbsbsbbsbsbsbbsbbs");
        console.log(project.enddate);
        
        // console.log(project);


        
        projectTitle.textContent = project.title;
        description.textContent = project.description;
        // console.log(project.enddate);

        project.enddate =  project.enddate.slice(0, 10);
        project.startdate =  project.startdate.slice(0, 10);

        startDate.textContent = project.startdate;
        endDate.textContent = `End Date: ${project.enddate}`;
        
        if(project.completionStatus!== null){
            status.textContent = `Status: completed`;
        }else{
            status.textContent = `Status: running`;
        }
        }

    // Call the function to render project details when the page loads
    
}


// Get the "Complete" button element
const completeButton = document.getElementById('completeButton');

// Add an event listener to the "Complete" button
completeButton.addEventListener('click', async () => {
    let token = localStorage.getItem('token')

    if (token) {
        fetch('http://localhost:4500/users/check', {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                "token": token
            },
            method: "GET"
        })
        .then(res => res.json())
        .then(async data => {
            const userId = data?.info?.id; // Extract user ID from the response
            console.log(userId);

            // Call renderProjectDetails with user ID and token
            // renderProjectDetails(userId, token);

            const response = await fetch(`http://localhost:4500/projects/${userId}`, {
                method: 'GET',
                headers: {
                    'token': token
                }
            });

            console.log("inside renderprojectdetails");

            if (response.ok) {
                const projectResponse = await response.json();
                    const project = projectResponse.project[0]; // Access the project object within the array
                    console.log(project);
                    // renderProjectToDOM(project);
                    // Replace these values with the actual project_id and user_id
    
                    const project_id = project.id;
                    const user_id = userId;

                    // Send POST request to complete the project
                    completeProject(project_id, user_id);
            } else {
                console.error('Failed to fetch project details');
                // Handle error scenario here
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }

    

    
            
    
});

// Function to send the POST request
async function completeProject(project_id, user_id) {
    try {

        const status  = document.querySelector('.status')
        
        const response = await fetch('http://localhost:4500/users/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "project_id": project_id,
                "user_id": user_id
            })
        });

        if (response.ok) {
            const result = await response.json();

            console.log(result.message); // Log the response message
            status.textContent = `Status: completed`;
        } else {
            console.error('Failed to complete project');
            // Handle error scenario here
        }
    } catch (error) {
        console.error('Error completing project:', error);
        // Handle error scenario here
    }
}


