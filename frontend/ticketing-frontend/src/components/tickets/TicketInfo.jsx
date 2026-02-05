import React from "react";

const TicketInfo = ({ ticket }) => {
  if (!ticket) return null;

  const statusColor = {
    TODO: "bg-gray-200 text-gray-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    PAUSED: "bg-yellow-100 text-yellow-800",
    PR_REVIEW: "bg-purple-100 text-purple-800",
    READY_TO_DEPLOY: "bg-indigo-100 text-indigo-800",
    DEPLOYED_DONE: "bg-green-100 text-green-800",
  };

  const labelColor = {
    BUG: "bg-red-100 text-red-800",
    FEATURE: "bg-green-100 text-green-800",
    TASK: "bg-gray-100 text-gray-800",
    IMPROVEMENT: "bg-blue-100 text-blue-800",
    SUPPORT: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="bg-gray-50 rounded-lg p-5 space-y-6">


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              statusColor[ticket.status] || "bg-gray-200 text-gray-800"
            }`}
          >
            {ticket.status}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Label</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              labelColor[ticket.label] || "bg-gray-200 text-gray-800"
            }`}
          >
            {ticket.label}
          </span>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* <div>
          <p className="text-sm text-gray-500">Created By</p>
          <p className="text-gray-800 font-medium">
            {ticket.createdByUser || "—"}
          </p>
        </div> */}

        <div>
          <p className="text-sm text-gray-500">Assigned To</p>
          <p className="text-gray-800 font-medium">
            {ticket.assignedToName || "Unassigned"}
          </p>
        </div>
      </div>


      <div>
        <p className="text-sm text-gray-500 mb-1">Description</p>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
          {ticket.description}
        </p>
      </div>

    </div>
  );
};

export default TicketInfo;
