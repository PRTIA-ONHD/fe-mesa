"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Select, Button, Space, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { Card } from 'antd';

interface FormPetValues {
  petName: string;
  ageYear: number;
  agemonth: number;
  species: string;
  breed: string;
  gender: string;
  birthdate: string;
  color: string;
  otherData: string;
  file?: UploadFile | null;
}

export default function Pet() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [petValues, setpetValues] = useState<FormPetValues>({
    petName: '',
    ageYear: 0,
    agemonth: 0,
    species: '',
    breed: '',
    gender: '',
    birthdate: '',
    color: '',
    otherData: '',
    file: null,
  });

  useEffect(() => {
    const savedData = localStorage.getItem('petValues');
    if (savedData) {
      setpetValues(JSON.parse(savedData));
    }
  }, []);

  const onFinish = (values: FormPetValues) => {
    console.log('Form data saved: ', { ...values });
    message.success('Form saved successfully!');
    localStorage.setItem('petValues', JSON.stringify(values));

    const { ...otherValues } = values;  
    const queryParams = new URLSearchParams(otherValues as any).toString();

    router.push(`/owner?${queryParams}`);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { Option } = Select;

  const handleFileChange = (info: any) => {
    const { fileList } = info;
    setFileList(fileList);
    if (fileList.length > 0) {
      setpetValues((prevData) => ({
        ...prevData,
        file: fileList[0],
      }));
    }
  };

  const props: UploadProps = {
    beforeUpload(file: RcFile) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement('img');
          img.src = reader.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = 'red';
            ctx.textBaseline = 'middle';
            ctx.font = '33px Arial';
            ctx.fillText('Ant Design', 20, 20);
            canvas.toBlob((result) => resolve(result as Blob));
          };
        };
      });
    },
    onChange: handleFileChange,
    fileList,
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-2 md:p-4 bg-green-100">
      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">ข้อมูลสัตว์เลี้ยง</h1>
        <Form
          name="trigger"
          style={{ maxWidth: 600 }}
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          initialValues={petValues}
        >
          <Form.Item
            hasFeedback
            label="ชื่อสัตว์ (Pet Name)"
            name="petName"
            rules={[
              {
                required: true,
                message: 'โปรดระบุชื่อ'
              },
              {
                pattern: /^[ก-ฮA-Za-z\u0E00-\u0E7F\s]+$/,
                message: 'กรุณากรอกชื่อในรูปแบบตัวอักษรเท่านั้น'
              },
              {
                max: 150,
                message: 'ชื่อของสัตว์เลี้ยงต้องไม่เกิน 150 ตัวอักษร!'
              },
            ]}
          >
            <Input placeholder="Pet Name"
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="อายุ-ปี (Age-year)"
            name="age"
            rules={[
              {
                required: true,
                message: 'โปรดกรอกตัวเลข'
              },
              {
                pattern: /^[0-9]+$/,
                message: 'โปรดกรอกตัวเลข'
              },
              {
                max: 2,
                message: 'ตัวเลขต้องไม่เกิน 2 หลัก'
              },
            ]}
          >
            <Input placeholder="Age-year"
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="อายุ-เดือน (Age-month)"
            name="month"
            rules={[
              {
                required: true,
                message: 'Age-month'
              },
              {
                pattern: /^[0-9]+$/,
                message: 'โปรดกรอกตัวเลข'
              },
              {
                max: 2,
                message: 'ตัวเลขต้องไม่เกิน 2 หลัก'
              },
            ]}
          >
            <Input placeholder="Age-month"
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="ชนิดสัตว์ (Species)"
            name="species"
            rules={[
              {
                required: true,
                message: 'โปรดระบุชนิด'
              },
              {
                pattern: /^[ก-ฮA-Za-z\u0E00-\u0E7F\s]+$/,
                message: 'กรุณากรอกชื่อในรูปแบบตัวอักษรเท่านั้น!'
              },
              {
                max: 150,
                message: 'ชื่อของสัตว์เลี้ยงต้องไม่เกิน 150 ตัวอักษร!'
              },
            ]}
          >
            <Input placeholder="Species" />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="สายพันธุ์ (Breed)"
            name="breed"
            rules={[
              { required: true, message: 'โปรดระบุสายพันธุ์' },
              { pattern: /^[ก-ฮA-Za-z\u0E00-\u0E7F\s]+$/, message: 'กรุณากรอกชื่อในรูปแบบตัวอักษรเท่านั้น!' },
              { max: 150, message: 'ชื่อของสัตว์เลี้ยงต้องไม่เกิน 150 ตัวอักษร!' },
            ]}
          >
            <Input placeholder="Breed" />
          </Form.Item>

          <Form.Item
            label="เพศ (Gender)"
            name="gender"
            rules={[{ required: true, message: 'โปรดเลือกเพศ' }]}
          >
            <Select placeholder="เลือกเพศ">
              <Option value="m">ชาย</Option>
              <Option value="f">หญิง</Option>
            </Select>
          </Form.Item>

          <Form.Item
            hasFeedback
            label="วันเดือนปี เกิด (YYYY/MM/DD)"
            name="birthdate"
            rules={[
              {
                required: true,
                message: 'โปรดระบุวันเกิด',
              },
              {
                pattern: /^[0-9/]+$/,
                message: 'กรุณากรอกชื่อในรูปแบบตัวอักษรเท่านั้น!',
              },
              {
                max: 12,
                message: 'ตัวเลขต้องไม่เกิน 10 หรือ 12 ตัว',
              },
            ]}
          >
            <Input placeholder="Birthday" />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="สี (Color)"
            name="color"
            rules={[
              {
                required: true,
                message: 'โปรดระบุสีหรือลาย'
              },
              {
                pattern: /^[ก-ฮA-Za-z\u0E00-\u0E7F\s]+$/,
                message: 'กรุณากรอกชื่อในรูปแบบตัวอักษรเท่านั้น!'
              },
              {
                max: 150,
                message: 'ชื่อของสัตว์เลี้ยงต้องไม่เกิน 150 ตัวอักษร!'
              },
            ]}
          >
            <Input placeholder="Color" />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="ข้อมูลเพิ่มเติม(Other Data)"
            name="otherData"
            rules={[
              {
                max: 150,
                message: 'ข้อมูลอื่นๆ ต้องไม่เกิน 150 ตัวอักษร!'
              },
            ]}
          >
            <Input.TextArea
              placeholder="Other Data"
              autoSize={{
                minRows: 1,
                maxRows: 5
              }} />
          </Form.Item>

          <Space>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Space>

          <Form.Item>
            <div className="flex justify-end max-w-lg w-full text-black ">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                type="submit"
              >
                Next
              </button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
