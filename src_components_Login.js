import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      // Enviar código de verificação para o e-mail ou telefone do usuário
      const code = Math.floor(100000 + Math.random() * 900000); // Código de 6 dígitos
      setVerificationCode(code.toString());
      await user.sendEmailVerification({ code }); // Supondo que o método envie o código
      // Aguarde a verificação do código
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleVerification = (e) => {
    e.preventDefault();
    if (verificationCode === e.target.verificationCode.value) {
      setIsVerified(true);
      history.push('/dashboard');
    } else {
      alert('Código de verificação incorreto');
    }
  };

  const handlePasswordReset = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert('Email de recuperação de senha enviado!');
    } catch (error) {
      console.error('Erro ao enviar email de recuperação de senha:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {isVerified ? (
        <div>
          <p>Verificação bem-sucedida!</p>
        </div>
      ) : (
        <form onSubmit={handleVerification}>
          <input
            type="text"
            name="verificationCode"
            placeholder="Código de Verificação"
          />
          <button type="submit">Verificar</button>
        </form>
      )}
      <button onClick={handlePasswordReset}>Esqueceu a senha?</button>
    </div>
  );
};

export default Login;