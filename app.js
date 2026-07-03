const {createApp}=Vue;
createApp({
    data(){return{
        aktif:'all',cari:'',dark:false,
        nama:'', alamat:'', nohp:'',
        tabs:[{k:'all',n:'🛍️ Semua'},{k:'seragam',n:'👔 Seragam'},{k:'gamis',n:'🧕 Gamis'},{k:'atk',n:'📚 ATK'}],
        detail:null,cart:[],showCart:false,toast:'',
        produk:[
    {id:1,nm:"Set Syari Neema Ceruty Premium",kt:"gamis",hr:200000,em:"🧕",bg:"#EDE7F6",badge:"Premium",bc:"premium",diskon:10,img:"img/gamis-set-syari-neema.jpg",desc:"Ready 3 warna: Hitam, Navy, Abu. All Size."},
    {id:2,nm:"Setcel Katun Poli Linen - All Size (2 Warna)",kt:"gamis",hr:120000,em:"🧕",bg:"#F3E5F5",badge:"Promo",bc:"promo",diskon:0,img:"img/setcel-katun-poli-linen-120k.jpg",desc:"✅ Bahan Katun Poli Linen\n✅ All Size\n✅ Ready 2 warna\n✅ Adem & nyaman"},
    {id:3,nm:"Set Syari Neema - Ceruty Premium (2 Warna)",kt:"gamis",hr:120000,em:"🧕",bg:"#EDE7F6",badge:"Promo",bc:"promo",diskon:0,img:"img/set-syari-neema-120k.jpg",desc:"✅ Bahan Ceruty premium\n✅ All Size\n✅ Ready 2 warna\n✅ Adem & tidak nerawang"},
    {id:4,nm:"Setcel Katun Poli Linen - All Size",kt:"gamis",hr:100000,em:"🧕",bg:"#F3E5F5",badge:"Promo",bc:"promo",diskon:0,img:"img/setcel-katun-poli-linen-100k.jpg",desc:"✅ Bahan Katun Poli Linen\n✅ All Size\n✅ Adem & nyaman"},
]
    }},
    computed:{
        filtered(){
            let p=this.aktif==='all'?this.produk:this.produk.filter(x=>x.kt===this.aktif);
            if(this.cari) p=p.filter(x=>x.nm.toLowerCase().includes(this.cari.toLowerCase()));
            return p;
        },
        total(){return this.cart.reduce((s,i)=>s+i.hr,0)}
    },
    watch:{dark(v){document.body.classList.toggle('light',!v)}},
    methods:{
        addCart(p){this.cart.push(p);this.toast='✅ '+p.nm;setTimeout(()=>this.toast='',2000)},
        scrollTop(){window.scrollTo({top:0,behavior:'smooth'})},
        checkout(){
            if(!this.nama || !this.alamat || !this.nohp) return alert('Isi Nama, Alamat, No HP dulu!');
            let msg = 'ORDER WIRDA RDR FASHION\n\n';
            msg += 'DAFTAR PESANAN:\n\n';
            this.cart.forEach((i,n) => msg += (n+1) + '. ' + i.nm + ' - Rp ' + i.hr.toLocaleString('id-ID') + '\n');
            msg += '\nTOTAL: Rp ' + this.total.toLocaleString('id-ID') + '\n\n';
            msg += 'DATA PEMESAN:\n';
            msg += 'Nama    : ' + this.nama + '\n';
            msg += 'Alamat  : ' + this.alamat + '\n';
            msg += 'No HP   : ' + this.nohp + '\n\n';
            msg += 'Mohon dikonfirmasi ya Kak, terima kasih!';
            window.open('https://wa.me/62898 7695 995?text=' + encodeURIComponent(msg), '_blank');
            this.cart=[];this.showCart=false;this.nama='';this.alamat='';this.nohp='';
        }
    }
}).mount('#app');
