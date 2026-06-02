// ============================================================
// WordPress GraphQL client
// CMS: cms.inhoangthinh.com.vn
// Quy tắc WPGraphQL: ACF group name → lowercase, sub-fields → giữ nguyên camelCase
// ACF Image field → AcfMediaItemConnectionEdge → dùng node { sourceUrl }
// ============================================================

export async function fetchWP(query: string, { variables }: { variables?: any } = {}) {
  const wpUrl = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'https://cms.inhoangthinh.com.vn/graphql';
  const headers = { 'Content-Type': 'application/json' };

  try {
    if (typeof window !== 'undefined') {
      const res = await fetch('/api/graphql-proxy', {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables }),
        cache: 'no-store',
      });
      if (!res.ok) return null;
      const json = await res.json();
      if (json.errors) return null;
      return json.data;
    }

    const res = await fetch(wpUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Kết nối WP lỗi. Status:', res.status);
      return null;
    }

    const json = await res.json();
    if (json.errors) {
      console.error('Lỗi từ WordPress GraphQL:', JSON.stringify(json.errors, null, 2));
      return null;
    }

    return json.data;
  } catch (error) {
    console.error('Lỗi kết nối WordPress:', error);
    return null;
  }
}

// ============================================================
// Hero Slides — query riêng, nhỏ gọn, ưu tiên load nhanh
// ============================================================

export async function getHeroSlides() {
  const query = `
    query GetHeroSlides {
      page(id: "trang-chu", idType: URI) {
        cauHinhTrangChu {
          herotagline
          herotitle
          herosubtitle
          herobenefits { title subtitle }
          herobuttons { label link }
          heroslideslist {
            slideImage { node { sourceUrl } }
            slideTagline
            slideTitle
            slidesubtitle
          }
          heroslides {
            nodes { sourceUrl }
          }
        }
      }
    }
  `;
  const data = await fetchWP(query);
  if (!data?.page) return null;

  const hero = data.page.cauHinhTrangChu;
  if (!hero) return null;

  const slidesList = (hero.heroslideslist || []).map((s: any) => ({
    slideImage: s.slideImage?.node?.sourceUrl || null,
    slideTagline: s.slideTagline || null,
    slideTitle: s.slideTitle || null,
    slideSubtitle: s.slidesubtitle || null,
  })).filter((s: any) => s.slideImage);

  return {
    heroTagline: hero.herotagline || null,
    heroTitle: hero.herotitle || null,
    heroSubtitle: hero.herosubtitle || null,
    heroBenefits: hero.herobenefits || [],
    heroButtons: hero.herobuttons || [],
    heroSlides: hero.heroslides?.nodes?.map((n: any) => n.sourceUrl) || [],
    heroSlidesList: slidesList,
  };
}

// ============================================================
// SEO — wp-graphql-rank-math (AxeWP)
// ============================================================

export async function getSeoForPost(slug: string) {
  const query = `
    query GetSeoForPost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        seo {
          title description robots canonicalUrl
          openGraph { title description image { url width height } }
          twitter { title description image { url } }
          jsonLd { raw }
        }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { slug } });
  return data?.post?.seo || null;
}

export async function getSeoForPage(slug: string) {
  const query = `
    query GetSeoForPage($slug: ID!) {
      page(id: $slug, idType: URI) {
        seo {
          title description robots canonicalUrl
          openGraph { title description image { url width height } }
          twitter { title description image { url } }
          jsonLd { raw }
        }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { slug } });
  return data?.page?.seo || null;
}

// ============================================================
// Pages
// ============================================================

export async function getPageBySlug(slug: string) {
  const query = `
    query GetPageBySlug($id: ID!) {
      page(id: $id, idType: URI) {
        title content slug
        featuredImage { node { sourceUrl } }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { id: slug } });
  return data?.page || null;
}

export async function getAboutPageData() {
  const query = `
    query GetAboutPageData {
      page(id: "gioi-thieu", idType: URI) {
        title content
        featuredImage { node { sourceUrl } }
        cauHinhTrangGioiThieu {
          heroTitle heroSubtitle storyTitle storyContent
          storyImage { node { sourceUrl } }
          visionTitle visionContent missionTitle missionContent
          stats { number label }
          productionCapacityTitle productionCapacityDescription
          productionImages { nodes { sourceUrl } }
          productionFacilities { title description icon }
          benefits { title description }
          coreValues { title description }
          servicesTitle
          servicesList { title description image { node { sourceUrl } } }
          commitmentsTitle
          commitmentsList { title description icon }
          ctaTitle ctaDescription
          contactAddress contactHotline contactEmail
          contactImages { nodes { sourceUrl } }
        }
      }
    }
  `;
  const data = await fetchWP(query);
  return data?.page || null;
}

export async function getNganhHangPageData() {
  const query = `
    query GetNganhHangPageData {
      page(id: "nganh-hang", idType: URI) {
        title content
        featuredImage { node { sourceUrl } }
        cauHinhTrangNganhHang {
          heroTitle heroSubtitle
          danhSachNganhHang {
            title description icon link
            image { node { sourceUrl } }
          }
        }
      }
    }
  `;
  const data = await fetchWP(query);
  return data?.page || null;
}

export async function getIndustryPageData(uri: string) {
  const query = `
    query GetIndustryPageData($uri: ID!) {
      page(id: $uri, idType: URI) {
        title content
        cauHinhChiTietNganhHang {
          heroTitle heroSubtitle introTitle introContent
          whyTitle
          whyList { item }
          productsTitle
          productsList { title description link }
          pricingText
          sampleImages { nodes { sourceUrl } }
          faqTitle
          faqs { question answer }
        }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { uri } });
  return data?.page || null;
}

// ============================================================
// Posts / Blog
// ============================================================

export async function getPostBySlug(slug: string) {
  const query = `
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        title content date slug
        featuredImage { node { sourceUrl } }
        categories { nodes { name slug } }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { id: slug } });
  return data?.post || null;
}

export async function getCategories() {
  const query = `
    query GetCategories {
      categories(first: 50) {
        nodes { name slug count }
      }
    }
  `;
  const data = await fetchWP(query);
  return data?.categories?.nodes || [];
}

export async function getPosts(first = 10) {
  const query = `
    query GetPosts($first: Int!) {
      posts(first: $first, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          id title excerpt date slug
          featuredImage { node { sourceUrl } }
          categories { nodes { name slug } }
        }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { first } });
  return data?.posts?.nodes || [];
}

export async function getRecentPosts() {
  return getPosts(3);
}

// ============================================================
// Dự án / Portfolio (CPT: du_an)
// ============================================================

export async function getProjects() {
  const query = `
    query GetProjects {
      cacDuAn(first: 8, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          id title slug
          featuredImage { node { sourceUrl } }
          thongtinduan { nhanHienThi }
        }
      }
    }
  `;
  const data = await fetchWP(query);
  return data?.cacDuAn?.nodes || [];
}

export async function getProjectBySlug(slug: string) {
  const query = `
    query GetProjectBySlug($id: ID!) {
      duAn(id: $id, idType: SLUG) {
        title content
        featuredImage { node { sourceUrl } }
        thongtinduan { nhanHienThi }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { id: slug } });
  return data?.duAn || null;
}

// ============================================================
// Gallery sản phẩm (Posts + category, không cần WooCommerce)
// ============================================================

export async function getGalleryByCategory(categorySlug = 'san-pham', first = 200) {
  const query = `
    query GetGallery($first: Int!, $categorySlug: String!) {
      posts(first: $first, where: {categoryName: $categorySlug, orderby: {field: DATE, order: DESC}}) {
        nodes {
          id title slug
          featuredImage { node { sourceUrl } }
          categories { nodes { name slug } }
        }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { first, categorySlug } });
  return data?.posts?.nodes || [];
}

// ============================================================
// Trang chủ (ACF) — tách thành 2 query để tránh timeout
// ============================================================

export async function getHomePageData() {
  const query = `
    query GetHomePageData {
      page(id: "trang-chu", idType: URI) {
        cauHinhTrangChu {
          herotagline herotitle herosubtitle
          heroslides { nodes { sourceUrl } }
          heroslideslist {
            slideImage { node { sourceUrl } }
            slideTitle slideTagline slidesubtitle
          }
          herobenefits { title subtitle }
          herobuttons { label link }
          stats { number suffix label }
        }
        workingProcess {
          tagline title
          steps { steptitle stepdescription stepicon }
        }
        printingServices {
          tagline tieuD
          services {
            servicetitle servicedescription
            serviceimage { node { sourceUrl } }
          }
        }
        whyChooseUs {
          whyTagline whyTitle
          features { iconName featureTitle featureDescription }
        }
        machinerysection {
          tagline title
          machines { machineName machineDescription machineImage { node { sourceUrl } } }
        }
        clientsSection {
          tagline title
          clients { clientname clientlogo { node { sourceUrl } } }
        }
        factoryTourSection {
          tagline title description videoUrl
          coverImage { node { sourceUrl } }
        }
        testimonials { content author position rating }
      }
    }
  `;
  const data = await fetchWP(query);
  if (!data?.page) return null;

  const p = data.page;
  const hero = p.cauHinhTrangChu;
  const process = p.workingProcess;
  const services = p.printingServices;
  const why = p.whyChooseUs;
  const machinery = p.machinerysection;
  const clients = p.clientsSection;
  const factory = p.factoryTourSection;

  return {
    heroTagline: hero?.herotagline,
    heroTitle: hero?.herotitle,
    heroSubtitle: hero?.herosubtitle,
    heroSlides: hero?.heroslides?.nodes?.map((n: any) => n.sourceUrl) || [],
    heroSlidesList: (hero?.heroslideslist || []).map((s: any) => ({
      slideImage: s.slideImage?.node?.sourceUrl || null,
      slideTagline: s.slideTagline,
      slideTitle: s.slideTitle,
      slideSubtitle: s.slidesubtitle,
    })),
    heroBenefits: hero?.herobenefits || [],
    heroButtons: hero?.herobuttons || [],
    stats: hero?.stats || [],
    workingProcess: {
      tagline: process?.tagline,
      title: process?.title,
      steps: (process?.steps || []).map((s: any, i: number) => ({
        step: (i + 1).toString().padStart(2, '0'),
        title: s.steptitle,
        desc: s.stepdescription,
        iconName: s.stepicon,
      })),
    },
    printingServices: {
      tagline: services?.tagline,
      title: services?.tieuD,
      services: (services?.services || []).map((s: any) => ({
        title: s.servicetitle,
        desc: s.servicedescription,
        img: s.serviceimage?.node?.sourceUrl || null,
      })),
    },
    whyChooseUs: {
      tagline: why?.whyTagline,
      title: why?.whyTitle,
      features: (why?.features || []).map((f: any) => ({
        iconName: f.iconName,
        title: f.featureTitle,
        desc: f.featureDescription,
      })),
    },
    machinery: {
      tagline: machinery?.tagline,
      title: machinery?.title,
      machines: (machinery?.machines || []).map((m: any) => ({
        title: m.machineName,
        desc: m.machineDescription,
        img: m.machineImage?.node?.sourceUrl || null,
      })),
    },
    clients: {
      tagline: clients?.tagline,
      title: clients?.title,
      list: (clients?.clients || []).map((c: any) => ({
        name: c.clientname,
        logo: c.clientlogo?.node?.sourceUrl || null,
      })),
    },
    factoryTour: {
      tagline: factory?.tagline,
      title: factory?.title,
      description: factory?.description,
      videoUrl: factory?.videoUrl,
      coverImage: factory?.coverImage?.node?.sourceUrl || null,
    },
    testimonials: p.testimonials || [],
  };
}

// ============================================================
// Header / Footer settings (ACF Options)
// ============================================================

export async function getHeaderFooterSettings() {
  const query = `
    query GetHeaderFooterSettings {
      generalSettings { title }
      headerSettings {
        headerSetup {
          logo { node { sourceUrl } }
          phoneNumber email address
          facebook zalo youtube
          footerDescription mapUrl
          mapImage { node { sourceUrl } }
          copyrightText
        }
      }
    }
  `;
  const data = await fetchWP(query);
  if (!data) return null;

  return {
    siteTitle: data.generalSettings?.title,
    ...data.headerSettings?.headerSetup,
  };
}
