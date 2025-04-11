
import React from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "@/components/Layout/Layout";

const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <Layout>
      <div className="text-center py-16">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-culturing-gray mb-8">
          The page {location.pathname} could not be found.
        </p>
        <Link to="/" className="btn-primary">
          Return to Homepage
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
