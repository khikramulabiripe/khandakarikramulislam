(() => {
  'use strict';

  const data = window.PORTFOLIO_DATA;
  const sectionRoot = document.getElementById('category-sections');
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));

  function safeUrl(value) {
    try {
      const url = new URL(value);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : '#';
    } catch { return '#'; }
  }

  // Homepage media can be a local asset (recommended) or a full https URL.
  function safeMediaSource(value) {
    const source = String(value || '').trim();
    if (source.startsWith('assets/') && !source.includes('..')) return source;
    return safeUrl(source) === '#' ? '' : safeUrl(source);
  }

  function getCategoryProjects(categoryId) {
    return data.projects
      .filter(project => project.category === categoryId)
      .sort((a, b) => (b.order || 0) - (a.order || 0));
  }

  // `bestWork` is the current generator field. `featured` remains supported so
  // existing project data keeps working after this update.
  function isBestWork(project) {
    return typeof project.bestWork === 'boolean' ? project.bestWork : project.featured === true;
  }

  function getFeaturedProject(categoryId) {
    const projects = getCategoryProjects(categoryId);
    // Projects are ordered newest-first by `order`, so the newest true item wins.
    return projects.find(isBestWork) || projects[0] || null;
  }

  const characterStyles = [
    { name: 'the achiever', skin: '#e9b78f', jacket: '#38bdf8', pants: '#082f49', hair: '#1d2734', accent: '#fef3c7', feature: 'puppet-cap' },
    { name: 'the strategist', skin: '#9e6248', jacket: '#a78bfa', pants: '#21153f', hair: '#111827', accent: '#e9d5ff', feature: 'puppet-glasses' },
    { name: 'the filmmaker', skin: '#d9926f', jacket: '#fb7185', pants: '#4c1027', hair: '#3b1b16', accent: '#ffe4e6', feature: 'puppet-headset' },
    { name: 'the modeller', skin: '#764837', jacket: '#22c55e', pants: '#052e21', hair: '#120b08', accent: '#dcfce7', feature: 'puppet-beanie' },
    { name: 'the maker', skin: '#f0c39f', jacket: '#f59e0b', pants: '#422006', hair: '#5c2e17', accent: '#fef3c7', feature: 'puppet-bun' },
    { name: 'the researcher', skin: '#bd7657', jacket: '#14b8a6', pants: '#042f2e', hair: '#271411', accent: '#ccfbf1', feature: 'puppet-curl' },
    { name: 'the founder', skin: '#8c503c', jacket: '#ef4444', pants: '#450a0a', hair: '#19100e', accent: '#fee2e2', feature: 'puppet-turban' },
    { name: 'the analyst', skin: '#c98763', jacket: '#3b82f6', pants: '#172554', hair: '#332019', accent: '#dbeafe', feature: 'puppet-visor' },
    { name: 'the builder', skin: '#f1bb94', jacket: '#84cc16', pants: '#1a2e05', hair: '#46251b', accent: '#ecfccb', feature: 'puppet-clip' },
    { name: 'the learner', skin: '#a86149', jacket: '#ec4899', pants: '#500724', hair: '#210f18', accent: '#fce7f3', feature: 'puppet-earring' }
  ];

  function makePuppetLink(categoryId, label, index) {
    const character = characterStyles[index % characterStyles.length];
    const uid = `${categoryId}-${index}`.replace(/[^a-z0-9-]/gi, '');
    return `
      <a class="puppet-link puppet-link--${index % characterStyles.length}" href="works.html?category=${encodeURIComponent(categoryId)}" aria-label="See more ${escapeHTML(label)} work">
        <span class="puppet-peek" aria-hidden="true">
          <span class="puppet-speech">Psst!</span>
          <svg class="puppet-figure ${character.feature}" viewBox="0 0 170 150" style="--puppet-skin:${character.skin};--puppet-jacket:${character.jacket};--puppet-pants:${character.pants};--puppet-hair:${character.hair};--puppet-accent:${character.accent}">
            <defs>
              <linearGradient id="jacket-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="var(--puppet-accent)"/><stop offset=".36" stop-color="var(--puppet-jacket)"/><stop offset="1" stop-color="var(--puppet-pants)"/></linearGradient>
              <linearGradient id="skin-${uid}" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#fff1df"/><stop offset=".32" stop-color="var(--puppet-skin)"/><stop offset="1" stop-color="#7f4439"/></linearGradient>
              <filter id="shadow-${uid}" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="5" flood-color="#001222" flood-opacity=".52"/></filter>
            </defs>
            <ellipse class="puppet-shadow" cx="83" cy="139" rx="51" ry="7"/>
            <g class="puppet-body" filter="url(#shadow-${uid})">
              <path class="puppet-back-arm" d="M65 79 C47 88 43 106 51 116"/>
              <path class="puppet-leg puppet-leg--left" d="M72 111 L62 136 L47 136"/>
              <path class="puppet-leg puppet-leg--right" d="M96 112 L108 136 L123 136"/>
              <path class="puppet-shoe" d="M43 136 C46 131 58 132 64 136 Z"/><path class="puppet-shoe" d="M107 136 C111 131 123 132 129 136 Z"/>
              <path class="puppet-torso" d="M61 65 Q81 57 104 67 L108 110 Q84 121 59 109 Z" fill="url(#jacket-${uid})"/>
              <path class="puppet-shirt" d="M77 67 L84 94 L91 68"/>
              <path class="puppet-neck" d="M78 61 L77 70 Q84 76 91 70 L90 60" fill="url(#skin-${uid})"/>
              <path class="puppet-point-arm" d="M101 73 C117 74 126 65 137 52 C142 46 149 41 157 40"/>
              <path class="puppet-point-hand" d="M154 39 L165 35 M156 41 L165 44 M157 40 L167 40"/>
              <circle class="puppet-head" cx="84" cy="45" r="23" fill="url(#skin-${uid})"/>
              <path class="puppet-hair" d="M61 44 Q61 20 83 20 Q106 20 108 43 Q98 34 89 35 Q78 30 61 44 Z"/>
              <path class="puppet-nose" d="M89 44 L92 53 L88 53"/>
              <circle class="puppet-eye" cx="77" cy="46" r="2"/><circle class="puppet-eye" cx="94" cy="46" r="2"/>
              <path class="puppet-smile" d="M78 57 Q85 62 93 56"/>
              <path class="puppet-feature puppet-feature--one" d="M66 27 L102 27"/>
              <path class="puppet-feature puppet-feature--two" d="M69 42 Q84 33 100 42"/>
              <circle class="puppet-feature puppet-feature--three" cx="105" cy="54" r="3"/>
            </g>
            <path class="puppet-motion puppet-motion--one" d="M119 25 Q126 18 132 25"/><path class="puppet-motion puppet-motion--two" d="M132 31 Q139 24 145 31"/>
          </svg>
        </span>
        <span class="puppet-label"><b>SEE MORE <span aria-hidden="true">→</span></b><small>Explore all ${escapeHTML(label)} work</small></span>
        <span class="puppet-arrow" aria-hidden="true">↗</span>
      </a>`;
  }

  function getWorkMedia(project) {
    // `workMedia` is the new multi-file gallery. `homepageMedia` is kept as a
    // fallback so existing Best Work previews need no data migration.
    const sourceList = Array.isArray(project.workMedia) ? project.workMedia : project.homepageMedia ? [project.homepageMedia] : [];
    return sourceList.map(media => ({
      kind: ['image', 'video', 'embed'].includes(media?.kind) ? media.kind : 'image',
      source: safeMediaSource(media?.src),
      poster: safeMediaSource(media?.poster),
      alt: media?.alt || `${project.title} work preview`
    })).filter(media => media.source);
  }

  function makeProjectVisual(project, category, categoryProjects, projectUrl) {
    const mediaItems = getWorkMedia(project);
    const hasMultipleMedia = mediaItems.length > 1;
    const validProjectUrl = safeUrl(projectUrl);
    const canOpenProject = validProjectUrl !== '#';
    const caption = `
      <span class="art-chip">${mediaItems.length ? `${mediaItems.length} WORK PREVIEW${mediaItems.length === 1 ? '' : 'S'}${hasMultipleMedia ? ' · SCROLL →' : ''}` : 'SELECTED WORK'}</span>
      <span class="art-number">${escapeHTML(category.number)}</span>
      <div class="art-bottom">
        <div><small>${escapeHTML(category.title.toUpperCase())}</small><strong>${escapeHTML(project.title)}</strong></div>
        <span>${String(categoryProjects.length).padStart(2, '0')} PROJECT${categoryProjects.length === 1 ? '' : 'S'}</span>
      </div>`;

    if (!mediaItems.length) {
      return `<div class="project-art project-art--placeholder" aria-label="Featured work visual for ${escapeHTML(category.title)}">
        <div class="art-grid"></div><div class="art-orbit"></div><div class="art-core"></div><div class="art-cross"></div>${caption}
      </div>`;
    }

    const mediaMarkup = mediaItems.map((media, index) => {
      const label = `${project.title} preview ${index + 1}${canOpenProject ? ' — open project' : ''}`;
      let content = '';
      if (media.kind === 'video') {
        content = `<video class="work-media" muted loop autoplay playsinline preload="metadata"${media.poster ? ` poster="${escapeHTML(media.poster)}"` : ''}><source src="${escapeHTML(media.source)}">Your browser does not support this video.</video>`;
      } else if (media.kind === 'embed') {
        content = `<iframe class="work-media" src="${escapeHTML(media.source)}" title="${escapeHTML(media.alt)}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      } else {
        content = `<img class="work-media" src="${escapeHTML(media.source)}" alt="${escapeHTML(media.alt)}" loading="lazy">`;
      }

      if (media.kind === 'embed') {
        return `<div class="work-media-slide work-media-slide--embed">${content}${canOpenProject ? `<a class="media-open-overlay" href="${escapeHTML(validProjectUrl)}" target="_blank" rel="noopener" aria-label="${escapeHTML(label)}"></a>` : ''}</div>`;
      }
      if (canOpenProject) {
        return `<a class="work-media-slide" href="${escapeHTML(validProjectUrl)}" target="_blank" rel="noopener" aria-label="${escapeHTML(label)}">${content}<span class="media-open-hint" aria-hidden="true">OPEN PROJECT ↗</span></a>`;
      }
      return `<div class="work-media-slide">${content}</div>`;
    }).join('');

    return `<div class="project-art project-art--media${hasMultipleMedia ? ' project-art--gallery' : ''}" aria-label="Work preview for ${escapeHTML(project.title)}">
      <div class="work-media-gallery${hasMultipleMedia ? ' work-media-gallery--multiple' : ''}" aria-label="${escapeHTML(project.title)} media gallery">${mediaMarkup}</div><div class="project-media-shade"></div>${caption}
    </div>`;
  }

  function makeWorkSection(category, index) {
    const project = getFeaturedProject(category.id);
    if (!project) return '';
    const categoryProjects = getCategoryProjects(category.id);
    const links = (project.links || []).filter(link => link && link.url);
    const primaryLink = links[0];
    return `
      <section class="work-section reveal" id="${escapeHTML(category.id)}">
        <div class="category-meta">
          <span class="category-index">FIELD / ${escapeHTML(category.number)}</span>
          <span class="category-kicker">${escapeHTML(category.eyebrow)}</span>
        </div>
        <div class="showcase-grid">
          ${makeProjectVisual(project, category, categoryProjects, primaryLink?.url)}
          <div class="showcase-copy">
            <div class="showcase-description">
              <span class="eyebrow">BEST WORK · ${escapeHTML(category.eyebrow)}</span>
              <h3>${escapeHTML(project.title)}</h3>
              <div class="project-type">${escapeHTML(project.type || category.title)}</div>
              <p>${escapeHTML(project.description)}</p>
              <span class="project-date">${escapeHTML(project.date || 'Selected project')}</span>
            </div>
            <div class="showcase-actions">
              ${makePuppetLink(category.id, category.nav, index)}
              ${primaryLink ? `<p class="direct-project-link"><a href="${escapeHTML(safeUrl(primaryLink.url))}" target="_blank" rel="noopener">Open this Best Work: ${escapeHTML(primaryLink.label)} ↗</a></p>` : ''}
            </div>
          </div>
        </div>
      </section>`;
  }

  if (data && sectionRoot) {
    sectionRoot.innerHTML = data.categories.map(makeWorkSection).join('');
  }

  // Five still photographs become a scroll-controlled, cinematic frame sequence.
  const beats = [...document.querySelectorAll('.story-beat')];
  const frames = [...document.querySelectorAll('.story-image')];
  const storyCopy = document.querySelector('.story-copy');
  const storyTitleFirst = document.getElementById('story-title-first');
  const storyTitleSecond = document.getElementById('story-title-second');
  const storyDescription = document.getElementById('story-description');
  const storyCount = document.getElementById('story-count');
  let activeBeat = -1;
  let storyTextTimer;

  function updateStoryText(titleParts, description, animate) {
    const update = () => {
      if (storyTitleFirst) storyTitleFirst.textContent = titleParts[0] || '';
      if (storyTitleSecond) storyTitleSecond.textContent = titleParts[1] || '';
      if (storyDescription) storyDescription.textContent = description || '';
    };

    window.clearTimeout(storyTextTimer);
    if (!storyCopy || !animate) {
      update();
      return;
    }

    storyCopy.classList.add('is-changing');
    storyTextTimer = window.setTimeout(() => {
      update();
      window.requestAnimationFrame(() => storyCopy.classList.remove('is-changing'));
    }, 180);
  }

  function setStoryFrame(index) {
    const next = Math.max(0, Math.min(index, beats.length - 1));
    if (next === activeBeat || !beats[next]) return;
    const animateText = activeBeat !== -1;
    activeBeat = next;
    frames.forEach((frame, frameIndex) => frame.classList.toggle('active', frameIndex === next));
    const beat = beats[next];
    updateStoryText((beat.dataset.title || '').split('|'), beat.dataset.description || '', animateText);
    if (storyCount) storyCount.textContent = String(next + 1).padStart(2, '0');
  }

  if ('IntersectionObserver' in window && beats.length) {
    const storyObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setStoryFrame(beats.indexOf(visible.target));
    }, { root: null, threshold: [0.12, 0.3, 0.5, 0.7], rootMargin: '-28% 0px -28% 0px' });
    beats.forEach(beat => storyObserver.observe(beat));
  } else if (beats.length) {
    window.addEventListener('scroll', () => {
      const stage = document.querySelector('.scrolly');
      const rect = stage.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (stage.offsetHeight - window.innerHeight)));
      setStoryFrame(Math.round(progress * (beats.length - 1)));
    }, { passive: true });
  }

  // Scroll entrance and active category navigation.
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const categorySections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && categorySections.length) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    categorySections.forEach(section => navObserver.observe(section));
  }

  // The work nearest the centre of the viewport becomes the clear glass card;
  // its neighbours soften into the background until the next field takes focus.
  function setFocusedWork(section) {
    if (!section) return;
    categorySections.forEach(item => item.classList.toggle('is-focused', item === section));
    sectionRoot?.classList.add('has-focused-work');
  }

  function findFocusedWork() {
    if (!categorySections.length) return;
    const viewportMiddle = window.innerHeight / 2;
    const nearest = categorySections.reduce((current, section) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs((rect.top + rect.height / 2) - viewportMiddle);
      return !current || distance < current.distance ? { section, distance } : current;
    }, null);
    setFocusedWork(nearest?.section);
  }

  if (categorySections.length) {
    let focusFrame;
    const scheduleFocus = () => {
      window.cancelAnimationFrame(focusFrame);
      focusFrame = window.requestAnimationFrame(findFocusedWork);
    };
    window.addEventListener('scroll', scheduleFocus, { passive: true });
    window.addEventListener('resize', scheduleFocus);
    scheduleFocus();
  }
})();
