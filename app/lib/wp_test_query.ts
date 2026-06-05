export async function getHomePageData() {
  const query = `
    query GetHomePageData {
      page(id: "trang-chu", idType: URI) {
        workingProcess {
          process_tagline process_title
          steps { steptitle stepdescription stepicon }
        }
        printingServices {
          dichvu_tagline dichvu_title
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
          tagline title
          danhSachMayMoc {
            machinename machinedescription
            machineimage { node { sourceUrl } }
          }
        }
        clientsSection {
          tagline title
          clients { clientname clientlogo { node { sourceUrl } } }
        }
        factoryTourSection {
          tagline title description
          videoUrl
          coverImage { node { sourceUrl } }
        }
      }
    }
  `;
  return null; // placeholder
}
