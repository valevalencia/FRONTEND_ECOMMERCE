import { useDispatch, useSelector } from 'react-redux'
import { openModal, setAction, setDetailsData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { GrView } from 'react-icons/gr'
import clientAxios from '../../config/clientAxios'
import { useEffect, useState } from 'react'
import '../Supply/Supply.css';

function DetailsSupply () {
  const [loading, setLoading] = useState(true)
  const [dataWarehause, setDataWarehause] = useState([])

  const { detailsData } = useSelector((state) => state.modal)
  console.log('Detalles de Supply:', detailsData);
  const { name, dangerIndicators, useInstructions, advices, supplyType, sortingWord, quantity, averageCost,expirationDate,warehouseId,statedAt } = detailsData
  const supplyCategories = detailsData.supplyCategoriesXSupply?.map(item => item.supplyCategoryNavigation.name);
  const unitMeasures = detailsData.unitMeasuresXSupply?.map(item => item.unitMeasure.name);
  const supplyPictograms = detailsData.supplyXSupplyPictogram?.map(item => item.supplyPictogram.name);
  console.log("detailsData");

  useEffect(() => {
    clientAxios('/Warehause')
      .then(response => {
        setDataWarehause(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error al obtener datos:', error)
        setLoading(false)
      })
  }, [])

// Función para dividir el texto en líneas si es demasiado largo
const formatText = (text) => {
  // Define la longitud máxima de caracteres por línea
  const maxLengthPerLine = 30; // Ajusta según tus necesidades

  if (text.length > maxLengthPerLine) {
    // Divide el texto en líneas con un máximo de caracteres por línea
    const lines = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      lines.push(text.slice(currentIndex, currentIndex + maxLengthPerLine));
      currentIndex += maxLengthPerLine;
    }

    return lines.join('\n'); // Combina las líneas con saltos de línea
  }

  return text; // Devuelve el texto original si no es demasiado largo
};

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <>
    <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossorigin="anonymous"
        ></link>
  
    <p><b>Nombre insumo:</b> {name}</p>
      
    <p><b>Indicadores de peligro insumo:</b></p>
      <p>{formatText(dangerIndicators)}</p>

      <p><b>Instrucciones:</b></p>
      <p>{formatText(useInstructions)}</p>

      <p><b>Consejos:</b></p>
      <p>{formatText(advices)}</p>
      <p><b>Tipo insumo:</b> {supplyType === 1 ? 'Devolutivo' : 'Consumible'}</p>
      <p><b>Tipo peligrosidad:</b> {sortingWord === 1 ? 'Peligro' : 'Atención'}</p>
      <p><b>Cantidad:</b> {quantity}</p>
      <p><b>Costo:</b> {averageCost}</p>
      <p><b>Fecha de caducidad:</b> {expirationDate}</p>
      <p>
      <b>Bodega: </b>
      {dataWarehause.map((warehause) => {
        return warehause.id === warehouseId && warehause.ubication
      })}</p>
      <p><b>Categoría de insumos:</b> {supplyCategories.length > 0 ? supplyCategories.join(', ') : 'No disponible'}</p>
      <p><b>Unidad de medida:</b> {unitMeasures.length > 0 ? unitMeasures.join(', ') : 'No disponible'}</p>
      <p><b>Pictogramas:</b> {supplyPictograms.length > 0 ? supplyPictograms.join(', ') : 'No disponible'}</p>
      <p>
      <b>Estado:</b> {' '}
      {statedAt
        ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
            Activo
          </span>
        : <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            Inactivo
          </span>}
      </p>
    </>
  )
}

export function DetailsButtomSupply ({ supply }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '500px' }))
    dispatch(openModal({ title: 'Detalles de insumos ' }))
    dispatch(setAction({ action: 'details' }))
    dispatch(setDetailsData({ detailsData: supply }))
  }
  // ?

  return (
      <button type="button" onClick={() => {
        handleOpen()
      }}>
        <GrView className="opacity-60 h-5 w-5 mr-2" />
      </button>
  )
}

export default DetailsSupply
