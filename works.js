(() => {
  'use strict';
  const data = window.PORTFOLIO_DATA;
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get('category');
  const category = data.categories.find(item => item.id === requestedId);
  const title = document.getElementById('archive-title');
  const description = document.getElementById('archive-description');
  const count = document.getElementById('archive-count');
  const list = document.getElementById('archive-list');
  const backLink = document.getElementById('back-link');

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
  const safeUrl = value => {
    try {
      const url = new URL(value);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : '#';
    } catch { return '#'; }
  };

  if (!category) {
    title.textContent = 'Project Library';
    description.textContent = 'This category could not be found. Return to the portfolio and choose a work category.';
    count.textContent = '';
    list.innerHTML = '<div class="archive-empty">No category selected. <a href="index.html">Return to the portfolio ↗</a></div>';
    return;
  }

  const projects = data.projects
    .filter(project => project.category === category.id)
    .sort((a, b) => (b.order || 0) - (a.order || 0));

  document.title = `${category.title} | Khandakar Ikramul Islam (Abir)`;
  title.textContent = category.title;
  description.textContent = `${category.intro} Projects are arranged with the newest additions first.`;
  count.textContent = `${String(projects.length).padStart(2, '0')} ${projects.length === 1 ? 'PROJECT' : 'PROJECTS'} IN THIS CATEGORY`;
  backLink.href = 'index.html';

  if (!projects.length) {
    list.innerHTML = '<div class="archive-empty">There are no projects in this category yet.</div>';
    return;
  }

  const homepageFeatured = projects.find(project => project.featured === true);

  list.innerHTML = projects.map((project, index) => {
    const isHomepageFeatured = homepageFeatured && homepageFeatured.id === project.id;
    const links = (project.links || []).filter(link => link && link.url);
    const linkMarkup = links.map(link => `<a href="${escapeHTML(safeUrl(link.url))}" target="_blank" rel="noopener">${escapeHTML(link.label || 'Open project')} ↗</a>`).join('');
    const stats = (project.stats || []).map(stat => `<span>${escapeHTML(stat.value)} ${escapeHTML(stat.label)}</span>`).join('');
    return `
      <article class="archive-card">
        <div class="archive-card-number">${String(index + 1).padStart(2, '0')}</div>
        <div class="archive-card-content">
          <span class="tag">${escapeHTML(project.type || category.title)}</span>
          <h2>${escapeHTML(project.title)}</h2>
          <p>${escapeHTML(project.description)}</p>
          ${project.details ? `<p class="archive-details">${escapeHTML(project.details)}</p>` : ''}
          ${stats ? `<div class="archive-stats">${stats}</div>` : ''}
          <span class="archive-date">${escapeHTML(project.date || 'Date not specified')}${isHomepageFeatured ? ' · Featured on homepage' : ''}</span>
        </div>
        <div class="archive-links">${linkMarkup || '<span class="no-public-link">Details available above</span>'}</div>
      </article>`;
  }).join('');
})();
