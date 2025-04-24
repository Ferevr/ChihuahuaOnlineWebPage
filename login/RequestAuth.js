window.addEventListener('load', function() {
    document.getElementById('login').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        //obtener parametros de la URL
        function getURLParams(){
            const params = new URLSearchParams(window.location.search);
            return {
                mac: params.get('mac'),
                linkLoginOnly: params.get('link-login-only'),
            }
        }

        const username = document.getElementById('username').value;
        //grab mac-address
        const params = new URLSearchParams(window.location.search);
        
        const { mac, linkLoginOnly} = getURLParams();
        //const mac = params.get('mac');
        const password = mac;
       
        //Mandar solicitud a la API de login
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.success && linkLoginOnly) {
            document.getElementById('msg').innerText = "Acceso concedido. Redirigiendo...";
            //redirect to mikrotik to autorize user
            window.location.href = `${linkLoginOnly}?username=${username}&password=${password}`;

        } else {
            document.getElementById('msg').innerText = "Acceso denegado";
        }
    });
});