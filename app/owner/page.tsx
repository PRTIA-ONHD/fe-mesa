"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, message } from 'antd';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface FormOwnerValues {
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    email: string;
}

export default function Owner() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [ownerValues, setOwnerValues] = useState<FormOwnerValues>({
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        email: '',
    });
    const searchParams = useSearchParams();

    // ดึงข้อมูลจาก query string
    const formDataPet = Object.fromEntries(searchParams.entries());
    //   console.log('Received pet form data: ', formDataPet);

    useEffect(() => {
        const savedValues = localStorage.getItem('ownerValues');
        if (savedValues) {
            const parsedValues = JSON.parse(savedValues);
            setOwnerValues(parsedValues);
            form.setFieldsValue(parsedValues);
        }
    }, [form]);

    const onFinish = (values: FormOwnerValues) => {
        console.log('Form data saved: ', { ...values });
        message.success('Form saved successfully!');
        localStorage.setItem('ownerValues', JSON.stringify(values));

        const combinedValues = { ...formDataPet, ...values };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const queryParams = new URLSearchParams(combinedValues as any).toString();
        router.push(`/doctor?${queryParams}`);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-green-100 space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full text-black">
                <h1 className="text-2xl font-bold mb-6">ข้อมูลเจ้าของสัตว์เลี้ยง</h1>
                <Form
                    form={form}
                    name="trigger"
                    style={{ maxWidth: 600 }}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}
                    initialValues={ownerValues}
                >
                    <Form.Item
                        hasFeedback
                        label="ชื่อจริง (Firstname)"
                        name="firstNameOwner"
                        rules={[
                            {
                                required: true,
                                message: 'โปรดระบุชื่อ',
                            },
                            {
                                pattern: /^[ก-ฮA-Za-z\u0E00-\u0E7F\s]+$/,
                                message: 'กรุณากรอกชื่อในรูปแบบตัวอักษรเท่านั้น!',
                            },
                            {
                                max: 150,
                                message: 'ตัวอักษรต้องไม่เกิน 150 ตัว',
                            },
                        ]}
                    >
                        <Input placeholder="Firstname" />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="นามสกุล (Lastname)"
                        name="lastNameOwner"
                        rules={[
                            {
                                required: true,
                                message: 'โปรดระบุนามสกุล',
                            },
                            {
                                pattern: /^[ก-ฮA-Za-z\u0E00-\u0E7F\s]+$/,
                                message: 'กรุณากรอกชื่อในรูปแบบตัวอักษรเท่านั้น!',
                            },
                            {
                                max: 150,
                                message: 'ตัวอักษรต้องไม่เกิน 150 ตัว',
                            },
                        ]}
                    >
                        <Input placeholder="Lastname" />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="ที่อยู่ (Address)"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'โปรดระบุที่อยู่',
                            },
                            {
                                pattern: /^[ก-ฮA-Za-z\u0E00-\u0E7F\s]+$/,
                                message: 'กรุณากรอกชื่อในรูปแบบตัวอักษรเท่านั้น!',
                            },
                            {
                                max: 255,
                                message: 'ตัวอักษรต้องไม่เกิน 255 ตัว',
                            },
                        ]}
                    >
                        <Input placeholder="Address" />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="เบอร์โทร (Phone Number)"
                        name="phoneNumberOwner"
                        rules={[
                            {
                                required: true,
                                message: 'โปรดระบุเบอร์โทร',
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'กรุณากรอกชื่อในรูปแบบตัวอักษรเท่านั้น!',
                            },
                            {
                                max: 12,
                                message: 'ตัวเลขต้องไม่เกิน 10 หรือ 12 ตัว',
                            },
                        ]}
                    >
                        <Input placeholder="Phone Number" />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="อีเมล (Email)"
                        name="emailOwner"
                        rules={[
                            {
                                required: true,
                                message: 'โปรดระบุอีเมล',
                            },
                            {
                                type: 'email',
                                message: 'กรุณากรอกชื่อในรูปแบบตัวอักษรเท่านั้น!',
                            },
                            {
                                max: 255,
                                message: 'ตัวอักษรต้องไม่เกิน 255 ตัว',
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item>
                        <div className="flex justify-between max-w-lg w-full text-black ">
                            <Link href={"/pet"}>
                                <button
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Back
                                </button>
                            </Link>

                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                                type="submit"
                            >
                                Next
                            </button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
