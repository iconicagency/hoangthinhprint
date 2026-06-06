// ============================================================
// WordPress GraphQL client
// CMS: cms.inhoangthinh.com.vn
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
      if (!json.data) return null;
      return json.data;
    }

    const res = await fetch(wpUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Ket noi WP loi. Status:', res.status);
      return null;
    }

    const json = await res.json();
    if (json.errors) {
      console.error('WP GraphQL partial errors:', json.errors.map((e: any) => e.message).join(', '));
    }
    if (json.data) return json.data;
    return null;

  } catch (error) {
    console.error('Loi ket noi WordPress:', error);
    return null;
  }
}

export async function getAboveFoldData() {
  const query = `
    query GetAboveFoldData {
      page(id: "trang-chu", idType: URI) {
        cauHinhTrangChu {
          herotagline herotitle herosubtitle
          herobenefits { title subtitle }
          herobuttons { label link }
          heroslideslist {
            slideImage { node { sourceUrl } }
            slideTagline slideTitle slidesubtitle
          }
          heroslides { nodes { sourceUrl } }
          stats { number suffix label }
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
    stats: hero.stats || [],
  };
}

export const getHeroSlides = getAboveFoldData;

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
          heroSection
          herosubtitle
          storytitle storycontent storysubtitle
          storyimage { node { sourceUrl } }
          visiontitle visioncontent
          missiontitle missioncontent
          stats { number label }
          productioncapacitytitle productioncapacitydescription
          productionimages { nodes { sourceUrl } }
          productionfacilities { title description icon }
          benefits { title description icon }
          corevalues { title description icon }
          servicestitle
          serviceslist { title description image { node { sourceUrl } } }
          commitmentstitle
          commitmentslist { title description icon }
          ctatitle ctadescription
          contactaddress contacthotline contactemail
          contactimages { nodes { sourceUrl } }
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
          herotitle herosubtitle
          danhsachnganhhang {
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
  // LƯU Ý: Tất cả field names trong CauHinhChiTietNganhHang đều LOWERCASE theo schema WPGraphQL
  // herotitle, herosubtitle, introtitle, introcontent, whytitle, whylist,
  // productstitle, productslist, pricingtext, sampleimages, faqs
  // KHÔNG dùng camelCase như heroTitle, heroSubtitle...
  const query = `
    query GetIndustryPageData($uri: ID!) {
      page(id: $uri, idType: URI) {
        title content
        cauHinhChiTietNganhHang {
          herotitle
          herosubtitle
          introtitle
          introcontent
          whytitle
          whylist { item }
          productstitle
          productslist { title description link }
          pricingtext
          sampleimages { nodes { sourceUrl } }
          faqs { question answer }
        }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { uri } });
  if (!data?.page) return null;

  // Normalize về camelCase để các IndustryClient.tsx dùng thống nhất
  const raw = data.page.cauHinhChiTietNganhHang;
  if (raw) {
    data.page.cauHinhChiTietNganhHang = {
      heroTitle:    raw.herotitle    || null,
      heroSubtitle: raw.herosubtitle || null,
      introTitle:   raw.introtitle   || null,
      introContent: raw.introcontent || null,
      whyTitle:     raw.whytitle     || null,
      whyList:      raw.whylist      || [],
      productsTitle: raw.productstitle || null,
      productsList:  raw.productslist  || [],
      pricingText:   raw.pricingtext   || null,
      sampleImages:  raw.sampleimages  || null,
      faqTitle:      null, // không có field này trong schema
      faqs:          raw.faqs || [],
    };
  }

  return data.page || null;
}

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

export async function getGalleryByCategory(categorySlug = 'san-pham', first = 50) {
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

export async function getHomePageData() {
  // LƯU Ý QUAN TRỌNG:
  // Tất cả các ACF field group trên trang chủ đều dùng field name "tagline", "title" giống nhau
  // → WordPress lưu chung 1 meta_key trong wp_postmeta → data bị lẫn nhau
  // → KHÔNG query tagline/title/tieuD từ bất kỳ section nào
  // → Tất cả section title/tagline dùng VI constants trong page.tsx
  const query = `
    query GetHomePageData {
      page(id: "trang-chu", idType: URI) {
        workingProcess {
          steps { steptitle stepdescription stepicon }
        }
        printingServices {
          services {
            servicetitle servicedescription
            serviceimage { node { sourceUrl } }
          }
        }
        whyChooseUs {
          whyTagline whyTitle
          whyList {
            icon { node { sourceUrl } }
            title
            desc
          }
        }
        machinerysection {
          danhSachMayMoc {
            machinename machinedescription
            machineimage { node { sourceUrl } }
          }
        }
        clientsSection {
          clients { clientname clientlogo { node { sourceUrl } } }
        }
        factoryTourSection {
          description
          videoUrl
          coverImage { node { sourceUrl } }
        }
      }
    }
  `;
  const data = await fetchWP(query);
  if (!data?.page) return null;
  const p = data.page;
  const process = p.workingProcess;
  const services = p.printingServices;
  const why = p.whyChooseUs;
  const machinery = p.machinerysection;
  const clients = p.clientsSection;
  const factory = p.factoryTourSection;
  return {
    workingProcess: {
      tagline: null,
      title: null,
      steps: (process?.steps || []).map((s: any, i: number) => ({
        step: (i + 1).toString().padStart(2, '0'),
        title: s.steptitle,
        desc: s.stepdescription,
        iconName: s.stepicon,
      })),
    },
    printingServices: {
      tagline: null,
      title: null,
      services: (services?.services || []).map((s: any) => ({
        title: s.servicetitle,
        desc: s.servicedescription,
        img: s.serviceimage?.node?.sourceUrl || null,
      })),
    },
    whyChooseUs: {
      tagline: why?.whyTagline || null,
      title: why?.whyTitle || null,
      features: (why?.whyList || []).map((f: any) => ({
        iconName: f.icon?.node?.sourceUrl || null,
        title: f.title,
        desc: f.desc,
      })),
    },
    machinery: {
      tagline: null,
      title: null,
      machines: (machinery?.danhSachMayMoc || []).map((m: any) => ({
        title: m.machinename,
        desc: m.machinedescription,
        img: m.machineimage?.node?.sourceUrl || null,
      })),
    },
    clients: {
      tagline: null,
      title: null,
      list: (clients?.clients || []).map((c: any) => ({
        name: c.clientname,
        logo: c.clientlogo?.node?.sourceUrl || null,
      })),
    },
    factoryTour: {
      tagline: null,
      title: null,
      description: factory?.description || null,
      videosList: factory?.videoUrl ? [{
        title: null,
        url: factory?.videoUrl || null,
        cover: factory?.coverImage?.node?.sourceUrl || null,
      }] : [],
    },
    testimonials: [],
  };
}

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
