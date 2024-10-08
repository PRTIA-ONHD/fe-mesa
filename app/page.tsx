"use client";
import Link from 'next/link';
import { Card } from 'antd';
import Image from 'next/image';

export default function Home() {

  return (
    <div className="flex flex-col items-center p-4 sm:p-2 md:p-4 bg-green-100">
      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">ยินดีต้อนรับสู่คลินิกของเรา</h3>
        <div className="w-full mb-4">
          <Image
            src="/clinic.jpg"
            layout="responsive"
            width={500}
            height={500}
            alt="clinic logo"
            className="rounded-md"
          />
        </div>
        <div>
          <br />
          <p className="mt-2 text-base md:text-lg">
            เราขอขอบคุณที่ไว้วางใจและเลือกใช้บริการของเรา<br />
            กรุณากรอกข้อมูลในแบบฟอร์มด้านล่างเพื่อให้เราสามารถให้บริการที่ดีที่สุดแก่คุณ
          </p>
          <br />
          <h4 className="text-lg md:text-xl font-semibold">คำแนะนำในการกรอกข้อมูล</h4>
          <p className="mt-2 text-base md:text-lg">
            โปรดกรอกข้อมูลในช่องที่ระบุให้ครบถ้วน<br />
            ข้อมูลของคุณจะถูกเก็บเป็นความลับ<br />
            และใช้เพื่อการให้บริการที่มีประสิทธิภาพที่สุด<br />
            หากมีคำถามหรือต้องการความช่วยเหลือ <br />
            สามารถติดต่อได้ที่เคาท์เตอร์
          </p>
        </div>
        <div className="flex justify-end mt-6">
          <Link href={"/pet"}>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              เริ่มกรอกข้อมูล
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
