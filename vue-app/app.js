// Data Produk
const productsData = [
    { id: 1, name: "Set Gamis Syari", price: 185000, discount: 0, category: "wanita", rating: 4.8, sold: 234, badge: "best", desc: "Gamis syari bahan ceruty baby doll, adem dan tidak nerawang. Dilengkapi dalaman rok dan kerudung segiempat." },
    { id: 2, name: "Koko Pria Lengan Panjang", price: 125000, discount: 10, category: "pria", rating: 4.7, sold: 189, badge: "promo", desc: "Koko premium bahan katun Jepang, dingin dan tidak kusut. Cocok untuk acara formal maupun sehari-hari." },
    { id: 3, name: "Blouse Khimar Midi", price: 95000, discount: 0, category: "wanita", rating: 4.9, sold: 567, badge: "best", desc: "Blouse kombinasi khimar midi, tampil modis dan syar'i. Bahan kaos cotton combed 30s." },
    { id: 4, name: "Sarung Sutra", price: 89000, discount: 0, category: "pria", rating: 4.6, sold: 123, badge: "", desc: "Sarung sutra halus dengan motif timur tengah, nyaman dipakai untuk sholat dan sehari-hari." },
    { id: 5, name: "Bergo Baby Doll", price: 45000, discount: 0, category: "wanita", rating: 4.8, sold: 892, badge: "laris", desc: "Bergo baby doll motif bunga, kombinasi pashmina instan. Bahan adem dan tidak panas." },
    { id: 6, name: "Peci Kopiah Hitam", price: 35000, discount: 0, category: "pria", rating: 4.7, sold: 445, badge: "", desc: "Peci kopiah kualitas ekspor, bentuk tetap dan tidak penyok. Ada 3 ukuran." },
    { id: 7, name: "Mukena Dewasa", price: 175000, discount: 15, category: "ibadah", rating: 4.9, sold: 678, badge: "promo", desc: "Mukena travel fullset bahan ceruty princess, tas travel premium, ringan dan praktis." },
    { id: 8, name: "Sajadah Mewah", price: 120000, discount: 0, category: "ibadah", rating: 4.8, sold: 321, badge: "premium", desc: "Sajadah mewah bulu pendek, motif kaligrafi, ukuran besar 120x70cm." },
    { id: 9, name: "Parfum Oud Arab", price: 99000, discount: 20, category: "aroma", rating: 4.9, sold: 567, badge: "promo", desc: "Parfum Oud berkualitas tahan lama, aroma kayu gaharu khas timur tengah." },
    { id: 10, name: "Cincin Priya", price: 65000, discount: 0, category: "aksesoris", rating: 4.7, sold: 198, badge: "best", desc: "Cincin pria bahan titanium, ada ukiran ayat kursi, anti karat." },
    { id: 11, name: "Masker Scuba", price: 25000, discount: 0, category: "aksesoris", rating: 4.8, sold: 1123, badge: "laku", desc: "Masker scuba motif batik, 3 lapis, nyaman dipakai seharian." },
    { id: 12, name: "Tasbih Digital", price: 85000, discount: 0, category: "ibadah", rating: 4.9, sold: 445, badge: "new", desc: "Tasbih digital hitung dzikir, layar LCD, baterai tahan lama." }
];

// Vue App
new Vue({
    el: '#app',
    data: {
        products: productsData,
        cart: [],
        activeCategory: 'all',
        searchQuery: '',
        selectedProduct: null,
        showCart: false,
        showProfile: false,
        loading: true,
        toastMessage: '',
        toastTimeout: null,
        toastIsError: false,
        isDarkMode: true,
        categories: [
            { value: 'all', name: 'Semua', icon: '✨' },
            { value: 'wanita', name: 'Wanita', icon: '👗' },
            { value: 'pria', name: 'Pria', icon: '👔' },
            { value: 'ibadah', name: 'Ibadah', icon: '🕌' },
            { value: 'aksesoris', name: 'Aksesoris', icon: '💎' },
            { value: 'aroma', name: 'Aroma', icon: '🌸' }
        ]
    },
    computed: {
        filteredProducts() {
            let filtered = this.products;
            if (this.activeCategory !== 'all') {
                filtered = filtered.filter(p => p.category === this.activeCategory);
            }
            if (this.searchQuery.trim()) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
            }
            return filtered;
        },
        totalCartItems() {
            return this.cart.reduce((sum, item) => sum + item.qty, 0);
        },
        cartTotal() {
            return this.cart.reduce((sum, item) => {
                const price = this.getFinalPrice(item);
                return sum + (price * item.qty);
            }, 0);
        }
    },
    mounted() {
        // Load cart from localStorage
        const savedCart = localStorage.getItem('vue_cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
        
        // Load dark mode
        const savedDark = localStorage.getItem('vue_darkMode');
        if (savedDark !== null) {
            this.isDarkMode = savedDark === 'true';
        }
        this.applyDarkMode();
        
        // Simulate loading
        setTimeout(() => {
            this.loading = false;
        }, 800);
    },
    watch: {
        cart: {
            deep: true,
            handler() {
                localStorage.setItem('vue_cart', JSON.stringify(this.cart));
            }
        },
        isDarkMode() {
            localStorage.setItem('vue_darkMode', this.isDarkMode);
            this.applyDarkMode();
        }
    },
    methods: {
        getFinalPrice(product) {
            if (product.discount) {
                return product.price * (1 - product.discount / 100);
            }
            return product.price;
        },
        formatRupiah(angka) {
            return new Intl.NumberFormat('id-ID').format(Math.round(angka));
        },
        getEmoji(name) {
            if (name.includes('Gamis')) return '👗';
            if (name.includes('Koko')) return '👔';
            if (name.includes('Mukena')) return '🧕';
            if (name.includes('Sajadah')) return '🕌';
            if (name.includes('Parfum')) return '🌸';
            if (name.includes('Cincin')) return '💍';
            if (name.includes('Tasbih')) return '📿';
            if (name.includes('Peci')) return '🎩';
            if (name.includes('Sarung')) return '🧣';
            if (name.includes('Bergo')) return '🧕';
            if (name.includes('Masker')) return '😷';
            return '✨';
        },
        getBadgeClass(badge) {
            const classes = {
                'best': 'best',
                'promo': 'promo',
                'new': 'new',
                'premium': 'premium',
                'laris': 'laris',
                'laku': 'laku'
            };
            return classes[badge] || '';
        },
        getBadgeText(badge) {
            const texts = {
                'best': '⭐ BEST',
                'promo': '🔥 PROMO',
                'new': '🆕 NEW',
                'premium': '👑 PREMIUM',
                'laris': '📈 LARIS',
                'laku': '💥 LAKU'
            };
            return texts[badge] || badge.toUpperCase();
        },
        addToCart(product) {
            const existing = this.cart.find(item => item.id === product.id);
            if (existing) {
                existing.qty++;
            } else {
                this.cart.push({ ...product, qty: 1 });
            }
            this.showToast(`✅ ${product.name} ditambahkan ke keranjang!`);
        },
        removeFromCart(id) {
            this.cart = this.cart.filter(item => item.id !== id);
            this.showToast('🗑️ Produk dihapus dari keranjang');
        },
        updateQty(id, delta) {
            const item = this.cart.find(i => i.id === id);
            if (item) {
                item.qty += delta;
                if (item.qty <= 0) {
                    this.removeFromCart(id);
                }
            }
        },
        openProduct(product) {
            this.selectedProduct = product;
        },
        closeModal() {
            this.selectedProduct = null;
        },
        checkoutWA() {
            if (this.cart.length === 0) {
                this.showToast('Keranjang masih kosong!', true);
                return;
            }
            
            let message = "🛍️ *ORDER BARU - Wirda Hijab Store* 🛍️\n\n";
            this.cart.forEach(item => {
                const price = this.getFinalPrice(item);
                message += `• ${item.name} x${item.qty} = Rp ${this.formatRupiah(price * item.qty)}\n`;
            });
            message += `\n📦 *Total: Rp ${this.formatRupiah(this.cartTotal)}*\n\n`;
            message += `📝 Nama: \n📍 Alamat: \n📞 No. HP: \n\n`;
            message += `_Terima kasih telah berbelanja di Wirda Hijab Store!_`;
            
            window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
        },
        showToast(msg, isError = false) {
            if (this.toastTimeout) clearTimeout(this.toastTimeout);
            this.toastMessage = msg;
            this.toastIsError = isError;
            this.toastTimeout = setTimeout(() => {
                this.toastMessage = '';
            }, 2000);
        },
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
        },
        applyDarkMode() {
            if (this.isDarkMode) {
                document.body.style.background = '#0d0d0d';
                document.body.style.color = '#eee';
            } else {
                document.body.style.background = '#FFF5F7';
                document.body.style.color = '#2d2d2d';
            }
        },
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});
