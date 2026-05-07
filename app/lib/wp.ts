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
      // Revert về cache: no-store để cập nhật tức thì
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

// Lấy nội dung chi tiết của một trang theo Slug/URI
export async function getPageBySlug(slug: string) {
  const query = `
    query GetPageBySlug($id: ID!) {
      page(id: $id, idType: URI) {
        title
        content
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { id: slug } });
  return data?.page;
}

// Lấy dữ liệu trang Giới thiệu (bao gồm ACF nếu có)
export async function getAboutPageData() {
  const query = `
    query GetAboutPageData {
      page(id: "gioi-thieu", idType: URI) {
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        cauHinhTrangGioiThieu {
          heroTitle
          heroSubtitle
          storyTitle
          storyContent
          storyImage {
            node {
              sourceUrl
            }
          }
          visionTitle
          visionContent
          missionTitle
          missionContent
          stats {
            number
            label
          }
          productionCapacityTitle
          productionCapacityDescription
          productionImages {
            nodes {
              sourceUrl
            }
          }
          productionFacilities {
            title
            description
            icon
          }
          benefits {
            title
            description
          }
          coreValues {
            title
            description
          }
          servicesTitle
          servicesList {
            title
            description
            image {
              node {
                sourceUrl
              }
            }
          }
          commitmentsTitle
          commitmentsList {
            title
            description
            icon
          }
          ctaTitle
          ctaDescription
          contactAddress
          contactHotline
          contactEmail
          contactImages {
            nodes {
              sourceUrl
            }
          }
        }
      }
    }
  `;
  const data = await fetchWP(query);
  return data?.page;
}

// Lấy dữ liệu trang Ngành hàng
export async function getNganhHangPageData() {
  const query = `
    query GetNganhHangPageData {
      page(id: "nganh-hang", idType: URI) {
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        cauHinhTrangNganhHang {
          heroTitle
          heroSubtitle
          danhSachNganhHang {
            title
            description
            icon
            link
            image {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;
  const data = await fetchWP(query);
  return data?.page;
}

// Lấy dữ liệu trang chi tiết Ngành hàng (VD: tpcn-duoc-pham)
export async function getIndustryPageData(uri: string) {
  const query = `
    query GetIndustryPageData($uri: ID!) {
      page(id: $uri, idType: URI) {
        title
        content
        cauHinhChiTietNganhHang {
          heroTitle
          heroSubtitle
          introTitle
          introContent
          whyTitle
          whyList {
            item
          }
          productsTitle
          productsList {
            title
            description
            link
          }
          pricingText
          sampleImages {
            nodes {
              sourceUrl
            }
          }
          faqTitle
          faqs {
            question
            answer
          }
        }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { uri } });
  return data?.page;
}

// Lấy chi tiết bài viết theo Slug
export async function getPostBySlug(slug: string) {
  const query = `
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        content
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
  `;
  const data = await fetchWP(query, { variables: { id: slug } });
  return data?.post;
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

// Lấy chi tiết bài viết theo Slug (Consolidated)

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

// Lấy danh sách Sản phẩm theo danh mục (Sử dụng Category 'san-pham' hoặc CPT)
export async function getProductsByCategory(categoryName = "san-pham", first = 100) {
  const query = `
    query GetProducts($first: Int!, $categoryName: String!) {
      posts(first: $first, where: {categoryName: $categoryName, orderby: {field: DATE, order: DESC}}) {
        nodes {
          id
          title
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
  const data = await fetchWP(query, { variables: { first, categoryName } });
  return data?.posts?.nodes || [];
}
// Lấy Dữ liệu Trang Chủ (ACF Option trang chủ)
export async function getHomePageData() {
  const query = `
    query GetHomePageData {
      page(id: "trang-chu", idType: URI) {
        workingProcess {
          tagline
          title
          steps {
            stepTitle
            stepDescription
            stepIcon
          }
        }
        printingServices {
          tagline
          title
          services {
            serviceTitle
            serviceDescription
            serviceImage {
              node {
                sourceUrl
              }
            }
          }
        }
        whyChooseUs {
          tagline
          title
          features {
            iconName
            featureTitle
            featureDescription
          }
        }
        machinerySection {
          tagline
          title
          machines {
            machineName
            machineDescription
            machineImage {
              node {
                sourceUrl
              }
            }
          }
        }
        clientsSection {
          tagline
          title
          clients {
            clientName
            clientLogo {
              node {
                sourceUrl
              }
            }
          }
        }
        factoryTour {
          tagline
          title
          description
          videoUrl
          coverImage {
            node {
              sourceUrl
            }
          }
        }
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
            title
            subtitle
          }
          heroButtons {
            label
            link
          }
          stats {
            number
            suffix
            label
          }
          partners {
            partnerName
          }
          services {
            title
            description
            image {
              node {
                sourceUrl
              }
            }
            price
          }
          whyChooseUs {
            title
            description
            iconName
          }
          processSteps {
            stepNumber
            title
          }
          machinery {
            title
            description
            image {
              node {
                sourceUrl
              }
            }
          }
          videoSection {
            title
            description
            videoUrl
            backgroundImage {
              node {
                sourceUrl
              }
            }
          }
          testimonials {
            content
            author
            position
            rating
          }
          baoGiaHotline
        }
      }
    }
  `;
  const data = await fetchWP(query);
  if (!data?.page) return null;
  
  return {
    ...data.page.cauHinhTrangChu,
    newWhyChooseUs: data.page.whyChooseUs,
    newWorkingProcess: data.page.workingProcess,
    newPrintingServices: data.page.printingServices,
    newMachinery: data.page.machinerySection,
    newClients: data.page.clientsSection,
    newFactoryTour: data.page.factoryTour
  };
}

// Lấy dữ liệu Cấu hình Header và Footer
export async function getHeaderFooterSettings() {
  const query = `
    query GetHeaderFooterSettings {
      options {
        headerSetup {
          logo {
            node {
              sourceUrl
            }
          }
          phoneNumber
          email
          address
          facebook
          zalo
          youtube
          footerDescription
          mapUrl
          mapImage {
            node {
              sourceUrl
            }
          }
          copyrightText
        }
      }
    }
  `;
  const data = await fetchWP(query);
  return data?.options?.headerSetup;
}
