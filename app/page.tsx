'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. 隠し箱コンポーネント (FloatingInfoPanel) ---
function FloatingInfoPanel() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById('twitter-wjs');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'twitter-wjs';
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <div className="fixed bottom-24 left-8 z-[60]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full border border-white/20 bg-black/80 backdrop-blur-xl flex items-center justify-center text-white hover:border-blue-500 hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] group"
        >
          <span className="text-xl font-extralight group-hover:text-blue-400 transition-colors">
            {isOpen ? '×' : 'i'}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(e, info) => {
                if (info.offset.y > 200) setIsOpen(false);
              }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[80] md:bottom-24 md:left-28 md:right-auto w-full md:w-[420px] max-h-[85vh] md:max-h-[600px] bg-zinc-900/90 backdrop-blur-3xl border-t md:border border-white/10 rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="md:hidden w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-3 mb-1" />
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] text-blue-400 tracking-[0.2em] font-mono uppercase">Official Profile</span>
                  <span className="text-xs text-white font-light">尾形 賢 / Ken Ogata</span>
                </div>
              </div>
              <div className="overflow-y-auto custom-scrollbar p-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-blue-300 text-xs font-mono tracking-widest uppercase">Introduction</h3>
                  <p className="text-[11px] text-zinc-300 leading-relaxed font-light">
                    1970年代より写真家として活動を開始。マガジンハウス等の雑誌グラビアや写真集を数多く手掛けた後、映像演出の世界へ。テレビ東京『日立サウンドブレイク』、テレビ朝日『湾岸LIVE』などの演出を手掛ける。
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-blue-300 text-xs font-mono tracking-widest uppercase">Core Works</h3>
                  <p className="text-[11px] text-zinc-300 leading-relaxed font-light">
                    現在は全国の癒し・和みの情景を各地で「点描」。TOKYO MX『ヒーリングタイム』にて「点描シリーズ」を長年放送中。
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <div className="text-zinc-500 text-[10px] text-center font-mono py-4">
                    <img src="/info.jpg"></img>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-black/20 border-t border-white/5 text-[10px] text-zinc-500 text-center font-mono uppercase tracking-widest">
                © STUDIO OGATA Archive
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// --- 2. 補助コンポーネント群 ---
function TimelineItem({ year, title, description, children }: { year: string, title: string, description: string, children?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative pl-8 border-l border-blue-900/50"
    >
      <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-blue-500" />
      <span className="text-blue-400 font-mono text-sm tracking-widest">{year}</span>
      <h3 className="text-2xl md:text-3xl font-light mt-2 mb-4 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base max-w-2xl">{description}</p>
      {children}
    </motion.div>
  );
}

function AccordionItem({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-800 last:border-0 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex justify-between items-center text-left hover:text-blue-400 transition-colors group">
        <span className="text-sm md:text-base font-light tracking-[0.2em] uppercase group-hover:pl-2 transition-all">{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="m6 9 6 6 6-6" /></svg>
        </motion.div>
      </button>
      <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} className="overflow-hidden">
        <div className="pb-8 text-zinc-400 font-light text-sm leading-loose whitespace-pre-wrap">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function VideoCard({ id, title, category }: { id: string, title: string, category: string }) {
  return (
    <motion.div whileHover={{ y: -10 }} className="group relative cursor-pointer">
      <div className="relative aspect-video overflow-hidden rounded-sm border border-white/10 bg-zinc-900">
        <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={title} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
      </div>
      <div className="mt-4">
        <p className="text-[10px] tracking-widest text-blue-500 uppercase font-mono">{category}</p>
        <h3 className="text-lg font-light text-white mt-1 group-hover:text-blue-200 transition-colors">{title}</h3>
      </div>
    </motion.div>
  );
}

// --- 3. メインページ (Home) ---
export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-black">

      {/* 1. ナビ：外に出すことで fixed を死守 */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12 backdrop-blur-md bg-black/20">
        <div className="text-white font-extralight tracking-[0.4em] text-xs md:text-sm">STUDIO OGATA</div>
        <div className="flex items-center gap-6 md:gap-8">
          <a href="https://www.youtube.com/@studioogata3259" target="_blank" className="text-gray-400 hover:text-red-500 text-[10px] tracking-widest font-mono transition-colors">YOUTUBE</a>
          <a href="https://forms.gle/syLZADWMVSxqv12Z6" target='_blank' className="border border-white/20 px-5 py-2 rounded-full text-[10px] text-white tracking-widest hover:bg-white hover:text-black transition-all">CONTACT</a>
        </div>
      </nav>

      {/* 2. 背景：fixedで固定（pointer-events-noneで操作を邪魔しない） */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* 動画を戻すときはここに（後ほど） */}
        <video
          src="https://wwdymk7pyxnqfcgp.public.blob.vercel-storage.com/top-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80 isolate"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </div>

      {/* 3. コンテンツ：ここがスクロールする主役 */}
      <main className="relative z-10 w-full transform-gpu">
        {/* Hero, Latest Work などをここに配置 */}
        {/* Hero Section */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="text-5xl md:text-8xl font-thin tracking-[0.4em] text-white">STUDIO OGATA</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8 text-sm md:text-lg tracking-[0.6em] font-extralight text-blue-200 uppercase">Visual Creator / Photographer</motion.p>
        </div>

        {/* Latest Work Section */}
        <section className="relative z-20 bg-black py-32 px-6 md:px-20 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.2em] mb-16 text-blue-100 border-b border-blue-900/30 pb-4">LATEST WORK</h2>
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="w-full lg:w-2/3 aspect-video bg-zinc-900 rounded-sm overflow-hidden shadow-2xl border border-white/5">
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/W8V_7UkLhWY?rel=0" allowFullScreen></iframe>
              </div>
              <div className="w-full lg:w-1/3 space-y-8 text-center lg:text-left">
                <h3 className="text-white text-3xl font-light leading-tight tracking-wide">昭和の記憶、<br />その静かな熱量を撮る。</h3>
                <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">父・緒方による最新映像アーカイブ。当時の空気を4Kで再構築した、時間軸を超える没入体験。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Profile / Archive Section */}
        <section className="relative z-20 bg-black py-32 px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.2em] mb-24 text-blue-100 border-b border-blue-900/30 pb-4 text-right uppercase">Career Archive</h2>

            <div className="space-y-40">
              {/* 1970s - 1980s */}
              <TimelineItem
                year="1970s - 1980s"
                title="Photography & Editorial"
                description="マガジンハウス、集英社、講談社等で活動。光と構図の美学を追求し、グラビア・写真集の黄金期を支える。"
              >
                <div className="mt-8">
                  <AccordionItem title="View Selected Projects">
                    <ul className="space-y-4 list-disc list-inside text-zinc-400">
                      <li>各出版社（平凡・講談社・小学館・集英社・光文社・近代映画社 等）でのグラビア撮影</li>
                      <li>Mr.マリック 写真集「きています」（ソニー出版）撮影</li>
                      <li>PV映像「Wonder Clock」写真構成・Visual Art演出</li>
                      <li>フジテレビ『ビデオマガジン』セクシーサウンドビジュアル ディレクション</li>
                      <li>新宿コニカプラザ等での写真展・LIVEイベント企画展示</li>
                    </ul>
                  </AccordionItem>
                </div>
              </TimelineItem>

              {/* 1990s - 2000s */}
              <TimelineItem
                year="1990s - 2000s"
                title="Video Production & TV"
                description="主要局の番組演出・制作に従事。ミュージックビデオやTV番組、CM等、動的なストーリーテリングの世界へ。"
              >
                <div className="mt-8">
                  <AccordionItem title="View TV & CM Works">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-zinc-400">
                        <li>□ テレビ東京『日立サウンドブレイク』演出</li>
                        <li>□ テレビ東京『Rock TV』グラビアコラボ演出</li>
                        <li>□ テレビ朝日『真夜中の神様達』Visual Art制作</li>
                        <li>□ テレビ朝日『湾岸LIVE』PV制作</li>
                      </ul>
                      <ul className="space-y-2 text-zinc-400">
                        <li>□ 成田匠『Super Trial』映像制作</li>
                        <li>□ フジテレビ映像企画部『ツムライリュージョン』CM</li>
                        <li>□ 旅チャンネル『リゾートな気分』企画制作</li>
                        <li>□ パイオニアLDC『TRIAL MAGIC』Sound Visual</li>
                      </ul>
                    </div>
                  </AccordionItem>
                </div>
              </TimelineItem>

              {/* 2010s - Present */}
              <TimelineItem
                year="2010s - Present"
                title="Cinematic Archive & Web"
                description="ヒーリング映像の確立。TOKYO MX『Healing Time』を中心に、全国の風景を次世代へ残す活動を展開。"
              >
                <div className="mt-8">
                  <AccordionItem title="View Digital Contents">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-blue-400 text-xs font-mono mb-2 uppercase">TV Series: Healing Time</h4>
                        <p className="text-zinc-400">京都点描 / 東京点描 / 長崎点描 など、およそ50タイトル・全国200箇所以上の撮影実績。</p>
                      </div>
                      <div>
                        <h4 className="text-blue-400 text-xs font-mono mb-2 uppercase">JAF Media Projects</h4>
                        <ul className="space-y-1 text-zinc-400">
                          <li>・JAF Mate Park「昭和の名車たち」動画制作</li>
                          <li>・「大人のぬりえ」「楽しい野菜づくり」Webディレクション</li>
                          <li>・JAF45周年記念「街角の名車アルバム」アーカイブ制作</li>
                          <li>・ユニバーサル企画「車で巡る人に優しい旅」映像制作</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionItem>
                </div>
              </TimelineItem>
            </div>
          </div>
        </section>

        {/* Selected Archive Section */}
        <section className="relative z-20 bg-black py-32 px-6 md:px-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.2em] mb-20 text-blue-100 border-b border-blue-900/30 pb-4">SELECTED ARCHIVE</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <VideoCard id="R3kzGOZV8mQ" title="昭和の名車シリーズ" category="Automobile" />
              <VideoCard id="aUJKniYHC34" title="東京点描" category="Cinematic" />
              <VideoCard id="7JM1yBvwuX4" title="にゃんタレ" category="Animals" />
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="relative z-20 py-20 px-6 text-center border-t border-white/5 bg-zinc-950">
          <div className="text-white font-extralight tracking-[0.8em] text-xs mb-4">STUDIO OGATA</div>
          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">© 2026 Ken Ogata All Rights Reserved. Directed by Sora.</p>
        </footer>

      </main>

      <FloatingInfoPanel />
    </div>
  );
}