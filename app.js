document.addEventListener('DOMContentLoaded', () => {
  // SVG Icon helper mapping for dynamic styling
  const getIconSvg = (name, width = 14, height = 14, color = 'currentColor') => {
    const icons = {
      globe: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
      layers: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>`,
      triangle: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 9.4 7.55 4.24a1.79 1.79 0 0 0-2.5 1.55v12.42a1.79 1.79 0 0 0 2.5 1.55L16.5 14.6a1.78 1.78 0 0 0 0-3.2z"></path></svg>`,
      sparkle: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`,
      degree: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
      school: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
      code: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
      database: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path></svg>`,
      git: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="6" y1="9" x2="6" y2="15"></line><path d="M9 18h3a3 3 0 0 0 3-3V9"></path></svg>`,
      terminal: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`,
      cpu: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>`,
      react: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)"></ellipse><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)"></ellipse><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)"></ellipse><circle cx="12" cy="12" r="1.8" fill="${color}"></circle></svg>`,
      node: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="8"></line><line x1="12" y1="16" x2="12" y2="22"></line><line x1="2" y1="12" x2="8" y2="12"></line><line x1="16" y1="12" x2="22" y2="12"></line></svg>`,
      docker: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="6" height="6" rx="1"></rect><rect x="9" y="2" width="6" height="6" rx="1"></rect><rect x="16" y="2" width="6" height="6" rx="1"></rect><rect x="2" y="9" width="6" height="6" rx="1"></rect><rect x="9" y="9" width="6" height="6" rx="1"></rect><rect x="16" y="9" width="6" height="6" rx="1"></rect><path d="M2 20h20a2 2 0 0 0 2-2v-2H0v2a2 2 0 0 0 2 2z"></path></svg>`,
      python: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H9a4 4 0 0 0-4 4v3a4 4 0 0 0 4 4h6a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4h-3"></path><circle cx="9" cy="6" r="1"></circle><circle cx="15" cy="18" r="1"></circle></svg>`,
      javascript: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 15c.5 1 1.5 1.5 2.5 1.5s2-1 2-2.5v-5"></path><path d="M15 15c1 0 2-.5 2-1.5s-1-1.5-2-1.5-2-.5-2-1.5 1-1.5 2-1.5"></path></svg>`,
      typescript: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M8 9h4M10 9v7"></path><path d="M14 15c1 0 2-.5 2-1.5s-1-1.5-2-1.5-2-.5-2-1.5 1-1.5 2-1.5"></path></svg>`,
      tailwind: `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2A10 10 0 0 0 2 12c0 2.5 1 4.8 2.6 6.4L12 11.2l7.4 7.2A10 10 0 0 0 22 12a10 10 0 0 0-10-10z"></path></svg>`
    };
    return icons[name] || icons.layers;
  };

  // Loader dismiss helper
  const dismissLoader = () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => {
        try { loader.remove(); } catch(e) {}
      }, 400);
    }
  };

  // Fetch portfolio data from Express server
  fetch('/api/portfolio')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load portfolio database.');
      return res.json();
    })
    .then(data => {
      renderPortfolio(data);
      initializeUIInteractions();
      dismissLoader();
    })
    .catch(err => {
      console.error('Error rendering dynamic sections:', err);
      // Fallback display if API fails
      document.body.insertAdjacentHTML('afterbegin', `
        <div style="position: fixed; top: 1rem; left: 50%; transform: translateX(-50%); background: rgba(220, 38, 38, 0.9); color: white; padding: 0.75rem 1.5rem; border-radius: 9999px; font-weight: 600; z-index: 99999; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: Outfit, sans-serif;">
          ⚠️ Offline Mode: Running with static fallbacks
        </div>
      `);
      dismissLoader();
    });

  // Render database content into respective container templates
  const renderPortfolio = (data) => {
    // 1. Navigation & Profile Brand name
    const fontFamilies = {
      'Outfit': "'Outfit', 'Baloo Chettan 2', sans-serif",
      'Playfair Display': "'Playfair Display', 'Baloo Chettan 2', serif",
      'Space Grotesk': "'Space Grotesk', 'Baloo Chettan 2', sans-serif",
      'Montserrat': "'Montserrat', 'Baloo Chettan 2', sans-serif",
      'Syne': "'Syne', 'Baloo Chettan 2', sans-serif",
      'Baloo Chettan 2': "'Baloo Chettan 2', 'Outfit', sans-serif",
      'Manjari': "'Manjari', 'Outfit', sans-serif",
      'Gayathri': "'Gayathri', 'Outfit', sans-serif",
      'Chilanka': "'Chilanka', 'Outfit', sans-serif",
      'Anek Malayalam': "'Anek Malayalam', 'Outfit', sans-serif"
    };
    const selectedFont = data.bio.nameFont || 'Outfit';
    const fontStyle = fontFamilies[selectedFont] || fontFamilies['Outfit'];
    
    const logoEl = document.getElementById('nav-logo-name');
    logoEl.innerText = data.bio.logoName || data.bio.name;
    logoEl.style.fontFamily = fontStyle;
    
    // 2. Navigation Links
    document.getElementById('nav-link-github').href = data.socials.github;
    document.getElementById('nav-link-twitter').href = data.socials.twitter;
    document.getElementById('nav-link-linkedin').href = data.socials.linkedin;
    document.getElementById('nav-link-instagram').href = data.socials.instagram;

    // 3. Hero Info
    document.getElementById('hero-badge-text').innerText = data.bio.headline;
    const heroTitleEl = document.getElementById('hero-title-name');
    heroTitleEl.innerText = data.bio.name;
    heroTitleEl.style.fontFamily = fontStyle;
    document.getElementById('hero-subtitle-text').innerText = data.bio.cursiveSubtitle;
    document.getElementById('hero-description').innerText = data.bio.description;
    
    const polaroidImg = document.getElementById('hero-polaroid-img');
    polaroidImg.src = data.bio.avatar;
    polaroidImg.alt = data.bio.name;
    document.getElementById('hero-polaroid-name').innerText = data.bio.polaroidName || data.bio.name;

    // 4. Projects Section
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = data.projects.map(project => {
      const ribbonHtml = project.viral ? `
        <div class="ribbon">
          <span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
            VIRAL
          </span>
        </div>` : '';
        
      const brandColor = project.colorClass.split('-')[0];
      const tagsHtml = project.tags.map(t => `
        <span class="tag">
          ${getIconSvg(t.icon, 10, 10, t.color)}
          ${t.name}
        </span>
      `).join('');

      const bulletsHtml = project.bullets.map(b => `<li>${b}</li>`).join('');
      const bannerLink = (project.showDemo === true && project.demoLink) ? project.demoLink : (project.showGithub !== false ? project.link : '#');

      return `
        <div class="soft-card project-card ${project.colorClass}" style="margin-top: 1rem;">
          ${ribbonHtml}
          <a href="${bannerLink}" target="_blank" rel="noreferrer" class="project-banner" style="background-color: ${project.bgColor};">
            <div class="project-banner-overlay"></div>
            <img src="${project.bannerImage}" alt="${project.title}" onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');" />
            <h3 class="hidden font-handwriting" style="font-size: 3rem; color: var(--brand-${brandColor}); font-weight: 700; transform: rotate(-3deg); filter: drop-shadow(0 1px 1px rgba(0,0,0,0.05));">${project.title}</h3>
          </a>
          <div class="project-details">
            <div class="project-header">
              <h3>${project.title}</h3>
              <div class="flex" style="gap: 0.5rem;">
                ${project.showGithub !== false ? `
                <a href="${project.link}" title="GitHub" target="_blank" rel="noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                </a>` : ''}
                ${(project.showDemo === true && project.demoLink) ? `
                <a href="${project.demoLink}" title="Live Demo" target="_blank" rel="noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>` : ''}
              </div>
            </div>
            <div class="project-tags">
              ${tagsHtml}
            </div>
            <ul class="project-bullets">
              ${bulletsHtml}
            </ul>
          </div>
        </div>
      `;
    }).join('');

    // 5. Experience Section
    const experienceTimeline = document.getElementById('experience-timeline');
    experienceTimeline.innerHTML = data.experience.map(exp => {
      const bulletsHtml = exp.bullets.map(b => `<li>${b}</li>`).join('');
      return `
        <div class="experience-item">
          <div class="timeline-marker"></div>
          <div class="experience-content">
            <div class="experience-meta">
              <h3>${exp.role}</h3>
              <span>${exp.dateRange}</span>
            </div>
            <div class="experience-company">${exp.company}</div>
            <ul class="experience-desc">
              ${bulletsHtml}
            </ul>
          </div>
        </div>
      `;
    }).join('');

    // 6. Education Section
    const educationGrid = document.getElementById('education-grid');
    educationGrid.innerHTML = data.education.map(edu => {
      const brandColor = edu.color; // 'pink' or 'blue'
      const iconHexColor = brandColor === 'pink' ? 'var(--brand-pink)' : 'var(--brand-blue)';
      const rgbColor = brandColor === 'pink' ? '255, 104, 175' : '109, 132, 255';
      return `
        <div class="soft-card edu-card group">
          <div>
            <div class="edu-card-icon" style="background-color: rgba(${rgbColor}, 0.1);">
              ${getIconSvg(edu.iconType, 24, 24, iconHexColor)}
            </div>
            <h3>${edu.degree}</h3>
            <p class="text-slate-500 font-medium" style="margin-top: 0.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #94a3b8;"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${edu.institution}
            </p>
          </div>
          <div class="edu-card-footer">
            <span class="edu-card-date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #94a3b8;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              ${edu.dateRange}
            </span>
            <span class="edu-badge" style="background-color: rgba(${rgbColor}, 0.1); color: var(--brand-${brandColor}); border-color: rgba(${rgbColor}, 0.2);">
              ${edu.score}
            </span>
          </div>
        </div>
      `;
    }).join('');

    // 7. Skills Section
    const skillsGrid = document.getElementById('skills-grid');
    skillsGrid.innerHTML = data.skills.map(cat => {
      const skillsHtml = cat.list.map(s => `
        <span class="skill-tag">
          ${getIconSvg(s.icon, 14, 14, s.color)}
          ${s.name}
        </span>
      `).join('');
      const spanClass = cat.category === 'Tools & Other' ? 'col-span-2' : '';
      return `
        <div class="soft-card skill-card ${spanClass}">
          <h3>${cat.category}</h3>
          <div class="skill-tags">
            ${skillsHtml}
          </div>
        </div>
      `;
    }).join('');

    // 8. Contact Section Details
    document.getElementById('contact-desc').innerText = "Interested in building something together or just want to say hi? I'd love to hear from you.";
    document.getElementById('contact-cta-btn').href = data.bio.linkedinCta;
    
    const emailLink = document.getElementById('contact-email-link');
    emailLink.href = 'mailto:' + data.bio.email;
    emailLink.innerText = data.bio.email;

    // Footer Socials
    document.getElementById('footer-link-github').href = data.socials.github;
    document.getElementById('footer-link-linkedin').href = data.socials.linkedin;
    document.getElementById('footer-link-twitter').href = data.socials.twitter;
    document.getElementById('footer-link-instagram').href = data.socials.instagram;
  };

  // Initialize interactive micro-animations and scroll behaviors
  const initializeUIInteractions = () => {
    const desktopDockItems = document.querySelectorAll('.desktop-dock-item');
    const mobileDockItems = document.querySelectorAll('.mobile-dock-item');
    const mobileDockTrigger = document.getElementById('mobile-dock-trigger');
    const mobileDockMenu = document.getElementById('mobile-dock-menu');
    const mobileActiveLabelText = document.querySelector('#mobile-active-label span');
    const mobileActiveLabelIcon = document.querySelector('#mobile-active-label svg');

    const sections = ['home', 'projects', 'experience', 'education', 'skills', 'contact'];

    // Scroll active section tracking
    const updateActiveSection = () => {
      const triggerLine = window.scrollY + window.innerHeight * 0.35;
      let current = 'home';

      // If user has scrolled near the bottom, force "contact" to be active
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
        current = 'contact';
      } else {
        for (const id of sections) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.offsetTop <= triggerLine) {
            current = id;
          }
        }
      }

      // Update Desktop Active UI
      desktopDockItems.forEach(item => {
        if (item.getAttribute('data-sec') === current) {
          item.classList.add('active');
          const svg = item.querySelector('svg');
          if (svg) {
            svg.style.display = 'inline-block';
            svg.classList.add('glow-pink-icon');
          }
        } else {
          item.classList.remove('active');
          const svg = item.querySelector('svg');
          if (svg) {
            svg.style.display = 'none';
            svg.classList.remove('glow-pink-icon');
          }
        }
      });

      // Update Mobile Active UI
      mobileDockItems.forEach(item => {
        const dot = item.querySelector('.mobile-dock-item-dot');
        const svg = item.querySelector('svg');
        if (item.getAttribute('data-sec') === current) {
          item.classList.add('active');
          if (dot) dot.style.display = 'block';
          if (svg) {
            svg.style.display = 'inline-block';
            // Update trigger label
            mobileActiveLabelText.innerText = item.querySelector('span').innerText.trim();
            mobileActiveLabelIcon.innerHTML = svg.innerHTML;
            mobileActiveLabelIcon.setAttribute('viewBox', svg.getAttribute('viewBox') || '0 0 24 24');
          }
        } else {
          item.classList.remove('active');
          if (dot) dot.style.display = 'none';
          if (svg) svg.style.display = 'none';
        }
      });
    };

    // Smooth scroll click handlers
    const handleItemClick = (e) => {
      e.preventDefault();
      const button = e.currentTarget;
      const secId = button.getAttribute('data-sec');
      const targetEl = document.getElementById(secId);
      
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Close mobile menu if clicked
      if (mobileDockMenu.classList.contains('open')) {
        mobileDockMenu.classList.remove('open');
        mobileDockTrigger.classList.remove('open');
      }
    };

    desktopDockItems.forEach(item => {
      item.addEventListener('click', handleItemClick);
    });

    mobileDockItems.forEach(item => {
      item.addEventListener('click', handleItemClick);
    });

    // Mobile trigger toggle
    mobileDockTrigger.addEventListener('click', () => {
      const isOpen = mobileDockMenu.classList.toggle('open');
      mobileDockTrigger.classList.toggle('open', isOpen);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileDockTrigger.contains(e.target) && !mobileDockMenu.contains(e.target)) {
        mobileDockMenu.classList.remove('open');
        mobileDockTrigger.classList.remove('open');
      }
    });

    // Listeners
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    // Initial run
    updateActiveSection();
  };

  // Fetch GitHub stars for the portfolio repo dynamically
  const fetchGitHubStars = () => {
    const starCountBadge = document.getElementById('star-count-badge');
    const starCountNum = document.getElementById('star-count-num');
    
    fetch('https://api.github.com/repos/AlanSajiArayani/MyPortfolio')
      .then(res => {
        if (!res.ok) {
          return fetch('https://api.github.com/repos/zoxilsi/zoxilsi.cc');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
          starCountNum.innerText = data.stargazers_count;
          starCountBadge.style.display = 'inline-flex';
        }
      })
      .catch(err => {
        console.error('Error fetching github stars:', err);
      });
  };

  fetchGitHubStars();
});
