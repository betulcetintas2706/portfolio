import { useEffect, useRef, useState } from 'react';

// Official YouTube uploads, played through the YouTube embed player.
const TRACKS = [
  { id: 'Gj96YZv8aew', title: 'Cinnamon Girl', artist: 'Lana Del Rey - NFR!' },
  { id: 'fUMgxgQaQcQ', title: 'Mariners Apartment Complex', artist: 'Lana Del Rey - NFR!' },
  { id: '69m34vsjjsU', title: 'Happiness is a butterfly', artist: 'Lana Del Rey - NFR!' },
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
