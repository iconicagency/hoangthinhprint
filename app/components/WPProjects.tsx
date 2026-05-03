'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function WPProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState<string>('');

  useEffect(() => {
    async function loadProjects() {
      try {
        const wpUrl = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "https://cms.inhoangthinh.com.vn/graphql";
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
        }
      } catch (error: any) {
        console.error("Fetch Projects Error:", error);
        setErrorInfo(error.message);
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

  if (errorInfo) {
    return (
      <div className="text-center py-10 bg-red-50 border border-dashed border-red-300 rounded-xl">
        <p className="text-red-500 font-bold mb-2">Truy vấn GraphQL thất bại:</p>
        <p className="text-slate-600 font-mono text-sm">{errorInfo}</p>
        <p className="text-slate-500 text-sm mt-4">Hãy chụp màn hình lỗi này lại để tôi kiểm tra xem tên trường nào bị gõ sai nhé.</p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
        <p className="text-slate-500 font-medium">Bạn chưa đăng bài Dự Án nào trên WordPress (Hoặc bạn chưa bấm nút &quot;Publish&quot;).</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {projects.map((project: any, i: number) => {
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
