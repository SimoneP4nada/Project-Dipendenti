<!DOCTYPE html>
<html lang="en">

    <head>
    </head>

    <body>
        <label>username<input type="text" id="username"></label>
        <label>password<input type="password" id="password"></label>
        <button type="button" onclick="tryLogin()">login</button>


        <h1> Lista Prodotti</h1>
            <ul id="prodotti">

            </ul>
            
            <script type="module">
                
                const response = await fetch("http://localhost:8080/EsercizioAPI/api");
                const jsonresponse  = await response.json();
                console.log(jsonresponse);
                jsonresponse.prodotti.forEach(product => { 
                    const elemento = document.createElement("li");
                    document.getElementById("prodotti").appendChild(elemento);
                    elemento.innerText = product;
                    
                });
                
               
             



            </script>

            <script>
                 async function tryLogin(){
                    const username = document.getElementById("username").value;
                    const password = document.getElementById("password").value;   
                    const requestObject = {"username":username, "password":password}
                    const loginResponse = await fetch("http://localhost:8080/EsercizioAPI/login", {
                        method:"POST", 
                        body:JSON.stringify(requestObject)
                    });

                    if(loginResponse ==401){
                        console.log("credenziali errate");
                    }else{
                        const responseObj = await loginResponse.json;
                        console.log(responseObj.firstName);
                        console.log(responseObj.lastName);
                    } 
                    
                    if (await loginResponse.json() == true){
                        console.log("nome utente e psw corretti");
                    }else{
                            console.log("nome utente e psw sbagliati");
                        }
                    
                }

            </script>
    </body>


</html>