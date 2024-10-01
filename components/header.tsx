import { Card } from 'antd';

export default function Header() {
  return (
    <Card title="ยินดีต้อนรับสู่คลีนิคของเรา" bordered={false} className="w-full max-w-md md:max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-6">แบบฟอร์มประวัติผู้ใช้บริการคลีนิค</h1>
      <span className="mr-2">กรุณากรอกข้อมูลรายละเอียดให้ครบถ้วน</span>
    </Card>
  );
}
