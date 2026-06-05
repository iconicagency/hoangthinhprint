import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hoTen, soDienThoai, sanPham, soLuong, ghiChu, name, phone, message, product } = body;

    // Support ca 2 format form (QuoteForm va PromoPopup)
    const tenKhach = hoTen || name || '';
    const sdt = soDienThoai || phone || '';
    const sp = sanPham || product || '';
    const sl = soLuong || '';
    const gc = ghiChu || message || '';

    if (!tenKhach?.trim() || !sdt?.trim()) {
      return NextResponse.json(
        { error: 'Vui long dien day du ho ten va so dien thoai.' },
        { status: 400 }
      );
    }

    const thoiGian = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const results: any = {};

    // 1. Gui email qua Resend
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.RESEND_TO_EMAIL || 'cuonghm8668@gmail.com';

    if (resendKey) {
      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Bao Gia In Hoang Thinh <onboarding@resend.dev>',
            to: [toEmail],
            subject: `[YEU CAU BAO GIA] ${tenKhach} - ${sdt}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #c0392b; border-bottom: 2px solid #c0392b; padding-bottom: 10px;">
                  YEU CAU BAO GIA MOI
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="background: #f8f8f8;">
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 150px;">Ho va ten</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${tenKhach}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">So dien thoai</td>
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong style="color: #c0392b;">${sdt}</strong></td>
                  </tr>
                  <tr style="background: #f8f8f8;">
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">San pham</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${sp || 'Chua chon'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">So luong</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${sl || 'Chua chon'}</td>
                  </tr>
                  <tr style="background: #f8f8f8;">
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Ghi chu</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${gc || 'Khong co'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Thoi gian</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${thoiGian}</td>
                  </tr>
                </table>
                <p style="margin-top: 20px; color: #666; font-size: 12px;">
                  Email nay duoc gui tu form bao gia tren inhoangthinh.com.vn
                </p>
              </div>
            `,
          }),
        });
        results.email = emailRes.ok ? 'sent' : `failed: ${emailRes.status}`;
      } catch (e: any) {
        results.email = `error: ${e?.message}`;
      }
    } else {
      results.email = 'no_api_key';
    }

    // 2. Luu vao WordPress CPT bao_gia
    const wpUrl = process.env.WP_API_URL || 'https://cms.inhoangthinh.com.vn/wp-json';
    const wpUser = process.env.WP_API_USER;
    const wpPass = process.env.WP_API_PASSWORD;

    if (wpUser && wpPass) {
      try {
        const credentials = Buffer.from(`${wpUser}:${wpPass}`).toString('base64');

        // Tao post
        const wpRes = await fetch(`${wpUrl}/wp/v2/bao_gia`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: `${tenKhach} - ${sdt} - ${thoiGian}`,
            status: 'publish',
            meta: {
              ho_ten: tenKhach,
              so_dien_thoai: sdt,
              san_pham: sp,
              so_luong: sl,
              ghi_chu: gc,
              trang_thai: 'moi',
              thoi_gian: thoiGian,
            },
          }),
        });

        if (wpRes.ok) {
          const wpData = await wpRes.json();
          results.wp = `saved: ID ${wpData.id}`;
        } else {
          const errText = await wpRes.text();
          results.wp = `failed: ${wpRes.status} - ${errText.slice(0, 100)}`;
        }
      } catch (e: any) {
        results.wp = `error: ${e?.message}`;
      }
    } else {
      results.wp = 'no_credentials';
    }

    console.log('BAO GIA:', { tenKhach, sdt, sp, sl, thoiGian, results });

    return NextResponse.json({
      success: true,
      message: 'Yeu cau bao gia da duoc gui thanh cong! Chung toi se lien he trong vong 5 phut.',
      results,
    });

  } catch (error) {
    console.error('Loi API bao gia:', error);
    return NextResponse.json(
      { error: 'Da xay ra loi, vui long goi truc tiep hotline.' },
      { status: 500 }
    );
  }
}
