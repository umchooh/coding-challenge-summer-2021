/*
This is my first attempt:
1 - check the data type and its content.
2 - Set AJAX request
3 - Try to retrieve basic data (through string then parse to Object) and debug if connection is success
4 - Design the the employee profile on HTML and CSS, then move to JS
5 - Use a function to render the data in HTML form
6 - Reading the original data content, decide to add if condition for "isFeatured" or "haspicture"

Future attempts:
1 - Try to fix redundant code
2 - Try using fetch() method to achieve the same goal as first attempt
 */

"use strict"

const getEmployees = new XMLHttpRequest();

getEmployees.open("GET", "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php", true);
getEmployees.send();

getEmployees.onreadystatechange = function (event) {
    if (getEmployees.readyState === 4) {
        if (getEmployees.status === 200) {
            var contentData = getEmployees.responseText;
            //console.log("ContentData: " + contentData);

            var object = JSON.parse(contentData);

            var htmlContent = "";
            //console.log(htmlContent);
            Object.keys(object).forEach(function (key) {
                var employee = object[key];
                //console.log("Employee: " + JSON.stringify(employee));
                htmlContent += createEmployeeElement(employee);
            });
            htmlContent += "</div>"
            document.getElementById("teamContent").innerHTML = htmlContent;
        } else if (getEmployees.status === 400) {
            alert('There was an error 400');
        } else {
            alert('something else other than 200 was returned: ' + JSON.stringify(getEmployees));
        }
    }
}

function createEmployeeElement(employee) {
    if (employee.employeeisfeatured == "1") {
        var element = "<div class=\"box\">" + "<div class=\"box-item\">" +
            "<div class=\"featureIcon\">&#128081;</div>";
        if (employee.employeehaspic == "1") {
            element += "<div class=\"img-container\"><image src=\"http://sandbox.bittsdevelopment.com/code1/employeepics/" + employee.employeeid + ".jpg\"></image></div>";
        } else {
            element += "<div class=\"img-container\"><image src=\"\"> There is no picture</image></div>";
        }
        element += "<p class=\"fullName\">" + employee.employeefname + " " + employee.employeelname + "</p>" +
            "<p class=\"employeeBio\">" + employee.employeebio + "</p>";
        for (var i = 0; i < employee.roles.length; i++) {
            element += "<div id=\"roles\" style=\"background-color:" + employee.roles[i].rolecolor + ";\"><p class=\"roleDetails\">" + employee.roles[i].rolename + "</p></div>"
        }
        element += "</div>";
    } else {
        element = "<div class=\"box\">" + "<div class=\"box-item\">" +
            "<div class=\"featureIcon\"></div>";
        if (employee.employeehaspic == "1") {
            element += "<div class=\"img-container\"><image src=\"http://sandbox.bittsdevelopment.com/code1/employeepics/" + employee.employeeid + ".jpg\"></image></div>";
        } else {
            element += "<div class=\"img-container\"><image src=\"\"> There is no picture</image></div>";
        }
        element += "<p class=\"fullName\">" + employee.employeefname + " " + employee.employeelname + "</p>" +
            "<p class=\"employeeBio\">" + employee.employeebio + "</p>";
        for (var i = 0; i < employee.roles.length; i++) {
            element += "<div id=\"roles\" style=\"background-color:" + employee.roles[i].rolecolor + ";\"><p class=\"roleDetails\">" + employee.roles[i].rolename + "</p></div>"
        }
        element += "</div>";
    }

    return element;

}
