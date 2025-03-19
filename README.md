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
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../firebase';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({ displayName: name });
      history.push('/dashboard');
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/frances-nivel1">Francês - Nível 1</Link></li>
          <li><Link to="/frances-nivel2">Francês - Nível 2</Link></li>
          <li><Link to="/frances-nivel3">Francês - Nível 3</Link></li>
          <li><Link to="/ingles-basico">Inglês - Básico</Link></li>
        </ul>
      </nav>
    </div>
  );
};import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/frances-nivel1">Francês - Nível 1</Link></li>
          <li><Link to="/frances-nivel2">Francês - Nível 2</Link></li>
          <li><Link to="/frances-nivel3">Francês - Nível 3</Link></li>
          <li><Link to="/ingles-basico">Inglês - Básico</Link></li>
        </ul>
      </nav>
    </div>
  );
};
import React from 'react';
import { Link } from 'react-router-dom';

const Courses = ({ language, level }) => {
  return (
    <div>
      <h2>{language} - {level}</h2>
      <div>
        <h3>Aulas</h3>
        <ul>
          <li><Link to={`/lesson/${language}/${level}/1`}>Aula 1</Link></li>
          <li><Link to={`/lesson/${language}/${level}/2`}>Aula 2</Link></li>
          <li><Link to={`/lesson/${language}/${level}/3`}>Aula 3</Link></li>
          {/* Adicionar mais aulas conforme necessário */}
        </ul>
      </div>
    </div>
  );
};import React from 'react';

const Lesson = ({ match }) => {
  const { language, level, lessonId } = match.params;

  return (
    <div>
      <h2>{language} - {level} - Aula {lessonId}</h2>
      <div>
        <h3>Vídeos</h3>
        {/* Adicionar vídeos aqui */}
      </div>
      <div>
        <h3>PDFs</h3>
        {/* Adicionar PDFs aqui */}
      </div>
      <div>
        <h3>Chat da Aula</h3>
        {/* Adicionar chat aqui */}
      </div>
    </div>
  );
};
import React from 'react';

const Chat = () => {
  return (
    <div>
      <h2>Clube de Conversação</h2>
      {/* Lógica do chat aqui */}
    </div>
  );
};

export default Chat;import React from 'react';

const Payment = () => {
  return (
    <div>
      <h2>Pagamento</h2>
      {/* Lógica de pagamento aqui */}
    </div>
  );
};

export default Payment;import React from 'react';

const Payment = () => {
  return (
    <div>
      <h2>Pagamento</h2>
      {/* Lógica de pagamento aqui */}
    </div>
  );
};import React from 'react';

const Support = () => {
  return (
    <div>
      <h2>Suporte</h2>
      {/* Lógica de suporte aqui */}
    </div>
  );
};import React, { useState } from 'react';

const AdminPanel = () => {
  const [code, setCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (code === '1999') {
      setIsAdmin(true);
    } else {
      alert('Código incorreto!');
    }
  };

  return (
    <div>
      <h2>Painel de Administração</h2>
      {isAdmin ? (
        <div>
          <h3>Bem-vindo, Administrador!</h3>
          <div>
            {/* Funcionalidades do administrador aqui */}
          </div>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Código Secreto"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      )}
    </div>
  );
};

export default AdminPanel;import React from 'react';

const Profile = () => {
  return (
    <div>
      <h2>Perfil</h2>
      {/* Lógica do perfil do usuário aqui */}
    </div>
  );
};import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Lesson from './components/Lesson';
import Chat from './components/Chat';
import Payment from './components/Payment';
import Support from './components/Support';
import AdminPanel from './components/AdminPanel';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/frances-nivel1" render={(props) => <Courses {...props} language="Francês" level="Nível 1" />} />
          <Route path="/frances-nivel2" render={(props) => <Courses {...props} language="Francês" level="Nível 2" />} />
          <Route path="/frances-nivel3" render={(props) => <Courses {...props} language="Francês" level="Nível 3" />} />
          <Route path="/ingles-basico" render={(props) => <Courses {...props} language="Inglês" level="Básico" />} />
          <Route path="/lesson/:language/:level/:lessonId" component={Lesson} />
          <Route path="/chat" component={Chat} />
          <Route path="/pagamento" component={Payment} />
          <Route path="/suporte" component={Support} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/perfil" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
};
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
);
export default App;

export default Profile;

export default Support;

export default Payment;
export default Lesson;

export default Courses;
export default Dashboard;

export default Dashboard;

export default Register;
export default Login;
