import React from "react";

function Education() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">

      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
        Credit Education
      </h1>

      <article className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
        <h3 className="text-2xl font-semibold text-teal-600 mb-3">
          How Banks Assess SMEs
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Banks review financial health, cashflow stability, management capability, 
          and collateral strength before approving loans. Understanding these factors 
          helps SMEs prepare and increase their chances of loan approval.
        </p>
      </article>

      <article className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
        <h3 className="text-2xl font-semibold text-teal-600 mb-3">
          How to Improve Loan Readiness
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Maintain proper books and records</li>
          <li>Improve bank deposits and cash reserves</li>
          <li>Reduce outstanding debt</li>
          <li>Maintain a strong DSCR and cashflow stability</li>
          <li>Ensure management and ownership practices are sound</li>
        </ul>
      </article>

    </div>
  );
}

export default Education;