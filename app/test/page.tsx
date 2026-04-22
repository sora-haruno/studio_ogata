'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TOKYO_SERIES = [
    {
        id: "Mover",
        title: "Mover",
        subtitle: "シリーズ序章：物語は、ここから動き出す。",
        videoId: "HGgib_o1X0Y", // YouTube ID
        isReleased: true,
    },
    {
        id: "Tsunagu",
        title: "繋ぐ",
        subtitle: "人と自然が触れ合う、その瞬間を。",
        videoId: "",
        isReleased: false,
    },
    {
        id: "Michi",
        title: "道",
        subtitle: "都会の洗練と静寂が交差する場所。",
        videoId: "",
        isReleased: false,
    },
    {
        id: "Mizuna",
        title: "罔象（みづは）", // 「づ」に修正済み！
        subtitle: "水と緑の聖地、その深淵へ。",
        videoId: "",
        isReleased: false,
    }
];

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
            <a href={`https://www.youtube.com/watch?v=${id}`}>
                <div className="relative aspect-video overflow-hidden rounded-sm border border-white/10 bg-zinc-900">
                    <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={title} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                </div>
                <div className="mt-4">
                    <p className="text-[10px] tracking-widest text-blue-500 uppercase font-mono">{category}</p>
                    <h3 className="text-lg font-light text-white mt-1 group-hover:text-blue-200 transition-colors">{title}</h3>
                </div>
            </a>
        </motion.div>
    );
}

function TokyoSeriesGallery() {
    const [index, setIndex] = useState(0);
    const [key, setKey] = useState(0); // プログレスバーのリセット用
    const AUTO_PLAY_DURATION = 4; // 6秒で次の作品へ

    // 自動遷移のロジック
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % TOKYO_SERIES.length);
            setKey((prev) => prev + 1); // インデックスが変わるたびにバーを再描画
        }, AUTO_PLAY_DURATION * 1000);

        return () => clearInterval(timer);
    }, [index]); // indexが変わるたびにタイマーをクリーンアップして再設定

    // 手動操作時のハンドラ
    const handleSelect = (i: number) => {
        setIndex(i);
        setKey((prev) => prev + 1); // バーを0からリセット
    };
    return (
        <>
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-16 border-b border-blue-900/30 pb-4">
                    <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.2em] text-blue-100 uppercase">
                        Tokyo Elegance & More
                    </h2>
                    {/*     <div className="flex gap-4 text-xs font-mono text-zinc-500">
                        {TOKYO_SERIES.map((_, i) => (
                            <span
                                onClick={() => setIndex(i)}
                                key={i} className={i === index ? "text-blue-400" : ""}>
                                0{i + 1}
                            </span>
                        ))}
                    </div>*/}
                </div>




                {
                    [
                        "This is Tokyo ー ここは東京",
                        "This is just Tokyo ー ここが東京",
                        "This is Also Tokyo ー ここも東京",
                    ].map((text, i) => (
                        <motion.div
                            key={i}
                            // initial（初期状態）: 画面の右外（100%）に隠しておく
                            initial={{ opacity: 0, x: 50 }}
                            // whileInView（ビューポートに入った時）: xを0に戻し、不透明度を1にする
                            whileInView={{ opacity: 1, x: 0 }}
                            // viewport: どのタイミングで発火させるか
                            // once: false にすると、スクロールで戻るたびにアニメーションが繰り返されます
                            // amount: 0.5 くらいにすると「半分くらい見えたら発火」になるので確実です
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{
                                duration: 0.8,
                                delay: i * 0.2, // ここを少し長めにすると、1行ずつ順番に出る感じが強調されます
                                ease: "easeOut"
                            }}
                            className='text-center text-sm md:text-base tracking-[0.2em] font-extralight text-zinc-400 mb-2'
                        >
                            {text}
                        </motion.div>
                    ))
                }


                <p className='m-5'>
                    進化を続ける都会的センスと、 未来へ語り継ぐべき持続可能な自然保全。 相反する二つの要素が溶け合う、東京の「優しさ」を切り取りました。
                </p>
                {/* 選択ボタン */}
                <div className="flex gap-4 pt-8 items-center">
                    {TOKYO_SERIES.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => handleSelect(i)}
                            className="group relative h-8 w-full flex items-center"
                        >
                            {/* 土台のグレーのバー */}
                            <div className="w-[99%] h-[6px] bg-zinc-800 overflow-hidden relative">
                                {/* 動く青いバー（現在選択中のボタンのみ動く） */}
                                {i === index && (
                                    <motion.div
                                        key={key} // これにより、切り替わるたびにアニメーションが最初から再生される
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "0%" }}
                                        transition={{ duration: AUTO_PLAY_DURATION, ease: "linear" }}
                                        className="absolute inset-0 bg-blue-500"
                                    />
                                )}
                                {/* 過去に選択されたバーは青いままにするなら追加のロジックが必要ですが、
                「今ここが動いてるよ」を見せるならこれだけで十分効果的です */}
                            </div>
                            {/* ホバー時に数字を出すなどの遊び心 */}
                            <span className={`ml-2 text-[10px] font-mono transition-colors ${i === index ? "text-blue-400" : "text-zinc-600 group-hover:text-zinc-400"}`}>
                                0{i}
                            </span>

                        </button>
                    ))}
                </div>


                <div className="relative h-[500px] flex items-center justify-center">
                    {/* 中央のメイン表示 */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -50 }}
                            transition={{ duration: 0.2, ease: "circOut" }}
                            className="absolute inset-0 flex flex-col lg:flex-row gap-12 items-center"
                        >
                            {/* 動画・サムネエリア */}
                            <div className="w-full lg:w-2/3 aspect-video bg-zinc-900 rounded-sm overflow-hidden shadow-2xl border border-white/10 group relative">
                                {TOKYO_SERIES[index].isReleased ? (
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${TOKYO_SERIES[index].videoId}?rel=0`}
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 group">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent opacity-50" />
                                        <span className="text-zinc-600 tracking-[1em] font-extralight uppercase italic">Coming Soon</span>
                                    </div>
                                )}
                            </div>

                            {/* テキストエリア（共通フォーマット） */}
                            <div className="w-full lg:w-1/3 space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <p className="text-blue-400 text-xs font-mono tracking-widest mb-2">Series #{index}</p>
                                    <h3 className="text-white text-4xl font-light leading-tight tracking-wider mb-4">
                                        東京点描<br />『{TOKYO_SERIES[index].title}』
                                    </h3>
                                    <p className="text-zinc-400 font-light text-sm leading-relaxed italic">
                                        {TOKYO_SERIES[index].subtitle}
                                    </p>
                                </motion.div>

                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>


        </>
    )
}

// --- 3. メインページ (Home) ---
export default function Home() {
    const [index, setIndex] = useState(0);
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


                {/* 東京点描 Section */}
                <section className="relative z-20 bg-black  px-10 md:px-20 border-y border-white/5 overflow-hidden">

                    <TokyoSeriesGallery />

                </section>

                {/* Latest Work Section */}
                <section className="relative z-20 bg-black py-16 md:py-32 px-10 md:px-20 border-y border-white/5">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.2em] mb-16 text-blue-100 border-b border-blue-900/30 pb-4">LATEST WORK</h2>
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="w-full lg:w-2/3 aspect-video bg-zinc-900 rounded-sm overflow-hidden shadow-2xl border border-white/5">
                                <iframe className="w-full h-full" src="https://www.youtube.com/embed/HGgib_o1X0Y?rel=0" allowFullScreen></iframe>
                            </div>
                            <div className="w-full lg:w-1/3 space-y-8 text-center lg:text-left">
                                <h3 className="text-white text-3xl font-light leading-tight tracking-wide">東京点描<br />『Mover』</h3>
                                <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">都会の喧騒を離れ、心癒されるひとときを</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Profile / Archive Section */}
                <section className="relative z-20 bg-black py-16 md:py-32 px-10 md:px-20">
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
                <section className="relative z-20 bg-black py-16 md:py-32 px-10 md:px-20 border-t border-white/5">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.2em] mb-20 text-blue-100 border-b border-blue-900/30 pb-4">SELECTED ARCHIVE</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <VideoCard id="FMrybAzdRMM" title="点描シリーズ" category="Cinematic" />
                            <VideoCard id="7JM1yBvwuX4" title="にゃんタレ" category="Animals" />
                            <VideoCard id="bN8X1ssslhs" title="ジオラマ" category="Diorama" />
                        </div>
                    </div>
                </section>


                {/* Footer */}
                <footer className="relative z-20 py-20 px-6 text-center border-t border-white/5 bg-zinc-950">
                    <div className="text-white font-extralight tracking-[0.8em] text-xs mb-4">尾形 賢/Ken Ogata</div>
                    <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">© 2026 STUDIO OGATA All Rights Reserved. Directed by Sora.</p>
                </footer>

            </main>

            <FloatingInfoPanel />
        </div>
    );
}