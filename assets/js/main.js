// https://github.com/typicode/json-server#routes Here you can find information on how to sort, order or search the API resource 
var employeesAPI = 'http://rest.vedinas.ro/employees';

function deserializeResponse(response) {
    // .json() does JSON.parse behind the scenes
    return response.json();
}

function createEmployeeElement(employee) {
    // console.log(employee);

    // <li class="employee">
    //   <div class="name">John Snow</div>
    //   <p><span>Age: 27</span> <span>Salary: 27</span></p>
    //   <button class="remove">X</button>
    // </li>
    // 
    // var employeeElementTemplate = `
    //   <div class="name">${employee_name}</div>
    //   <p><span>Age: ${employee.employee_age}</span> <span>Salary: ${employee.salary}</span></p>
    //   <button class="remove">X</button>
    // `

    var employeeElement = document.createElement('li');
    employeeElement.dataset.id = employee.id;
    employeeElement.classList.add('employee');

    var employeeNameElement = document.createElement('div');
    employeeNameElement.classList.add('name');
    employeeNameElement.innerText = employee.name;

    var pElement = document.createElement('p');
    var pInnerHtml =
        '<span>Age: ' + employee.age + '</span> <span>Salary: ' + employee.salary + '</span>';

    var pInnerHtml2 = '';
    pInnerHtml2 += '<span>Age: ';
    pInnerHtml2 += employee.age;
    pInnerHtml2 += '</span> <span>Salary: ';
    pInnerHtml2 += employee.salary;
    pInnerHtml2 += '</span>';

    // template literals
    var pInnerHtml3 = `<span>Age: ${employee.age}</span> <span>Salary: ${employee.salary}</span>`;

    pElement.innerHTML = pInnerHtml3;


    var removeElement = document.createElement('button');
    removeElement.classList.add('remove');
    removeElement.innerText = 'X';

    employeeElement.appendChild(employeeNameElement);
    employeeElement.appendChild(pElement);
    employeeElement.appendChild(removeElement);

    return employeeElement;
}

function listEmployees(employees) {
    console.log(employees);
    var agendaElement = document.querySelector('.agenda');
    for (var i = 0; i < 5; i++) {
        var employeeElement = createEmployeeElement(employees[i]);
        agendaElement.appendChild(employeeElement);
    }
}

function getEmployees() {
    // We get employees from API
    fetch(employeesAPI)
        .then(deserializeResponse)
        .then(listEmployees);
}

function addEmployee(event) {

    event.preventDefault();
    console.log('employee added');
    // get name from input
    var inputNameElement = document.querySelector('#Name').value; // ('input[name="name"]')
    // get age from input
    var inputAgeElement = document.querySelector('#Age').value; // ('(input[name="age"])')
    // get salary from input
    var inputSalaryElement = document.querySelector('#Salary').value; // ('input[name="salary"]')
    // create employee object
    var employee = {
        name: inputNameElement,
        age: inputAgeElement,
        salary: inputSalaryElement,
    };

    console.log(employee.name);
    console.log(employee.age);
    console.log(employee.salary);

    var employeeElement = createEmployeeElement(employee);
    var agendaElement = document.querySelector('.agenda');
    agendaElement.appendChild(employeeElement);

    // POST employeeAPI employee
    fetch(employeesAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
        .then((response) => response.json())
        .then((jsonResp) => console.log(jsonResp))
}

function removeEmployee(event) {

    event.preventDefault();
    console.log('button clicked');
    // take event.target // remove button

    // get remove button parent .parent()
    var employeeElement = event.target.parentElement;
    console.log(employeeElement);
    // removeElement.parent();

    // var id =  dataset.id on parent
    var id = employeeElement.dataset.id;
    console.log(id);

    //remove parent .remove()
    employeeElement.remove();

    //DELETE `employeeAPI/${id}`
    // `employeeAPI/${id}`
    fetch(`employeeAPI/${id}`, {
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
        .then((response) => response.json())
        .then((jsonResp) => console.log(jsonResp))

    var employeeElement = createEmployeeElement(employee);
    var agendaElement = document.querySelector('.agenda');
    agendaElement.appendChild(employeeElement)
}

// when the page is finished loading this function is called
function onDOMLoad() {
    // we call getEmployee function
    // to easely get to the function hold ctrl an click on the function name
    getEmployees();

    var addEmployeeElement = document.querySelector('.add-employee');
    addEmployeeElement.addEventListener('click', addEmployee);

    var removeElement = document.createElement('button');
    removeElement.addEventListener('click', removeEmployee);
}

// DOMContentLoaded is triggered when DOM load is complete
// On page load fetch employees from API
document.addEventListener('DOMContentLoaded', onDOMLoad);

// "how then works behind the scenes"
/*
var cbs = [
  function one(data) {
    console.log('one', data);'
    return 'from one'
  },
  function two(data) {
    console.log('two', data);
    return 'from two'
  },
  function three(data) {
    console.log('three', data);
  },
];

var ourData = 'initial data';
for (var i = 0; i < cbs.length; i++) {
  var currentCB = cbs[i];
  ourData = currentCB(ourData);
}
*/