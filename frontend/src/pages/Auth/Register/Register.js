import "../StyleAuth/StyleAuth.css";
// Icons
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

// Components
import { Link } from "react-router-dom";
import Message from "../../../components/Message/Message";
import Loading from "../../../components/Loading/Loading";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { register, reset } from "../../../slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };
    dispatch(register(user));
  };
  const [show, setShow] = useState(false);
  const toggleShowPassword = () => setShow(!show);

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
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
          <span className="showPassword" onClick={toggleShowPassword}>
            {show ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </span>
        </div>
        <input
          type="password"
          placeholder="Confirme a senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          autoComplete="off"
        />

        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}

        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
