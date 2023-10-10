import { usePutSupplyByIdMutation } from '../../context/Api/Common'
import Select from 'react-select';
import { useEffect, useState } from 'react'
import clientAxios from '../../config/clientAxios'
import { changeAction, closeModal, openEditing, openModal, setAction, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'

// async function checkNameExistence(name) {
//   try {
//     const response = await clientAxios.get('/Supply');
//     const Supply = response.data;

//     // Verificar si el nombre ya existe en los insumos
//     const NameExist = Supply.some(supply => supply.name === name);

//     return { exists: NameExist };
//   } catch (error) {
//     console.error('Error al verificar la existencia del Nombre de los insumos:', error);
//     // Manejar el error adecuadamente en tu aplicación
//     return { exists: false };
//   }
// }

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  dangerIndicators: Yup.string().required('Campo requerido'),
  useInstructions: Yup.string().required('Campo requerido'),
  advices: Yup.string().required('Campo requerido'),
  supplyType: Yup.number().required('Campo requerido'),
  sortingWord: Yup.number().required('Campo requerido'),
  quantity: Yup.number().required('Campo requerido'),
  averageCost: Yup.number().required('Campo requerido'),
  expirationDate: Yup.date().required('Campo requerido'),
  warehouseId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir una bodega'),

})

const getWarehause = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Warehause').then(
      (result) => {
        const warehouse_id = result.data.map((Warehause) => ({
          'label': Warehause.warehouseTypeId,
          'value': Warehause.warehouseTypeId
        }));
        resolve(warehouse_id);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getUnitMesure = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/UnitMesure').then(
      (result) => {
        const UnitMesure = result.data.map((unitMeasuresId) => ({
          'label': unitMeasuresId.name,
          'value': unitMeasuresId.id
        }));
        resolve(UnitMesure);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getSupplyPictograms = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/SupplyPictogrmas').then(
      (result) => {
        const SupplyPictogram = result.data.map((supplypictogram) => ({
          'label': supplypictogram.name,
          'value': supplypictogram.id
        }));
        resolve(SupplyPictogram);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getSupplyCategories = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/SupplyCategory').then(
      (result) => {
        const SupplyCategory = result.data.map((supplyCategory) => ({
          'label': supplyCategory.name,
          'value': supplyCategory.id
        }));
        resolve(SupplyCategory);
      },
      (error) => {
        reject(error);
      }
    );
  });
};


function UpdateSupply() {

/* 
  const { setFieldValue } = useFormikContext(); */
  const [unitMeasuresIdOptions, setunitmeaSuresIdOptions] = useState([]);
  const [SupplyPictogramsIdOptions, setSupplyPictogramsIdOptions] = useState([]);
  const [supplyCategoriesIdOptions, setsupplyCategoriesIdOptions] = useState([]);
  

  // Add state variables for selected options
  const [selectedUnitMeasures, setSelectedUnitMeasures] = useState([]);
  const [selectedSupplyPictograms, setSelectedSupplyPictograms] = useState([]);
  const [selectedSupplyCategories, setSelectedSupplyCategories] = useState([]);
  const [warehauseOptions, setWarehauseOptions] = useState([]);



  const fetchOptions = () => {
    getUnitMesure().then((options) => {
      setunitmeaSuresIdOptions(options);      
    });
    getSupplyPictograms().then((options) => {
      setSupplyPictogramsIdOptions(options);      
    });
    getSupplyCategories().then((options) => {
      setsupplyCategoriesIdOptions(options);
    });
    getWarehause().then((options) => {
      setWarehauseOptions(options);
    });
  };

  const dispatch = useDispatch()
  const { editingData } = useSelector((state) => state.modal)
  const [updateSupply, { error, isLoading }] = usePutSupplyByIdMutation()

  useEffect(() => {
    fetchOptions();

    console.log(editingData)

    setSelectedSupplyCategories(editingData.supplyCategoriesXSupply.map(({supplyCategoryId, supplyCategoryNavigation}) => ({'label': supplyCategoryNavigation.name, 'value': supplyCategoryId})))
    setSelectedSupplyPictograms(editingData.supplyXSupplyPictogram.map(({supplyPictogramId, supplyPictogram}) => ({'label': supplyPictogram.name, 'value': supplyPictogramId})))
    setSelectedUnitMeasures(editingData.unitMeasuresXSupply.map(({unitMeasureId, unitMeasure}) => ({'label': unitMeasure.name, 'value': unitMeasureId})))
  }, []);

  const handleSubmit = async values => {
    /*  if (isLoading) return <Spinner />
     if (error) return <Error type={error.status} message={error.error} />
 
     if (values.sortingWord === 1) {
       values.name = values.name + ' Peligro'
     } else if (values.sortingWord === 2) {
       values.name = values.name + ' Atención'
     }
     if (values.supplyType === 1) {
       values.name = values.name + ' Devolutivo'
     } else if (values.supplyType === 2) {
       values.name = values.name + ' Consumible'
     } */

    await updateSupply(values)

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Insumo actualizado con exito', {
      autoClose: 1000

    })
  }



  return (
    <Formik

      initialValues={{
        id: editingData.id,
        expirationDate: editingData.expirationDate,
        name: editingData.name,
        dangerIndicators: editingData.dangerIndicators,
        useInstructions: editingData.useInstructions,
        advices: editingData.advices,
        supplyType: editingData.supplyType,
        sortingWord: editingData.sortingWord,
        quantity: editingData.quantity,
        averageCost: editingData.averageCost,
        unitMeasuresId: [],
        supplyPictogramsId: [],
        supplyCategoriesId: [],
        warehouseId: editingData.warehouseId,


      }}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => (        
      <Form>

      <div className="flex gap-5 grid-cols-5 mb-3">
      <div className="w-1/2">
          <label htmlFor="expirationDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
           Fecha de caducidad
          </label>
          <Field
            type="date"
            name="expirationDate"
            id="Fecha de caducidad"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="Fecha de caducidad"
          />
             <ErrorMessage
            name="expirationDate"
   
            component="div"
            className="text-red-500"
          />
     
        </div>
        <div className='w-1/2 ml-2'>
          <label htmlFor="warehouseId">Bodega</label>
          <br />
          <Field name="warehouseId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
            <option value={0}>Seleccione una bodega</option>
            {warehauseOptions.map(option =>  (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Field>
          <ErrorMessage
            name="warehouseId"
            component="div"
            className="text-red-500"
          />
        </div>
        </div>
        <div className="flex gap-5 grid-cols-5 mb-3">
        <div className="w-1/2">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
           Nombre
          </label>
          <Field
            type="text"
            name="name"
            id="Nombre"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="Nombre"
          />
             <ErrorMessage
            name="name"
   
            component="div"
            className="text-red-500"
          />
     
        </div>
        <div className="w-1/4">
      <label htmlFor="supplyType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
      Tipo insumo
      </label>
      <Field
        as="select"
        name="supplyType"
        id="supplyType"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      >
        <option value={1}>Devolutivo</option>
        <option value={2}>Consumible</option>
      </Field>
      <ErrorMessage
        name="supplyType"
        component="div"
        className="text-red-500"
      />
    </div>
    <div className="w-1/4">
      <label htmlFor="sortingWord" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
        Tipo de peligrosidad
      </label>
      <Field
        as="select"
        name="sortingWord"
        id="sortingWord"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      >
        <option value={1}>Peligro</option>
        <option value={2}>Atención</option>
      </Field>
      <ErrorMessage
        name="sortingWord"
        component="div"
        className="text-red-500"
      />
    </div>
        <div className="w-1/7">
          <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Cantidad
          </label>
          <Field
            type="number"
            name="quantity"
            id="quantity"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="0"
          />
                <ErrorMessage
            name="quantity"
   
            component="div"
            className="text-red-500"
          />
           
        </div>
        <div className="w-1/7">
          <label htmlFor="averageCost" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Costo
          </label>
          <Field
            type="number"
            name="averageCost"
            id="averageCost"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="0"
          />
            <ErrorMessage
            name="averageCost"
            component="div"
            className="text-red-500"
          />

        </div>
      </div>
      <div className="flex gap-5 grid-cols-5 mb-3">
    <div className="w-2/4">
      <label htmlFor="unitMeasuresId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
        Unidad de medida
      </label>
      <Field name="unitMeasuresId">
        {({ field }) => (
          <Select
            {...field}
            options={unitMeasuresIdOptions}
            isMulti
            value={selectedUnitMeasures}
            onChange={(selectedOptions) =>{
              setSelectedUnitMeasures(selectedOptions);
              setFieldValue(
                "unitMeasuresId",
                selectedOptions.map((option) => option.value)
              );
            }}
          />
        )}
      </Field>
    </div>
    
    <div className="w-2/4">
      <label htmlFor="supplyPictogramsId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
        Pictogramas de insumo
      </label>
      <Field name="supplyPictogramsId">
        {({ field }) => (
          <Select
            {...field}
            options={SupplyPictogramsIdOptions}
            isMulti
            value={selectedSupplyPictograms}
            onChange={(selectedOptions) => {
              setSelectedSupplyPictograms(selectedOptions);
              setFieldValue(
                "supplyPictogramsId",
                selectedOptions.map((option) => option.value)
              );
            }}
          />
        )}
      </Field>
    </div>

    <div className="w-2/4">
      <label htmlFor="supplyCategoriesId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
        Categorías de insumo
      </label>
      <Field name="supplyCategoriesId">
        {({ field }) => (
          <Select
            {...field}
            options={supplyCategoriesIdOptions}
            isMulti
            value={selectedSupplyCategories}
            onChange={(selectedOptions) => {
              setSelectedSupplyCategories(selectedOptions);
              setFieldValue(
                "supplyCategoriesId",
                selectedOptions.map((option) => option.value)
              );
            }}
          />
        )}
        </Field>
    </div>
    </div>

      <div className="flex gap-5 grid-cols-5 mb-3">
        <div className="w-2/4">
          <label htmlFor="advices" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
       Consejos
          </label>
          <Field
            as="textarea"
            type="text"
            name="advices"
            id="advices"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            rows="6" cols="40"
            placeholder="Consejos"

          />
              <ErrorMessage
            name="advices"
            component="div"
            className="text-red-500"
          />

        </div>
        <div className="w-2/4">
          <label htmlFor="dangerIndicators" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
          Indicadores de peligro
          </label>
          <Field
            as="textarea"
            type="text"
            name="dangerIndicators"
            id="dangerIndicators"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            rows="6" cols="40"
            placeholder="Indicadores de peligro"
          />
              <ErrorMessage
            name="dangerIndicators"
            component="div"
            className="text-red-500"
          />
           

        </div>
        <div className="w-2/4">
          <label htmlFor="useInstructions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
           Instrucciones
          </label>
          <Field
            as="textarea"
            type="text"
            name="useInstructions"
            id="useInstructions"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            rows="6" cols="40"
            placeholder="Instrucciones"
          />
                <ErrorMessage
            name="useInstructions"
            component="div"
            className="text-red-500"
          />
           
        </div>

        {/* <div className="w-1/8">
          <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Tipo insumo
          </label>
          <Field
            as="select"
            name="supplyType"
            id="supplyType"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="Tipo insumo"
          />
              <option value={1}>Devolutivo</option>
              <option value={2}>Consumible</option>
              
                <ErrorMessage
            name="supplyType"
   
            component="div"
            className="text-red-500"
          />
           
        </div> */}

       </div>
    
      <button
        type="submit"
        className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-ring-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        style={{ backgroundColor: '#3EABCF' }}
      >
        Actualizar Insumo
      </button>
      <button type="submit"></button>
    </Form>
      )}
    </Formik>
  )
}

export function UpdateButtomSupply({ supply }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleEdit = (data) => {
    dispatch(setWidth({ width: '-[1500px]' }))
    dispatch(openModal({ title: 'Editar insumos' }))
    dispatch(setAction({ action: 'editing' }))
    dispatch(openEditing({ editingData: data }))
  }
  // ?

  return (
    <button type="button" onClick={() => {
      handleEdit(supply)
    }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    </button>
  )
}

export default UpdateSupply
