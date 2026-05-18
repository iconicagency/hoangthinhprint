'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import archiveProducts from '../lib/products_archive.json';

export default function WPProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState<string>('');

  useEffect(() => {
    async function loadProjects() {
      try {
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
        
        const res = await fetch('/api/graphql-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
          cache: 'no-store'
        });

        const json = await res.json();
        
        if (json.errors) {
           setErrorInfo(JSON.stringify(json.errors[0].message));
           setLoading(false);
           return;
        }

        const data = json.data?.cacDuAn?.nodes || [];
        if (data.length > 0) {
          setProjects(data);
        } else {
          // If no data from WP, use archive data
          setProjects(archiveProducts.map((p, i) => ({
            id: p.id,
            title: p.title,
            slug: p.id,
            featuredImage: { node: { sourceUrl: p.image } },
            thongtinduan: { nhanHienThi: p.category }
          })));
        }
      } catch (error: any) {
        console.error("Fetch Projects Error:", error);
        // Fallback to archive data on error
        setProjects(archiveProducts.map((p, i) => ({
          id: p.id,
          title: p.title,
          slug: p.id,
          featuredImage: { node: { sourceUrl: p.image } },
          thongtinduan: { nhanHienThi: p.category }
        })));
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)]"></div>
      </div>
    );
  }

  // We hide the error if we have archive fallback
  const finalProjects = projects.length > 0 ? projects : archiveProducts.map((p, i) => ({
    id: p.id,
    title: p.title,
    slug: p.id,
    featuredImage: { node: { sourceUrl: p.image } },
    thongtinduan: { nhanHienThi: p.category }
  }));

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {finalProjects.map((project: any, i: number) => {
        const imgUrl = project.featuredImage?.node?.sourceUrl || `https://picsum.photos/seed/projectx${i}/400/400`;
        const tag = project.thongtinduan?.nhanHienThi || 'In Ấn Cao Cấp';

        return (
          <div key={project.id} className="bg-[var(--card-bg)] rounded-2xl overflow-hidden shadow-sm border border-[var(--border)] group flex flex-col">
            <div className="h-64 relative overflow-hidden border-b border-[var(--border)]">
               <Image src={imgUrl} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" referrerPolicy="no-referrer" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="mb-3">
                <span className="inline-block border border-[var(--accent)]/50 text-[var(--accent)] px-3 py-1 rounded-md text-xs font-medium">
                  {tag}
                </span>
              </div>
              <h3 className="text-[var(--text-main)] font-medium leading-relaxed text-sm">
                {project.title}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
