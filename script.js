/**
 * مؤسسة التميز للمظلات والسواتر - الرياض
 * Interactive JavaScript Engine (2026 Edition)
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. HERO BACKGROUND AUTO SLIDER
       ========================================================================== */
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    if (heroSlides.length > 1) {
        setInterval(() => {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }, 5000);
    }

    /* ==========================================================================
       2. STICKY NAVBAR SCROLL EFFECT
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       3. MOBILE NAVIGATION MENU
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const mobileOverlay = document.getElementById('mobile-overlay');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    };

    const closeMenu = () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMenu);
    }

    // Close mobile menu on clicking any navigation anchor
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* ==========================================================================
       4. SMOOTH SCROLLING WITH OFFSET
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================================================
       5. INTERACTIVE COST CALCULATOR
       ========================================================================== */
    const serviceSelect = document.getElementById('calc-service');
    const areaRange = document.getElementById('calc-area-range');
    const areaNumber = document.getElementById('calc-area-number');
    const locationSelect = document.getElementById('calc-location');
    const priceOutput = document.getElementById('calc-price-output');
    const sumServiceName = document.getElementById('sum-service-name');
    const sumAreaVal = document.getElementById('sum-area-val');
    const btnSendCalc = document.getElementById('btn-send-calc');

    // Approximate price ranges per square meter in SAR
    const pricingData = {
        shades: {
            min: 110,
            max: 135,
            name: 'مظلات سيارات وحدائق (قماش كوري/ألماني)'
        },
        screens_steel: {
            min: 130,
            max: 170,
            name: 'سواتر حديد (شرائح ومجدول)'
        },
        screens_fabric: {
            min: 90,
            max: 115,
            name: 'سواتر قماش بوثلين / PVC'
        },
        pergolas: {
            min: 210,
            max: 290,
            name: 'برجولات حديد شكل خشب مع لكسان'
        },
        hangars: {
            min: 160,
            max: 230,
            name: 'هناجر ومستودعات وساندوتش بانل'
        },
        roofing: {
            min: 140,
            max: 190,
            name: 'قرميد مع عوازل كاملة'
        }
    };

    const updateCalculator = () => {
        if (!serviceSelect || !areaNumber || !priceOutput) return;

        const currentService = serviceSelect.value;
        const area = Math.max(5, parseInt(areaNumber.value) || 30);
        const pricing = pricingData[currentService] || pricingData.shades;

        const minTotal = Math.round(pricing.min * area);
        const maxTotal = Math.round(pricing.max * area);

        // Format numbers with commas
        const formatNum = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        priceOutput.textContent = `${formatNum(minTotal)} - ${formatNum(maxTotal)}`;
        if (sumServiceName) sumServiceName.textContent = pricing.name;
        if (sumAreaVal) sumAreaVal.textContent = `${area} م²`;

        // Update WhatsApp link
        if (btnSendCalc) {
            const locText = locationSelect ? locationSelect.value : 'الرياض';
            const msg = `السلام عليكم، قمت بحساب تقديري عبر الموقع لمشروع:
- الخدمة: ${pricing.name}
- المساحة: ${area} متر مربع
- الموقع: ${locText}
- التكلفة التقديرية: ${formatNum(minTotal)} إلى ${formatNum(maxTotal)} ريال
أرغب في تأكيد السعر وتحديد موعد معاينة مجانية ورفع المقاسات.`;

            btnSendCalc.href = `https://wa.me/966536011235?text=${encodeURIComponent(msg)}`;
        }
    };

    if (areaRange && areaNumber) {
        areaRange.addEventListener('input', () => {
            areaNumber.value = areaRange.value;
            updateCalculator();
        });

        areaNumber.addEventListener('input', () => {
            areaRange.value = areaNumber.value;
            updateCalculator();
        });
    }

    if (serviceSelect) {
        serviceSelect.addEventListener('change', updateCalculator);
    }

    if (locationSelect) {
        locationSelect.addEventListener('change', updateCalculator);
    }

    // Initial calculation
    updateCalculator();

    /* ==========================================================================
       6. PORTFOLIO GALLERY & LIGHTBOX
       ========================================================================== */
    const galleryItems = [
        { src: '10.jpg', category: 'shades', title: 'مظلة سيارات كابولي مودرن فخمة', catName: 'مظلات سيارات' },
        { src: '1.jpg', category: 'shades', title: 'مظلات قماش PVC عالي الكثافة', catName: 'مظلات حدائق' },
        { src: 'IMG-20250708-WA0037.jpg', category: 'shades', title: 'مظلات مشاريع ومواقف سيارات كبرى', catName: 'مظلات مواقف' },
        { src: '14.jpg', category: 'shades', title: 'هيكل مظلة حديد سابك مجلفن', catName: 'مظلات وسواتر' },
        { src: 'IMG-20250708-WA0036.jpg', category: 'shades', title: 'مظلة هرمية لمدخل فيلا راقية', catName: 'مظلات مداخل' },
        { src: 'IMG-20250708-WA0013.jpg', category: 'shades', title: 'مظلة معلقة بدون أعمدة أرضية', catName: 'مظلات معلقة' },

        { src: '2.jpg', category: 'screens', title: 'ساتر شرائح حديد حجب رؤية 100%', catName: 'سواتر حديد' },
        { src: '12.jpg', category: 'screens', title: 'ساتر مجدول بدهان ناري مقاوم للصدأ', catName: 'سواتر مجدول' },
        { src: 'IMG-20250708-WA0039.jpg', category: 'screens', title: 'سواتر أسوار فلل وقصور بالرياض', catName: 'سواتر فلل' },
        { src: 'IMG-20250708-WA0041.jpg', category: 'screens', title: 'سواتر قص ليزر CNC فخمة', catName: 'سواتر ليزر' },
        { src: '7.jpg', category: 'screens', title: 'سواتر شينكو وألواح حماية', catName: 'سواتر شينكو' },
        { src: 'IMG-20250708-WA0028.jpg', category: 'screens', title: 'ساتر قماش بوثلين عالي الحماية', catName: 'سواتر قماش' },

        { src: '18.jpg', category: 'pergolas', title: 'برجولة حديد شكل خشب مع لكسان شفاف', catName: 'برجولات حدائق' },
        { src: '17.jpg', category: 'pergolas', title: 'برجولة مودرن لجلسة خارجية فاخرة', catName: 'جلسات خارجية' },
        { src: 'IMG-20250708-WA0033.jpg', category: 'pergolas', title: 'برجولة أسطح مع عوازل أمطار وإضاءة', catName: 'برجولات أسطح' },
        { src: 'IMG-20250708-WA0015.jpg', category: 'pergolas', title: 'تنسيق جلسة متكاملة عشب وبديل خشب', catName: 'تنسيق جلسات' },
        { src: 'IMG-20250708-WA0035.jpg', category: 'pergolas', title: 'برجولة مدخل وممر فيلا ديكورية', catName: 'برجولات مداخل' },
        { src: '3.jpg', category: 'pergolas', title: 'برجولة خشب معالج مع إضاءة ليد مخفية', catName: 'برجولات حديثة' },

        { src: '13.jpg', category: 'hangars', title: 'هناجر ومستودعات تخزين تجارية', catName: 'هناجر ومستودعات' },
        { src: '16.jpg', category: 'hangars', title: 'بناء هيكل هناجر حديد ثقيل معتمد', catName: 'مشاريع هناجر' },
        { src: '8.jpg', category: 'hangars', title: 'مظلات مشاريع حكومية ومصانع', catName: 'مشاريع كبرى' },
        { src: '5.jpg', category: 'hangars', title: 'شبوك وسياجات أمنية للأراضي والمزارع', catName: 'شبوك وسياجات' },
        { src: '4.jpg', category: 'hangars', title: 'قرميد إيطالي مع عزل مائي وحراري', catName: 'قرميد وملاحق' },
        { src: '9.jpg', category: 'hangars', title: 'تغطيات أسطح ومداخل قرميد فخمة', catName: 'قرميد واجهات' }
    ];

    const galleryGrid = document.getElementById('main-gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('gallery-load-more');

    let activeFilter = 'all';
    let displayedCount = 9;
    let filteredList = [...galleryItems];

    const renderGallery = () => {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';

        filteredList = activeFilter === 'all'
            ? galleryItems
            : galleryItems.filter(item => item.category === activeFilter);

        const visibleItems = filteredList.slice(0, displayedCount);

        visibleItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            card.innerHTML = `
                <img src="imgg/${item.src}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <span class="gallery-category-badge">${item.catName}</span>
                    <h4 class="gallery-card-title">${item.title}</h4>
                    <span class="gallery-zoom-hint">
                        <i class="ri-zoom-in-line"></i> تكبير واستعراض الصورة
                    </span>
                </div>
            `;

            card.addEventListener('click', () => {
                openLightbox(index);
            });

            galleryGrid.appendChild(card);
        });

        // Toggle load more visibility
        if (loadMoreBtn) {
            loadMoreBtn.style.display = displayedCount >= filteredList.length ? 'none' : 'inline-flex';
        }
    };

    // Filter Button Clicks
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            activeFilter = this.getAttribute('data-filter');
            displayedCount = 9;
            renderGallery();
        });
    });

    // Load More Button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            displayedCount += 6;
            renderGallery();
        });
    }

    // Render Initial Gallery
    renderGallery();

    /* ==========================================================================
       7. LIGHTBOX MODAL FUNCTIONALITY
       ========================================================================== */
    const lightboxModal = document.getElementById('image-lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

    let currentLightboxIndex = 0;

    const openLightbox = (index) => {
        if (!filteredList[index]) return;
        currentLightboxIndex = index;
        updateLightboxContent();
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const updateLightboxContent = () => {
        const item = filteredList[currentLightboxIndex];
        if (!item) return;
        lightboxImg.src = `imgg/${item.src}`;
        lightboxCaption.textContent = item.title;
        lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${filteredList.length}`;
    };

    const closeLightbox = () => {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    const nextImage = () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % filteredList.length;
        updateLightboxContent();
    };

    const prevImage = () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + filteredList.length) % filteredList.length;
        updateLightboxContent();
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

    // Keyboard navigation (Esc, Left, Right)
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') prevImage();
        if (e.key === 'ArrowLeft') nextImage();
    });

    /* ==========================================================================
       8. FAQ ACCORDION
       ========================================================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Open first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }

    /* ==========================================================================
       9. INSTANT QUOTATION FORM
       ========================================================================== */
    const quoteForm = document.getElementById('quote-direct-form');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('cust-name').value.trim();
            const phone = document.getElementById('cust-phone').value.trim();
            const service = document.getElementById('cust-service').value;
            const location = document.getElementById('cust-location').value.trim() || 'الرياض';
            const notes = document.getElementById('cust-notes').value.trim();

            const message = `السلام عليكم ورحمة الله،
أرغب في طلب معاينة وتسعيرة لمشروع:
- الاسم: ${name}
- رقم الجوال: ${phone}
- الخدمة المطلوبة: ${service}
- الموقع بالرياض: ${location}
${notes ? `- ملاحظات إضافية: ${notes}` : ''}
يرجى التواصل معي لتحديد الموعد المناسب.`;

            const whatsappUrl = `https://wa.me/966536011235?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    /* ==========================================================================
       10. SCROLLSPY (ACTIVE LINK HIGHLIGHTING)
       ========================================================================== */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navAnchors = document.querySelectorAll('.nav-links .nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navAnchors.forEach(anchor => {
            anchor.classList.remove('active');
            if (anchor.getAttribute('href') === `#${currentSectionId}`) {
                anchor.classList.add('active');
            }
        });
    });

});
