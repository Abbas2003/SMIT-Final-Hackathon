import { Typography, Table, Tag, Select, message, Modal, Button, Descriptions, Row, Col, Card } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { AppRoutes } from "../../routes/routes";
import Cookies from "js-cookie";
import { EyeOutlined } from "@ant-design/icons";

export default function Applications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusLoading, setStatusLoading] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    

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

    const showApplicationDetails = (application) => {
        setSelectedApplication(application);
        setIsModalVisible(true);
    };

    const ApplicationDetailsModal = ({ application, visible, onClose }) => {
        if (!application) return null;
        console.log(application);
        return (
            <Modal
                title="Application Details"
                visible={visible}
                onCancel={onClose}
                width={800}
                footer={[
                    <Button key="close" onClick={onClose}>
                        Close
                    </Button>
                ]}
            >
                <div className="space-y-4">
                    {/* Loan Details */}
                    <Card title="Loan Information">
                        <Descriptions column={2}>
                            <Descriptions.Item label="Category">{application.category}</Descriptions.Item>
                            <Descriptions.Item label="Subcategory">{application.subcategory}</Descriptions.Item>
                            <Descriptions.Item label="Amount">PKR {application.amount?.toLocaleString()}</Descriptions.Item>
                            <Descriptions.Item label="Initial Deposit">PKR {application.initialDeposit?.toLocaleString()}</Descriptions.Item>
                            <Descriptions.Item label="Loan Period">{application.loanPeriod} years</Descriptions.Item>
                            <Descriptions.Item label="Status">
                                <Tag color={
                                    application.status === 'pending' ? 'gold' :
                                    application.status === 'approved' ? 'green' : 'red'
                                }>
                                    {application.status?.toUpperCase()}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Application Date">
                                {new Date(application.createdAt).toLocaleDateString()}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Applicant Details */}
                    <Card title="Applicant Information">
                        <Descriptions column={2}>
                            <Descriptions.Item label="Full Name">{application.userId?.fullName}</Descriptions.Item>
                            <Descriptions.Item label="Email">{application.userId?.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{application.userId?.mobileNo}</Descriptions.Item>
                            <Descriptions.Item label="Address">{application.userId?.address}</Descriptions.Item>
                            <Descriptions.Item label="CNIC">{application.userId?.cnic}</Descriptions.Item>
                            <Descriptions.Item label="Salary Sheet">{application.userId?.salarySheet}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Guarantors Information */}
                    <Card title="Guarantors Information">
                        {application.guarantors?.map((guarantor, index) => (
                            <div key={index} className="mb-4 p-4 border rounded">
                                <Descriptions column={2}>
                                    <Descriptions.Item label="Name">{guarantor.name}</Descriptions.Item>
                                    <Descriptions.Item label="Email">{guarantor.email}</Descriptions.Item>
                                    <Descriptions.Item label="CNIC">{guarantor.cnic}</Descriptions.Item>
                                    <Descriptions.Item label="Location">{guarantor.location}</Descriptions.Item>
                                </Descriptions>
                            </div>
                        ))}
                    </Card>
                </div>
            </Modal>
        );
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
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button 
                    type="primary" 
                    icon={<EyeOutlined />}
                    onClick={() => showApplicationDetails(record)}
                >
                    View Details
                </Button>
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
            <ApplicationDetailsModal
                application={selectedApplication}
                visible={isModalVisible}
                onClose={() => {
                    setIsModalVisible(false);
                    setSelectedApplication(null);
                }}
            />
        </section>
    );
}