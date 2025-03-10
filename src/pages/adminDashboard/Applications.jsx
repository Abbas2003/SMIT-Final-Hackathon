import { Typography, Table, Tag, Select, message, Modal, Button, Descriptions, Row, Col, Card, Form } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { AppRoutes } from "../../routes/routes";
import Cookies from "js-cookie";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";

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
        const [currentStep, setCurrentStep] = useState('details'); // 'details' or 'schedule'
        const [loading, setLoading] = useState(false);

        if (!application) return null;

        const handleScheduleAppointment = async (values) => {
            setLoading(true);
            try {
                const appointmentData = {
                    loanId: application._id,
                    date: values.date.format('YYYY-MM-DD'),
                    time: values.time.format('HH:mm'),
                    officeLocation: values.location,
                    userId: application.userId._id
                };
                console.log("AppointmentData->", appointmentData);
                

                const response = await axios.post(
                    AppRoutes.scheduleAppointment,
                    appointmentData,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("token")}`
                        }
                    }
                );

                if (response.status === 200) {
                    message.success('Appointment scheduled successfully');
                    onClose();
                }
            } catch (error) {
                console.error('Error scheduling appointment:', error);
                message.error('Failed to schedule appointment');
            } finally {
                setLoading(false);
            }
        };

        const renderSchedulingForm = () => {
            const officeLocations = [
                { id: 1, name: 'Main Bahadurabad Campus' },
                { id: 2, name: 'Gulshan Campus' },
                { id: 3, name: 'Malir Campus' },
                { id: 4, name: 'Numaish Campus' },
            ];

            return (
                <Form
                    id="appointmentForm"
                    layout="vertical"
                    onFinish={handleScheduleAppointment}
                >
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: 'Please select a date' }]}
                    >
                        <DatePicker 
                            className="w-full"
                            disabledDate={(current) => {
                                return current && current.valueOf() < Date.now();
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Time"
                        name="time"
                        rules={[{ required: true, message: 'Please select a time' }]}
                    >
                        <TimePicker 
                            className="w-full"
                            format="HH:mm"
                            minuteStep={30}
                            showNow={false}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Office Location"
                        name="location"
                        rules={[{ required: true, message: 'Please select a location' }]}
                    >
                        <Select placeholder="Select office location">
                            {officeLocations.map(location => (
                                <Select.Option key={location.id} value={location.name}>
                                    {location.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            );
        };

        const modalFooter = currentStep === 'details' ? [
            <Button 
                key="schedule" 
                type="primary" 
                onClick={() => setCurrentStep('schedule')}
                style={{ marginRight: 8 }}
                disabled={application.status !== 'approved'}
            >
                Schedule Appointment
            </Button>,
            <Button key="close" onClick={onClose}>
                Close
            </Button>
        ] : [
            <Button 
                key="back" 
                onClick={() => setCurrentStep('details')}
                style={{ marginRight: 8 }}
            >
                Back
            </Button>,
            <Button 
                key="submit" 
                type="primary" 
                form="appointmentForm"
                htmlType="submit"
                loading={loading}
            >
                Schedule
            </Button>
        ];

        return (
            <Modal
                title={currentStep === 'details' ? "Application Details" : "Schedule Appointment"}
                open={visible}
                onCancel={onClose}
                width={800}
                footer={modalFooter}
            >
                {currentStep === 'details' ? (
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
                                <Descriptions.Item label="Salary Sheet"><Link to={application.userId?.salarySheet} target="_blank">link</Link></Descriptions.Item>
                            </Descriptions>
                        </Card>

                        {/* Guarantors Information */}
                        <Card title="Guarantors Information">
                            {application.userId.guarantors?.map((guarantor, index) => (
                                <div key={index} className="mb-4 p-4 border rounded">
                                    <Descriptions column={2}>
                                        <Descriptions.Item label="Name">{guarantor.name}</Descriptions.Item>
                                        <Descriptions.Item label="Email">{guarantor.email}</Descriptions.Item>
                                        <Descriptions.Item label="CNIC">{guarantor.cnic}</Descriptions.Item>
                                        <Descriptions.Item label="Location">{guarantor.location}</Descriptions.Item>
                                        <Descriptions.Item label="Relation">{guarantor.relation}</Descriptions.Item>
                                    </Descriptions>
                                </div>
                            ))}
                        </Card>
                    </div>
                ) : (
                    renderSchedulingForm()
                )}
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