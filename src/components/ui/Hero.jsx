import React, { useState } from 'react'
import LoanCategories from './LoanCategory'
import { Button, Form, Input, Modal } from 'antd'

const Hero = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <section className="text-gray-600 body-font min-h-screen">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
                        SAYLANI WELFARE TRUST
                    </h2>
                    <h1 className="sm:text-3xl text-5xl font-medium title-font mb-4 text-gray-900">
                        Microfinance Bank
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Saylani Welfare Trust's Microfinance Bank offers interest-free loans through the <string>Qarze Hasana program</string>. This program provides financial assistance to individuals and families in need, enabling them to start or grow small businesses, meet emergency expenses, and improve their livelihoods.
                    </p>
                </div>

                <div className='text-center' onClick={() => setIsModalVisible(true)}>
                    <Button type='primary' size='large'>Proceed</Button>
                </div>

                {/* <div className="flex flex-wrap">
                    <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                        Wedding Loans
                        </h2>
                        <p className="leading-relaxed text-base mb-4">
                        Start your new journey with financial peace of mind
                        </p>
                        <a className="text-indigo-500 inline-flex items-center">
                            Learn More
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>

                    
                    <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                            The Catalyzer
                        </h2>
                        <p className="leading-relaxed text-base mb-4">
                            Fingerstache flexitarian street art 8-bit waistcoat. Distillery
                            hexagon disrupt edison bulbche.
                        </p>
                        <a className="text-indigo-500 inline-flex items-center">
                            Learn More
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                    <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                            Neptune
                        </h2>
                        <p className="leading-relaxed text-base mb-4">
                            Fingerstache flexitarian street art 8-bit waistcoat. Distillery
                            hexagon disrupt edison bulbche.
                        </p>
                        <a className="text-indigo-500 inline-flex items-center">
                            Learn More
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                    <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                            Melanchole
                        </h2>
                        <p className="leading-relaxed text-base mb-4">
                            Fingerstache flexitarian street art 8-bit waistcoat. Distillery
                            hexagon disrupt edison bulbche.
                        </p>
                        <a className="text-indigo-500 inline-flex items-center">
                            Learn More
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>


                    

                </div> */}

                <LoanCategories />

                <Modal title="Enter Your Details" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
                    <Form layout="vertical">
                        <Form.Item label="CNIC" name="cnic" rules={[{ required: true, message: "Please enter your CNIC" }]}>
                            <Input placeholder="Enter your CNIC" />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: "Please enter a valid email" }]}>
                            <Input placeholder="Enter your Email" />
                        </Form.Item>
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your Name" }]}>
                            <Input placeholder="Enter your Name" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form>
                </Modal>
            </div>
        </section>

    )
}

export default Hero