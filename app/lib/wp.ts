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

    // Server-side: cache ket qua WP 60s (Next Data Cache) — dong bo voi ISR revalidate 60s.
    // Truoc day dung cache no-store → moi request deu goi WP, TTFB cham.
    const res = await fetch(wpUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
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
  //
  // GUARD CHONG DATA LAN (phat hien 2026-07-18):
  // WP dang resolve CauHinhChiTietNganhHang GLOBAL — moi page (ke ca trang Lien he)
  // deu tra ve cung 1 bo gia tri (noi dung TPCN). Nguyen nhan phia WP/ACF config.
  // → Query them "sentinel" la trang Lien he (databaseId 26, KHONG BAO GIO co ACF nganh hang).
  //   Neu herotitle cua page dich TRUNG voi sentinel → data dang bi lan global → bo qua ACF,
  //   de IndustryClient dung fallback text dung nganh.
  // Sau khi WP duoc fix (data luu theo tung page), sentinel tra null → guard tu vo hieu.
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
      sentinel: page(id: 26, idType: DATABASE_ID) {
        cauHinhChiTietNganhHang { herotitle }
      }
    }
  `;
  const data = await fetchWP(query, { variables: { uri } });
  if (!data?.page) return null;

  const raw = data.page.cauHinhChiTietNganhHang;
  const sentinelTitle = data.sentinel?.cauHinhChiTietNganhHang?.herotitle || null;
  if (raw && sentinelTitle && raw.herotitle === sentinelTitle) {
    // Data global bi lan — khong dung
    data.page.cauHinhChiTietNganhHang = null;
    return data.page;
  }

  // Normalize về camelCase để các IndustryClient.tsx dùng thống nhất
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

// Slug cac category SAN PHAM / DICH VU — khong phai bai viet blog
const NON_BLOG_CATEGORY_SLUGS = new Set(['san-pham', 'tem-nhan-decal', 'thiet-ke-bao-bi']);

// Bai viet BLOG that su: loai tru toan bo post thuoc category san-pham (va con cua no)
// + cac category dich vu. Neu khong loc, 700+ post san pham se tran vao blog.
// LUU Y: categoryNotIn KHONG tu loai category con → phai liet ke du ID cha + con.
export async function getBlogPosts(first = 20) {
  const catData = await fetchWP(`
    query GetCatsForBlogFilter {
      categories(first: 100) {
        nodes { databaseId slug parentDatabaseId }
      }
    }
  `);
  const cats = catData?.categories?.nodes || [];
  const sanPhamIds = new Set(
    cats.filter((c: any) => NON_BLOG_CATEGORY_SLUGS.has(c.slug)).map((c: any) => c.databaseId)
  );
  const excludedIds = cats
    .filter((c: any) => NON_BLOG_CATEGORY_SLUGS.has(c.slug) || sanPhamIds.has(c.parentDatabaseId))
    .map((c: any) => c.databaseId);

  const data = await fetchWP(`
    query GetBlogPosts($first: Int!, $notIn: [ID]) {
      posts(first: $first, where: {categoryNotIn: $notIn, orderby: {field: DATE, order: DESC}}) {
        nodes {
          id title excerpt date slug
          featuredImage { node { sourceUrl } }
          categories { nodes { name slug } }
        }
      }
    }
  `, { variables: { first, notIn: excludedIds } });
  return data?.posts?.nodes || [];
}

export async function getRecentPosts() {
  // Trang chu "Bai viet moi nhat" — uu tien bai blog that su.
  // Chua co bai blog nao → fallback post moi nhat de section khong bi trong.
  const blogPosts = await getBlogPosts(3);
  if (blogPosts.length) return blogPosts;
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
  // Trước đây nghi các ACF field group dùng chung field name "tagline"/"title" gây lẫn data
  // → NGOẠI LỆ ĐÃ VERIFY (introspection + query thực tế 2026-07-16):
  //   factoryTourSection, clientsSection, machinerysection, testimonialsSection
  //   đều trả về tagline/title RIÊNG BIỆT
  //   → factoryTourSection + testimonialsSection được query tagline/title trực tiếp từ WP
  // Các section khác vẫn dùng VI constants trong page.tsx cho đến khi được verify tương tự
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
          tagline
          title
          description
          videoUrl
          coverImage { node { sourceUrl } }
        }
        testimonialsSection {
          tagline
          title
          reviews {
            authorName
            authorPosition
            content
            avatar { node { sourceUrl } }
          }
        }
      }
    }
  `;

  // Query MO RONG cho dich vu (serviceLink/servicecontact) chay SONG SONG voi query chinh
  // — truoc day chay tuan tu lam cham TTFB
  const extQuery = `
    query GetServiceExtras {
      page(id: "trang-chu", idType: URI) {
        printingServices {
          services { servicelink: serviceLink servicecontact }
        }
      }
    }
  `;

  const [dataResult, extResult] = await Promise.allSettled([
    fetchWP(query),
    fetchWP(extQuery),
  ]);
  const data = dataResult.status === 'fulfilled' ? dataResult.value : null;
  const extData = extResult.status === 'fulfilled' ? extResult.value : null;

  if (!data?.page) return null;
  const p = data.page;
  const extServices: any[] = extData?.page?.printingServices?.services || [];

  const process = p.workingProcess;
  const services = p.printingServices;
  const why = p.whyChooseUs;
  const machinery = p.machinerysection;
  const clients = p.clientsSection;
  const factory = p.factoryTourSection;
  const testi = p.testimonialsSection;
  return {
    workingProcess: {
      tagline: null,
      title: null,
      steps: (process?.steps || []).map((s: any, i: number) => ({
        step: (i + 1).toString().padStart(2, '0'),
        // Strip so thu tu neu user nhap kem trong steptitle (vd "08 Giao hàng" → "Giao hàng")
        // — so thu tu da duoc render rieng tu index
        title: (s.steptitle || '').replace(/^\s*\d+[\s.\-–—]*/, ''),
        desc: s.stepdescription,
        iconName: s.stepicon,
      })),
    },
    printingServices: {
      tagline: null,
      title: null,
      services: (services?.services || []).map((s: any, i: number) => ({
        title: s.servicetitle,
        desc: s.servicedescription,
        img: s.serviceimage?.node?.sourceUrl || null,
        link: extServices[i]?.servicelink || null,
        contact: extServices[i]?.servicecontact || null,
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
      // Text section video gioi thieu lay truc tiep tu WP — user sua trong CMS se hien ngay
      tagline: factory?.tagline || null,
      title: factory?.title || null,
      description: factory?.description || null,
      videosList: factory?.videoUrl ? [{
        title: null,
        url: factory?.videoUrl || null,
        cover: factory?.coverImage?.node?.sourceUrl || null,
      }] : [],
    },
    // Heading section danh gia — sua trong CMS se hien ngay
    testimonialsMeta: {
      tagline: testi?.tagline || null,
      title: testi?.title || null,
    },
    // Schema khong co field rating → mac dinh 5 sao
    testimonials: (testi?.reviews || []).map((r: any) => ({
      content: r.content,
      author: r.authorName,
      position: r.authorPosition,
      rating: 5,
      img: r.avatar?.node?.sourceUrl || null,
    })),
  };
}

// Chuyen URL menu item ve dang dung duoc tren frontend:
// - /category/san-pham/<slug>/ va /category/<slug>/ (category cua CMS) → /san-pham?cat=<slug>
// - /category/san-pham/ → /san-pham
// - Link tro ve CMS (cms.inhoangthinh.com.vn) → lay path tuong doi
// - Link ngoai (https khac) → giu nguyen
// - "#" hoac rong → "#"
function mapCmsPathToFrontend(path: string): string {
  if (/^\/category\/san-pham\/?$/.test(path)) return '/san-pham';
  // Lay slug cuoi cung cua path category (ho tro ca category con va category cap 1)
  const catMatch = path.match(/^\/category\/(?:.+\/)?([^/]+)\/?$/);
  if (catMatch) return `/san-pham?cat=${catMatch[1]}`;
  return path;
}

function normalizeMenuUrl(item: any): string {
  const raw = item?.url || item?.uri || '';
  if (!raw || raw === '#') return item?.uri && item.uri !== '#' ? mapCmsPathToFrontend(item.uri) : '#';
  try {
    const u = new URL(raw);
    if (u.hostname.includes('cms.inhoangthinh.com.vn')) {
      return mapCmsPathToFrontend(u.pathname) + u.search;
    }
    return raw;
  } catch {
    // URL tuong doi (khong parse duoc) → map path CMS ve frontend roi dung
    return mapCmsPathToFrontend(raw);
  }
}

// Doc menu "Footer" tao trong WP Admin → Giao dien → Menu.
// Tim theo slug "footer" hoac ten chua chu "footer" (khong phan biet hoa thuong, vd "Menu Footer").
// LUU Y: WPGraphQL chi expose menu DA GAN display location voi request public
// → menu can duoc gan vao mot location (theme can register_nav_menus location "footer").
// Chua tao menu / chua gan location → tra null → Footer.tsx dung danh sach link mac dinh.
export async function getFooterMenu() {
  const data = await fetchWP(`
    query GetFooterMenu {
      menus(first: 20) {
        nodes {
          name
          slug
          menuItems(first: 20) {
            nodes { label url uri parentId }
          }
        }
      }
    }
  `);
  const nodes = data?.menus?.nodes || [];
  const menu = nodes.find(
    (m: any) => m.slug === 'footer' || (m.name || '').toLowerCase().includes('footer')
  );
  if (!menu) return null;
  const items = (menu.menuItems?.nodes || [])
    .filter((i: any) => !i.parentId) // chi lay item cap 1 — footer khong co dropdown
    .map((i: any) => ({ label: i.label, href: normalizeMenuUrl(i) }))
    .filter((i: any) => i.label && i.href && i.href !== '#');
  return items.length ? { name: menu.name, items } : null;
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

  // Query MO RONG: danh sach hotline/zalo cho FloatContact widget
  // Field ACF (lowercase): hotlines { label phone }, zalos { label phone }
  // Chay SONG SONG 3 query (chinh + hotline/zalo + footer menu) de giam TTFB
  const contactQuery = `
    query GetContactChannels {
      headerSettings {
        headerSetup {
          hotlines { label phone }
          zalos { label phone }
        }
      }
    }
  `;

  const [dataResult, contactResult, footerMenuResult] = await Promise.allSettled([
    fetchWP(query),
    fetchWP(contactQuery),
    getFooterMenu(),
  ]);
  const data = dataResult.status === 'fulfilled' ? dataResult.value : null;
  if (!data) return null;

  const contactChannels = contactResult.status === 'fulfilled'
    ? contactResult.value?.headerSettings?.headerSetup || null
    : null;
  const footerMenu = footerMenuResult.status === 'fulfilled' ? footerMenuResult.value : null;

  return {
    siteTitle: data.generalSettings?.title,
    ...data.headerSettings?.headerSetup,
    hotlines: contactChannels?.hotlines || [],
    zalos: contactChannels?.zalos || [],
    footerMenu,
  };
}
