export async function fetchWP(query: string, { variables }: { variables?: any } = {}) {
  // Biến môi trường hoặc fix cứng khi đang test
  const wpUrl = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "https://cms.inhoangthinh.com.vn/graphql";

  const headers = { 'Content-Type': 'application/json' };

  try {
    // [QUAN TRỌNG] Xử lý lỗi CORS: Nếu đang chạy trên Trình duyệt, kết nối phải đi đường vòng qua Next.js Server (Proxy)
    if (typeof window !== 'undefined') {
      const res = await fetch('/api/graphql-proxy', {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables }),
        cache: 'no-store',
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json.data;
    }

    // Nếu đang chạy trên Server Next.js, kết nối thẳng tới WordPress siêu nhanh
    const res = await fetch(wpUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      // Bỏ cache khi đang test
      cache: 'no-store',
    });

    if (!res.ok) {
       console.error("Mạng kết nối tới WP lỗi. Status:", res.status);
       return null;
    }

    const json = await res.json();
    if (json.errors) {
      // Ẩn log lỗi GraphQL "Cannot query field" để giảm spam console khi đang cài đặt ACF bên WordPress
      const isSchemaError = json.errors.some((err: any) => err.message.includes('Cannot query field'));
      if (!isSchemaError) {
        console.error("Lỗi từ WordPress API:", JSON.stringify(json.errors, null, 2));
      }
      return null;
    }

    return json.data;
  } catch (error) {
    console.error("Lỗi kết nối tới WordPress hoặc Proxy:", error);
    return null;
  }
}

// Lấy danh sách chuyên mục (Categories)
export async function getCategories() {
  const query = `
    query GetCategories {
      categories(first: 20) {
        nodes {
          name
          slug
          count
        }
      }
    }
  `;
  const data = await fetchWP(query);
  return data?.categories?.nodes || [];
}

// Lấy danh sách bài viết (Tin Tức) với số lượng tùy chỉnh
export async function getPosts(first = 10) {
  const query = `
    query GetPosts($first: Int!) {
      posts(first: $first, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          id
          title
          excerpt
          date
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { first } });
  return data?.posts?.nodes || [];
}

// Lấy 3 bài viết mới nhất phục vụ cho Block Tin tức (Blog)
export async function getRecentPosts() {
  return getPosts(3);
}

// Lấy danh sách Dự Án (Post Type: du_an)
export async function getProjects() {
  const query = `
    query GetProjects {
      cacDuAn(first: 8, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          id
          title
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
          thongtinduan {
            nhanHienThi
          }
        }
      }
    }
  `;
  const data = await fetchWP(query);
  return data?.cacDuAn?.nodes || [];
}

// Lấy Chi Tiết Bài Viết (Tin Tức)
export async function getPostBySlug(slug: string) {
  const query = `
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { id: slug } });
  return data?.post;
}

// Lấy Chi Tiết Dự Án
export async function getProjectBySlug(slug: string) {
  const query = `
    query GetProjectBySlug($id: ID!) {
      duAn(id: $id, idType: SLUG) {
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        thongtinduan {
          nhanHienThi
        }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { id: slug } });
  return data?.duAn;
}

// Lấy Dữ liệu Trang Chủ (ACF Option trang chủ)
export async function getHomePageData() {
  const query = `
    query GetHomePageData {
      page(id: "trang-chu", idType: URI) {
        cauHinhTrangChu {
          heroTagline
          heroTitle
          heroSubtitle
          heroSlides {
            nodes {
              sourceUrl
            }
          }
          heroBenefits {
            benefitText
          }
          baoGiaHotline
          stats {
            number
            suffix
            label
          }
          partners {
            partnerName
          }
        }
      }
    }
  `;
  const data = await fetchWP(query);
  return data?.page?.cauHinhTrangChu;
}
