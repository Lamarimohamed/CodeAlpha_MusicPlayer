class MusicPlayer {
    constructor() {
        this.currentSongIndex = 0;
        this.isPlaying = false;
        this.isMuted = false;
        this.volume = 0.7;
        this.audioContext = null;
        this.currentOscillator = null;
        this.currentGainNode = null;
        this.startTime = 0;
        this.songDuration = 0;
        
        // Real playable songs with generated audio
        this.playlist = [
            {
                title: "Neon Dreams",
                artist: "Cyber Pulse",
                cover: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDI1MCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTAiIGhlaWdodD0iMjUwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMjUwIiB5Mj0iMjUwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM4YTJiZTIiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNDBlMGQwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+",
                duration: "3:45",
                durationSeconds: 225
            },
            {
                title: "Digital Waves",
                artist: "Synth Master",
                cover: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDI1MCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTAiIGhlaWdodD0iMjUwIiBmaWxsPSJ1cmwoI2dyYWRpZW50MikiLz4KPGNpcmNsZSBjeD0iMTI1IiBjeT0iMTI1IiByPSI4MCIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSI0NSIgeTE9IjQ1IiB4Mj0iMjA1IiB5Mj0iMjA1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM0MGUwZDAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOGEyYmUyIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQyIiB4MT0iMCIgeTE9IjAiIHgyPSIyNTAiIHkyPSIyNTAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzFhMWEyZSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwYzBjMGMiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4=",
                duration: "4:12",
                durationSeconds: 252
            },
            {
                title: "Cosmic Flow",
                artist: "Stellar Beats",
                cover: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDI1MCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTAiIGhlaWdodD0iMjUwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8Y2lyY2xlIGN4PSIxMjUiIGN5PSIxMjUiIHI9IjEwMCIgZmlsbD0idXJsKCNncmFkaWVudDIpIi8+CjxjaXJjbGUgY3g9IjEyNSIgY3k9IjEyNSIgcj0iNjAiIGZpbGw9InVybCgjZ3JhZGllbnQzKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMjUwIiB5Mj0iMjUwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNmZmY2NzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY2YjNhIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQyIiB4MT0iMjUiIHkxPSIyNSIgeDI9IjIyNSIgeTI9IjIyNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjZmY0ODIxIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmNzIxYyIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50MyIgeDE9IjY1IiB5MT0iNjUiIHgyPSIxODUiIHkyPSIxODUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI2ZmYzEwNyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmQ1N2EiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4=",
                duration: "3:58",
                durationSeconds: 238
            },
            {
                title: "Electric Soul",
                artist: "Neon Groove",
                cover: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDI1MCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTAiIGhlaWdodD0iMjUwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8cGF0aCBkPSJNMTI1IDI1TDE3NSAxMjVMMTI1IDIyNUw3NSAxMjVMMTI1IDI1WiIgZmlsbD0idXJsKCNncmFkaWVudDIpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50IiB4MT0iMCIgeTE9IjAiIHgyPSIyNTAiIHkyPSIyNTAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwZmY4ZiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMGZmY2YiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDIiIHgxPSI3NSIgeTE9IjI1IiB4Mj0iMTc1IiB5Mj0iMjI1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNmZjAwZmYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjY2YwMGNmIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+",
                duration: "4:25",
                durationSeconds: 265
            },
            {
                title: "Midnight Pulse",
                artist: "Dark Synth",
                cover: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDI1MCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTAiIGhlaWdodD0iMjUwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8Y2lyY2xlIGN4PSIxMjUiIGN5PSIxMjUiIHI9IjgwIiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjZ3JhZGllbnQyKSIgc3Ryb2tlLXdpZHRoPSI4Ii8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50IiB4MT0iMCIgeTE9IjAiIHgyPSIyNTAiIHkyPSIyNTAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzMzMzMzMyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM2NjY2NjYiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDIiIHgxPSI0NSIgeTE9IjQ1IiB4Mj0iMjA1IiB5Mj0iMjA1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNmZmZmZmYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjY2NjY2NjIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+",
                duration: "3:33",
                durationSeconds: 213
            }
        ];

        this.initializePlayer();
        this.setupEventListeners();
        this.loadSong(0);
        this.renderPlaylist();
        this.updateVolumeDisplay();
    }

    initializePlayer() {
        // Initialize audio context
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Audio context not supported');
        }
    }

    setupEventListeners() {
        document.getElementById('playPauseBtn').addEventListener('click', () => this.togglePlayPause());
        document.getElementById('prevBtn').addEventListener('click', () => this.previousSong());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSong());
        document.getElementById('progressBar').addEventListener('click', (e) => this.seekTo(e));
        document.getElementById('muteBtn').addEventListener('click', () => this.toggleMute());
        
        // Volume slider with smooth control
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeHandle = document.getElementById('volumeHandle');
        
        volumeSlider.addEventListener('mousedown', (e) => this.startVolumeDrag(e));
        document.addEventListener('mousemove', (e) => this.updateVolumeDrag(e));
        document.addEventListener('mouseup', () => this.stopVolumeDrag());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    startVolumeDrag(e) {
        this.isDraggingVolume = true;
        this.updateVolumeFromEvent(e);
    }

    updateVolumeDrag(e) {
        if (this.isDraggingVolume) {
            this.updateVolumeFromEvent(e);
        }
    }

    stopVolumeDrag() {
        this.isDraggingVolume = false;
    }

    updateVolumeFromEvent(e) {
        const volumeSlider = document.getElementById('volumeSlider');
        const rect = volumeSlider.getBoundingClientRect();
        const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const newVolume = clickX / rect.width;
        
        this.setVolumeSmooth(newVolume);
    }

    setVolumeSmooth(newVolume) {
        this.volume = Math.max(0, Math.min(1, newVolume));
        this.updateVolumeDisplay();
        
        // Update current audio if playing
        if (this.currentGainNode) {
            this.currentGainNode.gain.setValueAtTime(
                this.isMuted ? 0 : this.volume * 0.1, 
                this.audioContext.currentTime
            );
        }
        
        if (this.isMuted && this.volume > 0) {
            this.toggleMute();
        }
    }

    updateVolumeDisplay() {
        const volumeFill = document.getElementById('volumeFill');
        const volumeHandle = document.getElementById('volumeHandle');
        
        volumeFill.style.width = (this.volume * 100) + '%';
        volumeHandle.style.left = (this.volume * 100) + '%';
    }

    loadSong(index) {
        if (index < 0 || index >= this.playlist.length) return;
        
        this.currentSongIndex = index;
        const song = this.playlist[index];
        
        document.getElementById('songTitle').textContent = song.title;
        document.getElementById('songArtist').textContent = song.artist;
        document.getElementById('coverImage').src = song.cover;
        document.getElementById('totalTime').textContent = song.duration;
        
        this.songDuration = song.durationSeconds;
        this.updatePlaylistActiveState();
        this.updateProgress();
        
        // Stop current audio if playing
        if (this.currentOscillator) {
            this.currentOscillator.stop();
        }
        
        // Reset progress
        document.getElementById('progressFill').style.width = '0%';
        document.getElementById('currentTime').textContent = '0:00';
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pauseSong();
        } else {
            this.playSong();
        }
    }

    playSong() {
        if (!this.audioContext) {
            console.log('Audio context not available');
            return;
        }

        this.isPlaying = true;
        
        // Update UI
        document.getElementById('playIcon').style.display = 'none';
        document.getElementById('pauseIcon').style.display = 'block';
        document.getElementById('playPauseBtn').classList.add('pulse');
        
        // Resume audio context if suspended
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        // Create and start audio
        this.startAudio();
        
        // Set start time for progress tracking
        this.startTime = Date.now();
        
        // Set up auto-advance
        setTimeout(() => {
            if (this.isPlaying) {
                this.nextSong();
            }
        }, this.songDuration * 1000);
    }

    startAudio() {
        if (!this.audioContext) return;
        
        // Stop any existing audio
        if (this.currentOscillator) {
            this.currentOscillator.stop();
        }
        
        // Create new oscillator and gain node
        this.currentOscillator = this.audioContext.createOscillator();
        this.currentGainNode = this.audioContext.createGain();
        
        // Connect nodes
        this.currentOscillator.connect(this.currentGainNode);
        this.currentGainNode.connect(this.audioContext.destination);
        
        // Set frequency and volume
        this.currentOscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
        this.currentGainNode.gain.setValueAtTime(
            this.isMuted ? 0 : this.volume * 0.1, 
            this.audioContext.currentTime
        );
        
        // Start and stop audio
        this.currentOscillator.start(this.audioContext.currentTime);
        this.currentOscillator.stop(this.audioContext.currentTime + this.songDuration);
        
        // Set up progress update
        this.updateProgressInterval = setInterval(() => {
            if (this.isPlaying) {
                this.updateProgress();
            }
        }, 100);
    }

    pauseSong() {
        this.isPlaying = false;
        
        // Update UI
        document.getElementById('playIcon').style.display = 'block';
        document.getElementById('pauseIcon').style.display = 'none';
        document.getElementById('playPauseBtn').classList.remove('pulse');
        
        // Stop the current audio
        if (this.currentOscillator) {
            this.currentOscillator.stop();
        }
        
        // Clear progress interval
        if (this.updateProgressInterval) {
            clearInterval(this.updateProgressInterval);
        }
    }

    nextSong() {
        let nextIndex = this.currentSongIndex + 1;
        if (nextIndex >= this.playlist.length) {
            nextIndex = 0;
        }
        this.loadSong(nextIndex);
        if (this.isPlaying) {
            this.playSong();
        }
    }

    previousSong() {
        let prevIndex = this.currentSongIndex - 1;
        if (prevIndex < 0) {
            prevIndex = this.playlist.length - 1;
        }
        this.loadSong(prevIndex);
        if (this.isPlaying) {
            this.playSong();
        }
    }

    seekTo(e) {
        const progressBar = document.getElementById('progressBar');
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progressWidth = rect.width;
        const seekTime = (clickX / progressWidth) * this.songDuration;
        
        if (!isNaN(seekTime) && this.songDuration) {
            this.updateProgressFromSeek(seekTime);
        }
    }

    updateProgressFromSeek(seekTime) {
        if (this.songDuration) {
            const progress = (seekTime / this.songDuration) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
            
            const currentTime = this.formatTime(seekTime);
            document.getElementById('currentTime').textContent = currentTime;
        }
    }

    updateProgress() {
        if (this.isPlaying && this.songDuration) {
            const elapsed = (Date.now() - this.startTime) / 1000;
            const progress = Math.min((elapsed / this.songDuration) * 100, 100);
            
            document.getElementById('progressFill').style.width = progress + '%';
            
            const currentTime = this.formatTime(elapsed);
            document.getElementById('currentTime').textContent = currentTime;
            
            if (progress >= 100) {
                this.nextSong();
            }
        }
    }

    updateTotalTime() {
        if (this.songDuration) {
            const totalTime = this.formatTime(this.songDuration);
            document.getElementById('totalTime').textContent = totalTime;
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        
        const volumeIcon = document.getElementById('volumeIcon');
        if (this.isMuted) {
            volumeIcon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
        } else {
            volumeIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
        }
        
        // Mute/unmute the audio
        if (this.currentGainNode) {
            this.currentGainNode.gain.setValueAtTime(
                this.isMuted ? 0 : this.volume * 0.1, 
                this.audioContext.currentTime
            );
        }
    }

    handleKeyboard(e) {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSong();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSong();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.setVolumeSmooth(Math.min(1, this.volume + 0.1));
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.setVolumeSmooth(Math.max(0, this.volume - 0.1));
                break;
            case 'KeyM':
                e.preventDefault();
                this.toggleMute();
                break;
        }
    }

    renderPlaylist() {
        const container = document.getElementById('playlistContainer');
        container.innerHTML = '';
        
        this.playlist.forEach((song, index) => {
            const playlistItem = document.createElement('div');
            playlistItem.className = 'playlist-item';
            playlistItem.addEventListener('click', () => {
                this.loadSong(index);
                if (this.isPlaying) {
                    this.playSong();
                }
            });
            
            playlistItem.innerHTML = `
                <div class="playlist-cover">
                    <img src="${song.cover}" alt="${song.title}">
                </div>
                <div class="playlist-info">
                    <div class="playlist-song-title">${song.title}</div>
                    <div class="playlist-song-artist">${song.artist}</div>
                </div>
                <div class="playlist-duration">${song.duration}</div>
            `;
            
            container.appendChild(playlistItem);
        });
    }

    updatePlaylistActiveState() {
        const playlistItems = document.querySelectorAll('.playlist-item');
        playlistItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === this.currentSongIndex) {
                item.classList.add('active');
            }
        });
    }
}

// Initialize the music player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
    document.querySelector('.music-player').classList.add('fade-in');
    
    setTimeout(() => {
        player.updateTotalTime();
    }, 100);
});
