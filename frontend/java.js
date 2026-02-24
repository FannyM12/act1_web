 const form = document.getElementById("login");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const pass = document.getElementById("pass").value;
        const message = document.getElementById("message");

        // validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            message.textContent = "Correo no valido";
            return;
        }
        //validar password
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;

        if (!passwordRegex.test(pass)) {        
            message.textContent = "La contraseña debe tener mayuscula, numero y simbolo";  
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/base", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, pass })
            });

            const data = await response.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            message.textContent = "token creado exitosamente";

            setTimeout(() => {
                window.location.href = "Token.html";
            }, 1000);
        } else {
            message.textContent = "Los datos que ingreso son incorrectos";
        }

     } catch (error) {
        message.textContent = "Error al conectar con el servidor";
        }
    });
