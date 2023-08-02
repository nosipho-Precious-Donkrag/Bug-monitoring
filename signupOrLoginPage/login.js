
//global variables
var AllAccounts = new Array();
user = new Object();
var AccountExist;

/*parse everything in the local storage into the array 
because every time the code restarts the array is emptied*/
AllAccounts = JSON.parse((localStorage.getItem("AllUsers")))


//check if browser supports local storage
if(window.localStorage){

    //Add even listener to hide or show the signup page or login page
    document.getElementById('SignupButton').addEventListener("click", (e)=>{
        //console.log(document.querySelector('#form'))
        e.preventDefault()
        document.querySelector('form').classList.add("hide-form")
        //console.log( document.getElementById('SignupButton'))
        document.querySelector('#form2').classList.remove("hide-form")
        creatAccount()        
    })

     //Add Event listener to the login Button
     document.getElementById('loginButton').addEventListener("click",
     (e)=>{
        e.preventDefault()
        let email = document.getElementById('email4Login').value;
        let password = document.getElementById('password4Login').value;
        
        loginFunction(email, password)
     })
    
}
else
{
    console.log("Local storage is unsupported by the browser");
}

//login Funtion
function loginFunction(email, password)
{
    
    //first check if account exists or not
    for( var i = 0; i < AllAccounts.length; i++)
    {
        console.log(AllAccounts[i])
        //var passwordInStorage = JSON.stringify(AllAccounts[i].Password);
       /* console.log(AllAccounts[i].Email+" " + email);
        console.log(email.localeCompare(AllAccounts[i].Email));
        console.log(AllAccounts[i].Password+" " + password);
        console.log(password.localeCompare(AllAccounts[i].Password));*/
       // console.log(password +" " + passwordInStorage)
       
    }
    if(!AccountExist){
        
        document.querySelector('#nonexistingAcc').classList.remove('hide-form')
        //console.log("account does not exist")
    }

    //check for correct username and password
    else
    {
        for( var i = 0; i < AllAccounts.length; i++)
        {
            if(AllAccounts[i].Email == email && AllAccounts[i].Password == password){
                //route
                console.log("route now")
            }
            else{
                console.log("username or password incorrect")
                document.querySelector('#nonexistingAcc').classList.remove('IncorrectInfo')
            }
        }


    }
}


//creat an account if there is not an existing one
function creatAccount(){
    
    document.getElementById('form2Submit').addEventListener("click",
    (e)=>{
     
        e.preventDefault()

        //might have to reset class lists

        let username = document.getElementById('username').value;
        
        //check if the user name is available
        for( var i =0; i < AllAccounts.length; i++){
            if(AllAccounts[i].Username == username){
                document.querySelector('#existingUserName').classList.remove('hide-form')
                
                creatAccount()
            }
        }

        let email = document.getElementById('newEmail').value;

        //check if email is available
        for( var i =0; i < AllAccounts.length; i++){
            if(AllAccounts[i].Email == email){
                document.querySelector('#existingEmail').classList.remove('hide-form')
                
                creatAccount()
            }
        }

        let password1 = document.getElementById('password1').value;
        let password2 = document.getElementById('password2').value;
       

        //Check if passwords match
        if(password1 != password2){
                document.querySelector('#non-matching-passwords').classList.remove('hide-form')
                document.querySelector('#password1').classList.add('red')
                document.querySelector('#password2').classList.add('red')
                creatAccount()
            
                //onsole.log("no match")
            
        }
        else{
                document.querySelector('#non-matching-passwords').classList.add('hide-form')
                document.querySelector('#password1').classList.remove('red')
                document.querySelector('#password2').classList.remove('red')
                
                //send values to the local storage
                localSotrageFunction(username, email, password1)
                console.log("account successfully created-now route")
                
        }

    })
    
}

function localSotrageFunction(username, email, password){
    user = {
        Username: username,
        Email: email,
        Password: password1
    }
    //push object into the array AllAccounts
    AllAccounts.push(user);

    //cast Array as a JSON String to store in local storage
    localStorage.setItem("AllUsers", JSON.stringify(AllAccounts))

    //print out all current users
    AllAccounts = JSON.parse((localStorage.getItem("AllUsers")))
  
}




