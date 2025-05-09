window.addEventListener('load', function () {
    document.getElementById('login').addEventListener('submit', async (e) => {
        e.preventDefault();

        //obtener parametros de la URL
        function getURLParams() {
            const params = new URLSearchParams(window.location.search);
            return {
                mac: params.get('mac'),
                linkLoginOnly: params.get('link-login-only'),
            }
        }

        const username = document.getElementById('username').value;
        const name = document.getElementById('name').value;
        //grab mac-address
        const params = new URLSearchParams(window.location.search);

        const { mac, linkLoginOnly } = getURLParams();

        console.log("Username:", username);
        console.log("MAC:", mac);
        console.log("link-login-only:", linkLoginOnly);

        if (!mac || !linkLoginOnly) {
            console.error("Missing mac or link-login-only in URL");
            return;
        }
        //const mac = params.get('mac');
        const password = mac;

        try {
            //Mandar solicitud a la API de login
            const response = await fetch('/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, username, password })
            });

            const data = await response.json();
            console.log("Response:", data);
            if (data.success && linkLoginOnly) {
                document.getElementById('msg').innerText = "Acceso concedido. Redirigiendo...";
                //redirect to mikrotik to autorize user
                window.location.href = `${linkLoginOnly}?username=${username}&password=${password}`;

            } else {
                document.getElementById('msg').innerText = "Acceso denegado";
            }
        } catch (error) {
            console.error("Error al llamar al backend:", error);
            document.getElementById('msg').innerText = "Error: " + error.message;

        }
    });
});