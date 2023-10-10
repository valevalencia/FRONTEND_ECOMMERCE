import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'

import { ProtectedRoute } from '../context/Helpers/protectedRoute';

import Dashboard from '../pages/Dashboard/Dashboard'
import Provider from '../pages/Provider/Provider'
import Warehause from '../pages/Warehause/Warehause'
import Supply from '../pages/Supply/Supply'
import Finish from '../pages/Finish/Finish'
import SupplyCategory from '../pages/SupplyCategory/SupplyCategory'
import UnitMesure from '../pages/UnitMesure/UnitMesure'
import Role from '../pages/Role/Role'
import TypeDocument from '../pages/TypeDocument/TypeDocument'
import User from '../pages/User/User'
import Login from '../pages/Login/Login'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import ForgotPasswordEmail from '../pages/ForgotPassword/ForgotPasswordEmail'
import TypeServices from '../pages/TypeServices/TypeServices'
import SupplyPictogrmas from '../pages/SupplyPictograms/SupplyPictograms'
import SupplyDetails from '../pages/SupplyDetails/SupplyDetails'

import CreateSupplyDetails from '../components/SupplyDetails/CreateSupplyDetails'
import DashboardLayout from '../layout/DashboardLayout'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/olvide_contraseña" element={<ForgotPasswordEmail />} />
      <Route path="/restaurar_contraseña" element={<ForgotPassword />} />

      <Route
        path=""
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="provider"
        element={<ProtectedRoute>
          <Provider />
        </ProtectedRoute>} />

      <Route path="warehause"
        element={<ProtectedRoute>
          <Warehause />
        </ProtectedRoute>} />

      <Route path="Finish"
        element={<ProtectedRoute>
          <Finish />
        </ProtectedRoute>} />

      <Route
        path="roles"
        element={
          <ProtectedRoute>
            <Role />
          </ProtectedRoute>
        }
      />

      <Route
        path="tipos_documentos"
        element={
          <ProtectedRoute>
            <TypeDocument />
          </ProtectedRoute>
        }
      />

      <Route
        path="usuarios"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />

      <Route
        path="UnitMesure"
        element={
          <ProtectedRoute>
            <UnitMesure />
          </ProtectedRoute>
        }
      />


      <Route
        path="typeServices"
        element={
          <ProtectedRoute>
            <TypeServices />
          </ProtectedRoute>
        }
      />

      <Route
        path="supplyPictograms"
        element={
          <ProtectedRoute>
            <SupplyPictogrmas />
          </ProtectedRoute>
        }
      />

      <Route
        path="supplyDetails"
        element={
          <ProtectedRoute>
            <SupplyDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="SupplyDetail/create"
        element={
          <ProtectedRoute>
            <CreateSupplyDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="supply"
        element={
          <ProtectedRoute>
            <Supply />
          </ProtectedRoute>
        }
      />

      <Route
        path="supplyCategory"
        element={
          <ProtectedRoute>
            <SupplyCategory />
          </ProtectedRoute>
        }
      />
    </>
  )
)

export default router
