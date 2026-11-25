/* ==========================================================================
   TCT Traders — Flipkart-Level Wholesale Platform
   3D Flip Cards, E-Commerce Quotation Drawer, Live Search, Deals & Calculator
   ========================================================================== */
(function () {
  "use strict";

  /* ============================================================
     BUSINESS CONFIGURATION
     ============================================================ */
  var CONFIG = {
    phone: "+919384846922",
    displayPhone: "+91 93848 46922",
    whatsapp: "919384846922"
  };

  /* Product Catalog Data */
  var PRODUCTS_DATA = {
    "spoon-set": {
      name: "Serving Spoon Set (4 Pcs)",
      category: "Kitchenware",
      image: "assets/images/spoon.jpg?v=2",
      unit: "set",
      mrp: 120,
      price: 68,
      moq: 12,
      carton: 72,
      slabs: [
        { min: 12, max: 48, price: 75 },
        { min: 49, max: 144, price: 68 },
        { min: 145, max: Infinity, price: 59 }
      ]
    },
    "mug-set-6": {
      name: "Everyday Mug — Set of 6",
      category: "Buckets & Mugs",
      image: "assets/images/mug.jpg?v=2",
      unit: "set",
      mrp: 180,
      price: 95,
      moq: 10,
      carton: 60,
      slabs: [
        { min: 10, max: 29, price: 105 },
        { min: 30, max: 59, price: 95 },
        { min: 60, max: Infinity, price: 82 }
      ]
    },
    "heavy-bucket-20l": {
      name: "Heavy-Duty Bucket, 20 L",
      category: "Buckets & Mugs",
      image: "assets/images/bucket.jpg?v=2",
      unit: "pc",
      mrp: 280,
      price: 165,
      moq: 6,
      carton: 24,
      slabs: [
        { min: 6, max: 23, price: 180 },
        { min: 24, max: 47, price: 165 },
        { min: 48, max: Infinity, price: 145 }
      ]
    },
    "airtight-container-set": {
      name: "Airtight Container Set (4 Pcs)",
      category: "Storage Containers",
      image: "assets/images/container.jpg?v=2",
      unit: "set",
      mrp: 350,
      price: 195,
      moq: 8,
      carton: 32,
      slabs: [
        { min: 8, max: 31, price: 215 },
        { min: 32, max: 63, price: 195 },
        { min: 64, max: Infinity, price: 175 }
      ]
    },
    "compartment-lunchbox": {
      name: "Compartment Lunch Box",
      category: "Kitchenware",
      image: "assets/images/lunchbox.jpg?v=2",
      unit: "pc",
      mrp: 160,
      price: 88,
      moq: 12,
      carton: 48,
      slabs: [
        { min: 12, max: 47, price: 98 },
        { min: 48, max: 95, price: 88 },
        { min: 96, max: Infinity, price: 78 }
      ]
    },
    "fridge-water-bottle-1l": {
      name: "Fridge Water Bottle, 1 L",
      category: "Household Items",
      image: "assets/images/bottle.jpg?v=2",
      unit: "pc",
      mrp: 90,
      price: 46,
      moq: 12,
      carton: 96,
      slabs: [
        { min: 12, max: 47, price: 52 },
        { min: 48, max: 95, price: 46 },
        { min: 96, max: Infinity, price: 39 }
      ]
    },
    "pedal-dustbin-10l": {
      name: "Pedal Dustbin, 10 L",
      category: "Household Items",
      image: "assets/images/dustbin.jpg?v=2",
      unit: "pc",
      mrp: 320,
      price: 185,
      moq: 4,
      carton: 16,
      slabs: [
        { min: 4, max: 15, price: 205 },
        { min: 16, max: 31, price: 185 },
        { min: 32, max: Infinity, price: 165 }
      ]
    },
    "soap-dish-drain-tray": {
      name: "Soap Dish with Drain Tray",
      category: "Bathroom Essentials",
      image: "assets/images/soapdish.jpg?v=2",
      unit: "pc",
      mrp: 65,
      price: 32,
      moq: 24,
      carton: 144,
      slabs: [
        { min: 24, max: 71, price: 36 },
        { min: 72, max: 143, price: 32 },
        { min: 144, max: Infinity, price: 26 }
      ]
    },
    "disposable-cups-100": {
      name: "Disposable Cups — Pack of 100",
      category: "Disposable Items",
      image: "assets/images/cups.jpg?v=2",
      unit: "pack",
      mrp: 140,
      price: 74,
      moq: 10,
      carton: 50,
      slabs: [
        { min: 10, max: 24, price: 82 },
        { min: 25, max: 49, price: 74 },
        { min: 50, max: Infinity, price: 64 }
      ]
    },
    "tumbler-mug-set": {
      name: "Tumbler & Mug Set",
      category: "Bathroom Essentials",
      image: "assets/images/tumbler.jpg?v=2",
      unit: "set",
      mrp: 150,
      price: 79,
      moq: 12,
      carton: 48,
      slabs: [
        { min: 12, max: 47, price: 88 },
        { min: 48, max: 95, price: 79 },
        { min: 96, max: Infinity, price: 69 }
      ]
    }
  };

  document.documentElement.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var supportsObserver = "IntersectionObserver" in window;

  /* Helper to get slab unit price for a given quantity */
  function getSlabPrice(productId, quantity) {
    var p = PRODUCTS_DATA[productId];
    if (!p) return 0;
    for (var i = 0; i < p.slabs.length; i++) {
      var s = p.slabs[i];
      if (quantity >= s.min && quantity <= s.max) {
        return s.price;
      }
    }
    return p.price;
  }

  /* WhatsApp Link Builder */
  function buildWhatsAppUrl(message) {
    return (
      "https://wa.me/" +
      CONFIG.whatsapp +
      "?text=" +
      encodeURIComponent(message)
    );
  }

  /* Phone & WhatsApp links sync */
  function initContactLinks() {
    document.querySelectorAll("[data-phone-link]").forEach(function (link) {
      link.setAttribute("href", "tel:" + CONFIG.phone.replace(/[^\d+]/g, ""));
    });

    document.querySelectorAll("[data-phone-text]").forEach(function (node) {
      node.textContent = CONFIG.displayPhone;
    });

    document.querySelectorAll("[data-wa]").forEach(function (link) {
      var product = link.getAttribute("data-product");
      var message = product
        ? "Hi TCT Traders, I'd like to enquire about " +
          product +
          ". Could you share the wholesale slab prices and availability?"
        : "Hi TCT Traders, I'd like to get your wholesale plastic products catalog and bulk pricing.";

      link.setAttribute("href", buildWhatsAppUrl(message));
    });
  }

  /* ---------- Toast Notification System ---------- */
  function showToast(message, icon) {
    var container = document.getElementById("toast-container");
    if (!container) return;

    var toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = (icon ? icon + " " : "✅ ") + message;

    container.appendChild(toast);

    setTimeout(function () {
      toast.classList.add("toast-out");
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 320);
    }, 3200);
  }

  /* ============================================================
     3D FLIP CARD ARCHITECTURE ("aflipcard level")
     ============================================================ */
  function initCardFlip() {
    // Front flip button & back flip button clicks
    document.addEventListener("click", function (e) {
      var flipBtn = e.target.closest(".btn-card-flip");
      var backBtn = e.target.closest(".btn-flip-back");
      var cartonBtn = e.target.closest(".btn-add-carton");

      if (flipBtn) {
        var card = flipBtn.closest(".product-card-wrap");
        if (card) {
          card.classList.toggle("is-flipped");
        }
      } else if (backBtn) {
        var cardBack = backBtn.closest(".product-card-wrap");
        if (cardBack) {
          cardBack.classList.remove("is-flipped");
        }
      } else if (cartonBtn) {
        var wrap = cartonBtn.closest(".product-card-wrap");
        if (wrap) {
          var pid = wrap.getAttribute("data-id");
          var cartonQty = parseInt(wrap.getAttribute("data-carton"), 10) || 50;
          addToCart(pid, cartonQty);
          wrap.classList.remove("is-flipped");
          showToast("Added full carton (" + cartonQty + " units) to Quote Cart!", "📦");
        }
      }
    });
  }

  /* ============================================================
     WHOLESALE QUOTATION CART DRAWER (E-Commerce Drawer State)
     ============================================================ */
  var cartState = {}; // { productId: quantity }

  // Load cart from localStorage if available
  try {
    var savedCart = localStorage.getItem("tct_wholesale_cart");
    if (savedCart) cartState = JSON.parse(savedCart);
  } catch (e) {}

  function saveCart() {
    try {
      localStorage.setItem("tct_wholesale_cart", JSON.stringify(cartState));
    } catch (e) {}
  }

  function addToCart(productId, qty) {
    var item = PRODUCTS_DATA[productId];
    if (!item) return;

    var addAmount = qty || item.moq || 10;
    cartState[productId] = (cartState[productId] || 0) + addAmount;
    saveCart();
    renderCart();

    // Trigger badge animation
    var badge = document.getElementById("cart-badge-count");
    if (badge) {
      badge.classList.remove("pop");
      void badge.offsetWidth;
      badge.classList.add("pop");
    }

    showToast("Added " + addAmount + "x " + item.name + " to Quote Cart!", "🛒");
  }

  function removeFromCart(productId) {
    delete cartState[productId];
    saveCart();
    renderCart();
  }

  function updateCartQuantity(productId, newQty) {
    var item = PRODUCTS_DATA[productId];
    if (!item) return;

    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      cartState[productId] = newQty;
      saveCart();
      renderCart();
    }
  }

  function renderCart() {
    var itemsList = document.getElementById("cart-drawer-items");
    var badgeCount = document.getElementById("cart-badge-count");
    var badgeTotal = document.getElementById("cart-badge-total");
    var mobileBadges = document.querySelectorAll(".cart-count-badge");
    var floatCount = document.getElementById("float-cart-count");
    var floatTotal = document.getElementById("float-cart-total");

    var mrpTotalEl = document.getElementById("cart-mrp-total");
    var savingsTotalEl = document.getElementById("cart-savings-total");
    var grandTotalEl = document.getElementById("cart-grand-total");

    var delStatusEl = document.getElementById("delivery-bar-status");
    var delPctEl = document.getElementById("delivery-bar-pct");
    var delFillEl = document.getElementById("delivery-bar-fill");

    var productKeys = Object.keys(cartState);
    var totalItemsCount = 0;
    var totalMrpValue = 0;
    var totalWholesaleValue = 0;

    if (!itemsList) return;
    itemsList.innerHTML = "";

    if (productKeys.length === 0) {
      itemsList.innerHTML =
        '<div class="cart-empty-state">' +
        '<div class="cart-empty-icon">' +
        '<svg class="icon"><use href="#icon-cart"/></svg>' +
        '</div>' +
        '<h4>Your Quote Cart is empty</h4>' +
        '<p>Click "+ Quote" on any product or deal to build your custom wholesale order list.</p>' +
        '<a href="#products" class="btn btn--primary btn--sm" data-cart-browse>' +
        'Browse Wholesale Catalog' +
        '</a>' +
        '</div>';

      if (badgeCount) badgeCount.textContent = "0";
      if (badgeTotal) badgeTotal.textContent = "₹0";
      mobileBadges.forEach(function (b) { b.textContent = "0"; });
      if (floatCount) floatCount.textContent = "0 items";
      if (floatTotal) floatTotal.textContent = "₹0";

      if (mrpTotalEl) mrpTotalEl.textContent = "₹0";
      if (savingsTotalEl) savingsTotalEl.textContent = "₹0 (0% OFF)";
      if (grandTotalEl) grandTotalEl.textContent = "₹0";

      if (delFillEl) delFillEl.style.width = "0%";
      if (delPctEl) delPctEl.textContent = "0%";
      if (delStatusEl) delStatusEl.textContent = "Add ₹5,000 for FREE Coimbatore Delivery";
      return;
    }

    productKeys.forEach(function (pid) {
      var qty = cartState[pid];
      var prod = PRODUCTS_DATA[pid];
      if (!prod) return;

      var unitPrice = getSlabPrice(pid, qty);
      var subtotal = unitPrice * qty;
      var mrpSubtotal = prod.mrp * qty;

      totalItemsCount += qty;
      totalWholesaleValue += subtotal;
      totalMrpValue += mrpSubtotal;

      var itemRow = document.createElement("div");
      itemRow.className = "cart-item";
      itemRow.innerHTML =
        '<img class="cart-item__thumb" src="' + prod.image + '" alt="' + prod.name + '">' +
        '<div class="cart-item__content">' +
        '  <h4 class="cart-item__title">' + prod.name + '</h4>' +
        '  <div class="cart-item__rate">' +
        '    Wholesale Slab: <strong>₹' + unitPrice + '</strong> / ' + prod.unit +
        '    <span style="color:#94a3b8;margin-left:4px;"><del>₹' + prod.mrp + '</del></span>' +
        '  </div>' +
        '  <div class="cart-item__controls">' +
        '    <div class="cart-qty-stepper">' +
        '      <button class="cart-qty-btn cart-qty-minus" data-id="' + pid + '" type="button" aria-label="Decrease quantity">−</button>' +
        '      <span class="cart-qty-val">' + qty + '</span>' +
        '      <button class="cart-qty-btn cart-qty-plus" data-id="' + pid + '" type="button" aria-label="Increase quantity">+</button>' +
        '    </div>' +
        '    <span class="cart-item__subtotal">₹' + subtotal.toLocaleString("en-IN") + '</span>' +
        '    <button class="cart-item__remove" data-id="' + pid + '" type="button" aria-label="Remove item">' +
        '      <svg class="icon"><use href="#icon-trash"/></svg>' +
        '    </button>' +
        '  </div>' +
        '</div>';

      itemsList.appendChild(itemRow);
    });

    var totalSavings = totalMrpValue - totalWholesaleValue;
    var savingsPct = totalMrpValue > 0 ? Math.round((totalSavings / totalMrpValue) * 100) : 0;

    // Update Totals
    var formattedWholesale = "₹" + totalWholesaleValue.toLocaleString("en-IN");
    if (badgeCount) badgeCount.textContent = String(totalItemsCount);
    if (badgeTotal) badgeTotal.textContent = formattedWholesale;
    mobileBadges.forEach(function (b) { b.textContent = String(totalItemsCount); });
    if (floatCount) floatCount.textContent = totalItemsCount + " items";
    if (floatTotal) floatTotal.textContent = formattedWholesale;

    if (mrpTotalEl) mrpTotalEl.textContent = "₹" + totalMrpValue.toLocaleString("en-IN");
    if (savingsTotalEl) savingsTotalEl.textContent = "₹" + totalSavings.toLocaleString("en-IN") + " (" + savingsPct + "% OFF)";
    if (grandTotalEl) grandTotalEl.textContent = formattedWholesale;

    // Delivery progress meter
    var deliveryThreshold = 5000;
    var pct = Math.min(100, Math.round((totalWholesaleValue / deliveryThreshold) * 100));
    if (delFillEl) delFillEl.style.width = pct + "%";
    if (delPctEl) delPctEl.textContent = pct + "%";

    if (totalWholesaleValue >= deliveryThreshold) {
      if (delStatusEl) delStatusEl.innerHTML = "🎉 <strong>You unlocked FREE Local Delivery in Coimbatore!</strong>";
    } else {
      var diff = deliveryThreshold - totalWholesaleValue;
      if (delStatusEl) delStatusEl.textContent = "Add ₹" + diff.toLocaleString("en-IN") + " more for FREE Coimbatore Delivery";
    }
  }

  function openCartDrawer() {
    var drawer = document.getElementById("cart-drawer");
    var backdrop = document.getElementById("cart-drawer-backdrop");
    if (drawer && backdrop) {
      drawer.classList.add("is-open");
      backdrop.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      backdrop.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function closeCartDrawer() {
    var drawer = document.getElementById("cart-drawer");
    var backdrop = document.getElementById("cart-drawer-backdrop");
    if (drawer && backdrop) {
      drawer.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      backdrop.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  function initCartDrawer() {
    // Triggers
    var trigger = document.getElementById("cart-drawer-trigger");
    var mobileTrigger = document.getElementById("cart-drawer-trigger-mobile");
    var floatPill = document.getElementById("float-cart-pill");
    var closeBtn = document.getElementById("cart-drawer-close");
    var backdrop = document.getElementById("cart-drawer-backdrop");
    var clearBtn = document.getElementById("cart-clear-btn");
    var checkoutBtn = document.getElementById("btn-cart-checkout");

    if (trigger) trigger.addEventListener("click", openCartDrawer);
    if (mobileTrigger) mobileTrigger.addEventListener("click", openCartDrawer);
    if (floatPill) floatPill.addEventListener("click", openCartDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeCartDrawer);
    if (backdrop) backdrop.addEventListener("click", closeCartDrawer);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeCartDrawer();
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        cartState = {};
        saveCart();
        renderCart();
        showToast("Cart cleared.", "🗑️");
      });
    }

    // Delegate quantity buttons in cart list
    var itemsList = document.getElementById("cart-drawer-items");
    if (itemsList) {
      itemsList.addEventListener("click", function (e) {
        if (e.target.closest("[data-cart-browse]")) {
          closeCartDrawer();
          return;
        }

        var plusBtn = e.target.closest(".cart-qty-plus");
        var minusBtn = e.target.closest(".cart-qty-minus");
        var removeBtn = e.target.closest(".cart-item__remove");

        if (plusBtn) {
          var pid = plusBtn.getAttribute("data-id");
          updateCartQuantity(pid, (cartState[pid] || 0) + 1);
        } else if (minusBtn) {
          var pidMinus = minusBtn.getAttribute("data-id");
          updateCartQuantity(pidMinus, (cartState[pidMinus] || 0) - 1);
        } else if (removeBtn) {
          var pidRemove = removeBtn.getAttribute("data-id");
          removeFromCart(pidRemove);
        }
      });
    }

    // Front "+ Quote" and Deal "+ Add Deal" button delegation
    document.addEventListener("click", function (e) {
      var addBtn = e.target.closest(".btn-card-add");
      var quickDealBtn = e.target.closest("[data-quick-add]");

      if (addBtn) {
        var wrap = addBtn.closest(".product-card-wrap");
        if (wrap) {
          var pid = wrap.getAttribute("data-id");
          var moq = parseInt(wrap.getAttribute("data-moq"), 10) || 10;
          addToCart(pid, moq);
        }
      } else if (quickDealBtn) {
        var dealPid = quickDealBtn.getAttribute("data-quick-add");
        addToCart(dealPid, 10);
      }
    });

    // WhatsApp Checkout Export
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", function () {
        var keys = Object.keys(cartState);
        if (keys.length === 0) {
          showToast("Please add items to your cart first!", "⚠️");
          return;
        }

        var lines = [
          "🛍️ *NEW BULK ORDER INQUIRY - TCT TRADERS*",
          "📍 *Dispatch Location:* Ganapathy, Coimbatore",
          "--------------------------------------------",
          "📦 *ORDERED WHOLESALE ITEMS:*"
        ];

        var totalWholesale = 0;
        var totalMrp = 0;
        var totalUnits = 0;

        keys.forEach(function (pid, index) {
          var prod = PRODUCTS_DATA[pid];
          var qty = cartState[pid];
          if (!prod) return;

          var rate = getSlabPrice(pid, qty);
          var subtotal = rate * qty;
          totalWholesale += subtotal;
          totalMrp += prod.mrp * qty;
          totalUnits += qty;

          lines.push(
            (index + 1) + ". *" + prod.name + "*" +
            "\n   Qty: " + qty + " " + prod.unit + "s @ ₹" + rate + "/" + prod.unit +
            " = ₹" + subtotal.toLocaleString("en-IN")
          );
        });

        var savings = totalMrp - totalWholesale;
        var savingsPct = totalMrp > 0 ? Math.round((savings / totalMrp) * 100) : 0;

        lines.push("--------------------------------------------");
        lines.push("📊 *Total Units:* " + totalUnits + " items");
        lines.push("💰 *Estimated Wholesale Total:* ₹" + totalWholesale.toLocaleString("en-IN"));
        lines.push("🏷️ *Total Retail MRP Value:* ₹" + totalMrp.toLocaleString("en-IN"));
        lines.push("🎉 *Estimated Bulk Savings:* ₹" + savings.toLocaleString("en-IN") + " (" + savingsPct + "% OFF!)");
        lines.push("🚚 *Delivery Preference:* Coimbatore Pickup / Transport");
        lines.push("--------------------------------------------");
        lines.push("Hi TCT Traders, please check stock availability and send payment / dispatch details. Thank you!");

        var url = buildWhatsAppUrl(lines.join("\n"));
        window.open(url, "_blank", "noopener,noreferrer");
      });
    }

    renderCart();
  }

  /* ============================================================
     HERO BANNER PROMO CAROUSEL (Flipkart Slider)
     ============================================================ */
  function initHeroSlider() {
    var slider = document.getElementById("hero-slider");
    var dotsContainer = document.getElementById("slider-dots");
    var prevBtn = document.getElementById("slider-prev");
    var nextBtn = document.getElementById("slider-next");
    if (!slider || !dotsContainer) return;

    var slides = slider.querySelectorAll(".hero-slide");
    var dots = dotsContainer.querySelectorAll(".hero-slider__dot");
    var currentIndex = 0;
    var autoTimer = null;

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      slider.style.transform = "translateX(-" + currentIndex * 100 + "%)";

      slides.forEach(function (s, i) {
        s.classList.toggle("is-active", i === currentIndex);
      });

      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === currentIndex);
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAuto() {
      stopAuto();
      if (!reduceMotion.matches) {
        autoTimer = setInterval(nextSlide, 5500);
      }
    }

    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { prevSlide(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { nextSlide(); startAuto(); });

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goToSlide(i);
        startAuto();
      });
    });

    slider.addEventListener("mouseenter", stopAuto);
    slider.addEventListener("mouseleave", startAuto);

    startAuto();
  }

  /* ============================================================
     ⚡ FLASH WHOLESALE DEALS COUNTDOWN TIMER
     ============================================================ */
  function initDealCountdown() {
    var hoursEl = document.getElementById("timer-hours");
    var minsEl = document.getElementById("timer-minutes");
    var secsEl = document.getElementById("timer-seconds");
    if (!hoursEl || !minsEl || !secsEl) return;

    // Set countdown target to 6 hours from now or end of day
    var now = new Date();
    var target = new Date(now.getTime() + (5 * 3600 + 42 * 60 + 30) * 1000);

    function updateTimer() {
      var current = new Date();
      var diff = Math.max(0, target.getTime() - current.getTime());

      var h = Math.floor(diff / (1000 * 60 * 60));
      var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var s = Math.floor((diff % (1000 * 60)) / 1000);

      hoursEl.textContent = (h < 10 ? "0" : "") + h;
      minsEl.textContent = (m < 10 ? "0" : "") + m;
      secsEl.textContent = (s < 10 ? "0" : "") + s;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  /* ============================================================
     FLIPKART LIVE GLOBAL SEARCH & DROPDOWN
     ============================================================ */
  function initGlobalSearch() {
    var searchInput = document.getElementById("global-search-input");
    var categorySelect = document.getElementById("search-category-select");
    var clearBtn = document.getElementById("search-clear-btn");
    var submitBtn = document.getElementById("search-submit-btn");
    var dropdown = document.getElementById("search-results-dropdown");
    var cards = Array.from(document.querySelectorAll(".product-card-wrap"));
    var count = document.getElementById("product-count");

    if (!searchInput || !dropdown) return;

    function doSearch() {
      var query = searchInput.value.trim().toLowerCase();
      var selectedCat = categorySelect ? categorySelect.value : "all";

      if (clearBtn) clearBtn.hidden = !query;

      if (!query) {
        dropdown.hidden = true;
        dropdown.innerHTML = "";
        applyCategoryAndTextFilter(selectedCat, "");
        return;
      }

      var matches = [];
      Object.keys(PRODUCTS_DATA).forEach(function (id) {
        var p = PRODUCTS_DATA[id];
        var catMatch = selectedCat === "all" || p.category === selectedCat;
        var textMatch = p.name.toLowerCase().indexOf(query) !== -1 || p.category.toLowerCase().indexOf(query) !== -1;

        if (catMatch && textMatch) {
          matches.push({ id: id, data: p });
        }
      });

      if (matches.length > 0) {
        dropdown.hidden = false;
        dropdown.innerHTML = "";

        matches.slice(0, 5).forEach(function (m) {
          var item = document.createElement("div");
          item.className = "search-result-item";
          item.innerHTML =
            '<img class="search-result-thumb" src="' + m.data.image + '" alt="' + m.data.name + '">' +
            '<div class="search-result-info">' +
            '  <div class="search-result-name">' + m.data.name + '</div>' +
            '  <div class="search-result-meta">' +
            '    <span>' + m.data.category + '</span> · ' +
            '    <span class="search-result-price">₹' + m.data.price + '</span>' +
            '    <span style="text-decoration:line-through;color:#94a3b8;">₹' + m.data.mrp + '</span>' +
            '  </div>' +
            '</div>' +
            '<button class="search-result-cta" type="button">+ Quote</button>';

          item.addEventListener("click", function (e) {
            if (e.target.closest(".search-result-cta")) {
              addToCart(m.id);
            } else {
              var targetCard = document.querySelector('.product-card-wrap[data-id="' + m.id + '"]');
              if (targetCard) {
                targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
                targetCard.style.outline = "3px solid var(--fk-blue)";
                targetCard.style.borderRadius = "24px";
                setTimeout(function () { targetCard.style.outline = "none"; }, 1800);
              }
            }
            dropdown.hidden = true;
          });

          dropdown.appendChild(item);
        });
      } else {
        dropdown.hidden = false;
        dropdown.innerHTML = '<div style="padding:12px;font-size:0.85rem;color:#64748b;text-align:center;">No matching plastic items found for "' + query + '"</div>';
      }

      applyCategoryAndTextFilter(selectedCat, query);
    }

    function applyCategoryAndTextFilter(category, textQuery) {
      var shown = 0;
      cards.forEach(function (card) {
        var cardCat = card.getAttribute("data-category");
        var cardName = (card.getAttribute("data-name") || "").toLowerCase();

        var catMatch = category === "all" || cardCat === category;
        var textMatch = !textQuery || cardName.indexOf(textQuery) !== -1 || cardCat.toLowerCase().indexOf(textQuery) !== -1;

        var isVisible = catMatch && textMatch;
        card.hidden = !isVisible;
        if (isVisible) shown++;
      });

      if (count) {
        count.textContent = "Showing " + shown + " of " + cards.length + " wholesale products";
      }
    }

    function submitSearch() {
      doSearch();
      if (dropdown) dropdown.hidden = true;
      var productsSection = document.getElementById("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    searchInput.addEventListener("input", doSearch);
    if (categorySelect) categorySelect.addEventListener("change", doSearch);

    if (submitBtn) submitBtn.addEventListener("click", submitSearch);
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        submitSearch();
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        searchInput.value = "";
        doSearch();
        searchInput.focus();
      });
    }

    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target) && e.target !== searchInput) {
        dropdown.hidden = true;
      }
    });
  }

  /* ============================================================
     FLIPKART CATEGORY QUICK STRIP & MAIN FILTERS
     ============================================================ */
  function initProductFilters() {
    var stripItems = Array.from(document.querySelectorAll("[data-strip-filter]"));
    var filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
    var cards = Array.from(document.querySelectorAll(".product-card-wrap"));
    var count = document.getElementById("product-count");

    function applyCategoryFilter(cat) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = cat === "all" || card.getAttribute("data-category") === cat;
        card.hidden = !match;
        if (match) shown++;
      });

      stripItems.forEach(function (item) {
        item.classList.toggle("is-active", item.getAttribute("data-strip-filter") === cat);
      });

      filterButtons.forEach(function (btn) {
        btn.setAttribute("aria-pressed", String(btn.getAttribute("data-filter") === cat));
      });

      if (count) {
        count.textContent = cat === "all" ? "Showing all " + shown + " products · 🔄 3D Flip Cards Active" : "Showing " + shown + " products in " + cat;
      }
    }

    stripItems.forEach(function (item) {
      item.addEventListener("click", function () {
        var cat = item.getAttribute("data-strip-filter");
        applyCategoryFilter(cat);
        var prodSection = document.getElementById("products");
        if (prodSection) prodSection.scrollIntoView({ behavior: "smooth" });
      });
    });

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyCategoryFilter(btn.getAttribute("data-filter"));
      });
    });

    document.querySelectorAll("[data-filter-link]").forEach(function (link) {
      link.addEventListener("click", function () {
        var cat = link.getAttribute("data-filter-link");
        applyCategoryFilter(cat);
      });
    });
  }

  /* ============================================================
     INTERACTIVE WHOLESALE SAVINGS & PROFIT CALCULATOR
     ============================================================ */
  function initBulkCalculator() {
    var select = document.getElementById("calc-product-select");
    var slider = document.getElementById("calc-quantity-range");
    var displayQty = document.getElementById("calc-qty-display");
    var retailTotalEl = document.getElementById("calc-retail-total");
    var wholesaleTotalEl = document.getElementById("calc-wholesale-total");
    var savingsTotalEl = document.getElementById("calc-savings-total");
    var lockBtn = document.getElementById("btn-calc-lock");

    if (!select || !slider) return;

    function recalculate() {
      var pid = select.value;
      var qty = parseInt(slider.value, 10) || 50;
      var prod = PRODUCTS_DATA[pid];
      if (!prod) return;

      if (displayQty) displayQty.textContent = qty + " " + prod.unit + (qty > 1 ? "s" : "");

      var unitSlabRate = getSlabPrice(pid, qty);
      var wholesaleCost = unitSlabRate * qty;
      var retailValue = prod.mrp * qty;
      var savings = retailValue - wholesaleCost;
      var marginPct = retailValue > 0 ? Math.round((savings / retailValue) * 100) : 0;

      if (retailTotalEl) retailTotalEl.textContent = "₹" + retailValue.toLocaleString("en-IN");
      if (wholesaleTotalEl) wholesaleTotalEl.textContent = "₹" + wholesaleCost.toLocaleString("en-IN");
      if (savingsTotalEl) savingsTotalEl.textContent = "₹" + savings.toLocaleString("en-IN") + " (" + marginPct + "% Margin)";
    }

    select.addEventListener("change", recalculate);
    slider.addEventListener("input", recalculate);

    if (lockBtn) {
      lockBtn.addEventListener("click", function () {
        var pid = select.value;
        var qty = slider.value;
        var prod = PRODUCTS_DATA[pid];
        if (!prod) return;

        var rate = getSlabPrice(pid, parseInt(qty, 10));
        var total = rate * parseInt(qty, 10);

        var msg =
          "Hi TCT Traders, I used your Wholesale Calculator to price an order:\n\n" +
          "Product: " + prod.name + "\n" +
          "Quantity: " + qty + " " + prod.unit + "s\n" +
          "Quoted Slab Rate: ₹" + rate + " / " + prod.unit + "\n" +
          "Total Estimated: ₹" + total.toLocaleString("en-IN") + "\n\n" +
          "Can you please confirm this bulk rate and stock availability?";

        window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
      });
    }

    recalculate();
  }

  /* ============================================================
     NAVIGATION & SCROLL EFFECTS
     ============================================================ */
  function initNavigation() {
    var header = document.getElementById("site-header");
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("primary-nav");
    var desktop = window.matchMedia("(min-width: 900px)");

    if (!header || !toggle || !nav) return;

    function isOpen() {
      return nav.classList.contains("is-open");
    }

    function setMenu(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open && !desktop.matches);
    }

    toggle.addEventListener("click", function () {
      setMenu(!isOpen());
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    document.addEventListener("click", function (e) {
      if (isOpen() && !header.contains(e.target)) setMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) setMenu(false);
    });
  }

  function initScrollEffects() {
    var header = document.getElementById("site-header");
    var toTop = document.getElementById("to-top");
    var ticking = false;

    function update() {
      var y = window.scrollY || window.pageYOffset;
      if (header) header.classList.toggle("is-scrolled", y > 8);
      if (toTop) toTop.classList.toggle("is-visible", y > 500);
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });

    update();
  }

  /* Reveal on scroll */
  function initReveal() {
    var elements = Array.from(document.querySelectorAll(".reveal"));
    if (!elements.length) return;

    if (!supportsObserver || reduceMotion.matches) {
      elements.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* Scrollspy */
  function initScrollSpy() {
    if (!supportsObserver) return;

    var links = Array.from(document.querySelectorAll(".nav__link"));
    var sections = links
      .map(function (link) {
        var id = link.getAttribute("href");
        return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) {
            var active = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("is-active", active);
            if (active) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ============================================================
     BULK ENQUIRY FORM (WhatsApp Format)
     ============================================================ */
  function initEnquiryForm() {
    var form = document.getElementById("enquiry-form");
    if (!form) return;

    var status = document.getElementById("form-status");
    var nameField = form.querySelector("#name");
    var phoneField = form.querySelector("#phone");
    var productField = form.querySelector("#product");
    var quantityField = form.querySelector("#quantity");
    var messageField = form.querySelector("#message");

    function setFieldError(field, message) {
      var wrap = field.closest(".form-field");
      var errorEl = wrap ? wrap.querySelector(".form-field__error") : null;
      if (wrap) wrap.classList.toggle("is-invalid", Boolean(message));
      if (errorEl) errorEl.textContent = message || "";
      field.setAttribute("aria-invalid", message ? "true" : "false");
    }

    [nameField, phoneField, productField].forEach(function (field) {
      if (!field) return;
      field.addEventListener("input", function () { setFieldError(field, ""); });
      field.addEventListener("change", function () { setFieldError(field, ""); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = nameField.value.trim();
      var digits = phoneField.value.replace(/\D/g, "");
      if (digits.length === 12 && digits.indexOf("91") === 0) digits = digits.slice(2);
      if (digits.length === 11 && digits.charAt(0) === "0") digits = digits.slice(1);
      var phoneValid = /^[6-9]\d{9}$/.test(digits);
      var product = productField.value;

      setFieldError(nameField, name.length >= 2 ? "" : "Please enter your name.");
      setFieldError(phoneField, phoneValid ? "" : "Enter a valid 10-digit mobile number.");
      setFieldError(productField, product ? "" : "Please choose a product category.");

      if (name.length < 2 || !phoneValid || !product) {
        if (status) {
          status.textContent = "Please check the highlighted fields and try again.";
          status.classList.add("is-visible", "is-error");
        }
        var firstInvalid = form.querySelector(".form-field.is-invalid .input, .form-field.is-invalid .select");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var lines = [
        "Hi TCT Traders, I'd like a wholesale bulk quotation.",
        "",
        "Name: " + name,
        "Phone: +91 " + digits,
        "Product Needed: " + product
      ];

      if (quantityField && quantityField.value.trim()) {
        lines.push("Quantity: " + quantityField.value.trim());
      }
      if (messageField && messageField.value.trim()) {
        lines.push("Message: " + messageField.value.trim());
      }

      var url = buildWhatsAppUrl(lines.join("\n"));
      window.open(url, "_blank", "noopener,noreferrer");

      if (status) {
        status.textContent = "Redirecting to WhatsApp...";
        status.classList.add("is-visible");
        status.classList.remove("is-error");
      }
    });
  }

  /* Year */
  function initYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* Boot everything */
  initContactLinks();
  initNavigation();
  initScrollEffects();
  initHeroSlider();
  initDealCountdown();
  initCardFlip();
  initCartDrawer();
  initGlobalSearch();
  initProductFilters();
  initBulkCalculator();
  initEnquiryForm();
  initReveal();
  initScrollSpy();
  initYear();

})();
