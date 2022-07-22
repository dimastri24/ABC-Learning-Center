/* validate form using Jquery Validation plugin */
$(function () {
  var regisForm = $("#form");

  /* custom validation */
  $.validator.addMethod("customEmail", function (value, element) {
    return this.optional(element) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  }, "Please enter valid email address!");
  $.validator.addMethod("customPhone", function (value, element) {
    return this.optional(element) || /^^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/.test(value);
  }, "Please enter valid phone number!");
    $.validator.addMethod("strong", function(value){
    return /^(?=.{10,})[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
       && /[a-z]/.test(value) // has a lowercase letter
       && /\d/.test(value) // has a digit
  }, "Weak, please add atleast one LowerCase, digit or special character")

  /* validator */
  if (regisForm.length) {
    regisForm.validate({
      rules: {
        fname: {
          required: true,
          normalizer: function(value) {
				  return $.trim(value);
			    }
        },
        lname: {
          required: true,
          normalizer: function(value) {
				  return $.trim(value);
			    }
        },
        gender: {
          required: true
        },
        birthday: {
          required: true
        },
        country: {
          required: true
        },
        city: {
          required: true
        },
        address: {
          required: true
        },
        phone: {
          required: true,
          customPhone: true
        },
        occupation: {
          required: true
        },
        inter: {
          required: true
        },
        email: {
          required: true,
          customEmail: true
        },
        pw1: {
          required: true,
          minlength: 6,
          maxlength: 25,
          strong: true,
          normalizer: function(value) {
				  return $.trim(value);
			    }
        },
        pw2: {
          required: true,
          equalTo: '#password1'
        },
        term: {
          required: true
        }
      },
      messages: {
        fname: {
          required: 'First name is empty'
        },
        lname: {
          required: 'Last name is empty'
        },
        gender: {
          required: 'Please select the gender'
        },
        birthday: {
          required: 'Please input the birthday'
        },
        country: {
          required: 'Country is empty'
        },
        city: {
          required: 'City is empty'
        },
        address: {
          required: 'Address is empty'
        },
        phone: {
          required: 'Phone number is required'
        },
        occupation: {
          required: 'Please select the occupation'
        },
        inter: {
          required: 'Please select at least one that you interested'
        },
        email: {
          required: 'Email is required'
        },
        pw1: {
          required: 'Password is required'
        },
        pw2: {
          required: 'Confirm password is required',
          equalTo: 'Please enter the same password'
        },
        term: {
          required: 'Must agree to the terms and condition!'
        }
      },
      errorPlacement: function (error, element) {
        if (element.is(":radio")) {
          error.appendTo(element.parents('.gen'));
        }
        else if (element.is(":checkbox")) {
          error.appendTo(element.parents('.inter'));
          error.appendTo(element.parents('.agreement'));
        }
        else {
          error.insertAfter(element);
        }
      },
      submitHandler: function (form) {
        $.ajax({
          url: form.action,
          type: 'POST',
          data: $(form).serializeArray(),
          
          success: function () {

            // sending data into local storage
            const name = document.forms.regDetails.fname.value;
            const lastname = document.forms.regDetails.lname.value;
            const gender = document.forms.regDetails.gender.value;
            const birthday = document.forms.regDetails.birthday.value;
            const country = document.forms.regDetails.country.value;
            const city = document.forms.regDetails.city.value;
            const address = document.forms.regDetails.address.value;
            const phone = document.forms.regDetails.phone.value;
            const occupation = document.forms.regDetails.occupation.value;
            const interested = document.forms.regDetails.inter.value;
            const email = document.forms.regDetails.email.value;
            const pw1 = document.forms.regDetails.pw1.value;
            const pw2 = document.forms.regDetails.pw2.value;
            const detail = JSON.stringify([name, lastname, gender, birthday, country, city, address, phone, occupation, interested, email, pw1, pw2]);
            localStorage.setItem(name, detail);

            // call page thank you feedback after successfully submit
            $('#respons').load("thanks.html");
          }
        });
      }
    })
  }

})

/* ADMINISTRATOR CRUD SCRIPTING */

// create new person
function addPerson() {
	var firstname = document.forms.personDetails.fname.value;
	var lastname = document.forms.personDetails.lname.value;
	var gender = document.forms.personDetails.gender.value;
	var birthday = document.forms.personDetails.birthday.value;
	var country = document.forms.personDetails.country.value;
	var city = document.forms.personDetails.city.value;
  var address = document.forms.personDetails.address.value;
	var phone = document.forms.personDetails.phone.value;
	var occupation = document.forms.personDetails.occupation.value;
  var interested = document.forms.personDetails.inter.value;
	var email = document.forms.personDetails.email.value;
	var pw1 = document.forms.personDetails.pw1.value;
	var pw2 = document.forms.personDetails.pw2.value;
  
  const em = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const ph = /^^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;

  const emCorrect = em.test(email);
  const phCorrect = ph.test(phone);

  if (firstname=="" || lastname=="" || gender =="" || birthday=="" || country=="" || city=="" || address=="" || 
      phone=="" || occupation=="" || interested=="" || email=="" || pw1=="" || pw2=="") {
    alert('field is empty');
  } 
  else if (pw1.length <=6 && pw1.length >=25) {
    alert('password between 6-25 character');
  }
  else if (phCorrect == false) {
    alert('phone number is invalid');
  }
  else if (emCorrect == false) {
    alert('email is invalid');
  }
  else if (pw2 != pw1) {
    alert('password does not match')
  }
  else {
    const detail = JSON.stringify([firstname, lastname, gender, birthday, country, city, address, phone, occupation, interested, email, pw1, pw2]);
    localStorage.setItem(firstname, detail);
    showdata();
  }
}

// update person data
function editPerson() {
	var firstname = document.forms.personDetails.fname.value;
	let data = JSON.parse(localStorage.getItem(firstname));
	document.forms.personDetails.fname.value = data[0];
	document.forms.personDetails.lname.value = data[1];
	document.forms.personDetails.gender.value = data[2];
	document.forms.personDetails.birthday.value = data[3];
	document.forms.personDetails.country.value = data[4];
	document.forms.personDetails.city.value = data[5];
	document.forms.personDetails.address.value = data[6];
	document.forms.personDetails.phone.value = data[7];
	document.forms.personDetails.occupation.value = data[8];
  document.forms.personDetails.inter.value = data[9];
	document.forms.personDetails.email.value = data[10];
	document.forms.personDetails.pw1.value = data[11];
	document.forms.personDetails.pw2.value = data[12];
}

// delete person data
function deletePerson() {
	var firstname = document.forms.personDetails.fname.value;
	localStorage.removeItem(firstname);
	showdata();
	document.forms.personDetails.fname.value = null;
	document.forms.personDetails.lname.value = null;
	document.forms.personDetails.gender.value = null;
	document.forms.personDetails.birthday.value = null;
	document.forms.personDetails.country.value = null;
	document.forms.personDetails.city.value = null;
  document.forms.personDetails.address.value = null;
	document.forms.personDetails.phone.value = null;
	document.forms.personDetails.occupation.value = null;
  document.forms.personDetails.inter.value = null;
	document.forms.personDetails.email.value = null;
	document.forms.personDetails.pw1.value = null;
	document.forms.personDetails.pw2.value = null;
}

// delete all data 
function clearAll() {
	localStorage.clear();
	showdata();
	document.forms.personDetails.fname.value = null;
	document.forms.personDetails.lname.value = null;
	document.forms.personDetails.gender.value = null;
	document.forms.personDetails.birthday.value = null;
	document.forms.personDetails.country.value = null;
	document.forms.personDetails.city.value = null;
  document.forms.personDetails.address.value = null;
	document.forms.personDetails.phone.value = null;
	document.forms.personDetails.occupation.value = null;
  document.forms.personDetails.inter.value = null;
	document.forms.personDetails.email.value = null;
	document.forms.personDetails.pw1.value = null;
	document.forms.personDetails.pw2.value = null;
}

// read all data
function showdata() {
  var key =  "";
  var dataTable = "<tr><th>First Name</th><th>Last Name</th><th>Gender</th><th>Birthday</th><th>Country</th><th>City</th>\
  <th>Address</th><th>Phone Num</th><th>Occupation</th><th>Interested</th><th>Email</th><th>Passsword</th><th>Confirm pw</th></tr>\n";
  var i = 0;

  if (localStorage.length == 0) {
		dataTable += "<tr><td><i>empty</i></td><td><i>empty</i></td><td><i>empty</i></td><td><i>empty</i></td><td><i>empty</i></td>\
    <td><i>empty</i></td><td><i>empty</i></td><td><i>empty</i></td><td><i>empty</i></td><td><i>empty</i></td><td><i>empty</i></td>\
    <td><i>empty</i></td><td><i>empty</i></td></tr>\n";
    
	} else {
    for (i = 0; i < localStorage.length; i++) {

			key = localStorage.key(i);
			let data = JSON.parse(localStorage.getItem(key));

			dataTable += "<tr><td>" + key + "</td>\n<td>" + data[1] + "</td>\n<td>" + data[2] + "</td>\n<td>" + data[3] + "</td>\n<td>" + 
      data[4] + "</td>\n<td>" + data[5] + "</td>\n<td>" + data[6] + "</td>\n<td>" + data[7] + "</td>\n<td>" + data[8] + "</td>\n<td>" + 
      data[9] + "</td>\n<td>" + data[10] + "</td>\n<td>" + data[11] + "</td>\n<td>" + data[12] + "</td></tr>\n";

		}
  }

  document.getElementById('list').innerHTML = dataTable;
}