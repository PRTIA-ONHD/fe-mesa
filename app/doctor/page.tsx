"use client";
import { Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from 'antd';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

interface FormDoctorValues {
  firstName: string;
  lastName: string;
  clinicName: string;
  phoneNumber: string;
  email: string;
}

export default function Doctor() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [doctorValues, setdoctorValues] = useState<FormDoctorValues>({
    firstName: '',
    lastName: '',
    clinicName: '',
    phoneNumber: '',
    email: '',
  });

  const searchParams = useSearchParams();

  // ดึงข้อมูลจาก query string
  const formData = Object.fromEntries(searchParams.entries());
  // console.log('Received pat and owner form data: ', formData);

  useEffect(() => {
    const savedForm = localStorage.getItem('doctorValues');
    if (savedForm) {
      const parsedValues = JSON.parse(savedForm);
      setdoctorValues(parsedValues);
      form.setFieldsValue(parsedValues);
    }
  }, [form]);

  const onFinish = async (values: FormDoctorValues) => {
    console.log('Form data saved: ', { ...values });
    message.success('Form saved successfully!');
    localStorage.setItem('doctorValues', JSON.stringify(values));

    const combinedValues = { ...formData, ...values };
    console.log('Combined all form data: ', combinedValues);

    try {
      const response = await axios.post('http://localhost:3030', combinedValues);

      if (response.status === 200) {
        console.log('API Response:', response.data);
        message.success('Form submitted successfully!');
        router.push('/');
      } else {
        message.error('Error submitting the form');
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('API call failed:', error);
      message.error('Failed to submit form. Please try again.');
    }
    router.push('/');
  };


  return (

    <div className="flex flex-col items-center p-4 sm:p-2 md:p-4 bg-green-100">
      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">ข้อมูลหมอผู้ดูแล</h1>
        <div>
          <Form
            form={form}
            name="trigger"
            style={{ maxWidth: 600 }}
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            initialValues={doctorValues}
          >
            <Form.Item
              hasFeedback
              label="ชื่อจริง (Firstname)"
              name="firstNameDoctor"
              validateTrigger="onChange"
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
              name="lastNameDoctor"
              validateTrigger="onChange"
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
              label="ชื่อคลีนิค (clinic Name)"
              name="clinicName"
              validateTrigger="onChange"
              rules={[
                {
                  required: true,
                  message: 'โปรดระบุชื่อคลีนิค',
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
              <Input placeholder="clinic Name" />
            </Form.Item>

            <Form.Item
              hasFeedback
              label="เบอร์โทร (Phone Number)"
              name="phoneNumberDoctor"
              validateTrigger="onChange"
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
              name="emailDoctor"
              validateTrigger="onChange"
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
                <Link href={"/owner"}>
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
                  Submit
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>

  );
}
