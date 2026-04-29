import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  ChevronRight, 
  ArrowUp,
  ArrowLeft
} from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER = {
  visible: { transition: { staggerChildren: 0.15 } }
};

interface VideoData {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
}

interface CategoryData {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  videos: VideoData[];
}

const CATEGORIES: CategoryData[] = [
  {
    id: 'wedding',
    title: 'Phóng sự cưới',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    description: 'Lưu giữ những khoảnh khắc hạnh phúc nhất trong ngày trọng đại.',
    videos: [
      { id: 1, title: 'Wedding Film | Toàn & Linh', thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', duration: '05:30' },
      { id: 2, title: 'Trailer Đám Cưới | Minh & Thảo', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800', duration: '02:15' },
    ]
  },
  {
    id: 'event',
    title: 'Sự kiện, khai trương',
    category: 'Event',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    description: 'Ghi lại quy mô và không khí sôi động của sự kiện chuyên nghiệp.',
    videos: [
      { id: 3, title: 'Khai Trương Showroom | Nike HN', thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800', duration: '03:45' },
    ]
  },
  {
    id: 'party',
    title: 'Sinh nhật, YEP',
    category: 'Party',
    image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800',
    description: 'Những bữa tiệc ấm cúng và đầy ý nghĩa bên người thân, đồng nghiệp.',
    videos: [
      { id: 4, title: 'Year End Party 2023 | FPT Software', thumbnail: 'https://images.unsplash.com/photo-1514525253361-bee8d4ca72a7?auto=format&fit=crop&q=80&w=800', duration: '08:20' },
    ]
  },
  {
    id: 'yearbook',
    title: 'Kỉ yếu, thanh xuân vườn trường',
    category: 'Yearbook',
    image: 'https://images.unsplash.com/photo-1523050853063-bd388f9f79b5?auto=format&fit=crop&q=80&w=800',
    description: 'Chụp ảnh và quay phim kỉ yếu chuyên nghiệp, sáng tạo.',
    videos: [
      { id: 5, title: 'Kỉ yếu 12A1 | THPT Chuyên Hà Nội-Amsterdam', thumbnail: 'https://images.unsplash.com/photo-1523050853063-bd388f9f79b5?auto=format&fit=crop&q=80&w=800', duration: '10:00' },
    ]
  },
  {
    id: 'others',
    title: 'Các sản phẩm khác,...',
    category: 'Others',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
    description: 'Quảng cáo, Music Video, Short Film và nhiều hơn thế nữa.',
    videos: [
      { id: 6, title: 'Product Launch | VinFast VF9', thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800', duration: '01:30' },
    ]
  }
];

function ScrollToTop() {
  const { pathname } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'glass-morphism shadow-sm py-3 text-slate-900' : 'bg-transparent py-5 text-white'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-extrabold tracking-tighter hover:text-orange-500 transition-colors">LyS Media</Link>
          </div>
          
          <nav className="flex items-center gap-4 md:gap-8">
            {['TRANG CHỦ', 'SẢN PHẨM'].map((item) => (
              <a 
                key={item} 
                href={item === 'TRANG CHỦ' ? '#' : `#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-[10px] md:text-xs font-bold tracking-widest hover:text-orange-500 transition-colors uppercase"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="trang-chủ" className="relative w-full min-h-[500px] md:aspect-[20/9] flex items-center justify-center md:justify-end overflow-hidden bg-black px-6 md:px-24">
        <div className="absolute inset-0 z-0">
          <img 
           src="/anh.jpg?v=1"
            alt="Film producer" 
            className="w-full h-full object-cover object-center opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black/90 via-black/20 to-transparent md:via-black/40" />
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={STAGGER}
          className="relative z-10 text-center md:text-right max-w-4xl pt-20 md:pt-0"
        >
          <motion.h1 
            variants={FADE_UP}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 leading-tight md:leading-none"
          >
            Phạm Công Lý
          </motion.h1>
          <motion.p 
            variants={FADE_UP}
            className="text-xs md:text-base lg:text-lg text-white/90 font-medium tracking-[0.2em] mb-10 uppercase"
          >
            Portfolio
          </motion.p>
          <motion.div variants={FADE_UP} className="flex justify-center md:justify-end gap-4">
            <a 
              href="#sản-phẩm"
              className="orange-gradient text-white px-6 py-2 rounded-sm text-sm md:text-base font-black tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-xl"
            >
              SẢN PHẨM <ChevronRight size={16} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-[10px] tracking-[0.3em] font-bold uppercase">Scroll Down</span>
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-orange-500"
            />
          </div>
        </motion.div>
      </section>

      {/* Our Portfolio */}
      <section id="sản-phẩm" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER}
            className="text-center mb-16"
          >
            <motion.h2 variants={FADE_UP} className="text-3xl font-black mb-4 tracking-tight uppercase">SẢN PHẨM</motion.h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <PortfolioItem 
                key={cat.id}
                id={cat.id}
                image={cat.image}
                title={cat.title}
                category={cat.category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <span className="text-xl font-extrabold tracking-tighter">LyS Media</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="#" className="text-[10px] md:text-xs font-bold tracking-widest hover:text-orange-500 transition-colors">YOUTUBE</a>
            <a href="#" className="text-[10px] md:text-xs font-bold tracking-widest hover:text-orange-500 transition-colors">FACEBOOK</a>
            <a href="#" className="text-[10px] md:text-xs font-bold tracking-widest hover:text-orange-500 transition-colors">TIKTOK</a>
            <a href="#" className="text-[10px] md:text-xs font-bold tracking-widest hover:text-orange-500 transition-colors">INSTAGRAM</a>
          </div>
          <p className="text-[10px] text-slate-400 font-medium tracking-widest text-center">© 2024 LyS Media.</p>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-xl z-50 hover:bg-orange-500 transition-colors"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const category = CATEGORIES.find(c => c.id === id);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Không tìm thấy danh mục</h1>
          <button onClick={() => navigate('/')} className="text-orange-500 font-bold hover:underline">Quay về trang chủ</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <header className="fixed top-0 left-0 right-0 z-40 glass-morphism py-4 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold tracking-tighter flex items-center gap-2">
            <ArrowLeft size={20} className="text-slate-500" />
            LyS Media
          </Link>
          <div className="text-xs font-bold tracking-[0.2em] text-orange-500 uppercase">{category.category}</div>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{category.title}</h1>
            <p className="text-slate-500 max-w-2xl">{category.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.videos.map((video) => (
              <motion.div 
                key={video.id}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 shadow-lg ring-1 ring-slate-100">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-white/80 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                      <Play fill="white" size={20} />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded font-bold">
                    {video.duration}
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 group-hover:text-orange-500 transition-colors uppercase text-sm tracking-wide">{video.title}</h3>
              </motion.div>
            ))}
          </div>

          {category.videos.length === 0 && (
            <div className="text-center py-20 text-slate-400">Hiện chưa có video nào trong danh mục này.</div>
          )}
        </div>
      </main>

      <footer className="py-12 border-t text-center">
        <Link to="/" className="text-xs font-bold tracking-widest text-slate-400 hover:text-orange-500 transition-colors uppercase">Quay về trang chủ</Link>
      </footer>
    </div>
  );
}

interface PortfolioItemProps {
  id: string;
  image: string;
  title: string;
  category: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ id, image, title, category }) => {
  return (
    <Link to={`/category/${id}`}>
      <motion.div 
        variants={FADE_UP}
        whileHover={{ scale: 1.02 }}
        className="group relative h-64 md:h-80 rounded-xl overflow-hidden cursor-pointer shadow-xl ring-1 ring-slate-200"
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 scale-75 group-hover:scale-100 transition-transform">
            <Play fill="white" size={24} />
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">{category}</p>
          <h3 className="text-white text-lg font-bold">{title}</h3>
        </div>
      </motion.div>
    </Link>
  );
}
