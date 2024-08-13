import { Button } from "primereact/button";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

function HomeComponent() {
  const navigate = useNavigate();

  const handlerClickButtonSignUp = () => {
    navigate('/register');
  }

  return (
    <>
      <Helmet>
        <title>Ayotaku.id - Sign Up</title>
      </Helmet>
      <Button 
        label="Sign Up"
        size="small"
        icon="pi pi-user-plus"
        className="dark:text-white mx-3 my-5"
        onClick={handlerClickButtonSignUp}
      />
    </>
  )
}

export default HomeComponent;