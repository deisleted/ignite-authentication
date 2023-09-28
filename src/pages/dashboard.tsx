import Link from "next/link";
import { useEffect } from "react";
import { CanRender } from "../components/CanRender";
import { useAuth } from "../contexts/AuthContexts";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut, broadcastAuth } = useAuth();
  


  useEffect(() => {
    api
      .get("/me")
      .then(({ data }) => console.log(data))
      .catch(console.error);
  }, []);

  function handleSignOut() {
    broadcastAuth.current.postMessage("signOut");
    signOut();
  }

  return (
    <>
      <h1>Bem vindo: {user?.name ?? ""}</h1>
      <Link href="/meu-perfil">
        <a>
          <button>Meu Perfil</button>
        </a>
      </Link>


      <CanRender roles={["Administrador"]}>
  <Link href="/listar-user">
    <a>
      <button>Usuários Registrados</button>
    </a>
  </Link>
</CanRender>

<CanRender roles={["Administrador"]}>
  <Link href="/new-user">
    <a>
      <button>Novo Usuário</button>
    </a>
  </Link>
</CanRender>




      <CanRender roles={["administrator"]}>
        <h2>Metrics</h2>
      </CanRender>

      <p>
        <Link href="/metrics">
          <a>Access Metrics Page</a>
        </Link>
        <span>
          {" "}
          - The metrics page maybe will redirect you again to dashboard page, if
          you have right permissions!
        </span>
      </p>

      <button onClick={handleSignOut}>Sign Out</button>

      <CanRender roles={["editor"]}>
        <h2>Posts</h2>
      </CanRender>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => ({ props: {} }));
