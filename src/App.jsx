import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider }       from './context/AuthContext'
import { TripDataProvider }   from './context/TripDataContext'
import { RoleProvider }       from './context/RoleContext'
import { TravelProvider, useTravel } from './context/TravelContext'
import { JournalProvider }    from './context/JournalContext'
import AdminRoute             from './components/auth/AdminRoute'
import MainLayout             from './components/layout/MainLayout'
import PageLoader             from './components/common/PageLoader'

// ── Eager: landing page loads immediately ──────────────────────────────────────
import Dashboard from './pages/Dashboard'

// ── Lazy: all other pages ──────────────────────────────────────────────────────
const Itinerary          = lazy(() => import('./pages/Itinerary'))
const Budget             = lazy(() => import('./pages/Budget'))
const Expenses           = lazy(() => import('./pages/Expenses'))
const Savings            = lazy(() => import('./pages/Savings'))
const Stays              = lazy(() => import('./pages/Stays'))
const Gifts              = lazy(() => import('./pages/Gifts'))
const Bookings           = lazy(() => import('./pages/Bookings'))
const Basketball         = lazy(() => import('./pages/Basketball'))
const Cars               = lazy(() => import('./pages/Cars'))
const Packing            = lazy(() => import('./pages/Packing'))
const PhotoLog           = lazy(() => import('./pages/PhotoLog'))
const Login              = lazy(() => import('./pages/Login'))
const Export             = lazy(() => import('./pages/Export'))
const ComingSoon         = lazy(() => import('./pages/ComingSoon'))
const WorldTour          = lazy(() => import('./pages/WorldTour'))
const WorldTourDestination = lazy(() => import('./pages/WorldTourDestination'))
const Places             = lazy(() => import('./pages/Places'))
const PlaceDetailPage    = lazy(() => import('./pages/PlaceDetailPage'))
const ArcPage            = lazy(() => import('./pages/ArcPage'))
const MapPage            = lazy(() => import('./pages/MapPage'))
const AdminStudio        = lazy(() => import('./pages/admin/AdminStudio'))
const TravelMode         = lazy(() => import('./pages/travel/TravelMode'))
const NotFound           = lazy(() => import('./pages/NotFound'))

// ── Trip gate ──────────────────────────────────────────────────────────────────
function TripPage({ element, pageName }) {
  const { primaryTrip } = useTravel()
  if (primaryTrip?.status === 'active') return element
  return <ComingSoon pageName={pageName} />
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"           element={<Dashboard />} />
        <Route path="/map"        element={<MapPage />} />
        <Route path="/itinerary"  element={<TripPage element={<Itinerary />}   pageName="Itinerary"   />} />
        <Route path="/places"     element={<TripPage element={<Places />}      pageName="Places"      />} />
        <Route path="/place/:id"  element={<TripPage element={<PlaceDetailPage />} pageName="Place Detail" />} />
        <Route path="/budget"     element={<TripPage element={<Budget />}      pageName="Budget"      />} />
        <Route path="/expenses"   element={<TripPage element={<Expenses />}    pageName="Expenses"    />} />
        <Route path="/savings"    element={<TripPage element={<Savings />}     pageName="Savings"     />} />
        <Route path="/stays"      element={<TripPage element={<Stays />}       pageName="Stays"       />} />
        <Route path="/gifts"      element={<TripPage element={<Gifts />}       pageName="Gifts"       />} />
        <Route path="/bookings"   element={<TripPage element={<Bookings />}    pageName="Bookings"    />} />
        <Route path="/basketball" element={<TripPage element={<Basketball />}  pageName="Basketball"  />} />
        <Route path="/cars"       element={<TripPage element={<Cars />}        pageName="JDM / Cars"  />} />
        <Route path="/packing"    element={<TripPage element={<Packing />}     pageName="Packing"     />} />
        <Route path="/photos"     element={<TripPage element={<PhotoLog />}    pageName="Photo Log"   />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/export"         element={<Export />} />
        <Route path="/travel"             element={<TravelMode />} />
        <Route path="/admin"              element={<AdminRoute><AdminStudio /></AdminRoute>} />
        <Route path="/world-tour"       element={<AdminRoute><WorldTour /></AdminRoute>} />
        <Route path="/world-tour/:slug" element={<AdminRoute><WorldTourDestination /></AdminRoute>} />
        <Route path="/arc/:year"        element={<AdminRoute><ArcPage /></AdminRoute>} />
        <Route path="*"                 element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TravelProvider>
          <RoleProvider>
            <TripDataProvider>
              <JournalProvider>
                <MainLayout>
                  <AppRoutes />
                </MainLayout>
              </JournalProvider>
            </TripDataProvider>
          </RoleProvider>
        </TravelProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
