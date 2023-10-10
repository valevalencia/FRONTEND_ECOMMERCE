const Dashboard = () => {
  return (
    <div className="relative bg-white py-10 px-20 shadow-xl mdm:py-10 mdm:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">BIENVENIDO A</h1>
        <p className="text-xl">E-COMMERCE</p>
      </div>
      <div className="text-center">
        <img
          src="../../public/img/Logo.png"
          alt="Descripción de la imagen"
          className="mx-auto my-4" // Utilizamos mx-auto para centrar horizontalmente la imagen
        />
      </div>
    </div>
  );
}

export default Dashboard;
