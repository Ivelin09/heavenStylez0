import '../styles/register.css'
import { useRef } from 'react'

const Register = () => {
    const username = useRef()
    const password = useRef()

    async function HandleSubmit(event) {
        console.log('here');
        // token: JWT(username) -> hash -> hashed_username
        event.preventDefault();
        let response = await fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: username.current.value,
                pass: password.current.value,
                role: "user"
            }),
        })
        response = await response.json(); // checknah JWT Testing kudeto imam wokring jwt code 
        console.log(response.token)
        localStorage.setItem('auth_token', response.token);
        return false;
    }

    return (
        <div>
            <form onSubmit={(event) => { HandleSubmit(event); return event.preventDefault(); }}>
                <div className="card glass">
                    <div className="card-body">
                        <h2 className="card-title">Register Here!</h2>
                        <input ref={username} type="text" placeholder="username" className="input input-bordered w-full max-w-xs" />
                        <input ref={password} type="password" placeholder="password" className="input input-bordered w-full max-w-xs" />
                        <div className="card-actions justify-end">
                            <input type="submit" className="btn btn-primary" value="Submit"></input>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register;