
var courseApi = 'http://localhost:3000/course';

function start() {
    // getCourses(function(courses){
    //     renderCourses(courses);
    // });

    getCourses(renderCourses);
    handleCreateCourse();
}

start();

// Functions
function getCourses(callback){
    fetch(courseApi)
    .then(function(response){
        return response.json();
    })
    .then(callback);
}

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
        body: JSON.stringify(data)
    };
    fetch(courseApi, options)
    .then(function(response){
        return response.json();
    })
    .then(callback);
}

function renderCourses(courses) {
    var listCourseBlock = document.querySelector('#list-course');
    var htmls = courses.map(function(course){
        return `
        <li class = "course_item_${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick= "handleDeleteCourse(${course.id})">Xóa</button>
            <button onclick= "handleUpdateCourse(${course.id})">Sửa</button>
        </li>
        `;
    });

    listCourseBlock.innerHTML = htmls.join('');

}

function handleCreateCourse(){
    var createBtn = document.querySelector('#createBtn');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formData = {
            name: name,
            description: description
        }
        createCourse(formData);
    }
}

function handleDeleteCourse(id){
    var options = {
        method: 'DELETE',
        headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
    };
    fetch(courseApi+'/'+id, options)
    .then(function(response){
        return response.json();
    })
    .then(function(){
        var courseItem = document.querySelector('.course_item_' + id);
        if(courseItem){
            courseItem.remove();
        }
    });
}

function handleUpdateCourse(id){
    var courseItemId = '.course_item_' + id;
    var iscourseItem = document.querySelector(courseItemId);
    if(iscourseItem){
        var nameData = document.querySelector(courseItemId + '>h4').innerHTML;
        console.log(nameData);
        var descriptionData = document.querySelector(courseItemId + '>p').innerHTML;
        var course = document.querySelector('input[name="name"]');
        course.value = nameData;
        var description = document.querySelector('input[name="description"]');
        description.value = descriptionData;
        var createBtn = document.querySelector('#createBtn');
        var updateBtn = document.querySelector('#updateBtn');
        createBtn.style.display = "none";
        updateBtn.style.display = "block";
        updateBtn.onclick = function(){
                var nameUpdate = document.querySelector('input[name="name"]').value;
                var descriptionUpdate = document.querySelector('input[name="description"]').value;
                var formData = {
                    name: nameUpdate,
                    description: descriptionUpdate
                }
                
                var options = {
                    method: 'PUT',
                    headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(formData)
                };
                fetch(courseApi+'/'+id, options)
                .then(function(response){
                    return response.json();
                })
                .then(function(){
                    getCourses(renderCourses);
                });
            }
        }
    }
    


