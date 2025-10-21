import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AppointmentBooking from "./pages/appointment-booking";
import VehicleQueueManagement from "./pages/vehicle-queue-management";
import QuoteDetails from "./pages/quote-details";
import WorkshopDashboard from "./pages/workshop-dashboard";
import QuoteRequestForm from "./pages/quote-request-form";
import CustomerDashboard from "./pages/customer-dashboard";
import CustomerLogin from "./pages/customer-login";
import CustomerRegistration from "./pages/customer-registration";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<QuoteRequestForm />} />
          <Route path="/appointment-booking" element={<AppointmentBooking />} />
          <Route path="/vehicle-queue-management" element={<VehicleQueueManagement />} />
          <Route path="/quote-details" element={<QuoteDetails />} />
          <Route path="/workshop-dashboard" element={<WorkshopDashboard />} />
          <Route path="/quote-request-form" element={<QuoteRequestForm />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/customer-registration" element={<CustomerRegistration />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
