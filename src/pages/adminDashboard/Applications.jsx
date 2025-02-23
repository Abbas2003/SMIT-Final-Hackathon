import { Typography, Table, Tag, Select, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { AppRoutes } from "../../routes/routes";
import Cookies from "js-cookie";

export default function Applications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusLoading, setStatusLoading] = useState(null); // To track which row is updating
    

    const handleStatusChange = async (newStatus, applicationId) => {
        setStatusLoading(applicationId);
        try {
            const response = await axios.put(
                `${AppRoutes.updateLoanStatus}/${applicationId}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    }
                }
            );

            if (response.status === 200) {
                // Update the local state to reflect the change
                setApplications(applications.map(app => 
                    app._id === applicationId 
                        ? { ...app, status: newStatus }
                        : app
                ));
                message.success('Status updated successfully');
            } else {
                message.error('Failed to update status');
            }
        } catch (error) {
            console.error("Error updating status:", error);
            message.error('Failed to update status');
        } finally {
            setStatusLoading(null);
        }
    };

    const columns = [
        {
            title: 'Applicant Name',
            dataIndex: ['userId', 'fullName'],
            key: 'fullName',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Subcategory',
            dataIndex: 'subcategory',
            key: 'subcategory',
        },
        {
            title: 'Amount (PKR)',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => amount.toLocaleString(),
        },
        {
            title: 'Application Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Select
                    value={status}
                    style={{ width: 120 }}
                    onChange={(newStatus) => handleStatusChange(newStatus, record._id)}
                    loading={statusLoading === record._id}
                    disabled={statusLoading === record._id}
                >
                    <Select.Option value="pending">
                        <Tag color="gold">PENDING</Tag>
                    </Select.Option>
                    <Select.Option value="approved">
                        <Tag color="green">APPROVED</Tag>
                    </Select.Option>
                    <Select.Option value="rejected">
                        <Tag color="red">REJECTED</Tag>
                    </Select.Option>
                </Select>
            ),
        },
        
    ];

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(AppRoutes.getAllLoanRequests, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    }
                });
                setApplications(response.data.data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    return(
        <section className="p-6">
            <Typography.Title level={1}>Loan Applications</Typography.Title>
            <Table 
                columns={columns}
                dataSource={applications}
                rowKey="_id"
                loading={loading}
                scroll={{ x: true }}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total, range) => 
                        `${range[0]}-${range[1]} of ${total} applications`,
                }}
            />
        </section>
    );
}