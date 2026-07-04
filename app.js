const { createApp } = Vue;

createApp({
    data() {
        return {
            aktif: 'all',
            cari: '',
            dark: false,
            nama: '',
            alamat: '',
            nohp: '',
            tabs: [
                { k: 'all', n: '🛍️ Semua' },
                { k: 'seragam', n: '👔 Seragam' },
                { k: 'gamis', n: '🧕 Gamis' },
                { k: 'atk', n: '📚 ATK' }
            ],
            detail: null,
            cart: [],
            showCart: false,
            toast: '',
            produk: [
                // ─── GAMIS (4 produk) ───
                { id: 1, nm: "Set Syari Neema Ceruty Premium", kt: "gamis", hr: 200000, em: "🧕", bg: "#EDE7F6", badge: "Premium", bc: "premium", diskon: 10, img: "img/gamis-set-syari-neema.jpg", desc: "Ready 3 warna: Hitam, Navy, Abu. All Size." },
                { id: 2, nm: "Setcel Katun Poli Linen - All Size (2 Warna)", kt: "gamis", hr: 120000, em: "🧕", bg: "#F3E5F5", badge: "Promo", bc: "promo", diskon: 0, img: "img/setcel-katun-poli-linen-120k.jpg", desc: "✅ Bahan Katun Poli Linen\n✅ All Size\n✅ Ready 2 warna\n✅ Adem & nyaman" },
                { id: 3, nm: "Set Syari Neema - Ceruty Premium (2 Warna)", kt: "gamis", hr: 120000, em: "🧕", bg: "#EDE7F6", badge: "Promo", bc: "promo", diskon: 0, img: "img/set-syari-neema-120k.jpg", desc: "✅ Bahan Ceruty premium\n✅ All Size\n✅ Ready 2 warna\n✅ Adem & tidak nerawang" },
                { id: 4, nm: "Setcel Katun Poli Linen - All Size", kt: "gamis", hr: 100000, em: "🧕", bg: "#F3E5F5", badge: "Promo", bc: "promo", diskon: 0, img: "img/setcel-katun-poli-linen-100k.jpg", desc: "✅ Bahan Katun Poli Linen\n✅ All Size\n✅ Adem & nyaman" },

                // ─── GAMIS ANAK (3 varian) ───
                { id: 5, nm: 'Gamis Anak Sabrina Ceruty', kt: 'gamis', hr: 135000, em: '🧕', bg: '#FCE4EC', badge: 'Varian', bc: 'varian', diskon: 0,
                    img: 'img/gamis-anak-dustypink.jpg',
                    desc: '✅ Inner Katun Sabrina\n✅ Outer Ceruty Pasmina\n✅ 3 Warna: Dusty Pink, Burgundy, Mahogany\n✅ 5 Ukuran: XS, S, M, L, XL',
                    variants: [
                        { label: 'Dusty Pink', img: 'img/gamis-anak-dustypink.jpg' },
                        { label: 'Burgundy', img: 'img/gamis-anak-burgundy.jpg' },
                        { label: 'Mahogany', img: 'img/gamis-anak-mahogany.jpg' }
                    ]
                },

                // ─── SERAGAM SD (6 produk) ───
                { id: 6, nm: 'Stel SD Kemeja Pendek + Celana Panjang (2-4)', kt: 'seragam', hr: 125000, em: '👔', bg: '#FFE0EC', badge: 'Stel SD', bc: 'stel', diskon: 0, img: 'img/seragam-sd.jpg', desc: '1 stel SD (Baju Pendek + Celana).\nBahan: Axinite & Famatex.\nSize: 2-4.' },
                { id: 7, nm: 'Stel SD Kemeja Panjang + Rok Panjang (2-4)', kt: 'seragam', hr: 130000, em: '👔', bg: '#FFE0EC', badge: 'Stel SD', bc: 'stel', diskon: 0, img: 'img/seragam-sd.jpg', desc: '1 stel SD (Baju Panjang + Rok Panjang).\nBahan: Axinite & Famatex.\nSize: 2-4.' },
                { id: 8, nm: 'Stel SD Kemeja Panjang + Celana Panjang (2-4)', kt: 'seragam', hr: 130000, em: '👔', bg: '#FFE0EC', badge: 'Stel SD', bc: 'stel', diskon: 0, img: 'img/seragam-sd.jpg', desc: '1 stel SD (Baju Panjang + Celana).\nBahan: Axinite & Famatex.\nSize: 2-4.' },
                { id: 9, nm: 'Stel SD Merah Putih Panjang + Celana (2-4)', kt: 'seragam', hr: 130000, em: '👔', bg: '#FFE0EC', badge: 'Stel SD', bc: 'stel', diskon: 0, img: 'img/seragam-sd.jpg', desc: '1 stel SD Merah Putih (Baju Panjang + Celana).\nBahan: Axinite & Famatex.\nSize: 2-4.' },
                { id: 10, nm: 'Stel Pramuka Siaga Panjang + Rok (2-4)', kt: 'seragam', hr: 140000, em: '👔', bg: '#E8F0E0', badge: 'Pramuka', bc: 'pramuka', diskon: 0, img: 'img/seragam-pramuka.jpg', desc: '1 stel Pramuka Siaga (Baju Panjang + Rok).\nBahan: Axinite & Famatex.\nSize: 2-4.' },
                { id: 11, nm: 'Stel Pramuka Siaga Pendek + Celana (2-4)', kt: 'seragam', hr: 145000, em: '👔', bg: '#E8F0E0', badge: 'Pramuka', bc: 'pramuka', diskon: 0, img: 'img/seragam-pramuka.jpg', desc: '1 stel Pramuka Siaga (Baju Pendek + Celana).\nBahan: Axinite & Famatex.\nSize: 2-4.' },

                // ─── SERAGAM SMP (1 produk) ───
                { id: 12, nm: 'Stel SMP Kemeja Panjang + Rok Panjang (S-M)', kt: 'seragam', hr: 150000, em: '👔', bg: '#E0ECFF', badge: 'SMP', bc: 'smp', diskon: 0, img: 'img/seragam-smp.jpg', desc: '1 stel SMP (Baju Panjang + Rok Panjang).\nBahan: Axinite & Famatex.\nSize: S-M.' },
            ]
        };
    },
    computed: {
        filtered() {
            let p = this.aktif === 'all' ? this.produk : this.produk.filter(x => x.kt === this.aktif);
            if (this.cari) p = p.filter(x => x.nm.toLowerCase().includes(this.cari.toLowerCase()));
            return p;
        },
        total() { return this.cart.reduce((s, i) => s + i.hr, 0); }
    },
    watch: { dark(v) { document.body.classList.toggle('light', !v); } },
    methods: {
        addCart(p) { this.cart.push(p); this.toast = '✅ ' + p.nm; setTimeout(() => this.toast = '', 2000); },
        scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); },
        checkout() {
            if (!this.nama || !this.alamat || !this.nohp) return alert('Isi Nama, Alamat, No HP dulu!');
            let msg = 'ORDER WIRDA RDR FASHION\n\n';
            msg += 'DAFTAR PESANAN:\n\n';
            this.cart.forEach((i, n) => msg += (n + 1) + '. ' + i.nm + ' - Rp ' + i.hr.toLocaleString('id-ID') + '\n');
            msg += '\nTOTAL: Rp ' + this.total.toLocaleString('id-ID') + '\n\n';
            msg += 'DATA PEMESAN:\n';
            msg += 'Nama    : ' + this.nama + '\n';
            msg += 'Alamat  : ' + this.alamat + '\n';
            msg += 'No HP   : ' + this.nohp + '\n\n';
            msg += 'Mohon dikonfirmasi ya Kak, terima kasih!';
            window.open('https://wa.me/628987695995?text=' + encodeURIComponent(msg), '_blank');
            this.cart = [];
            this.showCart = false;
            this.nama = '';
            this.alamat = '';
            this.nohp = '';
        }
    }
}).mount('#app');
