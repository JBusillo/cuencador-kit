<script>
    import { config } from "$lib/client.config";
    import { browser } from "$app/env";

    let csrf = "";

    async function logonFacebook() {
        if (browser) {
            let url =
                `https://www.facebook.com/v10.0/dialog/oauth` +
                `?client_id=${config.facebook.appId}` +
                `&redirect_uri=${config.facebook.callback}` +
                // `&redirect_uri=http://localhost:3000/login/funnyRoute` +
                `&display=popup` +
                //                `&response_type=token` +
                `&response_type=token` +
                `&scope=email` +
                `&state={srv=${config.server}}`;

            window.open(
                url,
                "fblogon",
                "height=707,width=600,screenX=200,screenY=200"
            );

            window.addEventListener("message", facebookReturn, false);
        }
    }

    async function facebookReturn(e) {
        window.removeEventListener("message", facebookReturn);
        let params = new URLSearchParams(e.data.substring(1));
        let access_token = params.get("access_token"); // is the string "Jonathan"
        let resp = await fetch(`login/facebook?token=${access_token}`, {
            method: "GET",
        });
        resp = await resp.json();
    }

    function Cancel() {}
    //http://localhost:3000/ggcallback.html#state=%7Bsrv%3Dtestrest.cuencador.com%7D&access_token=ya29.a0AfH6SMAs8JjmgbqwO42XsdscYq3rektLoLuii64mRYFuseGbt2Ad1RktTZhvX_TXxMEGC8CFFUdum_3FkBx5Rvy7xYgRsL7U9MaRKL0HZB4MfhTuUK_prAEuQIcqet24ft5GHd0AtlcJVp3EW9Qh-Uuhvii8&token_type=Bearer&expires_in=3599&scope=email%20openid%20https://www.googleapis.com/auth/userinfo.email&authuser=0&prompt=none
    function logonGoogle() {
        if (browser) {
            var array = new Uint32Array(30);
            window.crypto.getRandomValues(array);
            for (const element of array) {
                csrf += element.toString(16);
            }

            let url =
                `https://accounts.google.com/o/oauth2/v2/auth` +
                `?client_id=${config.google.clientId}` +
                `&redirect_uri=${config.google.callback}` +
                `&display=popup` +
                `&response_type=id_token` +
                `&scope=openid profile email` +
                `&nonce=${csrf}` +
                `&state={${csrf}}`;

            window.open(
                url,
                "gglogon",
                "height=707,width=600,screenX=200,screenY=200"
            );

            window.addEventListener("message", googleReturn, false);
        }
    }

    //http://localhost:3000/ggcallback.html#state=%7Bsrv%3Dtestrest.cuencador.com%7D&access_token=ya29.a0AfH6SMAggvkFLwCH0bL4fuxJHO607zzeB8nWXQL_2TQALQTnh9atTyz0TwLX_Hhav69M8qfmhvq33ONtzbVxNDHLKnHqBbshDpCRMNiYCfa6iaX2F6Hw1dEM56MfluviIaNUW3FS8FqwzLXonLLcXimN-s95&token_type=Bearer&expires_in=3599&scope=email%20openid%20https://www.googleapis.com/auth/userinfo.email&authuser=0&prompt=none

    async function googleReturn(e) {
        window.removeEventListener("message", googleReturn);
        let params = new URLSearchParams(e.data.substring(1));

        let url = `login/google?id_token=${params.get("id_token")}`;
        let params1 = [["id_token", `'params.get("id_token")'`]];

        fetch(url, { method: "GET" })
            .then((response) => response.json())
            .then((data) => console.log(data));

        // let resp = await fetch(`login/facebook?token=${access_token}`, {
        //     method: "GET",
        // });
        // resp = await resp.json();
        // console.log(resp);
    }
</script>

<h1>Login</h1>
<p>SvelteKit is awesome!</p>
<a href="/">Go back home</a>

<div on:click={logonGoogle}>
    <svg
        width="40"
        height="40"
        viewBox="0 0 256 262"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
    >
        <path
            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            fill="#4285F4"
        /><path
            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            fill="#34A853"
        /><path
            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            fill="#FBBC05"
        /><path
            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            fill="#EB4335"
        />
    </svg>
</div>

<div on:click={logonFacebook}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="88.428 12.828 107.543 207.085"
        ><path
            d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"
            fill="#3c5a9a"
        /></svg
    >
</div>
