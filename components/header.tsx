import { Card } from 'antd';

export default function Header() {
  return (
    <Card
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
    >
      <h3 className="text-xl sm:text-2xl font-semibold mb-4">
        ยินดีต้อนรับสู่คลินิกของเรา
      </h3>
      <h1 className="text-lg sm:text-xl font-bold mb-6">
        แบบฟอร์มประวัติผู้ใช้บริการคลินิก
      </h1>
      <p className="text-sm sm:text-base">
        กรุณากรอกข้อมูลรายละเอียดให้ครบถ้วน
      </p>
    </Card>
  );
}