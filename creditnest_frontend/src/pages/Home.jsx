import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}

      <div className="text-center py-20 bg-white shadow">

        <h1 className="text-5xl font-bold text-teal-600">
          CreditNest
        </h1>

        <p className="mt-4 text-xl text-gray-700">
          Know if your business is loan ready before applying.
        </p>

        <p className="mt-2 text-gray-500">
          Analyze your financial health, credit profile, and banking behavior.
        </p>

        <div className="mt-8 flex justify-center gap-6">

          <Link
            to="/register"
            className="bg-teal-400 px-6 py-3 rounded-lg shadow"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="bg-teal-600 text-white  px-6 py-3 rounded-lg shadow"
          >
            Sign In
          </Link>

        </div>
      </div>

      {/* How it Works */}

      <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-10 px-6">
        
        <div className="bg-white p-6 rounded shadow">

          <h3 className="text-xl font-bold text-teal-600">
            1. Enter Business Data
          </h3>

          <p className="mt-3 text-gray-600">
            Provide details about your business profile, financial health,
            banking behavior and credit history.
          </p>

        </div>

        <div className="bg-white p-6 rounded shadow">

          <h3 className="text-xl font-bold text-teal-600">
            2. Run Loan Readiness Assessment
          </h3>

          <p className="mt-3 text-gray-600">
            Our scoring engine evaluates your business across
            7 key credit factors used by lenders.
          </p>

        </div>

        <div className="bg-white p-6 rounded shadow">

          <h3 className="text-xl font-bold text-teal-600">
            3. Get Your Score
          </h3>

          <p className="mt-3 text-gray-600">
            Receive your loan readiness score, risk profile,
            and recommendations to improve financing eligibility.
          </p>

        </div>

      </div>

      {/* Feature Section */}

      <div className="max-w-6xl mx-auto mt-24 px-6">

        <h2 className="text-3xl font-bold text-center text-gray-800">
          Why Use CreditNest?
        </h2>

        <div className="grid md:grid-cols-4 gap-8 mt-10">

          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="font-bold text-lg">Loan Readiness Score</h4>
            <p className="text-gray-600 mt-2">
              Understand how banks evaluate your business.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="font-bold text-lg">Financial Insights</h4>
            <p className="text-gray-600 mt-2">
              Identify weaknesses in your financial profile.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="font-bold text-lg">Loan Eligibility</h4>
            <p className="text-gray-600 mt-2">
              Estimate the maximum loan your business qualifies for.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="font-bold text-lg">Actionable Advice</h4>
            <p className="text-gray-600 mt-2">
              Get recommendations to improve your loan chances.
            </p>
          </div>

        </div>

      </div>

      {/* Call to Action */}

      <div className="text-center mt-24 mb-20">

        <h2 className="text-3xl font-bold text-gray-800">
          Start Assessing Your Business Today
        </h2>

        <div className="mt-6">

          <Link
            to="/signup"
            className="bg-teal-600 text-white px-8 py-3 rounded-lg shadow"
          >
            Create Free Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;