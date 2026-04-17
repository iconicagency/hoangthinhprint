export async function fetchWP(query: string, { variables }: { variables?: any } = {}) {
  // Biến môi trường này sẽ chứa đường dẫn tới API của WordPress
  // Ví dụ: https://admin.inhoangthinh.com/graphql
  const wpUrl = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL;

  if (!wpUrl) {
    console.warn("Chưa cấu hình NEXT_PUBLIC_WP_GRAPHQL_URL. Đang dùng dữ liệu mẫu.");
    return { data: null };
  }

  const headers = { 'Content-Type': 'application/json' };

  try {
    const res = await fetch(wpUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      // Cache dữ liệu 60 giây để web siêu nhanh, chỉ gọi lại WP khi hết hạn
      next: { revalidate: 60 },
    });

    const json = await res.json();
    if (json.errors) {
      console.error("Lỗi từ WordPress API:", json.errors);
      throw new Error('Failed to fetch from WordPress API');
    }

    return json.data;
  } catch (error) {
    console.error("Lỗi kết nối tới WordPress:", error);
    return null;
  }
}

// Hàm ví dụ để lấy dữ liệu Trang Chủ từ WordPress (sẽ hoạt động khi bạn cài đặt xong)
export async function getHomePageData() {
  const query = `
    query GetHomePage {
      page(id: "trang-chu", idType: URI) {
        title
        homeFields {
          heroTitle
          heroSubtitle
          stats {
            number
            label
          }
          // ... Các trường dữ liệu khác
        }
      }
    }
  `;
  const data = await fetchWP(query);
  return data?.page?.homeFields;
}
