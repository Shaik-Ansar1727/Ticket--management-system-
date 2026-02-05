import React, { useState } from "react";
import { Select, Button, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
    updateTicketStatusApi,
    deleteTicketApi,
} from "../../api/ticket.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";




const getAllowedStatuses = (currentStatus, role) => {
    if (currentStatus === "DEPLOYED_DONE") return [];

    const employeeStatuses = [
        "TODO",
        "PAUSED",
        "IN_PROGRESS",
        "PR_REVIEW",
    ];

    const adminOnlyStatuses = [
        "READY_TO_DEPLOY",
        "DEPLOYED_DONE",
    ];

    return role === "ADMIN"
        ? [...employeeStatuses, ...adminOnlyStatuses]
        : employeeStatuses;
};

const TicketActions = ({ ticket, role, onStatusUpdated }) => {

    const queryClient = useQueryClient();

    if (!ticket) return null;

    const navigate = useNavigate();

    const [status, setStatus] = useState(ticket.status);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const statusOptions = getAllowedStatuses(ticket.status, role).map((s) => ({
        label: s.replace(/_/g, " "),
        value: s,
    }));

    const updateStatusMutation = useMutation({
        mutationFn: (newStatus) =>
            updateTicketStatusApi(ticket.id, newStatus),

        onSuccess: () => {
            message.success("Status updated");
            queryClient.invalidateQueries({
                queryKey: ["ticket", ticket.id],
            });
        },

        onError: (error) => {
            message.error(
                error?.response?.data?.message || "Failed to update status"
            );
        },
    });


    return (
        <>
           

            {ticket.status === "DEPLOYED_DONE" && role !== "ADMIN" ? (
                <p style={{ color: "gray" }}>
                    This ticket is completed and cannot be modified.
                </p>
            ) : (
                <>

                    <Select
                        value={status}
                        options={statusOptions}
                        onChange={setStatus}
                        style={{ width: 220 }}
                    />

                    <br /><br />

                    <Button
                        type="primary"
                        onClick={() => updateStatusMutation.mutate(status)}
                        disabled={status === ticket.status}
                    >
                        Update Status
                    </Button>


                    {role === "ADMIN" && (
                        <Button
                            danger
                            style={{ marginLeft: 8 }}
                            onClick={() => setIsDeleteOpen(true)}
                        >
                            Delete Ticket
                        </Button>
                    )}

                    <Modal
                        title="Delete Ticket"
                        open={isDeleteOpen}
                        onCancel={() => setIsDeleteOpen(false)}
                        destroyOnHidden
                        okText="Delete"
                        okButtonProps={{ danger: true }}
                        onOk={async () => {
                            try {
                                await deleteTicketApi(ticket.id);
                                message.success("Ticket deleted successfully");
                                navigate("/dashboard/tickets");
                            } catch (error) {
                                message.error(
                                    error.response?.data?.message ||
                                    "Failed to delete ticket"
                                );
                            }
                        }}
                    >
                        <p>Are you sure you want to delete this ticket?</p>
                        <p>This action cannot be undone.</p>
                    </Modal>
                </>
            )}
        </>
    );
};

export default TicketActions;
