import { useDispatch, useSelector } from 'react-redux'
import { openModal, setAction, setDetailsData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { GrView } from 'react-icons/gr'
import { BsQrCode } from "react-icons/bs";
import { useState, useEffect, useRef } from 'react'

import clientAxios from '../../config/clientAxios'
import '../SupplyDetails/SupplyDetails.css';
import { data } from 'autoprefixer';
import { useReactToPrint } from 'react-to-print'
const formatDate = (dateString, format = { year: 'numeric', month: 'long', day: 'numeric' }) => {
  if (dateString != null) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, format);

    return formattedDate;
  } else {
    return "N/A"
  }
};




function DetailsSupplyDetails() {


  
  const [loading, setLoading] = useState(false)
  const [dataProvider, setDataProvider] = useState([])
  const { detailsData } = useSelector((state) => state.modal)
  const { description, entryDate, statedAt, providerId, supplies } = detailsData
  

  useState(() => {
    clientAxios('/Provider')
      .then(response => {
        setDataProvider(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error al obtener datos:', error)
        setLoading(false)
      })
      },[])

if (loading) {
    return <div>Cargando...</div>

  }      
  return (
    <>
      <div className="encabezado">
        <span className='texto_se'>Descripcion: </span><p>{description}</p>
        <span className='texto_se'>Fecha de entrada: </span><p>{formatDate(entryDate)}</p>
        </div>
        

      <p className='texto_info'>Datos del proveedor</p>
      <div className="info">
        <p className='texto_se'>Nombre:</p>
        <p>
        
        {dataProvider.map((provider) => {
          return provider.id === providerId && provider.nameCompany
        })}
        </p>
      </div>

      <br></br>
      <b>Estado:</b> {' '}
      {statedAt
        ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          Activo
        </span>
        : <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
          Inactivo
        </span>}
      <hr />
      <b>Insumos</b>
      <div className='flex w-full m-0'>
        <table className='detInsumos'>
          <thead>
            <tr>
              <th className='border-collapse border border-slate-400'>Nombre</th>
              <th className='border-collapse border border-slate-400'>Cantidad</th>
              <th className='border-collapse border border-slate-400'>Precio</th>
              <th className='border-collapse border border-slate-400'>SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {supplies.map((detail, index) => {
             const tablePDFRef = useRef();
             const generatePDF = useReactToPrint({
              content: () => tablePDFRef.current,
              documentTitle: 'Informe de loteo de insumos'
            })
             
              return (
                <tr key={index} className='hover:bg-stone-100'>
                  <td className='border border-slate-400 text-center'>{detail.supplyName}</td>
                  <td className='border border-slate-400 text-center'>{detail.quantity}</td>
                  <td className='border border-slate-400 text-center'>$ {(detail.supplyCost).toLocaleString('en-US')}</td>
                  <td className='border border-slate-400 text-center'>$ {(detail.supplyCost * detail.quantity).toLocaleString('en-US')}</td>
                  <td className='grid justify-items-center'>

                    <div className='hidden'>
                    
                    </div>

                  </td>
                </tr>
              )
            })}
            <tr className='text-center'>
              <td colSpan={7} className='border border-slate-400'>
                <b className='pl-2'>Valor Total: </b>
                {`$ ${supplies.map((detail) => (detail.supplyCost * detail.quantity)).reduce((a, b) => a + b, 0).toLocaleString('en-US')}`}
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </>
  )
}
export function DetailsButtomSupplyDetails({ supplyDetails }) {
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: 'w-[1200px]' }))
    dispatch(openModal({ title: 'Detalles compra de insumos' }))
    dispatch(setAction({ action: 'details' }))
    dispatch(setDetailsData({ detailsData: supplyDetails }))
  }
  return (
    <button type="button" onClick={() => {
      handleOpen()
    }}>
      <GrView className="opacity-60 h-5 w-5 mr-2" />
    </button>
  )
}
export default DetailsSupplyDetails