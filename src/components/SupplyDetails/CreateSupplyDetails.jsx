import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import clientAxios from '../../config/clientAxios'
import { usePostSupplyDetailsMutation} from '../../context/Api/Common'
import { useNavigate, Link } from 'react-router-dom'
import { data } from 'autoprefixer';

var datosInfo = {};
var datosJson = [];

// console.log(datosJson)



const validationSchema = Yup.object().shape({
  description: Yup.string().required('La descripción es requerida'),
  providerId: Yup.number().required('Selecciona un proveedor'),
  entryDate: Yup.date().required('La fecha de entrada es requerida'),
  // fullValue: Yup.number().required('El valor completo es requerido'),
  supplies: Yup.array().of(
    Yup.object().shape({
      supplyId: Yup.number().required('Selecciona un insumo'),
      supplyCost: Yup.number().required('Ingresa el costo del insumo'),
      quantity: Yup.number().required('Ingresa la cantidad del insumo'),
    })
  ),
});

const getProviders = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Provider').then(
      (result) => {
        const providers = result.data.map((provider) => ({
          'label': ` ${provider.nameCompany}`,
          'value': parseInt(provider.id)
        }))
        resolve(providers)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

const getSupplies = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Supply').then(
      (result) => {
        const supplies = result.data.map((supply) => ({
          'label': supply.name,
          'Cost': parseFloat(supply.averageCost),
          'value': parseInt(supply.id),
        }))
        resolve(supplies)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

const initialValues = {

};



const CreateSupplyDetails = () => {
  const [providerOptions, setProviderOptions] = useState([])
  const [supplyOptions, setSupplyOptions] = useState([])
  const [createSupplyDetail, { error, isLoading }] = usePostSupplyDetailsMutation()
  const navigate = useNavigate();
  


  const onSubmit = async (values) => {
    console.log("Formulario enviado");
    try {
      // const formData = new FormData();
      // formData.append('description', values.description);
      // formData.append('providerId', values.providerId);
      // formData.append('entryDate', values.entryDate);
      // formData.append('fullValue', values.fullValue);
      // formData.append('supplies', JSON.stringify(datosJson));

      datosInfo.description = document.getElementById('description').value;
      datosInfo.providerId = document.getElementById('providerId').value;
      datosInfo.entryDate = document.getElementById('entryDate').value;
      datosInfo.fullValue = "";
      datosInfo.supplies = datosJson;

      // datosInfo.push({
      //   description: document.getElementById('description').value,
      //   providerId: document.getElementById('providerId').value,
      //   entryDate: document.getElementById('entryDate').value,
      //   fullValue: "",
      //   supplies: datosJson
      // });

      // Realiza la solicitud POST
      const response = await clientAxios.post('/supplyDetails', datosInfo);
  
      // Verifica la respuesta
      if (response.status === 200) {
        toast.success('Compra creada con éxito');
        navigate('/supplyDetails');
      } else {
        toast.error('Error al crear la compra');
      }
    } catch (error) {
      toast.error('Error al crear la compra');
      console.error(error); // Agrega esto para ver detalles del error en la consola
    }
    console.log(datosInfo)
  };


  const fetchOptions = () => {
    getProviders().then((options) => {
      setProviderOptions(options)
    })
    getSupplies().then((options) => {
      setSupplyOptions(options)
    })
  }

  useEffect(() => {
    
    fetchOptions()
  }, []);

  

  const [insumos, setInsumos] = useState([]);
  const [jsonInsumos, setJsonInsumos] = useState([]);
  
  const updateInsumos = (insumo) => {
    const existingIndex = insumos.findIndex((item) => item.supplyId === insumo.supplyId);
    
    if (existingIndex !== -1) {
      const updatedInsumos = [...insumos];
      updatedInsumos[existingIndex].cantidad += insumo.cantidad;
      setInsumos(updatedInsumos);
    } else {
      setInsumos([...insumos, insumo]);
    }
  };

  const handleSubmit = (event) => {
  const selectInsumo = document.getElementById('insumo');

  const insumo = {
    supplyId: selectInsumo.value,
    nombre: selectInsumo.options[selectInsumo.selectedIndex].text,
    cantidad: parseInt(document.getElementById('cantidad').value),
    precio: parseFloat(document.getElementById('costo').value),
  };

  updateInsumos(insumo);

  
  const existingIndex = datosJson.findIndex((item) => item.supplyId === insumo.supplyId);

  if (existingIndex !== -1) {
    
    datosJson[existingIndex].quantity = parseInt(datosJson[existingIndex].quantity) + insumo.cantidad;
  } else {
    
    datosJson.push({
      supplyId: selectInsumo.value,
      supplyCost: document.getElementById('costo').value,
      quantity: document.getElementById('cantidad').value,
    });
  }
  // console.log(datosJson);
  
};

  const handleDelete = (event) => {
    // console.log(event)
    const filaSeleccionada = event.target.closest("tr");
    
    const idInsumo = filaSeleccionada.getAttribute("data-id");    
    // console.log(idInsumo);

    setInsumos((insumos) => insumos.filter((insumo) => insumo.supplyId !== idInsumo));
    setJsonInsumos((jsonInsumos) => jsonInsumos.filter((insumo) => insumo.supplyId !== idInsumo));

    datosJson = datosJson.filter(function (obt){
      return obt.supplyId != idInsumo
      
    })
    
  };

  // console.log(datosInfo)
  
  const tablaInsumos = insumos.map((insumo, index) => (
    <tr key={insumo.supplyId} data-id={insumo.supplyId}>
      <td>{insumo.supplyId}</td>
      <td>{insumo.nombre}</td>
      <td>{insumo.cantidad}</td>
      <td>{insumo.precio}</td>
      <td>$ {(insumo.precio * insumo.cantidad).toLocaleString('en-US')}</td>
      <td>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Eliminar
        </button>
      </td>

    </tr>
    
  ));

  useEffect(() => {
    setJsonInsumos(insumos.map((insumo) => ({
      supplyId: insumo.supplyId,
      supplyCost: insumo.precio,
      quantity: insumo.cantidad,
    })));
    // console.log(jsonInsumos)
  }, [insumos]);

  const onCancel = () => {
    // Redirige al usuario a la página de listar después de cancelar.
    navigate('/supplyDetails'); // Asegúrate de reemplazar 'supplyDetails' con la ruta correcta de la lista.
  };
  return (
    <Formik
    initialValues={{
      description: '',
      providerId: 0,
      entryDate: '',
      fullValue: '',
      supplies: [
        {
          supplyId: '',
          supplyCost: 0,
          quantity: 0,
        },
      ],
    }}
  validationSchema={validationSchema}
  onSubmit={onSubmit}
  // onSubmit={(values) => {
  //   // console.log(values)
  //   // handleSubmit(values)
  // }}
>
<Form>


        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossorigin="anonymous"
        ></link>
        <div className="card form_compra">
          <p>Orden de compra</p>
          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
              <label htmlFor="entryDate">Fecha de compra</label>
              <Field
                name="entryDate"
                type="date"
                id="entryDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
              />
            </div>
            <div className="w-1/2 ml-2">
              <label htmlFor="providerId">Proveedor</label>
              <Field as="select" name="providerId" id="providerId" className="form-control">
                <option value="">Selecciona un proveedor</option>
                {providerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="providerId" component="div" className="error" />
            </div>
          </div>

          <div className="w-full mr-2">
            <label htmlFor="description">Descripción</label>
            <Field
              as="textarea"
              type="text"
              name="description"
              id="description"
              placeholder="Descripción"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              rows="6"
              cols="100"
            />
            <ErrorMessage name="description" component="div" className="text-red-500" />
          </div>

          <FieldArray name="supplies">
            {({ push, remove, form }) => (
              <div>
                {form.values.supplies.map((supply, index) => (
                  
                  <div key={index} className='row mt-3'>
                    <div className="col-4">
                      <div className="form-group">
                        <label htmlFor={`supplies[${index}].supplyId`}>Insumos</label>
                        <Field
                          as="select"
                          name={`supplies[${index}].supplyId`}
                          className="form-control"
                          id="insumo"
                        >
                          <option value="">Selecciona los insumos</option>
                          {supplyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name={`supplies[${index}].supplyId`}
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label htmlFor={`supplies[${index}].supplyCost`}>Costo</label>
                        <Field
                          type="number"
                          name={`supplies[${index}].supplyCost`}
                          className="form-control"
                          id="costo"
                        />
                        <ErrorMessage
                          name={`supplies[${index}].supplyCost`}
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group mb-3">
                        <label htmlFor={`supplies[${index}].quantity`}>Cantidad</label>
                        <Field
                          type="number"
                          name={`supplies[${index}].quantity`}
                          className="form-control"
                          id="cantidad"
                        />
                        <ErrorMessage
                          name={`supplies[${index}].quantity`}
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>
                    
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button type="button" onClick={handleSubmit} className="btn btn-primary mb-3">
                  Adicionar
                </button>
                <div>
                  <b className='pl-2'>Valor Total: </b>
                  {`$ ${insumos.map((insumo) => (insumo.precio * insumo.cantidad)).reduce((a, b) => a + b, 0).toLocaleString('en-US')}`}
                </div>
              </div>
              </div>
            )}
          </FieldArray>
          <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Insumo</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>{tablaInsumos}</tbody>
          </table>
          <div className="flex justify-between mt-5 mb-3">
          <button
            type="submit"
            className="text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-auto"
            style={{ backgroundColor: '#3EABCF'}}
          >
            Crear Compra
          </button>
          <button
            type="button"
            className="btn btn-danger"
            //style={{ backgroundColor: '#3EABCF' }}
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
        </div>

        

        


        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossorigin="anonymous"
        ></script>
        
      </Form>
    </Formik>
    
  );
};

export function CreateButtomSupplyDetails() {
  const handleOpen = () => {};
  return (
    <Link to="/SupplyDetail/create">
      <button
        className="informe flex items-center justify-center border border-gray-400 text-black hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 gap-3"
        style={{ backgroundColor: '#3EABCF' }}
        type="button"
        onClick={() => handleOpen()}
      >
        <svg
          className="h-3.5 w-3.5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          />
        </svg>
        Crear Compra de insumos
      </button>
    </Link>
  );
}

// export function CreateButtomSupplyDetails() {

//   const handleOpen = () => {}
//   return (

//       <Link to="/SupplyDetail/create">
//         <button
//           className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
//           type="button"
//           onClick={() => handleOpen()}
//         >
//           <svg
//             className="h-3.5 w-3.5 mr-2"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//             aria-hidden="true"
//           >
//             <path
//               clipRule="evenodd"
//               fillRule="evenodd"
//               d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
//             />
//           </svg>
//           Crear Compra de insumos
//         </button>
//       </Link>

//   );
// }

export default CreateSupplyDetails;