import { useEffect, useRef, useState } from 'react';

// Official YouTube uploads, played through the YouTube embed player.
export const TRACKS = [
  { id: 'DDgswnI2AbA', title: "Sen İstanbul'sun", artist: "Gökhan Türkmen" },
  { id: 'Gj96YZv8aew', title: 'Cinnamon Girl', artist: 'Lana Del Rey - NFR!' },
  { id: 'fUMgxgQaQcQ', title: 'Mariners Apartment Complex', artist: 'Lana Del Rey - NFR!' },
  { id: '69m34vsjjsU', title: 'Happiness is a butterfly', artist: 'Lana Del Rey - NFR!' },
  // from my Spotify liked songs
  { id: 'ej1mtpE95RA', title: "Döndüm Yine Sana Sana", artist: "Yusuf Ayaz" },
  { id: 'TqGDQANzjSI', title: "Döndüm", artist: "Bora Duran" },
  { id: 'ulDkAcw9ObA', title: "Khalouni N3ich", artist: "Najwa Farouk" },
  { id: 'YRirtsIhA8c', title: "Again", artist: "Noah Cyrus, XXXTENTACION" },
  { id: 'L8cZp-BzZTU', title: "Valet", artist: "DeeOrSlim" },
  { id: '4D6qatXG5-A', title: "iloveitiloveitiloveit", artist: "Bella Kay" },
  { id: 'HHNUdLoRGYc', title: "Hin und Her", artist: "AK AUSSERKONTROLLE" },
  { id: 'lW-yeJQHOQ8', title: "deniyorum, ama", artist: "Mavi" },
  { id: 'rrUMdSIr-GI', title: "Celladına Aşık", artist: "Kubilay Karça" },
  { id: 'KsrFRAqsMs8', title: "KISKANÇ", artist: "Zeki Arkun" },
  { id: 'TxUdlC0057s', title: "Trance", artist: "Metro Boomin, Travis Scott, Young Thug" },
  { id: '9OjNQSAlaqU', title: "Self Esteem", artist: "Lambo4oe, NLE Choppa" },
  { id: 'KH7FG6rQrFw', title: "Cinderella", artist: "Mac Miller, Ty Dolla $ign" },
  { id: 'FAsUKmOjDdI', title: "Sebebi Yar", artist: "BLOK3" },
  { id: 'gD3SqwOJ9Sc', title: "NAFİLE", artist: "ERAY067, Mansur" },
  { id: 'GfxcnX7XWfg', title: "Jungle", artist: "A Boogie Wit da Hoodie" },
  { id: 'm-gADGCCLmw', title: "Ama Başaramadım", artist: "Burak Bulut" },
  { id: 'Pl7--yxZjng', title: "Çok Yazık", artist: "Çağan Şengül" },
  { id: '0YLA25D31wk', title: "ZEHİRLİ GÜL", artist: "BLOK3" },
  { id: '4-6En3bf5TY', title: "Geri Ver", artist: "Wegh" },
  { id: 'qjIXTe6IRUM', title: "Olmazlara Vuruluyorum", artist: "Mert Demir, Duygu Edis" },
];

let apiPromise;
function loadYT() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { if (prev) prev(); resolve(window.YT); };
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    });
  }
  return apiPromise;
}

const fmt = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

export default function MediaWidget() {
  const hostRef = useRef(null);
  const playerRef = useRef(null);
  const idxRef = useRef(0);
  const wantPlay = useRef(false);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState({ cur: 0, dur: 0 });

  const ensurePlayer = () => {
    if (playerRef.current) return Promise.resolve(playerRef.current);
    setLoading(true);
    return loadYT().then((YT) => new Promise((resolve) => {
      const p = new YT.Player(hostRef.current, {
        height: '200', width: '200',
        videoId: TRACKS[idxRef.current].id,
        playerVars: { playsinline: 1, controls: 0, disablekb: 1 },
        events: {
          onReady: () => { playerRef.current = p; setLoading(false); resolve(p); },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) { setPlaying(true); setLoading(false); }
            else if (e.data === YT.PlayerState.PAUSED) setPlaying(false);
            else if (e.data === YT.PlayerState.ENDED) change(1);
          },
          onError: () => change(1),
        },
      });
    }));
  };

  const load = (i, autoplay) => {
    idxRef.current = i; setIdx(i); setTime({ cur: 0, dur: 0 });
    const p = playerRef.current;
    if (!p) return;
    if (autoplay) p.loadVideoById(TRACKS[i].id); else p.cueVideoById(TRACKS[i].id);
  };

  const change = (dir) => {
    const p = playerRef.current;
    if (dir < 0 && p && p.getCurrentTime && p.getCurrentTime() > 3) { p.seekTo(0, true); return; }
    const next = (idxRef.current + dir + TRACKS.length) % TRACKS.length;
    load(next, wantPlay.current);
  };

  const toggle = async () => {
    const p = await ensurePlayer();
    if (playing) { wantPlay.current = false; p.pauseVideo(); }
    else { wantPlay.current = true; p.playVideo(); }
  };

  useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => {
      const p = playerRef.current;
      if (p && p.getCurrentTime) setTime({ cur: p.getCurrentTime(), dur: p.getDuration() || 0 });
    }, 500);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => () => { if (playerRef.current) playerRef.current.destroy(); }, []);

  // Let the Music window pick songs and show what's playing.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('track-state', { detail: { idx, playing } }));
  }, [idx, playing]);
  useEffect(() => {
    const onPick = (e) => {
      const i = e.detail;
      wantPlay.current = true;
      ensurePlayer().then((p) => {
        if (i === idxRef.current) p.playVideo(); else load(i, true);
      });
    };
    const onToggle = () => toggle();
    const onAsk = () => window.dispatchEvent(new CustomEvent('track-state', { detail: { idx: idxRef.current, playing } }));
    window.addEventListener('play-track', onPick);
    window.addEventListener('toggle-track', onToggle);
    window.addEventListener('ask-track', onAsk);
    return () => {
      window.removeEventListener('play-track', onPick);
      window.removeEventListener('toggle-track', onToggle);
      window.removeEventListener('ask-track', onAsk);
    };
  });

  const seek = (e) => {
    const p = playerRef.current;
    if (!p || !time.dur) return;
    const r = e.currentTarget.getBoundingClientRect();
    p.seekTo(((e.clientX - r.left) / r.width) * time.dur, true);
  };

  const t = TRACKS[idx];
  return (
    <div className={`widget-panel media-widget${playing ? ' is-playing' : ''}`}>
      <div className="yt-host" aria-hidden="true"><div ref={hostRef} /></div>
      <div className="media-art">
        <img src={`https://i.ytimg.com/vi/${t.id}/hqdefault.jpg`} alt="" />
      </div>
      <div className="media-info">
        <div className="media-title">{t.title}</div>
        <div className="media-artist">{t.artist}</div>
        <div className="media-progress" onClick={seek} title="Seek">
          <div style={{ width: time.dur ? `${(time.cur / time.dur) * 100}%` : '0%' }} />
        </div>
        <div className="media-time"><span>{fmt(time.cur)}</span><span>{time.dur ? fmt(time.dur) : '--:--'}</span></div>
        <div className="media-controls">
          <button onClick={() => { ensurePlayer().then(() => change(-1)); }} aria-label="Previous song">⏮</button>
          <button onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} className="media-play">
            {loading ? '…' : playing ? '❚❚' : '▶'}
          </button>
          <button onClick={() => { ensurePlayer().then(() => change(1)); }} aria-label="Next song">⏭</button>
        </div>
      </div>
    </div>
  );
}
