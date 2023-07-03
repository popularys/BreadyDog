import { useState, useContext } from "react";
import "./style.css"
import { Link } from "react-router-dom";
import { XCircle } from "react-bootstrap-icons";
import context from "../../context";
const Modal = ({ active, setActive }) => {
	const { setUser, setUserId, setDogToken } = useContext(context)
	const [auth, setAuth] = useState(true)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [testPass, setTestPass] = useState("")

	const testAccess = {
		color: password === testPass ? "forestgreen" : "crimson"
	}

	const swithAuth = (e) => {
		e.preventDefault()
		setAuth(!auth)
	}
	const clearForm = () => {
		setName("")
		setEmail("")
		setPassword("")
		setTestPass("")
	}
	const sendForm = async (e) => {
		e.preventDefault()
		let body = {
			email: email,
			password: password
		}
		if (!auth) {
			body.name = name;
			body.group = "group-12"
		}
		let log = "https://api.react-learning.ru/signin"
		let reg = "https://api.react-learning.ru/signup"

		let response = await fetch(auth ? log : reg, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
		let data = await response.json()
		if (!data.err) {
			if (!auth) {
				delete body.name
				delete body.group
				let resLog = await fetch(log, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body)
				})
				// регистрация
				let dataLog = resLog.json()
				if (!dataLog.err) {
					localStorage.setItem("dogUser", dataLog.data.name)
					localStorage.setItem("dogToken", dataLog.token)
					localStorage.setItem("dogUserId", dataLog.data._id)
					setUser(dataLog.data.name)
					setDogToken(dataLog.token)
					setUserId(dataLog.data._id)
					clearForm()
					setActive(false)
				}
			}
			else {
				// вход
				if (!data.err) {
					localStorage.setItem("dogUser", data.data.name)
					localStorage.setItem("dogUserId", data.data._id)
					localStorage.setItem("dogToken", data.token)
					setUser(data.data.name)
					setDogToken(data.token)
					setUserId(data.data._id)
					clearForm()
					setActive(false)
				}
			}
		}

	}
	return (
		<div className="modal_window"
			style={{ display: active ? "flex" : "none" }}>
			<div className="modal_inside">
				<button className="modal_button" onClick={() => setActive(false)}><XCircle /></button>
				<h3>Авторизация</h3>
				<form onSubmit={sendForm}>
					{!auth && <label>
						Имя пользователя
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)} />
					</label>}
					<label>
						Электронный адрес
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)} />
					</label>
					<label>
						Пароль
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)} />
					</label>
					{!auth && <label>
						Повторить пароль
						<input
							type="password"
							value={testPass}
							onChange={(e) => setTestPass(e.target.value)}
							style={testAccess}
						/>
					</label>}
					<div className="modal_ctr">
						<button className="card_button modal_btn_log" disabled={!auth && (!password || password !== testPass || !name || !email)}>
							{auth ? "Войти" : "Создать аккаунт"}</button>
						<Link to="" className="modal_link" onClick={swithAuth}>{auth ? "Регистрирация" : "Войти"}</Link>
					</div>
				</form>
			</div >
		</div >
	);
}

export default Modal;
