'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProjects } from '../lib/wp';

export default function WPProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Lỗi khi tải dự án:', error);
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

  if (projects.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--text-dim)]">
        <p>Chưa có dự án nào. Vui lòng thêm dự án trên WordPress.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {projects.map((project: any, i: number) => {
        const imgUrl = project.featuredImage?.node?.sourceUrl || `https://picsum.photos/seed/project${i}/400/400`;
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
