import "../StyleAuth/StyleAuth.css";
// Icons
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


// Redux
import { login, reset } from "../../../slices/authSlice";
import Message from "../../../components/Message/Message";

// Components
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    console.log(user);

    dispatch(login(user));
  };
  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  if (loading) {
    return <Loading />;
  }
  return (
    <div id="login">
      <h2>ReactGram</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="password">
          <input
            type={show ? "text" : "password"}
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="off"
          />
          <span className="showPassword" onClick={toggleShow}>
            {show ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </span>
        </div>
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
      </form>
      {error && <Message msg={error} type="error" />}
      <p>
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default Login;
