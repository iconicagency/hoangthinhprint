import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hoTen, soDienThoai, sanPham, soLuong, ghiChu } = body;

    if (!hoTen?.trim() || !soDienThoai?.trim()) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ họ tên và số điện thoại.' },
        { status: 400 }
      );
    }

    if (!/^[0-9]{9,11}$/.test(soDienThoai.replace(/[\s.\-]/g, ''))) {
      return NextResponse.json(
        { error: 'Số điện thoại không hợp lệ.' },
        { status: 400 }
      );
    }

    const wpApiUrl = process.env.NEXT_PUBLIC_WP_API_URL || 'https://cms.inhoangthinh.com.vn/wp-json';
    
    let wpSent = false;
    try {
      const wpRes = await fetch(`${wpApiUrl}/custom/v1/bao-gia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hoTen, soDienThoai, sanPham, soLuong, ghiChu }),
      });
      wpSent = wpRes.ok;
    } catch {
      // WP endpoint chưa có, bỏ qua
    }

    console.log('📋 YÊU CẦU BÁO GIÁ MỚI:', {
      hoTen,
      soDienThoai,
      sanPham: sanPham || 'Chưa chọn',
      soLuong: soLuong || 'Chưa chọn',
      ghiChu: ghiChu || '',
      thoiGian: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      wpSent,
    });

    return NextResponse.json({
      success: true,
      message: 'Yêu cầu báo giá đã được gửi thành công! Chúng tôi sẽ liên hệ trong vòng 5 phút.',
    });
  } catch (error) {
    console.error('Lỗi API báo giá:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi, vui lòng gọi trực tiếp hotline.' },
      { status: 500 }
    );
  }
}
